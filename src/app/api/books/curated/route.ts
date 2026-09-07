import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        year: true,
        pages: true,
        category: true,
        summary: true,
        rating: true,
        isReadable: true,
        coverUrl: true,
      },
      orderBy: { year: 'asc' },
    });

    if (books.length > 0) {
      return NextResponse.json({ books });
    }

    const lightVerified = verifiedBooksData.map(({ fullPages, ...rest }) => rest);
    return NextResponse.json({ books: lightVerified });
  } catch (error) {
    const lightVerified = verifiedBooksData.map(({ fullPages, ...rest }) => rest);
    return NextResponse.json({ books: lightVerified });
  }
}
