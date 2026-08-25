import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Building2, Calendar, FileText, Bookmark, ExternalLink, Hash, Tag } from 'lucide-react';
import { getOpenLibraryCoverUrl } from '@/lib/books';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
  });

  if (!book) {
    notFound();
  }

  const coverUrl = book.largeCoverUrl || book.thumbnailUrl || getOpenLibraryCoverUrl(book.isbn13, book.isbn10);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/kitaplar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B4513] hover:underline transition-colors bg-amber-100/70 px-4 py-2 rounded-full border border-amber-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Kitaplığa Dön</span>
        </Link>
      </div>

      {/* Main Book Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden">
        
        {/* Cover Image */}
        <div className="md:col-span-4 flex flex-col items-center justify-center space-y-4">
          {coverUrl ? (
            <div className="relative w-48 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-200">
              <Image
                src={coverUrl}
                alt={book.title}
                fill
                sizes="192px"
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-48 h-72 rounded-xl bg-amber-100/90 flex flex-col items-center justify-center border-2 border-amber-300 p-4 text-center space-y-3">
              <BookOpen className="w-16 h-16 text-amber-800" />
              <span className="font-serif font-bold text-sm text-[#362215]">{book.title}</span>
            </div>
          )}

          {book.averageRating ? (
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{book.averageRating} / 5.0</span>
              {book.ratingsCount ? <span className="text-xs text-[#8B4513]/70">({book.ratingsCount} Değerlendirme)</span> : null}
            </div>
          ) : null}

          {/* ONLINE PREVIEW / READ SAMPLE BUTTON IF AVAILABLE */}
          {book.previewUrl && (
            <a
              href={book.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-100 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 border border-amber-600/40"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Önizlemeyi Oku (Google Books)</span>
            </a>
          )}
        </div>

        {/* Book Info & Description */}
        <div className="md:col-span-8 space-y-6 text-[#362215]">
          
          <div className="space-y-2 border-b border-amber-200/80 pb-4">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8B4513] bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>{book.curatedCategory || book.categories || 'Genel Klasikler'}</span>
            </span>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
              {book.title}
            </h1>

            {book.subtitle && (
              <p className="font-serif italic text-lg text-[#5C4033]">
                {book.subtitle}
              </p>
            )}

            <p className="text-lg font-bold text-[#8B4513] pt-1 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-700" />
              <span>Yazar: {book.authors}</span>
            </p>
          </div>

          {/* Detailed Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-[#5C4033]">
            {book.publisher && (
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/80">
                <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Yayınevi</span>
                  <span className="font-bold text-[#362215] truncate block">{book.publisher}</span>
                </div>
              </div>
            )}

            {book.publishedDate && (
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/80">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Yayın Yılı</span>
                  <span className="font-bold text-[#362215] block">{book.publishedDate}</span>
                </div>
              </div>
            )}

            {book.pageCount && (
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/80">
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Sayfa Sayısı</span>
                  <span className="font-bold text-[#362215] block">{book.pageCount} Sayfa</span>
                </div>
              </div>
            )}

            {(book.isbn13 || book.isbn10) && (
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/80 col-span-2 sm:col-span-3">
                <Hash className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">ISBN Numarası</span>
                  <span className="font-mono font-bold text-[#362215]">
                    {book.isbn13 ? `ISBN-13: ${book.isbn13}` : ''} {book.isbn10 ? `(ISBN-10: ${book.isbn10})` : ''}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Long Description / Summary */}
          {book.description && (
            <div className="space-y-3 pt-2">
              <h2 className="font-serif font-bold text-xl text-[#362215] flex items-center gap-2 border-b border-amber-200/80 pb-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Kitap Detaylı Özeti ve İncelemesi</span>
              </h2>
              <p className="text-base text-[#5C4033] leading-relaxed font-sans whitespace-pre-line bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50">
                {book.description}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
