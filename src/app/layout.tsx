import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, SITE_TITLE } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wangc-blog.vercel.app";

/** 结构化数据：让搜索引擎知道这是一个「人」的站点，而不是无名博客 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: site.name,
      url: SITE_URL,
      description: site.description,
      email: `mailto:${site.email}`,
      jobTitle: "AI Agent 工作者 · 软件工程本科生",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: site.affiliation,
      },
      sameAs: [site.github],
      knowsAbout: ["AI Agent", "多智能体协作", "不完备多视图聚类", "IMVC", "Python", "Java", "PyTorch"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: site.description,
      inLanguage: "zh-CN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    "AI Agent",
    "多智能体协作",
    "不完备多视图聚类",
    "IMVC",
    "Python",
    "Java",
    "PyTorch",
    "软件工程",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: site.description,
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: site.description,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skipLink">
            跳到主要内容
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
