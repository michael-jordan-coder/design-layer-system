import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, label, hint, id, ...rest },
  ref,
) {
  const field = (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      className={[styles.textarea, 'text-body'].join(' ')}
      {...rest}
    />
  );

  if (!label && !hint) return <div className={className}>{field}</div>;

  return (
    <div className={[styles.fieldGroup, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={[styles.label, 'text-caption'].join(' ')}>{label}</label>
      )}
      {field}
      {hint && <span className={[styles.hint, 'text-caption'].join(' ')}>{hint}</span>}
    </div>
  );
});
