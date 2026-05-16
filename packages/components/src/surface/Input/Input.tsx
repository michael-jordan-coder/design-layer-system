import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: LucideIcon;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, trailing, className, ...rest },
  ref,
) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {icon && (
        <span className={styles.icon}>
          <Icon icon={icon} scale="caption" />
        </span>
      )}
      <input
        ref={ref}
        className={[styles.input, 'text-body'].join(' ')}
        {...rest}
      />
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );
});
