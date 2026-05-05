import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { worldStateSchema } from '@/lib/validators';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (body.title) updates.title = body.title;
  if (body.description !== undefined) updates.description = body.description;
  if (body.isPublic !== undefined) updates.isPublic = body.isPublic;
  if (body.worldData) {
    const parsed = worldStateSchema.safeParse(body.worldData);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    updates.worldData = parsed.data;
  }

  const project = await prisma.project.update({
    where: { id },
    data: { ...updates, version: { increment: 1 } },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
