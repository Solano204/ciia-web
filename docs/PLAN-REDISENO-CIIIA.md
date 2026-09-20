# PLAN DE REDISEÑO — Sitio CII.IA

> Guardar en `docs/PLAN-REDISENO-CIIIA.md` dentro del repo.
> Claude Code lo lee en cada fase. Cada fase = 1 rama + 1 prompt + 1 preview + revisión humana + merge.
> **Nunca ejecutar dos fases en el mismo prompt.**

---

## 0. Decisiones base (provisionales hasta que el cliente confirme)

| Tema | Decisión provisional | Por qué |
|---|---|---|
| Color de acción | **Dorado `#d4a22f`** como único acento. El azul `#0019ff` desaparece del sitio. | El cliente pidió respetar colores y uniformidad. El dorado ya es la marca del hero, del logo y de los CTAs que él aprobó. |
| Tipografía | **Display:** Clash Display. **Texto:** Satoshi. Ambas de Fontshare, servidas con `next/font/local`. Mono solo para números/datos, nunca en etiquetas largas. | El cliente dijo que la fuente "es muy Claude". Geist + mono en mayúsculas espaciadas es el default de IA. **Verificar la licencia antes de publicar.** |
| Cajas | **Fuera:** glass cards, pastillas eyebrow y marcos HUD. Se separa con espacio, líneas finas e imágenes a sangre. | El cliente dijo que "las cajas son muy de Claude". |
| Casos | **Retícula con filtros**, sin conteos, con imagen protagonista. | Es el enfoque que el cliente dijo que le gusta. |
| Secuencia roja (Reto) | Se **mueve al final de la home**, antes del cierre/Contacto. | El cliente pidió ponerla "al final" porque el cambio es drástico. |
| CTAs | Solo tres: **Contáctanos · Busca una asesoría · Agenda con nosotros**. Cada módulo cierra con uno. | Pedido explícito del cliente. |
| Robot | Protagonista de **todas** las imágenes. Prompts en `docs/IMAGENES-ROBOT.md`. | Pedido explícito del cliente. |
| Motion | Sutil. Se queda el cursor de fluido (recoloreado). Máximo 1 efecto de impacto por página. | Pedido explícito del cliente. |

⚠️ **Zona de otro desarrollador.** Hero, Reto, Nosotros, Ecosistema, Contacto y Footer fueron de otro desarrollador. Coordinar antes de tocar esas fases.

---

## 1. Arquitectura nueva (de landing a sitio)

```
/                → Home resumen: Hero + un teaser por sección + Reto al cierre + CTA final
/soluciones      → Las 5 soluciones (retícula visual)
/soluciones/[id] → Ficha (ya existe; se rediseña)
/ciclo           → Ciclo de ejecución en carrusel
/casos           → Retícula con filtros ("Algunos de nuestros casos")
/casos/[id]      → Ficha (ya existe; se rediseña)
/nosotros        → Manifiesto, laboratorio, fundadores, principios
/ecosistema      → Logos por categoría
/contacto        → Formulario + datos directos
```

**Reglas de la arquitectura**
- `Navbar` y `Footer` viven en `app/layout.tsx`, así que aparecen en todas las páginas, fichas incluidas.
- El nav usa rutas, no anclas `#`.
- Menú hamburguesa por debajo de `lg`.
- La home **no** repite contenido completo: cada teaser lleva 1 frase + 1 imagen + 1 CTA hacia su página.

---

## 2. Reglas globales (aplican a todas las fases)

**Texto**
- Máximo 1 frase por tarjeta.
- Máximo 2 líneas de párrafo por sección en la home.
- El detalle vive en páginas internas.

**Jerarquía y color**
- Un H1 por página.
- Regla 60-30-10: negros y grises / imagen / dorado solo en CTA y datos clave.

**Etiquetas**
- 12 px como mínimo.
- Tracking ≤ 0.08em.
- Nada de `tracking-[0.3em]` en texto que se deba leer.

**Datos**
- Cero conteos que delaten volumen: no "12", no "02 / 12", no "(4)" en filtros.
- Nada de métricas que no sean resultados. Un conteo de funciones ("3 modelos") no se pinta como KPI.
- No inventar cifras. Si falta un dato, se omite.

**Textos de plantilla a eliminar**
- "SEQ 001 / 169"
- "EN VIVO"
- "CII.IA // DIAGNÓSTICO"
- "Cargando CII.IA"
- "Agendar diagnóstico"
- "ANTES: …" en fichas

**Accesibilidad y motion**
- Contraste WCAG AA.
- `prefers-reduced-motion` en todo.
- Solo se animan `transform` y `opacity`.

**Imágenes**
- WebP/AVIF, con `loading="lazy"` fuera del primer pliegue.
- ALT descriptivo en imágenes con contenido.

**Definición de terminado de cada fase**
- `npm run build` sin errores.
- `npm run lint` sin errores.
- Móvil 390 px sin scroll horizontal.
- Capturas antes/después.

---

## 3. Fases (en orden)

### FASE 0 — Base y limpieza (sin cambios visuales)
**Documentos y contexto**
- Crear `PRODUCT.md` y `DESIGN.md` con las decisiones de la sección 0.
- Integrar `CLAUDE.md` (playbook) conservando la regla de `AGENTS.md`.

**Skills**
- Podar `.claude/skills`. Se quedan:
  - `frontend-design`
  - `web-design-guidelines`
  - `gsap-core`
  - `gsap-scrolltrigger`
  - `gsap-react`
  - `gsap-performance`
  - `webapp-testing`
- El resto se mueve a `.claude/skills-archivo/` (no se borra).

**Limpieza del repo**
- Sacar `public/documentos/` del sitio público, porque hoy es descargable.
- Pasar las fuentes a local (el paquete `geist` ya está instalado) para que el build no dependa de red. Es temporal hasta la Fase 1.
- Arreglar los 4 errores de lint.
- Quitar el fallback a `picsum.photos` en `CaseDetail`.
- Corregir `metadataBase`, porque el deploy es en Cloudflare, no en Vercel.

### FASE 1 — Sistema de diseño
**Tokens y fuentes**
- Unificar tokens en `globals.css`: un solo acento dorado, y eliminar `--accent-v2` y derivados.
- Superficies y textos en una sola escala de grises.
- Instalar las fuentes nuevas con `next/font/local`.
- Escala tipográfica: display, H2, cuerpo y dato.

**Componentes base sin cajas**
- `Section` y `SectionHeader`: título + 1 frase, sin pastilla.
- `Cta`: primario dorado y secundario de texto, solo con los 3 textos aprobados.
- `MediaCard`: imagen protagonista + título + 1 frase, sin borde ni glass.

**Limpieza de estilos**
- Borrar `glass-*`, `card-surface` y `surface-flat-v2`.
- Borrar `EyebrowBadge` en su variante pastilla y `HudFrame`.
- Recolorear `SplashCursor` a un dorado tenue, manteniendo su intensidad actual.

### FASE 2 — Arquitectura multipágina
- Crear las rutas de la sección 1.
- Mover `Navbar` y `Footer` al layout.
- Nav con rutas, estado activo por página y hamburguesa móvil accesible (Esc, foco atrapado, cierre al navegar).
- Home resumen: un teaser por sección y un CTA final.
- Página 404 propia con salida al inicio.
- Prefetch: el export escribe los payloads `__next.*/__PAGE__.txt` en carpetas y el cliente los pide con nombre plano, lo que daba 404. `trailingSlash: true` no lo resuelve; se corrige con `scripts/flatten-prefetch.mjs` (postbuild, ver README). Verificado en local con wrangler; pendiente confirmar en el preview de Cloudflare.

### FASE 3 — Hero + Reto
**Hero**
- H1 que diga qué hacen y para quién. Se conserva "De la idea a la operación" como mensaje central.
- Máximo 4 elementos sobre el pliegue.
- Quitar textos de plantilla y el HUD.
- El texto y el CTA no desaparecen al 8% del scroll: se mantienen legibles más tiempo.

**Carga de frames**
- Loader no bloqueante: se pinta el frame 1 con el texto de inmediato.
- Precarga progresiva: primero cada 4.º frame, luego el resto.
- Frames convertidos a WebP.

**Reto (secuencia roja)**
- Se mueve al final de la home como cierre, con una transición gradual desde negro.
- Carga diferida hasta que se acerca al viewport.
- CTA: "Agenda con nosotros".

### FASE 4 — Soluciones
- **Teaser en home:** 5 imágenes del robot, cada una con nombre + 1 frase + precio "desde". Sin cajas.
- **`/soluciones`:** retícula visual de las mismas 5 + CTA "Busca una asesoría".
- **Ficha:**
  - Hero con imagen grande.
  - "Qué incluye" en 3 líneas.
  - Etapas del ciclo donde interviene.
  - Precio de referencia.
  - CTA "Busca una asesoría" en dorado.

### FASE 5 — Ciclo de ejecución
- Carrusel horizontal de 5 tarjetas. Se cambia con clic, flechas, puntos, swipe y teclado. **No con scroll.**
- Cada tarjeta lleva:
  - Imagen del robot en esa etapa (`/public/ciclo/{id}.webp`).
  - Número y nombre.
  - 1 frase.
  - Entregable.
- Quitar la barra "20%".
- Mientras falten imágenes, usar un fallback elegante (gradiente + número), nunca la caja gris.
- CTA: "Agenda con nosotros".

### FASE 6 — Casos
**Listado `/casos`**
- Título "Algunos de nuestros casos".
- Filtros por sector y tecnología, sin conteos.
- Retícula de tarjetas con imagen protagonista, título y sector.
- Métrica solo si es resultado real; si no, no se muestra.

**Home**
- Teaser con 3 casos, empezando por el caso 01, que usa `FEATURED_CASE_METRICS` (hoy definido pero sin usar).

**Ficha**
- Imagen grande.
- Reto, enfoque y resultado en 1 línea cada uno.
- Casos relacionados.
- CTA "Busca una asesoría para tu caso".

### FASE 7 — Nosotros
- Quitar la frase duplicada del hero.
- Foto del laboratorio a sangre.
- Cifras sin "12 soluciones documentadas".
- Fundadores con logos a color.
- Principios ("Descubrimos / no diagnosticamos") conservados pero más compactos.
- CTA: "Contáctanos".
- Resuelto en esta fase: error de hidratación con `prefers-reduced-motion: reduce` en `/` y `/nosotros` (detectado en la Fase 2). Causa: `BlurText`, que solo usa About, leía el `useReducedMotion` de framer-motion, que en el cliente da la preferencia real desde el primer render. Ahora usa `@/hooks/use-reduced-motion` (servidor y hidratación = `false`) y la preferencia se aplica tras el montaje. Challenge no intervenía.

### FASE 8 — Ecosistema
- Logos a color completo, más grandes, con hover sutil. Que resalten y no se vea apagado.
- Categorías como filtro.
- La cifra "más de 50" debe coincidir con los logos mostrados; si no, se usa "Algunas de las organizaciones…".
- CTA: "Contáctanos".

### FASE 9 — Contacto, Footer y legal
- **Formulario (solo diseño):** 4 campos, labels visibles, validación al salir del campo, foco dorado, estado de éxito visible y envío por `mailto:`. El backend queda en la Fase 11.
- **Datos directos:** `tel:` y `mailto:` clicables, más «Cómo llegar» a Google Maps.
- Imagen del robot (`/public/contacto.jpg`, como banda superior). Sin el archivo, fallback de degradado con brillo dorado tenue, decidido en el build.
- **Footer:**
  - Aviso de privacidad (pendiente del documento del cliente).
  - Año dinámico en cliente.
  - Redes.
- **SEO:** pasa a la Fase 11 (la Fase 9 quedó solo en diseño).

### FASE 10 — Imágenes del robot (pista paralela)
- Generar las 17 imágenes de Soluciones y Casos, las 5 del Ciclo y la de Contacto con `docs/IMAGENES-ROBOT.md`.
- Mismo nombre de archivo = cero cambios de código.
- Convertir a WebP de 1600 px de ancho como máximo.

### FASE 11 — Pase final de motion + QA
- Presupuesto de motion por página:
  - 1 efecto de impacto.
  - Microinteracciones en todos los interactivos.
  - Reveals suaves.
- Quitar efectos redundantes (TiltCard, DecayImage y BlurText si compiten).
- Lighthouse móvil ≥ 90.
- `axe` sin errores.
- Checklist de lanzamiento web con todo lo 🔴 cerrado.
- **Formulario real (backend):** endpoint en Cloudflare Worker o un servicio de formularios en lugar de `mailto:`.
  - Validación también en servidor.
  - Estado de éxito y de error reales, con reintento.
  - Anti-bots (honeypot o Turnstile) y límite de envíos.
- **SEO (viene de la Fase 9):** Open Graph, `sitemap.xml`, `robots.txt` y favicon propio.
- Pendiente: verificar prefetch en Cloudflare antes de producción.
- Pendiente: actualizar Node local a 22. El wrangler actual (4.135+) lo exige y hoy se usa `wrangler@4.86.0` fijado, con Node 20.20.2.

---

## 4. Pendientes del cliente (no bloquean empezar)
1. Confirmar el dorado como color único.
2. Elegir tipografía (se muestran 2 opciones en la Fase 1).
3. URL de agenda (Calendly o similar).
4. Aviso de privacidad.
5. Resultados reales de los casos 02 al 12.
6. Los reels: descripción o grabación para integrarlos.