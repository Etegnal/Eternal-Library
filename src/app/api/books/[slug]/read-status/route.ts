import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function findTargetBook(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  return await prisma.book.findFirst({
    where: {
      OR: [
        { slug: decodedSlug },
        { id: decodedSlug },
      ],
    },
  });
}

// GET /api/books/[slug]/read-status
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const book = await findTargetBook(params.slug);
    if (!book) {
      return NextResponse.json({ isRead: false, readersCount: 0, readers: [] });
    }

    const session = await getServerSession(authOptions);

    let isRead = false;
    if (session && session.user?.email) {
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (currentUser) {
        const readRecord = await prisma.readBook.findUnique({
          where: {
            userId_bookId: {
              userId: currentUser.id,
              bookId: book.id,
            },
          },
        });
        isRead = !!readRecord;
      }
    }

    // Fetch readers list (registered users who marked this book as read)
    const readRecords = await prisma.readBook.findMany({
      where: { bookId: book.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const readers = readRecords
      .map((r) => r.user)
      .filter(Boolean)
      .map((u) => ({
        id: u.id,
        name: u.name || u.email.split('@')[0],
        image: u.image,
      }));

    return NextResponse.json({
      isRead,
      readersCount: readers.length,
      readers,
    });
  } catch (error: any) {
    console.error('Error fetching read status:', error);
    return NextResponse.json(
      { error: 'Okunma bilgisi alınamadı.' },
      { status: 500 }
    );
  }
}

// POST /api/books/[slug]/read-status -> toggle read status for current user
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Kitabı okudum olarak işaretlemek için lütfen giriş yapın.' },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    const book = await findTargetBook(params.slug);
    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı.' }, { status: 404 });
    }

    const existing = await prisma.readBook.findUnique({
      where: {
        userId_bookId: {
          userId: currentUser.id,
          bookId: book.id,
        },
      },
    });

    let isRead = false;
    let message = '';

    if (existing) {
      await prisma.readBook.delete({
        where: { id: existing.id },
      });
      isRead = false;
      message = 'Kitap okunanlar listenizden çıkarıldı.';
    } else {
      await prisma.readBook.create({
        data: {
          userId: currentUser.id,
          bookId: book.id,
        },
      });
      isRead = true;
      message = 'Tebrikler! Kitap okudum olarak işaretlendi.';
    }

    // Refetch readers
    const readRecords = await prisma.readBook.findMany({
      where: { bookId: book.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const readers = readRecords
      .map((r) => r.user)
      .filter(Boolean)
      .map((u) => ({
        id: u.id,
        name: u.name || u.email.split('@')[0],
        image: u.image,
      }));

    return NextResponse.json({
      success: true,
      isRead,
      message,
      readersCount: readers.length,
      readers,
    });
  } catch (error: any) {
    console.error('Error toggling read status:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
}
