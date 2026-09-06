import { getSortedPostsData } from "@/lib/markdown";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wangc-blog.vercel.app";

export async function GET() {
  const posts = getSortedPostsData();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join("\n      ") || ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>wangc | 个人博客</title>
    <link>${BASE_URL}</link>
    <description>wangc 的个人数字花园，专注于全栈开发、AI Agent 智能体以及数学建模领域的探索与记录。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
