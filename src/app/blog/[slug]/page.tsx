import Link from "next/link";
import { getAllPostSlugs, getPostData, getSortedPostsData, extractToc } from "@/lib/markdown";
import styles from "./page.module.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";
import ViewCounter from "@/components/ViewCounter";
import TableOfContents from "@/components/TableOfContents";
import CodeBlock from "@/components/CodeBlock";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  if (!postData) return {};

  return {
    title: postData.title,
    description: postData.excerpt,
    keywords: postData.tags,
    authors: [{ name: "wangc" }],
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

        <div className={styles.contentWithSidebar}>
          <div className={`${styles.postContent} post-content`}>
            <MDXRemote
              source={postData.content || ""}
              components={{
                pre: CodeBlock,
              }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeSlug],
                },
              }}
            />
          </div>

          {tocItems.length > 0 && (
            <aside className={styles.tocSidebar}>
              <TableOfContents items={tocItems} />
            </aside>
          )}
        </div>

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
