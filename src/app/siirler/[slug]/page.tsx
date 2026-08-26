import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Feather } from 'lucide-react';
import ViewTracker from '@/components/ViewTracker';
import PoemCard from '@/components/PoemCard';
import LikeButton from '@/components/LikeButton';
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

  // 1. Search in Post table (type: SIIR)
  const postPoem = await prisma.post.findFirst({
    where: {
      type: 'SIIR',
      OR: [
        { slug: rawSlug },
        { slug: decodedSlug },
        { slug: cleanSlug },
      ],
    },
  });

  // 2. Search in MasterPoet table if not found in Post table
  let masterPoem = null;
  if (!postPoem) {
    masterPoem = await prisma.masterPoet.findFirst({
      where: {
        OR: [
          { slug: rawSlug },
          { slug: decodedSlug },
          { slug: cleanSlug },
          { id: rawSlug },
        ],
      },
    });

    // If still not found, check by title slug matching
    if (!masterPoem) {
      const allMasterPoets = await prisma.masterPoet.findMany();
      masterPoem = allMasterPoets.find(
        (mp) =>
          slugify(mp.title) === cleanSlug ||
          slugify(mp.title) === rawSlug ||
          mp.slug === cleanSlug
      ) || null;
    }
  }

  // Unified poem object
  const poem = postPoem
    ? {
        id: postPoem.id,
        title: postPoem.title,
        author: postPoem.author,
        content: postPoem.content,
        views: postPoem.views,
        likes: postPoem.likes,
        publishedAt: postPoem.publishedAt,
        isPost: true,
      }
    : masterPoem
    ? {
        id: masterPoem.id,
        title: masterPoem.title,
        author: masterPoem.author,
        content: masterPoem.content && masterPoem.content.trim().length > 0 ? masterPoem.content : masterPoem.excerpt,
        views: 1,
        likes: 0,
        publishedAt: masterPoem.createdAt,
        isPost: false,
      }
    : null;

  if (!poem) {
    notFound();
  }

  // Fetch related poems
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

  // Find year from MasterPoet table if available
  let displayYear = masterPoem?.year;
  if (!displayYear && postPoem) {
    const mp = await prisma.masterPoet.findFirst({
      where: {
        OR: [
          { slug: postPoem.slug },
          { title: postPoem.title },
        ],
      },
    });
    if (mp?.year) {
      displayYear = mp.year;
    }
  }

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

          {poem.isPost ? (
            <ViewTracker postId={poem.id} initialViews={poem.views} />
          ) : (
            <div className="text-xs text-[#785438] font-mono">Üstat Kalemler</div>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
            {poem.title}
          </h1>
          <p className="text-xs text-[#785438] font-sans font-medium">
            {poem.author ? `Şair: ${poem.author}` : ''}
            {displayYear ? ` • ${displayYear}` : ` • ${dateStr}`}
          </p>
        </div>
      </div>

      {/* SINGLE PARCHMENT CARD FOR POEM */}
      <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-[#362215] space-y-8">
        <div className="font-serif text-[15px] sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-[#362215] italic whitespace-pre-line text-center max-w-xl mx-auto tracking-tight sm:tracking-normal">
          {poem.content}
        </div>

        {/* POET / AUTHOR NAME AT THE BOTTOM OF THE POEM */}
        {poem.author && (
          <div className="text-center pt-2">
            <span className="font-serif font-bold text-base sm:text-lg text-[#8B4513] tracking-wide italic">
              — {poem.author}
            </span>
          </div>
        )}

        {/* LIKE BUTTON AT BOTTOM OF POEM */}
        {poem.isPost && (
          <div className="pt-8 border-t border-[#E6D7BC] text-center flex justify-center">
            <LikeButton postId={poem.id} initialLikes={poem.likes} />
          </div>
        )}
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
