"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [titleSinhala, setTitleSinhala] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [contentSinhala, setContentSinhala] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lumina2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto-generate image if not provided
    const imageUrl = image || `https://picsum.photos/seed/${Date.now()}/800/600`;

    const newArticle = {
      title,
      titleSinhala: titleSinhala || undefined,
      image: imageUrl,
      content,
      contentSinhala: contentSinhala || undefined,
    };

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle),
    });

    if (res.ok) {
      setIsAdding(false);
      setTitle('');
      setTitleSinhala('');
      setImage('');
      setContent('');
      setContentSinhala('');
      fetchArticles();
    } else {
      alert('Failed to add article');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleLogin} className="glass" style={{ padding: '3rem', width: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter password (lumina2026)"
              required 
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>&larr; Back to Home</Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-layout animate-fade-in">
      <div className="admin-sidebar glass" style={{ margin: '1rem', borderRadius: '16px' }}>
        <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>Lumina Admin</h2>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ marginBottom: '1rem' }}>
            <button 
              className={!isAdding ? "btn" : "btn btn-secondary"} 
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => setIsAdding(false)}
            >
              Dashboard
            </button>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <button 
              className={isAdding ? "btn" : "btn btn-secondary"} 
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => setIsAdding(true)}
            >
              + Add Article
            </button>
          </li>
        </ul>
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link href="/" className="btn btn-secondary" style={{ width: '100%' }}>View Site</Link>
        </div>
      </div>

      <div className="admin-content">
        {!isAdding ? (
          <div className="glass" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Manage Articles</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(article => (
                    <tr key={article.id}>
                      <td>
                        <img src={article.image} alt="thumb" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td>
                        <div>{article.title}</div>
                        {article.titleSinhala && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.titleSinhala}</div>}
                      </td>
                      <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDelete(article.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass" style={{ padding: '2rem', maxWidth: '800px' }}>
            <h2 style={{ marginBottom: '2rem' }}>Create New Article</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>English Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Sinhala Title (Optional)</label>
                <input type="text" value={titleSinhala} onChange={e => setTitleSinhala(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Image URL (Optional, will auto-generate if empty)</label>
                <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>English Content</label>
                <textarea rows={6} value={content} onChange={e => setContent(e.target.value)} required></textarea>
              </div>
              <div className="form-group">
                <label>Sinhala Content (Optional)</label>
                <textarea rows={6} value={contentSinhala} onChange={e => setContentSinhala(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Saving...' : 'Publish Article'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
