import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim.' },
        { status: 403 }
      );
    }

    const { id } = params;

    await prisma.letter.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Mektup silindi.' });
  } catch (error) {
    console.error('Mektup silme hatası:', error);
    return NextResponse.json(
      { error: 'Mektup silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim.' },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const updated = await prisma.letter.update({
      where: { id },
      data: { isRead: body.isRead },
    });

    return NextResponse.json({ success: true, letter: updated });
  } catch (error) {
    console.error('Mektup güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
}
