"use client";

import styles from "./toggleTheme.module.css";
import { useToggleTheme } from "../../../hooks/ToggleTheme";
import Image from "next/image";

export default function ToggleTheme() {
  const { theme, setTheme } = useToggleTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button className={styles.toggleTheme} onClick={handleToggleTheme}>
      <Image
        src={theme === "dark" ? "/assets/theme/sun.svg" : "/assets/theme/moon.svg"}
        height={24}
        width={24}
        alt={`${theme} theme`}
      />
    </button>
  );
}
