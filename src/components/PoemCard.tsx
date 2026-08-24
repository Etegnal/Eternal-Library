import React from 'react';
import Link from 'next/link';
import { Feather, Calendar, ArrowRight } from 'lucide-react';

interface PoemCardProps {
  poem: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: Date | string;
  };
}

export default function PoemCard({ poem }: PoemCardProps) {
  const dateStr = new Date(poem.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="relative group p-6 sm:p-7 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-parchment hover:border-cozy-amber/50 hover:shadow-cozy transition-all duration-300">
      {/* Decorative Top Feather Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cozy-amber-dark bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
          <Feather className="w-3.5 h-3.5 text-cozy-amber" />
          <span>Şiir</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-cozy-coffee-light">
          <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark" />
          <span>{dateStr}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-serif font-bold text-2xl text-cozy-coffee group-hover:text-cozy-amber-dark transition-colors mb-3">
        <Link href={`/siirler/${poem.slug}`}>
          {poem.title}
        </Link>
      </h3>

      {/* Stanza Excerpt */}
      <div className="relative pl-4 border-l-2 border-cozy-amber/40 mb-5 font-serif italic text-cozy-coffee/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
        {poem.excerpt}
      </div>

      {/* Read Poem Footer */}
      <div className="pt-3 border-t border-dashed border-cozy-parchment-border flex items-center justify-between">
        <span className="text-xs text-cozy-coffee-light italic">Eternal Library Şiir Seçkisi</span>
        <Link
          href={`/siirler/${poem.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cozy-amber-dark group-hover:text-cozy-amber transition-colors"
        >
          <span>Şiiri Oku</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
