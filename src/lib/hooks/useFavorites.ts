import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { 
  toggleFavorite, 
  removeFavorite,
  selectFavoriteCharacters
} from '@/lib/features/favorites/favoritesSlice';
import { Character } from '@/lib/types';

const MAX_FAVORITES = 4;

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(selectFavoriteCharacters);
  const favoriteIds = favoriteCharacters.map(char => char.id);
  
  const isFavorite = (characterId: number) => {
    return favoriteIds.includes(characterId);
  };
  
  const canAddFavorite = (characterId: number) => {
    if (isFavorite(characterId)) {
      return true;
    }
    return favoriteCharacters.length < MAX_FAVORITES;
  };
  
  const addFavorite = (character: Character) => {
    if (favoriteCharacters.length < MAX_FAVORITES) {
      dispatch(toggleFavorite({ id: character.id, character }));
      return true;
    }
    return false;
  };
  
  const removeFavoriteById = (characterId: number) => {
    dispatch(removeFavorite(characterId));
  };
  
  const toggleFavoriteStatus = (character: Character) => {
    const isCurrentlyFavorite = isFavorite(character.id);
    
    if (isCurrentlyFavorite) {
      dispatch(toggleFavorite({ id: character.id, character }));
      return true;
    } else {
      return addFavorite(character);
    }
  };
  
  const getFavoritesCount = () => favoriteCharacters.length;
  const getMaxFavorites = () => MAX_FAVORITES;
  const isAtLimit = () => favoriteCharacters.length >= MAX_FAVORITES;
  
  return {
    favoriteCharacters,
    isFavorite,
    canAddFavorite,
    addFavorite,
    removeFavoriteById,
    toggleFavoriteStatus,
    getFavoritesCount,
    getMaxFavorites,
    isAtLimit
  };
};
