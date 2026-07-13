import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Icono/ilustración (SVG currentColor). */
  icon?: ReactNode;
  /** Acción principal (ej: <Button>Crear el primero</Button>). */
  action?: ReactNode;
}

/**
 * Estado vacío diseñado — parte del producto, no una excepción
 * (principio "calma operativa").
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={['medano-empty', className].filter(Boolean).join(' ')} {...rest}>
      {icon && (
        <span className="medano-empty__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <p className="medano-empty__title">{title}</p>
      {description && <p className="medano-empty__description">{description}</p>}
      {action && <div className="medano-empty__action">{action}</div>}
    </div>
  );
}
