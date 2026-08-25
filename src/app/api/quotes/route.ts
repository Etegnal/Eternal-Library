import { NextResponse } from 'next/server';
import { getTodayQuote } from '@/lib/quotes';

export const dynamic = 'force-dynamic';

export async function GET() {
  const quote = await getTodayQuote();
  return NextResponse.json(quote);
}
