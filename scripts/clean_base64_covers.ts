import { prisma } from '../src/lib/prisma';
import { verifiedBooksData } from '../src/lib/verifiedBooks';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';

async function main() {
  console.log('🔍 BASE64 KAPAK TEMİZLEME VE OPTİMİZASYON BAŞLADI...');

  const books = await prisma.book.findMany({
    select: { id: true, slug: true, title: true, coverUrl: true },
  });

  let base64CleanedCount = 0;
  let skippedCount = 0;

  for (const book of books) {
    if (book.coverUrl && book.coverUrl.startsWith('data:')) {
      // Find matching verified book URL or use default Unsplash book cover
      const matched = verifiedBooksData.find((vb) => vb.slug === book.slug || vb.title.toLowerCase() === book.title.toLowerCase());
      const newCoverUrl = matched && matched.coverUrl && !matched.coverUrl.startsWith('data:')
        ? matched.coverUrl
        : DEFAULT_COVER;

      await prisma.book.update({
        where: { id: book.id },
        data: { coverUrl: newCoverUrl },
      });

      console.log(`✅ [${book.title}] Base64 kapak temizlendi -> ${newCoverUrl.substring(0, 50)}...`);
      base64CleanedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log('\n======================================================');
  console.log(`🎉 TEMİZLİK TAMAMLANDI!`);
  console.log(`- Base64 kapaklar temizlendi: ${base64CleanedCount} adet`);
  console.log(`- Zaten temiz olan kapaklar: ${skippedCount} adet`);
  console.log(`- Toplam Kitap: ${books.length} adet`);
  console.log('======================================================');
}

main().then(() => process.exit(0)).catch(console.error);
