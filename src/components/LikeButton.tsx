'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Check if current logged-in user already liked this post
  useEffect(() => {
    if (!session?.user) return;
    const checkLiked = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}/like`);
        if (res.ok) {
          const data = await res.json();
          if (data.liked) setLiked(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkLiked();
  }, [postId, session]);

  const handleLike = async () => {
    // If not logged in, redirect to login page!
    if (!session) {
      router.push('/giris');
      return;
    }

    if (liked) return;

    setLiked(true);
    setLikes((prev) => prev + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1000);

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (res.status === 401) {
        router.push('/giris');
      }
    } catch (e) {
      console.error('Like error:', e);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleLike}
        className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border shadow-md ${
          liked
            ? 'bg-rose-600 text-white border-rose-500 scale-105 shadow-rose-900/30 cursor-default'
            : 'bg-[#9A3412] hover:bg-[#78350F] text-[#FFFDF9] border-[#78350F]'
        }`}
      >
        <motion.div
          animate={animating ? { scale: [1, 1.5, 1], rotate: [0, -15, 15, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? 'fill-white text-white' : 'fill-white text-white'
            }`}
          />
        </motion.div>

        <span>{likes} Beğeni</span>

        {/* Floating Heart Particles */}
        <AnimatePresence>
          {animating && (
            <>
              <motion.span
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -40, x: -15, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-4 text-rose-500 pointer-events-none"
              >
                ❤️
              </motion.span>
              <motion.span
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -45, x: 15, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute top-0 right-4 text-rose-500 pointer-events-none"
              >
                💖
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
