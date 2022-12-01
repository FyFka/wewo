"use client";

import { useToggleTheme } from "../../../hooks/ToggleTheme";
import Image from "next/image";
import styles from "./toggleTheme.module.css";

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
