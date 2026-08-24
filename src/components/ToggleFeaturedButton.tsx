'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ToggleFeaturedButtonProps {
  postId: string;
  initialFeatured: boolean;
}

export default function ToggleFeaturedButton({ postId, initialFeatured }: ToggleFeaturedButtonProps) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = !featured;
    setFeatured(newStatus);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: newStatus }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        setFeatured(!newStatus); // Revert on failure
      }
    } catch (e) {
      console.error(e);
      setFeatured(!newStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
        featured
          ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shadow-sm'
          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-400 dark:text-amber-600 hover:text-rose-500 border border-amber-200 dark:border-amber-900'
      }`}
      title={featured ? 'Ana Sayfada Gösteriliyor (Tıkla ve Gizle)' : 'Ana Sayfaya Ekle (Tıkla ve Göster)'}
      aria-label="Ana Sayfa Kalp Toggle"
    >
      <Heart className={`w-4 h-4 transition-transform ${featured ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
      <span className="text-[11px] font-bold hidden sm:inline">
        {featured ? 'Ana Sayfada' : 'Gizli'}
      </span>
    </button>
  );
}
