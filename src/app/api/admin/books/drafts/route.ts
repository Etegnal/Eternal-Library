import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/books/drafts -> fetch all unpublished draft books
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const drafts = await prisma.book.findMany({
      where: { isPublished: false },
      orderBy: { title: 'asc' },
    });

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error('Error fetching draft books:', error);
    return NextResponse.json({ error: 'Taslaklar alınamadı' }, { status: 500 });
  }
}

// POST /api/admin/books/drafts -> publish a single draft or all drafts
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, id } = body;

    if (action === 'publish_all') {
      await prisma.book.updateMany({
        where: { isPublished: false },
        data: { isPublished: true },
      });
      return NextResponse.json({
        success: true,
        message: 'Tüm Zaman Çarkı serisi ve taslak eserler canlıda başarıyla yayınlandı!',
      });
    }

    if (action === 'publish' && id) {
      const updated = await prisma.book.update({
        where: { id },
        data: { isPublished: true },
      });
      return NextResponse.json({
        success: true,
        message: `"${updated.title}" eser başarıyla canlıya alındı!`,
        book: updated,
      });
    }

    return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
  } catch (error: any) {
    console.error('Error publishing draft books:', error);
    return NextResponse.json({ error: 'Yayınlama sırasında hata oluştu' }, { status: 500 });
  }
}
