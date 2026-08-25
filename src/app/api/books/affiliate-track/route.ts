import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookId, platform } = body;

    if (!bookId || !platform) {
      return NextResponse.json({ error: 'Eksik parametre' }, { status: 400 });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    const clickRecord = await prisma.affiliateClick.create({
      data: {
        bookId,
        platform,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true, clickId: clickRecord.id });
  } catch (error) {
    console.error('API Affiliate Track Error:', error);
    return NextResponse.json({ error: 'İstatistik kaydedilemedi' }, { status: 500 });
  }
}
