'use client';

import { Character, ApiInfo } from '@/lib/types';
import CharacterGrid from '@/components/CharacterGrid/CharacterGrid';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './MainModal.module.css';

interface MainModalProps {
  allCharacters: Character[];
  displayedCharacters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  apiInfo: ApiInfo | null;
  currentPage: number;
  onSelectedIndexChange: (index: number) => void;
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
  currentPage,
  onSelectedIndexChange,
  onClearSearch,
}: MainModalProps) {
  const handleCharacterSelect = (character: Character) => {
    onCharacterSelect(character);
    const newIndex = displayedCharacters.findIndex(c => c.id === character.id);
    if (newIndex !== -1) {
      onSelectedIndexChange(newIndex);
    }
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
        </div>
      </div>
    </div>
  );
}
