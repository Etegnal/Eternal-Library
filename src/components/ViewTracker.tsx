'use client';

import React, { useEffect, useState } from 'react';

interface ViewTrackerProps {
  postId: string;
  initialViews: number;
}

export default function ViewTracker({ postId, initialViews }: ViewTrackerProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Record read state in localStorage
    try {
      localStorage.setItem(`eternal_read_${postId}`, 'true');
    } catch (e) {
      console.error(e);
    }

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
    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#78350F] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
      <span>👁️</span>
      <span>{views}</span>
    </span>
  );
}
