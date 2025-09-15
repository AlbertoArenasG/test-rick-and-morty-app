'use client';

import { useState } from 'react';
import { rickMortyApi } from '@/lib/services/rickMortyApi';
import { Character, ApiInfo } from '@/lib/types';
import CharacterGrid from '@/components/CharacterGrid/CharacterGrid';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import SearchBar from '@/components/SearchBar/SearchBar';
import FavoritesList from '@/components/FavoritesList/FavoritesList';
import ChevronButton from '@/components/ChevronButton/ChevronButton';
import styles from './MainModal.module.css';

interface MainModalProps {
  allCharacters: Character[];
  displayedCharacters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  apiInfo: ApiInfo | null;
  currentBlockIndex: number;
  selectedIndex: number;
  onPageChange: (page: number) => void;
  onBlockIndexChange: (blockIndex: number) => void;
  onSelectedIndexChange: (index: number) => void;
  setAllCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  setApiInfo: React.Dispatch<React.SetStateAction<ApiInfo | null>>;
  onClearSearch: () => void;
}

export default function MainModal({
  allCharacters,
  displayedCharacters,
  selectedCharacter,
  onCharacterSelect,
  searchTerm,
  onSearchChange,
  apiInfo,
  currentBlockIndex,
  selectedIndex,
  onPageChange,
  onBlockIndexChange,
  onSelectedIndexChange,
  setAllCharacters,
  setApiInfo,
  onClearSearch
}: MainModalProps) {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    onCharacterSelect(character);
    const newIndex = displayedCharacters.findIndex(c => c.id === character.id);
    if (newIndex !== -1) {
      onSelectedIndexChange(newIndex);
    }
  };

  const handlePrevious = async () => {
    const newSelectedIndex = selectedIndex - 1;
    
    if (newSelectedIndex >= 0) {
      onSelectedIndexChange(newSelectedIndex);
      onCharacterSelect(displayedCharacters[newSelectedIndex]);
    } else {
      const newBlockIndex = currentBlockIndex - 1;
      
      if (newBlockIndex >= 0) {
        onBlockIndexChange(newBlockIndex);
        onSelectedIndexChange(3);
      } else if (apiInfo?.prev) {
        try {
          const prevPage = rickMortyApi.getPageFromUrl(apiInfo.prev);
          if (prevPage) {
            const data = await rickMortyApi.getCharacters(prevPage, searchTerm ? { name: searchTerm } : {});
            setAllCharacters(data.results);
            setApiInfo(data.info);
            onPageChange(prevPage);
            const maxBlocks = Math.ceil(data.results.length / 4);
            const lastBlockIndex = maxBlocks - 1;
            onBlockIndexChange(lastBlockIndex);
            onSelectedIndexChange(3);
          }
        } catch (error) {
          console.error('Error loading previous page:', error);
        }
      }
    }
  };

  const handleNext = async () => {
    const newSelectedIndex = selectedIndex + 1;
    
    if (newSelectedIndex < displayedCharacters.length) {
      onSelectedIndexChange(newSelectedIndex);
      onCharacterSelect(displayedCharacters[newSelectedIndex]);
    } else {
      const newBlockIndex = currentBlockIndex + 1;
      const maxBlocksInCurrentPage = Math.ceil(allCharacters.length / 4);
      
      if (newBlockIndex < maxBlocksInCurrentPage) {
        onBlockIndexChange(newBlockIndex);
        onSelectedIndexChange(0);
      } else if (apiInfo?.next) {
        try {
          const nextPage = rickMortyApi.getPageFromUrl(apiInfo.next);
          if (nextPage) {
            const data = await rickMortyApi.getCharacters(nextPage, searchTerm ? { name: searchTerm } : {});
            setAllCharacters(data.results);
            setApiInfo(data.info);
            onPageChange(nextPage);
            onBlockIndexChange(0);
            onSelectedIndexChange(0);
          }
        } catch (error) {
          console.error('Error loading next page:', error);
        }
      }
    }
  };

  const canGoPrevious = () => {
    return selectedIndex > 0 || 
           currentBlockIndex > 0 || 
           (apiInfo?.prev !== null);
  };

  const canGoNext = () => {
    const maxBlocksInCurrentPage = Math.ceil(allCharacters.length / 4);
    return selectedIndex < displayedCharacters.length - 1 || 
           currentBlockIndex < maxBlocksInCurrentPage - 1 || 
           (apiInfo?.next !== null);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Left Section - Character Details (Desktop) */}
        <div className={styles.leftSection}>
          {selectedCharacter && (
            <CharacterDetail 
              character={selectedCharacter}
            />
          )}
        </div>

        {/* Right Section - Search, Grid, Favs (Desktop) */}
        <div className={styles.rightSection}>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onClear={onClearSearch}
          />

          <CharacterGrid 
            characters={displayedCharacters}
            selectedCharacter={selectedCharacter}
            onCharacterSelect={handleCharacterSelect}
          />

          {/* Character Detail for Mobile - shown between grid and favs */}
          {selectedCharacter && (
            <div className={styles.mobileCharacterDetail}>
              <CharacterDetail 
                character={selectedCharacter}
              />
            </div>
          )}

          {/* Favorites Section - Inside right section for desktop */}
          <div className={styles.favsSection}>
            <button 
              className={`${styles.favsButton} ${showFavorites ? styles.hidden : ''}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              FAVS
            </button>
            {showFavorites && (
              <FavoritesList
                onCharacterSelect={handleCharacterSelect}
                onClose={() => setShowFavorites(false)}
              />
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {selectedCharacter && (
          <>
            <ChevronButton
              direction="up"
              onClick={handlePrevious}
              disabled={!canGoPrevious()}
              className={styles.prevButton}
            />
            <ChevronButton
              direction="down"
              onClick={handleNext}
              disabled={!canGoNext()}
              className={styles.nextButton}
            />
          </>
        )}
      </div>
    </div>
  );
}
