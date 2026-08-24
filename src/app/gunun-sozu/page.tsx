'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Search, RefreshCw, Copy, Check, Feather, ChevronLeft, ChevronRight } from 'lucide-react';

interface Quote {
  id: string;
  dayOfYear: number;
  quote: string;
  author: string;
  book?: string | null;
}

export default function DailyQuotesPage() {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchDay, setSearchDay] = useState('');

  // Get current day of year on load
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const day = Math.min(Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 1), 366);
    setCurrentDay(day);
    fetchQuote(day);
  }, []);

  const fetchQuote = async (day: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotes?day=${day}`);
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (newDay: number) => {
    let validDay = newDay;
    if (validDay > 366) validDay = 1;
    if (validDay < 1) validDay = 366;
    setCurrentDay(validDay);
    fetchQuote(validDay);
  };

  const handleRandom = () => {
    const randomDay = Math.floor(Math.random() * 365) + 1;
    handleDayChange(randomDay);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dayNum = parseInt(searchDay, 10);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 366) {
      handleDayChange(dayNum);
      setSearchDay('');
    }
  };

  const handleCopy = () => {
    if (!quote) return;
    const textToCopy = `"${quote.quote}" - ${quote.author}${quote.book ? ` (${quote.book})` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <Calendar className="w-4 h-4 text-cozy-amber" />
          <span>Takvim Arşivi</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-cozy-coffee">
          365 Günün İlham Sözü
        </h1>
        <p className="text-cozy-coffee-light text-base leading-relaxed">
          Yılın her günü için özenle derlenmiş edebi sözler, felsefi düşünceler ve ilham veren alıntılar.
        </p>
      </div>

      {/* Control Bar: Jump to Day & Random */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-cozy-parchment-border shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <input
              type="number"
              min="1"
              max="366"
              placeholder="Gün No (1-365)..."
              value={searchDay}
              onChange={(e) => setSearchDay(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-amber-200 focus:outline-none focus:border-cozy-amber text-cozy-coffee bg-amber-50/50"
            />
            <Search className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-2.5" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-bold bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood rounded-xl transition-colors"
          >
            Git
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleRandom}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cozy-amber-dark bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors border border-amber-300/60"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rastgele Söz</span>
          </button>
        </div>
      </div>

      {/* Display Card */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border-2 border-[#E5D5B7] shadow-fire space-y-6">
        {/* Day Header Badge */}
        <div className="flex items-center justify-between border-b border-cozy-parchment-border pb-4">
          <div className="flex items-center gap-2 text-cozy-amber-dark font-semibold text-xs uppercase tracking-wider">
            <Feather className="w-4 h-4 text-cozy-amber" />
            <span>Kütüphane Takvimi</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-cozy-amber/10 text-cozy-amber-dark px-3 py-1 rounded-full border border-cozy-amber/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentDay}. Gün Alıntısı</span>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 text-center text-cozy-coffee-light animate-pulse">
            Söz yükleniyor...
          </div>
        ) : quote ? (
          <div className="space-y-6">
            <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-cozy-coffee italic font-medium">
              “{quote.quote}”
            </p>

            <div className="pt-4 border-t border-dashed border-cozy-parchment-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-cozy-coffee">{quote.author}</h3>
                {quote.book && (
                  <p className="text-xs text-cozy-coffee-light italic">
                    Eser: {quote.book}
                  </p>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs bg-cozy-amber/10 hover:bg-cozy-amber/20 text-cozy-amber-dark px-4 py-2 rounded-xl font-semibold transition-all self-end sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-700" />
                    <span className="text-green-700">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sözü Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}

        {/* Bottom Pagination */}
        <div className="pt-4 border-t border-cozy-parchment-border flex items-center justify-between">
          <button
            onClick={() => handleDayChange(currentDay - 1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-cozy-coffee-light hover:text-cozy-amber transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Önceki Gün ({currentDay === 1 ? 366 : currentDay - 1})</span>
          </button>

          <span className="text-xs text-cozy-coffee-light font-mono">
            {currentDay} / 366
          </span>

          <button
            onClick={() => handleDayChange(currentDay + 1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-cozy-coffee-light hover:text-cozy-amber transition-colors"
          >
            <span>Sonraki Gün ({currentDay === 366 ? 1 : currentDay + 1})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
