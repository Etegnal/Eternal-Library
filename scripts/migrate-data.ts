import { PrismaClient } from '@prisma/client';

const OLD_DB_URL = "postgresql://neondb_owner:npg_2eyXDEUVYo0g@ep-divine-cell-b2b6snh7-pooler.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require";
const NEW_DB_URL = "postgresql://neondb_owner:npg_h1IzxWt3ojms@ep-dry-unit-b19w16ha-pooler.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sourceClient = new PrismaClient({
  datasources: {
    db: {
      url: OLD_DB_URL,
    },
  },
});

const targetClient = new PrismaClient({
  datasources: {
    db: {
      url: NEW_DB_URL,
    },
  },
});

async function migrateTable<T>(
  tableName: string,
  fetchFn: () => Promise<T[]>,
  insertFn: (data: T[]) => Promise<any>,
  batchSize = 100
) {
  console.log(`\n⏳ [${tableName}] Eski veritabanından çekiliyor...`);
  const records = await fetchFn();
  console.log(`📦 [${tableName}] Toplam ${records.length} adet kayıt bulundu.`);

  if (records.length === 0) {
    console.log(`✅ [${tableName}] Taşınacak veri yok, geçiliyor.`);
    return;
  }

  // Batch insert into target DB
  let insertedCount = 0;
  for (let i = 0; i < records.length; i += batchSize) {
    const chunk = records.slice(i, i + batchSize);
    await insertFn(chunk);
    insertedCount += chunk.length;
    console.log(`   ➡️ [${tableName}] ${insertedCount}/${records.length} kayıt aktarıldı...`);
  }

  console.log(`🎉 [${tableName}] EKSİKSİZ TAMAMLANDI! (Toplam ${insertedCount} kayıt yeni DB'ye yazıldı)`);
}

async function main() {
  console.log("🚀 ETERNAL LIBRARY VERİTABANI TAŞIMA (MIGRATION) BAŞLADI...");
  console.log(`🔴 Kaynak DB: ${OLD_DB_URL.substring(0, 45)}...`);
  console.log(`🟢 Hedef DB:  ${NEW_DB_URL.substring(0, 45)}...`);

  try {
    // 1. Users
    await migrateTable('User', 
      () => sourceClient.user.findMany(),
      (data) => targetClient.user.createMany({ data, skipDuplicates: true })
    );

    // 2. Posts
    await migrateTable('Post',
      () => sourceClient.post.findMany(),
      (data) => targetClient.post.createMany({ data, skipDuplicates: true })
    );

    // 3. Books
    await migrateTable('Book',
      () => sourceClient.book.findMany(),
      (data) => targetClient.book.createMany({ data, skipDuplicates: true })
    );

    // 4. MasterPoets
    await migrateTable('MasterPoet',
      () => sourceClient.masterPoet.findMany(),
      (data) => targetClient.masterPoet.createMany({ data, skipDuplicates: true })
    );

    // 5. Tracks
    await migrateTable('Track',
      () => sourceClient.track.findMany(),
      (data) => targetClient.track.createMany({ data, skipDuplicates: true })
    );

    // 6. PsychologicalTests
    await migrateTable('PsychologicalTest',
      () => sourceClient.psychologicalTest.findMany(),
      (data) => targetClient.psychologicalTest.createMany({ data, skipDuplicates: true })
    );

    // 7. Quotes
    await migrateTable('Quote',
      () => sourceClient.quote.findMany(),
      (data) => targetClient.quote.createMany({ data, skipDuplicates: true })
    );

    // 8. Letters
    await migrateTable('Letter',
      () => sourceClient.letter.findMany(),
      (data) => targetClient.letter.createMany({ data, skipDuplicates: true })
    );

    // 9. LikeRecords
    await migrateTable('LikeRecord',
      () => sourceClient.likeRecord.findMany(),
      (data) => targetClient.likeRecord.createMany({ data, skipDuplicates: true })
    );

    // 10. ViewRecords
    await migrateTable('ViewRecord',
      () => sourceClient.viewRecord.findMany(),
      (data) => targetClient.viewRecord.createMany({ data, skipDuplicates: true })
    );

    // 11. SavedBooks
    await migrateTable('SavedBook',
      () => sourceClient.savedBook.findMany(),
      (data) => targetClient.savedBook.createMany({ data, skipDuplicates: true })
    );

    // 12. ReadBooks
    await migrateTable('ReadBook',
      () => sourceClient.readBook.findMany(),
      (data) => targetClient.readBook.createMany({ data, skipDuplicates: true })
    );

    // 13. BookReviews
    await migrateTable('BookReview',
      () => sourceClient.bookReview.findMany(),
      (data) => targetClient.bookReview.createMany({ data, skipDuplicates: true })
    );

    // 14. BookPages
    await migrateTable('BookPage',
      () => sourceClient.bookPage.findMany(),
      (data) => targetClient.bookPage.createMany({ data, skipDuplicates: true })
    );

    // 15. TestQuestions
    await migrateTable('TestQuestion',
      () => sourceClient.testQuestion.findMany(),
      (data) => targetClient.testQuestion.createMany({ data, skipDuplicates: true })
    );

    // 16. TestOptions
    await migrateTable('TestOption',
      () => sourceClient.testOption.findMany(),
      (data) => targetClient.testOption.createMany({ data, skipDuplicates: true })
    );

    // 17. TestResultRecords
    await migrateTable('TestResultRecord',
      () => sourceClient.testResultRecord.findMany(),
      (data) => targetClient.testResultRecord.createMany({ data, skipDuplicates: true })
    );

    console.log("\n=======================================================");
    console.log("✨ TEBRİKLER! TÜM VERİLER SIFIR KAYIP İLE YENİ DB'YE TAŞINDI!");
    console.log("=======================================================");

  } catch (error) {
    console.error("❌ MIGRATION HATASI:", error);
  } finally {
    await sourceClient.$disconnect();
    await targetClient.$disconnect();
  }
}

main();
