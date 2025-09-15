import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '@/lib/types';

interface FavoritesState {
  favoriteIds: number[];
  favoriteCharacters: Character[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
  favoriteCharacters: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<{ id: number; character: Character }>) => {
      const { id, character } = action.payload;
      const existingIndex = state.favoriteIds.indexOf(id);
      
      if (existingIndex >= 0) {
        state.favoriteIds.splice(existingIndex, 1);
        state.favoriteCharacters = state.favoriteCharacters.filter(char => char.id !== id);
      } else {
        state.favoriteIds.push(id);
        state.favoriteCharacters.push(character);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingIndex = state.favoriteIds.indexOf(id);
      
      if (existingIndex >= 0) {
        state.favoriteIds.splice(existingIndex, 1);
        state.favoriteCharacters = state.favoriteCharacters.filter(char => char.id !== id);
      }
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      state.favoriteCharacters = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavoriteIds = (state: { favorites: FavoritesState }) => state.favorites.favoriteIds;
export const selectFavoriteCharacters = (state: { favorites: FavoritesState }) => state.favorites.favoriteCharacters;
export const selectIsFavorite = (state: { favorites: FavoritesState }, id: number) => 
  state.favorites.favoriteIds.includes(id);