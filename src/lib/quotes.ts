import { prisma } from '@/lib/prisma';

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

  try {
    const quote = await prisma.quote.findUnique({
      where: { dayOfYear: targetDay },
    });

    if (quote) {
      return quote;
    }
  } catch (error) {
    console.error('Error fetching today quote:', error);
  }

  // Fallback quote
  return {
    id: 'fallback-1',
    author: 'Marcus Aurelius',
    content: 'Sabah uyandığında yaşamaya, düşünmeye, sevmeye devam etmenin ne büyük bir ayrıcalık olduğunu düşün.',
    source: 'Kendime Düşünceler',
    dayOfYear: targetDay,
  };
}
