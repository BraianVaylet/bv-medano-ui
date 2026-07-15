import type { ReactElement, ReactNode } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';

export interface DialogProps {
  /**
   * Elemento que abre el diálogo. Debe renderizar un <button> nativo
   * (ej: <Button>); Base UI le inyecta los handlers y aria-*.
   * Opcional cuando el diálogo se controla con `open`/`onOpenChange`
   * (apertura programática, sin botón dueño). GAPS #1.
   */
  trigger?: ReactElement<Record<string, unknown>>;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * En mobile aparece como bottom sheet (desliza desde abajo, pulgar primero);
 * en pantallas medianas+ se centra. El fondo se esfuma (blur), como aire caliente sobre la arena.
 */
export function Dialog({ trigger, title, description, children, open, onOpenChange }: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="medano-dialog__backdrop" />
        <BaseDialog.Popup className="medano-dialog">
          <BaseDialog.Title className="medano-dialog__title">{title}</BaseDialog.Title>
          {description && (
            <BaseDialog.Description className="medano-dialog__description">
              {description}
            </BaseDialog.Description>
          )}
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

/** Cierre declarativo para usar dentro del contenido del diálogo. */
export const DialogClose = BaseDialog.Close;
