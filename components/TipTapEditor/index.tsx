'use client';

import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import styles from './Tiptap.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menuBar}>
      {/* Grupo 1: Estilos Básicos */}
      <div className={styles.buttonGroup}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? styles.isActive : ''}>Negrito</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? styles.isActive : ''}>Itálico</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? styles.isActive : ''}>Sublinhado</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? styles.isActive : ''}>Cortado</button>
      </div>

      {/* Grupo 2: Títulos e Parágrafo */}
      <div className={styles.buttonGroup}>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? styles.isActive : ''}>Parágrafo</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? styles.isActive : ''}><span style={{ fontSize: '1rem' }}>T1</span></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? styles.isActive : ''}><span style={{ fontSize: '0.9rem' }}>T2</span></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? styles.isActive : ''}><span style={{ fontSize: '0.8rem' }}>T3</span></button>
      </div>

      {/* Grupo 3: Listas e Blocos (NOVOS BOTÕES) */}
      <div className={styles.buttonGroup}>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? styles.isActive : ''}>Lista</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? styles.isActive : ''}>Lista Num.</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? styles.isActive : ''}>Citação</button>
      </div>

      {/* Grupo 4: Alinhamento */}
      <div className={styles.buttonGroup}>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? styles.isActive : ''}>Esquerda</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? styles.isActive : ''}>Centro</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? styles.isActive : ''}>Direita</button>
      </div>
    </div>
  );
};


interface TiptapEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false, 
      }),
      
      ListItem, 
      BulletList,
      OrderedList,
      Blockquote,
      TextAlign.configure({
        types: ['heading', 'paragraph'], 
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className={styles.editorContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}