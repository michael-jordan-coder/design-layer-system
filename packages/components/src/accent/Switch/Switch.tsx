import * as RadixSwitch from '@radix-ui/react-switch';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export function Switch({ checked, defaultChecked, onCheckedChange, disabled, id, name }: SwitchProps) {
  return (
    <RadixSwitch.Root
      className={styles.root}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      id={id}
      name={name}
    >
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );
}
