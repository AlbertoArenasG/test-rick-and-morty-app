'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { Character } from '@/lib/types';
import styles from './FavoritesList.module.css';

interface FavoritesListProps {
  onCharacterSelect: (character: Character) => void;
  onClose: () => void;
}

export default function FavoritesList({ onCharacterSelect, onClose }: FavoritesListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { favoriteCharacters, removeFavoriteById, getFavoritesCount, getMaxFavorites } = useFavorites();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (favoriteCharacters.length === 0) {
    return (
      <div className={styles.favoritesContainer} ref={listRef}>
        <div className={styles.emptyMessage}>No favorites yet!</div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesContainer} ref={listRef}>
      <div className={styles.header}>
        <span>PUEDES SELECCIONAR HASTA 4 FAVORITOS</span>
        <span>({getFavoritesCount()}/{getMaxFavorites()})</span>
      </div>
      <div className={styles.favoritesList}>
        {favoriteCharacters.map(character => (
          <div key={character.id} className={styles.favoriteItemContainer}>
            <button
              className={styles.favoriteItem}
              onClick={() => {
                onCharacterSelect(character);
                onClose();
              }}
            >
              {character.name.toUpperCase()}
            </button>
            <button
              className={styles.removeButton}
              onClick={() => removeFavoriteById(character.id)}
              title="Remove from favorites"
            >
              <Image
                src="/assets/icons/trash-icon.png"
                alt="Remove from favorites"
                width={16}
                height={16}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
