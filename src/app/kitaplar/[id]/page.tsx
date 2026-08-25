import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Building2, Calendar, FileText, Bookmark, ExternalLink, Hash, Tag, ShoppingBag } from 'lucide-react';
import { getBookDetails, generateStoreLinks, LOFI_BOOK_PLACEHOLDER } from '@/lib/books';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  let book = await prisma.book.findFirst({
    where: {
      OR: [
        { id: params.id },
        { googleBookId: params.id },
      ],
    },
  });

  if (!book) {
    notFound();
  }

  // Lazy fetch deep description if missing or default
  if (!book.description || book.description.includes('henüz eklenmemiştir')) {
    const workKey = book.googleBookId ? `/works/${book.googleBookId}` : null;
    if (workKey) {
      const deepDesc = await getBookDetails(workKey);
      if (deepDesc && !deepDesc.includes('henüz eklenmemiştir')) {
        try {
          book = await prisma.book.update({
            where: { id: book.id },
            data: { description: deepDesc },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  const coverUrl = book.largeCoverUrl || book.thumbnailUrl || LOFI_BOOK_PLACEHOLDER;
  const storeLinks = generateStoreLinks(book);

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

          {book.averageRating ? (
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{book.averageRating} / 5.0</span>
              {book.ratingsCount ? <span className="text-xs text-[#8B4513]/70">({book.ratingsCount} Değerlendirme)</span> : null}
            </div>
          ) : null}

          {/* ONLINE PREVIEW / OPEN LIBRARY READ BUTTON */}
          {book.previewUrl && (
            <a
              href={book.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-100 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 border border-amber-600/40"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Library Önizleme</span>
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
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">Yayınevi / Arşiv</span>
                  <span className="font-bold text-[#362215] truncate block">{book.publisher}</span>
                </div>
              </div>
            )}

            {book.publishedDate && (
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200/80">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#8B4513] uppercase font-bold">İlk Yayın Yılı</span>
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
          <div className="space-y-3 pt-2">
            <h2 className="font-serif font-bold text-xl text-[#362215] flex items-center gap-2 border-b border-amber-200/80 pb-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>Kitap Detaylı Özeti ve İncelemesi</span>
            </h2>
            <p className="text-base text-[#5C4033] leading-relaxed font-sans whitespace-pre-line bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50">
              {book.description || 'Bu eser için özet kütüphane arşivine henüz eklenmemiştir.'}
            </p>
          </div>

          {/* Store Links (Amazon TR, Kitapyurdu, D&R) */}
          <div className="pt-6 border-t border-amber-200/80 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#362215] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <span>Mağaza Arama / İnceleme Bağlantıları</span>
            </h3>

            <div className="flex flex-wrap gap-3">
              {storeLinks.map((store) => (
                <a
                  key={store.platform}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-transform hover:scale-105 flex items-center gap-2 ${store.color}`}
                >
                  <span>{store.name}'da Ara & İncele</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
