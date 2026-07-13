import { OTPField } from '@base-ui/react/otp-field';

export interface PinInputProps {
  /** Nombre accesible del grupo. */
  label: string;
  /** Cantidad de dígitos. */
  length?: number;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Se dispara cuando el código está completo. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_PIN_LENGTH = 6;

/** Código de verificación (OTP): autocompleta desde SMS, pega y avanza solo. */
export function PinInput({
  label,
  length = DEFAULT_PIN_LENGTH,
  defaultValue,
  value,
  onValueChange,
  onComplete,
  disabled,
  className,
}: PinInputProps) {
  return (
    <OTPField.Root
      className={['medano-pin', className].filter(Boolean).join(' ')}
      role="group"
      aria-label={label}
      length={length}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(nextValue: string) => {
        onValueChange?.(nextValue);
        if (nextValue.length === length) onComplete?.(nextValue);
      }}
    >
      {Array.from({ length }, (_, index) => (
        <OTPField.Input key={index} className="medano-pin__digit" />
      ))}
    </OTPField.Root>
  );
}
