import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🔍 LOGS AND VIEW TRACKING CHECK...');
  const totalViews = await prisma.viewRecord.count();
  console.log(`Total ViewRecords in DB: ${totalViews}`);

  const recentLogs = await prisma.viewRecord.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  console.log('\n📍 Latest 10 View Records:');
  for (const log of recentLogs) {
    console.log(`- [${log.createdAt.toISOString()}] "${log.postTitle}" | User: ${log.userName} (${log.userEmail}) | Device: ${log.deviceType} (${log.os}/${log.browser}) | IP: ${log.ipAddress || 'n/a'} | Ref: ${log.referrer || 'direct'}`);
  }
}

main().then(() => process.exit(0)).catch(console.error);
