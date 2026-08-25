'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface CardBadgesProps {
  postId: string;
}

export default function CardBadges({ postId }: CardBadgesProps) {
  const { data: session } = useSession();
  const [isRead, setIsRead] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    try {
      // Check if user has read this post
      const readKey = `eternal_read_${postId}`;
      const bookmarkKey = session?.user?.email 
        ? `eternal_bookmark_${session.user.email}_${postId}`
        : `eternal_bookmark_guest_${postId}`;
      
      const hasRead = localStorage.getItem(readKey) === 'true' || localStorage.getItem(bookmarkKey) !== null;
      if (hasRead) {
        setIsRead(true);
      }

      // Check if user has liked this post
      if (session?.user) {
        fetch(`/api/posts/${postId}/like`)
          .then((res) => res.json())
          .then((data) => {
            if (data.liked) setIsLiked(true);
          })
          .catch(() => {});
      }
    } catch (e) {
      console.error(e);
    }
  }, [postId, session]);

  if (!isRead && !isLiked) return null;

  return (
    <div className="inline-flex items-center gap-1.5 pointer-events-none select-none">
      {isLiked && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100/90 text-rose-900 border border-rose-300/80 font-serif text-[11px] font-semibold tracking-tight shadow-xs"
          title="Bu içeriği beğendiniz"
        >
          <span className="text-rose-600 text-xs">♥</span>
          <span>Beğenildi</span>
        </span>
      )}
      {isRead && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 font-serif text-[11px] font-semibold tracking-tight shadow-xs"
          title="Bu içeriği okudunuz"
        >
          <span className="text-emerald-700 text-xs font-bold">✓</span>
          <span>Okundu</span>
        </span>
      )}
    </div>
  );
}
