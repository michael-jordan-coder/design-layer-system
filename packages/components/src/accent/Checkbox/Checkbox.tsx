import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, id, name }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className={styles.root}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={v => onCheckedChange?.(v === true)}
      disabled={disabled}
      id={id}
      name={name}
    >
      <RadixCheckbox.Indicator className={styles.indicator}>
        <Icon icon={Check} scale="caption" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
