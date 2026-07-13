import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Dialog,
  DialogClose,
  Skeleton,
  Spinner,
  Tabs,
} from '@medano-ui/react';

const meta = {
  title: 'Componentes/Superficies',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Cards: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-md)', maxWidth: 420 }}>
      {([1, 2, 3] as const).map((elevation) => (
        <Card key={elevation} elevation={elevation}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4>Elevación {elevation}</h4>
              <p
                style={{ color: 'var(--medano-ink-secondary)', fontSize: 'var(--medano-text-xs)' }}
              >
                Más cerca del usuario, más luminosa.
              </p>
            </div>
            <Badge tone={elevation === 3 ? 'accent' : 'neutral'}>surface-{elevation + 1}</Badge>
          </div>
        </Card>
      ))}
    </div>
  ),
};

export const EstadoDeCarga: Story = {
  name: 'Estado de carga (respiración)',
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <div style={{ display: 'flex', gap: 'var(--medano-space-sm)', alignItems: 'center' }}>
        <Skeleton circle width={44} />
        <div style={{ flex: 1, display: 'grid', gap: 'var(--medano-space-xs)' }}>
          <Skeleton width="60%" />
          <Skeleton width="90%" />
        </div>
        <Spinner label="Cargando contenido" />
      </div>
    </Card>
  ),
};

export const DialogoSheet: Story = {
  name: 'Dialog / BottomSheet',
  render: () => (
    <Dialog
      trigger={<Button>Cerrar sesión</Button>}
      title="¿Cerrar sesión?"
      description="Vas a tener que volver a ingresar tus credenciales."
    >
      <div
        style={{
          display: 'flex',
          gap: 'var(--medano-space-sm)',
          marginBlockStart: 'var(--medano-space-sm)',
        }}
      >
        <DialogClose
          render={
            <Button variant="danger" fullWidth>
              Cerrar sesión
            </Button>
          }
        />
        <DialogClose
          render={
            <Button variant="secondary" fullWidth>
              Cancelar
            </Button>
          }
        />
      </div>
    </Dialog>
  ),
};

export const Acordeon: Story = {
  name: 'Accordion',
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Accordion
        items={[
          {
            value: 'que-es',
            title: '¿Qué es la esquina quieta?',
            content:
              'Todo contenedor de contenido lleva tres esquinas generosas y una casi plana: el punto donde el ojo ancla.',
          },
          {
            value: 'por-que',
            title: '¿Por qué sin sombras?',
            content:
              'En dark mode la profundidad natural es la luz: subir de superficie, no proyectar.',
          },
          { value: 'off', title: 'Deshabilitado', content: '—', disabled: true },
        ]}
      />
    </div>
  ),
};

export const ChipsYAvatares: Story = {
  name: 'Chip / Avatar',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-lg)' }}>
      <div style={{ display: 'flex', gap: 'var(--medano-space-xs)', flexWrap: 'wrap' }}>
        <Chip>React</Chip>
        <Chip selected>Astro</Chip>
        <Chip onRemove={() => undefined}>React Native</Chip>
      </div>
      <div style={{ display: 'flex', gap: 'var(--medano-space-sm)', alignItems: 'center' }}>
        <Avatar name="Braian Vaylet" size="sm" />
        <Avatar name="Braian Vaylet" />
        <Avatar name="Ana María" size="lg" />
      </div>
    </div>
  ),
};

export const Pestanas: Story = {
  name: 'Tabs',
  render: () => (
    <Tabs
      items={[
        { value: 'hoy', label: 'Hoy', content: <p>Resumen del día.</p> },
        { value: 'semana', label: 'Semana', content: <p>Los últimos 7 días.</p> },
        { value: 'mes', label: 'Mes', content: <p>Vista mensual.</p> },
      ]}
    />
  ),
};
