import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  label?: string;
  hint?: string;
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = 'Select…',
  disabled,
  id,
  name,
  label,
  hint,
}: SelectProps) {
  const select = (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger id={id} className={[styles.trigger, 'text-body'].join(' ')}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <Icon icon={ChevronDown} scale="caption" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
          <RadixSelect.Viewport className={styles.viewport}>
            {options.map(opt => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={[styles.item, 'text-caption'].join(' ')}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className={styles.indicator}>
                  <Icon icon={Check} scale="caption" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );

  if (!label && !hint) return select;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={[styles.label, 'text-caption'].join(' ')}>{label}</label>
      )}
      {select}
      {hint && <span className={[styles.hint, 'text-caption'].join(' ')}>{hint}</span>}
    </div>
  );
}
