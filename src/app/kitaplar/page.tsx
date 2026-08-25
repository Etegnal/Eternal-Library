import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Library, BookMarked, ArrowRight } from 'lucide-react';
import { getOpenLibraryCoverUrl } from '@/lib/books';

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
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200 shadow-sm">
          <Library className="w-4 h-4 text-amber-700" />
          <span>Kütüphane & Eser Kitaplığı</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215]">
          Başucu Kitapları ve Dünya Klasikleri
        </h1>
        <p className="text-[#5C4033] text-base leading-relaxed font-sans">
          Edebiyat, felsefe ve düşünce dünyasına yön veren seçkin kitaplar, detaylı özetler, yazar bilgileri ve eser künyeleri.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => {
          const coverUrl = book.thumbnailUrl || book.largeCoverUrl || getOpenLibraryCoverUrl(book.isbn13, book.isbn10);

          return (
            <div
              key={book.id}
              className="group flex flex-col bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment hover:shadow-cozy transition-all duration-300 overflow-hidden"
            >
              {/* Book Cover Image */}
              <div className="relative w-full h-64 bg-[#23120A]/10 flex items-center justify-center p-4 border-b border-amber-200/60">
                {coverUrl ? (
                  <div className="relative w-36 h-48 rounded-lg overflow-hidden shadow-2xl border-2 border-amber-200/80 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      sizes="144px"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-36 h-48 rounded-lg bg-amber-100/90 flex flex-col items-center justify-center border-2 border-amber-300 p-3 text-center space-y-2">
                    <BookMarked className="w-10 h-10 text-amber-800" />
                    <span className="font-serif text-xs font-bold text-[#362215] line-clamp-2">{book.title}</span>
                  </div>
                )}
              </div>

              {/* Book Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8B4513] font-medium">
                    <span className="bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200/80 text-[11px] font-bold">
                      {book.curatedCategory || book.categories || 'Klasik Eser'}
                    </span>
                    {book.averageRating ? (
                      <div className="flex items-center gap-1 text-amber-700 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{book.averageRating}</span>
                      </div>
                    ) : null}
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#362215] group-hover:text-amber-800 transition-colors line-clamp-1 pt-1">
                    <Link href={`/kitaplar/${book.id}`}>{book.title}</Link>
                  </h3>

                  <p className="text-xs font-bold text-[#8B4513]">
                    Yazar: {book.authors}
                  </p>

                  {book.description && (
                    <p className="text-xs text-[#5C4033] line-clamp-3 leading-relaxed font-sans pt-1">
                      {book.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-xs text-[#5C4033] font-mono">
                    {book.publishedDate ? book.publishedDate : ''} {book.pageCount ? `• ${book.pageCount} Sayfa` : ''}
                  </span>

                  <Link
                    href={`/kitaplar/${book.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B4513] hover:underline"
                  >
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
