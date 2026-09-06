import React from 'react';
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import { Feather } from 'lucide-react';

// Enable 1-hour Vercel CDN ISR Caching to save database quota
export const revalidate = 3600;

export default async function ArticlesPage() {
  // Fetch articles with optimized SELECT query (excluding heavy full-text content in listings)
  const articles = await prisma.post.findMany({
    where: { type: 'YAZI' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      type: true,
      author: true,
      coverImage: true,
      readingTime: true,
      isFeatured: true,
      likes: true,
      views: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark dark:text-amber-300 uppercase tracking-wider bg-amber-100/80 dark:bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-200 dark:border-amber-800/60">
          <Feather className="w-4 h-4 text-cozy-amber dark:text-amber-400" />
          <span>Yazı Seçkisi</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-cozy-coffee dark:text-amber-200 drop-shadow-md">
          Denemeler ve Yazılar
        </h1>
        <p className="text-[#5C4033] dark:text-white text-base leading-relaxed font-serif italic max-w-xl mx-auto">
          "Zamanın yavaşladığı, sessizliğin düşünceye dönüştüğü anlardan süzülen edebiyat, felsefe ve hayat notları."
        </p>
      </div>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <PostCard key={article.id} post={article as any} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-cozy-parchment-border">
          <p className="text-cozy-coffee-light">Henüz yayınlanmış bir yazı bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
