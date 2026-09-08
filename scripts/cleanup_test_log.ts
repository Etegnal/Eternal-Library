import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.viewRecord.deleteMany({
    where: {
      fingerprint: 'test_hash_123',
    },
  });
  console.log('Cleaned up test log');
}

main().catch(console.error);
