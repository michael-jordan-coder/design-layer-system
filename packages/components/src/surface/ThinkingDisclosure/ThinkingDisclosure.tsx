import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronRight, Brain } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './ThinkingDisclosure.module.css';

export interface ThinkingDisclosureProps {
  summary: string;
  defaultOpen?: boolean;
  thinking?: boolean;
  children?: ReactNode;
}

export function ThinkingDisclosure({
  summary,
  defaultOpen = false,
  thinking = false,
  children,
}: ThinkingDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={[styles.root, thinking ? styles.thinking : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.chevronWrap}>
          <Icon
            icon={ChevronRight}
            scale="caption"
            className={open ? styles.chevronOpen : undefined}
          />
        </span>
        <span className={styles.brainWrap}>
          <Icon icon={Brain} scale="caption" />
        </span>
        <span className={['text-caption', styles.summary].join(' ')}>{summary}</span>
      </button>

      {open && children && (
        <div className={[styles.body, 'text-caption'].join(' ')}>
          {children}
        </div>
      )}
    </div>
  );
}
