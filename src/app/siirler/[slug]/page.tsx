import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Feather, Flame } from 'lucide-react';

interface PoemDetailProps {
  params: {
    slug: string;
  };
}

export default async function PoemDetailPage({ params }: PoemDetailProps) {
  const poem = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!poem || poem.type !== 'SIIR') {
    notFound();
  }

  const dateStr = new Date(poem.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/siirler"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cozy-amber-dark hover:text-cozy-amber transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Şiirlere Dön</span>
        </Link>
      </div>

      {/* Parchment Styled Poem Container */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-[#FEFBF3] border-2 border-[#E5D5B7] shadow-fire text-center space-y-8">
        
        {/* Top Flame & Feather Icon */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
            <Feather className="w-5 h-5 text-cozy-amber-dark" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-cozy-coffee">
            {poem.title}
          </h1>
          <p className="text-xs text-cozy-coffee-light font-sans">
            {dateStr}
          </p>
        </div>

        <div className="w-24 h-0.5 bg-cozy-amber/30 mx-auto" />

        {/* Poem Stanzas formatted centered */}
        <div className="font-serif text-lg sm:text-xl leading-loose text-cozy-coffee italic whitespace-pre-line max-w-xl mx-auto">
          {poem.content}
        </div>

        <div className="w-24 h-0.5 bg-cozy-amber/30 mx-auto" />

        {/* Footer info */}
        <div className="pt-4 text-xs font-serif text-cozy-coffee-light italic">
          Eternal Library Seçkisi • Lo-Fi Şiirler
        </div>
      </div>
    </div>
  );
}
