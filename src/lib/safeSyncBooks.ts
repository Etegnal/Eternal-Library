import { PrismaClient } from '@prisma/client';
import { verifiedBooksData } from './verifiedBooks';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Sadece Book tablosu temizleniyor (Diğer tablolar: User, Post, Track, Letter, MasterPoet DOKUNULMUYOR)...');

  try {
    // Sadece Book ve BookPage tablolarını temizle
    await prisma.bookPage.deleteMany({});
    await prisma.book.deleteMany({});
    console.log('✅ Book tablosu başarıyla temizlendi.');

    // 30 Mutlak Kitaplık Eserini ekle
    for (const item of verifiedBooksData) {
      const book = await prisma.book.create({
        data: {
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
          await prisma.bookPage.create({
            data: {
              bookId: book.id,
              pageNumber: i + 1,
              content: item.fullPages[i],
            },
          });
        }
      }
    }
    console.log('✅ Mutlak Kitaplık 30 eser ve tam metin sayfaları başarıyla eklendi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
