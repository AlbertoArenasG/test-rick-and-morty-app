'use client';

import Image from 'next/image';
import { Character } from '@/lib/types';
import styles from './CharacterCard.module.css';
import dynamic from 'next/dynamic';

const LikeButton = dynamic(() => import('@/components/LikeButton/LikeButton'), {
  ssr: false
});

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected: boolean;
}

export default function CharacterCard({ 
  character, 
  onSelect, 
  isSelected 
}: CharacterCardProps) {

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.cardContent}>
        <h3 className={styles.characterName}>{character.name.toUpperCase()}</h3>
      </div>
      
      <div className={styles.imageContainer}>
        <Image
          src={character.image} 
          alt={character.name}
          width={200}
          height={200}
          className={styles.characterImage}
        />
      </div>
      
      <div className={styles.cardContent}>
        <LikeButton character={character} />
      </div>
    </div>
  );
}
