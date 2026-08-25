import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, content, type } = body;

    if (!name || !email || !subject || !content) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları doldurun.' },
        { status: 400 }
      );
    }

    const newLetter = await prisma.letter.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        content: content.trim(),
        type: type === 'ESER' ? 'ESER' : 'MEKTUP',
      },
    });

    return NextResponse.json(
      {
        message: 'Mektubunuz/eseriniz kütüphanecimize ulaştırıldı.',
        letter: newLetter,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Mektup gönderme hatası:', error);
    return NextResponse.json(
      { error: 'Mektup gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
