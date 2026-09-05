import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { extractAnalyticsFromRequest } from '@/lib/analytics';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Read optional fingerprint from body if JSON payload provided
    let bodyFingerprint: string | undefined = undefined;
    try {
      const body = await req.json();
      if (body && typeof body.fingerprint === 'string') {
        bodyFingerprint = body.fingerprint;
      }
    } catch {
      // Body might be empty
    }

    // Extract rich analytics from request headers & geolocation
    const analytics = extractAnalyticsFromRequest(req, bodyFingerprint);

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

    // Atomic DB view count increment + Enriched ViewRecord creation
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

          // Enriched Tracking Metadata
          ipAddress: analytics.ipAddress,
          city: analytics.city,
          country: analytics.country,
          deviceType: analytics.deviceType,
          browser: analytics.browser,
          os: analytics.os,
          referrer: analytics.referrer,
          fingerprint: analytics.fingerprint,
        },
      }),
    ]);

    return NextResponse.json({ views: updatedPost.views });
  } catch (error: any) {
    console.error('View tracking error:', error);
    return NextResponse.json({ error: 'Görüntüleme güncellenemedi' }, { status: 500 });
  }
}
