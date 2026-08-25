import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchGoogleBooks } from '@/lib/books';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    let books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // If database has no books yet, fetch from Google Books API and populate DB
    if (books.length === 0) {
      const defaultQueries = ['Dünya Klasikleri', 'Felsefe', 'Türk Edebiyatı'];

      for (const query of defaultQueries) {
        const fetched = await fetchGoogleBooks(query, 5);
        for (const item of fetched) {
          if (item.googleBookId) {
            await prisma.book.upsert({
              where: { googleBookId: item.googleBookId },
              update: {},
              create: {
                ...item,
                isFeatured: true,
                curatedCategory: query,
              },
            });
          }
        }
      }

      books = await prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json({ books });
  } catch (error) {
    console.error('API Curated Books Error:', error);
    return NextResponse.json({ error: 'Kitaplar getirilemedi' }, { status: 500 });
  }
}
