import Link from "next/link";
import { getSortedPostsData } from "@/lib/markdown";
import styles from "./page.module.css";

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* ===== 首屏：HERO ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            用代码探索智能的边界，<br />
            用<span className={`${styles.highlighted} gradient-text`}>文字</span>记录成长。
          </h1>
          <p className={styles.heroSubtitle}>
            Hi, 我是 wangc。目前就读于河北师范大学软件工程专业。
            我的主线是科研——专注于多视图聚类等数据挖掘方向，同时以全栈开发与 AI Agent
            智能体把想法做成真实产品，并热爱数学建模与开源贡献。
          </p>
          <div className={styles.heroCta}>
            <Link href="/about" className={styles.primaryBtn}>
              了解我的完整经历 →
            </Link>
            <Link href="/blog" className={styles.ghostBtn}>
              阅读最新文章
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.floatingOrb1} />
          <div className={styles.floatingOrb2} />
          <div className={styles.floatingOrb3} />
        </div>
      </section>

      {/* ===== 第二屏：方向 + 最新文章（单列） ===== */}
      <section className={styles.homeSection}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">方向 / FOCUS</span>
        </div>
        <ul className={styles.focusList}>
          <li className={styles.focusItem}>
            <span className={styles.focusIcon} aria-hidden="true">🔬</span>
            <span className={styles.focusLabel}>科研</span>
            <span className={styles.focusDesc}>多视图聚类 · ICLR 2027 在投</span>
          </li>
          <li className={styles.focusItem}>
            <span className={styles.focusIcon} aria-hidden="true">🛠️</span>
            <span className={styles.focusLabel}>工程</span>
            <span className={styles.focusDesc}>全栈开发 · AI Agent 落地</span>
          </li>
          <li className={styles.focusItem}>
            <span className={styles.focusIcon} aria-hidden="true">🏅</span>
            <span className={styles.focusLabel}>竞赛</span>
            <span className={styles.focusDesc}>数学建模 · 校赛三等奖，备战省赛</span>
          </li>
        </ul>

        <div className={`${styles.sectionHeadingWrapper} ${styles.postsHeading}`}>
          <span className="section-heading">最新文章 / LATEST WRITINGS</span>
        </div>
        <div className={`glass-card ${styles.postListWrapper}`}>
          <div className={styles.postList}>
            {recentPosts.length === 0 ? (
              <p className={styles.emptyMsg}>文章即将发布……</p>
            ) : (
              recentPosts.map(({ slug, title, date, excerpt }) => (
                <Link href={`/blog/${slug}`} key={slug} className={styles.postRow}>
                  <div className={styles.postRowMeta}>
                    <time className={styles.postDate}>{date}</time>
                  </div>
                  <div className={styles.postRowBody}>
                    <h3 className={styles.postTitle}>{title}</h3>
                    <p className={styles.postExcerpt}>{excerpt}</p>
                  </div>
                  <span className={styles.postArrow}>→</span>
                </Link>
              ))
            )}
          </div>
          <div className={styles.postListFooter}>
            <Link href="/blog" className={styles.bentoLink}>
              阅读所有文章 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
