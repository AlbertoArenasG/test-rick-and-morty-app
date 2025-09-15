'use client';

import Image from 'next/image';
import styles from './ChevronButton.module.css';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ChevronButtonProps {
  direction: Direction;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ChevronButton({ 
  direction, 
  onClick, 
  disabled = false, 
  className = '' 
}: ChevronButtonProps) {
  const getIconPaths = (dir: Direction) => {
    return {
      base: `/assets/icons/base-chevron-${dir}.png`,
      hover: `/assets/icons/hover-chevron-${dir}.png`,
      click: `/assets/icons/click-chevron-${dir}.png`
    };
  };

  const mobileIcons = getIconPaths(direction === 'up' ? 'left' : direction === 'down' ? 'right' : direction);
  const desktopIcons = getIconPaths(direction);

  return (
    <button 
      className={`${styles.chevronButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Mobile Icons */}
      <Image
        src={mobileIcons.base}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.mobileIcon} ${styles.baseIcon}`}
      />
      <Image
        src={mobileIcons.hover}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.mobileIcon} ${styles.hoverIcon}`}
      />
      <Image
        src={mobileIcons.click}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.mobileIcon} ${styles.clickIcon}`}
      />

      {/* Desktop Icons */}
      <Image
        src={desktopIcons.base}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.desktopIcon} ${styles.baseIcon}`}
      />
      <Image
        src={desktopIcons.hover}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.desktopIcon} ${styles.hoverIcon}`}
      />
      <Image
        src={desktopIcons.click}
        alt={`${direction} button`}
        width={24}
        height={24}
        className={`${styles.chevronIcon} ${styles.desktopIcon} ${styles.clickIcon}`}
      />
    </button>
  );
}
