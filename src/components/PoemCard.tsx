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
    <div className="relative group p-6 sm:p-7 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-parchment hover:border-cozy-amber/50 hover:shadow-cozy transition-all duration-300 flex flex-col justify-between cursor-pointer">
      
      {/* Full-card overlay link (Click anywhere to read) */}
      <Link href={detailUrl} className="absolute inset-0 z-0 rounded-2xl" aria-label={poem.title} />

      <div className="relative z-10 pointer-events-none space-y-4">
        
        {/* Top Header Row with Badge & Date + Stamps (Zero Overlap Flex Layout) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
          
          {/* Category Badge */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cozy-amber-dark bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
            <Feather className="w-3.5 h-3.5 text-cozy-amber" />
            <span>Şiir</span>
          </div>

          {/* Date & Vintage Stamps Side-by-Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 text-xs text-cozy-coffee-light">
              <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark" />
              <span>{dateStr}</span>
            </div>

            <CardBadges postId={poem.id} />
          </div>

        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-2xl text-cozy-coffee group-hover:text-cozy-amber-dark transition-colors">
          {poem.title}
        </h3>

        {/* Stanza Excerpt with Master Quote Box Styling & Double Quote Icon */}
        <div className="relative pl-4 border-l-2 border-[#9A3412]/50 font-serif italic text-xs sm:text-sm text-[#5C4033] leading-relaxed whitespace-pre-line bg-amber-50/40 p-3.5 rounded-r-xl border-y border-r border-amber-200/40">
          <Quote className="w-4 h-4 text-amber-600/30 absolute top-2 right-2 pointer-events-none" />
          "{poem.excerpt}"
        </div>

      </div>

      {/* Read Poem Footer */}
      <div className="relative z-10 pointer-events-none pt-4 mt-4 border-t border-dashed border-cozy-parchment-border flex items-center justify-between">
        <span className="text-xs text-cozy-coffee-light italic font-serif">
          {poem.author ? `— ${poem.author}` : 'Eternal Library Şiir Seçkisi'}
        </span>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cozy-amber-dark group-hover:text-cozy-amber transition-colors">
          <span>Şiiri Oku</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

    </div>
  );
}
