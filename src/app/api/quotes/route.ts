import { NextRequest, NextResponse } from 'next/server';
import { getTodayQuote, getQuoteByDay } from '@/lib/quotes';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dayParam = searchParams.get('day');

  if (dayParam) {
    const dayNumber = parseInt(dayParam, 10);
    if (!isNaN(dayNumber)) {
      const quote = await getQuoteByDay(dayNumber);
      return NextResponse.json(quote);
    }
  }

  const quote = await getTodayQuote();
  return NextResponse.json(quote);
}
