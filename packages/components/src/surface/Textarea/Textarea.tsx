import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={[styles.textarea, 'text-body', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});
