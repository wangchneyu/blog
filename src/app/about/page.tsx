import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于我",
  description: `${site.name} 的个人档案：AI Agent 工程实践、IMVC 多视图聚类研究与代表项目。`,
};

const MILESTONES = [
  {
    badge: "进行中",
    title: "ICLR 2027 · 不完备多视图聚类（IMVC）论文在审",
    detail: "CCF-A 类国际会议，围绕缺失视图下的表征补全与聚类一致性开展研究。",
    active: true,
  },
  {
    badge: "2026",
    title: "IEEE VCIP 会议审稿人",
    detail: "参与视觉通信与图像处理方向投稿论文的同行评审工作。",
  },
  {
    badge: "2026.05",
    title: "GitHub First Issue 开源贡献",
    detail: "为 Hmbown/CodeWhale 提交系统复制与 GUI 退出快捷键的热键冲突缺陷报告。",
  },
  {
    badge: "2025",
    title: "TRAE AI 创造力大赛 · 初赛优秀奖",
    detail: "独立开发面向孤独老人的长程记忆情感陪伴智能体「忆伴」。",
  },
  {
    badge: "2024–2028",
    title: `${site.affiliation} · ${site.degree}`,
    detail: "软件学院本科在读，专注 AI Agent 工程实践与多视图聚类研究。",
  },
] as const;

export default function About() {
  // 代表项目：精选展示核心代表作（Lemma / 安养通 / 实习支教申报管理平台），全量见 /projects
  const featuredProjects = projects.filter(
    (project) => project.group !== "contest" && project.featured
  );

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
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧主叙事区 */}
        <div className={styles.mainColumn}>
          <section className={styles.introSection}>
            <p className={styles.leadStatement}>
              我是一名{" "}
              <span className="gradient-text">AI Agent 工作者</span>
              ，把多智能体协作做成真实交付的产品；科研上研究{" "}
              <span className="gradient-text">不完备多视图聚类（IMVC）</span>。
            </p>
            <p className={styles.leadSub}>
              工程上关注任务持久化、可控工作流与复杂系统的从 0 到 1 交付；科研上关注视图缺失下的数据表征恢复与聚类一致性，并持续参与国际会议论文同行评审。
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
              <h2 className={styles.sectionTitle}>时间线</h2>
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
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
