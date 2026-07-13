import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Card, Code, Container, Kbd, Link, Separator, Stack } from '@medano-ui/react';

const meta = {
  title: 'Componentes/Layout y texto',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Stacks: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 420 }}>
      <Stack direction="row" gap="sm" align="center">
        <Badge tone="accent">row</Badge>
        <Badge>gap sm</Badge>
        <Badge>align center</Badge>
      </Stack>
      <Separator />
      <Stack gap="xs">
        <Card density="compact">Columna con gap xs</Card>
        <Card density="compact">Cada pieza respira</Card>
      </Stack>
    </Stack>
  ),
};

export const Contenedor: Story = {
  render: () => (
    <Container size="sm">
      <Card>
        <p>
          Container centra el contenido con ancho de lectura y padding lateral seguro (safe-area
          incluida).
        </p>
      </Card>
    </Container>
  ),
};

export const TextoUtil: Story = {
  name: 'Kbd / Code / Link',
  render: () => (
    <Stack gap="md" style={{ maxWidth: 420 }}>
      <p>
        Abrí la paleta con <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>.
      </p>
      <p>
        Instalá con <Code>pnpm add @medano-ui/react</Code>.
      </p>
      <p>
        Leé la <Link href="#">guía de tokens</Link> o la{' '}
        <Link href="https://ejemplo.com" external>
          documentación externa
        </Link>
        .
      </p>
    </Stack>
  ),
};
