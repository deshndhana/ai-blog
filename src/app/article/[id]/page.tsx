import { getArticleById } from '@/lib/api';
import ArticleViewer from '@/components/ArticleViewer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  
  if (!article) {
    return {
      title: 'Article Not Found | Lumina AI',
    };
  }

  return {
    title: `${article.title} | Lumina AI`,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: [
        {
          url: article.image,
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.content.substring(0, 160),
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return notFound();
  }

  return (
    <>
      <Navbar />

      <main className="container" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
        <ArticleViewer article={article} />
      </main>
    </>
  );
}
