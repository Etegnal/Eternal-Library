import React from 'react';
import { prisma } from '@/lib/prisma';
import { Library } from 'lucide-react';
import BookSearchCatalog from '@/components/BookSearchCatalog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BooksPage() {
  const initialBooks = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200 shadow-sm">
          <Library className="w-4 h-4 text-amber-700" />
          <span>Kütüphane & Eser Arama Motoru</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215]">
          Başucu Kitapları ve Dünya Klasikleri
        </h1>
        <p className="text-[#5C4033] text-base leading-relaxed font-sans">
          Aradığınız kitabı, yazarı veya ISBN numarasını anında arayın; Open Library API ve arşivimiz üzerinden detaylı özetlere ulaşın.
        </p>
      </div>

      {/* Interactive Real-Time Search Catalog */}
      <BookSearchCatalog initialBooks={initialBooks} />
    </div>
  );
}
