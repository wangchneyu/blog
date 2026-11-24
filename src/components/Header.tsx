"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/lib/site";
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
          {site.name}.
        </Link>
        <nav className={styles.nav} aria-label="主导航">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <span className={styles.navDivider} aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
