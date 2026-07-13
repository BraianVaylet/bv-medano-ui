import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  Badge,
  Button,
  Card,
  Dialog,
  Input,
  Skeleton,
  Spinner,
  StreamingText,
  Switch,
  Tabs,
} from '../src/index';

describe('Button', () => {
  it('dispara onClick al activarlo', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('en loading queda deshabilitado, anuncia aria-busy y no dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Guardar
      </Button>,
    );
    const button = screen.getByRole('button', { name: /guardar/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await user.click(button).catch(() => undefined);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sin violaciones de accesibilidad en las cuatro variantes', async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primario</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="danger">Eliminar</Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Input', () => {
  it('asocia el label con el campo', () => {
    render(<Input label="Correo" type="email" />);
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
  });

  it('el error se anuncia con role=alert y marca aria-invalid', () => {
    render(<Input label="Correo" error="Correo inválido" />);
    const field = screen.getByLabelText('Correo');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Correo inválido');
    expect(field.getAttribute('aria-describedby')).toContain(alert.id);
  });

  it('el texto de ayuda queda vinculado vía aria-describedby', () => {
    render(<Input label="Nombre" help="Como figura en tu documento" />);
    const field = screen.getByLabelText('Nombre');
    const help = screen.getByText('Como figura en tu documento');
    expect(field.getAttribute('aria-describedby')).toContain(help.id);
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Input label="Correo" help="Nunca lo compartimos" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Switch', () => {
  it('cambia de estado al hacer click y notifica', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Notificaciones" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Notificaciones' });
    expect(control).not.toBeChecked();
    await user.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Switch label="Modo avión" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Tabs', () => {
  const items = [
    { value: 'resumen', label: 'Resumen', content: 'Contenido resumen' },
    { value: 'detalle', label: 'Detalle', content: 'Contenido detalle' },
  ];

  it('muestra el panel de la pestaña activa y cambia al seleccionar otra', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    expect(screen.getByText('Contenido resumen')).toBeVisible();
    await user.click(screen.getByRole('tab', { name: 'Detalle' }));
    expect(screen.getByText('Contenido detalle')).toBeVisible();
  });

  it('navega con flechas del teclado', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole('tab', { name: 'Resumen' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Detalle' })).toHaveFocus();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Tabs items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Dialog', () => {
  it('abre con el trigger, muestra título y cierra con Escape', async () => {
    const user = userEvent.setup();
    render(
      <Dialog trigger={<Button>Abrir</Button>} title="Confirmar acción" description="¿Seguro?" />,
    );
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirmar acción')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sin violaciones de accesibilidad estando abierto', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <Dialog trigger={<Button>Abrir</Button>} title="Título" description="Descripción" />,
    );
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    await screen.findByRole('dialog');
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});

describe('StreamingText', () => {
  it('agrega solo el sufijo nuevo cuando el texto crece', () => {
    const { rerender, container } = render(<StreamingText text="Hola" streaming />);
    rerender(<StreamingText text="Hola mundo" streaming />);
    const chunks = container.querySelectorAll('.medano-stream__chunk');
    expect(chunks).toHaveLength(2);
    expect(container).toHaveTextContent('Hola mundo');
  });

  it('reinicia cuando llega un texto que no es continuación', () => {
    const { rerender, container } = render(<StreamingText text="Primer mensaje" />);
    rerender(<StreamingText text="Otro distinto" />);
    expect(container.querySelectorAll('.medano-stream__chunk')).toHaveLength(1);
    expect(container).toHaveTextContent('Otro distinto');
  });

  it('anuncia con aria-live y marca aria-busy durante el stream', () => {
    const { container } = render(<StreamingText text="Pensando" streaming />);
    const region = container.querySelector('.medano-stream');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toHaveAttribute('aria-busy', 'true');
  });
});

describe('piezas estáticas', () => {
  it('Badge, Card, Skeleton y Spinner sin violaciones de accesibilidad', async () => {
    const { container } = render(
      <Card elevation={2}>
        <Badge tone="positive">Activo</Badge>
        <Skeleton width={120} />
        <Spinner label="Cargando datos" />
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
