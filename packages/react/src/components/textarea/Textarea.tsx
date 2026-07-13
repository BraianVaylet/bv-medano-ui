import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Field, useFieldA11y } from '../field/Field';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, help, error, id: idProp, className, rows = 3, ...rest },
  ref,
) {
  const a11y = useFieldA11y(idProp, help, error);
  return (
    <Field label={label} help={help} error={error} a11y={a11y} className={className}>
      <textarea
        ref={ref}
        id={a11y.id}
        rows={rows}
        className="medano-field__input medano-field__textarea"
        aria-invalid={error ? true : undefined}
        aria-describedby={a11y.describedBy}
        {...rest}
      />
    </Field>
  );
});
