"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  // 服务端快照 false、客户端快照 true，水合后即为已挂载
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

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
