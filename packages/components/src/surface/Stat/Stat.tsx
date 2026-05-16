import type { ReactNode } from 'react';
import styles from './Stat.module.css';

export interface StatProps {
  value: string;
  label: string;
  trend?: ReactNode;
}

export function Stat({ value, label, trend }: StatProps) {
  return (
    <div className={styles.stat}>
      <div className={styles.valueRow}>
        <span className="text-heading font-bold">{value}</span>
        {trend && <span className={styles.trend}>{trend}</span>}
      </div>
      <span className={['text-caption', styles.label].join(' ')}>{label}</span>
    </div>
  );
}
