import type { HTMLAttributes, ReactNode } from 'react';

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  align?: 'start' | 'center' | 'end';
  /** Sin render, se muestra row[key]. */
  render?: (row: Row) => ReactNode;
}

export interface TableProps<Row> extends HTMLAttributes<HTMLDivElement> {
  /** Descripción de la tabla para lectores de pantalla (obligatoria). */
  caption: string;
  /** Ocultar visualmente el caption (sigue disponible para AT). */
  hideCaption?: boolean;
  columns: TableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string | number;
  /** Contenido cuando no hay filas (usá <EmptyState>). */
  empty?: ReactNode;
}

/** Tabla de datos con scroll horizontal contenido (mobile-first). */
export function Table<Row>({
  caption,
  hideCaption = false,
  columns,
  rows,
  rowKey,
  empty,
  className,
  ...rest
}: TableProps<Row>) {
  if (rows.length === 0 && empty) {
    return <div className={className}>{empty}</div>;
  }
  return (
    <div className={['medano-table', className].filter(Boolean).join(' ')} {...rest}>
      <table className="medano-table__table">
        <caption className={hideCaption ? 'medano-visually-hidden' : 'medano-table__caption'}>
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align ?? 'start'}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align ?? 'start'}>
                  {column.render
                    ? column.render(row)
                    : ((row as Record<string, unknown>)[column.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
