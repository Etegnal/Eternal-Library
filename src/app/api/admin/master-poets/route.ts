import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/slug';

// GET all master poets sorted by order ascending then createdAt descending
export async function GET() {
  try {
    const poets = await prisma.masterPoet.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
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
    const { author, title, excerpt, content, year, order } = body;

    if (!author || !title || !excerpt) {
      return NextResponse.json({ error: 'Lütfen şair adı, başlık ve mısraları doldurun.' }, { status: 400 });
    }

    const fullContent = content && content.trim().length > 0 ? content.trim() : excerpt.trim();
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Determine order: If user entered an order, parse it.
    // If not entered, place at top by giving it (minOrder - 1) or 0
    let finalOrder = 0;
    if (order !== undefined && order !== null && String(order).trim() !== '') {
      finalOrder = parseInt(String(order), 10) || 0;
    } else {
      const minPoet = await prisma.masterPoet.findFirst({
        orderBy: { order: 'asc' },
      });
      finalOrder = minPoet ? minPoet.order - 1 : 1;
    }

    // 1. Create MasterPoet entry
    const newPoet = await prisma.masterPoet.create({
      data: {
        author: author.trim(),
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content: fullContent,
        year: year ? year.trim() : null,
        order: finalOrder,
      },
    });

    // 2. Create corresponding Post entry so it can be opened at /siirler/[slug]
    await prisma.post.create({
      data: {
        title: title.trim(),
        slug,
        content: fullContent,
        excerpt: excerpt.trim(),
        type: 'SIIR',
        author: author.trim(),
        isFeatured: true,
      },
    });

    return NextResponse.json(newPoet, { status: 201 });
  } catch (error) {
    console.error('Error creating master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
