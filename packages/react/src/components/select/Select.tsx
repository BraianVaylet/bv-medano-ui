import type { ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Field, useFieldA11y } from '../field/Field';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  help?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export function Select({
  label,
  options,
  placeholder = 'Elegí una opción',
  value,
  defaultValue,
  onValueChange,
  help,
  error,
  disabled,
  name,
  id: idProp,
  className,
}: SelectProps) {
  const a11y = useFieldA11y(idProp, help, error);
  return (
    <Field label={label} help={help} error={error} a11y={a11y} className={className}>
      <BaseSelect.Root
        items={options.map((option) => ({ value: option.value, label: option.label }))}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange as never}
        disabled={disabled}
        name={name}
      >
        <BaseSelect.Trigger
          id={a11y.id}
          className="medano-field__input medano-select__trigger"
          aria-labelledby={a11y.labelId}
          aria-invalid={error ? true : undefined}
          aria-describedby={a11y.describedBy}
        >
          <BaseSelect.Value placeholder={placeholder} />
          <BaseSelect.Icon className="medano-select__chevron">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={6}>
            <BaseSelect.Popup className="medano-select__popup">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="medano-select__item"
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="medano-select__indicator">
                    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 6.5 5 9l4.5-6"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </Field>
  );
}
