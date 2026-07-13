import type { ReactNode } from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, defaultValue, value, onValueChange, className }: TabsProps) {
  const fallback = defaultValue ?? items[0]?.value;
  return (
    <BaseTabs.Root
      className={['medano-tabs', className].filter(Boolean).join(' ')}
      defaultValue={value === undefined ? fallback : undefined}
      value={value}
      onValueChange={onValueChange as never}
    >
      <BaseTabs.List className="medano-tabs__list">
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="medano-tabs__tab"
          >
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel key={item.value} value={item.value} className="medano-tabs__panel">
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
