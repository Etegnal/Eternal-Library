'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, Check } from 'lucide-react';

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
          className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-xs border border-rose-300/80"
          title="Beğenildi"
        >
          <Heart className="w-3 h-3 fill-white text-white" />
        </span>
      )}
      {isRead && (
        <span
          className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs border border-emerald-300/80"
          title="Okundu"
        >
          <Check className="w-3 h-3 text-white stroke-[3]" />
        </span>
      )}
    </div>
  );
}
