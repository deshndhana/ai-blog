import { NextResponse } from 'next/server';
import { deleteArticle } from '@/lib/api';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const success = await deleteArticle(id);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Article not found' }, { status: 404 });
}
