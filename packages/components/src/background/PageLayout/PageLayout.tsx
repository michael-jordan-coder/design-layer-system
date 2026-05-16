import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

export interface PageLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  children?: ReactNode;
}

export function PageLayout({ sidebar, topbar, children }: PageLayoutProps) {
  return (
    <div className={styles.layout}>
      {sidebar}
      <div className={styles.main}>
        {topbar}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
