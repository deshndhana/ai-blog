import fs from 'fs';
import path from 'path';
import { db, isConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface Article {
  id: string;
  title: string;
  titleSinhala?: string;
  image: string;
  content: string;
  contentSinhala?: string;
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

// Helper for local JSON
function getLocalArticles(): Article[] {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

function saveLocalArticles(articles: Article[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2), 'utf8');
}

export async function getArticles(): Promise<Article[]> {
  if (isConfigured && db) {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      articles.push(doc.data() as Article);
    });
    return articles;
  }
  return getLocalArticles();
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  if (isConfigured && db) {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Article;
    }
    return undefined;
  }
  const articles = getLocalArticles();
  return articles.find(article => article.id === id);
}

export async function addArticle(article: Omit<Article, 'id' | 'createdAt'>): Promise<Article> {
  const newArticle: Article = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };

  if (isConfigured && db) {
    await setDoc(doc(db, "articles", newArticle.id), newArticle);
    return newArticle;
  }

  const articles = getLocalArticles();
  articles.push(newArticle);
  saveLocalArticles(articles);
  return newArticle;
}

export async function deleteArticle(id: string): Promise<boolean> {
  if (isConfigured && db) {
    await deleteDoc(doc(db, "articles", id));
    return true;
  }

  const articles = getLocalArticles();
  const filtered = articles.filter(a => a.id !== id);
  if (filtered.length !== articles.length) {
    saveLocalArticles(filtered);
    return true;
  }
  return false;
}
