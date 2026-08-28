'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Sparkles, Search, Filter, BookCheck, Eye, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import BookReaderModal from '@/components/BookReaderModal';
import SaveBookButton from '@/components/SaveBookButton';
import { VerifiedBook } from '@/lib/verifiedBooks';

interface MutlakKitaplikCatalogProps {
  initialBooks: VerifiedBook[];
}

export default function MutlakKitaplikCatalog({ initialBooks }: MutlakKitaplikCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating_desc' | 'newest' | 'year_asc' | 'year_desc' | 'title_asc'>('rating_desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'rating_desc') {
      return b.rating - a.rating;
    }
    if (sortBy === 'newest') {
      // Preserve DB createdAt desc order
      return 0;
    }
    if (sortBy === 'year_asc') {
      return a.year - b.year;
    }
    if (sortBy === 'year_desc') {
      return b.year - a.year;
    }
    if (sortBy === 'title_asc') {
      return a.title.localeCompare(b.title, 'tr');
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      
      {/* DESKTOP CONTROL BAR (hidden sm:block) */}
      <div className="hidden sm:block p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          
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

          {/* Sort Select Dropdown */}
          <div className="w-auto">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-100/80 hover:bg-amber-200 text-[#78350F] border border-amber-300/80 focus:outline-none focus:border-amber-600 cursor-pointer transition-all"
            >
              <option value="rating_desc">En Yüksek Puanlılar</option>
              <option value="newest">En Son Eklenenler</option>
              <option value="year_asc">Yayın Yılı (Eskiden Yeniye)</option>
              <option value="year_desc">Yayın Yılı (Yeniden Eskiye)</option>
              <option value="title_asc">İsim (A-Z)</option>
            </select>
          </div>

          {/* Category Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
              selectedCategory !== 'all' || isFilterOpen
                ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B] shadow-sm'
                : 'bg-amber-100/80 hover:bg-amber-200 text-[#78350F] border-amber-300/80'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-300" />
            <span>
              {selectedCategory === 'all' ? 'Türleri Filtrele' : `Tür: ${selectedCategory}`}
            </span>
            {isFilterOpen ? (
              <ChevronUp className="w-4 h-4 ml-1 opacity-80" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
            )}
          </button>

        </div>

        {/* EXPANDABLE CATEGORY PILLS DRAWER (DESKTOP) */}
        {isFilterOpen && (
          <div className="pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2 animate-fadeIn">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setIsFilterOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B]'
                  : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
              }`}
            >
              Tüm Eserler ({initialBooks.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsFilterOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B]'
                    : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MOBILE CONTROL BAR (sm:hidden: ONLY 1 STANDALONE YELLOW BUTTON, NO OUTER CARD BOX) */}
      <div className="sm:hidden space-y-3">
        
        {/* SINGLE STANDALONE YELLOW BUTTON */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer ${
            selectedCategory !== 'all' || searchQuery.trim().length > 0 || isFilterOpen
              ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B] shadow-md'
              : 'bg-amber-100/90 text-[#78350F] border-amber-300/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber-700" />
            <span>
              {searchQuery
                ? `Arama: "${searchQuery}"`
                : selectedCategory !== 'all'
                ? `Tür: ${selectedCategory}`
                : 'Filtrele & Sırala'}
            </span>
          </div>
          {isFilterOpen ? <ChevronUp className="w-4 h-4 opacity-80" /> : <ChevronDown className="w-4 h-4 opacity-80" />}
        </button>

        {/* EXPANDABLE MOBILE DRAWER (CONTAINS SEARCH, SORT & CATEGORIES) */}
        {isFilterOpen && (
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-md space-y-4 animate-fadeIn">
            
            {/* 1. Mobile Search Bar */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                Eser / Yazar Arama:
              </label>
              <div className="relative w-full">
                <Search className="w-4 h-4 text-amber-800/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Eser adı, yazar veya konu ara..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#362215] placeholder:text-stone-400 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* 2. Mobile Sort Dropdown */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                Sıralama Ölçütü:
              </label>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl text-xs font-bold bg-amber-50 border border-amber-300 text-[#78350F] focus:outline-none cursor-pointer"
              >
                <option value="rating_desc">En Yüksek Puanlılar</option>
                <option value="newest">En Son Eklenenler</option>
                <option value="year_asc">Yayın Yılı (Eskiden Yeniye)</option>
                <option value="year_desc">Yayın Yılı (Yeniden Eskiye)</option>
                <option value="title_asc">İsim (A-Z)</option>
              </select>
            </div>

            {/* 3. Mobile Category Pills */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                Eser Türü:
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedCategory === 'all'
                      ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B]'
                      : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
                  }`}
                >
                  Tüm Eserler ({initialBooks.length})
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedCategory === cat
                        ? 'bg-[#8B4513] text-amber-100 border-[#5C2E0B]'
                        : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* BOOKS LIST / GRID (Left Side Cover 2/3 Aspect Ratio, Right Side Details) */}
      {sortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedBooks.map((book) => (
            <article
              key={book.slug}
              className="group relative p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] hover:border-[#8B4513]/40 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 sm:gap-5"
            >
              
              {/* LEFT SIDE: COVER IMAGE (Self-stretching to fill full card height) */}
              <div className="relative w-32 sm:w-44 self-stretch min-h-[200px] sm:min-h-[260px] rounded-xl overflow-hidden shrink-0 bg-amber-950 border border-amber-200/60 shadow-md">
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

                {/* UNIFIED ACTIONS: 'Kitabı İncele' & 'SaveBookButton' */}
                <div className="pt-3 mt-3 border-t border-amber-200/60 flex items-center gap-2">
                  <Link
                    href={`/kitaplar/${book.slug}`}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-[#78350F] border border-amber-300/80 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>Kitabı İncele</span>
                  </Link>

                  <SaveBookButton
                    bookId={book.slug}
                    bookSlug={book.slug}
                    bookTitle={book.title}
                    variant="icon"
                  />
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
