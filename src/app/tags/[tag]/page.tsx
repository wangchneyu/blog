import Link from "next/link";
import { getAllTags, getSortedPostsData } from "@/lib/markdown";
import { Metadata } from "next";
import styles from "../../blog/page.module.css";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签「${tag}」`,
    description: `标签「${tag}」下的全部文章。`,
  };
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getSortedPostsData().filter(
    (post) => !post.draft && (post.tags || []).includes(tag)
  );

  return (
    <div className={styles.blogContainer}>
      <Link href="/blog" className={styles.backLink}>
        ← 返回所有文章
      </Link>

      <div className={styles.pageHeader}>
        <span className={styles.postTag}>🏷 Tags</span>
        <h1 className={styles.title}>#{tag}</h1>
        <p className={styles.intro}>共 {posts.length} 篇文章</p>
      </div>

      <div className={styles.postList}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>这个标签下还没有文章。</p>
          </div>
        ) : (
          posts.map(({ slug, title, date, excerpt, readingTime }) => (
            <Link href={`/blog/${slug}`} key={slug} className={styles.postRow}>
              <div className={styles.postRowMeta}>
                <time className={styles.postDate}>{date}</time>
              </div>
              <div className={styles.postRowBody}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postExcerpt}>{excerpt}</p>
                {readingTime && (
                  <div className={styles.postMetaLine}>
                    <span className={styles.readingTimeMeta}>{readingTime}</span>
                  </div>
                )}
              </div>
              <span className={styles.postArrow}>→</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
