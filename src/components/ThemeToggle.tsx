"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className={styles.toggleBtn} aria-label="Toggle Dark Mode" />;
  }

  return (
    <button
      className={styles.toggleBtn}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
