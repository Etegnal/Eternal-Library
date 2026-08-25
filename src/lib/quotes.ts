import { prisma } from '@/lib/prisma';
import { QUOTES_365 } from '@/data/quotesData';

export interface QuoteItem {
  id: string;
  author: string;
  content: string;
  source?: string | null;
  dayOfYear: number;
  dateStr?: string;
}

export function getDateStringForDay(dayOfYear: number): string {
  const year = new Date().getFullYear();
  const date = new Date(year, 0, dayOfYear);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
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
  const dateStr = getDateStringForDay(cleanDay);

  try {
    const quote = await prisma.quote.findUnique({
      where: { dayOfYear: cleanDay },
    });

    if (quote) {
      return {
        ...quote,
        dateStr,
      };
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
    dateStr,
  };
}
