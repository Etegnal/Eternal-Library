'use client';

import React from 'react';
import Link from 'next/link';
import CardBadges from '@/components/CardBadges';

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string | null;
  coverImage?: string | null;
  readingTime?: string | null;
  publishedAt: Date | string;
}

interface PostCardProps {
  post: PostItem;
}

export default function PostCard({ post }: PostCardProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="group flex flex-col justify-between h-full bg-[#130f0c]/90 hover:bg-[#18130f] border border-amber-900/20 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 shadow-lg relative">
      
      {/* Read & Like Badges in Top Right */}
      <CardBadges postId={post.id} />

      {/* ÜST KISIM */}
      <div>
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="text-amber-400/90 font-medium tracking-wide uppercase">
            Deneme & Yazı
          </span>
          <span className="text-stone-400 text-[11px] flex items-center gap-1 pr-14">
            ⏱ {post.readingTime || '3 dk okuma'}
          </span>
        </div>

        <h3 className="text-lg font-serif font-medium text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 min-h-[3.25rem] mb-2">
          <Link href={`/yazilar/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
          {post.author && <span>{post.author}</span>}
          {post.author && <span>•</span>}
          <span>{dateStr}</span>
        </div>

        <p className="text-sm text-stone-300/80 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* ALT KISIM (En alta mıhlanmış) */}
      <div className="mt-6 pt-4 border-t border-white/5">
        {/* Etiketler */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
            #Edebiyat
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
            #Deneme
          </span>
          {post.author && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
              #{post.author.replace(/\s+/g, '')}
            </span>
          )}
        </div>

        <Link
          href={`/yazilar/${post.slug}`}
          className="flex items-center justify-between text-sm font-medium text-amber-400 group-hover:text-amber-300"
        >
          <span>Yazıyı Oku</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

    </article>
  );
}
