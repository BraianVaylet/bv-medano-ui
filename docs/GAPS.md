# Gaps detectados durante la adopción de medano-ui (2026-07)

Relevamiento hecho al migrar las 5 apps bv-* (wiki-of-wine, personal-finances,
my-investments, bow-sight, cross v1) a `@medano-ui/*` 0.1.0. Dos categorías:
**componentes duplicados en ≥2 apps** que deberían vivir en la librería, y
**limitaciones de API** que obligaron a adapters o escape hatches.

## Componentes candidatos (duplicados en ≥2 apps)

### theme-bridge — prioridad alta (duplicado en las 5)

ThemeProvider (light/dark persistido en `bv-theme`) + selector de acento
(persistido en `bv-accent`) + derivación WCAG de variantes (`base/strong/
subtle/on-accent/focus`) + script anti-FOUC + sync de `meta[theme-color]`.
Hoy cada app lleva su copia escribiendo sobre `--medano-accent-*`.
Candidato: paquete `@medano-ui/theme-bridge` con el provider, `applyAccent()/
clearAccent()` y el snippet anti-FOUC listo para copiar.

- Ojo: dos convenciones de storage conviven — wiki/finances/invest guardan
  **hex** (`#8E4EC6`), bow-sight/cross guardan **id** (`'blue'`). Misma clave
  `bv-accent`: hoy cada familia ignora con gracia el formato de la otra, pero
  el bridge debería normalizar (id → hex) para que la sincronización entre
  apps sea real.

### ConfirmDialog (4 apps: wiki, finances, invest*, cross)

Preset título/mensaje/confirmar-cancelar/loading/destructive sobre un modal.
Se abre programáticamente — bloqueado por el gap de `Dialog` (ver abajo).
(*invest lo compone inline con `Modal`.)

### Modal programático (finances, invest, bow-sight, cross)

Bottom-sheet en mobile, centrado en desktop, `open/onClose`. Ver gap de API
de `Dialog`.

### PageLoader / FullScreenSpinner (wiki, finances, cross, bow-sight)

Spinner `lg` centrado a pantalla completa como fallback de Suspense/sesión.
Trivial pero repetido 4 veces.

### CurrencyToggle ARS/USD (finances, invest)

En invest quedó resuelto con `SegmentedControl`; finances aún tiene el suyo.
Alcanza con documentar la receta, no hace falta componente nuevo.

### MoneyText / SignedAmount + formato es-AR (finances, invest)

Monto con color por signo + `tabular-nums` + `Intl.NumberFormat('es-AR')`.

### NumericInput con locale es-AR (invest)

Input numérico que formatea miles/decimales al tipear (`.` miles, `,`
decimal). El `NumberInput` de medano no maneja locale. Una sola app hoy,
pero es el patrón para cualquier app de plata futura.

### Logo con slot (wiki, invest, bow-sight, cross)

Cada app arma su marca (SVG inline + wordmark) con el acento como fill.
Patrón común: logo que toma `var(--medano-accent-base)` y `currentColor`.

### UpdatePrompt PWA — prioridad alta (duplicado en 4: bow-sight, wiki, finances, cross)

Aviso de "hay nueva versión" + `skipWaiting`/reload + chequeo periódico
(1 h) y al volver a primer plano. Copiado tal cual en las 4 PWAs (2026-07-15);
solo cambia el vocabulario de clases (cross usa ink/raised/accent).
Candidato: `@medano-ui/pwa` con un `useAppUpdate()` (headless, sin UI) o un
`<UpdatePrompt>` que acepte los textos. Ojo: requiere `workbox-window` como
peer y los tipos `vite-plugin-pwa/react`.
Contexto: con `registerType: 'autoUpdate'` la pestaña abierta sigue con el JS
viejo hasta un refresh manual — por eso las 4 usan `'prompt'`.

### Toast (ninguna app lo tiene; medano ya lo trae)

Quick win: adoptar `ToastProvider/useToast` en las apps para feedback de
guardado/borrado. Hoy ese feedback es inconsistente o inexistente.

### Charts (finances hand-rolled, invest con recharts)

Documentar paleta de series sobre tokens (`--medano-accent-base`,
`--medano-feedback-*`). No abstraer aún (YAGNI): dos implementaciones muy
distintas y sin tercera app que lo pida.

## Limitaciones de API encontradas (fixes para la librería)

1. **`Dialog`/`Drawer`/`Menu`/`Popover` exigen `trigger`.** Los modales de
   las apps se abren programáticamente (estado `open` sin botón dueño).
   Fix: hacer `trigger` opcional cuando `open`/`onOpenChange` son
   controlados. Es el bloqueante n.º 1 para matar los `Modal` custom.

2. **`Button` no acepta render prop / `asChild`.** Los link-buttons de
   router (react-router `<Link>`) tuvieron que usar el escape hatch de
   clases (`.medano-button` + `data-variant`/`data-size`) en wiki y cross.
   Base UI ya soporta `render`; exponerlo.

3. **`Input` exige `label` visible.** Casos reales sin label: búsqueda con
   `aria-label` + icono (wiki), inputs en filas compactas. Fix: aceptar
   `label` oculto (`labelHidden`) o exponer un `UnlabeledInput`/clase
   soportada. Hoy el escape hatch es usar `.medano-field__input` a mano
   (wiki, finances, invest, bow-sight, cross lo hacen).

4. **`Input` sin `suffix`/`prefix`.** cross usa sufijo "%" y "kg" dentro del
   campo; finances tiene montos con símbolo. Slot `suffix` en `Field`.

5. **`Select` de medano no es nativo** (options array + Base UI). Para
   formularios simples con `<option>` dinámicas las apps prefirieron el
   `<select>` nativo con clase `.medano-field__input`. Documentar esa clase
   como API pública, o exponer `NativeSelect`.

6. **Acento runtime.** Las 5 apps sobrescriben `--medano-accent-base/strong/
subtle`, `--medano-ink-on-accent` y `--medano-border-focus` con inline
   styles. Funciona, pero conviene documentarlo como contrato (qué vars son
   seguras de pisar) — o resolverlo en `theme-bridge`.

7. **`@medano-ui/icons` sube de prioridad**: las 5 apps usan lucide-react.

## Notas de migración (para futuras apps)

- Bridge de tokens: re-apuntar las vars semánticas legacy a `--medano-*` en
  el CSS de entrada re-skinea toda la app sin tocar componentes. Ver
  `styles.css` de bv-wiki-of-wine como referencia.
- Polaridad de tema: medano es dark-default con `[data-theme="light"]`
  explícito. Las apps setean **siempre** `data-theme` explícito (anti-FOUC +
  provider) y la polaridad deja de importar.
- `meta[theme-color]`: leer `--medano-surface-0` computado (los navegadores
  modernos aceptan `oklch()` ahí) con fallback `#faf9f3` / `#201e1a`.
- medano Sans reemplaza a Hanken Grotesk sin cambio de métricas (misma
  familia); permite eliminar Google Fonts y sus preconnect.
