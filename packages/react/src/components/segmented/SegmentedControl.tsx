import { useId, type ChangeEvent, type ReactNode } from 'react';

export interface SegmentOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Nombre accesible del grupo. */
  label: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Ocupa todo el ancho repartiendo segmentos iguales (patrón mobile). */
  fullWidth?: boolean;
  name?: string;
  className?: string;
}

/**
 * Selección única visible (vista, filtro, período). Radios nativos por
 * debajo: teclado y semántica gratis; siempre hay exactamente uno activo.
 */
export function SegmentedControl({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  fullWidth = false,
  name,
  className,
}: SegmentedControlProps) {
  const autoName = useId();
  const groupName = name ?? autoName;
  const fallback = defaultValue ?? options[0]?.value;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <fieldset
      className={['medano-segmented', className].filter(Boolean).join(' ')}
      data-full-width={fullWidth || undefined}
    >
      <legend className="medano-visually-hidden">{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="medano-segmented__segment">
          <input
            type="radio"
            className="medano-segmented__input"
            name={groupName}
            value={option.value}
            disabled={option.disabled}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={
              value === undefined && fallback !== undefined ? fallback === option.value : undefined
            }
            onChange={handleChange}
          />
          <span className="medano-segmented__face">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
