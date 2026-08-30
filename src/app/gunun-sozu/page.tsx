import React from 'react';
import { getTodayQuote } from '@/lib/quotes';
import CozyQuoteCard from '@/components/CozyQuoteCard';
import { Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DailyQuotePage() {
  const quote = await getTodayQuote();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Günün Sözü</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215] dark:text-amber-200 drop-shadow-md">
          Her Gün Yeni Bir İlham
        </h1>
        <p className="text-[#5C4033] dark:text-white text-base leading-relaxed">
          Yılın 365 günü için özenle derlenmiş Stoacı felsefe ve edebi özdeyişler.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <CozyQuoteCard initialQuote={quote} />
      </div>
    </div>
  );
}
