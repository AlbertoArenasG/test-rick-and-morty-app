'use client';

import { Character } from '@/lib/types';
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
        {allCharacters.length && (
          allCharacters.map((character) => (
            <div
              key={character.id}
            >
              <p>{character.name}</p>
            </div>
          ))
        )}        
      </div>
    </div>
  );
}
