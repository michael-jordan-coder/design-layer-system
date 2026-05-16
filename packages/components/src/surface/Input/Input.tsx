import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: LucideIcon;
  trailing?: ReactNode;
  label?: string;
  hint?: string;
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, trailing, label, hint, size = 'md', className, id, ...rest },
  ref,
) {
  const textClass = size === 'sm' ? 'text-caption' : 'text-body';

  const field = (
    <div className={[styles.wrapper, styles[size]].join(' ')}>
      {icon && (
        <span className={styles.icon}>
          <Icon icon={icon} scale="caption" />
        </span>
      )}
      <input
        ref={ref}
        id={id}
        className={[styles.input, textClass].join(' ')}
        {...rest}
      />
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );

  if (!label && !hint) return <div className={className}>{field}</div>;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={[styles.label, 'text-caption'].join(' ')}>{label}</label>
      )}
      {field}
      {hint && <span className={[styles.hint, 'text-caption'].join(' ')}>{hint}</span>}
    </div>
  );
});
