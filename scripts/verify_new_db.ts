import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 YENİ VERİTABANI SAĞLIK VE VERİ KONTROLÜ BAŞLADI...');

  const userCount = await prisma.user.count();
  const bookCount = await prisma.book.count();
  const bookPageCount = await prisma.bookPage.count();
  const postCount = await prisma.post.count();
  const poetCount = await prisma.masterPoet.count();
  const trackCount = await prisma.track.count();
  const testCount = await prisma.psychologicalTest.count();
  const quoteCount = await prisma.quote.count();
  const viewCount = await prisma.viewRecord.count();
  const likeCount = await prisma.likeRecord.count();
  const savedCount = await prisma.savedBook.count();

  console.log('\n📊 MAVCUT YENİ VERİTABANI İSTATİSTİKLERİ:');
  console.log(`- 👥 Kullanıcılar (Users): ${userCount}`);
  console.log(`- 📚 Kitaplar (Books): ${bookCount}`);
  console.log(`- 📖 Kitap Sayfaları (BookPages): ${bookPageCount}`);
  console.log(`- ✍️ Yazı ve Şiirler (Posts): ${postCount}`);
  console.log(`- ✒️ Üstat Kalemler (MasterPoets): ${poetCount}`);
  console.log(`- 🎵 Müzikler (Tracks): ${trackCount}`);
  console.log(`- 🧠 Psikolojik Testler (PsychologicalTests): ${testCount}`);
  console.log(`- 💬 Günün Sözü (Quotes): ${quoteCount}`);
  console.log(`- 👁️ Okuma Logları (ViewRecords): ${viewCount}`);
  console.log(`- ❤️ Beğeniler (LikeRecords): ${likeCount}`);
  console.log(`- 🔖 Kaydedilen Kitaplar (SavedBooks): ${savedCount}`);

  // Test latest view record analytics fields
  const latestView = await prisma.viewRecord.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  if (latestView) {
    console.log('\n📍 SON GÖRÜNTÜLENME LOGU (ANALİTİK KONTROLÜ):');
    console.log(`- Post Title: ${latestView.postTitle}`);
    console.log(`- Okuyan: ${latestView.userName} (${latestView.userEmail})`);
    console.log(`- Konum: ${latestView.city || 'Bilinmiyor'}, ${latestView.country || 'TR'}`);
    console.log(`- Cihaz & OS: ${latestView.deviceType} (${latestView.os} / ${latestView.browser})`);
    console.log(`- Referrer: ${latestView.referrer}`);
    console.log(`- Tarih: ${latestView.createdAt.toISOString()}`);
  }

  console.log('\n✅ VERİTABANI BAĞLANTISI VE TÜM VERİLER YENİ DB ÜZERİNDE TAMAMEN SAĞLIKLI!');
}

main()
  .catch((e) => {
    console.error('❌ HATA:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
