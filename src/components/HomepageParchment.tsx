'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Feather, ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: string;
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
      
      {/* AUTHENTIC VINTAGE PARCHMENT SHEET CONTAINER */}
      <div className="relative rounded-3xl bg-[#FFFDF7] dark:bg-[#23120A] border-4 border-[#D8C7A5] dark:border-[#5C3119] shadow-2xl p-6 sm:p-12 space-y-8 overflow-hidden">
        
        {/* PARCHMENT DECORATIVE FILIGREE CORNER ORNAMENTS */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#B89F70] dark:border-[#A36D3B] pointer-events-none rounded-tl-xl" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#B89F70] dark:border-[#A36D3B] pointer-events-none rounded-tr-xl" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#B89F70] dark:border-[#A36D3B] pointer-events-none rounded-bl-xl" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#B89F70] dark:border-[#A36D3B] pointer-events-none rounded-br-xl" />

        {/* DOUBLE INNER VINTAGE BORDER */}
        <div className="absolute inset-2.5 border border-[#EADBBD]/70 dark:border-[#3D1E0F] pointer-events-none rounded-2xl" />

        {/* 1. SEAMLESS TWO-WAY CATEGORY TOGGLE (YAZILAR / ŞİİRLER) */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 border-b border-amber-900/15 dark:border-amber-900/40 pb-6">
          
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'all'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/60 dark:bg-amber-950/60 text-[#362215] dark:text-amber-200 border-amber-300/60 dark:border-amber-800 hover:bg-amber-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tüm Seçkiler</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'articles'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/60 dark:bg-amber-950/60 text-[#362215] dark:text-amber-200 border-amber-300/60 dark:border-amber-800 hover:bg-amber-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Yazılar</span>
          </button>

          <button
            onClick={() => setActiveTab('poems')}
            className={`px-6 py-2.5 rounded-full font-serif font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'poems'
                ? 'bg-[#8B4513] text-[#FEF3C7] border-[#5C2E0B] shadow-md scale-105'
                : 'bg-amber-100/60 dark:bg-amber-950/60 text-[#362215] dark:text-amber-200 border-amber-300/60 dark:border-amber-800 hover:bg-amber-200/60'
            }`}
          >
            <Feather className="w-4 h-4 text-amber-500" />
            <span>Şiirler</span>
          </button>

        </div>

        {/* 2. PARCHMENT CONTENT SECTION */}
        <div className="relative z-10">
          
          {/* VIEW MODE: ALL (SIDE-BY-SIDE 2-COLUMN GRID) */}
          {activeTab === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* COLUMN 1: YAZILAR */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#8B4513]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8B4513] dark:text-amber-400" />
                    <h2 className="font-serif font-bold text-xl text-[#362215] dark:text-amber-300 uppercase tracking-wider">
                      YAZILAR
                    </h2>
                  </div>
                  <Link
                    href="/yazilar"
                    className="text-xs font-bold text-[#8B4513] dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Tümü</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {latestArticles.map((article, idx) => (
                    <article key={article.id} className="group flex gap-4 p-3.5 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#2A160C] hover:bg-white border border-[#E6D7BC] dark:border-[#5C3119] shadow-sm transition-all">
                      {article.coverImage ? (
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-amber-950">
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-xl bg-amber-100/60 dark:bg-amber-950 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                          <BookOpen className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                        </div>
                      )}

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#362215] dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors line-clamp-1">
                            <Link href={`/yazilar/${article.slug}`}>
                              {idx + 1}. {article.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-[#5C4033] dark:text-amber-100/80 line-clamp-2 mt-1 font-sans">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-amber-900/80 dark:text-amber-300/80 font-mono mt-2">
                          <span>{new Date(article.publishedAt).toLocaleDateString('tr-TR')}</span>
                          <Link href={`/yazilar/${article.slug}`} className="font-bold hover:underline flex items-center gap-0.5">
                            <span>Oku</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* COLUMN 2: ŞİİRLER */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#8B4513]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <Feather className="w-5 h-5 text-[#8B4513] dark:text-amber-400" />
                    <h2 className="font-serif font-bold text-xl text-[#362215] dark:text-amber-300 uppercase tracking-wider">
                      ŞİİRLER
                    </h2>
                  </div>
                  <Link
                    href="/siirler"
                    className="text-xs font-bold text-[#8B4513] dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Tümü</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {featuredPoems.map((poem, idx) => (
                    <div key={poem.id} className="group p-4 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#2A160C] hover:bg-white border border-[#E6D7BC] dark:border-[#5C3119] shadow-sm transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-base text-[#362215] dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
                          <Link href={`/siirler/${poem.slug}`}>
                            {idx + 1}. {poem.title}
                          </Link>
                        </h3>
                        <span className="text-[11px] text-amber-900/80 dark:text-amber-300/80 font-mono">
                          {new Date(poem.publishedAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>

                      <p className="font-serif italic text-xs text-[#5C4033] dark:text-amber-100/90 line-clamp-2 pl-3 border-l-2 border-amber-600/40">
                        "{poem.excerpt}"
                      </p>

                      <div className="text-right pt-1">
                        <Link
                          href={`/siirler/${poem.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B4513] dark:text-amber-400 hover:underline"
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
              <div className="flex items-center justify-between border-b-2 border-[#8B4513]/30 pb-3">
                <h2 className="font-serif font-bold text-xl text-[#362215] dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
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
                  <article key={article.id} className="group p-5 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#2A160C] border border-[#E6D7BC] dark:border-[#5C3119] shadow-sm hover:shadow-md transition-all space-y-3">
                    {article.coverImage && (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-amber-950">
                        <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <h3 className="font-serif font-bold text-lg text-[#362215] dark:text-amber-300 group-hover:text-amber-800 transition-colors">
                      <Link href={`/yazilar/${article.slug}`}>{idx + 1}. {article.title}</Link>
                    </h3>
                    <p className="text-xs text-[#5C4033] dark:text-amber-100/80 line-clamp-3 font-sans leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-xs font-mono text-amber-900/80 dark:text-amber-300/80">
                      <span>{new Date(article.publishedAt).toLocaleDateString('tr-TR')}</span>
                      <Link href={`/yazilar/${article.slug}`} className="font-bold text-[#8B4513] dark:text-amber-400 hover:underline flex items-center gap-1">
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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
              <div className="flex items-center justify-between border-b-2 border-[#8B4513]/30 pb-3">
                <h2 className="font-serif font-bold text-xl text-[#362215] dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
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
                  <div key={poem.id} className="group p-6 rounded-2xl bg-[#FFFDF9]/90 dark:bg-[#2A160C] border border-[#E6D7BC] dark:border-[#5C3119] shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-xl text-[#362215] dark:text-amber-300 group-hover:text-amber-800 transition-colors">
                        <Link href={`/siirler/${poem.slug}`}>{idx + 1}. {poem.title}</Link>
                      </h3>
                      <span className="text-xs text-amber-900/80 dark:text-amber-300/80 font-mono">
                        {new Date(poem.publishedAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    <div className="pl-4 border-l-2 border-amber-600/40 font-serif italic text-sm text-[#5C4033] dark:text-amber-100/90 whitespace-pre-line leading-relaxed">
                      "{poem.content.length > 180 ? poem.content.slice(0, 180) + '...' : poem.content}"
                    </div>

                    <div className="text-right pt-2">
                      <Link href={`/siirler/${poem.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B4513] dark:text-amber-400 hover:underline">
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
