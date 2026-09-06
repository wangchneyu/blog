import Link from "next/link";
import { getSortedPostsData } from "@/lib/markdown";
import styles from "./page.module.css";
import { Metadata } from "next";
import ViewCounter from "@/components/ViewCounter";

export const metadata: Metadata = {
  title: "所有文章",
  description: "wangc 的全部博客文章：代码、科研与生活的思考与记录。",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()).padStart(2, "0"),
    year: String(d.getFullYear()),
  };
}

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className={styles.blogContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>
      
      <div className={styles.pageHeader}>
        <span className={styles.tag}>📝 Writing</span>
        <h1 className={styles.title}>所有文章</h1>
        <p className={styles.subtitle}>Thoughts on code, research, and life.</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.postList}>
        {allPostsData.length === 0 ? (
          <div className={styles.emptyState}>
            <p>文章正在路上，敬请期待 ✍️</p>
          </div>
        ) : (
          allPostsData.map(({ slug, title, date, excerpt, tags, readingTime }) => {
            const { month, day, year } = formatDate(date);
            return (
              <Link href={`/blog/${slug}`} key={slug} className={styles.postCard}>
                <div className={styles.cardDate}>
                  <span className={styles.dateMonth}>{month}</span>
                  <span className={styles.dateDay}>{day}</span>
                  <span className={styles.dateYear}>{year}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.postTitle}>{title}</h2>
                  {tags && tags.length > 0 && (
                    <div className={styles.tagList}>
                      {tags.map(tag => (
                        <span key={tag} className={styles.postTag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className={styles.tagList}>
                    {readingTime && <span className={styles.readingTimeMeta}>{readingTime}</span>}
                    <span className={styles.readingTimeMeta}>· <ViewCounter slug={slug} trackView={false} /></span>
                  </div>
                  <p className={styles.postExcerpt}>{excerpt}</p>
                </div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            );
          })
        )}
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonInner}>
            <span className={styles.comingSoonIcon} aria-hidden="true">✨</span>
            <p className={styles.comingSoonText}>更多思考与探索，即将在这里分享...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
