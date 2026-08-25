import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all master poets
export async function GET() {
  try {
    const poets = await prisma.masterPoet.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(poets);
  } catch (error) {
    console.error('Error fetching master poets:', error);
    return NextResponse.json({ error: 'Üstat kalemler yüklenemedi.' }, { status: 500 });
  }
}

// POST new master poet
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { author, title, excerpt, year } = body;

    if (!author || !title || !excerpt) {
      return NextResponse.json({ error: 'Lütfen şair adı, başlık ve şiir mısralarını doldurun.' }, { status: 400 });
    }

    const newPoet = await prisma.masterPoet.create({
      data: {
        author: author.trim(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        year: year ? year.trim() : null,
      },
    });

    return NextResponse.json(newPoet, { status: 201 });
  } catch (error) {
    console.error('Error creating master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
