import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { defaultPlaylist } from '@/lib/playlist';

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (tracks.length === 0) {
      return NextResponse.json(defaultPlaylist);
    }

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching public tracks:', error);
    return NextResponse.json(defaultPlaylist);
  }
}
