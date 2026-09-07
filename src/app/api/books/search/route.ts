import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim().toLowerCase() || '';

    const dbBooks = await prisma.book.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { author: { contains: query, mode: 'insensitive' } },
              { summary: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
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

    if (dbBooks.length > 0) {
      return NextResponse.json(dbBooks);
    }

    const filtered = verifiedBooksData
      .filter((b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.summary.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
      )
      .map(({ fullPages, ...rest }) => rest);

    return NextResponse.json(filtered);
  } catch (error) {
    const lightVerified = verifiedBooksData.map(({ fullPages, ...rest }) => rest);
    return NextResponse.json(lightVerified);
  }
}
