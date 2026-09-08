import { PrismaClient } from '@prisma/client';

const db1 = "postgresql://neondb_owner:npg_2eyXDEUVYo0g@ep-divine-cell-b2b6snh7.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require";
const db2 = "postgresql://neondb_owner:npg_h1IzxWt3ojms@ep-dry-unit-b19w16ha.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require";

async function test(url: string, name: string) {
  console.log(`\nTesting raw SQL on ${name}...`);
  const client = new PrismaClient({ datasources: { db: { url } } });
  try {
    const users: any[] = await client.$queryRaw`SELECT id, name, email, role FROM "User" LIMIT 5;`;
    console.log(`SUCCESS on ${name}! Users (${users.length}):`, users);

    const postsCount: any[] = await client.$queryRaw`SELECT COUNT(*) as count FROM "Post";`;
    console.log(`Posts count on ${name}:`, postsCount);

    const booksCount: any[] = await client.$queryRaw`SELECT COUNT(*) as count FROM "Book";`;
    console.log(`Books count on ${name}:`, booksCount);

    const viewsCount: any[] = await client.$queryRaw`SELECT COUNT(*) as count FROM "ViewRecord";`;
    console.log(`ViewRecords count on ${name}:`, viewsCount);
  } catch (err: any) {
    console.error(`FAILED on ${name}:`, err.message);
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  await test(db1, 'ep-divine-cell');
  await test(db2, 'ep-dry-unit');
}

main().then(() => process.exit(0)).catch(console.error);
