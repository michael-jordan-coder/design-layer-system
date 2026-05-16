import { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import styles from './CommandMenu.module.css';

export interface CommandItem {
  id: string;
  label: string;
  onSelect: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  placeholder?: string;
}

export function CommandMenu({ open, onOpenChange, groups, placeholder = 'Search...' }: CommandMenuProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-label="Command menu">
          <Command className={styles.command}>
            <Command.Input className={`${styles.input} text-body`} placeholder={placeholder} />
            <Command.List className={styles.list}>
              <Command.Empty className={`${styles.empty} text-caption`}>No results.</Command.Empty>
              {groups.map(group => (
                <Command.Group key={group.label} className={styles.group}>
                  <div className={`${styles.groupLabel} text-caption`}>{group.label}</div>
                  {group.items.map(item => (
                    <Command.Item
                      key={item.id}
                      className={`${styles.item} text-body`}
                      onSelect={() => { item.onSelect(); onOpenChange(false); }}
                    >
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
