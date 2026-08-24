'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Check, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyQuoteData {
  id: string;
  dayOfYear: number;
  quote: string;
  author: string;
  book?: string | null;
}

interface CozyHeroProps {
  initialQuote: DailyQuoteData;
}

export default function CozyHero({ initialQuote }: CozyHeroProps) {
  const [quote, setQuote] = useState<DailyQuoteData>(initialQuote);
  const [copied, setCopied] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleCopy = () => {
    const textToCopy = `"${quote.quote}" - ${quote.author}${quote.book ? ` (${quote.book})` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const changeDay = async (delta: number) => {
    setIsChanging(true);
    let nextDay = quote.dayOfYear + delta;
    if (nextDay > 366) nextDay = 1;
    if (nextDay < 1) nextDay = 366;

    try {
      const res = await fetch(`/api/quotes?day=${nextDay}`);
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsChanging(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay started", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[660px] sm:min-h-[760px] lg:min-h-[840px] flex items-center justify-center overflow-hidden bg-[#160A04]">
      
      {/* 1. DESKTOP LIVING VIDEO BACKGROUND */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
        >
          <source src="/assets/fireplace.mp4" type="video/mp4" />
          <source src="/assets/cabin_alive.mp4" type="video/mp4" />
          <source src="/assets/cozy-cabin-bg.webp" type="image/webp" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#140803]/85 via-transparent to-[#180C06]/40 pointer-events-none" />
      </div>

      {/* 2. MOBILE DEDICATED VERTICAL COZY FIREPLACE BACKGROUND */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src="/assets/fireplace-mobile.png"
          alt="Cozy Mobile Fireplace Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-95 contrast-105"
        />
        {/* Dynamic Flame Particles Over Mobile Fireplace Hearth */}
        <div className="absolute bottom-[28%] left-[50%] -translate-x-1/2 pointer-events-none z-10 w-24 h-24 flex items-end justify-center">
          <div className="relative w-full h-full flex items-end justify-center">
            <div className="absolute bottom-0 w-40 h-40 bg-amber-500/40 rounded-full blur-2xl animate-pulse" />
            <svg viewBox="0 0 100 120" className="w-16 h-24 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]">
              <path
                className="animate-flame-flicker"
                d="M 50,110 C 20,110 10,75 30,45 C 40,30 48,15 50,5 C 52,15 60,30 70,45 C 90,75 80,110 50,110 Z"
                fill="url(#mobFire1)"
              />
              <path
                className="animate-flame-flicker"
                style={{ animationDelay: '0.5s' }}
                d="M 50,105 C 30,105 25,80 38,55 C 45,40 49,25 50,15 C 51,25 55,40 62,55 C 75,80 70,105 50,105 Z"
                fill="url(#mobFire2)"
              />
              <defs>
                <linearGradient id="mobFire1" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="mobFire2" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FEF08A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#140803]/90 via-transparent to-[#180C06]/50 pointer-events-none" />
      </div>

      {/* 3. HERO CONTENT CONTAINER (MINIMALIST GLASSMORPHISM PLAQUE ALIGNED TO LEFT WALL) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-16 flex items-center min-h-[620px]">
        
        {/* COMPACT MINIMALIST GLASS CARD ALIGNED TO LEFT WALL */}
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative backdrop-blur-md bg-black/40 border border-amber-500/20 rounded-2xl p-5 sm:p-6 shadow-2xl text-amber-50"
          >
            {/* Top Badge Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-cinzel font-bold text-xs tracking-widest uppercase text-amber-300">
                  GÜNÜN İLHAMI
                </span>
              </div>
              
              <span className="text-[10px] font-bold text-amber-200/70 tracking-wider font-mono">
                365 GÜNÜN {quote.dayOfYear}. GÜNÜ
              </span>
            </div>

            {/* Quote Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={quote.dayOfYear}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 min-h-[110px] flex flex-col justify-center"
              >
                <p className="font-serif italic text-base sm:text-xl leading-relaxed text-amber-50/90 font-medium">
                  “{quote.quote}”
                </p>
                
                <p className="text-right font-serif font-bold text-xs sm:text-sm text-amber-300/90">
                  — {quote.author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Controls: Minimalist Small Icon/Pill Buttons */}
            <div className="pt-3 mt-3 border-t border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => changeDay(-1)}
                  disabled={isChanging}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-amber-200 border border-amber-500/20 transition-all flex items-center gap-1 text-xs font-medium"
                  title="Önceki Söz"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Önceki</span>
                </button>

                <button
                  onClick={() => changeDay(1)}
                  disabled={isChanging}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-amber-200 border border-amber-500/20 transition-all flex items-center gap-1 text-xs font-medium"
                  title="Sonraki Söz"
                >
                  <span className="hidden sm:inline">Sonraki</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1.5 rounded-lg font-medium border border-amber-500/30 transition-all shadow-sm"
                title="Sözü Kopyala"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-300">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
