import Link from "next/link";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目作品集",
  description: "wangc 的全栈开发与 AI Agent 项目展示。",
};

const GROUPS = [
  { key: "ongoing", label: "进行中" },
  { key: "done", label: "已完成" },
  { key: "contest", label: "竞赛" },
] as const;

export default function Projects() {
  return (
    <div className={styles.projectsContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>

      <header className={styles.pageHeader}>
        <h1 className={styles.title}>项目作品集</h1>
        <p className={styles.researchLead}>
          🔬 科研主线进行中：多视图聚类 · ICLR 2027 在投 —— 以下是工程与竞赛项目。
        </p>
      </header>

      {GROUPS.map(({ key, label }) => {
        const groupProjects = projects.filter((p) => p.group === key);
        if (groupProjects.length === 0) return null;
        return (
          <section key={key} className={styles.groupSection}>
            <div className={styles.sectionHeadingWrapper}>
              <span className="section-heading">{label}</span>
            </div>
            <ul className={styles.projectList}>
              {groupProjects.map((project) => (
                <li key={project.title} className={styles.projectRow}>
                  <span className={styles.projectIcon} aria-hidden="true">
                    {project.icon}
                  </span>
                  <div className={styles.projectRowBody}>
                    <div className={styles.projectRowTop}>
                      <h2 className={styles.projectTitle}>{project.title}</h2>
                      <span className={styles.projectStatus}>{project.status}</span>
                    </div>
                    <p className={styles.projectRowMeta}>
                      {project.role}
                      {project.link && (
                        <>
                          {" · "}
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.projectLink}
                          >
                            访问项目 ↗
                          </a>
                        </>
                      )}
                    </p>
                    <p className={styles.projectDesc}>{project.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
