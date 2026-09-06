import Link from "next/link";
import { getSortedPostsData } from "@/lib/markdown";
import styles from "./page.module.css";
import { Metadata } from "next";
import ViewCounter from "@/components/ViewCounter";

export const metadata: Metadata = {
  title: "所有文章",
  description: "wangc 的全部博客文章：代码、科研与生活的思考与记录。",
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className={styles.blogContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>

      <header className={styles.pageHeader}>
        <h1 className={styles.title}>所有文章</h1>
        <p className={styles.intro}>代码、科研与生活的思考与记录。</p>
      </header>

      <div className={styles.postList}>
        {allPostsData.length === 0 ? (
          <div className={styles.emptyState}>
            <p>文章正在路上，敬请期待 ✍️</p>
          </div>
        ) : (
          allPostsData.map(({ slug, title, date, excerpt, tags, readingTime }) => (
            <Link href={`/blog/${slug}`} key={slug} className={styles.postRow}>
              <div className={styles.postRowMeta}>
                <time className={styles.postDate}>{date}</time>
              </div>
              <div className={styles.postRowBody}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postExcerpt}>{excerpt}</p>
                <div className={styles.postMetaLine}>
                  {tags && tags.length > 0 && (
                    <>
                      {tags.map(tag => (
                        <span key={tag} className={styles.postTag}>{tag}</span>
                      ))}
                    </>
                  )}
                  {readingTime && <span className={styles.readingTimeMeta}>{readingTime}</span>}
                  <ViewCounter slug={slug} trackView={false} className={styles.readingTimeMeta} />
                </div>
              </div>
              <span className={styles.postArrow}>→</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
