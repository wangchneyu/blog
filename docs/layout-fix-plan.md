# 布局修复方案

> 基于 2026-10-26 的全量审查：读完 15 个样式文件（1934 行 CSS）、无头 Chrome 在 1440 / 390 两档视口截图比对。
> 本方案只处理**布局与呈现**问题，不改技术选型、不改视觉语言、不引入新依赖。

## 一、总体判断

站点骨架是成立的：单一阅读宽度、行列表语言统一、玻璃卡片克制、暗色靠 CSS 变量整体翻转。问题集中在两处：

1. **标签页是条半成品支线**——复用了列表页的样式文件，但类名大半对不上，布局是塌的。
2. **响应式只有 600px 一刀切**——断点内漏掉了若干组件，导致小屏上出现挤压、错位、重叠。

另有三处历史遗留的硬编码（header 高度、内容宽度、代码块配色），修一次可以让后续改动不再牵一发动全身。

## 二、修复清单

### P0 — 真缺陷（必须修）

#### P0-1 标签页行布局塌陷

- **现象**：`/tags/Next.js` 里文章条目变成「日期 / 标题 / 阅读时长 / 摘要 / 箭头」五行竖排，箭头 `→` 孤零零占一行；头部无分隔线，"共 N 篇文章"字号偏大。
- **根因**：`src/app/tags/[tag]/page.tsx` 从 `blog/page.module.css` 取样式，但引用的 `postCard`、`cardDate`、`dateYear`、`cardBody`、`cardArrow`、`tag`、`tagList`、`subtitle`、`divider` 九个类名在该文件中**均不存在**。CSS Modules 对未定义类返回 `undefined`，className 退化为字符串 `"undefined"`，所有布局规则失效。
- **改法**：不新增 CSS，直接把标签页映射到列表页已有的同名结构类，使两页 DOM 语言完全一致。

  | 原引用 | 改为 |
  |---|---|
  | `postCard` | `postRow` |
  | `postRowMeta` 包裹 + `dateYear` | `postRowMeta` + `postDate` |
  | `cardBody` | `postRowBody` |
  | `tagList` | `postMetaLine` |
  | `cardArrow` | `postArrow` |
  | `tag`（🏷 眉标） | `postTag` |
  | `subtitle` | `intro` |
  | `divider` | 删除（列表页本就没有分隔线） |

- **验收**：`/tags/Next.js` 与 `/blog` 的文章行视觉完全同构——日期在左列、标题与摘要居中、箭头右侧垂直居中。

#### P0-2 文章页标题重复

- **现象**：`/blog/how-i-built-this-blog` 顶部已有大标题「从 0 到 1：我是如何搭建这个博客的」，正文开头又出现一次完全相同的 H1，中间只隔了标签与摘要。移动端两屏内出现两个等大标题，观感很糟。
- **根因**：`page.tsx` 用 frontmatter 的 `title` 渲染页面标题，而 Markdown 正文里也写了 `# 同名标题`，`MDXRemote` 原样输出。
- **改法**：在数据层兜底，不动源文件。
  在 `src/lib/markdown.ts` 增加 `stripLeadingH1()`，于 `getPostData()` 返回前对正文执行：定位首个非空行，若匹配 `^#\s+` 则整行移除（仅限开头，正文中段的 H1 不动）。
  正文文件保持「H1 + 内容」的完整结构，作者无需记住额外约定。
- **验收**：文章页只出现一个 H1；TOC 不受影响（`extractToc` 只取 h2–h4）；阅读时长仍按完整正文计算。

#### P0-3 页脚不贴底

- **现象**：内容不足一屏的页面（`/blog`、`/tags/*`、404），页脚悬在页面上半部分，下方留 400px 空白。
- **根因**：`Footer.module.css` 写了 `margin-top: auto`，但它的前提是父级为 flex 容器，而 `body` 是普通块级元素，该声明是死代码。
- **改法**：`globals.css` 中把 body 变成纵向 flex 容器，让 `main` 吃掉剩余空间：

  ```css
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main { flex: 1 0 auto; }
  ```

- **风险**：body 改 flex 后需复查 sticky header 是否仍生效（header 作为 flex item，sticky 相对 body 滚动容器工作，预期正常，需实测）。
- **验收**：`/blog` 页脚贴在视口底部；滚动页面时 header 仍吸顶。

### P1 — 移动端适配缺口

#### P1-1 首页「领域」区小屏挤压

- **现象**：390px 下两列各约 139px，「工程 · 把想法做成真实产品」被拆成两行，左右两列 kicker 高度不等，导致下方「多视图聚类 / 全栈开发」基线错位。
- **根因**：`.focusGrid` 是 `1fr 1fr`，600px 断点里没有任何覆盖规则。
- **改法**：在 `page.module.css` 的 600px 断点内改为单列，`gap: 1.5rem`。两条主线改为纵向排列，各自保留左侧渐变竖线。
- **验收**：390px 下两块上下排列，竖线对齐，无断行错位。

#### P1-2 首屏标题断词

- **现象**：390px 下标题断成「用代码探索智 / 能的边界，用 / 文字记录成长。」——「智能」被拆开。
- **根因**：640px 断点把 `<br>` 隐藏交给 `text-wrap: balance`，但字号下限锁在 `2.5rem`（40px），一行只放得下 8 个字，balance 无处可调。
- **改法**：640px 断点内不再隐藏 `<br>`（保留作者写的两行结构），并把字号降到 `clamp(1.55rem, 7.8vw, 2rem)`。390px 下约 30px，11 字的首句可独占一行。
- **验收**：390 / 375 / 320 三档宽度下均为两行，无句中折行。

#### P1-3 文章页移动端对齐错位

- **现象**：600px 以下标题、摘要已改为左对齐，但日期/阅读时长行与标签行仍然居中，三者在同一条竖线上对不齐。
- **根因**：断点内只改了 `.postHeader { text-align: left }`，漏了 `.metaRow` 与 `.tagsContainer` 的 `justify-content`。
- **改法**：600px 断点内补 `.metaRow, .tagsContainer { justify-content: flex-start; }`。
- **验收**：移动端文章页从日期到正文全部左对齐。

#### P1-4 滚动提示与按钮重叠

- **现象**：首屏的圆形 ↓ 提示紧贴 CTA 按钮下沿，视觉上像按钮的附属物，移动端几乎叠在一起。
- **根因**：`.scrollCue` 用 `position: absolute; bottom: 2rem` 贴 section 底部，而内容块垂直居中后的底边恰好落在同一区域，两者没有互相避让。
- **改法**：改为**文档流内**元素——去掉 `position/left/transform`，`margin-top: 2rem` 居中。间距由自身 margin 决定，与视口高度解耦，任何高度都不会再重叠。
- **验收**：1440 与 390 下箭头与按钮间距稳定约 32px。

### P2 — 一致性与可维护性

| 项 | 现状 | 改法 |
|---|---|---|
| **P2-1 内容宽度三种** | about 用 `--max-prose`(720)，blog/projects/首页硬编码 820 | globals 新增 `--max-content: 820px`；about、blog、projects、首页统一引用；正文继续用 `--max-prose: 720px` |
| **P2-2 列表缩进与日期悬空** | 首页 120px、列表页 110px 日期列，标题从第 105px 才起；`align-items: center` 让日期悬在三行中间 | 两处均改为 `92px 1fr auto` + `align-items: start`，日期加 `padding-top: .15rem` 对齐标题基线；箭头单独 `align-self: center` |
| **P2-3 摘要单行截断** | `white-space: nowrap` + ellipsis，820px 宽只显示一行 | 改 `-webkit-line-clamp: 2`（与 projects 的 `.projectDesc` 一致），去掉 nowrap |
| **P2-4 代码块硬编码** | `#0d1117 !important` / `#c9d1d9 !important` 写死在文章页 | 提为 `--code-bg` / `--code-fg` / `--code-border` 三个令牌。**明暗主题均保持深色底**——因为高亮主题固定为 `github-dark`，浅底会让 token 不可读；此举是把隐式决策显式化，视觉不变 |
| **P2-5 TOC 定位** | `right: calc((100vw - 720px)/2 - 250px)`，含滚动条误差，窄屏与正文仅剩 30px | 改 `left: calc(50% + var(--max-prose)/2 + 2rem)`，以视口中心为基准，避开滚动条；`top: calc(var(--header-h) + 2rem)` |
| **P2-6 header 高度散落** | 64px 硬编码在 hero 的 `calc(100vh - 64px)`、正文 `scroll-margin-top: 84px`、TOC `top: 96px`、TOC 列表 `max-height: calc(100vh - 160px)` 四处 | globals 新增 `--header-h: 64px`，四处统一引用；`scroll-margin` 改为 `calc(var(--header-h) + 20px)` |

## 三、执行顺序

1. **P0 全部**（3 项，改动小、互相独立）→ 立即验证
2. **P1 全部**（4 项，集中在 600px 断点）→ 立即验证
3. **P2 全部**（6 项，涉及令牌重构，放最后以免干扰前两步判断）

每阶段结束跑一次 `tsc --noEmit`，全部完成后跑 `lint` + `build`。

## 四、验证方式

- **静态**：`tsc --noEmit`（类型）、`npm run lint`、`npm run build`（确认 SSR 无报错）
- **视觉**：CDP 截图对比 1440×整页 与 390×整页，覆盖 `/`、`/blog`、`/tags/Next.js`、`/blog/how-i-built-this-blog`
- **交互**：sticky header、TOC 滚动高亮、代码复制按钮、移动端目录折叠
- **回归重点**：body 改 flex 后的 sticky header；剥离 H1 后的 TOC 与阅读时长

## 五、明确不改的部分

- **技术栈与样式方案**：继续用 CSS Modules + 全局令牌，不引入 Tailwind / 组件库。
- **视觉语言**：渐变、玻璃卡片、极光背景、行列表语言全部保留。
- **页面结构**：不新增页面、不调整信息架构。
- **`/blog` 页的信息密度**：只有一篇文章，留白多是内容量问题而非布局问题，不通过压缩间距"解决"。
- **浅色主题的代码块配色**：见 P2-4，高亮主题固定深色，浅底会破坏可读性，故不改。

## 六、回滚

所有改动均在 git 工作区，`master` 停留在 `fcc9044`。按阶段提交，任一阶段可单独 `git revert`。改动前工作区是干净的，可随时 `git checkout -- .` 全量回退。
