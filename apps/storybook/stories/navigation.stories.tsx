import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, IconButton, Pagination, SegmentedControl, Stack } from '@medano-ui/react';

const meta = {
  title: 'Componentes/Navegación',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Migas: Story = {
  name: 'Breadcrumb',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Inicio', href: '#' },
        { label: 'Finanzas', href: '#' },
        { label: 'Julio 2026' },
      ]}
    />
  ),
};

function PaginacionDemo() {
  const [page, setPage] = useState(5);
  return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
}

export const Paginacion: Story = {
  render: () => <PaginacionDemo />,
};

export const Segmentado: Story = {
  name: 'SegmentedControl',
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 360 }}>
      <SegmentedControl
        label="Período"
        options={[
          { value: 'dia', label: 'Día' },
          { value: 'semana', label: 'Semana' },
          { value: 'mes', label: 'Mes' },
        ]}
        defaultValue="semana"
      />
      <SegmentedControl
        label="Tipo de movimiento"
        fullWidth
        options={[
          { value: 'todos', label: 'Todos' },
          { value: 'ingresos', label: 'Ingresos' },
          { value: 'gastos', label: 'Gastos' },
        ]}
      />
    </Stack>
  ),
};

export const BotonesDeIcono: Story = {
  name: 'IconButton',
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
        <IconButton key={variant} aria-label={`Acción ${variant}`} variant={variant}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </IconButton>
      ))}
    </Stack>
  ),
};
