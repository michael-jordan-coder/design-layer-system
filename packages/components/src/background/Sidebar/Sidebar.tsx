import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Sidebar.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface SidebarProps {
  logo?: ReactNode;
  items: NavItem[];
  footer?: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

function NavButton({ item, active, collapsed, onSelect }: { item: NavItem; active: boolean; collapsed: boolean; onSelect?: (id: string) => void }) {
  return (
    <button
      className={[styles.item, 'text-caption', active ? styles.active : '', collapsed ? styles.itemCollapsed : ''].filter(Boolean).join(' ')}
      onClick={() => onSelect?.(item.id)}
    >
      {item.icon ? <Icon icon={item.icon} scale="caption" /> : <span className={styles.dot} />}
      {!collapsed && <span className={styles.label}>{item.label}</span>}
    </button>
  );
}

export function Sidebar({ logo, items, footer, activeId, onSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={[styles.sidebar, collapsed ? styles.collapsed : ''].filter(Boolean).join(' ')}>

      <div className={styles.header}>
        {!collapsed && <div className={styles.logo}>{logo}</div>}
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon icon={collapsed ? PanelLeftOpen : PanelLeftClose} scale="body" />
        </button>
      </div>

      <nav className={styles.nav}>
        {items.map(item => (
          <NavButton key={item.id} item={item} active={activeId === item.id} collapsed={collapsed} onSelect={onSelect} />
        ))}
      </nav>

      {footer && footer.length > 0 && (
        <div className={styles.footer}>
          {footer.map(item => (
            <NavButton key={item.id} item={item} active={activeId === item.id} collapsed={collapsed} onSelect={onSelect} />
          ))}
        </div>
      )}
    </aside>
  );
}
