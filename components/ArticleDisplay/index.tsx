'use client';

import { Article } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './ArticleDisplay.module.css';

import { TiptapEditor } from "../TipTapEditor";

interface ArticleDisplayProps {
  initialArticle: Article;
}

export function ArticleDisplay({ initialArticle }: ArticleDisplayProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [article, setArticle] = useState(initialArticle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${initialArticle.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          topicId: article.topicId,
        }),
      });

      if (!response.ok) throw new Error("Falha ao salvar o artigo.");

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setArticle(initialArticle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.container}>
        <input 
          type="text"
          className={styles.titleInput}
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <TiptapEditor
          content={article.content}
          onChange={(content) => setArticle({ ...article, content })}
        />
        <div className={styles.actions}>
          <button onClick={handleSave} disabled={isLoading} className={styles.button}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
          <button onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.viewHeader}>
        <h1>{article.title}</h1>
        <button onClick={() => setIsEditing(true)} className={styles.button}>
          Editar
        </button>
      </div>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}