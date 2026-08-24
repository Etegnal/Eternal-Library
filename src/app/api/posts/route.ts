import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, type, coverImage, readingTime, publishedAt } = body;

    if (!title || !slug || !content || !excerpt || !type) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt,
        type, // "YAZI" | "SIIR"
        coverImage: coverImage || null,
        readingTime: readingTime || '3 dk okuma',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error('Post creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Bu slug zaten mevcut' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Yazı oluşturulamadı' }, { status: 500 });
  }
}
