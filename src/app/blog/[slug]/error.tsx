"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <div className={styles.errorWrap}>
      <span className={styles.errorIcon} aria-hidden="true">⚠️</span>
      <h2 className={styles.errorTitle}>文章加载失败</h2>
      <p className={styles.errorText}>
        抱歉，这篇文章暂时无法加载。请稍后再试。
      </p>
      <div className={styles.errorActions}>
        <button onClick={reset} className={styles.retryBtn}>
          重试
        </button>
        <Link href="/blog" className={styles.backLink}>
          ← 返回文章列表
        </Link>
      </div>
    </div>
  );
}
