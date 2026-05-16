import type { ReactNode } from 'react';
import styles from './Topbar.module.css';

export interface TopbarProps {
  title?: string;
  actions?: ReactNode;
}

export function Topbar({ title, actions }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      {title && <span className={`${styles.title} text-body font-semibold`}>{title}</span>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
