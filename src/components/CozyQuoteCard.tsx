'use client';

import React from 'react';
import { Quote } from 'lucide-react';

interface CozyQuoteCardProps {
  initialQuote: {
    author: string;
    content: string;
    source?: string | null;
    dayOfYear?: number;
  };
}

export default function CozyQuoteCard({ initialQuote }: CozyQuoteCardProps) {
  return (
    <div className="relative p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto border border-amber-300">
        <Quote className="w-6 h-6 text-amber-700" />
      </div>

      <p className="font-serif italic text-xl sm:text-2xl text-[#362215] leading-relaxed">
        "{initialQuote.content}"
      </p>

      <div className="w-16 h-0.5 bg-amber-300 mx-auto" />

      <div className="space-y-1">
        <h4 className="font-serif font-bold text-lg text-[#8B4513]">
          {initialQuote.author}
        </h4>
        {initialQuote.source && (
          <p className="text-xs text-[#5C4033] italic">
            — {initialQuote.source}
          </p>
        )}
      </div>
    </div>
  );
}
