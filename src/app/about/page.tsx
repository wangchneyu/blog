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
      
      <div className={styles.pageHeader}>
        <span className={styles.tag}>🧑‍💻 Personal Overview</span>
        <h1 className={styles.title}>关于我</h1>
        <p className={styles.intro}>
          从校园到实验室，从代码到论文——这里记录着我一步步走过的每一段路。
          Welcome to my story.
        </p>
      </div>

      {/* 求学经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🎓</span>
          <div>
            <h2 className={styles.sectionTitle}>求学经历</h2>
            <p className={styles.sectionSubtitle}>Education</p>
          </div>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>河北师范大学</h3>
              <span className={styles.itemDate}>2024 — 2028</span>
            </div>
            <p className={styles.itemOrg}>软件学院 — 软件工程专业 (本科生)</p>
            <p className={styles.itemDesc}>
              主修软件工程。在校期间积极投入全栈开发与多智能体协作(AI Agent)的技术探索，
              并深度参与数学建模等多类学术竞赛。
            </p>
          </div>
        </div>
      </section>

      {/* 科研经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🔬</span>
          <div>
            <h2 className={styles.sectionTitle}>科研经历</h2>
            <p className={styles.sectionSubtitle}>Research Experience</p>
          </div>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>多视图聚类研究</h3>
              <span className={styles.itemDate}>在投</span>
            </div>
            <p className={styles.itemOrg}>ICLR 2027 · CCF-A 类国际会议</p>
            <p className={styles.itemDesc}>
              深入探索数据挖掘与机器学习领域，目前正致力于多视图聚类方向的算法探索与学术研究，
              相关成果已投稿至 CCF-A 类国际顶级会议 ICLR 2027，现于投中。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>IEEE VCIP 审稿人</h3>
              <span className={styles.itemDate}>Reviewer</span>
            </div>
            <p className={styles.itemOrg}>IEEE Visual Communications and Image Processing (VCIP)</p>
            <p className={styles.itemDesc}>
              担任 IEEE VCIP 会议审稿人，参与视觉通信与图像处理方向投稿论文的评审工作。
            </p>
          </div>
        </div>
      </section>

      {/* 项目经历 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🛠</span>
          <div>
            <h2 className={styles.sectionTitle}>项目经历</h2>
            <p className={styles.sectionSubtitle}>Project Experience</p>
          </div>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>校级田径队数字化AI 多智能体协作管理平台</h3>
              <span className={styles.itemDate}>已完成</span>
            </div>
            <p className={styles.itemOrg}>全栈独立开发者</p>
            <p className={styles.itemDesc}>
              独立负责整个系统的全栈架构与开发，通过 AI 多智能体（Multi-Agent）协作模式，优化田径队的日常训练管理与数据分析效率。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>安养通 - 智慧养老</h3>
              <span className={styles.itemDate}>正在进行</span>
            </div>
            <p className={styles.itemOrg}>PM + Agent 开发工程师</p>
            <p className={styles.itemDesc}>
              主导构建「安养通」智慧养老平台的长者端 Agent，负责整体产品的需求规划（PM）、Agent 逻辑搭建与系统调试。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>校园迎新助手 · 狮小伴 AI 对话智能体</h3>
              <span className={styles.itemDate}>已完成</span>
            </div>
            <p className={styles.itemOrg}>主前端 + 运维 · PM + Agent 调试工程师</p>
            <p className={styles.itemDesc}>
              承担「校园迎新助手」核心前端开发与运维保障，确保高并发迎新阶段的平台高可用；同时主导平台搭载的 AI
              对话智能体「狮小伴」（易班 AI 辅导员）的需求规划与调试优化，保证交互的准确性与拟人化体验。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>实习支教申报管理平台（DGZJ）</h3>
              <span className={styles.itemDate}>已完成</span>
            </div>
            <p className={styles.itemOrg}>全栈开发</p>
            <p className={styles.itemDesc}>
              独立完成实习支教申报管理平台的前后端全栈开发工作，实现了管理系统从 0 到 1 的构建与交付。
            </p>
          </div>
        </div>
      </section>

      {/* 开源与竞赛 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🏆</span>
          <div>
            <h2 className={styles.sectionTitle}>开源与竞赛</h2>
            <p className={styles.sectionSubtitle}>Open Source & Competitions</p>
          </div>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>TRAE AI 创造力大赛</h3>
              <span className={styles.itemDate}>已完成 · 优秀奖</span>
            </div>
            <p className={styles.itemOrg}>独立参赛者</p>
            <p className={styles.itemDesc}>
              独立开发了“忆伴——面向孤独老人的长程记忆情感陪伴智能体”参赛项目，荣获初赛优秀奖，致力于利用多智能体技术提供情感关怀。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>“高教杯”数学建模大赛 / 大学生数学竞赛</h3>
              <span className={styles.itemDate}>2024 — Present</span>
            </div>
            <p className={styles.itemOrg}>数学建模手</p>
            <p className={styles.itemDesc}>
              作为核心建模手荣获“高教杯”数学建模大赛（校赛）三等奖，并正积极备战省赛与全国大学生数学竞赛。
            </p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>GitHub 开源贡献</h3>
              <span className={styles.itemDate}>2026 年 5 月</span>
            </div>
            <p className={styles.itemOrg}>开源贡献者</p>
            <p className={styles.itemDesc}>
              成功解锁 GitHub “First Issue” 里程碑。针对开源项目 `Hmbown/CodeWhale` 
              运行中系统复制与 GUI 退出快捷键的热冲突问题，提交了精准的缺陷报告。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
