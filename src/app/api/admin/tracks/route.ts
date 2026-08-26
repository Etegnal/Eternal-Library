import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET all tracks
export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching admin tracks:', error);
    return NextResponse.json([]);
  }
}

// POST new track
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, artist, src, cover, spotifyUrl, order } = body;

    if (!title || !artist || !src) {
      return NextResponse.json({ error: 'Lütfen şarkı adı, sanatçı ve ses dosya yolunu (MP3 URL) doldurun.' }, { status: 400 });
    }

    let parsedOrder = 0;
    if (order !== undefined && order !== null && String(order).trim() !== '') {
      parsedOrder = parseInt(String(order), 10) || 0;
    } else {
      const maxTrack = await prisma.track.findFirst({
        orderBy: { order: 'desc' },
      });
      parsedOrder = maxTrack ? maxTrack.order + 1 : 1;
    }

    const newTrack = await prisma.track.create({
      data: {
        title: title.trim(),
        artist: artist.trim(),
        src: src.trim(),
        cover: cover && cover.trim() ? cover.trim() : null,
        spotifyUrl: spotifyUrl && spotifyUrl.trim() ? spotifyUrl.trim() : 'https://open.spotify.com',
        order: parsedOrder,
      },
    });

    return NextResponse.json(newTrack, { status: 201 });
  } catch (error) {
    console.error('Error creating track:', error);
    return NextResponse.json({ error: 'Şarkı eklenirken hata oluştu.' }, { status: 500 });
  }
}
