import type { LucideIcon } from 'lucide-react';
import styles from './Icon.module.css';

export type IconScale = 'caption' | 'body' | 'body-large' | 'heading' | 'title' | 'display';

export interface IconProps {
  icon: LucideIcon;
  scale?: IconScale;
  className?: string;
}

export function Icon({ icon: LucideIconComponent, scale = 'body', className }: IconProps) {
  return (
    <LucideIconComponent
      className={[styles.icon, styles[scale], className].filter(Boolean).join(' ')}
      strokeWidth="var(--icon-stroke)"
    />
  );
}
