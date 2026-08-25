import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT update master poet
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { author, title, excerpt, content, year } = body;

    const existingPoet = await prisma.masterPoet.findUnique({ where: { id } });
    if (!existingPoet) {
      return NextResponse.json({ error: 'Kayıt bulunamadı.' }, { status: 404 });
    }

    const fullContent = content && content.trim().length > 0 ? content.trim() : excerpt ? excerpt.trim() : existingPoet.content;

    const updatedPoet = await prisma.masterPoet.update({
      where: { id },
      data: {
        author: author ? author.trim() : undefined,
        title: title ? title.trim() : undefined,
        excerpt: excerpt ? excerpt.trim() : undefined,
        content: fullContent,
        year: year !== undefined ? (year ? year.trim() : null) : undefined,
      },
    });

    // Sync with corresponding Post if present
    if (existingPoet.slug) {
      const existingPost = await prisma.post.findUnique({ where: { slug: existingPoet.slug } });
      if (existingPost) {
        await prisma.post.update({
          where: { id: existingPost.id },
          data: {
            title: title ? title.trim() : undefined,
            excerpt: excerpt ? excerpt.trim() : undefined,
            content: fullContent,
            author: author ? author.trim() : undefined,
          },
        });
      }
    }

    return NextResponse.json(updatedPoet);
  } catch (error) {
    console.error('Error updating master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem güncellenirken hata oluştu.' }, { status: 500 });
  }
}

// DELETE master poet
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const existingPoet = await prisma.masterPoet.findUnique({ where: { id } });
    
    if (existingPoet && existingPoet.slug) {
      await prisma.post.deleteMany({
        where: { slug: existingPoet.slug },
      });
    }

    await prisma.masterPoet.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Üstat kalem silindi.' });
  } catch (error) {
    console.error('Error deleting master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem silinirken hata oluştu.' }, { status: 500 });
  }
}
