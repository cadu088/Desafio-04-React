import styles from './header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <div className={styles.headerImg}>
            <img src="/logos/Logo.svg" alt="logo" width={300} />
          </div>
        </Link>
      </nav>
    </header>
  );
}
