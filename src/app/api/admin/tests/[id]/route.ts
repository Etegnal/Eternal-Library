import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: { id: params.id },
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

    if (!test) {
      return NextResponse.json({ error: 'Test bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json({ error: 'Test getirilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, coverImage, category, questions } = body;

    const existingTest = await prisma.psychologicalTest.findUnique({ where: { id: params.id } });
    if (!existingTest) {
      return NextResponse.json({ error: 'Test bulunamadı.' }, { status: 404 });
    }

    let slug = existingTest.slug;
    if (title && title !== existingTest.title) {
      slug = slugify(title);
      const duplicate = await prisma.psychologicalTest.findFirst({
        where: { slug, NOT: { id: params.id } },
      });
      if (duplicate) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    // Use transaction to update test info and replace questions/options
    const updatedTest = await prisma.$transaction(async (tx) => {
      // Delete old questions (cascade will delete options)
      await tx.testQuestion.deleteMany({ where: { testId: params.id } });

      return await tx.psychologicalTest.update({
        where: { id: params.id },
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
    });

    return NextResponse.json(updatedTest);
  } catch (error) {
    console.error('Error updating test:', error);
    return NextResponse.json({ error: 'Test güncellenirken hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    await prisma.psychologicalTest.delete({ where: { id: params.id } });

    return NextResponse.json({ message: 'Test başarıyla silindi.' });
  } catch (error) {
    console.error('Error deleting test:', error);
    return NextResponse.json({ error: 'Test silinirken hata oluştu.' }, { status: 500 });
  }
}
