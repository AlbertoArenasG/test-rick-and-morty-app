'use client';

import { useState, useEffect } from 'react';
import { rickMortyApi } from '@/lib/services/rickMortyApi';
import { Character, ApiInfo } from '@/lib/types';
import styles from './page.module.css';
import Background from '@/components/Background/Background';
import Logo from '@/components/Logo/Logo';
import MainModal from '@/components/MainModal/MainModal';


export default function Home() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  useEffect(() => {
    updateDisplayedCharacters();
  }, [allCharacters, currentBlockIndex]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const delayedSearch = setTimeout(() => {
        searchCharacters(searchTerm);
      }, 500);
      return () => clearTimeout(delayedSearch);
    } else {
      if (allCharacters.length === 0) {
        fetchCharacters();
      }
    }
  }, [searchTerm]);
  
  const fetchCharacters = async () => {
    try {
      const data = await rickMortyApi.getCharacters(currentPage);
      setAllCharacters(data.results);
      setCurrentBlockIndex(0);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const searchCharacters = async (name: string) => {
    try {
      setLoading(true);
      const data = await rickMortyApi.getCharacters(1, { name });
      setAllCharacters(data.results);
      setApiInfo(data.info);
      setCurrentPage(1);
      setCurrentBlockIndex(0);
      setSelectedIndex(0);
      setLoading(false);
    } catch (error) {
      console.error('Error searching characters:', error);
      setLoading(false);
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

  const handleClearSearch = async () => {
    setSearchTerm('');
    try {
      setLoading(true);
      const data = await rickMortyApi.getCharacters(1);
      setAllCharacters(data.results);
      setApiInfo(data.info);
      setCurrentPage(1);
      setCurrentBlockIndex(0);
      setSelectedIndex(0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all characters:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Background />
        <div className={styles.loading}>Loading characters...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.content}>
        <Logo />

        <MainModal
          allCharacters={allCharacters}
          displayedCharacters={displayedCharacters}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={setSelectedCharacter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          apiInfo={apiInfo}
          currentPage={currentPage}
          onSelectedIndexChange={setSelectedIndex}
          onClearSearch={handleClearSearch}
        />
      </div>
      <div className={styles.bottomGradient}></div>
    </div>
  );
}