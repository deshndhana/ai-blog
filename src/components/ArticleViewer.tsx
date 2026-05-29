"use client";

import { useState, useEffect } from 'react';
import type { Article } from '@/lib/api';
import Link from 'next/link';

export default function ArticleViewer({ article }: { article: Article }) {
  const hasSinhala = !!article.contentSinhala;
  const [lang, setLang] = useState<'si' | 'en'>('en');
  
  const [likes, setLikes] = useState(article.likes || 0);
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [article.id]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/articles/${article.id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Failed to fetch comments");
    }
  };

  const handleLike = async () => {
    setLikes(prev => prev + 1);
    try {
      await fetch(`/api/articles/${article.id}/like`, { method: 'POST' });
    } catch (e) {
      setLikes(prev => prev - 1);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;
    
    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/articles/${article.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: newCommentAuthor, text: newCommentText })
      });
      if (res.ok) {
        setNewCommentAuthor('');
        setNewCommentText('');
        fetchComments();
      }
    } catch (e) {
      console.error("Failed to post comment");
    }
    setIsSubmittingComment(false);
  };

  const title = lang === 'si' && article.titleSinhala ? article.titleSinhala : article.title;
  const content = lang === 'si' && article.contentSinhala ? article.contentSinhala : article.content;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          &larr; Back to Home
        </Link>
        
        {hasSinhala && (
          <button 
            onClick={() => setLang(lang === 'en' ? 'si' : 'en')}
            className="glass"
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 8l6 6"></path>
              <path d="M4 14l6-6 2-3"></path>
              <path d="M2 5h12"></path>
              <path d="M7 2h1"></path>
              <path d="M22 22l-5-10-5 10"></path>
              <path d="M14 18h6"></path>
            </svg>
            {lang === 'en' ? 'Translate to Sinhala' : 'Read in English'}
          </button>
        )}
      </div>

      <article className="glass" style={{ overflow: 'hidden' }}>
        <img 
          src={article.image} 
          alt={title} 
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderBottom: '1px solid var(--glass-border)' }} 
        />
        <div style={{ padding: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{lang === 'si' ? 'සිංහල අනුවාදය' : 'Original Article'}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
              <button onClick={handleLike} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ❤️ {likes} Likes
              </button>
            </div>
          </div>
          
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        </div>
      </article>

      <section className="glass" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Comments ({comments.length})</h3>
        
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={newCommentAuthor} 
              onChange={e => setNewCommentAuthor(e.target.value)} 
              required 
              style={{ marginBottom: '1rem' }}
            />
            <textarea 
              rows={3} 
              placeholder="Write a comment..." 
              value={newCommentText} 
              onChange={e => setNewCommentText(e.target.value)} 
              required
            ></textarea>
          </div>
          <button type="submit" className="btn" disabled={isSubmittingComment}>
            {isSubmittingComment ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.map((comment: any) => (
            <div key={comment.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{comment.author}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{ margin: 0 }}>{comment.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>
    </div>
  );
}
