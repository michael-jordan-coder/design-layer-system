import type { LucideIcon } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './SuggestedPrompts.module.css';

export interface SuggestedPrompt {
  id: string;
  icon: LucideIcon;
  label: string;
  prompt: string;
}

export interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelect?: (prompt: SuggestedPrompt) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className={styles.grid}>
      {prompts.map(p => (
        <button
          key={p.id}
          type="button"
          className={styles.card}
          onClick={() => onSelect?.(p)}
        >
          <span className={styles.iconWrap}>
            <Icon icon={p.icon} scale="body" />
          </span>
          <span className={[styles.label, 'text-body'].join(' ')}>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
