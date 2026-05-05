import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectCreateSchema } from '@/lib/validators';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      userId,
      title: parsed.data.title,
      description: parsed.data.description,
      worldData: JSON.parse(JSON.stringify(parsed.data.worldData)),
      isPublic: parsed.data.isPublic,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
