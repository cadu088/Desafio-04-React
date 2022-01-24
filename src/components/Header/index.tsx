import styles from './header.module.scss';
import Logo from '../../other/Logo.svg';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Header() {
  return (
    <header>
      <div className={styles.headerImg}>
        <img src="../../other/Logo.svg" />
      </div>
    </header>
  );
}
