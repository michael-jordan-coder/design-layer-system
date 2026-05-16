import styles from './Badge.module.css';

export interface BadgeProps {
  label: string;
  dot?: boolean;
}

export function Badge({ label, dot }: BadgeProps) {
  return (
    <span className={[styles.badge, 'text-caption'].join(' ')}>
      {dot && <span className={styles.dot} />}
      {label}
    </span>
  );
}
