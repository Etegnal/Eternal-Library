import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, ShoppingBag, Building2, Calendar, FileText } from 'lucide-react';
import { generateAffiliateLinks } from '@/lib/books';

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

  const storeLinks = generateAffiliateLinks(book);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/kitaplar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B4513] hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Kitaplığa Dön</span>
        </Link>
      </div>

      {/* Main Book Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Cover Image */}
        <div className="md:col-span-4 flex flex-col items-center justify-center space-y-4">
          {book.thumbnailUrl ? (
            <div className="relative w-48 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-200">
              <Image
                src={book.largeCoverUrl || book.thumbnailUrl}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-48 h-72 rounded-xl bg-amber-100 flex items-center justify-center border-2 border-amber-300">
              <BookOpen className="w-16 h-16 text-amber-700" />
            </div>
          )}

          {book.averageRating ? (
            <div className="flex items-center gap-2 text-sm font-bold text-amber-800 bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-200">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{book.averageRating} / 5.0</span>
            </div>
          ) : null}
        </div>

        {/* Book Info & Description */}
        <div className="md:col-span-8 space-y-6 text-[#362215]">
          <div className="space-y-2 border-b border-amber-200/80 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B4513] bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
              {book.curatedCategory || book.categories}
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="font-serif italic text-lg text-[#5C4033]">
                {book.subtitle}
              </p>
            )}
            <p className="text-lg font-bold text-[#8B4513] pt-1">
              Yazar: {book.authors}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-[#5C4033]">
            {book.publisher && (
              <div className="flex items-center gap-1.5 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">{book.publisher}</span>
              </div>
            )}
            {book.publishedDate && (
              <div className="flex items-center gap-1.5 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{book.publishedDate}</span>
              </div>
            )}
            {book.pageCount && (
              <div className="flex items-center gap-1.5 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{book.pageCount} Sayfa</span>
              </div>
            )}
          </div>

          {/* Description */}
          {book.description && (
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-[#362215]">
                Kitap Özeti
              </h2>
              <p className="text-base text-[#5C4033] leading-relaxed font-sans whitespace-pre-line">
                {book.description}
              </p>
            </div>
          )}

          {/* Store Purchase Links */}
          <div className="pt-6 border-t border-amber-200/80 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#362215] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <span>Satın Al / Mağazalar</span>
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
                  <span>{store.name}'da İncele</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
