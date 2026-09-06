"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({
  slug,
  trackView,
  className,
}: {
  slug: string;
  trackView?: boolean;
  className?: string;
}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const key = `viewed:${slug}`;
        // 同一会话内刷新不重复计数
        const alreadyViewed = trackView && sessionStorage.getItem(key) === "1";
        const res = await fetch(`/api/views/${slug}`, {
          method: alreadyViewed ? "GET" : trackView ? "POST" : "GET",
        });
        if (trackView && !alreadyViewed) {
          sessionStorage.setItem(key, "1");
        }
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error("Error fetching views", error);
      }
    };

    fetchViews();
  }, [slug, trackView]);

  // 加载完成前不渲染，避免悬空的分隔符
  if (views === null) return null;

  return (
    <span className={className}>
      · 👁 {views.toLocaleString()} 次浏览
    </span>
  );
}
