import { PrismaClient } from '@prisma/client';
import { verifiedBooksData } from '../src/lib/verifiedBooks';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Mutlak Kitaplık verified 30 books dataset...');

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

  console.log('Successfully seeded 30 verified books and full text pages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
