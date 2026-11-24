"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import styles from "./Comments.module.css";

// giscus 评论配置；若需临时隐藏可恢复占位符
const GISCUS_REPO = "wangchneyu/blog";
const GISCUS_REPO_ID = "R_kgDOV5Zikw";
const GISCUS_CATEGORY_ID = "DIC_kwDOV5Zik84DL1FO";

const GISCUS_CONFIGURED =
  !GISCUS_REPO.startsWith("[") && !GISCUS_REPO_ID.startsWith("[") && !GISCUS_CATEGORY_ID.startsWith("[");

const emptySubscribe = () => () => {};

export default function Comments() {
  const { resolvedTheme } = useTheme();
  // 服务端快照 false、客户端快照 true，水合后即为已挂载
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!GISCUS_CONFIGURED) return null;

  // Prevent hydration mismatch
  if (!mounted) return <div className={styles.commentsPlaceholder} />;

  const giscusTheme = resolvedTheme === "dark" ? "transparent_dark" : "light";

  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>评论交流</h3>
      <Giscus
        id="comments"
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category="Announcements"
        categoryId={GISCUS_CATEGORY_ID}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
