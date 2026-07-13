import type { ReactNode } from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Permite más de un panel abierto a la vez. */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={['medano-accordion', className].filter(Boolean).join(' ')}
      multiple={multiple}
    >
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="medano-accordion__item"
        >
          <BaseAccordion.Header className="medano-accordion__header">
            <BaseAccordion.Trigger className="medano-accordion__trigger">
              <span>{item.title}</span>
              <svg
                className="medano-accordion__chevron"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="medano-accordion__panel">
            <div className="medano-accordion__content">{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
