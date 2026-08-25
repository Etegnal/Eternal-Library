import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Search, Star, ExternalLink, Library } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <Library className="w-4 h-4 text-amber-700" />
          <span>Kütüphane & Kitaplık</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215]">
          Başucu Kitapları ve Dünya Klasikleri
        </h1>
        <p className="text-[#5C4033] text-base leading-relaxed">
          Edebiyat, felsefe ve düşünce dünyasına yön veren seçkin kitaplar, özetleri ve doğrudan satın alma bağlantıları.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="group flex flex-col bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment hover:shadow-cozy transition-all duration-300 overflow-hidden"
          >
            {/* Book Cover Image */}
            <div className="relative w-full h-64 bg-amber-950/20 flex items-center justify-center p-4">
              {book.thumbnailUrl ? (
                <div className="relative w-36 h-48 rounded-lg overflow-hidden shadow-lg border border-amber-200/40 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={book.thumbnailUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-48 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-300">
                  <BookOpen className="w-12 h-12 text-amber-700" />
                </div>
              )}
            </div>

            {/* Book Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8B4513] font-medium">
                  <span>{book.curatedCategory || book.categories}</span>
                  {book.averageRating ? (
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{book.averageRating}</span>
                    </div>
                  ) : null}
                </div>

                <h3 className="font-serif font-bold text-xl text-[#362215] group-hover:text-amber-800 transition-colors line-clamp-1">
                  <Link href={`/kitaplar/${book.id}`}>{book.title}</Link>
                </h3>

                <p className="text-xs font-semibold text-[#8B4513]">
                  {book.authors}
                </p>

                {book.description && (
                  <p className="text-xs text-[#5C4033] line-clamp-3 leading-relaxed font-sans pt-1">
                    {book.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-xs text-[#5C4033] font-mono">
                  {book.pageCount ? `${book.pageCount} Sayfa` : 'Klasik Eser'}
                </span>

                <Link
                  href={`/kitaplar/${book.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B4513] hover:underline"
                >
                  <span>Kitabı İncele</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
