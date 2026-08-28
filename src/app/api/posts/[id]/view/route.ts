import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Find target post
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 });
    }

    // Check user session
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    let userEmail: string = 'Misafir';
    let userName: string = 'Misafir Okuyucu';

    if (session && session.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        userId = user.id;
        userEmail = user.email;
        userName = user.name || user.email;
      }
    }

    // Atomic DB view count increment + Detailed ViewRecord creation
    const [updatedPost] = await prisma.$transaction([
      prisma.post.update({
        where: { id },
        data: {
          views: { increment: 1 },
        },
      }),
      prisma.viewRecord.create({
        data: {
          postId: post.id,
          userId,
          userEmail,
          userName,
          postTitle: post.title,
          postType: post.type,
        },
      }),
    ]);

    return NextResponse.json({ views: updatedPost.views });
  } catch (error: any) {
    console.error('View tracking error:', error);
    return NextResponse.json({ error: 'Görüntüleme güncellenemedi' }, { status: 500 });
  }
}
