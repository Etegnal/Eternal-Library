import { prisma } from '@/lib/prisma';
import { QUOTES_365 } from '@/data/quotesData';

export interface QuoteItem {
  id: string;
  author: string;
  content: string;
  source?: string | null;
  dayOfYear: number;
}

export async function getTodayQuote(): Promise<QuoteItem> {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const targetDay = ((dayOfYear - 1) % 365) + 1;

  return getQuoteByDay(targetDay);
}

export async function getQuoteByDay(dayNumber: number): Promise<QuoteItem> {
  const cleanDay = ((dayNumber - 1 + 365) % 365) + 1;

  try {
    const quote = await prisma.quote.findUnique({
      where: { dayOfYear: cleanDay },
    });

    if (quote) {
      return quote;
    }
  } catch (error) {
    console.error('Error fetching quote by day:', error);
  }

  // Fallback from local dataset
  const fallback = QUOTES_365.find((q) => q.dayOfYear === cleanDay) || QUOTES_365[0];
  return {
    id: `quote-${fallback.dayOfYear}`,
    author: fallback.author,
    content: fallback.content,
    source: fallback.source || `Söz ${fallback.dayOfYear} / 365`,
    dayOfYear: fallback.dayOfYear,
  };
}
