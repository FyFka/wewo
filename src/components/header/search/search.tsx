"use client";

import { useState } from "react";
import styles from "./search.module.css";

interface ISearchProps {
  disabled?: boolean;
}

export default function Search({ disabled }: ISearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  const handleApplyFocus = () => {
    setIsFocused(true);
  };

  const handleFocusLost = () => {
    if (search.trim() === "") {
      setIsFocused(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log("searching for", search);
    setSearch("");
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <label className={styles.searchHelper} htmlFor="header[search]"></label>
      <input
        className={styles.field}
        type="text"
        disabled={disabled}
        readOnly={disabled}
        placeholder="Search"
        id="header[search]"
        value={search}
        onChange={handleSearchChange}
        onFocus={handleApplyFocus}
        onBlur={handleFocusLost}
      />
      {isFocused && (
        <button className={styles.searchSubmit} type="submit">
          Search
        </button>
      )}
    </form>
  );
}
