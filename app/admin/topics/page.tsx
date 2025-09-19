import { TopicsTable } from "@/components/Topic/TopicsTable";
import { Topic } from "@/types";

async function getTopicTree(): Promise<Topic[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/tree/public`, { cache: 'no-store' });
  const privateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/tree/private`, { cache: 'no-store' });
  
  const publicTopics = await res.json();
  const privateTopics = await privateRes.json();

  publicTopics.forEach((t: Topic) => t.section = 'Público');
  privateTopics.forEach((t: Topic) => t.section = 'Privado');
  
  return [...publicTopics, ...privateTopics];
}

export default async function TopicsPage() {
  const topics = await getTopicTree();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gerenciar Tópicos</h1>
        <a href="/admin/topics/new" style={{ /* Estilos para o botão */ }}>Novo Tópico</a>
      </div>
      <TopicsTable topics={topics} />
    </div>
  );
}