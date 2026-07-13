import type { ReactElement, ReactNode } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';

export interface PopoverProps {
  /** Elemento que abre el popover (debe renderizar un <button>). */
  trigger: ReactElement<Record<string, unknown>>;
  title?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Contenido flotante anclado: aclaraciones, mini-formularios, filtros. */
export function Popover({ trigger, title, children, open, onOpenChange }: PopoverProps) {
  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange}>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8}>
          <BasePopover.Popup className="medano-popover">
            {title && (
              <BasePopover.Title className="medano-popover__title">{title}</BasePopover.Title>
            )}
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
