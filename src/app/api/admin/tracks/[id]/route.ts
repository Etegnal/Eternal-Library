import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT update track
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { title, artist, src, cover, spotifyUrl, order } = body;

    const existingTrack = await prisma.track.findUnique({ where: { id } });
    if (!existingTrack) {
      return NextResponse.json({ error: 'Şarkı bulunamadı.' }, { status: 404 });
    }

    let parsedOrder = existingTrack.order;
    if (order !== undefined && order !== null && String(order).trim() !== '') {
      parsedOrder = parseInt(String(order), 10) || 0;
    }

    const updatedTrack = await prisma.track.update({
      where: { id },
      data: {
        title: title ? title.trim() : undefined,
        artist: artist ? artist.trim() : undefined,
        src: src ? src.trim() : undefined,
        cover: cover !== undefined ? (cover ? cover.trim() : null) : undefined,
        spotifyUrl: spotifyUrl !== undefined ? (spotifyUrl ? spotifyUrl.trim() : 'https://open.spotify.com') : undefined,
        order: parsedOrder,
      },
    });

    return NextResponse.json(updatedTrack);
  } catch (error) {
    console.error('Error updating track:', error);
    return NextResponse.json({ error: 'Şarkı güncellenirken hata oluştu.' }, { status: 500 });
  }
}

// DELETE track
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz işlem.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.track.delete({ where: { id } });
    return NextResponse.json({ message: 'Şarkı silindi.' });
  } catch (error) {
    console.error('Error deleting track:', error);
    return NextResponse.json({ error: 'Şarkı silinirken hata oluştu.' }, { status: 500 });
  }
}
