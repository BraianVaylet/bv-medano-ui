---
"@medano-ui/react": patch
---

`ThemeToggle`: corrige los iconos invertidos. Ahora muestra el sol en modo oscuro
y la luna en modo claro, coherente con lo que ya decían `aria-label` y `title`
("Cambiar a modo claro" / "Cambiar a modo oscuro").

`AuthLayout`: la tarjeta queda anclada arriba en lugar de centrada verticalmente.
`.medano-auth` traía `min-block-size: 100%` + `justify-content: center`, que sólo
tenían efecto si la app definía la cadena de alturas (`html, body, #root {
height: 100% }`). Las apps que no la definen (bv-cross) veían el login arriba y
las que sí (bv-personal-finances) lo veían centrado: el mismo template rendereaba
distinto según CSS ajeno a la librería. Sin esas dos reglas la posición es la
misma en toda la familia.
