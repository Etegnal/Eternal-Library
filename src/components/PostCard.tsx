'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookOpen, User } from 'lucide-react';
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
    <article className="flex flex-col justify-between h-full bg-[#120e0b]/80 backdrop-blur-md rounded-2xl p-6 border border-amber-900/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg relative group">
      
      {/* Read & Like Badges in Top Right */}
      <CardBadges postId={post.id} />

      <div>
        {/* Cover Image (If available) */}
        {post.coverImage && (
          <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden bg-amber-950/60 border border-amber-900/30">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120e0b] via-transparent to-transparent" />
          </div>
        )}

        {/* 2. ÜST KISIM (BADGE & SÜRE) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/40 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-amber-400" />
            <span>Deneme & Yazı</span>
          </span>

          <span className="text-xs text-amber-200/60 font-mono flex items-center gap-1 pr-14">
            <Clock className="w-3 h-3 text-amber-500/60" />
            <span>{post.readingTime || '3 dk okuma'}</span>
          </span>
        </div>

        {/* 2. ORTA KISIM (BAŞLIK, META, ÖZET) */}
        {/* Başlık */}
        <h3 className="text-lg font-serif font-medium text-amber-100 line-clamp-2 min-h-[3.5rem] group-hover:text-amber-300 transition-colors">
          <Link href={`/yazilar/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Yazar & Tarih */}
        <div className="flex items-center gap-2 text-xs text-amber-200/60 my-2">
          {post.author && (
            <span className="flex items-center gap-1 text-amber-300/80 font-medium">
              <User className="w-3.5 h-3.5 text-amber-500/70" />
              <span>{post.author}</span>
            </span>
          )}
          {post.author && <span>•</span>}
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500/70" />
            <span>{dateStr}</span>
          </span>
        </div>

        {/* Açıklama Metni */}
        <p className="text-sm text-stone-300/80 line-clamp-3 mb-4 flex-grow font-sans leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* 2. ALT KISIM (ETİKETLER VE BUTON - STICKY FOOTER) */}
      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
        {/* Etiketler */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-amber-200/70 border border-white/5">
            #Edebiyat
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-amber-200/70 border border-white/5">
            #Deneme
          </span>
          {post.author && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-amber-200/70 border border-white/5">
              #{post.author.replace(/\s+/g, '')}
            </span>
          )}
        </div>

        {/* "Yazıyı Oku →" Butonu */}
        <Link
          href={`/yazilar/${post.slug}`}
          className="w-full flex items-center justify-between text-sm text-amber-400 hover:text-amber-300 font-medium group transition-colors"
        >
          <span>Yazıyı Oku</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </article>
  );
}
