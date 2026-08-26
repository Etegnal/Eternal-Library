import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { year: 'asc' },
    });

    if (books.length > 0) {
      return NextResponse.json({ books });
    }

    return NextResponse.json({ books: verifiedBooksData });
  } catch (error) {
    return NextResponse.json({ books: verifiedBooksData });
  }
}
