import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Alto de la pieza; por defecto una línea de texto. */
  height?: string | number;
  width?: string | number;
  /** Forma circular (avatares). */
  circle?: boolean;
}

/**
 * Placeholder de carga que "respira": pulso de opacidad de 4s, calmo.
 * Marcado aria-hidden — el contenedor debe anunciar el estado de carga.
 */
export function Skeleton({
  height,
  width,
  circle = false,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={['medano-skeleton', className].filter(Boolean).join(' ')}
      data-circle={circle || undefined}
      style={{ height, width, ...style }}
      {...rest}
    />
  );
}
