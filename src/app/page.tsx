'use client';

import { useState, useEffect } from 'react';
import { rickMortyApi } from '@/lib/services/rickMortyApi';
import { Character } from '@/lib/types';
import styles from './page.module.css';
import Background from '@/components/Background/Background';
import MainModal from '@/components/MainModal/MainModal';


export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage] = useState(1);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  useEffect(() => {
    updateDisplayedCharacters();
  }, [allCharacters, currentBlockIndex]);

  useEffect(() => {
    fetchCharacters();
  }, []);
  
  const fetchCharacters = async () => {
    try {
      const data = await rickMortyApi.getCharacters(currentPage);
      setAllCharacters(data.results);
      setCurrentBlockIndex(0);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const updateDisplayedCharacters = () => {
    const startIndex = currentBlockIndex * 4;
    const endIndex = Math.min(startIndex + 4, allCharacters.length);
    const newDisplayedCharacters = allCharacters.slice(startIndex, endIndex);
    setDisplayedCharacters(newDisplayedCharacters);
    
    if (newDisplayedCharacters.length > 0) {
      const validSelectedIndex = Math.min(selectedIndex, newDisplayedCharacters.length - 1);
      setSelectedCharacter(newDisplayedCharacters[validSelectedIndex]);
      setSelectedIndex(validSelectedIndex);
    }
  };

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.content}>
        <MainModal
          allCharacters={allCharacters}
          displayedCharacters={displayedCharacters}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={setSelectedCharacter}
          onSelectedIndexChange={setSelectedIndex}
        />
      </div>
    </div>
  );
}