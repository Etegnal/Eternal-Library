import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { testId, testTitle, answers } = body;

    if (!testId || !testTitle || !answers) {
      return NextResponse.json({ error: 'Eksik veri gönderildi.' }, { status: 400 });
    }

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
      },
    });

    return NextResponse.json({ success: true, recordId: record.id });
  } catch (error) {
    console.error('Error recording test result:', error);
    return NextResponse.json({ error: 'Test kaydı alınamadı.' }, { status: 500 });
  }
}
