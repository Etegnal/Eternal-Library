import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBookDetails, generateStoreLinks } from '@/lib/books';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    let book = await prisma.book.findFirst({
      where: {
        OR: [
          { id: id },
          { googleBookId: id },
        ],
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı' }, { status: 404 });
    }

    // If description is missing or default, attempt to fetch deep details from Open Library
    if (!book.description || book.description.includes('henüz eklenmemiştir')) {
      const workKey = book.googleBookId ? `/works/${book.googleBookId}` : null;
      if (workKey) {
        const deepDescription = await getBookDetails(workKey);
        if (deepDescription && !deepDescription.includes('henüz eklenmemiştir')) {
          book = await prisma.book.update({
            where: { id: book.id },
            data: { description: deepDescription },
          });
        }
      }
    }

    const storeLinks = generateStoreLinks(book);

    return NextResponse.json({
      book,
      storeLinks,
    });
  } catch (error) {
    console.error('API Book Detail Error:', error);
    return NextResponse.json({ error: 'Kitap detayları getirilemedi' }, { status: 500 });
  }
}
