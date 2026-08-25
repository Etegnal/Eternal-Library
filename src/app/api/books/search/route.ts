import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchGoogleBooks } from '@/lib/books';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      const books = await prisma.book.findMany({
        take: 12,
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ books });
    }

    // 1. Search local DB
    let localBooks = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { authors: { contains: query, mode: 'insensitive' } },
          { categories: { contains: query, mode: 'insensitive' } },
          { isbn13: { contains: query } },
          { isbn10: { contains: query } },
        ],
      },
    });

    // 2. If local DB has insufficient results (< 4), fetch from Google Books API and cache
    if (localBooks.length < 4) {
      const googleResults = await fetchGoogleBooks(query, 8);

      for (const item of googleResults) {
        if (item.googleBookId) {
          try {
            await prisma.book.upsert({
              where: { googleBookId: item.googleBookId },
              update: {},
              create: {
                ...item,
                curatedCategory: 'Arama Sonuçları',
              },
            });
          } catch (e) {
            // Ignore duplicate errors
          }
        }
      }

      // Re-query local DB
      localBooks = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { authors: { contains: query, mode: 'insensitive' } },
            { categories: { contains: query, mode: 'insensitive' } },
            { isbn13: { contains: query } },
            { isbn10: { contains: query } },
          ],
        },
      });
    }

    return NextResponse.json({ books: localBooks });
  } catch (error) {
    console.error('API Book Search Error:', error);
    return NextResponse.json({ error: 'Arama işlemi başarısız' }, { status: 500 });
  }
}
