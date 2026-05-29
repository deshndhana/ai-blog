import { getArticles } from '@/lib/api';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default async function Home() {
  const articles = await getArticles();
  
  // Sort by newest first
  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <Navbar />

      <main className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            The Future of <span className="gradient-text">Artificial Intelligence</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Discover the latest trends, research, and breakthroughs in Artificial Intelligence, Machine Learning, and beyond.
          </p>
        </div>

        <ArticleList initialArticles={sortedArticles} />
      </main>
    </>
  );
}
