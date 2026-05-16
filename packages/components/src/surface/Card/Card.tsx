import type { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  const hasHeader = title || description;

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {hasHeader && (
        <div className={styles.header}>
          {title && <span className={['text-body', 'font-semibold', styles.title].join(' ')}>{title}</span>}
          {description && <span className={['text-caption', styles.description].join(' ')}>{description}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
