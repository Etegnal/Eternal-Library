'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Star, Calendar, FileText, Bookmark, Tag, BookCheck } from 'lucide-react';
import BookReaderModal from '@/components/BookReaderModal';

interface BookDetailClientViewProps {
  book: {
    slug: string;
    title: string;
    author: string;
    year: number;
    displayYear: string;
    pages: number;
    category: string;
    summary: string;
    rating: number;
    isReadable: boolean;
    coverUrl: string;
    fullPages?: string[];
  };
}

export default function BookDetailClientView({ book }: BookDetailClientViewProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden">
      
      {/* LEFT SIDE: COVER IMAGE & READ BUTTON */}
      <div className="md:col-span-4 flex flex-col items-center justify-center space-y-5">
        <div className="relative w-44 sm:w-48 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-200/80 shrink-0 bg-amber-950">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{book.rating.toFixed(1)} / 5.0 Değerlendirme</span>
        </div>

        {/* Read Book / Editör İncelemesi Action Button */}
        <button
          onClick={() => setIsReaderOpen(true)}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#5C2E0B] hover:to-[#78350F] text-amber-100 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-600/40 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>Editör İncelemesini Oku</span>
        </button>
      </div>

      {/* RIGHT SIDE: METADATA & SUMMARY */}
      <div className="md:col-span-8 space-y-6 text-[#362215]">
        
        {/* Category & Title */}
        <div className="space-y-2 border-b border-amber-200/80 pb-4">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8B4513] bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <span>{book.category}</span>
          </span>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
            {book.title}
          </h1>

          <p className="text-base font-bold text-[#8B4513] pt-1 flex items-center gap-2 font-serif italic">
            <Bookmark className="w-5 h-5 text-amber-700" />
            <span>Yazar: {book.author}</span>
          </p>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-[#5C4033]">
          <div className="flex items-center gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="block text-[10px] text-[#8B4513] uppercase font-bold">İlk Yayın Yılı</span>
              <span className="font-mono font-bold text-[#362215] block">{book.displayYear}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
            <FileText className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Sayfa Sayısı</span>
              <span className="font-mono font-bold text-[#362215] block">{book.pages} Sayfa</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 col-span-2 sm:col-span-1">
            <BookCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Kütüphane Durumu</span>
              <span className="font-bold text-[#362215] block">{book.isReadable ? 'Tam Metin Aktif' : 'Mutlak Seçki'}</span>
            </div>
          </div>
        </div>

        {/* Editör İncelemesi */}
        <div className="space-y-3 pt-2">
          <h2 className="font-serif font-bold text-xl text-[#362215] flex items-center gap-2 border-b border-amber-200/80 pb-2">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <span>Editör İncelemesi</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C4033] leading-relaxed font-sans whitespace-pre-line bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200/60 shadow-inner">
            {book.summary}
          </p>
        </div>

      </div>

      {/* READER MODAL */}
      {isReaderOpen && (
        <BookReaderModal
          book={{
            slug: book.slug,
            title: book.title,
            author: book.author,
            pages: book.pages,
            coverUrl: book.coverUrl,
            bookPages: book.fullPages?.map((content, idx) => ({
              pageNumber: idx + 1,
              content,
            })),
          }}
          onClose={() => setIsReaderOpen(false)}
        />
      )}

    </div>
  );
}
