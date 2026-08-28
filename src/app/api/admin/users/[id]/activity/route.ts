import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı ID' }, { status: 400 });
    }

    // 1. Fetch user info
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    // 2. Fetch liked posts & poems
    const likedRecords = await prisma.likeRecord.findMany({
      where: { userId: user.id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            type: true,
            author: true,
            likes: true,
            views: true,
            publishedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    const likedPosts = likedRecords.map((r) => r.post);

    // 3. Fetch saved books
    const savedBookRecords = await prisma.savedBook.findMany({
      where: { userId: user.id },
      include: {
        book: {
          select: {
            id: true,
            slug: true,
            title: true,
            author: true,
            category: true,
            summary: true,
            rating: true,
            pages: true,
            coverUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    const savedBooks = savedBookRecords.map((r) => r.book);

    // 4. Fetch view / reading history
    const viewRecords = await prisma.viewRecord.findMany({
      where: { userId: user.id },
      include: {
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
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      user,
      likedPosts,
      savedBooks,
      viewRecords,
    });
  } catch (error: any) {
    console.error('Error fetching user activity details:', error);
    return NextResponse.json({ error: 'Kullanıcı detayları yüklenemedi' }, { status: 500 });
  }
}
