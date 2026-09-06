"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug, trackView }: { slug: string; trackView?: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const url = `/api/views/${slug}`;
        const res = await fetch(url, {
          method: trackView ? "POST" : "GET",
        });
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error("Error fetching views", error);
      }
    };

    fetchViews();
  }, [slug, trackView]);

  if (views === null) return null;

  return <span>👁 {views.toLocaleString()} views</span>;
}
