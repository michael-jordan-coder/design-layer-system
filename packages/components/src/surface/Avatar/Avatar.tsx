import * as RadixAvatar from '@radix-ui/react-avatar';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: AvatarSize;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt, name, size = 'md' }: AvatarProps) {
  const textClass = size === 'sm' ? 'text-caption' : 'text-body';

  return (
    <RadixAvatar.Root className={[styles.root, styles[size]].join(' ')}>
      {src && (
        <RadixAvatar.Image
          src={src}
          alt={alt ?? name}
          className={styles.image}
        />
      )}
      <RadixAvatar.Fallback className={[styles.fallback, textClass, 'font-semibold'].join(' ')} delayMs={300}>
        {initials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
