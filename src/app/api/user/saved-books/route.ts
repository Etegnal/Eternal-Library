import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/user/saved-books -> returns saved books for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ savedBooks: [], savedBookIds: [] });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ savedBooks: [], savedBookIds: [] });
    }

    const records = await prisma.savedBook.findMany({
      where: { userId: user.id },
      include: {
        book: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const savedBooks = records.map((r) => r.book);
    const savedBookIds = records.map((r) => r.bookId);
    const savedBookSlugs = records.map((r) => r.book.slug);

    return NextResponse.json({
      savedBooks,
      savedBookIds,
      savedBookSlugs,
    });
  } catch (error: any) {
    console.error('Error fetching saved books:', error);
    return NextResponse.json({ error: 'Kaydedilen kitaplar alınamadı' }, { status: 500 });
  }
}

// POST /api/user/saved-books -> toggles save/like state for a book
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Kitapları kişisel kütüphanenize kaydetmek için lütfen giriş yapın.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    const body = await req.json();
    const { bookId, bookSlug } = body;

    if (!bookId && !bookSlug) {
      return NextResponse.json({ error: 'Kitap kimliği zorunludur.' }, { status: 400 });
    }

    // Find the target book
    const book = await prisma.book.findFirst({
      where: {
        OR: [
          { id: bookId || undefined },
          { slug: bookSlug || undefined },
        ],
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı.' }, { status: 404 });
    }

    // Check if already saved
    const existing = await prisma.savedBook.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.id,
        },
      },
    });

    if (existing) {
      // Remove from saved
      await prisma.savedBook.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({
        success: true,
        saved: false,
        message: 'Kitap kişisel kütüphanenizden çıkarıldı.',
        bookId: book.id,
        bookSlug: book.slug,
      });
    } else {
      // Add to saved
      await prisma.savedBook.create({
        data: {
          userId: user.id,
          bookId: book.id,
        },
      });
      return NextResponse.json({
        success: true,
        saved: true,
        message: 'Kitap kişisel kütüphanenize kaydedildi.',
        bookId: book.id,
        bookSlug: book.slug,
      });
    }
  } catch (error: any) {
    console.error('Error toggling saved book:', error);
    return NextResponse.json({ error: 'İşlem sırasında bir hata oluştu.' }, { status: 500 });
  }
}
