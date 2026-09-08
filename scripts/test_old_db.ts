import { PrismaClient } from '@prisma/client';

const oldDbUrl = 'postgresql://neondb_owner:npg_h1IzxWt3ojms@ep-dry-unit-b19w16ha-pooler.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: oldDbUrl,
    },
  },
});

async function main() {
  console.log('Testing previous Neon DB (ep-dry-unit-b19w16ha)...');
  try {
    const userCount = await prisma.user.count();
    const bookCount = await prisma.book.count();
    const postCount = await prisma.post.count();
    const poetCount = await prisma.masterPoet.count();
    const viewCount = await prisma.viewRecord.count();
    const pageCount = await prisma.bookPage.count();

    console.log('📊 EP-DRY-UNIT DATABASE STATS:');
    console.log(`- Users: ${userCount}`);
    console.log(`- Books: ${bookCount}`);
    console.log(`- BookPages: ${pageCount}`);
    console.log(`- Posts (Yazılar & Şiirler): ${postCount}`);
    console.log(`- MasterPoets: ${poetCount}`);
    console.log(`- ViewRecords (Loglar): ${viewCount}`);
  } catch (err: any) {
    console.error('Failed to query ep-dry-unit DB:', err.message);
  }
}

main().then(() => process.exit(0)).catch(console.error);
