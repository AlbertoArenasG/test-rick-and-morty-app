'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { Character } from '@/lib/types';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
  character: Character;
}

export default function LikeButton({ character }: LikeButtonProps) {
  const { isFavorite, canAddFavorite, toggleFavoriteStatus } = useFavorites();
  const isCharacterFavorite = isFavorite(character.id);
  const canToggle = canAddFavorite(character.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (canToggle) {
      toggleFavoriteStatus(character);
    }
  };

  return (
    <button 
      className={`${styles.likeButton} ${isCharacterFavorite ? styles.liked : ''} ${!canToggle ? styles.disabled : ''}`}
      onClick={handleLikeClick}
      disabled={!canToggle}
    >
      <Heart 
        className={styles.heartIcon} 
        size={16}
        color={isCharacterFavorite ? '#ff4d4f' : canToggle ? '#ccc' : '#666'}
        strokeWidth={2}
      />
      Like
    </button>
  );
}
