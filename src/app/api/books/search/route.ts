import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { searchBooks, getBookDetails } from '@/lib/books';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || !query.trim()) {
      // Return initial curated books from DB if query is empty
      const curatedBooks = await prisma.book.findMany({
        take: 12,
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(curatedBooks);
    }

    const cleanQuery = query.trim();

    // 1. Search in Local Database
    const localBooks = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: cleanQuery, mode: 'insensitive' } },
          { authors: { contains: cleanQuery, mode: 'insensitive' } },
          { isbn13: { contains: cleanQuery, mode: 'insensitive' } },
          { isbn10: { contains: cleanQuery, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });

    if (localBooks.length >= 3) {
      return NextResponse.json(localBooks);
    }

    // 2. Fetch from Open Library API if local DB has fewer than 3 matches
    const openLibraryBooks = await searchBooks(cleanQuery);

    if (openLibraryBooks.length === 0) {
      return NextResponse.json(localBooks);
    }

    // 3. Background Caching into Local Neon Database
    const cachedBooks = await Promise.all(
      openLibraryBooks.map(async (olBook) => {
        try {
          const bookId = olBook.googleBookId || olBook.workKey.replace('/works/', '');
          
          const existing = await prisma.book.findFirst({
            where: {
              OR: [
                { googleBookId: bookId },
                { title: olBook.title },
              ],
            },
          });

          if (existing) {
            return existing;
          }

          // Fetch description lazily for caching
          const description = await getBookDetails(olBook.workKey);

          const newBook = await prisma.book.create({
            data: {
              googleBookId: bookId,
              isbn10: olBook.isbn10,
              isbn13: olBook.isbn13,
              title: olBook.title,
              authors: olBook.authors,
              publisher: olBook.publisher,
              publishedDate: olBook.publishedDate,
              description,
              pageCount: olBook.pageCount,
              categories: olBook.categories,
              averageRating: olBook.averageRating || 4.5,
              ratingsCount: olBook.ratingsCount || 10,
              thumbnailUrl: olBook.thumbnailUrl,
              largeCoverUrl: olBook.largeCoverUrl,
              previewUrl: olBook.previewUrl,
              isFeatured: false,
              curatedCategory: olBook.categories,
            },
          });

          return newBook;
        } catch (e) {
          console.error('Error caching Open Library book:', e);
          const now = new Date();
          return {
            id: olBook.googleBookId || olBook.workKey,
            googleBookId: olBook.googleBookId || null,
            isbn10: olBook.isbn10 || null,
            isbn13: olBook.isbn13 || null,
            title: olBook.title,
            subtitle: olBook.subtitle || null,
            authors: olBook.authors,
            publisher: olBook.publisher || null,
            publishedDate: olBook.publishedDate || null,
            description: 'Bu eser için özet kütüphane arşivine henüz eklenmemiştir.',
            pageCount: olBook.pageCount || null,
            categories: olBook.categories,
            averageRating: olBook.averageRating || null,
            ratingsCount: olBook.ratingsCount || null,
            thumbnailUrl: olBook.thumbnailUrl || null,
            largeCoverUrl: olBook.largeCoverUrl || null,
            previewUrl: olBook.previewUrl || null,
            isFeatured: false,
            curatedCategory: olBook.categories,
            createdAt: now,
            updatedAt: now,
          };
        }
      })
    );

    // Combine local DB and newly cached books (removing duplicates)
    const combined = [...localBooks];
    for (const b of cachedBooks) {
      if (!combined.some((item) => item.id === b.id || item.title === b.title)) {
        combined.push(b);
      }
    }

    return NextResponse.json(combined);
  } catch (error) {
    console.error('API Book Search Error:', error);
    return NextResponse.json({ error: 'Arama sırasında bir hata oluştu' }, { status: 500 });
  }
}
