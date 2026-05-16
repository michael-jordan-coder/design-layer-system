import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Icon } from '../../primitives/Icon/Icon';
import styles from './Table.module.css';

export interface Column<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T & string], row: T) => ReactNode;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  pageSize?: number;
}

type SortDir = 'asc' | 'desc';

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  pageSize = 10,
}: TableProps<T>) {
  const [page, setPage]         = useState(1);
  const [sortKey, setSortKey]   = useState<(keyof T & string) | null>(null);
  const [sortDir, setSortDir]   = useState<SortDir>('asc');

  function handleSort(key: keyof T & string) {
    if (sortKey === key) {
      if (sortDir === 'asc') { setSortDir('desc'); }
      else { setSortKey(null); setSortDir('asc'); }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * pageSize;
  const pageData = sorted.slice(start, start + pageSize);

  const rangeStart = data.length === 0 ? 0 : start + 1;
  const rangeEnd = Math.min(start + pageSize, data.length);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={[styles.th, 'text-caption', col.sortable ? styles.sortable : ''].filter(Boolean).join(' ')}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className={styles.thInner}>
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <Icon icon={sortDir === 'asc' ? ChevronUp : ChevronDown} scale="caption" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={[styles.empty, 'text-caption'].join(' ')}>
                No data
              </td>
            </tr>
          ) : (
            pageData.map(row => (
              <tr key={rowKey(row)} className={styles.tr}>
                {columns.map(col => (
                  <td key={col.key} className={[styles.td, 'text-caption'].join(' ')}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.footer}>
        <span className="text-caption">
          Showing {rangeStart}–{rangeEnd} of {data.length}
        </span>
        <div className={styles.pagination}>
          <button
            className={[styles.pageBtn, 'text-caption'].join(' ')}
            onClick={() => setPage(p => p - 1)}
            disabled={clampedPage === 1}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>
          <span className="text-caption">Page {clampedPage} of {totalPages}</span>
          <button
            className={[styles.pageBtn, 'text-caption'].join(' ')}
            onClick={() => setPage(p => p + 1)}
            disabled={clampedPage === totalPages}
            aria-label="Next page"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
