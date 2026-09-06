import Link from "next/link";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目作品集",
  description: "wangc 的全栈开发与 AI Agent 项目展示。",
};

export default function Projects() {
  return (
    <div className={styles.projectsContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>
      
      <div className={styles.pageHeader}>
        <span className={styles.tag}>🚀 Showcase</span>
        <h1 className={styles.title}>项目作品集</h1>
        <p className={styles.subtitle}>Building intelligent solutions and full-stack applications.</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.projectGrid}>
        {projects.map((project, idx) => (
          <div key={idx} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <span className={styles.projectIcon}>{project.icon}</span>
              <span className={styles.projectStatus}>{project.status}</span>
            </div>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectRole}>
              <strong>角色:</strong> {project.role}
            </p>
            <p className={styles.projectDesc}>{project.desc}</p>
            
            <div className={styles.tagsRow}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.projectTag}>{tag}</span>
              ))}
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className={styles.projectLink}>
                访问项目 ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
