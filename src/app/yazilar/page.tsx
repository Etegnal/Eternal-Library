import React from 'react';
import { prisma } from '@/lib/prisma';
import ArticlesCatalog from '@/components/ArticlesCatalog';
import { BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlesPage() {
  const articles = await prisma.post.findMany({
    where: { type: 'YAZI' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-10 overflow-x-hidden">
      
      {/* 4. EKRAN TAŞMA KORUMALI BAŞLIK */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800/40">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Deneme & İnceleme Arşivi</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-amber-100">
          Denemeler ve Yazılar
        </h1>
        <p className="text-stone-300/80 text-base leading-relaxed font-sans">
          Zamanın yavaş aktığı lo-fi anlarda kaleme alınmış edebiyat, kültür, sanat ve hayat üzerine düşünce yazıları.
        </p>
      </div>

      {/* 3. ARAMA ÇUBUĞU, KATEGORİ FİLTRELERİ & RESPONSIVE GRID CATALOG */}
      <ArticlesCatalog articles={articles} />

    </div>
  );
}
