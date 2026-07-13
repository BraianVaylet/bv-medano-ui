import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  Accordion,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Progress,
  RadioGroup,
  Select,
  Textarea,
  ToastProvider,
  Tooltip,
  useToast,
} from '../src/index';

describe('Textarea', () => {
  it('asocia label y vincula el error', () => {
    render(<Textarea label="Notas" error="Muy corto" />);
    const field = screen.getByLabelText('Notas');
    expect(field.tagName).toBe('TEXTAREA');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Muy corto');
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Textarea label="Notas" help="Opcional" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Checkbox', () => {
  it('cambia de estado al hacer click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Acepto los términos" />);
    const box = screen.getByRole('checkbox', { name: 'Acepto los términos' });
    expect(box).not.toBeChecked();
    await user.click(box);
    expect(box).toBeChecked();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Checkbox label="Recordarme" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('RadioGroup', () => {
  const options = [
    { value: 'basico', label: 'Básico' },
    { value: 'pro', label: 'Pro' },
  ];

  it('expone grupo con legend y selecciona notificando', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioGroup label="Plan" options={options} onValueChange={onValueChange} />);
    const group = screen.getByRole('group', { name: 'Plan' });
    await user.click(within(group).getByRole('radio', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(
      <RadioGroup label="Plan" options={options} defaultValue="basico" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Select', () => {
  const options = [
    { value: 'ar', label: 'Argentina' },
    { value: 'uy', label: 'Uruguay' },
  ];

  it('abre el listado y selecciona una opción', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select label="País" options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByLabelText('País'));
    const listbox = await screen.findByRole('listbox');
    await user.click(within(listbox).getByRole('option', { name: 'Uruguay' }));
    expect(onValueChange).toHaveBeenCalledWith('uy', expect.anything());
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Select label="País" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Chip', () => {
  it('dispara onRemove desde el botón de quitar', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>React</Chip>);
    await user.click(screen.getByRole('button', { name: 'Quitar' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('sin botón cuando no hay onRemove', () => {
    render(<Chip>Solo lectura</Chip>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('Avatar', () => {
  it('muestra iniciales y nombre accesible sin imagen', () => {
    render(<Avatar name="Braian Vaylet" />);
    expect(screen.getByText('BV')).toBeInTheDocument();
    expect(screen.getByText('Braian Vaylet')).toBeInTheDocument();
  });

  it('usa la imagen con alt cuando hay src', () => {
    render(<Avatar name="Braian Vaylet" src="/foto.png" />);
    expect(screen.getByRole('img', { name: 'Braian Vaylet' })).toBeInTheDocument();
  });
});

describe('Progress', () => {
  it('expone role=progressbar con el valor actual', () => {
    render(<Progress label="Subiendo archivo" value={40} />);
    const bar = screen.getByRole('progressbar', { name: 'Subiendo archivo' });
    expect(bar).toHaveAttribute('aria-valuenow', '40');
  });

  it('sin aria-valuenow cuando es indeterminado', () => {
    render(<Progress label="Procesando" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('clampa valores fuera de rango', () => {
    render(<Progress label="Listo" value={140} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
});

describe('Accordion', () => {
  const items = [
    { value: 'a', title: '¿Qué es medano?', content: 'Un design system dark-first.' },
    { value: 'b', title: '¿Es accesible?', content: 'AA verificado en CI.' },
  ];

  it('abre y cierra paneles con click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const trigger = screen.getByRole('button', { name: '¿Qué es medano?' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Un design system dark-first.')).toBeVisible();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<Accordion items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Tooltip', () => {
  it('muestra el contenido al enfocar el disparador', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Eliminar definitivamente">
        <Button variant="ghost">Eliminar</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByText('Eliminar definitivamente')).toBeInTheDocument();
  });
});

describe('Toast', () => {
  function Demo() {
    const { show } = useToast();
    return (
      <Button
        onClick={() =>
          show({ title: 'Guardado', description: 'Cambios sincronizados', tone: 'positive' })
        }
      >
        Guardar
      </Button>
    );
  }

  it('show() agrega un aviso role=status y el botón lo cierra', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    const toast = await screen.findByRole('status');
    expect(toast).toHaveTextContent('Guardado');
    await user.click(within(toast).getByRole('button', { name: 'Cerrar aviso' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('se descarta solo pasada la duración', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(await screen.findByRole('status')).toBeInTheDocument();
    await vi.waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument(), {
      timeout: 6000,
    });
  }, 8000);

  it('useToast fuera del provider explota con mensaje claro', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    function Broken() {
      useToast();
      return null;
    }
    expect(() => render(<Broken />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
