# IMÁGENES — CII.IA

## Estado actual

### SOLUCIONES (5/5 disponibles y conectadas)

Carpeta: `public/soluciones/` · Formato `.jpg` · Se muestran en `BentoCard`
con las proporciones del bento (`wide` / `video` / `square`).

| Archivo | Tarjeta |
| --- | --- |
| `ai-execution.jpg` | AI Execution |
| `ai-lab.jpg` | AI Lab / Prototyping |
| `academy.jpg` | CII.IA Academy |
| `hiva.jpg` | HIVA |
| `pymes.jpg` | IA para PyMEs |

### CASOS (12/12 disponibles y conectados)

Carpeta: `public/casos/` · Formato `.jpg` · Proporción 16:9 · Se muestran en
`CaseCard` arriba del número clave. La ruta se deriva del `id` del caso
(`caseImageSrc` en `src/lib/ciiia.ts`), así que un archivo nuevo sólo tiene que
llamarse `caso-NN.jpg`.

`caso-01.jpg` … `caso-12.jpg` → los doce casos de `PROJECT_CASES`.

### NOSOTROS (1/1 disponible)

`public/nosotros-encabezado.jpg` → foto del laboratorio del PIIT.

### CICLO (0 disponibles)

Las 5 etapas no tienen imagen todavía. Ver «Pendientes».

## Dirección de arte: pendiente de reemplazo

Los 17 renders actuales de Soluciones y Casos son **objetos abstractos en 3D**
(pieza de ajedrez, lente, placas de vidrio) sobre fondo negro con luz cian. Son
coherentes entre sí, pero **no son el robot humanoide del hero**.

Decisión tomada: **se regeneran los 17 con el robot como protagonista.**
Los prompts, la ficha del personaje y las referencias extraídas del hero están
en [`docs/IMAGENES-ROBOT.md`](docs/IMAGENES-ROBOT.md) y
`design/robot-referencia/`. Los originales se dejan en `design/originales/` y
`npm run images` los convierte a WebP y los coloca en `public/`. Al entregar los
archivos no hay que tocar código: basta con respetar los nombres.

## Pendientes

### Ciclo de ejecución (5) y Contacto (1)

Nunca han existido. Escenas y prompts en
[`docs/IMAGENES-ROBOT.md`](docs/IMAGENES-ROBOT.md):
`public/ciclo/{descubrir,disenar,desarrollar,desplegar,escalar}.webp` (16:9) y
`public/contacto.webp` (16:9). Si no hay `.webp`, el sitio usa el `.jpg` con el
mismo nombre y, sin ninguno, el fallback de cada sección.

### Ecosistema (logos)

`public/logos/ecosistema/` ya tiene 28 archivos `.svg`. Falta verificar que
cubran a todas las organizaciones de `ECOSYSTEM_PARTNERS` y que se lean con
contraste suficiente sobre el fondo oscuro.
