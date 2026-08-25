'use client';

import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDateStringForDay } from '@/lib/quotes';

interface CozyQuoteCardProps {
  initialQuote: {
    id?: string;
    author: string;
    content: string;
    source?: string | null;
    dayOfYear?: number;
    dateStr?: string;
  };
}

export default function CozyQuoteCard({ initialQuote }: CozyQuoteCardProps) {
  const initialDay = initialQuote.dayOfYear || 1;
  const [currentQuote, setCurrentQuote] = useState({
    ...initialQuote,
    dayOfYear: initialDay,
    dateStr: initialQuote.dateStr || getDateStringForDay(initialDay),
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

  return (
    <div className="relative p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-center space-y-6">
      {/* TOP NAV CONTROLS WITH ENLARGED ARROWS */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={loading}
          className="p-2.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-all disabled:opacity-50 flex items-center gap-1 text-xs font-bold shadow-sm"
          title="Önceki Söz"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Önceki Söz</span>
        </button>

        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300 shadow-sm">
          <Quote className="w-6 h-6 text-amber-800" />
        </div>

        <button
          onClick={handleNext}
          disabled={loading}
          className="p-2.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-all disabled:opacity-50 flex items-center gap-1 text-xs font-bold shadow-sm"
          title="Sonraki Söz"
        >
          <span className="hidden sm:inline">Sonraki Söz</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="font-serif italic text-xl sm:text-2xl text-[#362215] leading-relaxed">
        "{currentQuote.content}"
      </p>

      <div className="w-16 h-0.5 bg-amber-300 mx-auto" />

      {/* FOOTER METADATA WITH DATE & DAY NUMBER IN SAME BADGE BLOCK */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <h4 className="font-serif font-bold text-lg text-[#8B4513]">
          — {currentQuote.author}
        </h4>

        <span className="font-mono text-xs font-bold text-[#8B4513] bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-sm flex items-center gap-1.5">
          <span>{currentQuote.dateStr || getDateStringForDay(currentQuote.dayOfYear)}</span>
          <span className="text-amber-500">•</span>
          <span>Söz {currentQuote.dayOfYear} / 365</span>
        </span>
      </div>
    </div>
  );
}
