'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './TopicAccordion.module.css';

interface Article {
  id: string;
  title: string;
}

interface Topic {
  id: string;
  name: string;
  children?: Topic[];
  articles?: Article[]; 
}

export function TopicAccordion({ topic }: { topic: Topic }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const hasChildren = topic.children && topic.children.length > 0;
  const hasArticles = topic.articles && topic.articles.length > 0;

  const isExpandable = hasChildren || hasArticles;

  return (
    <div className={styles.accordionItem}>
      <div 
        className={styles.accordionHeader + (isExpandable ? ` ${styles.accordionHeaderExpandable}` : '')}
        onClick={() => isExpandable && setIsOpen(!isOpen)}
        style={{ cursor: isExpandable ? 'pointer' : 'default' }}
      >
        <span>{topic.name}</span>
        {isExpandable && (
          <span className={`${styles.arrow} ${isOpen ? styles.arrowDown : ''}`}>
            ▶
          </span>
        )}
      </div>

      {isOpen && (
        <div className={styles.accordionContent}>
          {hasArticles && (
            <ul className={styles.articleList}>
              {topic.articles?.map((article) => {
                const href = `/guia/${article.id}`;
                const isActive = pathname === href;
                return (
                  <li key={article.id}>
                    <Link href={href} className={isActive ? styles.activeLink : styles.link}>
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {hasChildren && topic.children?.map((childTopic) => (
            <TopicAccordion key={childTopic.id} topic={childTopic} />
          ))}
        </div>
      )}
    </div>
  );
}