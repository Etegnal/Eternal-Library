import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT update master poet
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { author, title, excerpt, year } = body;

    const updatedPoet = await prisma.masterPoet.update({
      where: { id },
      data: {
        author: author ? author.trim() : undefined,
        title: title ? title.trim() : undefined,
        excerpt: excerpt ? excerpt.trim() : undefined,
        year: year !== undefined ? (year ? year.trim() : null) : undefined,
      },
    });

    return NextResponse.json(updatedPoet);
  } catch (error) {
    console.error('Error updating master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem güncellenirken hata oluştu.' }, { status: 500 });
  }
}

// DELETE master poet
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.masterPoet.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Üstat kalem silindi.' });
  } catch (error) {
    console.error('Error deleting master poet:', error);
    return NextResponse.json({ error: 'Üstat kalem silinirken hata oluştu.' }, { status: 500 });
  }
}
