import type { ReactNode } from 'react';
import { NumberField } from '@base-ui/react/number-field';
import { Field, useFieldA11y } from '../field/Field';

export interface NumberInputProps {
  label: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  help?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

/** Campo numérico con stepper (+/−) de objetivos táctiles completos. */
export function NumberInput({
  label,
  min,
  max,
  step,
  value,
  defaultValue,
  onValueChange,
  help,
  error,
  disabled,
  name,
  id: idProp,
  className,
}: NumberInputProps) {
  const a11y = useFieldA11y(idProp, help, error);
  return (
    <Field label={label} help={help} error={error} a11y={a11y} className={className}>
      <NumberField.Root
        id={a11y.id}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange as never}
        disabled={disabled}
        name={name}
      >
        <NumberField.Group className="medano-number">
          <NumberField.Decrement className="medano-number__step" aria-label="Restar">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </NumberField.Decrement>
          <NumberField.Input
            className="medano-field__input medano-number__input"
            aria-invalid={error ? true : undefined}
            aria-describedby={a11y.describedBy}
          />
          <NumberField.Increment className="medano-number__step" aria-label="Sumar">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 2.5v7M2.5 6h7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </Field>
  );
}
