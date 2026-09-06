import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我",
  description: "wangc 的求学经历、科研经历、项目经历与开源贡献。",
};

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <Link href="/" className={styles.backLink}>
        ← 返回首页
      </Link>

      <header className={styles.pageHeader}>
        <h1 className={styles.title}>关于我</h1>
        <p className={styles.intro}>
          从校园到实验室，从代码到论文——这里记录着我一步步走过的每一段路。
        </p>
      </header>

      {/* 求学经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">求学经历 / EDUCATION</span>
        </div>
        <div className={styles.rowList}>
          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>河北师范大学</h3>
              <span className={styles.rowBadge}>2024 — 2028</span>
            </div>
            <p className={styles.rowMeta}>软件学院 — 软件工程专业（本科生）</p>
            <p className={styles.rowDesc}>
              主修软件工程。在校期间积极投入全栈开发与多智能体协作（AI
              Agent）的技术探索，并深度参与数学建模等多类学术竞赛。
            </p>
          </article>
        </div>
      </section>

      {/* 科研经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">科研经历 / RESEARCH</span>
        </div>
        <div className={styles.rowList}>
          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>多视图聚类研究</h3>
              <span className={styles.rowBadge}>在投</span>
            </div>
            <p className={styles.rowMeta}>ICLR 2027 · CCF-A 类国际会议</p>
            <p className={styles.rowDesc}>
              深入探索数据挖掘与机器学习领域，目前正致力于多视图聚类方向的算法探索与学术研究，
              相关成果已投稿至 CCF-A 类国际顶级会议 ICLR 2027，现于投中。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>IEEE VCIP 审稿人</h3>
              <span className={styles.rowBadge}>Reviewer</span>
            </div>
            <p className={styles.rowMeta}>
              IEEE Visual Communications and Image Processing (VCIP)
            </p>
            <p className={styles.rowDesc}>
              担任 IEEE VCIP 会议审稿人，参与视觉通信与图像处理方向投稿论文的评审工作。
            </p>
          </article>
        </div>
      </section>

      {/* 项目经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">项目经历 / PROJECTS</span>
        </div>
        <div className={styles.rowList}>
          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>安养通 - 智慧养老</h3>
              <span className={styles.rowBadge}>正在进行</span>
            </div>
            <p className={styles.rowMeta}>PM + Agent 开发工程师</p>
            <p className={styles.rowDesc}>
              主导构建「安养通」智慧养老平台的长者端
              Agent，负责整体产品的需求规划（PM）、Agent 逻辑搭建与系统调试。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>校级田径队数字化AI 多智能体协作管理平台</h3>
              <span className={styles.rowBadge}>已完成</span>
            </div>
            <p className={styles.rowMeta}>全栈独立开发者</p>
            <p className={styles.rowDesc}>
              独立负责整个系统的全栈架构与开发，通过 AI
              多智能体（Multi-Agent）协作模式，优化田径队的日常训练管理与数据分析效率。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>校园迎新助手 · 狮小伴 AI 对话智能体</h3>
              <span className={styles.rowBadge}>已完成</span>
            </div>
            <p className={styles.rowMeta}>主前端 + 运维 · PM + Agent 调试工程师</p>
            <p className={styles.rowDesc}>
              承担「校园迎新助手」核心前端开发与运维保障，确保高并发迎新阶段的平台高可用；同时主导平台搭载的
              AI 对话智能体「狮小伴」（易班 AI
              辅导员）的需求规划与调试优化，保证交互的准确性与拟人化体验。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>实习支教申报管理平台（DGZJ）</h3>
              <span className={styles.rowBadge}>已完成</span>
            </div>
            <p className={styles.rowMeta}>全栈开发</p>
            <p className={styles.rowDesc}>
              独立完成实习支教申报管理平台的前后端全栈开发工作，实现了管理系统从 0 到 1
              的构建与交付。
            </p>
          </article>
        </div>
      </section>

      {/* 开源与竞赛 */}
      <section className={styles.section}>
        <div className={styles.sectionHeadingWrapper}>
          <span className="section-heading">开源与竞赛 / OPEN SOURCE &amp; COMPETITIONS</span>
        </div>
        <div className={styles.rowList}>
          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>TRAE AI 创造力大赛</h3>
              <span className={styles.rowBadge}>已完成 · 优秀奖</span>
            </div>
            <p className={styles.rowMeta}>独立参赛者</p>
            <p className={styles.rowDesc}>
              独立开发了「忆伴——面向孤独老人的长程记忆情感陪伴智能体」参赛项目，荣获初赛优秀奖，致力于利用多智能体技术提供情感关怀。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>「高教杯」数学建模大赛 / 大学生数学竞赛</h3>
              <span className={styles.rowBadge}>2024 — Present</span>
            </div>
            <p className={styles.rowMeta}>数学建模手</p>
            <p className={styles.rowDesc}>
              作为核心建模手荣获「高教杯」数学建模大赛（校赛）三等奖，并正积极备战省赛与全国大学生数学竞赛。
            </p>
          </article>

          <article className={styles.row}>
            <div className={styles.rowTop}>
              <h3 className={styles.rowTitle}>GitHub 开源贡献</h3>
              <span className={styles.rowBadge}>2026 年 5 月</span>
            </div>
            <p className={styles.rowMeta}>开源贡献者</p>
            <p className={styles.rowDesc}>
              成功解锁 GitHub 「First Issue」里程碑。针对开源项目 Hmbown/CodeWhale
              运行中系统复制与 GUI 退出快捷键的热冲突问题，提交了精准的缺陷报告。
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
