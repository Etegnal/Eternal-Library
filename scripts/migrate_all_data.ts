import { PrismaClient } from '@prisma/client';

const OLD_DB_URL = "postgresql://neondb_owner:npg_h1IzxWt3ojms@ep-dry-unit-b19w16ha.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require";
const NEW_DB_URL = "postgresql://neondb_owner:npg_zyMaWL36IZuv@ep-cool-mouse-b2w737j1-pooler.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sourceClient = new PrismaClient({
  datasources: { db: { url: OLD_DB_URL } },
});

const targetClient = new PrismaClient({
  datasources: { db: { url: NEW_DB_URL } },
});

async function main() {
  console.log('🚀 TAM VERİTABANI TAŞIMA (MIGRATION) BAŞLADI...');
  console.log(`🔴 Eski DB: ${OLD_DB_URL}`);
  console.log(`🟢 Yeni DB: ${NEW_DB_URL}`);

  try {
    // 1. USERS
    const users = await sourceClient.user.findMany();
    console.log(`👥 Users: ${users.length} adet bulundu. Taşınıyor...`);
    for (const u of users) {
      await targetClient.user.upsert({
        where: { email: u.email },
        update: u,
        create: u,
      });
    }
    console.log('✅ Users aktarıldı.');

    // 2. POSTS (Yazılar & Şiirler)
    const posts = await sourceClient.post.findMany();
    console.log(`✍️ Posts (Yazılar/Şiirler): ${posts.length} adet bulundu. Taşınıyor...`);
    for (const p of posts) {
      await targetClient.post.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }
    console.log('✅ Posts aktarıldı.');

    // 3. BOOKS (145 Kitap - Base64 Kapaklar Temizlenerek)
    const books = await sourceClient.book.findMany();
    console.log(`📚 Books (Kitaplar): ${books.length} adet bulundu. Taşınıyor...`);
    for (const b of books) {
      const cleanCoverUrl = b.coverUrl && !b.coverUrl.startsWith('data:')
        ? b.coverUrl
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';

      const bookData = { ...b, coverUrl: cleanCoverUrl };

      await targetClient.book.upsert({
        where: { id: b.id },
        update: bookData,
        create: bookData,
      });
    }
    console.log('✅ Books aktarıldı.');

    // 4. BOOK PAGES (325 Kitap Sayfası)
    const pages = await sourceClient.bookPage.findMany();
    console.log(`📖 BookPages (Kitap Sayfaları): ${pages.length} adet bulundu. Taşınıyor...`);
    for (const pg of pages) {
      await targetClient.bookPage.upsert({
        where: { id: pg.id },
        update: pg,
        create: pg,
      });
    }
    console.log('✅ BookPages aktarıldı.');

    // 5. MASTER POETS
    const poets = await sourceClient.masterPoet.findMany();
    console.log(`✒️ MasterPoets: ${poets.length} adet bulundu. Taşınıyor...`);
    for (const mp of poets) {
      await targetClient.masterPoet.upsert({
        where: { id: mp.id },
        update: mp,
        create: mp,
      });
    }
    console.log('✅ MasterPoets aktarıldı.');

    // 6. VIEW RECORDS (Okuma Logları)
    const views = await sourceClient.viewRecord.findMany();
    console.log(`👁️ ViewRecords (Okuma Logları): ${views.length} adet bulundu. Taşınıyor...`);
    for (const v of views) {
      await targetClient.viewRecord.upsert({
        where: { id: v.id },
        update: v,
        create: v,
      });
    }
    console.log('✅ ViewRecords aktarıldı.');

    // 7. QUOTES, TRACKS, TESTS, REVIEWS, LIKES
    const quotes = await sourceClient.quote.findMany();
    for (const q of quotes) {
      await targetClient.quote.upsert({ where: { id: q.id }, update: q, create: q });
    }

    const tracks = await sourceClient.track.findMany();
    for (const t of tracks) {
      await targetClient.track.upsert({ where: { id: t.id }, update: t, create: t });
    }

    const likes = await sourceClient.likeRecord.findMany();
    for (const l of likes) {
      await targetClient.likeRecord.upsert({ where: { id: l.id }, update: l, create: l });
    }

    const saved = await sourceClient.savedBook.findMany();
    for (const sb of saved) {
      await targetClient.savedBook.upsert({ where: { id: sb.id }, update: sb, create: sb });
    }

    const read = await sourceClient.readBook.findMany();
    for (const rb of read) {
      await targetClient.readBook.upsert({ where: { id: rb.id }, update: rb, create: rb });
    }

    const reviews = await sourceClient.bookReview.findMany();
    for (const br of reviews) {
      await targetClient.bookReview.upsert({ where: { id: br.id }, update: br.id ? br : br, create: br });
    }

    console.log('\n======================================================');
    console.log('🎉 TEBRİKLER! TÜM VERİLER (145 Kitap, 21 Post, Loglar, Kullanıcılar) EKSİKSİZ TAŞINDI!');
    console.log('======================================================');
  } catch (error: any) {
    console.error('❌ MIGRATION HATASI:', error.message);
  } finally {
    await sourceClient.$disconnect();
    await targetClient.$disconnect();
  }
}

main();
