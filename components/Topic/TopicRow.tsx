'use client';

import { Topic } from "@/types";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from "./TopicsTable.module.css";

interface TopicRowProps {
  topic: Topic;
  level: number;
  isOpen: boolean;
  onToggle: () => void;
  openTopics: Set<string>;
  setOpenTopics: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function TopicRow({ topic, level, isOpen, onToggle, openTopics, setOpenTopics }: TopicRowProps) {
  const router = useRouter();
  const isParent = (topic.children && topic.children.length > 0) || (topic.articles && topic.articles.length > 0);

  const handleToggle = (topicId: string) => {
    setOpenTopics(prev => {
        const newSet = new Set(prev);
        if (newSet.has(topicId)) {
            newSet.delete(topicId);
        } else {
            newSet.add(topicId);
        }
        return newSet;
    });
  };

  const handleDelete = async (topicId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este tópico?")) {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/topics/${topicId}`;
        
        const response = await fetch(url, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error("Falha ao excluir o tópico.");
        }
        
        alert("Tópico excluído com sucesso!");
        router.refresh(); 
      } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : "Ocorreu um erro.");
      }
    }
  };

  return (
    <>
      <tr className={styles.row}>
        <td style={{ paddingLeft: `${level * 20 + 10}px` }}>
          <span onClick={onToggle} className={styles.toggle}>
            {topic.children && topic.children.length > 0 && (
              <span className={`${styles.arrow} ${isOpen ? styles.arrowDown : ''}`}>▶</span>
            )}
            {topic.name}
          </span>
        </td>
        <td>{topic.type}</td>
        <td className={styles.actions}>
          <Link href={`/admin/topics/edit/${topic.id}`} className={styles.button}>Editar</Link>
          <button 
            onClick={() => handleDelete(topic.id)}
            disabled={isParent} // Desabilita se for pai
            className={`${styles.button} ${styles.deleteButton}`}
            title={isParent ? "Não é possível excluir tópicos que contêm outros tópicos ou artigos." : "Excluir tópico"}
          >
            Excluir
          </button>
        </td>
      </tr>
      {isOpen && topic.children && topic.children.map(child => (
        <TopicRow 
            key={child.id} 
            topic={child} 
            level={level + 1} 
            isOpen={openTopics.has(child.id)}
            onToggle={() => handleToggle(child.id)}
            openTopics={openTopics}
            setOpenTopics={setOpenTopics}
        />
      ))}
    </>
  );
}