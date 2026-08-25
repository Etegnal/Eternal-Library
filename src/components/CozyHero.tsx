'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientAudio from '@/components/AmbientAudio';
import { Sparkles, RefreshCw, Feather, BookOpen } from 'lucide-react';

interface CozyHeroProps {
  initialQuote: {
    content?: string;
    quote?: string;
    author: string;
    source?: string | null;
  };
}

export default function CozyHero({ initialQuote }: CozyHeroProps) {
  const [currentQuote, setCurrentQuote] = useState(initialQuote);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const quoteText = currentQuote.content || currentQuote.quote || '';

  const refreshQuote = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const data = await res.json();
        setCurrentQuote(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
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
          
          {/* GÜNÜN SÖZÜ CARD (LEFT SIDE) */}
          <div className="gold-filigree-card relative p-6 sm:p-8 rounded-3xl text-amber-100 shadow-2xl">
            <div className="gold-filigree-inner absolute inset-2 rounded-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Günün Sözü</span>
                </span>

                <button
                  onClick={refreshQuote}
                  disabled={isRefreshing}
                  className="p-1.5 rounded-full text-amber-300 hover:bg-amber-900/60 transition-colors"
                  title="Yeni Söz Getir"
                  aria-label="Yeni Söz Getir"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-amber-100 leading-relaxed font-normal">
                "{quoteText}"
              </p>

              <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  — {currentQuote.author}
                </span>
                {currentQuote.source && (
                  <span className="text-amber-200/70 italic">
                    {currentQuote.source}
                  </span>
                )}
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
