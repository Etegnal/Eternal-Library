import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ liked: false });
  }

  const userId = (session.user as any).id;
  if (!userId) {
    return NextResponse.json({ liked: false });
  }

  const existingLike = await prisma.likeRecord.findUnique({
    where: {
      userId_postId: {
        userId,
        postId: params.id,
      },
    },
  });

  return NextResponse.json({ liked: !!existingLike });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Beğenmek için lütfen giriş yapın.' },
      { status: 401 }
    );
  }

  const userId = (session.user as any).id;
  if (!userId) {
    return NextResponse.json(
      { error: 'Kullanıcı kimliği doğrulanamadı.' },
      { status: 401 }
    );
  }

  try {
    const existingLike = await prisma.likeRecord.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.id,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: 'Bu içeriği zaten beğendiniz.' },
        { status: 400 }
      );
    }

    // Create LikeRecord & Increment Post likes
    await prisma.likeRecord.create({
      data: {
        userId,
        postId: params.id,
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, liked: true, likes: updatedPost.likes });
  } catch (error) {
    console.error('Like API Error:', error);
    return NextResponse.json({ error: 'Beğeni işlemi sırasında bir hata oluştu.' }, { status: 500 });
  }
}
