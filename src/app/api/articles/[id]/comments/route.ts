import { NextResponse } from 'next/server';
import { db, isConfigured } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!isConfigured || !db) {
    return NextResponse.json([]);
  }

  try {
    const commentsRef = collection(db, 'articles', id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!isConfigured || !db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { author, text } = await request.json();
    const commentsRef = collection(db, 'articles', id, 'comments');
    
    const newComment = {
      author,
      text,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(commentsRef, newComment);
    
    return NextResponse.json({ id: docRef.id, ...newComment });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
