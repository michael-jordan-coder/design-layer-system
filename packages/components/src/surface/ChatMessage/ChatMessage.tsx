import type { ReactNode } from 'react';
import styles from './ChatMessage.module.css';

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessageProps {
  role: ChatMessageRole;
  content?: string;
  children?: ReactNode;
}

export function ChatMessage({ role, content, children }: ChatMessageProps) {
  return (
    <div className={[styles.row, styles[role]].join(' ')}>
      <div className={[styles.content, 'text-body'].join(' ')}>
        {children ?? content}
      </div>
    </div>
  );
}
