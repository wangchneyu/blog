import Link from "next/link";
import { getSortedPostsData } from "@/lib/markdown";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

// 已获奖项，获奖后手动更新
const AWARD_COUNT = 2;

export default function Home() {
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured);

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

      {/* ===== 分屏：最新文章 + 侧栏 ===== */}
      <section className={`container ${styles.splitSection}`}>
        <div className={styles.splitGrid}>
          {/* 左：最新文章 */}
          <div className={styles.postsCol}>
            <div className={styles.sectionHeadingWrapper}>
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
          </div>

          {/* 右：侧栏 */}
          <aside className={styles.sideCol}>
            {/* 关于我迷你卡 */}
            <div className={`glass-card no-hover ${styles.sideCard}`}>
              <span className={styles.iconChip} aria-hidden="true">🔬</span>
              <h2 className={styles.sideTitle}>wangc</h2>
              <p className={styles.sideText}>
                河北师范大学软件工程在读。主线是科研——多视图聚类方向，ICLR 2027
                在投；同时以全栈与 AI Agent 把想法做成真实产品。
              </p>
              <div className={styles.bentoStats}>
                <span><strong>{projects.length}</strong> 个项目</span>
                <span><strong>{allPosts.length}</strong> 篇文章</span>
                <span><strong>{AWARD_COUNT}</strong> 项竞赛奖项</span>
              </div>
              <div className={styles.sideLinks}>
                <a href="mailto:wangchenyu@stu.hebtu.edu.cn" className={styles.bentoLink}>
                  ✉ 邮箱
                </a>
                <a
                  href="https://github.com/wangchneyu"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bentoLink}
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* 精选项目 */}
            <div className={`glass-card no-hover ${styles.sideCard}`}>
              <h3 className={styles.sideHeading}>精选项目</h3>
              <ul className={styles.sideList}>
                {featuredProjects.map((project) =>
                  project.link ? (
                    <li key={project.title}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.sideItem}
                      >
                        <span className={styles.sideItemIcon} aria-hidden="true">{project.icon}</span>
                        <span className={styles.sideItemTitle}>{project.title}</span>
                        <span className={styles.sideItemStatus}>{project.status}</span>
                      </a>
                    </li>
                  ) : (
                    <li key={project.title}>
                      <Link href="/projects" className={styles.sideItem}>
                        <span className={styles.sideItemIcon} aria-hidden="true">{project.icon}</span>
                        <span className={styles.sideItemTitle}>{project.title}</span>
                        <span className={styles.sideItemStatus}>{project.status}</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <Link href="/projects" className={styles.bentoLink}>
                查看全部项目 <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
