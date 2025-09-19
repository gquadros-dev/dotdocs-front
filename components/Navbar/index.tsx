import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  // --- LÓGICA DE LOGIN SIMULADA ---
  // No futuro, isso virá de um sistema de autenticação (NextAuth, Clerk, etc.)
  // Alterne entre 'true' e 'false' para ver a navbar mudar!
  const isLoggedIn = true;

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.logo}>
        <Link href="/">
          DotDocs 🚀
        </Link>
      </div>
      <nav className={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <Link href="/admin/topics" className={styles.navButton}>
              Tópicos
            </Link>
            <Link href="/admin/articles" className={styles.navButton}>
              Artigos
            </Link>
          </>
        ) : (
          <Link href="/login" className={styles.navButton}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}