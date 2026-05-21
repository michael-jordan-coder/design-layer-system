import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Plus, ArrowUp } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import { Dropdown } from '../Dropdown/Dropdown';
import type { DropdownEntry } from '../Dropdown/Dropdown';
import styles from './ChatComposer.module.css';

export interface ChatComposerMode {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface SlashCommand {
  id: string;
  name: string;
  description?: string;
  icon?: LucideIcon;
}

export interface ChatComposerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  onStop?: () => void;
  onAttach?: () => void;
  attachmentItems?: DropdownEntry[];
  placeholder?: string;
  streaming?: boolean;
  disabled?: boolean;
  modes?: ChatComposerMode[];
  activeModes?: string[];
  onModesChange?: (ids: string[]) => void;
  slashCommands?: SlashCommand[];
  onSlashCommand?: (id: string) => void;
}

export function ChatComposer({
  value,
  defaultValue,
  onChange,
  onSend,
  onStop,
  onAttach,
  attachmentItems,
  placeholder = 'Send a message...',
  streaming = false,
  disabled = false,
  modes,
  activeModes,
  onModesChange,
  slashCommands,
  onSlashCommand,
}: ChatComposerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isModesControlled = activeModes !== undefined;
  const [internalModes, setInternalModes] = useState<string[]>([]);
  const currentModes = isModesControlled ? activeModes : internalModes;

  // ── Slash command popover ──────────────────────────────────────
  const slashOpen   = !!slashCommands && currentValue.startsWith('/');
  const slashFilter = slashOpen ? currentValue.slice(1).toLowerCase() : '';
  const filteredCommands = useMemo(() => {
    if (!slashOpen || !slashCommands) return [];
    return slashCommands.filter(c =>
      c.name.toLowerCase().startsWith(slashFilter) ||
      slashFilter === '',
    );
  }, [slashOpen, slashFilter, slashCommands]);
  const [slashIndex, setSlashIndex] = useState(0);

  useEffect(() => {
    if (slashIndex >= filteredCommands.length) setSlashIndex(0);
  }, [filteredCommands.length, slashIndex]);

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

  function toggleMode(id: string) {
    const next = currentModes.includes(id)
      ? currentModes.filter(m => m !== id)
      : [...currentModes, id];
    if (!isModesControlled) setInternalModes(next);
    onModesChange?.(next);
  }

  function handleSend() {
    const trimmed = currentValue.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    if (!isControlled) setInternalValue('');
  }

  function pickCommand(cmd: SlashCommand) {
    onSlashCommand?.(cmd.id);
    if (!isControlled) setInternalValue('');
    onChange?.('');
    setSlashIndex(0);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (slashOpen && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSlashIndex(i => (i + 1) % filteredCommands.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSlashIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        pickCommand(filteredCommands[slashIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        update('');
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        pickCommand(filteredCommands[slashIndex]);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (streaming) onStop?.();
      else handleSend();
    }
  }

  const canSend    = currentValue.trim().length > 0 && !disabled;
  const showStop   = streaming;
  const sendActive = canSend || showStop;

  const plusButton: ReactNode = (
    <button
      type="button"
      className={styles.iconBtn}
      onClick={attachmentItems ? undefined : onAttach}
      disabled={disabled}
      aria-label="Add attachment"
    >
      <Icon icon={Plus} scale="body" />
    </button>
  );

  return (
    <div className={styles.composer}>
      {slashOpen && filteredCommands.length > 0 && (
        <div className={styles.slashMenu} role="listbox" aria-label="Slash commands">
          {filteredCommands.map((cmd, i) => (
            <button
              key={cmd.id}
              type="button"
              role="option"
              aria-selected={i === slashIndex}
              className={[styles.slashItem, i === slashIndex ? styles.slashItemActive : ''].filter(Boolean).join(' ')}
              onMouseEnter={() => setSlashIndex(i)}
              onMouseDown={e => e.preventDefault()}
              onClick={() => pickCommand(cmd)}
            >
              {cmd.icon && (
                <span className={styles.slashIcon}>
                  <Icon icon={cmd.icon} scale="caption" />
                </span>
              )}
              <span className={['text-body', styles.slashName].join(' ')}>/{cmd.name}</span>
              {cmd.description && (
                <span className={['text-caption', styles.slashDesc].join(' ')}>{cmd.description}</span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className={styles.row}>
        {attachmentItems && attachmentItems.length > 0 ? (
          <Dropdown trigger={plusButton} items={attachmentItems} align="start" />
        ) : (
          plusButton
        )}

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

      {modes && modes.length > 0 && (
        <div className={styles.modes}>
          {modes.map(m => {
            const active = currentModes.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                className={[styles.chip, active ? styles.chipActive : '', 'text-caption'].join(' ')}
                onClick={() => toggleMode(m.id)}
                aria-pressed={active}
              >
                {m.icon && <Icon icon={m.icon} scale="caption" />}
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
