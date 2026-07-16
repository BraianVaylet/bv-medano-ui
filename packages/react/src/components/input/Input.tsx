import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Field, useFieldA11y } from '../field/Field';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label: ReactNode;
  /** Texto de ayuda debajo del campo. */
  help?: ReactNode;
  /** Mensaje de error: activa el estado inválido y lo anuncia con role=alert. */
  error?: ReactNode;
  /** Oculta el label visualmente (búsqueda con ícono, filas compactas). GAPS #3. */
  labelHidden?: boolean;
  /** Adorno al inicio del campo (ícono de búsqueda, símbolo de moneda). GAPS #4. */
  prefix?: ReactNode;
  /** Adorno al final del campo (unidad "%", "kg"). GAPS #4. */
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, help, error, labelHidden, prefix, suffix, id: idProp, className, ...rest },
  ref,
) {
  const a11y = useFieldA11y(idProp, help, error);
  const input = (
    <input
      ref={ref}
      id={a11y.id}
      className={
        prefix || suffix ? 'medano-field__input medano-field__input--bare' : 'medano-field__input'
      }
      aria-invalid={error ? true : undefined}
      aria-describedby={a11y.describedBy}
      {...rest}
    />
  );
  return (
    <Field
      label={label}
      help={help}
      error={error}
      a11y={a11y}
      labelHidden={labelHidden}
      className={className}
    >
      {prefix || suffix ? (
        <span className="medano-field__control" data-invalid={error ? true : undefined}>
          {prefix && (
            <span className="medano-field__affix medano-field__affix--prefix">{prefix}</span>
          )}
          {input}
          {suffix && (
            <span className="medano-field__affix medano-field__affix--suffix">{suffix}</span>
          )}
        </span>
      ) : (
        input
      )}
    </Field>
  );
});
