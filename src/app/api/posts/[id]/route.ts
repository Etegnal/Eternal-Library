import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/slug';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim! Yalnızca yöneticiler bu işlemi yapabilir.' }, { status: 401 });
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

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim! Yalnızca yöneticiler bu işlemi yapabilir.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, type, author, coverImage, readingTime, publishedAt, isFeatured } = body;

    const cleanSlug = slugify(slug || title);

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        slug: cleanSlug,
        content,
        excerpt,
        type,
        author: author !== undefined ? author : undefined,
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

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim! Yalnızca yöneticiler bu işlemi yapabilir.' }, { status: 401 });
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
