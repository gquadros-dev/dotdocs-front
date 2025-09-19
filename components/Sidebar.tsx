import styles from './Sidebar.module.css';
import { TopicAccordion } from './TopicAccordion';

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
    const response = await fetch(`http://localhost:8080/api/topics/tree/${type}`, {
      cache: 'no-store' // Use isso durante o desenvolvimento para não usar cache
    });
    
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