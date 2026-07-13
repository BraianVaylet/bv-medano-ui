import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Checkbox,
  Input,
  NumberInput,
  PinInput,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
} from '@medano-ui/react';

const meta = {
  title: 'Componentes/Formularios',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Campos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-lg)', maxWidth: 360 }}>
      <Input label="Correo" type="email" placeholder="vos@ejemplo.com" />
      <Input label="Nombre" help="Como figura en tu documento" />
      <Input label="Contraseña" type="password" error="Mínimo 8 caracteres" defaultValue="123" />
      <Input label="Deshabilitado" disabled placeholder="Sin acceso" />
    </div>
  ),
};

export const Interruptores: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 360 }}>
      <Switch label="Notificaciones" defaultChecked />
      <Switch label="Modo ambiente" />
      <Switch label="Sincronización (deshabilitado)" disabled />
    </div>
  ),
};

export const AreaDeTexto: Story = {
  name: 'Textarea',
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Textarea label="Comentarios" help="Contanos qué mejorarías" placeholder="Escribí acá…" />
    </div>
  ),
};

export const Selecciones: Story = {
  name: 'Checkbox / Radio / Select',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-lg)', maxWidth: 360 }}>
      <div style={{ display: 'grid' }}>
        <Checkbox label="Acepto los términos" />
        <Checkbox label="Recibir novedades" defaultChecked />
      </div>
      <RadioGroup
        label="Plan"
        defaultValue="pro"
        options={[
          { value: 'basico', label: 'Básico' },
          { value: 'pro', label: 'Pro' },
          { value: 'equipo', label: 'Equipo', disabled: true },
        ]}
      />
      <Select
        label="País"
        options={[
          { value: 'ar', label: 'Argentina' },
          { value: 'uy', label: 'Uruguay' },
          { value: 'cl', label: 'Chile' },
        ]}
      />
    </div>
  ),
};

export const Numericos: Story = {
  name: 'Slider / NumberInput / PinInput',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-lg)', maxWidth: 360 }}>
      <Slider label="Presupuesto mensual" defaultValue={65} />
      <NumberInput label="Cuotas" defaultValue={3} min={1} max={24} />
      <div>
        <p
          style={{
            fontSize: 'var(--medano-text-xs)',
            fontWeight: 500,
            color: 'var(--medano-ink-secondary)',
            marginBlockEnd: 'var(--medano-space-2xs)',
          }}
        >
          Código de verificación
        </p>
        <PinInput label="Código de verificación" length={6} />
      </div>
    </div>
  ),
};
