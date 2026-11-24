import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目作品集",
  description: `${site.name} 的项目作品集：AI Agent 产品、全栈系统与竞赛作品的完整列表。`,
};

const GROUPS = [
  { key: "ongoing", label: "进行中 / ONGOING" },
  { key: "done", label: "已完成 / DELIVERED" },
  { key: "contest", label: "竞赛 / COMPETITIONS" },
] as const;

export default function Projects() {
  const sections = GROUPS.reduce<
    Array<{
      key: (typeof GROUPS)[number]["key"];
      label: (typeof GROUPS)[number]["label"];
      items: Array<{ project: (typeof projects)[number]; num: string }>;
    }>
  >((acc, { key, label }) => {
    const prevCount = acc.reduce((sum, s) => sum + s.items.length, 0);
    const items = projects
      .filter((p) => p.group === key)
      .map((project, idx) => ({
        project,
        num: String(prevCount + idx + 1).padStart(2, "0"),
      }));
    if (items.length > 0) {
      acc.push({ key, label, items });
    }
    return acc;
  }, []);

  return (
    <div className={styles.projectsContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>

      <header className={styles.pageHeader}>
        <h1 className={styles.title}>项目作品集</h1>
        <p className={styles.researchLead}>
          主力方向：<strong>AI Agent</strong> 工程落地（Python / Java） · 科研方向：
          <strong>不完备多视图聚类</strong>（IMVC · PyTorch · ICLR 2027 在审） —— 共收录{" "}
          {projects.length} 个工程与竞赛项目。
        </p>
      </header>

      {sections.map(({ key, label, items }) => (
        <section key={key} className={styles.groupSection}>
          <div className={styles.sectionHeadingWrapper}>
            <span className="section-heading">{label}</span>
          </div>
          <ul className={styles.projectList}>
            {items.map(({ project, num }) => {
              const isOngoing = project.group === "ongoing";
              const isDelivered = project.status.includes("已交付");
              return (
                <li key={project.title} className={styles.projectRow}>
                  <span className={styles.projectIndex} aria-hidden="true">
                    {num}
                  </span>
                  <div className={styles.projectRowBody}>
                    <div className={styles.projectRowTop}>
                      <h2 className={styles.projectTitle}>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.projectTitleLink}
                          >
                            {project.title}
                            <span className={styles.projectExt} aria-hidden="true">
                              ↗
                            </span>
                          </a>
                        ) : (
                          project.title
                        )}
                      </h2>
                      <span
                        className={`${styles.projectStatus} ${
                          isOngoing
                            ? styles.projectStatusOngoing
                            : isDelivered
                              ? styles.projectStatusDelivered
                              : ""
                        }`}
                      >
                        {isOngoing && <span className={styles.ongoingDot} aria-hidden="true" />}
                        {project.status}
                      </span>
                    </div>
                    <p className={styles.projectRowMeta}>{project.role}</p>
                    <p className={styles.projectDesc}>{project.desc}</p>
                    <div className={styles.projectRowFooter}>
                      <ul className={styles.tagList} aria-label="技术标签">
                        {project.tags.map((tag) => (
                          <li key={tag} className={styles.tagItem}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.projectLink}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
