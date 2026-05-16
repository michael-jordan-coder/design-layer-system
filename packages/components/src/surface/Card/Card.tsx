import type { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, description, action, children, className }: CardProps) {
  const hasHeader = title || description || action;

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <span className={['text-body', 'font-semibold', styles.title].join(' ')}>{title}</span>}
            {description && <span className={['text-caption', styles.description].join(' ')}>{description}</span>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
