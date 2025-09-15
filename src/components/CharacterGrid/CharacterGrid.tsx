'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/lib/types';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import styles from './CharacterGrid.module.css';

interface CharacterGridProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
}

export default function CharacterGrid({ 
  characters, 
  selectedCharacter, 
  onCharacterSelect 
}: CharacterGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCharactersToShow = () => {
    if (!isMobile) {
      return characters.slice(0, 4);
    }
    
    if (!selectedCharacter) {
      return characters.slice(0, 2);
    }
    
    const selectedIndex = characters.findIndex(char => char.id === selectedCharacter.id);
    if (selectedIndex === -1) {
      return characters.slice(0, 2);
    }
    
    if (selectedIndex >= 2) {
      return characters.slice(2, 4);
    } else {
      return characters.slice(0, 2);
    }
  };

  const charactersToShow = getCharactersToShow();

  return (
    <div className={styles.charactersGrid}>
      {charactersToShow.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={() => onCharacterSelect(character)}
          isSelected={selectedCharacter?.id === character.id}
        />
      ))}
    </div>
  );
}