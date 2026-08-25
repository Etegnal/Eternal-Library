'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Feather, ArrowRight, Sparkles, Search } from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: string;
  author?: string | null;
  coverImage?: string | null;
  readingTime?: string | null;
  publishedAt: Date | string;
}

interface HomepageParchmentProps {
  latestArticles: PostItem[];
  featuredPoems: PostItem[];
}

export default function HomepageParchment({ latestArticles, featuredPoems }: HomepageParchmentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'poems'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // All combined items
  const allItems = useMemo(() => {
    const combined = [...latestArticles, ...featuredPoems];
    return combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [latestArticles, featuredPoems]);

  // Filtered items based on tab & search query
  const displayedItems = useMemo(() => {
    return allItems.filter((item) => {
      // Tab filter
      if (activeTab === 'articles' && item.type !== 'YAZI') return false;
      if (activeTab === 'poems' && item.type !== 'SIIR') return false;

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesExcerpt = item.excerpt.toLowerCase().includes(query);
        const matchesAuthor = item.author ? item.author.toLowerCase().includes(query) : false;
        return matchesTitle || matchesExcerpt || matchesAuthor;
      }

      return true;
    });
  }, [allItems, activeTab, searchQuery]);

  return (
    <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8 overflow-x-hidden">
      
      {/* ARAMA VE FİLTRELEME BÖLÜMÜ */}
      <div className="space-y-4">
        
        {/* SADE ARAMA ÇUBUĞU */}
        <div className="w-full max-w-2xl mx-auto mb-6 relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Yazı başlığı, şair veya içerik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-stone-200 placeholder:text-stone-500 focus:border-amber-500/40 focus:outline-none w-full text-sm transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-stone-400 hover:text-stone-200 bg-white/5 px-2 py-1 rounded-lg"
            >
              Temizle
            </button>
          )}
        </div>

        {/* KATEGORİ HAPLARI (FİLTRELER) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-transparent text-stone-400 hover:text-stone-200 border border-white/5'
            }`}
          >
            ✨ Tüm Seçkiler ({allItems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'articles'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-transparent text-stone-400 hover:text-stone-200 border border-white/5'
            }`}
          >
            📖 Yazılar ({latestArticles.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('poems')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'poems'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-transparent text-stone-400 hover:text-stone-200 border border-white/5'
            }`}
          >
            ✒️ Şiirler ({featuredPoems.length})
          </button>
        </div>

      </div>

      {/* 1. KART GRID VE EŞİT YÜKSEKLİK MİMARİSİ (auto-rows-fr items-stretch) */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr items-stretch">
          {displayedItems.map((item) => {
            const isPoem = item.type === 'SIIR';
            const detailUrl = isPoem ? `/siirler/${item.slug}` : `/yazilar/${item.slug}`;
            const dateStr = new Date(item.publishedAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <article
                key={item.id}
                className="group flex flex-col justify-between h-full bg-[#130f0c]/90 hover:bg-[#18130f] border border-amber-900/20 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 shadow-lg relative"
              >
                {/* ÜST KISIM */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="text-amber-400/90 font-medium tracking-wide uppercase">
                      {isPoem ? 'Şiir' : 'Deneme & Yazı'}
                    </span>
                    <span className="text-stone-400 text-[11px] flex items-center gap-1">
                      ⏱ {item.readingTime || (isPoem ? '2 dk okuma' : '4 dk okuma')}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 min-h-[3.25rem] mb-2">
                    <Link href={detailUrl}>
                      {item.title}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                    {item.author && <span>{item.author}</span>}
                    {item.author && <span>•</span>}
                    <span>{dateStr}</span>
                  </div>

                  <p className="text-sm text-stone-300/80 leading-relaxed line-clamp-3 font-sans">
                    {item.excerpt}
                  </p>
                </div>

                {/* ALT KISIM (En alta mıhlanmış) */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
                      #{isPoem ? 'Şiir' : 'Edebiyat'}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
                      #EternalLibrary
                    </span>
                    {item.author && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-stone-400 border border-white/5">
                        #{item.author.replace(/\s+/g, '')}
                      </span>
                    )}
                  </div>

                  <Link
                    href={detailUrl}
                    className="flex items-center justify-between text-sm font-medium text-amber-400 group-hover:text-amber-300"
                  >
                    <span>{isPoem ? 'Şiiri Oku' : 'Yazıyı Oku'}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* EMPTY SEARCH STATE */
        <div className="p-12 text-center bg-[#130f0c]/90 rounded-2xl border border-amber-900/20 space-y-3">
          <BookOpen className="w-8 h-8 text-amber-500/60 mx-auto" />
          <p className="text-stone-200 font-serif text-lg">Aramanızla eşleşen bir eser bulunamadı.</p>
          <p className="text-xs text-stone-400">Lütfen arama terimlerinizi veya filtre sekmelerini değiştirip tekrar deneyin.</p>
        </div>
      )}

    </div>
  );
}
