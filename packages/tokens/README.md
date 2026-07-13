# @medano-ui/tokens

Design tokens de [medano](https://github.com/BraianVaylet/bv-medano-ui) — design system dark-first para la era de la IA ambiental. Fuente [W3C DTCG](https://tr.designtokens.org/format/) compilada a CSS variables, preset Tailwind v4, TypeScript tipado y JSON para React Native.

## Instalación

```bash
pnpm add @medano-ui/tokens
```

## Uso

```css
/* CSS variables (--medano-*) con dark por defecto y light vía data-theme */
@import '@medano-ui/tokens/vars.css';
```

```css
/* Tailwind v4 */
@import 'tailwindcss';
@import '@medano-ui/tokens/theme.css';
```

```ts
// TypeScript
import { tokens } from '@medano-ui/tokens';
```

```ts
// React Native (oklch resuelto a hex)
import tokens from '@medano-ui/tokens/native';
```

Dark es el tema por defecto. Para forzar tema: `<html data-theme="light">`. Sin `data-theme`, se respeta `prefers-color-scheme`.

## Licencia

MIT
