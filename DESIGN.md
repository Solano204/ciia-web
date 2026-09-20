# DESIGN.md — CII.IA

Fuente de verdad visual. Ninguna decisión de diseño se toma fuera de este archivo: si algo nuevo hace falta, se agrega aquí y luego se usa.
Lo marcado **PROVISIONAL** espera confirmación del cliente.
Color, grises y tipografía ya viven en el código (Fase 1A), y los componentes sin cajas (Fase 1B). Este archivo manda.

## Color
Regla 60-30-10: negros y grises 60% / imagen 30% / dorado 10%, solo en CTA y datos clave.

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#d4a22f` | Único acento. **PROVISIONAL** hasta que el cliente confirme. |
| `--accent-soft` | `rgba(212,162,47,0.14)` | Fondo tenue de estados activos. |
| `--on-accent` | `#0a0a0b` | Texto sobre dorado. |

- No queda azul en el sitio: el acento es solo dorado. Sobre dorado, texto `--on-accent` (8.5:1).
- Precios y datos clave van en texto primario semibold. Dorado solo si es el dato principal de su bloque.
- Focus rings, bordes activos y pasos activos van en dorado.
- Un solo acento. Los íconos no llevan color.
- Los colores semánticos (éxito, aviso, error) son solo para estados, nunca decoración.
- Contraste WCAG AA en todo el texto.

## Escala de grises
Una sola escala neutra (zinc) para superficies y texto; sustituye a las dos escalas anteriores (base y `-v2`). **PROVISIONAL**

| Token | Valor | Uso | Contraste sobre fondo |
|---|---|---|---|
| `--gray-950` | `#0a0a0b` | Fondo de página (`--background`). | — |
| `--gray-900` | `#18181b` | Superficie elevada, solo si no hay alternativa (`--card-bg`). | — |
| `--gray-500` | `#8a8a93` | Texto atenuado y etiquetas (`--muted`). | 5.8:1 |
| `--gray-400` | `#a1a1aa` | Texto secundario (`--text-secondary`). | 7.7:1 |
| `--gray-200` | `#e4e4e7` | Texto principal (`--foreground`). | 15.6:1 |

- `--gray-500` sustituye al `#71717a` anterior, que daba 4.1:1 y no cumplía AA en etiquetas pequeñas.
- Líneas: blanco translúcido, `--line` (7%), `--line-strong` (12%) y `--line-stronger` (18%).
- Estados semánticos, solo para estado: `--success` `#2dd4a7`, `--warning` `#e5a93d`, `--danger` `#e56b6b`.
- Los estados de interacción (hover, presionado, deshabilitado) se definen con los componentes en la Fase 1B.

## Tipografía — PROVISIONAL
- **Display:** Clash Display (`font-display`; h1, h2 y h3 por defecto, y cifras grandes). **Texto y etiquetas:** Satoshi (`font-sans`). Ambas de Fontshare, servidas con `next/font/local` desde `src/fonts/`. **PROVISIONAL** hasta que el cliente elija (comparativa en `/lab/tipografia`, solo en desarrollo).
- **Mono:** Geist Mono (`font-mono`) solo para cifras y datos: precios, contadores, números de paso y porcentajes. Las etiquetas van en Satoshi.
- Máximo 2 familias de texto, más la mono de datos. Un H1 por página.
- Etiquetas: 12 px mínimo y tracking ≤ 0.08em.
- Escala en tokens `--text-*`. Se aplica a los componentes en la Fase 1B:

| Token | Valor | Interlineado |
|---|---|---|
| `display` | `clamp(3rem, 7vw, 6.5rem)` | 0.95 |
| `h2` | `clamp(2rem, 4vw, 3.5rem)` | 1.05 |
| `h3` | `1.5rem` | 1.3 |
| `body` | `1rem` | 1.6 |
| `small` | `0.8125rem` | 1.5 |

- Licencia: ITF Free Font License 2.0 (Fontshare). Permite uso comercial y web con `@font-face` autoalojado. Prohíbe modificar los archivos (incluye subsetting y convertir formato) y redistribuirlos, también en repositorios públicos: las `.woff2` no se versionan mientras el repo sea público.

## Sin cajas
Se separa con espacio, líneas finas e imágenes a sangre.
- Fuera: tarjetas de cristal (`glass-*`, `card-surface`), pastillas eyebrow y marcos HUD.
- Componentes base:
  - `Section`: fondo, padding vertical `--section-y` (6 rem; 8 rem desde md) y ancho `--container-max` (1400 px).
  - `SectionHeader`: título h2 (`text-h2`) y una frase opcional. Sin pastilla.
  - `MediaCard`: imagen protagonista, título, una frase y dato opcional. Sin borde, fondo ni glass. En hover, zoom de 3% en la imagen y subrayado del título.
  - `Cta` (`CtaButton` y `CtaLink`).
- Conservan borde: inputs del formulario (el borde es su affordance), botones y chips de filtro.
- Etiquetas, productos y tags no son chips: van como texto separado por "·".
- Robot: protagonista de todas las imágenes (`design/PROMPTS-ROBOT.md`).

## Motion
Sutil. Máximo 1 efecto de impacto por página. Se queda el cursor de fluido, recoloreado a un dorado oscuro y tenue (`COLOR="#5C4514"`, a afinar con el cliente; el primer intento, `#7A5C1A`, salía más luminoso que el azul original). Solo cambia el color, no su intensidad de simulación.

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
- Secuencias de scroll de la home (fracción del scroll de cada sección; las ventanas viven en `src/lib/hero.ts` y `src/lib/challenge.ts`):
  - Hero: el texto queda opaco hasta el 35% y sale entre el 35% y el 50%.
  - Reto: velo negro de entrada 1 → 0 entre 0% y 45%; texto entre 38% y 68%; velo negro de salida 0 → 1 entre 60% y 90%; CTA entre 85% y 95%. Una banda de 16vh funde el final de la sección anterior a negro.
- Con reduced motion las secuencias no siguen al scroll: una pantalla, frame fijo y texto visible.
- `prefers-reduced-motion` en todo. Con GSAP, `gsap.matchMedia()`.
- Nunca easing lineal. Sin scrolljacking.

## Reglas de texto
- Máximo 1 frase por tarjeta. Máximo 2 líneas de párrafo por sección en la home. El detalle vive en páginas internas.
- Etiquetas: 12 px como mínimo y tracking ≤ 0.08em. Nada de `tracking-[0.3em]` en texto que se deba leer.
- CTAs: solo los aprobados en `PRODUCT.md`.
- Cero conteos que delaten volumen ("12", "02 / 12", "(4)" en filtros). Cero métricas que no sean resultados. No inventar cifras.
- Textos de plantilla prohibidos: "SEQ 001 / 169", "EN VIVO", "CII.IA // DIAGNÓSTICO", "Cargando CII.IA", "Agendar diagnóstico", "ANTES: …" en fichas.
- Idioma de la interfaz: español.
