import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Card, StreamingText } from '@medano-ui/react';

const meta = {
  title: 'IA/StreamingText',
} satisfies Meta;

export default meta;
type Story = StoryObj;

const RESPUESTA = `La medano no se apura: el viento la forma grano a grano. Así llega el texto generado en medano — palabra a palabra, con su propio ritmo, sin saltos que sobresalten. El contenido que la IA propone se distingue con tinta fantasma hasta que una persona lo acepta.`;

function DemoStream({ ghost = false }: { ghost?: boolean }) {
  const [text, setText] = useState('');
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const start = () => {
    clearInterval(timer.current);
    const words = RESPUESTA.split(' ');
    let index = 0;
    setText('');
    setStreaming(true);
    timer.current = setInterval(() => {
      index += 1;
      setText(words.slice(0, index).join(' '));
      if (index >= words.length) {
        clearInterval(timer.current);
        setStreaming(false);
      }
    }, 90);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <Card style={{ maxWidth: 480, display: 'grid', gap: 'var(--medano-space-md)' }}>
      <StreamingText text={text || ' '} streaming={streaming} ghost={ghost} />
      <Button variant="secondary" size="sm" onClick={start} disabled={streaming}>
        {text ? 'Regenerar' : 'Generar respuesta'}
      </Button>
    </Card>
  );
}

export const Streaming: Story = {
  render: () => <DemoStream />,
};

export const TintaFantasma: Story = {
  name: 'Tinta fantasma (GhostDraft)',
  render: () => <DemoStream ghost />,
};
