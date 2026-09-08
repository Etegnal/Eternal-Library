import { prisma } from '../src/lib/prisma';
import { extractAnalyticsFromRequest } from '../src/lib/analytics';
import { NextRequest } from 'next/server';

async function main() {
  console.log('🧪 İNSTAGRAM LOGLAMA SİSTEMİ TESTİ BAŞLATILIYOR...');

  // Create a mock NextRequest simulating an Instagram click from an iPhone in Istanbul
  const req = new NextRequest('https://eternal-library-phi.vercel.app/siirler/sonuna-kadar', {
    method: 'POST',
    headers: {
      'x-forwarded-for': '176.234.12.34',
      'x-vercel-ip-city': 'Istanbul',
      'x-vercel-ip-country': 'TR',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 323.0.0.18.109',
      'referer': 'https://l.instagram.com/',
    },
  });

  const analytics = extractAnalyticsFromRequest(req);
  console.log('📊 Ayrıştırılan Analitik Metadataları:', analytics);

  // Find first post
  const firstPost = await prisma.post.findFirst();
  if (!firstPost) {
    console.log('Post bulunamadı');
    return;
  }

  // Create test log entry in database
  const createdLog = await prisma.viewRecord.create({
    data: {
      postId: firstPost.id,
      postTitle: firstPost.title,
      postType: firstPost.type,
      userName: 'Misafir Okuyucu',
      userEmail: 'Misafir Oturumu',
      ipAddress: analytics.ipAddress,
      city: analytics.city,
      country: analytics.country,
      deviceType: analytics.deviceType,
      browser: analytics.browser,
      os: analytics.os,
      referrer: analytics.referrer,
      fingerprint: 'test_hash_123',
    },
  });

  console.log('\n✅ TEST LOGU BAŞARIYLA VERİTABANINA YAZILDI:', {
    id: createdLog.id,
    post: createdLog.postTitle,
    konum: `${createdLog.city}, ${createdLog.country}`,
    cihaz: `${createdLog.deviceType} (${createdLog.os} / ${createdLog.browser})`,
    kaynak: createdLog.referrer,
    tarih: createdLog.createdAt.toISOString(),
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
