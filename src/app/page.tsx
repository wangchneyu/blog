import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./page.module.css";

/**
 * 首页只有一屏：身份 + 出口。
 * 项目、科研、文章分别在 /projects、/about、/blog，首页不再重复陈列。
 */
export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            {site.affiliation} · {site.degree} ·{" "}
            <span className={styles.keepTogether}>{site.period}</span>
          </p>

          <h1 className={styles.heroTitle}>
            我是 {site.name}，一名{" "}
            <span className={`${styles.keepTogether} gradient-text`}>AI Agent</span> 工作者，
            也研究 <span className={`${styles.keepTogether} gradient-text`}>IMVC</span> 多视图聚类。
          </h1>

          <div className={styles.heroCta}>
            <Link href="/projects" className={styles.primaryBtn}>
              查看项目 →
            </Link>
            <Link href="/about" className={styles.ghostBtn}>
              关于我
            </Link>
            <a href={`mailto:${site.email}`} className={styles.ghostBtn}>
              ✉ 邮箱
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={styles.ghostBtn}>
              GitHub ↗
            </a>
          </div>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.floatingOrb1} />
          <div className={styles.floatingOrb2} />
          <div className={styles.floatingOrb3} />
        </div>
      </section>
    </div>
  );
}
