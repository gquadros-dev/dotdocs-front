import { TopicForm } from "@/components/Topic/TopicForm";
import { Topic } from "@/types";

async function getTopic(id: string): Promise<Topic | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function EditTopicPage({ params }: { params: { topicId: string } }) {
  const { topicId } = await params;
  const topic = await getTopic(topicId);

  if (!topic) {
    return <div>Tópico não encontrado.</div>;
  }

  return (
    <div>
      <h1>Editar Tópico: {topic.name}</h1>
      <TopicForm initialData={topic} />
    </div>
  );
}