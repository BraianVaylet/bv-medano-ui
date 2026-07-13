import type { ReactElement, ReactNode } from 'react';
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';

export interface DrawerProps {
  /** Elemento que abre el panel (debe renderizar un <button>). */
  trigger: ReactElement<Record<string, unknown>>;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Panel lateral (navegación secundaria, detalle, filtros). Para acciones de
 * confirmación en mobile usá <Dialog>, que ya es bottom sheet.
 */
export function Drawer({ trigger, title, description, children, open, onOpenChange }: DrawerProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange}>
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="medano-drawer__backdrop" />
        <BaseDrawer.Popup className="medano-drawer">
          <BaseDrawer.Title className="medano-drawer__title">{title}</BaseDrawer.Title>
          {description && (
            <BaseDrawer.Description className="medano-drawer__description">
              {description}
            </BaseDrawer.Description>
          )}
          <div className="medano-drawer__content">{children}</div>
        </BaseDrawer.Popup>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

/** Cierre declarativo para usar dentro del contenido del drawer. */
export const DrawerClose = BaseDrawer.Close;
