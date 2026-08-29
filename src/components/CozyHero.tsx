'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientAudio from '@/components/AmbientAudio';
import { Feather, BookOpen, Library, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDateStringForDay } from '@/lib/quotes';

interface CozyHeroProps {
  initialQuote: {
    id?: string;
    content?: string;
    quote?: string;
    author: string;
    source?: string | null;
    dayOfYear?: number;
    dateStr?: string;
  };
}

export default function CozyHero({ initialQuote }: CozyHeroProps) {
  const initialDay = initialQuote.dayOfYear || 1;
  const [currentQuote, setCurrentQuote] = useState({
    ...initialQuote,
    dayOfYear: initialDay,
    dateStr: initialQuote.dateStr || getDateStringForDay(initialDay),
  });
  const [loading, setLoading] = useState(false);

  const quoteText = currentQuote.content || currentQuote.quote || '';

  const fetchQuoteByDay = async (targetDay: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotes?day=${targetDay}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentQuote(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prevDay = ((currentQuote.dayOfYear - 2 + 365) % 365) + 1;
    fetchQuoteByDay(prevDay);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextDay = (currentQuote.dayOfYear % 365) + 1;
    fetchQuoteByDay(nextDay);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#1F0F07]">
      
      {/* BACKGROUND LIVING VIDEOS (DESKTOP & MOBILE) */}
      <div className="absolute inset-0 z-0">
        {/* DESKTOP LIVING VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/fireplace-mobile.png"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
        >
          <source src="/assets/fireplace.mp4" type="video/mp4" />
        </video>

        {/* MOBILE LIVING VIDEO (FIREPLACE MOBIL.MP4) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/fireplace-mobile.png"
          className="sm:hidden absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
        >
          <source src="/assets/fireplace-mobile.mp4" type="video/mp4" />
          <source src="/assets/fireplace mobil.mp4" type="video/mp4" />
        </video>

        {/* DARK CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10" />
      </div>

      {/* HERO CONTENT: POSITIONED SLIGHTLY LOWER WITH INCREASED TRANSPARENCY */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full pt-36 sm:pt-44 mb-auto pb-6 sm:pb-12">
        <div className="max-w-md space-y-4 sm:space-y-6 text-left">
          
          {/* GÜNÜN SÖZÜ CARD - ENTIRE CARD CLICKABLE TO /gunun-sozu */}
          <Link
            href="/gunun-sozu"
            className="block relative p-5 sm:p-8 rounded-2xl text-amber-100 shadow-2xl bg-black/30 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:bg-black/40 transition-all cursor-pointer group/card"
            title="Günün Sözü Sayfasına Git"
          >
            <div className="relative z-10 space-y-4 sm:space-y-5">
              {/* TOP HEADER BAR */}
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium tracking-widest text-amber-400 group-hover/card:text-amber-200 uppercase flex items-center gap-1.5 transition-colors">
                  <span>Günün Sözü</span>
                  <span className="text-[10px] text-amber-400/70 group-hover/card:text-amber-200 transition-colors">↗</span>
                </div>

                {/* MINIMAL ARROW NAVIGATION CONTROLS */}
                <div className="flex items-center gap-1 text-amber-300/80">
                  <button
                    onClick={handlePrev}
                    disabled={loading}
                    className="p-1 text-amber-200/70 hover:text-amber-100 transition-colors disabled:opacity-50"
                    title="Önceki Söz"
                    aria-label="Önceki Söz"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-white/20 text-xs">|</span>

                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="p-1 text-amber-200/70 hover:text-amber-100 transition-colors disabled:opacity-50"
                    title="Sonraki Söz"
                    aria-label="Sonraki Söz"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* QUOTE TEXT */}
              <p className="font-serif italic text-base sm:text-xl text-amber-100 leading-relaxed font-normal group-hover/card:text-white transition-colors">
                "{quoteText}"
              </p>

              {/* FOOTER METADATA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/80">
                <span className="font-serif font-medium text-amber-200/90 text-xs sm:text-sm">
                  — {currentQuote.author}
                </span>

                <span className="text-[11px] sm:text-xs text-amber-200/70">
                  {currentQuote.dateStr || getDateStringForDay(currentQuote.dayOfYear)} • Söz {currentQuote.dayOfYear} / 365
                </span>
              </div>
            </div>
          </Link>

          {/* HERO CTA BUTTONS */}
          <div className="space-y-2.5 pt-1 sm:pt-2 w-full max-w-md">
            {/* ROW 1: YAZILAR & ŞİİRLER SIDE BY SIDE */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <Link
                href="/yazilar"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-amber-500/20 text-amber-100 border border-amber-500/30 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Yazıları Keşfet</span>
              </Link>

              <Link
                href="/siirler"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-amber-500/20 text-amber-100 border border-amber-500/30 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <Feather className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Şiir Antolojisi</span>
              </Link>
            </div>

            {/* ROW 2: CENTERED KITAPLAR BUTTON UNDERNEATH */}
            <Link
              href="/kitaplar"
              className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-amber-500/20 text-amber-100 border border-amber-500/30 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
            >
              <Library className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mutlak Kitaplık</span>
            </Link>
          </div>

        </div>
      </div>

      {/* AMBIENT AUDIO WIDGET AT BOTTOM RIGHT */}
      <div className="relative z-30 pb-4 sm:pb-6 pr-4 sm:pr-8 flex justify-end">
        <AmbientAudio />
      </div>
    </section>
  );
}
