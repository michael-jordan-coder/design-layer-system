import styles from './SourceRail.module.css';

export interface Source {
  id: string;
  number: number;
  title: string;
  domain: string;
  url: string;
  favicon?: string;
}

export interface SourceRailProps {
  sources: Source[];
  activeId?: string;
  onHover?: (id: string | null) => void;
}

export function SourceRail({ sources, activeId, onHover }: SourceRailProps) {
  return (
    <div className={styles.rail} role="list">
      {sources.map(s => (
        <a
          key={s.id}
          role="listitem"
          className={[styles.card, activeId === s.id ? styles.cardActive : ''].filter(Boolean).join(' ')}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => onHover?.(s.id)}
          onMouseLeave={() => onHover?.(null)}
        >
          <div className={styles.head}>
            <span className={styles.faviconWrap} aria-hidden="true">
              {s.favicon ? (
                <img className={styles.favicon} src={s.favicon} alt="" />
              ) : (
                <span className={styles.faviconFallback}>{s.domain.charAt(0).toUpperCase()}</span>
              )}
            </span>
            <span className={['text-caption', styles.domain].join(' ')}>{s.domain}</span>
            <span className={['text-caption', styles.number].join(' ')}>{s.number}</span>
          </div>
          <div className={[styles.title, 'text-caption'].join(' ')}>{s.title}</div>
        </a>
      ))}
    </div>
  );
}
