# DESIGN.md — CII.IA

Fuente de verdad visual. Ninguna decisión de diseño se toma fuera de este archivo: si algo nuevo hace falta, se agrega aquí y luego se usa.
Lo marcado **PROVISIONAL** espera confirmación del cliente.
El código actual (`globals.css`) todavía trae `--accent-v2` azul, `glass-*` y `card-surface`. Este archivo manda; la Fase 1 alinea el código.

## Color
Regla 60-30-10: negros y grises 60% / imagen 30% / dorado 10%, solo en CTA y datos clave.

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#d4a22f` | Único acento. **PROVISIONAL** hasta que el cliente confirme. |
| `--accent-soft` | `rgba(212,162,47,0.14)` | Fondo tenue de estados activos. |
| `--on-accent` | `#0a0a0b` | Texto sobre dorado. |

- El azul `#0019ff` y todos los `--accent-*-v2` desaparecen del sitio.
- Un solo acento. Los íconos no llevan color.
- Los colores semánticos (éxito, aviso, error) son solo para estados, nunca decoración.
- Contraste WCAG AA en todo el texto.

## Escala de grises
Una sola escala neutra para superficies y texto. Valores provisionales, tomados del sistema base actual (zinc); se consolidan en la Fase 1. **PROVISIONAL**

| Token | Valor | Uso |
|---|---|---|
| `--gray-950` | `#0a0a0b` | Fondo de página. |
| `--gray-900` | `#18181b` | Superficie elevada (solo cuando no hay alternativa). |
| `--gray-700` | `#3f3f46` | Líneas finas y divisores. |
| `--gray-400` | `#a1a1aa` | Texto secundario y etiquetas. |
| `--gray-200` | `#e4e4e7` | Texto principal. |

Los grises intermedios y los estados (hover un poco más claro, presionado un poco más oscuro, deshabilitado desaturado) se definen en la Fase 1.

## Tipografía — PROVISIONAL
- **Display:** Clash Display. **Texto:** Satoshi. Ambas de Fontshare, servidas con `next/font/local`.
- **Mono:** solo para números y datos. Nunca en etiquetas largas ni en mayúsculas espaciadas.
- **Verificar la licencia de Fontshare antes de publicar.**
- Hasta la Fase 1 el sitio usa Geist (paquete local `geist`), sin cambio visual.
- Escala: display, H2, cuerpo y dato. Tamaños por definir en la Fase 1.
- Máximo 2 familias. Un H1 por página.

## Sin cajas
Se separa con espacio, líneas finas e imágenes a sangre.
- Fuera: tarjetas de cristal (`glass-*`, `card-surface`), pastillas eyebrow y marcos HUD.
- Dentro: `Section`, `SectionHeader` (título + 1 frase), `Cta` y `MediaCard` (imagen protagonista, sin borde).
- Robot: protagonista de todas las imágenes (`design/PROMPTS-ROBOT.md`).

## Motion
Sutil. Máximo 1 efecto de impacto por página. Se queda el cursor de fluido, recoloreado a un dorado tenue con su intensidad actual.

Tokens iniciales, ajustables solo desde este archivo:
```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);    /* entradas */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* cambios de estado */
--dur-micro: 150ms;  /* hover, press, toggles */
--dur-base: 250ms;   /* menús, popovers */
--dur-large: 500ms;  /* reveals de sección e imágenes grandes */
--stagger: 60ms;     /* entre hermanos */
```
- Solo se animan `transform` y `opacity`.
- `prefers-reduced-motion` en todo. Con GSAP, `gsap.matchMedia()`.
- Nunca easing lineal. Sin scrolljacking.

## Reglas de texto
- Máximo 1 frase por tarjeta. Máximo 2 líneas de párrafo por sección en la home. El detalle vive en páginas internas.
- Etiquetas: 12 px como mínimo y tracking ≤ 0.08em. Nada de `tracking-[0.3em]` en texto que se deba leer.
- CTAs: solo los aprobados en `PRODUCT.md`.
- Cero conteos que delaten volumen ("12", "02 / 12", "(4)" en filtros). Cero métricas que no sean resultados. No inventar cifras.
- Textos de plantilla prohibidos: "SEQ 001 / 169", "EN VIVO", "CII.IA // DIAGNÓSTICO", "Cargando CII.IA", "Agendar diagnóstico", "ANTES: …" en fichas.
- Idioma de la interfaz: español.
