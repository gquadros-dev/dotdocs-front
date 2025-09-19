'use client';

import { Topic } from "@/types";
import { useState } from "react";
import { TopicRow } from "./TopicRow";
import styles from "./TopicsTable.module.css";

interface TopicsTableProps {
  topics: Topic[];
}

export function TopicsTable({ topics }: TopicsTableProps) {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());

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

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome do Tópico</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {topics.map(topic => (
          <TopicRow 
            key={topic.id} 
            topic={topic} 
            level={0} 
            isOpen={openTopics.has(topic.id)}
            onToggle={() => handleToggle(topic.id)}
            openTopics={openTopics}
            setOpenTopics={setOpenTopics} 
          />
        ))}
      </tbody>
    </table>
  );
}