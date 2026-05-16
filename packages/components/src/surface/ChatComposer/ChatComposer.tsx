import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Plus, ArrowUp } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './ChatComposer.module.css';

export interface ChatComposerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  onStop?: () => void;
  onAttach?: () => void;
  placeholder?: string;
  streaming?: boolean;
  disabled?: boolean;
}

export function ChatComposer({
  value,
  defaultValue,
  onChange,
  onSend,
  onStop,
  onAttach,
  placeholder = 'Send a message...',
  streaming = false,
  disabled = false,
}: ChatComposerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [currentValue]);

  function update(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  function handleSend() {
    const trimmed = currentValue.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    if (!isControlled) setInternalValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (streaming) onStop?.();
      else handleSend();
    }
  }

  const canSend  = currentValue.trim().length > 0 && !disabled;
  const showStop = streaming;
  const sendActive = canSend || showStop;

  return (
    <div className={styles.composer}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onAttach}
          disabled={disabled}
          aria-label="Add attachment"
        >
          <Icon icon={Plus} scale="body" />
        </button>

        <textarea
          ref={textareaRef}
          className={[styles.input, 'text-body'].join(' ')}
          placeholder={placeholder}
          value={currentValue}
          onChange={e => update(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />

        <button
          type="button"
          className={[styles.sendBtn, sendActive ? styles.sendBtnActive : ''].join(' ')}
          onClick={() => (showStop ? onStop?.() : handleSend())}
          disabled={!sendActive}
          aria-label={showStop ? 'Stop' : 'Send'}
        >
          {showStop ? <span className={styles.stopShape} /> : <Icon icon={ArrowUp} scale="caption" />}
        </button>
      </div>
    </div>
  );
}
