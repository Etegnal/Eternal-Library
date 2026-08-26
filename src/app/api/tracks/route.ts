import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching public tracks:', error);
    return NextResponse.json([]);
  }
}
