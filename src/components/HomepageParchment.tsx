'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Feather, ArrowRight, Sparkles } from 'lucide-react';

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

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      
      {/* SADE VE ŞIK PARŞÖMEN KUTU KAPSAYICISI */}
      <div className="relative rounded-3xl bg-[#FFFDF5] border-2 border-[#D8C7A5] shadow-2xl p-6 sm:p-10 md:p-12 space-y-8 overflow-hidden">

        {/* 1. CATEGORY TOGGLE TABS (YAZILAR / ŞİİRLER) */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 border-b border-[#8B4513]/15 pb-6">
          
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'all'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/70 text-[#362215] border-amber-300/80 hover:bg-amber-200/80'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tüm Seçkiler</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'articles'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/70 text-[#362215] border-amber-300/80 hover:bg-amber-200/80'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Yazılar</span>
          </button>

          <button
            onClick={() => setActiveTab('poems')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'poems'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/70 text-[#362215] border-amber-300/80 hover:bg-amber-200/80'
            }`}
          >
            <Feather className="w-4 h-4 text-amber-700" />
            <span>Şiirler</span>
          </button>

        </div>

        {/* 2. PARCHMENT CONTENT SECTION */}
        <div className="relative z-10">
          
          {/* VIEW MODE: ALL (SIDE-BY-SIDE 2-COLUMN GRID WITH BALANCED CARD HEIGHTS) */}
          {activeTab === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* COLUMN 1: YAZILAR */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b-2 border-[#8B4513]/25 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8B4513]" />
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-[#362215] uppercase tracking-wider">
                      YAZILAR
                    </h2>
                  </div>
                  <Link
                    href="/yazilar"
                    className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1"
                  >
                    <span>Tümünü Gör</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {latestArticles.map((article, idx) => (
                    <article
                      key={article.id}
                      className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] hover:border-[#8B4513]/40 shadow-sm hover:shadow-md transition-all duration-200 min-h-[128px]"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-[#362215] group-hover:text-amber-800 transition-colors leading-snug">
                            <Link href={`/yazilar/${article.slug}`}>
                              {idx + 1}. {article.title}
                            </Link>
                          </h3>
                          <span className="text-[11px] text-[#8B4513] font-mono shrink-0">
                            {new Date(article.publishedAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#5C4033] line-clamp-2 font-sans leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#8B4513] pt-2.5 mt-3 border-t border-amber-200/60">
                        <span className="italic font-serif text-[#5C4033]">
                          {article.author ? `— ${article.author}` : '— Eternal'}
                        </span>
                        <Link href={`/yazilar/${article.slug}`} className="font-bold text-[#8B4513] hover:underline flex items-center gap-1">
                          <span>Yazıyı Oku</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* COLUMN 2: ŞİİRLER */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b-2 border-[#8B4513]/25 pb-3">
                  <div className="flex items-center gap-2">
                    <Feather className="w-5 h-5 text-[#8B4513]" />
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-[#362215] uppercase tracking-wider">
                      ŞİİRLER
                    </h2>
                  </div>
                  <Link
                    href="/siirler"
                    className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1"
                  >
                    <span>Tümünü Gör</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {featuredPoems.map((poem, idx) => (
                    <div
                      key={poem.id}
                      className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] shadow-sm hover:shadow-md transition-all duration-200 min-h-[128px]"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif font-bold text-base text-[#362215] group-hover:text-amber-800 transition-colors">
                            <Link href={`/siirler/${poem.slug}`}>
                              {idx + 1}. {poem.title}
                            </Link>
                          </h3>
                          <span className="text-[11px] text-[#8B4513] font-mono">
                            {new Date(poem.publishedAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>

                        <p className="font-serif italic text-xs text-[#5C4033] line-clamp-2 pl-3 border-l-2 border-amber-600/40 leading-relaxed">
                          "{poem.excerpt}"
                        </p>
                      </div>

                      <div className="text-right pt-2 mt-2 border-t border-amber-200/60">
                        <Link
                          href={`/siirler/${poem.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B4513] hover:underline"
                        >
                          <span>Şiiri Oku</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW MODE: ARTICLES ONLY */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#8B4513]/25 pb-3">
                <h2 className="font-serif font-bold text-xl text-[#362215] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#8B4513]" />
                  <span>Yazılar ve Denemeler</span>
                </h2>
                <Link href="/yazilar" className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1">
                  <span>Tüm Yazılar Kataloğu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.map((article, idx) => (
                  <article key={article.id} className="group p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] hover:bg-white border border-[#E6D7BC] hover:border-[#8B4513]/40 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#362215] group-hover:text-amber-800 transition-colors leading-snug">
                          <Link href={`/yazilar/${article.slug}`}>{idx + 1}. {article.title}</Link>
                        </h3>
                        <span className="text-xs text-[#8B4513] font-mono shrink-0">
                          {new Date(article.publishedAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5C4033] line-clamp-3 font-sans leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 text-xs font-mono text-[#8B4513] border-t border-amber-200/60">
                      <span className="italic font-serif text-[#5C4033]">
                        {article.author ? `— ${article.author}` : '— Eternal'}
                      </span>
                      <Link href={`/yazilar/${article.slug}`} className="font-bold text-[#8B4513] hover:underline flex items-center gap-1">
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE: POEMS ONLY */}
          {activeTab === 'poems' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#8B4513]/25 pb-3">
                <h2 className="font-serif font-bold text-xl text-[#362215] uppercase tracking-wider flex items-center gap-2">
                  <Feather className="w-5 h-5 text-[#8B4513]" />
                  <span>Şiir Antolojisi</span>
                </h2>
                <Link href="/siirler" className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1">
                  <span>Tüm Şiirler Kataloğu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPoems.map((poem, idx) => (
                  <div key={poem.id} className="group p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-xl text-[#362215] group-hover:text-amber-800 transition-colors">
                        <Link href={`/siirler/${poem.slug}`}>{idx + 1}. {poem.title}</Link>
                      </h3>
                      <span className="text-xs text-[#8B4513] font-mono">
                        {new Date(poem.publishedAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    <div className="pl-4 border-l-2 border-amber-600/40 font-serif italic text-sm text-[#5C4033] whitespace-pre-line leading-relaxed">
                      "{poem.content.length > 180 ? poem.content.slice(0, 180) + '...' : poem.content}"
                    </div>

                    <div className="text-right pt-2 border-t border-amber-200/60">
                      <Link href={`/siirler/${poem.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B4513] hover:underline">
                        <span>Şiirin Tamamını Oku</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
