import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Field, useFieldA11y } from '../field/Field';

export interface NativeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  labelHidden?: boolean;
  /** Opciones declarativas; alternativamente pasar `<option>` como children. */
  options?: NativeSelectOption[];
}

/**
 * `<select>` nativo con el estilo de campo medano. Para formularios simples con
 * `<option>` dinámicas donde el Select de Base UI es demasiado (GAPS #5).
 * La flecha propia y el padding derecho los aporta `select.medano-field__input`.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  { label, help, error, labelHidden, options, children, id: idProp, className, ...rest },
  ref,
) {
  const a11y = useFieldA11y(idProp, help, error);
  return (
    <Field
      label={label}
      help={help}
      error={error}
      a11y={a11y}
      labelHidden={labelHidden}
      className={className}
    >
      <select
        ref={ref}
        id={a11y.id}
        className="medano-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={a11y.describedBy}
        {...rest}
      >
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
    </Field>
  );
});
