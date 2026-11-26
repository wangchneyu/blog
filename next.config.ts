import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 隐藏开发环境左下角 DevTools 悬浮标（生产环境本身不会显示；编译与运行时报错仍正常提示）
  devIndicators: false,

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
