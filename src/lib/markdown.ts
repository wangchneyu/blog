import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/posts");

// 生产环境排除 draft，开发环境可预览
const includeDrafts = process.env.NODE_ENV === "development";

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readingTime?: string;
  content?: string;
  draft?: boolean;
}

function calculateReadingTime(content: string): string {
  // 中文字符数（含标点）
  const chineseChars = (content.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  // 英文单词数
  const englishWords = content
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  // 中文 ~400 字/分钟，英文 ~200 词/分钟
  const minutes = Math.max(1, Math.ceil(chineseChars / 400 + englishWords / 200));
  return `${minutes} min read`;
}

export function getSortedPostsData(): PostData[] {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    return [];
  }

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      
      const readingTime = calculateReadingTime(matterResult.content);

      return {
        slug,
        readingTime,
        tags: matterResult.data.tags || [],
        draft: matterResult.data.draft === true,
        ...(matterResult.data as { title: string; date: string; excerpt: string }),
      };
    })
    .filter((post) => includeDrafts || !post.draft);

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    return [];
  }

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return { slug, draft: data.draft === true };
    })
    .filter((post) => includeDrafts || !post.draft)
    .map((post) => ({
      params: {
        slug: post.slug,
      },
    }));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getSortedPostsData()) {
    for (const tag of post.tags || []) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

export async function getPostData(slug: string): Promise<PostData | null> {
  // slug 来自路由参数：白名单校验防路径穿越，文件不存在时返回 null（由页面转 404）
  if (!/^[A-Za-z0-9_\-\u4e00-\u9fff]+$/.test(slug)) {
    return null;
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  if (!includeDrafts && matterResult.data.draft === true) {
    return null;
  }

  const readingTime = calculateReadingTime(matterResult.content);

  return {
    slug,
    content: matterResult.content,
    readingTime,
    tags: matterResult.data.tags || [],
    ...(matterResult.data as { title: string; date: string; excerpt: string }),
  };
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 用与正文渲染一致的插件管线（remarkGfm/remarkMath → rehypeSlug）生成 TOC，
// 保证锚点 ID 与页面上的标题完全一致，且代码块内的 # 注释行不会被误认成标题
export async function extractToc(content: string): Promise<TocItem[]> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  const html = String(file);

  const toc: TocItem[] = [];
  const headingRegex = /<h([2-4])\b([^>]*)>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const idMatch = /\bid="([^"]*)"/.exec(match[2]);
    if (!idMatch) continue;
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    toc.push({ id: idMatch[1], text, level: Number(match[1]) });
  }

  return toc;
}
