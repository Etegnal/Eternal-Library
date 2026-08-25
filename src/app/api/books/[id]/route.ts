import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAffiliateLinks } from '@/lib/books';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: {
        affiliateClicks: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı' }, { status: 404 });
    }

    const affiliateLinks = generateAffiliateLinks(book);

    return NextResponse.json({
      book,
      affiliateLinks,
    });
  } catch (error) {
    console.error('API Book Detail Error:', error);
    return NextResponse.json({ error: 'Kitap detayları getirilemedi' }, { status: 500 });
  }
}
