import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json({ likes: updatedPost.likes });
  } catch (error) {
    return NextResponse.json({ error: 'Beğeni eklenemedi' }, { status: 500 });
  }
}
