import type { HTMLAttributes, ReactNode } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Si se define, muestra botón de quitar. */
  onRemove?: () => void;
  /** Texto accesible del botón de quitar. */
  removeLabel?: string;
  selected?: boolean;
}

/** Valor concreto elegido por el usuario (filtro, tag). Contenedor: lleva esquina quieta. */
export function Chip({
  children,
  onRemove,
  removeLabel = 'Quitar',
  selected = false,
  className,
  ...rest
}: ChipProps) {
  return (
    <span
      className={['medano-chip', className].filter(Boolean).join(' ')}
      data-selected={selected || undefined}
      {...rest}
    >
      <span className="medano-chip__content">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="medano-chip__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
