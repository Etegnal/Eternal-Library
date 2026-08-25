'use client';

import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface CozyQuoteCardProps {
  initialQuote: {
    id?: string;
    author: string;
    content: string;
    source?: string | null;
    dayOfYear?: number;
  };
}

export default function CozyQuoteCard({ initialQuote }: CozyQuoteCardProps) {
  const [currentQuote, setCurrentQuote] = useState({
    ...initialQuote,
    dayOfYear: initialQuote.dayOfYear || 1,
  });
  const [loading, setLoading] = useState(false);

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
    <div className="relative p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-center space-y-6">
      {/* TOP NAV CONTROLS */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={loading}
          className="p-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors disabled:opacity-50 flex items-center gap-1 text-xs font-bold"
          title="Önceki Söz"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Önceki</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
            <Quote className="w-5 h-5 text-amber-800" />
          </div>

          <button
            onClick={handleToday}
            disabled={loading}
            className="p-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors"
            title="Bugünün Sözü"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={loading}
          className="p-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors disabled:opacity-50 flex items-center gap-1 text-xs font-bold"
          title="Sonraki Söz"
        >
          <span className="hidden sm:inline">Sonraki</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="font-serif italic text-xl sm:text-2xl text-[#362215] leading-relaxed">
        "{currentQuote.content}"
      </p>

      <div className="w-16 h-0.5 bg-amber-300 mx-auto" />

      <div className="flex items-center justify-between pt-2">
        <h4 className="font-serif font-bold text-lg text-[#8B4513]">
          — {currentQuote.author}
        </h4>

        <span className="font-mono text-xs font-bold text-[#8B4513] bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          Söz {currentQuote.dayOfYear || 1} / 365
        </span>
      </div>
    </div>
  );
}
