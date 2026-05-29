"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/api';

export default function ArticleList({ initialArticles }: { initialArticles: Article[] }) {
  const [search, setSearch] = useState('');

  const filteredArticles = initialArticles.filter(article => {
    const query = search.toLowerCase();
    const titleMatch = article.title.toLowerCase().includes(query);
    return titleMatch;
  });

  return (
    <>
      <div className="search-container animate-fade-in">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search articles..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="article-grid">
        {filteredArticles.map((article, index) => (
          <Link href={`/article/${article.id}`} key={article.id}>
            <div className="article-card glass" style={{ animationDelay: `${index * 0.05}s` }}>
              <img src={article.image} alt={article.title} className="article-image" />
              <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">
                  {article.content.substring(0, 120)}...
                </p>
                <div className="article-meta">
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  <span className="lang-badge" style={{color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)'}}>Read More</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          No articles found matching your search.
        </div>
      )}
    </>
  );
}
