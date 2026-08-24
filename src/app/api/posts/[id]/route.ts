import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    await prisma.post.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Yazı başarıyla silindi' });
  } catch (error) {
    return NextResponse.json({ error: 'Silme işlemi başarısız' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, type, coverImage, readingTime, publishedAt, isFeatured } = body;

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt,
        type,
        coverImage,
        readingTime,
        isFeatured,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme işlemi başarısız' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme işlemi başarısız' }, { status: 500 });
  }
}
