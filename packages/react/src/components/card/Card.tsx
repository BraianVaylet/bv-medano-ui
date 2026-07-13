import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nivel de elevación (la elevación es luz): 1 contenido, 2 destacado,
   * 3 flotante. Sube la luminancia de superficie, nunca dibuja sombra.
   */
  elevation?: 1 | 2 | 3;
  /** Padding interno cómodo (por defecto) o compacto. */
  density?: 'comfortable' | 'compact';
  children: ReactNode;
}

export function Card({
  elevation = 1,
  density = 'comfortable',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={['medano-card', className].filter(Boolean).join(' ')}
      data-elevation={elevation}
      data-density={density}
      {...rest}
    >
      {children}
    </div>
  );
}
