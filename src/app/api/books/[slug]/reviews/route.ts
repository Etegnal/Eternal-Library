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

// GET /api/books/[slug]/reviews -> returns all reviews for a book
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const book = await findTargetBook(params.slug);
    if (!book) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = await prisma.bookReview.findMany({
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

    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      user: {
        id: r.user.id,
        name: r.user.name || r.user.email.split('@')[0],
        image: r.user.image,
      },
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error: any) {
    console.error('Error fetching book reviews:', error);
    return NextResponse.json(
      { error: 'Yorumlar alınamadı.' },
      { status: 500 }
    );
  }
}

// POST /api/books/[slug]/reviews -> create a new review for current user
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'İnceleme veya yorum yazabilmek için lütfen giriş yapın.' },
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

    const body = await req.json();
    const { rating = 5, comment } = body;

    if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir yorum metni yazın.' },
        { status: 400 }
      );
    }

    const numericRating = Math.max(1, Math.min(5, Number(rating) || 5));

    const newReview = await prisma.bookReview.create({
      data: {
        bookId: book.id,
        userId: currentUser.id,
        rating: numericRating,
        comment: comment.trim(),
      },
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
    });

    return NextResponse.json({
      success: true,
      message: 'İncelemeniz başarıyla yayınlandı!',
      review: {
        id: newReview.id,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: newReview.createdAt.toISOString(),
        user: {
          id: newReview.user.id,
          name: newReview.user.name || newReview.user.email.split('@')[0],
          image: newReview.user.image,
        },
      },
    });
  } catch (error: any) {
    console.error('Error submitting book review:', error);
    return NextResponse.json(
      { error: 'Yorum kaydedilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
