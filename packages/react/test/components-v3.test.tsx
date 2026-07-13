import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  Alert,
  AvatarGroup,
  Breadcrumb,
  Button,
  Drawer,
  EmptyState,
  IconButton,
  Link,
  Menu,
  NumberInput,
  Pagination,
  PinInput,
  Popover,
  SegmentedControl,
  Slider,
  Stat,
  Table,
} from '../src/index';
import { pageItems } from '../src/components/pagination/Pagination';

const sampleIcon = (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <circle cx="6" cy="6" r="4" fill="currentColor" />
  </svg>
);

describe('IconButton', () => {
  it('expone el nombre accesible y dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Cerrar" onClick={onClick}>
        {sampleIcon}
      </IconButton>,
    );
    await user.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Link', () => {
  it('external agrega target, rel seguro y aviso para lectores', () => {
    render(
      <Link href="https://ejemplo.com" external>
        Documentación
      </Link>,
    );
    const link = screen.getByRole('link', { name: /Documentación/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('(abre en pestaña nueva)');
  });
});

describe('Alert', () => {
  it('danger usa role=alert; el resto role=status', () => {
    render(
      <>
        <Alert tone="danger" title="Falló el pago" />
        <Alert tone="positive" title="Pago acreditado" />
      </>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Falló el pago');
    expect(screen.getByRole('status')).toHaveTextContent('Pago acreditado');
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(
      <Alert tone="caution" title="Pack por vencer" action={<Button size="sm">Renovar</Button>}>
        Te quedan 2 días.
      </Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Stat', () => {
  it('usa semántica dl/dt/dd', () => {
    const { container } = render(
      <Stat
        label="Ingresos"
        value="$12.400"
        delta={{ text: '+8% vs mes pasado', tone: 'positive' }}
      />,
    );
    expect(container.querySelector('dt')).toHaveTextContent('Ingresos');
    expect(container.querySelectorAll('dd')[0]).toHaveTextContent('$12.400');
  });
});

describe('EmptyState', () => {
  it('renderiza título, descripción y acción', () => {
    render(
      <EmptyState
        title="Sin movimientos"
        description="Cuando cargues un gasto aparece acá."
        action={<Button>Cargar gasto</Button>}
      />,
    );
    expect(screen.getByText('Sin movimientos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cargar gasto' })).toBeInTheDocument();
  });
});

describe('AvatarGroup', () => {
  it('colapsa el excedente en +N accesible', () => {
    render(
      <AvatarGroup
        max={2}
        items={[{ name: 'Ana' }, { name: 'Bruno' }, { name: 'Carla' }, { name: 'Dario' }]}
      />,
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getByText('2 personas más')).toBeInTheDocument();
  });
});

describe('Breadcrumb', () => {
  it('marca la última como página actual', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Clientes', href: '/clientes' },
          { label: 'Ana' },
        ]}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Ruta de navegación' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Ana')).toHaveAttribute('aria-current', 'page');
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Detalle' }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('SegmentedControl', () => {
  const options = [
    { value: 'dia', label: 'Día' },
    { value: 'semana', label: 'Semana' },
    { value: 'mes', label: 'Mes' },
  ];

  it('selecciona y notifica; siempre hay exactamente uno activo', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SegmentedControl label="Período" options={options} onValueChange={onValueChange} />);
    expect(screen.getByRole('radio', { name: 'Día' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'Mes' }));
    expect(onValueChange).toHaveBeenCalledWith('mes');
    expect(screen.getByRole('radio', { name: 'Mes' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Día' })).not.toBeChecked();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<SegmentedControl label="Período" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Pagination', () => {
  it('pageItems arma la ventana con elipsis', () => {
    expect(pageItems(5, 20, 1)).toEqual([1, '…', 4, 5, 6, '…', 20]);
    expect(pageItems(1, 3, 1)).toEqual([1, 2, 3]);
    expect(pageItems(2, 5, 1)).toEqual([1, 2, 3, '…', 5]);
  });

  it('marca la página actual y navega', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={20} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Página 5' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await user.click(screen.getByRole('button', { name: 'Página siguiente' }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it('deshabilita anterior en la primera página', () => {
    render(<Pagination page={1} totalPages={9} onPageChange={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
  });
});

describe('Table', () => {
  const rows = [
    { id: 1, nombre: 'Ana', saldo: '$500' },
    { id: 2, nombre: 'Bruno', saldo: '$1.200' },
  ];
  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'saldo', header: 'Saldo', align: 'end' as const },
  ];

  it('renderiza caption, encabezados y celdas', () => {
    render(<Table caption="Clientes" columns={columns} rows={rows} rowKey={(row) => row.id} />);
    expect(screen.getByRole('table', { name: 'Clientes' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Saldo' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '$1.200' })).toBeInTheDocument();
  });

  it('muestra el estado vacío cuando no hay filas', () => {
    render(
      <Table
        caption="Clientes"
        columns={columns}
        rows={[]}
        rowKey={(row: { id: number }) => row.id}
        empty={<EmptyState title="Sin clientes" />}
      />,
    );
    expect(screen.getByText('Sin clientes')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(
      <Table caption="Clientes" columns={columns} rows={rows} rowKey={(row) => row.id} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Slider', () => {
  it('expone role=slider con label y responde al teclado', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider label="Volumen" defaultValue={50} onValueChange={onValueChange} />);
    const slider = screen.getByRole('slider', { name: 'Volumen' });
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).toHaveBeenCalledWith(51, expect.anything());
  });
});

describe('NumberInput', () => {
  it('incrementa con el stepper', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<NumberInput label="Cantidad" defaultValue={2} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: 'Sumar' }));
    expect(onValueChange).toHaveBeenCalledWith(3, expect.anything());
  });

  it('sin violaciones de accesibilidad', async () => {
    const { container } = render(<NumberInput label="Cantidad" defaultValue={1} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('PinInput', () => {
  it('avanza solo entre dígitos y dispara onComplete', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<PinInput label="Código de verificación" length={4} onComplete={onComplete} />);
    const group = screen.getByRole('group', { name: 'Código de verificación' });
    const inputs = within(group).getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    await user.click(inputs[0]!);
    await user.keyboard('1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });
});

describe('Menu', () => {
  it('abre con el trigger y ejecuta la acción del ítem', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu
        trigger={<Button variant="secondary">Opciones</Button>}
        items={[
          { label: 'Editar', onSelect },
          { label: 'Eliminar', onSelect: () => undefined, danger: true, separatorBefore: true },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Opciones' }));
    const menu = await screen.findByRole('menu');
    await user.click(within(menu).getByRole('menuitem', { name: 'Editar' }));
    expect(onSelect).toHaveBeenCalledOnce();
  });
});

describe('Popover', () => {
  it('abre y muestra título + contenido', async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={<Button variant="ghost">Info</Button>} title="Sobre este dato">
        Se actualiza cada 24 horas.
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Info' }));
    expect(await screen.findByText('Sobre este dato')).toBeVisible();
    expect(screen.getByText('Se actualiza cada 24 horas.')).toBeVisible();
  });
});

describe('Drawer', () => {
  it('abre como dialog y cierra con Escape', async () => {
    const user = userEvent.setup();
    render(
      <Drawer trigger={<Button>Filtros</Button>} title="Filtros" description="Ajustá la vista.">
        contenido
      </Drawer>,
    );
    await user.click(screen.getByRole('button', { name: 'Filtros' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
