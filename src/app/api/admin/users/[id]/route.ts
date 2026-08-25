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
        { error: 'Yetkisiz erişim! Yalnızca yöneticiler bu işlemi gerçekleştirebilir.' },
        { status: 403 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Geçersiz kullanıcı ID' },
        { status: 400 }
      );
    }

    // Kendini silmeye çalışan admin engeli
    if ((session.user as any)?.id === id || session.user?.email === (await prisma.user.findUnique({ where: { id } }))?.email) {
      return NextResponse.json(
        { error: 'Kendi yöneticiliğinizi admin panelinden silemezsiniz!' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Kullanıcı silindi.' });
  } catch (error) {
    console.error('Kullanıcı silme hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
