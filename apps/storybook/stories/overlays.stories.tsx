import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, DrawerClose, Menu, Popover, Stack, Switch } from '@medano-ui/react';

const meta = {
  title: 'Componentes/Flotantes',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const MenuDeAcciones: Story = {
  name: 'Menu',
  render: () => (
    <Menu
      trigger={<Button variant="secondary">Opciones</Button>}
      items={[
        { label: 'Editar', onSelect: () => undefined },
        { label: 'Duplicar', onSelect: () => undefined },
        { label: 'Eliminar', onSelect: () => undefined, danger: true, separatorBefore: true },
      ]}
    />
  ),
};

export const Popovers: Story = {
  name: 'Popover',
  render: () => (
    <Popover trigger={<Button variant="ghost">¿Cómo se calcula?</Button>} title="Ahorro mensual">
      Ingresos menos gastos del período, sobre el total de ingresos. Se actualiza cada 24 horas.
    </Popover>
  ),
};

export const PanelLateral: Story = {
  name: 'Drawer',
  render: () => (
    <Drawer
      trigger={<Button variant="secondary">Filtros</Button>}
      title="Filtros"
      description="Ajustá qué movimientos ver."
    >
      <Stack gap="0">
        <Switch label="Solo gastos" />
        <Switch label="Solo este mes" defaultChecked />
        <Switch label="Incluir transferencias" />
      </Stack>
      <div style={{ marginBlockStart: 'var(--medano-space-lg)' }}>
        <DrawerClose render={<Button fullWidth>Aplicar</Button>} />
      </div>
    </Drawer>
  ),
};
