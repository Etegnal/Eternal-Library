import { PrismaClient } from '@prisma/client';

// Direct unpooled URL
const directOldDbUrl = 'postgresql://neondb_owner:npg_h1IzxWt3ojms@ep-dry-unit-b19w16ha.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: directOldDbUrl,
    },
  },
});

async function main() {
  console.log('Testing direct unpooled connection to ep-dry-unit-b19w16ha...');
  try {
    const users = await oldPrisma.user.findMany();
    console.log(`✅ Users found (${users.length}):`, users.map(u => u.email));

    const posts = await oldPrisma.post.findMany();
    console.log(`✅ Posts found (${posts.length}):`, posts.map(p => ({ title: p.title, type: p.type })));

    const books = await oldPrisma.book.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        year: true,
        pages: true,
        category: true,
        summary: true,
        rating: true,
        isReadable: true,
        isPublished: true,
        coverUrl: true,
      }
    });
    console.log(`✅ Books found (${books.length})`);

    const views = await oldPrisma.viewRecord.findMany();
    console.log(`✅ ViewRecords (Loglar) found (${views.length})`);

    const poets = await oldPrisma.masterPoet.findMany();
    console.log(`✅ MasterPoets found (${poets.length})`);

  } catch (err: any) {
    console.error('Direct connection error:', err.message);
  }
}

main().then(() => process.exit(0)).catch(console.error);
