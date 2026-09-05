import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { extractAnalyticsFromRequest } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { testId, testTitle, answers, fingerprint } = body;

    if (!testId || !testTitle || !answers) {
      return NextResponse.json({ error: 'Eksik veri gönderildi.' }, { status: 400 });
    }

    const analytics = extractAnalyticsFromRequest(req, fingerprint);

    const userId = (session?.user as any)?.id || null;
    const userEmail = session?.user?.email || null;
    const userName = session?.user?.name || null;

    const record = await prisma.testResultRecord.create({
      data: {
        testId,
        testTitle,
        userId,
        userEmail,
        userName,
        answersJson: JSON.stringify(answers),

        // Enriched Analytics Metadata
        ipAddress: analytics.ipAddress,
        city: analytics.city,
        country: analytics.country,
        deviceType: analytics.deviceType,
        browser: analytics.browser,
        os: analytics.os,
        referrer: analytics.referrer,
        fingerprint: analytics.fingerprint,
      },
    });

    return NextResponse.json({ success: true, recordId: record.id });
  } catch (error) {
    console.error('Error recording test result:', error);
    return NextResponse.json({ error: 'Test kaydı alınamadı.' }, { status: 500 });
  }
}
