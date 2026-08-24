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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/siirler"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cozy-amber-dark dark:text-amber-400 hover:text-cozy-amber dark:hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Şiirlere Dön</span>
        </Link>
      </div>

      {/* Parchment Styled Poem Container */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-[#FEFBF3] dark:bg-[#23120A] border-2 border-[#E5D5B7] dark:border-[#5C3119] shadow-fire text-center space-y-8">
        
        {/* Top Feather Icon and View Tracker */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center border border-amber-300 dark:border-amber-700">
              <Feather className="w-5 h-5 text-cozy-amber-dark dark:text-amber-300" />
            </div>
          </div>

          {/* View Counter with 👁️ Emoji */}
          <ViewTracker postId={poem.id} initialViews={poem.views} />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-cozy-coffee dark:text-amber-300">
            {poem.title}
          </h1>
          <p className="text-xs text-cozy-coffee-light dark:text-amber-200/80 font-sans">
            {dateStr}
          </p>
        </div>

        <div className="w-24 h-0.5 bg-cozy-amber/30 dark:bg-amber-700/50 mx-auto" />

        {/* Poem Stanzas formatted centered */}
        <div className="font-serif text-lg sm:text-xl leading-loose text-cozy-coffee dark:text-amber-100 italic whitespace-pre-line max-w-xl mx-auto">
          {poem.content}
        </div>

        <div className="w-24 h-0.5 bg-cozy-amber/30 dark:bg-amber-700/50 mx-auto" />

        {/* LIKE HEART BUTTON AT BOTTOM OF POEM */}
        <div className="pt-4 text-center">
          <LikeButton postId={poem.id} initialLikes={poem.likes} />
        </div>
      </div>

      {/* RELATED POEMS RECOMMENDATION SECTION */}
      {relatedPoems.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b-2 border-cozy-amber/30 dark:border-amber-700/50 pb-3">
            <Feather className="w-5 h-5 text-cozy-amber" />
            <h2 className="font-serif font-bold text-2xl text-cozy-coffee dark:text-amber-300">
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
