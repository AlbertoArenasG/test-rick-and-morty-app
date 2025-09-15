'use client';

import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear?: () => void;
}

export default function SearchBar({ searchTerm, onSearchChange, onClear }: SearchBarProps) {
  const handleClear = () => {
    onSearchChange('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        placeholder="Find your character..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      {searchTerm && (
        <button 
          onClick={handleClear}
          className={styles.clearButton}
          type="button"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
