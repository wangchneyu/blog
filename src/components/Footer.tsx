import styles from "./Footer.module.css";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <span className={styles.footerLogo}>{site.name}.</span>
          <span className={styles.footerCopy}>
            © {new Date().getFullYear()} · Built with Next.js & Vanilla CSS
          </span>
        </div>
        <nav className={styles.footerLinks}>
          <Link href="/about" className={styles.footerLink}>关于我</Link>
          <Link href="/projects" className={styles.footerLink}>项目</Link>
          <Link href="/blog" className={styles.footerLink}>文章</Link>
          <a href={`mailto:${site.email}`} className={styles.footerLink}>邮箱</a>
          <a href={site.github} target="_blank" rel="noreferrer" className={styles.footerLink}>GitHub</a>
          <a href="/rss.xml" className={styles.footerLink}>RSS</a>
        </nav>
      </div>
    </footer>
  );
}
