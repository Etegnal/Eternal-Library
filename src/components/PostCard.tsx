'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import CardBadges from '@/components/CardBadges';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author?: string | null;
    coverImage?: string | null;
    readingTime?: string | null;
    publishedAt: Date | string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="relative group flex flex-col justify-between bg-[#FFFDF9] hover:bg-white rounded-2xl border border-[#E6D7BC] hover:border-[#8B4513]/40 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3 mb-3.5 text-xs text-cozy-coffee-light">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#8B4513]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{dateStr}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1 text-[#8B4513]">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>

          <CardBadges postId={post.id} />
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#362215] group-hover:text-[#8B4513] transition-colors line-clamp-2 mb-2.5 leading-snug">
          <Link href={`/yazilar/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-[#5C4033] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-sans">
          {post.excerpt}
        </p>
      </div>

      {/* Read More Footer Link */}
      <div className="pt-3.5 border-t border-amber-200/60 flex items-center justify-between mt-auto">
        <span className="text-xs text-[#5C4033] italic font-serif">
          {post.author ? `— ${post.author}` : '— Eternal'}
        </span>
        <Link
          href={`/yazilar/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B4513] group-hover:text-amber-800 transition-colors"
        >
          <span>Devamını Oku</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
