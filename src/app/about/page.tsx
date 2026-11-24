import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";
import { projects } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/markdown";
import { site } from "@/lib/site";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "关于我",
  description: `${site.name} 的个人档案：AI Agent 工程实践、IMVC 多视图聚类研究与代表项目。`,
};

const MILESTONES = [
  {
    badge: "ICLR 2027",
    title: "不完备多视图聚类（IMVC）研究 · 论文在审",
    detail: "CCF-A 类国际会议，基于 PyTorch 探索缺失视图下的表征补全与聚类一致性。",
    active: true,
  },
  {
    badge: "IEEE VCIP",
    title: "IEEE VCIP 会议审稿人",
    detail: "参与视觉通信与图像处理方向投稿论文的同行评审工作。",
  },
  {
    badge: "2026.05",
    title: "GitHub First Issue 开源贡献",
    detail: "为 Hmbown/CodeWhale 提交系统复制与 GUI 退出快捷键的热键冲突缺陷报告。",
  },
  {
    badge: "AI 竞赛",
    title: "TRAE AI 创造力大赛 · 初赛优秀奖",
    detail: "独立开发面向孤独老人的长程记忆情感陪伴智能体「忆伴」。",
  },
] as const;

export default function About() {
  // 代表项目：精选展示核心代表作（Lemma / 安养通 / 实习支教申报管理平台），全量见 /projects
  const featuredProjects = projects.filter(
    (project) => project.group !== "contest" && project.featured
  );
  const latestPost = getSortedPostsData()[0] ?? null;

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </div>

      <div className={styles.profileLayout}>
        {/* 左侧无框编辑风身份栏 */}
        <aside className={styles.sidebar}>
          <div className={styles.identityBlock}>
            <span className={styles.statusPill}>
              <span className={styles.statusPulse} aria-hidden="true" />
              ICLR 2027 在审 · 欢迎交流
            </span>

            <h1 className={styles.name}>
              {site.name}
              <span className={`${styles.nameDot} gradient-text`} aria-hidden="true">
                .
              </span>
            </h1>

            <p className={styles.affiliation}>
              {site.affiliation} · {site.degree}
            </p>
            <p className={styles.period}>{site.period}</p>

            <div className={styles.stackBlock} aria-label="技术栈">
              <span className={styles.metaLabel}>技术栈</span>
              <ul className={styles.stackList}>
                {site.stack.map((item) => (
                  <li key={item} className={styles.stackItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actionGroup}>
              <a href={`mailto:${site.email}`} className={styles.primaryAction}>
                ✉ 联系我
              </a>
              <div className={styles.secondaryActions}>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryAction}
                >
                  GitHub ↗
                </a>
                <PrintButton />
              </div>
              <p className={styles.emailHint}>{site.email}</p>
            </div>
          </div>
        </aside>

        {/* 右侧主叙事区 */}
        <div className={styles.mainColumn}>
          <section className={styles.introSection}>
            <p className={styles.leadStatement}>
              我是一名{" "}
              <span className="gradient-text">AI Agent 工作者</span>
              ，主力用 <strong>Python</strong> 与 <strong>Java</strong>{" "}
              把多智能体协作做成真实交付的产品；科研上基于{" "}
              <strong>PyTorch</strong> 研究{" "}
              <span className="gradient-text">不完备多视图聚类（IMVC）</span>。
            </p>
            <p className={styles.leadSub}>
              工程上关注任务持久化、可控工作流与复杂系统的从 0 到 1 交付——涵盖本地多智能体工具 Lemma、面向长者的智慧养老平台「安养通」，以及实际服务数百名师生的实习支教管理平台；科研上关注视图缺失下的数据表征恢复与聚类一致性，并担任 IEEE VCIP 会议审稿人。
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>代表项目</h2>
              <Link href="/projects" className={styles.sectionMore}>
                全部 {projects.length} 个项目 →
              </Link>
            </div>

            <div className={styles.projectList}>
              {featuredProjects.map((project, index) => {
                const isOngoing = project.group === "ongoing";
                const num = String(index + 1).padStart(2, "0");
                const inner = (
                  <>
                    <span className={styles.projectIndex} aria-hidden="true">
                      {num}
                    </span>
                    <div className={styles.projectBody}>
                      <div className={styles.projectTop}>
                        <h3 className={styles.projectTitle}>
                          {project.title}
                          {project.link && (
                            <span className={styles.projectExt} aria-hidden="true">
                              ↗
                            </span>
                          )}
                        </h3>
                        <span
                          className={`${styles.projectStatus} ${
                            isOngoing ? styles.projectStatusOngoing : styles.projectStatusDelivered
                          }`}
                        >
                          {isOngoing && <span className={styles.ongoingDot} aria-hidden="true" />}
                          {project.status}
                        </span>
                      </div>
                      <p className={styles.projectRole}>{project.role}</p>
                      <p className={styles.projectDesc}>{project.desc}</p>
                    </div>
                  </>
                );

                return project.link ? (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.projectRow} ${styles.projectRowClickable}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <article key={project.title} className={styles.projectRow}>
                    {inner}
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>科研、竞赛与写作</h2>
              <Link href="/blog" className={styles.sectionMore}>
                技术博客 →
              </Link>
            </div>
            <ul className={styles.timeline}>
              {MILESTONES.map((item) => (
                <li key={item.title} className={styles.timelineItem}>
                  <span
                    className={`${styles.timelineBadge} ${
                      "active" in item && item.active ? styles.timelineBadgeActive : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                  <div className={styles.timelineTrack} aria-hidden="true">
                    <span
                      className={`${styles.timelineDot} ${
                        "active" in item && item.active ? styles.timelineDotActive : ""
                      }`}
                    />
                  </div>
                  <div className={styles.timelineBody}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineDetail}>{item.detail}</p>
                  </div>
                </li>
              ))}
              {latestPost && (
                <li className={styles.timelineItem}>
                  <span className={styles.timelineBadge}>最新文章</span>
                  <div className={styles.timelineTrack} aria-hidden="true">
                    <span className={styles.timelineDot} />
                  </div>
                  <div className={styles.timelineBody}>
                    <Link href={`/blog/${latestPost.slug}`} className={styles.timelinePostLink}>
                      {latestPost.title} →
                    </Link>
                    <p className={styles.timelineDetail}>{latestPost.excerpt}</p>
                  </div>
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
