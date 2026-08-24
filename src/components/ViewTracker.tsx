'use client';

import React, { useEffect, useState } from 'react';

interface ViewTrackerProps {
  postId: string;
  initialViews: number;
}

export default function ViewTracker({ postId, initialViews }: ViewTrackerProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Increment view count on page visit
    const recordView = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}/view`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data.views) setViews(data.views);
        }
      } catch (e) {
        console.error('View tracking error:', e);
      }
    };

    recordView();
  }, [postId]);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900/90 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300/60 dark:border-amber-700">
      <span>👁️</span>
      <span>{views}</span>
    </span>
  );
}
