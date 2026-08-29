import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, currentPassword, newPassword, image } = body;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    const updateData: any = {};

    if (name && name.trim()) {
      updateData.name = name.trim();
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (email && email.trim() && email.trim().toLowerCase() !== currentUser.email) {
      const targetEmail = email.trim().toLowerCase();
      const existing = await prisma.user.findUnique({
        where: { email: targetEmail },
      });
      if (existing) {
        return NextResponse.json({ error: 'Bu e-posta adresi başka bir hesap tarafından kullanılıyor' }, { status: 400 });
      }
      updateData.email = targetEmail;
    }

    if (newPassword && newPassword.trim().length > 0) {
      if (newPassword.trim().length < 6) {
        return NextResponse.json({ error: 'Yeni şifre en az 6 karakter olmalıdır' }, { status: 400 });
      }

      if (currentUser.password) {
        if (!currentPassword) {
          return NextResponse.json({ error: 'Şifrenizi değiştirmek için mevcut şifrenizi girin' }, { status: 400 });
        }
        const isValid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isValid) {
          return NextResponse.json({ error: 'Mevcut şifreniz hatalı' }, { status: 400 });
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: 'Profil bilgileriniz başarıyla güncellendi',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Profil güncellenirken bir hata oluştu' }, { status: 500 });
  }
}
