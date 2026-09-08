import { PrismaClient } from '@prisma/client';

const originalDbUrl = "postgresql://neondb_owner:npg_2eyXDEUVYo0g@ep-divine-cell-b2b6snh7-pooler.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: originalDbUrl,
    },
  },
});

async function main() {
  console.log('Testing ORIGINAL Neon DB (ep-divine-cell-b2b6snh7)...');
  try {
    const userCount = await prisma.user.count();
    const bookCount = await prisma.book.count();
    const postCount = await prisma.post.count();
    const poetCount = await prisma.masterPoet.count();
    const viewCount = await prisma.viewRecord.count();
    const pageCount = await prisma.bookPage.count();

    console.log('📊 EP-DIVINE-CELL DATABASE STATS:');
    console.log(`- Users: ${userCount}`);
    console.log(`- Books: ${bookCount}`);
    console.log(`- BookPages: ${pageCount}`);
    console.log(`- Posts (Yazılar & Şiirler): ${postCount}`);
    console.log(`- MasterPoets: ${poetCount}`);
    console.log(`- ViewRecords (Loglar): ${viewCount}`);
  } catch (err: any) {
    console.error('Failed to query ep-divine-cell DB:', err.message);
  }
}

main().then(() => process.exit(0)).catch(console.error);
