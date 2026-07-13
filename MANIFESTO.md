# medano — Manifiesto

> Interfaz que se disuelve. Queda la intención.

medano es un design system dark-first nacido para la era de la IA ambiental.
No compite en ruido: compite en calma. Su hipótesis es simple — la próxima
década de interfaces no se va a ganar con más efectos, sino con menos fricción
cognitiva.

## Los cinco principios

### 1. Oscuridad primero

Se diseña en oscuro; la luz se deriva. La profundidad no se dibuja con sombras
proyectadas ni bordes grises: se dibuja con **luminancia**. Ocho niveles de
superficie (`surface-0` … `surface-7`) donde lo más cercano al usuario es lo
más luminoso, rematado con un filo de luz superior (el _halo_), como objetos
alcanzados por un foco cálido en una habitación a oscuras. Y cuanto más alta
la superficie, apenas más cálida: acercarse al usuario es acercarse a la luz.

**Regla:** si un elemento necesita separarse del fondo, sube de superficie.
Nunca agregues un borde gris ni una drop-shadow.

**La esquina quieta.** Todo contenedor de contenido — cards, campos de texto,
diálogos, toasts, chips — lleva tres esquinas generosas y una casi plana en
`start-start` (`--medano-radius-quiet`, se invierte sola en RTL): el punto de
reposo donde el ojo ancla. Los controles de acción (botones, switches,
badges) quedan simétricos. Un vistazo alcanza para distinguir _lo que
contiene_ de _lo que actúa_.

### 2. Calma operativa

Una acción primaria por vista. La complejidad se revela progresivamente, no se
apila. El feedback es ambiental: los estados se funden, los avisos no saltan,
nada parpadea para pedir atención. Los estados vacío, de error y de carga se
diseñan siempre — son parte del producto, no excepciones.

**Regla:** antes de agregar un elemento, justificá qué decisión del usuario
acelera. Si no acelera ninguna, no entra.

### 3. Movimiento con propósito

El movimiento explica estructura: qué pasó, qué está pasando, qué va a pasar.
Tres resortes con nombre — `snap` (respuesta directa), `glide` (transición
espacial), `drift` (ambiente) — reemplazan curvas arbitrarias. Los estados de
espera **respiran**: una oscilación lentísima, casi imperceptible, que
transmite vida sin exigir atención. `prefers-reduced-motion` se respeta en
todo, siempre.

**Regla:** si una animación no comunica un cambio de estado o de jerarquía,
no existe.

### 4. La IA es un material

La IA no es un chat pegado a un costado: es un material más del sistema, con
sus propias reglas físicas. El contenido generado se distingue del contenido
humano — tinta más tenue (`ink-ghost`) hasta que una persona lo acepta. El
texto llega en streaming con su propio ritmo. El sistema piensa de forma
visible pero silenciosa. Primitivas nativas: `StreamingText`, `Thinking`,
`PromptField`, `GhostDraft`.

**Regla:** el usuario siempre distingue, de un vistazo, qué escribió una
persona y qué propuso una máquina.

### 5. Pulgar primero

Se diseña para una mano sosteniendo un teléfono, de noche. Objetivos táctiles
de 44px o más. Las acciones primarias viven en la zona baja de la pantalla.
`BottomSheet` antes que `Modal`. El desktop es la ampliación, no el origen.

**Regla:** todo flujo se valida primero en 375px de ancho.

## Lo que medano no es

- No es minimalismo por estética: es sustracción estratégica con propósito.
- No es un tema oscuro sobre un sistema claro: el oscuro es el origen.
- No es neutral: tiene opinión. Los neutros son arena y tierra (hue 85–95),
  nunca gris; el acento es un coral de brasa apagado (#C96442); la tipografía
  tiene voz propia. Todo apagado antes que estridente: la sensación es la de
  una habitación con un foco de luz cálida, no uno de luz fría.
