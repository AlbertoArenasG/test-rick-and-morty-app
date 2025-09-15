'use client';

import { SearchX } from 'lucide-react';
import styles from './NotFound.module.css';

interface NotFoundProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export default function NotFound({ searchTerm, onClearSearch }: NotFoundProps) {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.iconContainer}>
        <SearchX className={styles.searchIcon} size={64} />
      </div>
      <h2 className={styles.title}>No characters found</h2>
      <p className={styles.message}>
        No results match your search for <span className={styles.searchTerm}>&quot;{searchTerm}&quot;</span>
      </p>
      <button 
        className={styles.clearButton}
        onClick={onClearSearch}
      >
        Clear search and show all characters
      </button>
    </div>
  );
}
