# @medano-ui/react

Componentes React de [medano](https://github.com/BraianVaylet/bv-medano-ui) — design system dark-first para la era de la IA ambiental. [Base UI](https://base-ui.com) headless + estilo medano, cero CSS-in-JS en runtime. 42 componentes accesibles (testeados con axe).

## Instalación

```bash
pnpm add @medano-ui/react @medano-ui/tokens @medano-ui/fonts
```

## Uso

```tsx
import '@medano-ui/fonts/medano-sans.css';
import '@medano-ui/tokens/vars.css';
import '@medano-ui/react/styles.css';
import { Button } from '@medano-ui/react';

export function App() {
  return <Button variant="primary">Continuar</Button>;
}
```

Dark es el tema por defecto. Para forzar tema: `<html data-theme="light">`. Sin `data-theme`, se respeta `prefers-color-scheme`.

## Componentes

Layout: `Stack`, `Container`, `Separator`, `Card` · Texto: `Kbd`, `Code`, `Link` · Acciones: `Button`, `IconButton` · Formularios: `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`, `Slider`, `NumberInput`, `PinInput`, `SegmentedControl` · Datos: `Table`, `Stat`, `Badge`, `Avatar`, `AvatarGroup`, `Alert`, `EmptyState`, `Progress`, `Skeleton`, `Spinner` · Navegación: `Tabs`, `Breadcrumb`, `Pagination` · Flotantes: `Dialog`, `Drawer`, `Menu`, `Popover`, `Tooltip`, `Toast`, `Accordion`, `Chip` · IA: `StreamingText`

## Licencia

MIT
