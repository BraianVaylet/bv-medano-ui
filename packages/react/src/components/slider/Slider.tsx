import type { ReactNode } from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';

export interface SliderProps {
  label: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Muestra el valor actual junto al label. */
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  showValue = true,
  disabled,
  className,
}: SliderProps) {
  return (
    <BaseSlider.Root
      className={['medano-slider', className].filter(Boolean).join(' ')}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={defaultValue ?? min}
      onValueChange={onValueChange as never}
      disabled={disabled}
    >
      <div className="medano-slider__header">
        <BaseSlider.Label className="medano-slider__label">{label}</BaseSlider.Label>
        {showValue && <BaseSlider.Value className="medano-slider__value" />}
      </div>
      <BaseSlider.Control className="medano-slider__control">
        <BaseSlider.Track className="medano-slider__track">
          <BaseSlider.Indicator className="medano-slider__indicator" />
          <BaseSlider.Thumb className="medano-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
