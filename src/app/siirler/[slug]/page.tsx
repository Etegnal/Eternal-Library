import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Feather } from 'lucide-react';
import ViewTracker from '@/components/ViewTracker';
import PoemCard from '@/components/PoemCard';
import BookReader from '@/components/BookReader';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PoemDetailProps {
  params: {
    slug: string;
  };
}

export default async function PoemDetailPage({ params }: PoemDetailProps) {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const cleanSlug = slugify(decodedSlug);

  const poem = await prisma.post.findFirst({
    where: {
      type: 'SIIR',
      OR: [
        { slug: rawSlug },
        { slug: decodedSlug },
        { slug: cleanSlug },
      ],
    },
  });

  if (!poem) {
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
      {/* Back Link Button */}
      <div>
        <Link
          href="/siirler"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#78350F] bg-[#FEF9EE] hover:bg-[#FDE68A]/60 border border-[#FDE68A] shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span>Tüm Şiirlere Dön</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#78350F] bg-[#FEF3C7] border border-[#FDE68A]">
            <Feather className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>Şiir</span>
          </div>

          <ViewTracker postId={poem.id} initialViews={poem.views} />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
            {poem.title}
          </h1>
          <p className="text-xs text-[#785438] font-sans font-medium">
            {dateStr}
          </p>
        </div>
      </div>

      {/* BOOK READER FOR POEMS WITH PAGE FLIPPING & BOOKMARK PROGRESS */}
      <BookReader
        postId={poem.id}
        content={poem.content}
        initialLikes={poem.likes}
        postType="SIIR"
      />

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
