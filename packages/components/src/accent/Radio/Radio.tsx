import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import type { ReactNode } from 'react';
import styles from './Radio.module.css';

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  name?: string;
  disabled?: boolean;
}

export function RadioGroup({ value, defaultValue, onValueChange, options, name, disabled }: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      className={styles.group}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
    >
      {options.map(opt => (
        <label key={opt.value} className={styles.row}>
          <RadixRadioGroup.Item
            className={styles.item}
            value={opt.value}
            disabled={opt.disabled}
          >
            <RadixRadioGroup.Indicator className={styles.indicator} />
          </RadixRadioGroup.Item>
          <div className={styles.label}>
            <span className="text-body">{opt.label}</span>
            {opt.description && (
              <span className={['text-caption', styles.description].join(' ')}>{opt.description}</span>
            )}
          </div>
        </label>
      ))}
    </RadixRadioGroup.Root>
  );
}
