import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Feather } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import ViewTracker from '@/components/ViewTracker';
import PoemCard from '@/components/PoemCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  // Fetch 3 related poems
  const relatedPoems = await prisma.post.findMany({
    where: {
      type: 'SIIR',
      id: { not: poem.id },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const dateStr = new Date(poem.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      {/* Back Link Button matching Image 2 style */}
      <div>
        <Link
          href="/siirler"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#78350F] bg-[#FEF9EE] hover:bg-[#FDE68A]/60 border border-[#FDE68A] shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span>Tüm Şiirlere Dön</span>
        </Link>
      </div>

      {/* Light Parchment Styled Poem Container (Matching Image 2 Colors) */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire text-center space-y-8">
        
        {/* Top Feather Badge and View Counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#78350F] bg-[#FEF3C7] border border-[#FDE68A]">
              <Feather className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>Şiir</span>
            </div>
          </div>

          {/* View Counter Badge */}
          <ViewTracker postId={poem.id} initialViews={poem.views} />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
            {poem.title}
          </h1>
          <p className="text-xs text-[#785438] font-sans font-medium">
            {dateStr}
          </p>
        </div>

        <div className="w-24 h-0.5 bg-[#E6D7BC] mx-auto" />

        {/* Poem Content - High contrast dark coffee font on light parchment */}
        <div className="font-serif text-lg sm:text-xl leading-loose text-[#362215] italic whitespace-pre-line max-w-xl mx-auto">
          {poem.content}
        </div>

        <div className="w-24 h-0.5 bg-[#E6D7BC] mx-auto" />

        {/* LIKE HEART BUTTON AT BOTTOM OF POEM */}
        <div className="pt-4 text-center">
          <LikeButton postId={poem.id} initialLikes={poem.likes} />
        </div>
      </div>

      {/* RELATED POEMS RECOMMENDATION SECTION */}
      {relatedPoems.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-[#E6D7BC] pb-3">
            <Feather className="w-5 h-5 text-[#9A3412]" />
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
              Bunu da İnceleyin: Diğer Şiirler
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPoems.map((relPoem) => (
              <PoemCard key={relPoem.id} poem={relPoem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
