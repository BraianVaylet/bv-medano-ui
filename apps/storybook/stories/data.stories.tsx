import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Alert,
  AvatarGroup,
  Badge,
  Button,
  Card,
  EmptyState,
  Stack,
  Stat,
  Table,
} from '@medano-ui/react';

const meta = {
  title: 'Componentes/Datos',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Estadisticas: Story = {
  name: 'Stat (KPIs)',
  render: () => (
    <Stack direction="row" gap="md" wrap>
      <Card style={{ minWidth: 180 }}>
        <Stat
          label="Ingresos del mes"
          value="$482.300"
          delta={{ text: '+12% vs junio', tone: 'positive' }}
        />
      </Card>
      <Card style={{ minWidth: 180 }}>
        <Stat
          label="Gastos fijos"
          value="$210.900"
          delta={{ text: '+4% vs junio', tone: 'danger' }}
        />
      </Card>
      <Card style={{ minWidth: 180 }}>
        <Stat label="Ahorro" value="34%" hint="Meta: 30%" />
      </Card>
    </Stack>
  ),
};

interface Movimiento {
  id: number;
  fecha: string;
  concepto: string;
  categoria: string;
  monto: string;
}

const movimientos: Movimiento[] = [
  { id: 1, fecha: '10/07', concepto: 'Supermercado', categoria: 'Comida', monto: '-$42.300' },
  { id: 2, fecha: '09/07', concepto: 'Sueldo', categoria: 'Ingreso', monto: '+$820.000' },
  { id: 3, fecha: '08/07', concepto: 'Gimnasio', categoria: 'Salud', monto: '-$28.000' },
];

export const Tabla: Story = {
  render: () => (
    <Table
      caption="Últimos movimientos"
      columns={[
        { key: 'fecha', header: 'Fecha' },
        { key: 'concepto', header: 'Concepto' },
        {
          key: 'categoria',
          header: 'Categoría',
          render: (row: Movimiento) => <Badge>{row.categoria}</Badge>,
        },
        { key: 'monto', header: 'Monto', align: 'end' },
      ]}
      rows={movimientos}
      rowKey={(row) => row.id}
    />
  ),
};

export const TablaVacia: Story = {
  name: 'Tabla con estado vacío',
  render: () => (
    <Table
      caption="Últimos movimientos"
      columns={[{ key: 'concepto', header: 'Concepto' }]}
      rows={[] as Movimiento[]}
      rowKey={(row) => row.id}
      empty={
        <EmptyState
          title="Sin movimientos"
          description="Cuando cargues un gasto o ingreso aparece acá."
          action={<Button>Cargar el primero</Button>}
        />
      }
    />
  ),
};

export const Alertas: Story = {
  render: () => (
    <Stack gap="sm" style={{ maxWidth: 480 }}>
      <Alert title="Sincronizado" tone="positive">
        Tus datos están al día.
      </Alert>
      <Alert
        title="Pack por vencer"
        tone="caution"
        action={
          <Button size="sm" variant="secondary">
            Renovar
          </Button>
        }
      >
        Te quedan 2 días de plan Pro.
      </Alert>
      <Alert title="No pudimos guardar" tone="danger">
        Revisá tu conexión y reintentá.
      </Alert>
    </Stack>
  ),
};

export const Avatares: Story = {
  name: 'AvatarGroup',
  render: () => (
    <AvatarGroup
      max={3}
      items={[
        { name: 'Ana María' },
        { name: 'Braian Vaylet' },
        { name: 'Carla Suárez' },
        { name: 'Diego López' },
        { name: 'Emma Ruiz' },
      ]}
    />
  ),
};
