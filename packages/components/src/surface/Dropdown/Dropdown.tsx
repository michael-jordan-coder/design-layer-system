import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}

export interface DropdownSeparator {
  type: 'separator';
}

export type DropdownEntry = DropdownItem | DropdownSeparator;

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownEntry[];
  align?: 'start' | 'center' | 'end';
}

function isSeparator(entry: DropdownEntry): entry is DropdownSeparator {
  return 'type' in entry && entry.type === 'separator';
}

export function Dropdown({ trigger, items, align = 'start' }: DropdownProps) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>
        {trigger}
      </RadixDropdown.Trigger>

      <RadixDropdown.Portal>
        <RadixDropdown.Content
          className={styles.content}
          align={align}
          sideOffset={4}
        >
          {items.map((entry, i) => {
            if (isSeparator(entry)) {
              return <RadixDropdown.Separator key={i} className={styles.separator} />;
            }
            return (
              <RadixDropdown.Item
                key={entry.id}
                className={[styles.item, 'text-caption', entry.danger ? styles.danger : ''].filter(Boolean).join(' ')}
                disabled={entry.disabled}
                onSelect={entry.onSelect}
              >
                {entry.icon && <span className={styles.icon}>{entry.icon}</span>}
                {entry.label}
              </RadixDropdown.Item>
            );
          })}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
}
