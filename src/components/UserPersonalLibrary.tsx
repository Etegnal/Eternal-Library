'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Feather, ArrowRight, Heart, Bookmark, Sparkles } from 'lucide-react';

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

interface UserPersonalLibraryProps {
  likedPosts: LikedPost[];
}

export default function UserPersonalLibrary({ likedPosts }: UserPersonalLibraryProps) {
  const [filter, setFilter] = useState<'all' | 'YAZI' | 'SIIR'>('all');

  const articlesCount = likedPosts.filter((p) => p.type === 'YAZI').length;
  const poemsCount = likedPosts.filter((p) => p.type === 'SIIR').length;

  const filteredPosts = likedPosts.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

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
            Beğendiğiniz ve kaydettiğiniz tüm yazı ile şiirler seçkisi.
          </p>
        </div>

        {/* STATS COUNTERS */}
        <div className="flex items-center gap-2.5 text-xs">
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
      {likedPosts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tüm Eserler ({likedPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('YAZI')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
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
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
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

      {/* LIKED POSTS GRID / SHELF */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {filteredPosts.map((post) => {
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
      ) : (
        /* EMPTY STATE */
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300/60">
            <Heart className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif font-bold text-lg text-[#362215]">
              Henüz Kaydedilmiş Eser Yok
            </h3>
            <p className="text-xs text-[#5C4033] leading-relaxed">
              Kütüphanenizde henüz beğendiğiniz bir yazı veya şiir bulunmuyor. Yazılar ve Şiirler sayfalarından beğendiğiniz eserleri kalbe tıklayarak buraya ekleyebilirsiniz.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/yazilar"
              className="px-4 py-2 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Yazıları Keşfet</span>
            </Link>

            <Link
              href="/siirler"
              className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-100 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Feather className="w-3.5 h-3.5 text-amber-400" />
              <span>Şiirleri Keşfet</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
