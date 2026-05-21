import type { MouseEvent } from 'react';
import styles from './Citation.module.css';

export interface CitationProps {
  number: number;
  href?: string;
  title?: string;
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export function Citation({ number, href, title, active = false, onClick }: CitationProps) {
  const className = [styles.chip, active ? styles.active : ''].filter(Boolean).join(' ');
  const label     = title ? `Citation ${number}: ${title}` : `Citation ${number}`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={title}
        onClick={onClick}
      >
        {number}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      title={title}
      onClick={onClick}
    >
      {number}
    </button>
  );
}
