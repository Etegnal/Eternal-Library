'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Sparkles, ArrowRight } from 'lucide-react';

export interface RecommendedBook {
  slug: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  coverUrl: string;
}

interface RecommendedBooksSectionProps {
  books: RecommendedBook[];
}

export default function RecommendedBooksSection({ books }: RecommendedBooksSectionProps) {
  if (!books || books.length === 0) return null;

  return (
    <div className="space-y-6 pt-6 border-t border-amber-200/60">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#362215] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          <span>Diğer Eserleri İnceleyin</span>
        </h3>
        <Link
          href="/kitaplar"
          className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1"
        >
          <span>Tümünü Gör</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 BOOKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {books.slice(0, 3).map((book) => (
          <article
            key={book.slug}
            className="group relative p-4 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] hover:border-[#8B4513]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex gap-3.5 items-start">
              {/* Cover Image 2/3 */}
              <div className="relative w-20 sm:w-24 aspect-[2/3] rounded-xl overflow-hidden shrink-0 bg-amber-950 border border-amber-200/60 shadow-sm">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[10px] font-bold font-mono uppercase text-[#8B4513] block">
                  {book.category}
                </span>

                <h4 className="font-serif font-bold text-sm text-[#362215] leading-snug line-clamp-2 group-hover:text-[#8B4513] transition-colors">
                  <Link href={`/kitaplar/${book.slug}`}>
                    {book.title}
                  </Link>
                </h4>

                <p className="text-xs font-serif italic text-[#785438] line-clamp-1">
                  {book.author}
                </p>

                <div className="flex items-center gap-1 text-amber-600 font-bold text-xs pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{book.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-3 mt-3 border-t border-amber-200/60">
              <Link
                href={`/kitaplar/${book.slug}`}
                className="w-full py-2 px-3 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-[#78350F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>İncele</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
