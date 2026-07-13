import type { HTMLAttributes, ReactNode } from 'react';

export interface StatDelta {
  /** Texto del cambio, ej: "+12% vs mes pasado". */
  text: string;
  tone?: 'positive' | 'danger' | 'neutral';
}

export interface StatProps extends HTMLAttributes<HTMLDListElement> {
  label: ReactNode;
  value: ReactNode;
  delta?: StatDelta;
  /** Nota secundaria bajo el valor. */
  hint?: ReactNode;
}

/** KPI con semántica dl/dt/dd. Números tabulares para columnas alineadas. */
export function Stat({ label, value, delta, hint, className, ...rest }: StatProps) {
  return (
    <dl className={['medano-stat', className].filter(Boolean).join(' ')} {...rest}>
      <dt className="medano-stat__label">{label}</dt>
      <dd className="medano-stat__value">{value}</dd>
      {delta && (
        <dd className="medano-stat__delta" data-tone={delta.tone ?? 'neutral'}>
          {delta.text}
        </dd>
      )}
      {hint && <dd className="medano-stat__hint">{hint}</dd>}
    </dl>
  );
}
