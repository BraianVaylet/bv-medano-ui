import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@medano-ui/react';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Continuar' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};

export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--medano-space-sm)', flexWrap: 'wrap' }}>
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="danger">Eliminar</Button>
    </div>
  ),
};

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--medano-space-sm)', alignItems: 'center' }}>
      <Button size="sm">Pequeño</Button>
      <Button size="md">Mediano (44px)</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

export const Cargando: Story = {
  args: { loading: true, children: 'Guardando' },
};

export const Deshabilitado: Story = {
  args: { disabled: true, children: 'No disponible' },
};

export const AnchoCompleto: Story = {
  name: 'Ancho completo (mobile)',
  args: { fullWidth: true, size: 'lg', children: 'Confirmar pedido' },
};
