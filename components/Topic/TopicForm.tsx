'use client';

import { Topic } from '@/types';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import styles from './TopicForm.module.css';

interface TopicFormProps {
  initialData?: Topic; 
}

export function TopicForm({ initialData }: TopicFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'public', 
    parentId: initialData?.parentId || '',
    order: initialData?.order || 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [parentTopics, setParentTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchParentTopics() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/byType/${formData.type}`,{
          cache: 'no-store'
        });
        
        const data = await res.json();
        setParentTopics(data.filter((t: Topic) => t.id !== initialData?.id));
    }
    fetchParentTopics();
  }, [formData.type, initialData?.id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        type: value,
        parentId: '' 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const url = initialData
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/topics/${initialData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/topics`;

    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            parentId: formData.parentId === '' ? null : formData.parentId,
            order: Number(formData.order)
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar o tópico.');
      }
      
      await response.json();
      router.push('/admin/topics');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome do Tópico</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="type">Tipo</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="public">Público</option>
          <option value="private">Privado</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="parentId">Tópico Pai (Opcional)</label>
        <select id="parentId" name="parentId" value={formData.parentId || ''} onChange={handleChange}>
          <option value="">Nenhum (Tópico Raiz)</option>
          {parentTopics.map(topic => (
            <option key={topic.id} value={topic.id}>{topic.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="order">Ordem</label>
        <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} />
      </div>

      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? 'Salvando...' : 'Salvar Tópico'}
      </button>
    </form>
  );
}