import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const tests = await prisma.psychologicalTest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            options: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    return NextResponse.json(tests);
  } catch (error) {
    console.error('Admin tests fetch error:', error);
    return NextResponse.json({ error: 'Testler alınırken hata oluştu.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, coverImage, category, questions } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Başlık ve açıklama zorunludur.' }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await prisma.psychologicalTest.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const createdTest = await prisma.psychologicalTest.create({
      data: {
        title,
        slug,
        description,
        coverImage: coverImage || null,
        category: category || 'Psikolojik Test',
        questions: {
          create: (questions || []).map((q: any, qIdx: number) => ({
            questionText: q.questionText,
            order: qIdx,
            options: {
              create: (q.options || []).map((opt: any, optIdx: number) => ({
                optionText: opt.optionText,
                metaphorExplanation: opt.metaphorExplanation || '',
                order: optIdx,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(createdTest, { status: 201 });
  } catch (error) {
    console.error('Admin test creation error:', error);
    return NextResponse.json({ error: 'Test oluşturulurken hata oluştu.' }, { status: 500 });
  }
}
