import { useId, type ReactNode } from 'react';

export interface FieldA11y {
  id: string;
  labelId: string;
  describedBy: string | undefined;
  helpId: string;
  errorId: string;
}

/** Ids estables para asociar control, ayuda y error. */
export function useFieldA11y(
  idProp: string | undefined,
  help: ReactNode,
  error: ReactNode,
): FieldA11y {
  const autoId = useId();
  const id = idProp ?? autoId;
  const labelId = `${id}-label`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return { id, labelId, describedBy, helpId, errorId };
}

export interface FieldProps {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  a11y: FieldA11y;
  className?: string;
  /** El control ya cableado con id/aria (input, textarea, etc.). */
  children: ReactNode;
}

/** Estructura común de campo de formulario: label + control + ayuda/error. */
export function Field({ label, help, error, a11y, className, children }: FieldProps) {
  return (
    <div className={['medano-field', className].filter(Boolean).join(' ')}>
      <label className="medano-field__label" id={a11y.labelId} htmlFor={a11y.id}>
        {label}
      </label>
      {children}
      {help && !error && (
        <p className="medano-field__help" id={a11y.helpId}>
          {help}
        </p>
      )}
      {error && (
        <p className="medano-field__error" id={a11y.errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
