'use client';

import Image from 'next/image';
import { Character } from '@/lib/types';
import styles from './CharacterDetail.module.css';

interface CharacterDetailProps {
  character: Character;
}

export default function CharacterDetail({ 
  character,
}: CharacterDetailProps) {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={character.image} 
          alt={character.name}
          width={300}
          height={300}
          className={styles.characterImage}
        />
        <div className={styles.statusIndicator}>
          <span className={`${styles.statusDot} ${
            character.status.toLowerCase() === 'alive' ? styles.alive : 
            character.status.toLowerCase() === 'dead' ? styles.dead : 
            styles.unknown
          }`}></span>
          <span className={styles.statusText}>
            {character.status.toLowerCase() === 'alive' ? 'LIVE' : 
             character.status.toLowerCase() === 'dead' ? 'DEAD' : 
             'UNKNOWN'}
          </span>
        </div>
      </div>
      
      <div className={styles.characterInfo}>
        <h2 className={styles.characterName}>{character.name}</h2>
        <div className={styles.characterDetails}>
          <p className={styles.value}>{character.species}</p>
          {character.type && <p className={styles.type}>{character.type}</p>}
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Origin</span>
            <span className={styles.value}>{character.origin.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{character.location.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Gender</span>
            <span className={styles.value}>{character.gender}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Episodes</span>
            <span className={styles.value}>{character.episode.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
