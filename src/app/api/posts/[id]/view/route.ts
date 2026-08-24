import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        views: { increment: 1 },
      },
    });

    return NextResponse.json({ views: updatedPost.views });
  } catch (error) {
    return NextResponse.json({ error: 'Görüntüleme güncellenemedi' }, { status: 500 });
  }
}
