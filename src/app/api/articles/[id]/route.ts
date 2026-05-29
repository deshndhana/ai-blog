import { NextResponse } from 'next/server';
import { deleteArticle, updateArticle } from '@/lib/api';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const success = await deleteArticle(id);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Article not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const updates = await request.json();
  const success = await updateArticle(id, updates);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Failed to update article' }, { status: 400 });
}
