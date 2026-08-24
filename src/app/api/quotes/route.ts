import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTodayQuote } from '@/lib/quotes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dayStr = searchParams.get('day');

  if (dayStr) {
    const day = parseInt(dayStr, 10);
    if (!isNaN(day) && day >= 1 && day <= 366) {
      const quote = await getTodayQuote(day);
      return NextResponse.json(quote);
    }
  }

  // Default to today's quote
  const quote = await getTodayQuote();
  return NextResponse.json(quote);
}
