'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Feather, ArrowRight, Heart, Bookmark, Sparkles, Library, Star, Trash2 } from 'lucide-react';
import SaveBookButton from '@/components/SaveBookButton';

export interface LikedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  type: 'YAZI' | 'SIIR';
  author?: string | null;
  coverImage?: string | null;
  readingTime?: string | null;
  publishedAt: Date | string;
  likes: number;
  views: number;
}

export interface SavedBookItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  rating: number;
  pages: number;
  coverUrl: string;
}

interface UserPersonalLibraryProps {
  likedPosts: LikedPost[];
  savedBooks?: SavedBookItem[];
}

export default function UserPersonalLibrary({ likedPosts, savedBooks = [] }: UserPersonalLibraryProps) {
  const [filter, setFilter] = useState<'all' | 'KITAP' | 'YAZI' | 'SIIR'>('all');
  const [booksList, setBooksList] = useState<SavedBookItem[]>(savedBooks);

  const booksCount = booksList.length;
  const articlesCount = likedPosts.filter((p) => p.type === 'YAZI').length;
  const poemsCount = likedPosts.filter((p) => p.type === 'SIIR').length;
  const totalCount = booksCount + articlesCount + poemsCount;

  const handleBookRemoved = (bookSlug: string) => {
    setBooksList((prev) => prev.filter((b) => b.slug !== bookSlug && b.id !== bookSlug));
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
      
      {/* SECTION TITLE & STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6D7BC]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/80 border border-amber-300/60 text-amber-900">
              <Bookmark className="w-5 h-5 text-[#9A3412]" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
              Kişisel Kütüphanem
            </h2>
          </div>
          <p className="text-xs text-[#5C4033] font-sans">
            Beğendiğiniz ve kaydettiğiniz tüm kitap, yazı ile şiirler seçkisi.
          </p>
        </div>

        {/* STATS COUNTERS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 font-bold flex items-center gap-1.5 shadow-sm">
            <Library className="w-3.5 h-3.5 text-amber-800" />
            <span>{booksCount} Kitap</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] font-bold flex items-center gap-1.5 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>{articlesCount} Yazı</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-300/80 text-rose-900 font-bold flex items-center gap-1.5 shadow-sm">
            <Feather className="w-3.5 h-3.5 text-rose-700" />
            <span>{poemsCount} Şiir</span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      {totalCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tüm Eserler ({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('KITAP')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              filter === 'KITAP'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <Library className="w-3.5 h-3.5 text-amber-300" />
            <span>Kitaplar ({booksCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('YAZI')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              filter === 'YAZI'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Yazılar ({articlesCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('SIIR')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              filter === 'SIIR'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Şiirler ({poemsCount})</span>
          </button>
        </div>
      )}

      {/* SAVED BOOKS SECTION */}
      {(filter === 'all' || filter === 'KITAP') && booksList.length > 0 && (
        <div className="space-y-4 pt-2">
          {filter === 'all' && (
            <h3 className="font-serif font-bold text-lg text-[#362215] flex items-center gap-2 border-b border-amber-200/60 pb-2">
              <Library className="w-4 h-4 text-amber-800" />
              <span>Kaydedilen Kitaplar</span>
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booksList.map((book) => (
              <div
                key={book.id || book.slug}
                className="group relative p-4 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-sm hover:shadow-cozy hover:border-[#9A3412]/40 transition-all duration-300 flex gap-4 items-start"
              >
                {/* Cover Image */}
                <div className="relative w-20 h-28 rounded-xl overflow-hidden shrink-0 bg-amber-950 border border-amber-200/60 shadow-sm">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#8B4513]">
                      <span className="font-bold uppercase tracking-wider font-mono">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{book.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#362215] group-hover:text-[#9A3412] transition-colors leading-tight line-clamp-1 pt-0.5">
                      <Link href={`/kitaplar/${book.slug}`}>
                        {book.title}
                      </Link>
                    </h4>

                    <p className="text-xs font-serif italic text-[#785438]">
                      {book.author}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-amber-200/60">
                    <Link
                      href={`/kitaplar/${book.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-amber-100/90 hover:bg-amber-200 text-[#78350F] font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>İncele</span>
                    </Link>

                    <SaveBookButton
                      bookId={book.id || book.slug}
                      bookSlug={book.slug}
                      bookTitle={book.title}
                      initialSaved={true}
                      variant="icon"
                      onToggleSuccess={(savedState) => {
                        if (!savedState) handleBookRemoved(book.slug);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIKED POSTS & POEMS SECTION */}
      {(filter === 'all' || filter === 'YAZI' || filter === 'SIIR') && likedPosts.length > 0 && (
        <div className="space-y-4 pt-2">
          {filter === 'all' && booksList.length > 0 && (
            <h3 className="font-serif font-bold text-lg text-[#362215] flex items-center gap-2 border-b border-amber-200/60 pb-2 pt-4">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Kaydedilen Yazı ve Şiirler</span>
            </h3>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {likedPosts
              .filter((p) => {
                if (filter === 'all') return true;
                return p.type === filter;
              })
              .map((post) => {
                const isPoem = post.type === 'SIIR';
                const detailUrl = isPoem ? `/siirler/${post.slug}` : `/yazilar/${post.slug}`;
                const dateStr = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });

                return (
                  <div
                    key={post.id}
                    className="group relative p-5 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-sm hover:shadow-cozy hover:border-[#9A3412]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badge & Date */}
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] border ${
                            isPoem
                              ? 'bg-rose-100/90 text-rose-900 border-rose-300'
                              : 'bg-amber-100/90 text-amber-900 border-amber-300'
                          }`}
                        >
                          {isPoem ? <Feather className="w-3.5 h-3.5 text-rose-700" /> : <BookOpen className="w-3.5 h-3.5 text-amber-700" />}
                          <span>{isPoem ? 'Şiir' : 'Yazı'}</span>
                        </span>

                        <span className="text-[11px] text-[#785438] font-mono">
                          {dateStr}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg text-[#362215] group-hover:text-[#9A3412] transition-colors line-clamp-1">
                        <Link href={detailUrl}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="font-serif italic text-xs text-[#5C4033] line-clamp-2 leading-relaxed pl-3 border-l-2 border-amber-600/40">
                        "{post.excerpt}"
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#785438] italic font-serif">
                        {post.author ? `— ${post.author}` : 'Eternal Library'}
                      </span>

                      <Link
                        href={detailUrl}
                        className="inline-flex items-center gap-1 font-bold text-[#9A3412] hover:underline"
                      >
                        <span>Oku</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {totalCount === 0 && (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300/60">
            <Heart className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif font-bold text-lg text-[#362215]">
              Henüz Kaydedilmiş Eser Yok
            </h3>
            <p className="text-xs text-[#5C4033] leading-relaxed">
              Kişisel kütüphanenizde henüz kaydettiğiniz bir kitap, yazı veya şiir bulunmuyor. Kitaplar, Yazılar ve Şiirler sayfalarından beğendiğiniz eserleri ayraç/kalp simgesine tıklayarak buraya ekleyebilirsiniz.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/kitaplar"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Library className="w-3.5 h-3.5 text-amber-300" />
              <span>Kitaplığı Keşfet</span>
            </Link>

            <Link
              href="/yazilar"
              className="px-4 py-2 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-[#78350F] font-bold text-xs border border-amber-300/80 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Yazıları Keşfet</span>
            </Link>

            <Link
              href="/siirler"
              className="px-4 py-2 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-[#78350F] font-bold text-xs border border-amber-300/80 transition-colors flex items-center gap-1.5"
            >
              <Feather className="w-3.5 h-3.5 text-amber-800" />
              <span>Şiirleri Keşfet</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
