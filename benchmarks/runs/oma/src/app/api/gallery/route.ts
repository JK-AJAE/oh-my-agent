import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  const entries = await prisma.galleryEntry.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: 'desc' },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
          worldData: true,
          user: { select: { name: true, avatar: true } },
        },
      },
    },
  });

  return NextResponse.json(entries);
}
