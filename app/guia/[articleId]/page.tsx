import { ArticleDisplay } from '@/components/ArticleDisplay';
import { Article } from '@/types';
import { Metadata } from 'next';

async function getArticle(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`, {
      cache: 'no-store', 
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Falha ao buscar artigo:', error);
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<{ articleId: string }> }): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticle(params.articleId);

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  return {
    title: article.title,
  };
}

export default async function ArticlePage(props: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await props.params;
  const article = await getArticle(articleId);

  if (!article) {
    return (
      <div>
        <h1>Artigo não encontrado</h1>
        <p>O artigo que você está procurando não existe ou foi movido.</p>
      </div>
    );
  }

  return (
    <ArticleDisplay initialArticle={article}></ArticleDisplay>
  );
}