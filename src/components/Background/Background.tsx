'use client';

import Image from 'next/image';
import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.backgroundContainer}>
      <Image
        src="/assets/main_bg.png"
        alt="Rick & Morty"
        fill
        className={styles.backgroundImage}
        sizes="100vw"
        priority
      />
    </div>
  );
}
