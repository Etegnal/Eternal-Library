'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientAudio from '@/components/AmbientAudio';
import { Sparkles, Feather, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const handlePrev = () => {
    const prevDay = ((currentQuote.dayOfYear - 2 + 365) % 365) + 1;
    fetchQuoteByDay(prevDay);
  };

  const handleNext = () => {
    const nextDay = (currentQuote.dayOfYear % 365) + 1;
    fetchQuoteByDay(nextDay);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#1F0F07]">
      {/* BACKGROUND VIDEO & FALLBACK IMAGE */}
      <div className="absolute inset-0 z-0">
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

        <div
          className="sm:hidden absolute inset-0 bg-cover bg-center filter brightness-[0.85]"
          style={{ backgroundImage: "url('/assets/fireplace-mobile.png')" }}
        />

        {/* DARK CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10" />
      </div>

      <div className="h-24 sm:h-28" />

      {/* HERO CONTENT: POSITIONED ON THE LEFT SIDE */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto py-12">
        <div className="max-w-md space-y-6 text-left">
          
          {/* GÜNÜN SÖZÜ CARD WITH ENLARGED ARROWS (NO REFRESH BUTTON) */}
          <div className="gold-filigree-card relative p-6 sm:p-8 rounded-3xl text-amber-100 shadow-2xl">
            <div className="gold-filigree-inner absolute inset-2 rounded-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* TOP HEADER BAR WITH PREV / NEXT ARROWS ONLY */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Günün Sözü</span>
                </span>

                {/* ENLARGED ARROW NAVIGATION CONTROLS */}
                <div className="flex items-center gap-1.5 bg-amber-950/80 px-2 py-1 rounded-full border border-amber-600/50 shadow-md">
                  <button
                    onClick={handlePrev}
                    disabled={loading}
                    className="p-1.5 rounded-full text-amber-200 hover:text-amber-100 hover:bg-amber-800/60 transition-all disabled:opacity-50"
                    title="Önceki Söz"
                    aria-label="Önceki Söz"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="w-px h-4 bg-amber-700/50" />

                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="p-1.5 rounded-full text-amber-200 hover:text-amber-100 hover:bg-amber-800/60 transition-all disabled:opacity-50"
                    title="Sonraki Söz"
                    aria-label="Sonraki Söz"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* QUOTE TEXT */}
              <p className="font-serif italic text-lg sm:text-xl text-amber-100 leading-relaxed font-normal">
                "{quoteText}"
              </p>

              {/* FOOTER METADATA: AUTHOR & DATE + DAY NUMBER IN SAME BADGE BLOCK */}
              <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  — {currentQuote.author}
                </span>

                {/* SAME BADGE BLOCK: DATE & DAY NUMBER */}
                <span className="font-mono text-xs font-bold text-amber-200 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/50 flex items-center gap-1.5 shadow-sm">
                  <span>{currentQuote.dateStr || getDateStringForDay(currentQuote.dayOfYear)}</span>
                  <span className="text-amber-500">•</span>
                  <span>Söz {currentQuote.dayOfYear} / 365</span>
                </span>
              </div>
            </div>
          </div>

          {/* HERO CTA BUTTONS ALIGNED ON THE LEFT */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/yazilar"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-bold text-xs tracking-widest uppercase shadow-2xl border border-amber-400/40 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Yazıları Keşfet</span>
            </Link>

            <Link
              href="/siirler"
              className="px-5 py-2.5 rounded-full bg-[#23120A]/90 hover:bg-[#331B0F] text-amber-200 font-bold text-xs tracking-widest uppercase shadow-xl border border-amber-700/50 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Feather className="w-4 h-4 text-amber-400" />
              <span>Şiir Antolojisi</span>
            </Link>
          </div>

        </div>
      </div>

      {/* AMBIENT AUDIO WIDGET AT BOTTOM RIGHT */}
      <div className="relative z-30 pb-6 pr-4 sm:pr-8 flex justify-end">
        <AmbientAudio />
      </div>
    </section>
  );
}
