'use client';

import React from 'react';
import Link from 'next/link';
import { Feather, Calendar, ArrowRight, Quote } from 'lucide-react';
import CardBadges from '@/components/CardBadges';

interface PoemCardProps {
  poem: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author?: string | null;
    publishedAt: Date | string;
  };
}

export default function PoemCard({ poem }: PoemCardProps) {
  const dateStr = new Date(poem.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const detailUrl = `/siirler/${poem.slug}`;

  return (
    <div className="relative group p-4 sm:p-5 rounded-2xl bg-[#FEFBF3] dark:bg-[#23120A] hover:bg-white dark:hover:bg-[#2A150C] border-2 border-[#E8DCC4] dark:border-[#3D2214] hover:border-cozy-amber/50 dark:hover:border-amber-700/60 shadow-parchment hover:shadow-cozy transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden h-full">
      
      {/* Full-card overlay link (Click anywhere to read) */}
      <Link href={detailUrl} className="absolute inset-0 z-0 rounded-2xl" aria-label={poem.title} />

      <div className="relative z-10 pointer-events-none space-y-3">
        
        {/* Top Header Row: Category Badge & CardBadges on Left, Date on Right */}
        <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 dark:border-amber-900/60 pb-3">
          
          {/* Category Badge & Status Icons */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cozy-amber-dark dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60 shrink-0">
              <Feather className="w-3.5 h-3.5 text-cozy-amber dark:text-amber-400" />
              <span>Şiir</span>
            </div>
            <CardBadges postId={poem.id} />
          </div>

          {/* Date on Right */}
          <div className="flex items-center gap-1 text-[11px] text-cozy-coffee-light dark:text-amber-200/70 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark dark:text-amber-400" />
            <span className="font-sans">{dateStr}</span>
          </div>

        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-xl text-cozy-coffee dark:text-amber-100 group-hover:text-cozy-amber-dark dark:group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
          {poem.title}
        </h3>

        {/* Stanza Excerpt with Master Quote Box Styling */}
        <div className="relative pl-3.5 border-l-2 border-[#9A3412]/50 dark:border-amber-600/60 font-serif italic text-xs sm:text-sm text-[#5C4033] dark:text-amber-100/90 leading-relaxed whitespace-pre-line bg-amber-50/40 dark:bg-[#1A0D06]/80 p-3 rounded-r-xl border-y border-r border-amber-200/40 dark:border-amber-900/50 tracking-tight sm:tracking-normal line-clamp-3">
          <Quote className="w-3.5 h-3.5 text-amber-600/30 dark:text-amber-400/40 absolute top-2 right-2 pointer-events-none" />
          "{poem.excerpt}"
        </div>

      </div>

      {/* Read Poem Footer */}
      <div className="relative z-10 pointer-events-none pt-3 mt-3 border-t border-dashed border-cozy-parchment-border dark:border-amber-900/60 flex items-center justify-between gap-2">
        <span className="text-xs text-cozy-coffee-light dark:text-amber-200/70 italic font-serif truncate min-w-0 flex-1">
          {poem.author ? `— ${poem.author}` : '— Eternal'}
        </span>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-cozy-amber-dark dark:text-amber-300 group-hover:text-cozy-amber dark:group-hover:text-amber-200 transition-colors shrink-0">
          <span>Şiiri Oku</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

    </div>
  );
}
