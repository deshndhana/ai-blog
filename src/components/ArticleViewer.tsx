"use client";

import { useState } from 'react';
import type { Article } from '@/lib/api';
import Link from 'next/link';

export default function ArticleViewer({ article }: { article: Article }) {
  const hasSinhala = !!article.contentSinhala;
  // Default to English
  const [lang, setLang] = useState<'si' | 'en'>('en');

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
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{lang === 'si' ? 'සිංහල අනුවාදය' : 'Original Article'}</span>
          </div>
          
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        </div>
      </article>
    </div>
  );
}
