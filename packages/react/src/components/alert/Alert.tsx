import type { HTMLAttributes, ReactNode } from 'react';

export type AlertTone = 'info' | 'positive' | 'caution' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title: ReactNode;
  children?: ReactNode;
  /** Icono opcional a la izquierda (SVG currentColor). */
  icon?: ReactNode;
  /** Acción opcional (ej: botón "Reintentar"). */
  action?: ReactNode;
}

/**
 * Banner en flujo. Feedback ambiental: filo de color lateral, sin fondos que
 * griten. Solo `danger` interrumpe a lectores de pantalla (role=alert).
 */
export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  action,
  className,
  ...rest
}: AlertProps) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={['medano-alert', className].filter(Boolean).join(' ')}
      data-tone={tone}
      {...rest}
    >
      {icon && (
        <span className="medano-alert__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="medano-alert__body">
        <p className="medano-alert__title">{title}</p>
        {children && <div className="medano-alert__description">{children}</div>}
      </div>
      {action && <div className="medano-alert__action">{action}</div>}
    </div>
  );
}
