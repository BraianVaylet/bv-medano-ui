import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Progress, ToastProvider, Tooltip, useToast } from '@medano-ui/react';

const meta = {
  title: 'Componentes/Feedback',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ToastDemo() {
  const { show } = useToast();
  return (
    <div style={{ display: 'flex', gap: 'var(--medano-space-sm)', flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() =>
          show({ title: 'Guardado', description: 'Cambios sincronizados', tone: 'positive' })
        }
      >
        Éxito
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          show({ title: 'Pack por vencer', description: 'Quedan 2 días', tone: 'caution' })
        }
      >
        Precaución
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          show({
            title: 'No se pudo guardar',
            description: 'Reintentá en unos segundos',
            tone: 'danger',
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

export const Toasts: Story = {
  name: 'Toast (feedback ambiental)',
  render: () => <ToastDemo />,
};

export const Progreso: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-lg)', maxWidth: 360 }}>
      <div>
        <p style={{ fontSize: 'var(--medano-text-xs)', marginBlockEnd: 'var(--medano-space-xs)' }}>
          Determinado (65%)
        </p>
        <Progress label="Subiendo archivo" value={65} />
      </div>
      <div>
        <p style={{ fontSize: 'var(--medano-text-xs)', marginBlockEnd: 'var(--medano-space-xs)' }}>
          Indeterminado — respira, no corre
        </p>
        <Progress label="Procesando" />
      </div>
    </div>
  ),
};

export const Tooltips: Story = {
  render: () => (
    <div style={{ padding: 'var(--medano-space-3xl)' }}>
      <Tooltip content="Esta acción no se puede deshacer">
        <Button variant="danger">Eliminar cuenta</Button>
      </Tooltip>
    </div>
  ),
};
