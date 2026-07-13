import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type SpaceToken = '0' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Columna por defecto: mobile-first. */
  direction?: 'row' | 'column';
  gap?: SpaceToken;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  children: ReactNode;
}

/** Apila con ritmo de la escala de espaciado. Cubre HStack/VStack. */
export function Stack({
  direction = 'column',
  gap = 'md',
  align,
  justify,
  wrap = false,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <div
      className={['medano-stack', className].filter(Boolean).join(' ')}
      style={{
        flexDirection: direction,
        gap: `var(--medano-space-${gap})`,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Ancho máximo de lectura/layout. */
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/** Centra el contenido con padding lateral seguro (safe-area incluida). */
export function Container({ size = 'md', className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={['medano-container', className].filter(Boolean).join(' ')}
      data-size={size}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Puramente visual (default): oculto a lectores de pantalla. */
  decorative?: boolean;
}

/** Línea de división sutil — último recurso: preferí espacio o superficie. */
export function Separator({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...rest
}: SeparatorProps) {
  return (
    <div
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={['medano-separator', className].filter(Boolean).join(' ')}
      data-orientation={orientation}
      {...rest}
    />
  );
}
