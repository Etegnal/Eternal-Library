import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları doldurun.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Şifre en az 6 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    // E-posta kontrolü
    const existingEmail = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda.' },
        { status: 400 }
      );
    }

    // Kullanıcı adı kontrolü
    const existingName = await prisma.user.findFirst({
      where: { name: trimmedName },
    });

    if (existingName) {
      return NextResponse.json(
        { error: 'Bu kullanıcı adı zaten alınmış.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: 'Kayıt başarıyla tamamlandı.', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kayıt Hatası:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
