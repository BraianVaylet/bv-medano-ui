import { useId, type ReactNode } from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';

export interface SwitchProps {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export function Switch({ label, className, ...rest }: SwitchProps) {
  const labelId = useId();
  return (
    <label className={['medano-switch-row', className].filter(Boolean).join(' ')}>
      <span className="medano-switch-row__label" id={labelId}>
        {label}
      </span>
      <BaseSwitch.Root className="medano-switch" aria-labelledby={labelId} {...rest}>
        <BaseSwitch.Thumb className="medano-switch__thumb" />
      </BaseSwitch.Root>
    </label>
  );
}
