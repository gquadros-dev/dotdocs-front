import { TopicAccordion } from '../Topic/TopicAccordion';
import styles from './Sidebar.module.css';

interface Topic {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  order: number;
  level: number;
  children?: Topic[]; 
}

async function getTopicTree(type: string): Promise<Topic[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/tree/${type}`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar os tópicos');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function Sidebar() {
  const publicTopicTree = await getTopicTree('public');
  const privateTopicTree = await getTopicTree('private');

  return (
    <aside className={styles.sidebarContainer}>
      <nav>
        {publicTopicTree.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Público</h2>
            {publicTopicTree.map((rootTopic) => (
              <TopicAccordion key={rootTopic.id} topic={rootTopic} />
            ))}
          </>
        )}

        {privateTopicTree.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Privado</h2>
            {privateTopicTree.map((rootTopic) => (
              <TopicAccordion key={rootTopic.id} topic={rootTopic} />
            ))}
          </>
        )}

        {publicTopicTree.length === 0 && privateTopicTree.length === 0 && (
          <p>Nenhum tópico disponível.</p>
        )}
      </nav>
    </aside>
  );
}