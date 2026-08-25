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
    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 pointer-events-none">
      {isLiked && (
        <span
          className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs shadow-md border border-rose-300 animate-pulse"
          title="Bu içeriği beğendiniz"
        >
          ❤️
        </span>
      )}
      {isRead && (
        <span
          className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md border border-emerald-300"
          title="Okudunuz"
        >
          ✓
        </span>
      )}
    </div>
  );
}
