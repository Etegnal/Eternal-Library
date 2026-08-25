import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { searchBooks } from '@/lib/books';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    let books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // If database has no books yet, fetch from Open Library API and populate DB
    if (books.length === 0) {
      const defaultQueries = ['Dünya Klasikleri', 'Felsefe'];

      for (const query of defaultQueries) {
        const fetched = await searchBooks(query);
        for (const item of fetched) {
          const bookId = item.googleBookId || item.workKey.replace('/works/', '');
          try {
            await prisma.book.upsert({
              where: { googleBookId: bookId },
              update: {},
              create: {
                googleBookId: bookId,
                isbn10: item.isbn10,
                isbn13: item.isbn13,
                title: item.title,
                authors: item.authors,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                description: item.description || 'Bu eser için özet kütüphane arşivine henüz eklenmemiştir.',
                pageCount: item.pageCount,
                categories: item.categories,
                averageRating: item.averageRating || 4.5,
                ratingsCount: item.ratingsCount || 10,
                thumbnailUrl: item.thumbnailUrl,
                largeCoverUrl: item.largeCoverUrl,
                previewUrl: item.previewUrl,
                isFeatured: true,
                curatedCategory: query,
              },
            });
          } catch (e) {
            console.error('Error upserting curated book:', e);
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
