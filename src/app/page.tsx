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

      {/* ===== ZONE 1: HERO (Hook) ===== */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            用代码探索智能的边界，<br />
            用<span className={`${styles.highlighted} gradient-text`}>文字</span>记录成长。
          </h1>
          <p className={styles.heroSubtitle}>
            Hi, 我是 wangc。目前就读于河北师范大学软件工程专业。
            我专注于全栈开发与 AI Agent 智能体的构建，同时热衷于数学建模、学术研究与开源贡献。
          </p>
          <p className={styles.heroNow}>
            <span className={styles.nowDot} aria-hidden="true" />
            现在：ICLR 2027 在投 · 备战数学建模省赛 · 写这个博客
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

      {/* ===== ZONE 2: CONTEXT (Snapshot) ===== */}
      <section className={`container ${styles.bentoSection}`}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">个人快照 / Profile Snapshot</span>
        </div>
        
        <div className={styles.contextStack}>
          
          {/* Main Intro Card */}
          <div className={`glass-card no-hover ${styles.bentoCard} ${styles.introBento}`}>
            <div className={styles.bentoCardInner}>
              <span className={styles.iconChip} aria-hidden="true">🧑‍💻</span>
              <h2 className={styles.bentoHeading}>全栈工程与智能体构建</h2>
              <p className={styles.bentoText}>
                从管理平台的全栈开发，到“智慧养老”等多个场景的 AI Agent 落地。我享受将软件工程理论与前沿 AI 技术结合，转化为实际产品的整个过程。
              </p>
              <Link href="/about" className={styles.bentoLink}>
                查看完整科研与项目细节 <span aria-hidden>→</span>
              </Link>
              <div className={styles.bentoStats}>
                <span><strong>{projects.length}</strong> 个项目</span>
                <span><strong>{allPosts.length}</strong> 篇文章</span>
                <span><strong>{AWARD_COUNT}</strong> 项竞赛奖项</span>
              </div>
            </div>
          </div>

          {/* Horizontal Snapshot Timeline */}
          <div className={`glass-card no-hover ${styles.snapshotCard}`}>
            <div className={styles.snapshotRow}>
              
              {/* Item 1 */}
              <div className={styles.snapshotItem}>
                <span className={styles.snapshotIconChip} aria-hidden="true">🎓</span>
                <div className={styles.snapshotContent}>
                  <h3 className={styles.snapshotTitle}>当前在读</h3>
                  <p className={styles.snapshotDesc}>河北师大<br />软件工程专业</p>
                </div>
              </div>

              <div className={styles.snapshotDivider} aria-hidden="true" />

              {/* Item 2 */}
              <div className={styles.snapshotItem}>
                <span className={styles.snapshotIconChip} aria-hidden="true">🔬</span>
                <div className={styles.snapshotContent}>
                  <h3 className={styles.snapshotTitle}>核心技能</h3>
                  <p className={styles.snapshotDesc}>全栈开发与<br />AI Agent 研发</p>
                </div>
              </div>

              <div className={styles.snapshotDivider} aria-hidden="true" />

              {/* Item 3 */}
              <div className={styles.snapshotItem}>
                <span className={styles.snapshotIconChip} aria-hidden="true">💼</span>
                <div className={styles.snapshotContent}>
                  <h3 className={styles.snapshotTitle}>科研竞赛</h3>
                  <p className={styles.snapshotDesc}>多视图聚类<br />数学建模获奖者</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===== ZONE 2.5: FEATURED PROJECTS (Proof) ===== */}
      <section className={`container ${styles.featuredSection}`}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">精选项目 / FEATURED WORK</span>
        </div>

        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => {
            const card = (
              <>
                <div className={styles.featuredCardTop}>
                  <span className={styles.iconChip} aria-hidden="true">{project.icon}</span>
                  <span className={styles.featuredStatus}>{project.status}</span>
                </div>
                <h3 className={styles.featuredTitle}>{project.title}</h3>
                <p className={styles.featuredDesc}>{project.desc}</p>
                <span className={styles.featuredMore}>了解详情 →</span>
              </>
            );
            return project.link ? (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`glass-card ${styles.featuredCard}`}
              >
                {card}
              </a>
            ) : (
              <Link
                key={project.title}
                href="/projects"
                className={`glass-card ${styles.featuredCard}`}
              >
                {card}
              </Link>
            );
          })}
        </div>

        <div className={styles.featuredFooter}>
          <Link href="/projects" className={styles.bentoLink}>
            查看全部项目 <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ===== ZONE 3: LATEST POSTS (Proof) ===== */}
      <section className={`container ${styles.postsSection}`}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">最新文章 / Latest Writings</span>
        </div>

        <div className={styles.postListContainer}>
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
      </section>

      {/* ===== ZONE 4: LET'S TALK (CTA Footer) ===== */}
      <section className={`container ${styles.contactSection}`}>
        <div className={`glass-card ${styles.contactCard}`}>
          <div className={styles.contactInner}>
            <span className={styles.contactEmoji} aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="url(#contactGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="contactGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-1)"/>
                    <stop offset="100%" stopColor="var(--accent-2)"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <h2 className={styles.contactHeading}>有想法？我们聊聊。</h2>
            <p className={styles.contactText}>
              无论是学术探讨、项目合作，还是只是打个招呼，我的收件箱随时都是开着的：
              <a href="mailto:wangchenyu@stu.hebtu.edu.cn" className={styles.contactEmail}>wangchenyu@stu.hebtu.edu.cn</a>
            </p>
            <div className={styles.contactActions}>
              <a href="mailto:wangchenyu@stu.hebtu.edu.cn" className={styles.primaryBtn}>
                发邮件给我
              </a>
              <a href="https://github.com/wangchneyu" target="_blank" rel="noreferrer" className={styles.ghostBtn}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
