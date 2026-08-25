'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientAudio from '@/components/AmbientAudio';
import { Sparkles, RefreshCw, Feather, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface CozyHeroProps {
  initialQuote: {
    id?: string;
    content?: string;
    quote?: string;
    author: string;
    source?: string | null;
    dayOfYear?: number;
  };
}

export default function CozyHero({ initialQuote }: CozyHeroProps) {
  const [currentQuote, setCurrentQuote] = useState({
    ...initialQuote,
    dayOfYear: initialQuote.dayOfYear || 1,
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

  const handleToday = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const today = Math.floor(diff / oneDay);
    const cleanToday = ((today - 1) % 365) + 1;
    fetchQuoteByDay(cleanToday);
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
          
          {/* GÜNÜN SÖZÜ CARD WITH LEFT & RIGHT ARROWS */}
          <div className="gold-filigree-card relative p-6 sm:p-8 rounded-3xl text-amber-100 shadow-2xl">
            <div className="gold-filigree-inner absolute inset-2 rounded-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* TOP HEADER BAR WITH PREV / NEXT NAV ARROWS */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Günün Sözü</span>
                </span>

                {/* ARROW NAVIGATION CONTROLS */}
                <div className="flex items-center gap-1 bg-amber-950/70 p-1 rounded-full border border-amber-700/40">
                  <button
                    onClick={handlePrev}
                    disabled={loading}
                    className="p-1 rounded-full text-amber-300 hover:bg-amber-900/80 transition-colors disabled:opacity-50"
                    title="Önceki Söz"
                    aria-label="Önceki Söz"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleToday}
                    disabled={loading}
                    className="p-1 rounded-full text-amber-300 hover:bg-amber-900/80 transition-colors disabled:opacity-50"
                    title="Bugünün Sözü"
                    aria-label="Bugünün Sözü"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className="p-1 rounded-full text-amber-300 hover:bg-amber-900/80 transition-colors disabled:opacity-50"
                    title="Sonraki Söz"
                    aria-label="Sonraki Söz"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* QUOTE TEXT */}
              <p className="font-serif italic text-lg sm:text-xl text-amber-100 leading-relaxed font-normal">
                "{quoteText}"
              </p>

              {/* FOOTER METADATA: AUTHOR & DAY NUMBER (e.g. Söz 237 / 365) */}
              <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  — {currentQuote.author}
                </span>

                <span className="font-mono text-amber-300/90 font-bold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-700/30">
                  Söz {currentQuote.dayOfYear || 1} / 365
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
