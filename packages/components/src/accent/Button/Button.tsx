import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size    = 'md',
  icon,
  children,
  className,
  ...rest
}: ButtonProps) {
  const textClass = size === 'sm' ? 'text-caption' : 'text-body';
  const iconScale = size === 'lg' ? 'body' : 'caption';

  return (
    <button
      className={[
        styles.button,
        styles[variant],
        styles[size],
        textClass,
        'font-semibold',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon && <Icon icon={icon} scale={iconScale} />}
      {children}
    </button>
  );
}
