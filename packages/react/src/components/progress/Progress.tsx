import type { HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. Sin valor = indeterminado (respira mientras espera). */
  value?: number;
  /** Texto para lectores de pantalla. */
  label: string;
}

const PROGRESS_MAX = 100;

export function Progress({ value, label, className, ...rest }: ProgressProps) {
  const clamped = value === undefined ? undefined : Math.min(PROGRESS_MAX, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={PROGRESS_MAX}
      aria-valuenow={clamped}
      className={['medano-progress', className].filter(Boolean).join(' ')}
      data-indeterminate={clamped === undefined || undefined}
      {...rest}
    >
      <div
        className="medano-progress__fill"
        style={clamped === undefined ? undefined : { inlineSize: `${clamped}%` }}
      />
    </div>
  );
}
