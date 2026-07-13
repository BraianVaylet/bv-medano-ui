import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Field, useFieldA11y } from '../field/Field';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: ReactNode;
  /** Texto de ayuda debajo del campo. */
  help?: ReactNode;
  /** Mensaje de error: activa el estado inválido y lo anuncia con role=alert. */
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, help, error, id: idProp, className, ...rest },
  ref,
) {
  const a11y = useFieldA11y(idProp, help, error);
  return (
    <Field label={label} help={help} error={error} a11y={a11y} className={className}>
      <input
        ref={ref}
        id={a11y.id}
        className="medano-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={a11y.describedBy}
        {...rest}
      />
    </Field>
  );
});
