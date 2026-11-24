# 正文元素样式补全方案

> 状态：已完成（2026-10-26）
> 范围：`src/app/blog/[slug]/` 路由下 Markdown 正文的渲染层与样式层
> 前置结论：布局三项 P0 已修复；本方案处理"正文承载能力"，不涉及视觉语言重做

---

## 一、问题

`remark-gfm` 与 `remark-math` 已在管线中，Markdown 层面**支持**表格、任务列表、脚注语法与图片，但样式层只覆盖了 8 类元素：

```css
.postContent h1, h2, h3, h4, p, a, ul, ol, li, blockquote, pre, code
```

`table` / `img` / `figure` / `figcaption` / `hr` / 任务列表复选框**没有任何规则**。后果不是"不好看"，是"写出来就坏"：

| 元素 | 现状 | 实际后果 |
|---|---|---|
| `table` | 无样式，浏览器默认 | 无边框、无表头区隔；窄屏直接撑破 720px 容器，正文出现横向滚动条 |
| `img` | 无样式 | 原图宽度硬撑，超出容器；无圆角，与玻璃卡片语言断裂 |
| 题注 | 无约定 | 图下说明只能手写斜体段落，和正文混在一起 |
| `hr` | 无样式 | 一条实心黑线，与 `headerDivider` 的渐变分隔语言冲突 |
| 任务列表 | 无样式 | 复选框后仍带项目符号，出现"• ☐ 待办"的双重标记 |
| `blockquote` | 有样式但受 `p` 规则污染 | 内部段落带 1.5rem 下边距，引用块底部多出一块空白 |

另有一处中文排版问题：引用块 `font-style: italic`。中文没有真斜体，浏览器用伪斜体倾斜字形，观感劣化。

## 二、目标

1. 任何 GFM/Markdown 语法写进文章，都有确定的呈现，不出现裸元素。
2. 所有新增样式**只用现有令牌**（`--border-color` / `--bg-secondary` / `--radius-md` / `--accent-1`），不引入硬编码色值。
3. 图片与表格在 390px 视口下不撑破容器。
4. 建立"图片题注"的写作约定，作者无需写额外 HTML。

## 三、明确不做（留待后续触发）

| 事项 | 为何本次不做 |
|---|---|
| 正文字号 1.05rem→1.15rem、行宽 720→660 | 属于阅读体验专项，会改变现有文章观感，应单独评估 |
| 动态 OG 图（`next/og`） | 与本方案无耦合，属传播层 |
| 归档 / 分页 / 搜索 | 内容量未到阈值 |
| 视觉语言换血（告别靛紫渐变） | 价值判断，需对照页后再定 |

## 四、方案

### P0-1 表格：滚动容器 + 令牌化外观

`remark-gfm` 输出的 `<table>` 是裸标签。给它套一层滚动容器，窄屏横滑时只滚表格、不滚页面。

**改法**：在 `page.tsx` 的 `components` 映射里接管 `table`，包一层 `<div className={styles.tableScroll}>`；样式补表头底色、单元格分隔线、斑马纹、圆角。

**注意点**：GFM 的列对齐通过 `align` 属性输出（`:--:` / `--:`），CSS 的 `text-align` 会覆盖表现属性。因此需显式补 `[align='center']` / `[align='right']` 规则，否则语法层面的对齐会静默失效。

### P0-2 图片 + 题注

**改法**：映射 `img`，输出 `<figure><img/><figcaption>{title}</figcaption></figure>`。

**写作约定**（写进 README 的 Markdown 说明段）：

```md
![替代文本](/images/xxx.png "这里是题注")
```

`title` 属性同时充当题注文本；不写 `title` 则只渲染图片，不产生空 `figcaption`。图片统一 `max-width: 100%`、圆角、细边框、`loading="lazy"`。

### P0-3 分隔线与引用块修正

- `hr`：改为与 `.headerDivider` 同款渐变细线，居中，最大宽度收敛，避免长文中的分隔过重。
- `blockquote`：内部最后一个 `p` 去掉下边距；`font-style` 由 `italic` 改为 `normal`，用左侧竖线与浅底色承担引用语义，避免中文伪斜体。
- 嵌套列表：`li > ul/ol` 收紧上边距，避免子列表与父项脱节。

### P1-1 任务列表

GFM 任务列表的 `<li>` 带 `task-list-item` 类、`<ul>` 带 `contains-task-list` 类（`mdast-util-gfm-task-list-item` 注入的 `hProperties`）。用这两类去掉项目符号，复选框走 `accent-color: var(--accent-1)` 保留原生控件以维持可访问性。

同时保留 `li:has(> input[type='checkbox'])` 作为兜底选择器，防止类名行为变化导致回退。

### P1-2 外链标记

映射 `a`：`http(s)://` 开头视为外链，补 `target="_blank"` + `rel="noopener noreferrer"`，CSS `::after` 加 `↗`。站内链接行为不变。

理由：正文里混排站内锚点与外链时，读者无法预判点击是否会离开站点。

## 五、验收

| 项 | 标准 |
|---|---|
| 渲染 | 新建 `content/posts/prose-specimen.md`（`draft: true`，仅开发环境可见）作为活样本，覆盖表格 / 图片 / 任务列表 / 分隔线 / 引用 / 嵌套列表 / 外链 |
| 桌面 1440 | 表格有表头底色与斑马纹、对齐语法生效、图片带题注 |
| 移动 390 | 表格横滑不撑破容器、图片不溢出、任务列表无双符号 |
| 主题 | 浅色 / 暗色各查一遍，无硬编码色值导致的突兀块 |
| 工程 | `tsc --noEmit` 0 错误、`eslint` 干净、`next build` 通过 |

## 六、回滚

改动集中在三个文件：`page.tsx`（components 映射）、`page.module.css`（新增样式段）、`prose-specimen.md`（样本）。回滚只需还原前两个文件并删除样本，无数据迁移、无依赖变更。

## 七、执行顺序

1. `page.tsx` 增加 `table` / `img` / `a` 三个映射（`pre` 保持不变）
2. `page.module.css` 新增「正文扩展元素」样式段，修正 `blockquote`
3. 建 `prose-specimen.md` 样本
4. 双端 + 双主题验证 → 类型检查 → 构建

---

## 八、实现与方案的偏差（执行后回填）

| 项 | 方案假设 | 实际情况 | 处理 |
|---|---|---|---|
| GFM 列对齐 | 输出 `align` 属性，会被 `text-align` 覆盖 | 本工具链经 hast-to-jsx 输出**内联 `style="text-align:…"`**，优先级更高 | 删除两条 `[align]` 规则（死代码），改为注释说明 |
| 表格窄屏 | 只需横向滚动 | `min-width: 460px` 在 390px 下每列仅 44px 可用，「首次访问」被拆成「首次访 / 问」 | 移动端 `min-width: 520px` + 单元格内边距 1rem→0.75rem |
| 滚动体验 | 未纳入 | 表格滑到边界会把滚动链传给页面，移动端易误触发整页位移 | 补 `overscroll-behavior-x: contain`、`scrollbar-width: thin` |
| 图片标签 | 用原生 `img` | `@next/next/no-img-element` 报警 | 正文图片宽高构建时未知，`next/image` 强制尺寸或 `fill`，保留原生 `img` 并局部豁免规则，注明理由 |
| 题注断行 | 未考虑 | 中文题注末行只剩「提供」两字 | `text-wrap: balance` 均分断行 |

### 验证结果

- `tsc --noEmit` 0 错误；`eslint` 0 错误 0 警告
- `next build` 通过，13 个静态路由；`/blog/prose-specimen` **未**进入产物（draft 过滤生效）
- 1440 / 390 两档 × 明暗两主题：表格、题注、任务列表、分隔线、外链均按预期渲染
- 实测数值：390px 下正文容器 350px，图片 350px 不溢出，表格 460→520px 在容器内横滑，页面 `scrollWidth == innerWidth`（无整页横向溢出）

