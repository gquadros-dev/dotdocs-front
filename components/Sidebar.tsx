'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  label: string;
}

interface SidebarCategory {
  label: string;
  items: SidebarItem[];
}

const mockSidebarData: SidebarCategory[] = [
  {
    label: 'Primeiros Passos',
    items: [
      { id: 'instalacao', label: 'Instalação' },
      { id: 'configuracao', label: 'Configuração Inicial' },
    ],
  },
  {
    label: 'Conceitos Avançados',
    items: [
      { id: 'roteamento', label: 'Roteamento Dinâmico' },
      { id: 'dados', label: 'Busca de Dados' },
      { id: 'autenticacao', label: 'Autenticação' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside style={{ borderRight: '1px solid #eee', padding: '20px', width: '250px' }}>
      <nav>
        {mockSidebarData.map((category) => (
          <div key={category.label} style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', fontSize: '14px', color: '#555' }}>
              {category.label}
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {category.items.map((item) => {
                const href = `/guia/${item.id}`;
                const isActive = pathname === href;

                return (
                  <li key={item.id} style={{ marginBottom: '8px' }}>
                    <Link
                      href={href}
                      style={{
                        color: isActive ? 'gray' : '#fff',
                        fontWeight: isActive ? 'bold' : 'normal',
                        textDecoration: 'none'
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}