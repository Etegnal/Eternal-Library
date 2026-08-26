import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export async function ensureVerifiedBooksInDb() {
  try {
    const existingCount = await prisma.book.count();
    
    // If DB has less than 30 books, populate/upsert all 30 books
    if (existingCount < verifiedBooksData.length) {
      for (const item of verifiedBooksData) {
        const book = await prisma.book.upsert({
          where: { slug: item.slug },
          update: {
            title: item.title,
            author: item.author,
            year: item.year,
            pages: item.pages,
            category: item.category,
            summary: item.summary,
            rating: item.rating,
            isReadable: item.isReadable,
            coverUrl: item.coverUrl,
          },
          create: {
            slug: item.slug,
            title: item.title,
            author: item.author,
            year: item.year,
            pages: item.pages,
            category: item.category,
            summary: item.summary,
            rating: item.rating,
            isReadable: item.isReadable,
            coverUrl: item.coverUrl,
          },
        });

        // Add BookPage records if fullPages exist and not already in DB
        if (item.fullPages && item.fullPages.length > 0) {
          for (let i = 0; i < item.fullPages.length; i++) {
            await prisma.bookPage.upsert({
              where: {
                bookId_pageNumber: {
                  bookId: book.id,
                  pageNumber: i + 1,
                },
              },
              update: {
                content: item.fullPages[i],
              },
              create: {
                bookId: book.id,
                pageNumber: i + 1,
                content: item.fullPages[i],
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error syncing verified books to database:', error);
  }
}
