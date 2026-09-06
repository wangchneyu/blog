export interface Project {
  title: string;
  role: string;
  status: string;
  desc: string;
  tags: string[];
  icon: string;
  link?: string; // 项目仓库或演示地址，填了才显示"访问项目"
  featured?: boolean; // 首页精选项目带展示
}

export const projects: Project[] = [
  {
    title: "安养通 - 智慧养老",
    role: "PM + Agent 开发工程师",
    status: "正在进行",
    desc: "主导构建「安养通」智慧养老平台的长者端 Agent，负责整体产品的需求规划（PM）、Agent 逻辑搭建与系统调试。",
    tags: ["AI Agent", "Healthcare", "PM"],
    icon: "🏥",
    featured: true
  },
  {
    title: "校级田径队数字化AI 多智能体协作管理平台",
    role: "全栈独立开发者",
    status: "已完成",
    desc: "独立负责整个系统的全栈架构与开发，通过 AI 多智能体（Multi-Agent）协作模式，优化田径队的日常训练管理与数据分析效率。",
    tags: ["AI Agent", "Full-Stack", "SportsTech"],
    icon: "🏃",
    featured: true
  },
  {
    title: "实习支教申报管理平台",
    role: "全栈开发",
    status: "已完成",
    desc: "独立完成实习支教（DGZJ）申报管理平台的前后端全栈开发工作，实现了管理系统从 0 到 1 的构建与交付。",
    tags: ["Full-Stack", "Management"],
    icon: "💼"
  },
  {
    title: "校园迎新助手 · 狮小伴 AI 对话智能体",
    role: "主前端 + 运维 · PM + Agent 调试工程师",
    status: "已完成",
    desc: "承担「校园迎新助手」核心前端开发与运维保障，确保高并发迎新阶段的平台高可用；同时主导平台搭载的 AI 对话智能体「狮小伴」（易班 AI 辅导员）的需求规划与调试优化，保证交互的准确性与拟人化体验。",
    tags: ["AI Agent", "Frontend", "DevOps", "Education"],
    icon: "👋"
  },
  {
    title: "TRAE AI 创造力大赛 - 忆伴",
    role: "独立参赛者",
    status: "已完成 · 优秀奖",
    desc: "独立开发了「忆伴——面向孤独老人的长程记忆情感陪伴智能体」参赛项目，荣获初赛优秀奖，致力于利用多智能体技术提供情感关怀。",
    tags: ["AI Agent", "Competition"],
    icon: "🏆",
    featured: true
  },
  {
    title: "「高教杯」数学建模大赛",
    role: "建模手",
    status: "校赛三等奖 · 备战省赛",
    desc: "作为核心建模手荣获「高教杯」数学建模大赛（校赛）三等奖，目前正积极备战省赛与全国大学生数学竞赛。",
    tags: ["Mathematical Modeling", "Competition"],
    icon: "📐"
  }
];
