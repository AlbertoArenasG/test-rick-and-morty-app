'use client';

import { Character } from '@/lib/types';
import Image from 'next/image';
import styles from './MainModal.module.css';

interface MainModalProps {
  allCharacters: Character[];
}

export default function MainModal({
  allCharacters,
}: MainModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Left Section - Character Details (Desktop) */}
        <div className={styles.leftSection}>
        </div>

        {/* Right Section - Search, Grid, Favs (Desktop) */}
        <div className={styles.rightSection}>
          {allCharacters.map(character => (
            <div key={character.id}>
              <h2>{character.name}</h2>
              <Image
                src={character.image}
                alt={character.name} width={24}
                height={24}
              />
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <p>Status: {character.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
