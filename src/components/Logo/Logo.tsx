import Image from 'next/image';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/assets/logo.png"
        alt="Rick & Morty Logo"
        width={300}
        height={100}
        className={styles.logoImage}
      />
    </div>
  );
}
