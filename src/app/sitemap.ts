import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/markdown';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wangc-blog.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL;

  const posts = getSortedPostsData().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...posts];
}
