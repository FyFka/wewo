"use client";

import { useEffect, useState } from "react";

export function useToggleTheme() {
  const [themeValue, setThemeValue] = useState<string>("dark");

  function getThemeFromCookie() {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="))
        ?.split("=")[1] || "dark"
    );
  }

  useEffect(() => {
    setThemeValue(getThemeFromCookie());
  }, []);

  const setTheme = (value: string) => {
    document.cookie = `theme=${value}; path=/;`;
    document.documentElement.setAttribute("data-theme", value);
    document.documentElement.style.setProperty("color-scheme", value);
    setThemeValue(value);
  };

  return { theme: themeValue, setTheme };
}
