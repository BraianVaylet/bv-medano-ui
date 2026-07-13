# Investigación — por qué medano es como es

Síntesis de la investigación de mercado y preferencias de usuarios que
fundamenta las decisiones del sistema (julio 2026).

## 1. Evolución del diseño de interfaces

| Era       | Lenguaje                    | Qué aportó                            | Qué mató                                     |
| --------- | --------------------------- | ------------------------------------- | -------------------------------------------- |
| 2007–2012 | Skeuomorfismo               | Familiaridad con lo físico            | Ornamento sin función                        |
| 2013–2014 | Flat                        | Claridad, velocidad                   | Affordances (no se sabía qué era clickeable) |
| 2014–2019 | Material Design             | Sistema, elevación, motion con reglas | Homogeneidad: todo parecía Google            |
| 2020–2022 | Neumorfismo / Glassmorphism | Profundidad suave                     | Contraste ilegible, a11y rota                |
| 2023–2024 | Spatial / bento             | Densidad organizada                   | Frialdad, grids como fin                     |
| 2025–2026 | **Calma + IA ambiental**    | Sustracción estratégica, IA como capa | — (era actual)                               |

Patrón de fondo: cada ciclo agrega expresividad y el siguiente la poda para
recuperar usabilidad. La apuesta de medano: la próxima poda es **cognitiva, no
visual** — menos demanda de atención, no menos píxeles.

## 2. Datos que sostienen las apuestas

**Dark mode es mayoría, no nicho.** ~82% de usuarios móviles activan dark mode
cuando está disponible; la preferencia sube a 87% de tarde y supera 91% de
noche. 92% de las apps top del App Store ya lo soportan. En 18–24 años la
preferencia es 76%+. Conclusión: diseñar dark-first y derivar light invierte
la carga de trabajo correcta — el modo mayoritario deja de ser el tema
"secundario" que se rompe.

**Calm design es la dirección dominante 2026.** Coinciden todas las fuentes de
tendencias: sustracción estratégica, progressive disclosure, feedback
ambiental en vez de alertas intrusivas, motion estructural (explica qué
pasó/pasa/pasará) en vez de decorativo. El término de la industria es "el fin
de la teatralidad visual".

**La IA se vuelve ambiental.** El patrón 2024 (un chat pegado en un panel)
está muriendo; la IA pasa a vivir dentro del flujo: sidebars colapsables,
sugerencias fantasma, streaming como estado de primera clase. Ningún design
system mainstream (Material, Fluent, Carbon, Polaris, shadcn) tiene primitivas
IA nativas hoy. Es el hueco competitivo de medano.

**Tokens estándar, por fin.** El W3C DTCG publicó la primera versión estable
del formato de design tokens (oct 2025): JSON con `$value`/`$type`, extensión
`.tokens.json`. Tailwind v4 se volvió CSS-first (`@theme` emite CSS variables
nativas). Construir hoy sobre DTCG + CSS vars es apostar al estándar, no a un
framework.

## 3. Decisiones derivadas

1. **OKLCH como espacio de color**: perceptualmente uniforme — la escalera de
   luminancia de 8 superficies mantiene pasos visualmente iguales, cosa
   imposible en HSL. Soporte nativo en todos los browsers modernos.
2. **Elevación por luz, no sombra**: en fondos oscuros las drop-shadows son
   casi invisibles; la luminancia es el canal de profundidad natural del dark
   mode. Esto además crea firma visual reconocible.
3. **Base UI como capa headless**: v1.0 estable (dic 2025), mantenida
   full-time por MUI, sin un pixel de estilo propio. Radix quedó ralentizada
   tras la adquisición por WorkOS; React Aria es más rigurosa pero más cara de
   construir. A11y resuelta sin hipotecar la identidad.
4. **Fork OFL para la tipografía**: la OFL permite modificar y redistribuir
   exigiendo renombrar (mismo camino de Rethink Sans ← DM Sans ← Poppins).
   Dibujar de cero son meses de type design; el fork da identidad progresiva
   sin frenar el sistema.
5. **Mobile-first estricto**: los datos de uso nocturno + móvil dominante
   convergen: el caso de diseño primario de medano es literalmente _una mano,
   un teléfono, de noche_.
6. **Paleta cálida y apagada** _(rebrand 2026-07-13)_: neutros beige/tierra
   (hue 85–95), nunca gris; acento coral apagado #C96442 y fondos heredados de
   bv-personal-finances para continuidad de marca entre las apps bv. El
   criterio sensorial: una habitación iluminada con foco cálido (~2700K)
   frente a uno frío — misma temperatura aplicada a la luz de elevación (el
   halo) y a los colores de feedback, todos desaturados. La opacidad es
   deliberada: colores fuertes exigen atención; los apagados acompañan.

## Fuentes

- [Envato: UX/UI trends 2026 — calm interfaces, transparent AI](https://elements.envato.com/learn/ux-ui-design-trends)
- [UXPin: 12 UX/UI Design Trends 2026](https://www.uxpin.com/studio/blog/ui-ux-design-trends/)
- [UX Collective: Experience design trends 2026](https://uxdesign.cc/the-most-popular-experience-design-trends-of-2026-3ca85c8a3e3d)
- [WifiTalents: 90+ dark mode statistics 2026](https://wifitalents.com/dark-mode-usage-statistics/)
- [forms.app: 35+ dark mode statistics](https://forms.app/en/blog/dark-mode-statistics)
- [Wings: Calm design — interfaces that reduce cognitive load](https://wings.design/calm-design-in-a-noisy-world-interfaces-that-reduce-cognitive-load/)
- [UXmatters: Designing Calm](https://www.uxmatters.com/mt/archives/2025/05/designing-calm-ux-principles-for-reducing-users-anxiety.php)
- [GreatFrontEnd: Top headless UI libraries 2026](https://www.greatfrontend.com/blog/top-headless-ui-libraries-for-react-in-2026)
- [LogRocket: Radix vs React Aria vs Ark vs Base UI](https://blog.logrocket.com/headless-ui-alternatives/)
- [SIL Open Font License](https://openfontlicense.org/)
- [Google Design: Open source brand fonts](https://design.google/library/open-source-custom-fonts-google)
- [Design tokens W3C DTCG — versión estable](https://malakavenu.com/articles/design-tokens-w3c-2026)
- [Tailwind CSS: Theme variables](https://tailwindcss.com/docs/theme)
