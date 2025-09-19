export interface Article {
  id: string;
  title: string;
  content: string;
  topicId: string;
  createdAt: string;
}


export interface ArticleSummary {
  id: string;
  title: string;
}

export interface Topic {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  order: number;
  section?: string;
  children?: Topic[];
  articles?: ArticleSummary[];
}