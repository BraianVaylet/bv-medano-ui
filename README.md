<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/medano-logo-dark.svg">
    <img src="assets/brand/medano-logo-light.svg" alt="medano" width="380">
  </picture>
</p>

> Design system dark-first para la era de la IA ambiental.
> Interfaz que se disuelve. Queda la intención.

medano es un design system completo — tokens, tipografía, iconografía, motion y
componentes — pensado para web apps React, sitios Astro y apps React Native.
Nace de una tesis: la próxima década de interfaces se gana con **menos
fricción cognitiva**, no con más efectos. Ver [MANIFESTO.md](./MANIFESTO.md) y
la [investigación](./docs/RESEARCH.md) que lo fundamenta.

## Paquetes

| Paquete             | Qué es                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `@medano-ui/tokens` | Design tokens (fuente W3C DTCG) compilados a CSS vars, preset Tailwind v4, TS y JSON para React Native |
| `@medano-ui/css`    | Reset + estilos base framework-agnostic (Astro, HTML puro)                                             |
| `@medano-ui/fonts`  | medano Sans (variable, woff2) + `@font-face`                                                           |
| `@medano-ui/icons`  | Iconografía propia (React, React Native, SVG crudo) — _en desarrollo, aún no publicado_                |
| `@medano-ui/motion` | Springs, duraciones y helpers de animación — _en desarrollo, aún no publicado_                         |
| `@medano-ui/react`  | Componentes web (Base UI headless + estilo medano, cero CSS-in-JS runtime)                             |

## Uso rápido (React + Vite)

```tsx
import '@medano-ui/fonts/medano-sans.css';
import '@medano-ui/tokens/vars.css';
import '@medano-ui/react/styles.css';
import { Button } from '@medano-ui/react';

export function App() {
  return <Button variant="primary">Continuar</Button>;
}
```

Dark es el tema por defecto. Para forzar tema: `<html data-theme="light">`.
Sin `data-theme`, se respeta `prefers-color-scheme`.

### Con Tailwind v4

```css
@import 'tailwindcss';
@import '@medano-ui/tokens/theme.css';
```

## Desarrollo

```bash
pnpm install
pnpm build        # compila todos los paquetes
pnpm test         # unit + accesibilidad (axe)
pnpm storybook    # galería de componentes
```

Estado del proyecto y checklist de fases: [PROGRESO.md](./PROGRESO.md).

## Licencia

MIT. La tipografía medano Sans deriva de una fuente bajo
[SIL Open Font License](https://openfontlicense.org/) — ver
`packages/fonts/LICENSE-OFL.txt`.
