import type { HTMLAttributes } from 'react';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Páginas visibles a cada lado de la actual. */
  siblingCount?: number;
}

const ELLIPSIS = '…' as const;

/** Ventana de páginas con elipsis: 1 … 4 [5] 6 … 20. */
export function pageItems(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | typeof ELLIPSIS)[] {
  const windowStart = Math.max(2, page - siblingCount);
  const windowEnd = Math.min(totalPages - 1, page + siblingCount);
  const items: (number | typeof ELLIPSIS)[] = [1];
  if (windowStart > 2) items.push(ELLIPSIS);
  for (let current = windowStart; current <= windowEnd; current++) items.push(current);
  if (windowEnd < totalPages - 1) items.push(ELLIPSIS);
  if (totalPages > 1) items.push(totalPages);
  return items;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  const items = pageItems(page, totalPages, siblingCount);
  return (
    <nav
      aria-label="Paginación"
      className={['medano-pagination', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <button
        type="button"
        className="medano-pagination__button"
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M7.5 2.5 4 6l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {items.map((item, index) =>
        item === ELLIPSIS ? (
          <span key={`gap-${index}`} className="medano-pagination__ellipsis" aria-hidden="true">
            {ELLIPSIS}
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className="medano-pagination__button"
            data-current={item === page || undefined}
            aria-current={item === page ? 'page' : undefined}
            aria-label={`Página ${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="medano-pagination__button"
        aria-label="Página siguiente"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M4.5 2.5 8 6l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}
