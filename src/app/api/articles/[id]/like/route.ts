import { NextResponse } from 'next/server';
import { likeArticle } from '@/lib/api';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const success = await likeArticle(id);
  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Failed to like article' }, { status: 400 });
}
