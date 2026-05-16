import * as RadixTabs from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ items, value, defaultValue, onValueChange }: TabsProps) {
  return (
    <RadixTabs.Root
      className={styles.root}
      value={value}
      defaultValue={defaultValue ?? items[0]?.id}
      onValueChange={onValueChange}
    >
      <RadixTabs.List className={styles.list}>
        {items.map(item => (
          <RadixTabs.Trigger
            key={item.id}
            value={item.id}
            className={[styles.trigger, 'text-caption', 'font-semibold'].join(' ')}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map(item => (
        <RadixTabs.Content key={item.id} value={item.id} className={styles.content}>
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
