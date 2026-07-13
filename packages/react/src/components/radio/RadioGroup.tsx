import { useId, type ChangeEvent, type ReactNode } from 'react';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Título del grupo (legend). */
  label: ReactNode;
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/** Grupo de radios nativos: fieldset + legend, teclado y semántica gratis. */
export function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? autoName;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <fieldset className={['medano-radio-group', className].filter(Boolean).join(' ')}>
      <legend className="medano-field__label">{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="medano-radio">
          <input
            type="radio"
            className="medano-radio__input"
            name={groupName}
            value={option.value}
            disabled={option.disabled}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={defaultValue === undefined ? undefined : defaultValue === option.value}
            onChange={handleChange}
          />
          <span className="medano-radio__dot" aria-hidden="true" />
          <span className="medano-radio__label">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
