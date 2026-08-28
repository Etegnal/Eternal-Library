import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    // 1. Fetch recent view records
    const recentLogs = await prisma.viewRecord.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            author: true,
          },
        },
      },
    });

    // 2. Fetch stats totals
    const totalViews = await prisma.viewRecord.count();
    const memberViewsCount = await prisma.viewRecord.count({
      where: { userId: { not: null } },
    });
    const guestViewsCount = await prisma.viewRecord.count({
      where: { userId: null },
    });

    // 3. User reading breakdown stats
    const userReadingStats = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            viewRecords: true,
            likeRecords: true,
            savedBooks: true,
          },
        },
      },
      orderBy: {
        viewRecords: {
          _count: 'desc',
        },
      },
      take: 20,
    });

    return NextResponse.json({
      totalViews,
      memberViewsCount,
      guestViewsCount,
      recentLogs,
      userReadingStats,
    });
  } catch (error: any) {
    console.error('Error fetching admin reading logs:', error);
    return NextResponse.json({ error: 'Okuma günlükleri yüklenemedi' }, { status: 500 });
  }
}
