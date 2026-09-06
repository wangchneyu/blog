"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/about", label: "关于我" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "文章" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          wangc.
        </Link>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname.startsWith(href) ? styles.active : ""}`}
            >
              {label}
            </Link>
          ))}
          <span className={styles.navDivider} aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
