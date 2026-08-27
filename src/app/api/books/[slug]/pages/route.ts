import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifiedBooksData } from '@/lib/verifiedBooks';
import { chunkTextIntoPages } from '@/lib/pageChunker';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Find book in DB
    const book = await prisma.book.findUnique({
      where: { slug },
      include: {
        bookPages: {
          orderBy: { pageNumber: 'asc' },
        },
      },
    });

    if (book && book.bookPages.length > 0) {
      return NextResponse.json(book.bookPages);
    }

    // Fallback to verifiedBooksData in-memory data
    const verified = verifiedBooksData.find((b) => b.slug === slug);
    if (verified && verified.fullPages) {
      const formattedPages = verified.fullPages.map((content, idx) => ({
        pageNumber: idx + 1,
        content,
      }));
      return NextResponse.json(formattedPages);
    }

    // Auto-chunk summary into pages if no dedicated bookPages exist
    if (book && book.summary) {
      const chunks = chunkTextIntoPages(book.summary);
      const generatedPages = chunks.map((content, idx) => ({
        pageNumber: idx + 1,
        content,
      }));
      return NextResponse.json(generatedPages);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
