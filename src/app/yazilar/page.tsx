import React from 'react';
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlesPage() {
  const articles = await prisma.post.findMany({
    where: { type: 'YAZI' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <BookOpen className="w-4 h-4 text-cozy-amber" />
          <span>Deneme & İnceleme</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-cozy-coffee">
          Denemeler ve Yazılar
        </h1>
        <p className="text-cozy-coffee-light text-base leading-relaxed">
          Zamanın yavaş aktığı lo-fi anlarda kaleme alınmış edebiyat, kültür, sanat ve hayat üzerine düşünce yazıları.
        </p>
      </div>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <PostCard key={article.id} post={article} />
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
