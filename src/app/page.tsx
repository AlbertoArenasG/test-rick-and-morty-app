'use client';

import { useState, useEffect } from 'react';
import { rickMortyApi } from '@/lib/services/rickMortyApi';
import { Character } from '@/lib/types';
import styles from './page.module.css';
import MainModal from '@/components/MainModal/MainModal';


export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [currentPage] = useState(1);

  useEffect(() => {
    fetchCharacters();
  }, []);
  
  const fetchCharacters = async () => {
    try {
      const data = await rickMortyApi.getCharacters(currentPage);
      setAllCharacters(data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <MainModal
          allCharacters={allCharacters}
        />
      </div>
    </div>
  );
}