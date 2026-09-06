import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrap}>
      <span className={styles.notFoundIcon} aria-hidden="true">🔮</span>
      <h1 className={styles.notFoundTitle}>404 — 页面不存在</h1>
      <p className={styles.notFoundText}>
        你访问的页面可能已被移动、删除，或者从未存在过。
      </p>
      <Link href="/" className={styles.homeLink}>
        ← 返回首页
      </Link>
    </div>
  );
}
