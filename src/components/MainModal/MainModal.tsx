'use client';

import { Character } from '@/lib/types';
import CharacterGrid from '@/components/CharacterGrid/CharacterGrid';
import styles from './MainModal.module.css';

interface MainModalProps {
  allCharacters: Character[];
  displayedCharacters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onSelectedIndexChange: (index: number) => void;
}

export default function MainModal({
  allCharacters,
  displayedCharacters,
  selectedCharacter,
  onCharacterSelect,
  onSelectedIndexChange,
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
        </div>

        {/* Right Section - Search, Grid, Favs (Desktop) */}
        <div className={styles.rightSection}>
          <CharacterGrid 
            characters={displayedCharacters}
            selectedCharacter={selectedCharacter}
            onCharacterSelect={handleCharacterSelect}
          />
        </div>
      </div>
    </div>
  );
}
