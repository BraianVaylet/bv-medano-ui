import type { ReactElement, ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';

export interface MenuAction {
  label: ReactNode;
  onSelect: () => void;
  /** Acción destructiva: tinta teja. */
  danger?: boolean;
  disabled?: boolean;
  /** Dibuja un separador antes de este ítem. */
  separatorBefore?: boolean;
  /** Icono opcional (SVG currentColor). */
  icon?: ReactNode;
}

export interface MenuProps {
  /**
   * Elemento que abre el menú (debe renderizar un <button>).
   * Opcional para menús controlados por `open`/`onOpenChange`. GAPS #1.
   */
  trigger?: ReactElement<Record<string, unknown>>;
  items: MenuAction[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Menú de acciones contextual. */
export function Menu({ trigger, items, open, onOpenChange }: MenuProps) {
  return (
    <BaseMenu.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <BaseMenu.Trigger render={trigger} />}
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={6} align="start">
          <BaseMenu.Popup className="medano-menu">
            {items.map((item, index) => (
              <div key={index} role="presentation">
                {item.separatorBefore && (
                  <div className="medano-menu__separator" role="separator" aria-hidden="true" />
                )}
                <BaseMenu.Item
                  className="medano-menu__item"
                  data-danger={item.danger || undefined}
                  disabled={item.disabled}
                  onClick={item.onSelect}
                >
                  {item.icon && (
                    <span className="medano-menu__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </BaseMenu.Item>
              </div>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
