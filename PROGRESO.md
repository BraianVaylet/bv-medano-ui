# medano — Progreso

Estado del plan de implementación. Última actualización: 2026-07-12.

## Fases

- [x] **F0 — Identidad y fundamentos**: git init, [MANIFESTO.md](./MANIFESTO.md), [investigación](./docs/RESEARCH.md), tokens DTCG (color OKLCH 8 superficies dark+light, tipografía, espaciado, radios, motion, z, breakpoints).
- [x] **F1 — Infraestructura**: monorepo pnpm + Turborepo, tsconfig base, Changesets, CI GitHub Actions, Storybook 9 (react-vite) con toolbar de tema dark/light.
- [x] **F2 — Pipeline de tokens + css + fonts**: compilador propio DTCG → `vars.css` + `theme.css` (Tailwind v4 `@theme inline`) + TS tipado + JSON React Native (oklch→hex vía culori). Auditoría de contraste WCAG AA como test (30 tests). `@medano-ui/css` (reset + base). medano Sans v1 (Hanken Grotesk OFL vía fontsource, alias CSS, subsets latin + latin-ext).
- [ ] **F3 — Iconografía v1**: ~60 iconos grid 24 / stroke 1.75 con la firma "respiro" (discontinuidad deliberada en el trazo), pipeline SVG → React / RN / raw.
- [x] **Rebrand Bruma → medano** _(2026-07-13)_: paleta cálida y apagada — neutros `tierra` (dark, base #1F1E1D) y `arena` (light, base #FAF9F5) heredados de bv-personal-finances, acento coral `brasa` (#C96442 = brasa.400), tintas `crema`/`cacao`, feedback `salvia`/`miel`/`teja`. Concepto: "la elevación es luz cálida" (chroma sube con la superficie). Prefijo CSS `--medano-`/`.medano-`, scope npm `@medano-ui`, fuente "medano Sans". Sensación buscada: foco de luz cálida vs luz fría.
- [x] **Firma "esquina quieta"** _(2026-07-12)_: token `--medano-radius-quiet`; contenedores de contenido (Card, Input, Textarea, Dialog desktop, Select popup, Toast, Tooltip, Accordion, Chip) llevan 3 esquinas generosas + 1 casi plana en `start-start`; controles de acción simétricos. Regla en MANIFESTO + vitrina en Storybook (Fundamentos → Esquina quieta).
- [x] **F4 — Componentes core web + catálogo extendido** _(completado 2026-07-13, referencia de amplitud: Chakra UI adaptado a la ideología medano — 42 componentes exportados)_:
  - [x] Button (4 variantes, 3 tamaños, loading, fullWidth)
  - [x] Input (label + help + error con aria completo)
  - [x] Switch (Base UI)
  - [x] Card (3 elevaciones)
  - [x] Badge (6 tonos)
  - [x] Skeleton (respiración 4s)
  - [x] Spinner
  - [x] Dialog / BottomSheet (mobile: sheet desde abajo; desktop: centrado; backdrop con blur "medano")
  - [x] Tabs (Base UI)
  - [x] StreamingText (adelanto del AI kit: chunks con fade, tinta fantasma, aria-live)
  - [x] Textarea, Checkbox, RadioGroup (nativos estilizados) · Select, Tooltip, Accordion (Base UI) · Chip, Avatar, Progress, Toast (propios; toast = feedback ambiental zona baja, pausa en hover)
  - [x] _Lote Chakra (2026-07-13)_ — Layout: Stack, Container, Separator · Texto: Kbd, Code, Link · Acciones: IconButton · Formularios: Slider, NumberInput, PinInput (OTP), SegmentedControl · Datos: Table (genérica, caption obligatorio, estado vacío), Stat (dl/dt/dd, tabular-nums), AvatarGroup, Alert (danger=role alert, resto status), EmptyState · Navegación: Breadcrumb, Pagination · Flotantes: Menu, Popover, Drawer (panel lateral; Dialog sigue siendo el bottom sheet)
- [ ] **F5 — Motion + AI kit**: `@medano-ui/motion`; `Thinking`, `PromptField`, `GhostDraft`, `Message`.
- [x] **Identidad visual + preparación npm** _(2026-07-13)_: logo (duna + foco cálido + esquina quieta + cresta con respiro, wordmark en medano Sans convertida a paths — `assets/brand/`, variantes dark/light en README). Publicación: metadata npm completa (repository/author/keywords/publishConfig) en los 4 paquetes, LICENSE + README por paquete, workflow `release.yml` (changesets/action + npm provenance + permisos mínimos), auditoría de seguridad pre-publicación (0 vulns tras override esbuild ≥0.28.1; sin lifecycle scripts; tarballs auditados con `npm pack --dry-run`; build de fonts ahora limpia `dist` — eliminaba residuos `duna-*` que se habrían publicado).
- [ ] **F6 — Docs + publicación**: sitio Astro Starlight, guías React/Astro/Tailwind, v0.1.0 en npm (falta: org `medano-ui` en npmjs.com, secret `NPM_TOKEN`, primer changeset).
- [ ] **F7 — React Native core**: tokens/native ya emitido; faltan componentes RN.

## Verificado

- `pnpm build` → 5/5 tareas OK. `pnpm test` → 93/93 verdes (unit + axe + contraste AA en ambos temas).
- Verificado en Storybook: tabla con datos y estado vacío, KPIs, slider/stepper/PIN, menú, drawer, segmentado. Nota Base UI 1.6: NumberField deriva `aria-controls` de su id interno — el `id` externo va al Root, no al Input (axe lo detectó).
- Storybook corriendo (`pnpm storybook`, puerto 6006): fundamentos, botones, formularios, superficies, IA. Tema dark/light conmutado en vivo verificado (bg `oklch(0.235 0.008 85)` ↔ `oklch(0.982 0.005 95)`, acento brasa en ambos).
- Dialog verificado en browser: abre, `role=dialog`, título/descripción, acciones.

## Pendientes técnicos menores

- ESLint todavía no configurado (CI corre Prettier check).
- Warnings de turbo por `outputs` en `@medano-ui/css` y storybook (cosmético).
- Captura de pantalla del Dialog con blur no verificada visualmente (pane flaky); DOM y unit tests OK.
- Fase 2 de tipografía: fork real con fontmake (renombrado en binario, ajustes de glifos).
- `pnpm storybook` requiere build previo de tokens/fonts (`pnpm build`) la primera vez.

## Decisiones tomadas (ver RESEARCH.md para el porqué)

Nombre **medano** (scope npm `@medano-ui`), headless **Base UI** (`@base-ui/react` — ojo: renombrado desde `@base-ui-components/react`), repo git propio, compilador de tokens propio (fuente DTCG estándar, migrable a Style Dictionary sin tocar tokens).
