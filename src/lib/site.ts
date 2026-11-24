/**
 * 站点身份的唯一数据源。
 * metadata、首页 Hero、页脚、关于页的联系方式都从这里取，
 * 改名 / 换邮箱 / 更新学校只需改这一处。
 */
export const site = {
  /** 站内显示名。想换成实名，改这一个字段即可 */
  name: "wangc",

  /** 身份三件套：学校 · 专业层次 · 在读区间 */
  affiliation: "河北师范大学",
  degree: "软件工程 · 本科",
  period: "2024 — 2028",

  /** 站点描述：用于 SEO 与分享卡片，控制在 100 字内 */
  description:
    "wangc，河北师范大学软件工程本科生，AI Agent 工作者（主力 Python / Java），同时基于 PyTorch 研究不完备多视图聚类（IMVC，ICLR 2027 在审，IEEE VCIP 审稿人）。",

  /** 事实速览 */
  proofs: ["AI Agent 工作者", "IMVC · ICLR 2027 在审", "IEEE VCIP 审稿人"],

  /** 技术栈 */
  stack: ["AI Agent", "Python", "Java", "PyTorch"],

  email: "wangchenyu@stu.hebtu.edu.cn",
  github: "https://github.com/wangchneyu",
} as const;

/** 供 metadata 复用的标题片段 */
export const SITE_TITLE = `${site.name} · AI Agent 工作者 / IMVC`;
