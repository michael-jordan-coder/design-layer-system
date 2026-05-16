import styles from './Stat.module.css';

export interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className={styles.stat}>
      <span className="text-heading font-bold">{value}</span>
      <span className={['text-caption', styles.label].join(' ')}>{label}</span>
    </div>
  );
}
