# wangc 的个人博客

基于 Next.js 16 (App Router) 的个人数字花园：博客、项目作品集与个人履历，支持暗色模式、Markdown/MDX 写作、标签聚合、RSS 订阅与浏览量统计。

## 快速开始

```bash
npm install
npm run dev        # 开发环境 http://localhost:3000（草稿文章仅开发环境可见）
npm run build      # 生产构建
npm run start      # 生产预览
```

## 如何写文章

在 `content/posts/` 下新建 `你的文件名.md`（文件名即 URL slug，建议英文/数字/连字符），头部使用 frontmatter：

```yaml
---
title: "文章标题"            # 必填
date: "2026-09-06"          # 必填，用于排序与 sitemap
excerpt: "摘要一句话"        # 必填，用于列表页、首页、RSS、社交分享
tags: ["AI Agent", "随笔"]   # 可选，自动生成 /tags/标签 聚合页
draft: true                  # 可选，生产环境完全隐藏，开发环境可预览
---
```

正文支持：GFM 表格/任务列表、KaTeX 公式（`$E=mc^2$`）、代码高亮 + 一键复制按钮、自动标题锚点与目录。正文中的 `##`～`####` 会自动进入目录。

## 需要配置的能力（不配置则优雅降级）

| 能力 | 配置位置 | 未配置时 |
|---|---|---|
| 浏览量统计 | Vercel KV，环境变量 `KV_REST_API_URL` / `KV_REST_API_TOKEN` | 恒返回 0 / mock 1 |
| 评论区（giscus） | `src/components/Comments.tsx` 顶部三个常量（repo / repoId / categoryId） | 评论区整块隐藏 |
| 站点地址（RSS/sitemap/OG） | 环境变量 `NEXT_PUBLIC_SITE_URL` | 占位域名 `wangc-blog.vercel.app` |

## 部署

### 方式一：Vercel（推荐）

1. 推送到 GitHub，Vercel 导入仓库
2. 在 Vercel 上创建/绑定 Upstash Redis（KV），自动注入环境变量
3. 配置 `NEXT_PUBLIC_SITE_URL` 为最终域名
4. giscus 配置方法：公开仓库开启 Discussions → 安装 [giscus app](https://giscus.app) → 按 giscus.app 生成的值填入 `Comments.tsx`

### 方式二：自托管服务器（VPS）

服务器要求：Node.js ≥ 20.9（见 `package.json` 的 `engines`）。

```bash
npm ci
npm run build
npm start   # 默认监听 3000 端口
```

- 建议用 `pm2` 或 systemd 守护进程，Nginx/Caddy 反向代理 80/443 → 3000
- 环境变量通过 `.env.local`（参考 `.env.example`）或进程环境注入
- 浏览量统计走 Upstash Redis 的 HTTP API，服务器本身无需安装数据库

## 目录结构

```
content/posts/          # Markdown 文章
src/app/                # 页面（首页/about/projects/blog/tags）+ rss/sitemap/robots
src/app/api/views/      # 浏览量 API（Vercel KV）
src/components/         # Header/Footer/TOC/评论/复制按钮等
src/lib/markdown.ts     # 文章读取、draft 过滤、阅读时长、TOC 提取
```
