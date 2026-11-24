import Link from "next/link";
import { getAllPostSlugs, getPostData, getSortedPostsData, extractToc } from "@/lib/markdown";
import styles from "./page.module.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";
import ViewCounter from "@/components/ViewCounter";
import TableOfContents from "@/components/TableOfContents";
import CodeBlock from "@/components/CodeBlock";
import { site } from "@/lib/site";
import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
// 代码高亮与公式样式只在文章页需要，避免全站加载
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

type Props = {
  params: Promise<{ slug: string }>;
};

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
}

function isUnwrappableImageChild(node: HastNode): boolean {
  if (node.type === "text") return !node.value || node.value.trim() === "";
  if (node.type === "element" && node.tagName === "img") return true;
  if (
    node.type === "element" &&
    node.tagName === "a" &&
    node.children &&
    node.children.some((c) => c.type === "element" && c.tagName === "img") &&
    node.children.every(isUnwrappableImageChild)
  ) {
    return true;
  }
  return false;
}

/**
 * Markdown 独立成行的图片会被 remark 包进 <p>，而 mdxComponents.img 会渲染为 <figure>，
 * 形成 <p><figure>...</figure></p> 的非法 HTML 嵌套并触发 React Hydration 报错。
 * 在 HAST 阶段把仅含图片（及空白文本）的 <p> 解包，使 <figure> 作为块级元素直接输出。
 */
function rehypeUnwrapImages() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (!node.children) return;
      const nextChildren: HastNode[] = [];
      for (const child of node.children) {
        if (
          child.type === "element" &&
          child.tagName === "p" &&
          child.children &&
          child.children.some((c) => c.type === "element") &&
          child.children.every(isUnwrappableImageChild)
        ) {
          for (const inner of child.children) {
            if (inner.type === "element") {
              nextChildren.push(inner);
            }
          }
        } else {
          walk(child);
          nextChildren.push(child);
        }
      }
      node.children = nextChildren;
    };
    walk(tree);
  };
}

/**
 * 正文元素映射：把 Markdown 产出的裸标签接进设计系统。
 * - table：套滚动容器，窄屏只滚表格不滚页面
 * - img：title 属性兼作题注，输出 figure + figcaption
 * - a：站外链接补 target/rel 与箭头标记
 */
const mdxComponents = {
  pre: CodeBlock,

  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className={styles.tableScroll}>
      <table {...props}>{children}</table>
    </div>
  ),

  img: ({ src, alt, title, ...props }: ComponentProps<"img">) => (
    <figure>
      {/* 正文图片宽高在构建时未知，next/image 需显式尺寸或 fill 容器，
          故保留原生 img，用 lazy + async 解码兜住性能 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        title={title}
        loading="lazy"
        decoding="async"
      />
      {title ? <figcaption>{title}</figcaption> : null}
    </figure>
  ),

  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
    if (!isExternal) {
      return (
        <a {...props} href={href}>
          {children}
        </a>
      );
    }
    return (
      <a
        {...props}
        href={href}
        className={styles.externalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  if (!postData) return {};

  return {
    title: postData.title,
    description: postData.excerpt,
    keywords: postData.tags,
    authors: [{ name: site.name }],
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: "article",
      publishedTime: postData.date,
      tags: postData.tags,
      images: ["/og-default.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
      images: ["/og-default.png"],
    },
  };
}

export default async function Post({ params }: Props) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  if (!postData) {
    notFound();
  }
  const tocItems = await extractToc(postData.content || "");
  
  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex(p => p.slug === resolvedParams.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // 按共享标签数推荐相关文章（最多 2 篇）
  const currentTags = new Set(postData.tags || []);
  const relatedPosts = allPosts
    .filter(p => p.slug !== resolvedParams.slug)
    .map(p => ({ post: p, shared: (p.tags || []).filter(t => currentTags.has(t)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 2)
    .map(({ post }) => post);

  return (
    <div className={styles.postContainer}>
      <article className={styles.article}>

        <Link href="/blog" className={styles.backLink}>
          ← 返回所有文章
        </Link>

        <header className={styles.postHeader}>
          <div className={styles.metaRow}>
            <time className={styles.postDate}>{postData.date}</time>
            {postData.readingTime && (
              <span className={styles.readingTime}>· {postData.readingTime}</span>
            )}
            <ViewCounter slug={postData.slug} trackView={true} className={styles.readingTime} />
          </div>
          
          <h1 className={styles.postTitle}>{postData.title}</h1>
          
          {postData.tags && postData.tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {postData.tags.map(tag => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className={styles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          )}
          
          {postData.excerpt && (
            <p className={styles.postExcerpt}>{postData.excerpt}</p>
          )}
        </header>

        <div className={styles.headerDivider} />

        {tocItems.length > 0 && (
          <details className={styles.mobileToc}>
            <summary className={styles.mobileTocSummary}>目录</summary>
            <ul className={styles.mobileTocList}>
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  style={{ marginLeft: `${(item.level - 2) * 0.75}rem` }}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className={`post-content ${styles.postContent}`}>
          <MDXRemote
            source={postData.content || ""}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeUnwrapImages, rehypeKatex, rehypeHighlight, rehypeSlug],
              },
            }}
          />
        </div>

        {tocItems.length > 0 && (
          <aside className={styles.tocSidebar} aria-label="目录">
            <TableOfContents items={tocItems} />
          </aside>
        )}

        <div className={styles.postNavigation}>
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className={styles.navLink}>
              <span className={styles.navLabel}>← 上一篇</span>
              <span className={styles.navTitle}>{prevPost.title}</span>
            </Link>
          ) : <div />}
          
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className={`${styles.navLink} ${styles.navRight}`}>
              <span className={styles.navLabel}>下一篇 →</span>
              <span className={styles.navTitle}>{nextPost.title}</span>
            </Link>
          ) : <div />}
        </div>
        
        {relatedPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedHeading}>相关文章</h2>
            <div className={styles.relatedList}>
              {relatedPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.relatedItem}>
                  <span className={styles.relatedItemDate}>{p.date}</span>
                  <span className={styles.relatedItemTitle}>{p.title}</span>
                  <span className={styles.relatedItemArrow}>→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Comments />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}
