import React from 'react';
import CozyHero from '@/components/CozyHero';
import { getTodayQuote } from '@/lib/quotes';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Feather, BookOpen, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const todayQuote = await getTodayQuote();

  let latestArticles: any[] = [];
  try {
    latestArticles = await prisma.post.findMany({
      where: { type: 'YAZI' },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });
  } catch (e) {
    console.error("Error fetching articles:", e);
  }

  let featuredPoems: any[] = [];
  try {
    featuredPoems = await prisma.post.findMany({
      where: { type: 'SIIR' },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });
  } catch (e) {
    console.error("Error fetching poems:", e);
  }

  return (
    <div className="relative min-h-screen bg-[#FEF8EC]">
      
      {/* 1. LIVING VIDEO HERO SECTION WITH FULL-WIDTH CABIN & ETERNAL LIBRARY BRANDING */}
      <CozyHero initialQuote={todayQuote} />

      {/* TORN PAPER DECKLE EDGE TRANSITION */}
      <div className="relative w-full -mt-8 sm:-mt-12 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full h-12 sm:h-20 text-[#FEF8EC] fill-current">
          <path d="M0,32 L48,42.7 C96,53,192,75,288,74.7 C384,75,480,53,576,42.7 C672,32,768,32,864,42.7 C960,53,1056,75,1152,69.3 C1248,64,1344,32,1392,16 L1440,0 L1440,80 L1392,80 C1344,80,1248,80,1152,80 C1056,80,960,80,864,80 C480,80,384,80,288,80 C192,80,96,80,48,80 L0,80 Z"></path>
        </svg>
      </div>

      {/* 2. PARCHMENT SECTION CONTAINER (MATCHING REFERENCE SCREENSHOT) */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* PARCHMENT SHEET WRAPPER */}
        <div className="parchment-container rounded-3xl p-6 sm:p-12 border-2 border-[#E5D5B7] shadow-fire space-y-10">
          
          {/* MAIN HEADLINE */}
          <div className="text-center border-b border-amber-900/20 pb-6 space-y-2">
            <h1 className="font-cinzel font-bold text-2xl sm:text-4xl text-[#362215] tracking-wide uppercase">
              KARDELENLER VE DÜŞÜNCELER: Yazı & Şiir Dünyası
            </h1>
            <p className="font-serif italic text-sm sm:text-base text-cozy-coffee-light">
              Zamanın ağırdan aktığı lo-fi akşamlarında kaleme alınmış seçkiler
            </p>
          </div>

          {/* TWO MAIN COLUMNS: SON YAZILARIM & ÖNE ÇIKAN ŞİİRLER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* COLUMN 1: SON YAZILARIM */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-700" />
                  <h2 className="font-cinzel font-bold text-xl text-cozy-coffee uppercase tracking-wider">
                    SON YAZILARIM
                  </h2>
                </div>
                <Link
                  href="/yazilar"
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
                >
                  <span>Tümü</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-5">
                {latestArticles.map((article, idx) => (
                  <article key={article.id} className="group flex gap-4 p-3 rounded-2xl bg-white/75 hover:bg-white border border-amber-200/80 shadow-sm transition-all">
                    {/* Thumbnail Image */}
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
                      <div className="w-24 h-24 rounded-xl bg-amber-200/50 flex items-center justify-center shrink-0">
                        <BookOpen className="w-8 h-8 text-amber-700" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-serif font-bold text-base text-cozy-coffee group-hover:text-amber-800 transition-colors line-clamp-1">
                          <Link href={`/yazilar/${article.slug}`}>
                            {idx + 1}. {article.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-cozy-coffee-light line-clamp-2 mt-1 font-sans">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-amber-800/80 font-mono mt-2">
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

            {/* COLUMN 2: ÖNE ÇIKAN ŞİİRLER */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-3">
                <div className="flex items-center gap-2">
                  <Feather className="w-5 h-5 text-amber-700" />
                  <h2 className="font-cinzel font-bold text-xl text-cozy-coffee uppercase tracking-wider">
                    ÖNE ÇIKAN ŞİİRLER
                  </h2>
                </div>
                <Link
                  href="/siirler"
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
                >
                  <span>Tümü</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-5">
                {featuredPoems.map((poem, idx) => (
                  <div key={poem.id} className="group p-4 rounded-2xl bg-white/75 hover:bg-white border border-amber-200/80 shadow-sm transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base text-cozy-coffee group-hover:text-amber-800 transition-colors">
                        <Link href={`/siirler/${poem.slug}`}>
                          {idx + 1}. {poem.title}
                        </Link>
                      </h3>
                      <span className="text-[11px] text-amber-800/80 font-mono">
                        {new Date(poem.publishedAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    <p className="font-serif italic text-xs text-cozy-coffee-light line-clamp-2 pl-3 border-l-2 border-amber-600/40">
                      "{poem.excerpt}"
                    </p>

                    <div className="text-right pt-1">
                      <Link
                        href={`/siirler/${poem.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950"
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

        </div>

      </div>

    </div>
  );
}
