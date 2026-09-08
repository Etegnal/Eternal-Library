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

    const responseHeaders = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    };

    if (books.length > 0) {
      return NextResponse.json({ books }, { headers: responseHeaders });
    }

    const lightVerified = verifiedBooksData.map(({ fullPages, ...rest }) => rest);
    return NextResponse.json({ books: lightVerified }, { headers: responseHeaders });
  } catch (error) {
    const lightVerified = verifiedBooksData.map(({ fullPages, ...rest }) => rest);
    return NextResponse.json({ books: lightVerified });
  }
}
