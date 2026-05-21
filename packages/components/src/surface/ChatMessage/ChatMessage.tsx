import { useState } from 'react';
import type { ReactNode } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './ChatMessage.module.css';

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessageProps {
  role: ChatMessageRole;
  content?: string;
  streaming?: boolean;
  onRegenerate?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function ChatMessage({
  role,
  content,
  streaming = false,
  onRegenerate,
  header,
  footer,
  children,
}: ChatMessageProps) {
  const isStreaming = streaming && role === 'assistant';
  const body        = children ?? content;
  const showActions = role === 'assistant' && !isStreaming && (content || onRegenerate);

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — silent */
    }
  }

  return (
    <div className={[styles.row, styles[role]].join(' ')}>
      <div className={styles.column}>
        {header && <div className={styles.header}>{header}</div>}

        <div
          className={[
            styles.content,
            'text-body',
            isStreaming ? styles.streaming : '',
          ].filter(Boolean).join(' ')}
        >
          {body}
          {isStreaming && <span className={styles.caret} aria-hidden="true" />}
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}

        {showActions && (
          <div className={styles.actions}>
            {content && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy message'}
              >
                <Icon icon={copied ? Check : Copy} scale="caption" />
              </button>
            )}
            {onRegenerate && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={onRegenerate}
                aria-label="Regenerate response"
              >
                <Icon icon={RotateCcw} scale="caption" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
