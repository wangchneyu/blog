import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wangc-blog.vercel.app";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BASE_URL;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
