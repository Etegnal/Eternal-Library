'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Sparkles, Search, Filter, BookCheck, Eye } from 'lucide-react';
import BookReaderModal from '@/components/BookReaderModal';
import { VerifiedBook } from '@/lib/verifiedBooks';

interface MutlakKitaplikCatalogProps {
  initialBooks: VerifiedBook[];
}

export default function MutlakKitaplikCatalog({ initialBooks }: MutlakKitaplikCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBookForReading, setSelectedBookForReading] = useState<VerifiedBook | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(initialBooks.map((b) => b.category)));

  // Filter books based on search query & category
  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* SEARCH & FILTER BAR */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-amber-800/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Eser adı, yazar veya konu ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-[#362215] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B] shadow-sm'
                  : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
              }`}
            >
              Tüm Eserler ({initialBooks.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B] shadow-sm'
                    : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* BOOKS LIST / GRID (Left Side Cover 2/3 Aspect Ratio, Right Side Details) */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <article
              key={book.slug}
              className="group relative p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] hover:border-[#8B4513]/40 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 sm:gap-5"
            >
              
              {/* LEFT SIDE: COVER IMAGE (Aspect Ratio 2/3) */}
              <div className="relative w-28 sm:w-36 h-40 sm:h-52 rounded-xl overflow-hidden shrink-0 bg-amber-950 border border-amber-200/60 shadow-md">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* RIGHT SIDE: DETAILS & ACTIONS */}
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div className="space-y-1.5">
                  
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-[11px] text-[#8B4513]">
                    <span className="font-bold uppercase tracking-wider font-mono">
                      {book.category}
                    </span>
                    <span className="font-mono text-stone-500 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200">
                      {book.displayYear}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#362215] group-hover:text-[#8B4513] transition-colors leading-snug break-words">
                    <Link href={`/kitaplar/${book.slug}`}>
                      {book.title}
                    </Link>
                  </h3>

                  {/* Author */}
                  <p className="text-xs font-serif italic text-[#785438]">
                    {book.author}
                  </p>

                  {/* Rating Stars & Pages */}
                  <div className="flex items-center gap-3 text-xs text-stone-600 pt-0.5">
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{book.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-[#5C4033] font-mono">{book.pages} Sayfa</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#5C4033] line-clamp-3 font-sans leading-relaxed pt-1">
                    {book.summary}
                  </p>

                </div>

                {/* UNIFIED ACTION: 'Kitabı İncele' */}
                <div className="pt-3 mt-3 border-t border-amber-200/60 flex items-center gap-2">
                  <Link
                    href={`/kitaplar/${book.slug}`}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#5C2E0B] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kitabı İncele</span>
                  </Link>

                  <Link
                    href={`/kitaplar/${book.slug}`}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#78350F] border border-amber-200 transition-colors"
                    title="Eser Detayı"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </Link>
                </div>

              </div>

            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-amber-700/60" />
          <p className="text-sm text-[#5C4033] font-serif">
            Arama kriterlerinize uygun eser bulunamadı.
          </p>
        </div>
      )}

      {/* FULL TEXT READER MODAL */}
      {selectedBookForReading && (
        <BookReaderModal
          book={{
            slug: selectedBookForReading.slug,
            title: selectedBookForReading.title,
            author: selectedBookForReading.author,
            pages: selectedBookForReading.pages,
            coverUrl: selectedBookForReading.coverUrl,
            bookPages: selectedBookForReading.fullPages?.map((content, idx) => ({
              pageNumber: idx + 1,
              content,
            })),
          }}
          onClose={() => setSelectedBookForReading(null)}
        />
      )}

    </div>
  );
}
