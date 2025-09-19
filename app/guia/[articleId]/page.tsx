import { Metadata } from 'next';

interface Article {
  id: string;
  title: string;
  content: string;
  topicId: string;
  createdAt: string;
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
      cache: 'no-store', 
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Falha ao buscar artigo:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { articleId: string } }): Promise<Metadata> {
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

export default async function ArticlePage({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
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
    <article>
      <h1>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}