import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 安全响应头
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // 重定向 RSS feed 常见路径
  async redirects() {
    return [
      {
        source: "/feed.xml",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/rss.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
