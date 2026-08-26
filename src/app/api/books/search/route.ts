import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim().toLowerCase() || '';

    const dbBooks = await prisma.book.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { author: { contains: query, mode: 'insensitive' } },
              { summary: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
      orderBy: { year: 'asc' },
    });

    if (dbBooks.length > 0) {
      return NextResponse.json(dbBooks);
    }

    const filtered = verifiedBooksData.filter((b) =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query) ||
      b.summary.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query)
    );

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(verifiedBooksData);
  }
}
