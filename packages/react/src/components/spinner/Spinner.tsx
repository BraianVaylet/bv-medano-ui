import type { HTMLAttributes } from 'react';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Texto para lectores de pantalla. */
  label?: string;
}

export function Spinner({ size = 'md', label = 'Cargando', className, ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={['medano-spinner', className].filter(Boolean).join(' ')}
      data-size={size}
      {...rest}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
