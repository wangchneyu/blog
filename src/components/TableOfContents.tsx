"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markdown";
import styles from "./TableOfContents.module.css";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    // Observe all heading elements
    const headings = document.querySelectorAll(
      ".post-content h2, .post-content h3, .post-content h4"
    );
    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className={styles.tocNav}>
      <h4 className={styles.tocTitle}>目录</h4>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={styles.tocItem}
            style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`${styles.tocLink} ${activeId === item.id ? styles.tocLinkActive : ""}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  // Update URL hash without scroll jump
                  history.pushState(null, "", `#${item.id}`);
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
