import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    console.error('API Book Detail Error:', error);
    return NextResponse.json({ error: 'Kitap detayları getirilemedi' }, { status: 500 });
  }
}
