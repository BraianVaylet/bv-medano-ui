import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Fundamentos/Sistema',
} satisfies Meta;

export default meta;
type Story = StoryObj;

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--medano-space-sm)',
  marginBlockEnd: 'var(--medano-space-lg)',
};

function Swatch({ varName, label }: { varName: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', fontSize: 'var(--medano-text-2xs)' }}>
      <div
        style={{
          width: 72,
          height: 56,
          borderRadius: 'var(--medano-radius-sm)',
          background: `var(${varName})`,
          boxShadow: 'var(--medano-halo-edge)',
          marginBlockEnd: 'var(--medano-space-2xs)',
        }}
      />
      <code>{label}</code>
    </div>
  );
}

export const Color: Story = {
  render: () => (
    <div>
      <h2>La elevación es luz</h2>
      <p style={{ color: 'var(--medano-ink-secondary)', marginBlock: 'var(--medano-space-sm)' }}>
        Ocho niveles de superficie. Nada de bordes grises ni drop-shadows: para separar, subí de
        superficie.
      </p>
      <div style={rowStyle}>
        {Array.from({ length: 8 }, (_, level) => (
          <Swatch key={level} varName={`--medano-surface-${level}`} label={`surface-${level}`} />
        ))}
      </div>
      <h3 style={{ marginBlockEnd: 'var(--medano-space-sm)' }}>Tinta</h3>
      <div style={rowStyle}>
        {['primary', 'secondary', 'muted', 'ghost'].map((name) => (
          <p key={name} style={{ color: `var(--medano-ink-${name})` }}>
            ink-{name}
          </p>
        ))}
      </div>
      <h3 style={{ marginBlockEnd: 'var(--medano-space-sm)' }}>Acento y feedback</h3>
      <div style={rowStyle}>
        <Swatch varName="--medano-accent-base" label="accent" />
        <Swatch varName="--medano-accent-strong" label="accent-strong" />
        <Swatch varName="--medano-feedback-positive" label="positive" />
        <Swatch varName="--medano-feedback-caution" label="caution" />
        <Swatch varName="--medano-feedback-danger" label="danger" />
      </div>
    </div>
  ),
};

export const EsquinaQuieta: Story = {
  name: 'Esquina quieta',
  render: () => (
    <div style={{ maxWidth: 520, display: 'grid', gap: 'var(--medano-space-md)' }}>
      <h2>Contenedor vs. acción, de un vistazo</h2>
      <p style={{ color: 'var(--medano-ink-secondary)' }}>
        Los contenedores de contenido llevan 3 esquinas generosas + 1 casi plana en start-start (se
        invierte sola en RTL). Los controles de acción quedan simétricos.
      </p>
      <div style={rowStyle}>
        {(['sm', 'md', 'lg'] as const).map((radius) => (
          <div
            key={radius}
            style={{
              width: 120,
              height: 80,
              background: 'var(--medano-surface-3)',
              boxShadow: 'var(--medano-halo-edge)',
              borderRadius: `var(--medano-radius-${radius})`,
              borderStartStartRadius: 'var(--medano-radius-quiet)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 'var(--medano-text-2xs)',
            }}
          >
            <code>contenedor {radius}</code>
          </div>
        ))}
        <div
          style={{
            width: 120,
            height: 44,
            alignSelf: 'center',
            background: 'var(--medano-accent-base)',
            color: 'var(--medano-ink-on-accent)',
            borderRadius: 'var(--medano-radius-md)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 'var(--medano-text-2xs)',
            fontWeight: 500,
          }}
        >
          acción (simétrica)
        </div>
      </div>
    </div>
  ),
};

export const Tipografia: Story = {
  name: 'Tipografía',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-md)' }}>
      <p style={{ color: 'var(--medano-ink-secondary)' }}>
        medano Sans — variable, humanista, serena. Derivada de Hanken Grotesk (SIL OFL).
      </p>
      {(['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--medano-space-md)' }}
        >
          <code
            style={{
              color: 'var(--medano-ink-muted)',
              minWidth: 48,
              fontSize: 'var(--medano-text-2xs)',
            }}
          >
            {size}
          </code>
          <span style={{ fontSize: `var(--medano-text-${size})` }}>
            La medano guarda el calor del día
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Espaciado: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--medano-space-xs)' }}>
      {(['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((step) => (
        <div
          key={step}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--medano-space-md)' }}
        >
          <code
            style={{
              color: 'var(--medano-ink-muted)',
              minWidth: 48,
              fontSize: 'var(--medano-text-2xs)',
            }}
          >
            {step}
          </code>
          <div
            style={{
              blockSize: 16,
              inlineSize: `var(--medano-space-${step})`,
              background: 'var(--medano-accent-base)',
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  ),
};
