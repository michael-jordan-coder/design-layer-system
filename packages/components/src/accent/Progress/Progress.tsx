import * as RadixProgress from '@radix-ui/react-progress';
import styles from './Progress.module.css';

export interface ProgressProps {
  value: number;
  max?: number;
}

export function Progress({ value, max = 100 }: ProgressProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = (clamped / max) * 100;

  return (
    <RadixProgress.Root className={styles.root} value={clamped} max={max}>
      <RadixProgress.Indicator
        className={styles.indicator}
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </RadixProgress.Root>
  );
}
