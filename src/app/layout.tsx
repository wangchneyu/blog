import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wangc-blog.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "wangc | 个人博客与作品集",
    template: "%s | wangc",
  },
  description: "wangc 的个人数字花园，专注于全栈开发、AI Agent 智能体以及数学建模领域的探索与记录。",
  keywords: ["wangc", "AI Agent", "全栈开发", "软件工程", "数学建模", "个人博客"],
  authors: [{ name: "wangc" }],
  creator: "wangc",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "wangc | 个人博客与作品集",
    title: "wangc | 个人博客与作品集",
    description: "wangc 的个人数字花园，专注于全栈开发、AI Agent 智能体以及数学建模领域的探索与记录。",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "wangc | 个人博客与作品集",
    description: "wangc 的个人数字花园，专注于全栈开发、AI Agent 智能体以及数学建模领域的探索与记录。",
    images: ["/og-default.png"],
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
