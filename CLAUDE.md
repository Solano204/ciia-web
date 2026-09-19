@AGENTS.md

# CLAUDE.md — Playbook de diseño web y apps

> Pon este archivo en la raíz de cada proyecto. Claude Code lo lee al inicio de cada sesión.
> Idioma de trabajo: español. Respuestas directas, sin relleno.

---

## 0. Orden de lectura obligatorio antes de tocar código

1. `PRODUCT.md`: audiencia, propósito, acción principal, voz. Si no existe, pídelo o genéralo con `/impeccable init`.
2. `DESIGN.md`: tokens de color, tipografía, espaciado y motion. Si no existe, créalo antes de diseñar.
3. `docs/checklists/`: `Checklist_Lanzamiento_Web.md` y `Checklist_Publicacion_Google_Play.md`.

**Regla:** ninguna decisión visual se toma fuera de `DESIGN.md`. Si algo nuevo hace falta, primero se agrega al archivo y luego se usa.

---

## 1. Stack de skills (instalar en este orden y parar ahí)

| # | Skill | Rol | Instalar |
|---|---|---|---|
| 1 | anthropics/skills@frontend-design | Base estética | `npx skills add anthropics/skills@frontend-design` |
| 2 | vercel-labs/agent-skills | Calidad técnica (a11y, perf, React) | `/plugin marketplace add vercel-labs/agent-skills` |
| 3 | **Una sola** visual | Sistema de diseño | Ver tabla abajo |
| 4 | Stop Slop (copy) | Textos sin tics de IA | `git clone https://github.com/hardikpandya/stop-slop ~/.claude/skills/stop-slop` |
| 5 | Emil Kowalski (opcional) | Pulido de motion | `npx skills add emilkowalski/skill` |

**Visual: elige una según el proyecto.**
- **UI/UX Pro Max:** cliente sin identidad definida. Genera el sistema por industria.
- **Impeccable:** proyecto que se itera semanas. Usa `/impeccable init` y los comandos `polish`, `audit`, `critique`, `animate`, `quieter`.
- **Taste Skill:** control fino. Perillas `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY` (1–10).

**Prohibido:**
- Instalar dos skills visuales a la vez, porque se pelean.
- Instalar Stop Slop y Humanizer juntas.
- Instalar una skill sin leer antes su `SKILL.md`, porque pueden traer prompt injection.
- Confiar en un comando sin confirmarlo en el repo.

**Opcionales por tipo de trabajo:**
- Huashu Design: 3 variantes para presentar al cliente, y export a PPTX.
- Understand Anything: cuando el código es heredado.

---

## 2. Flujo por proyecto (fases, no saltarse ninguna)

1. **Brief.** Llenar `PRODUCT.md`: quién visita, qué problema trae y cuál es la única acción que queremos.
2. **Estructura sin animación.** Wireframe funcional con jerarquía, copy real y CTA. Debe verse bien estático.
3. **Sistema visual.** Aplicar `DESIGN.md` con la skill visual elegida.
4. **Motion.** Recién aquí se anima. Emil Kowalski y GSAP entran en esta fase, nunca antes.
5. **QA técnico.** Auditoría de las reglas de Vercel, Lighthouse, axe y un móvil real con 4G.
6. **Checklist de lanzamiento.** Cerrar todo lo 🔴 antes de publicar.
7. **Preview al cliente.** Link de preview de Cloudflare Workers (wrangler) por rama, nunca producción.

---

## 3. Reglas de diseño no negociables

**Percepción (psicología)**
- **Efecto halo:** el usuario juzga en ~50 ms. El hero se diseña primero y con más cuidado que todo lo demás.
- **Carga cognitiva:** cada sección tiene un solo objetivo. Ante la duda, quitar.
- **Pico-final:** diseñar al menos 2 momentos "pico" (microinteracción memorable) y un cierre fuerte (CTA final + página de gracias).
- **Menos palabras transmiten más confianza.** Hero con titular + subtítulo corto. Nada de párrafos.

**Layout**
- Usa jerarquía visual, no patrón F. Lo más importante es lo más grande y contrastado.
- Lo crítico va en los primeros 1–2 scrolls: qué haces, para quién, prueba social y CTA.
- La navegación es convencional: arriba a la derecha o al centro, máximo 5–7 links.
- Espacio en blanco generoso en landings. En dashboards, densidad y mínimo scroll.
- Usa "Cargar más" en vez de scroll infinito, para que el footer sea alcanzable.

**Color**
- Regla 60-30-10: 60% neutros, 30% marca, 10% acento (solo CTAs).
- Máximo 2–3 colores. Los gradientes, dentro de un mismo tono.
- Más grises y menos negro o blanco puros.
- Contraste WCAG AA mínimo.
- Los íconos no llevan color. El color comunica estado.
- Usa colores semánticos: eliminar es rojo aunque no sea de marca.
- **Dark mode se diseña, no se invierte:** tarjetas más claras que el fondo, texto gris claro y blanco solo para lo clave.
- Estados de color: hover un poco más claro, presionado un poco más oscuro, deshabilitado desaturado.
- Prohibidos los botones fantasma en CTAs principales.

**Tipografía**
- Máximo 2 familias: display para titulares y legible para cuerpo.
- Evitar los defaults de IA (Inter, Roboto, Arial, Space Grotesk) salvo que la marca los exija.
- H1 único por página, H2 para dividir secciones, párrafo nunca decorativo.
- Íconos del mismo tamaño que el line-height del texto.

**Consistencia**
- Todo sale de tokens. Cero valores "a ojo".
- La página 3 debe verse igual de cuidada que la home.

---

## 4. Anatomía de página

### 4.1 Home / landing (en este orden)

1. **Navegación**
   - Logo clicable al inicio y 3–6 links.
   - CTA de nav con color de acento.
   - Sticky si el scroll es largo; hamburguesa en móvil.
2. **Hero (máximo ~4 elementos)**
   - H1: qué haces y para quién, entendible en 5 segundos.
   - Subtítulo de una línea.
   - **Un** CTA principal: "Agendar llamada", "Prueba gratis" o "Cotizar".
   - Prueba social breve: logos, número de clientes, estrellas o caras.
   - Visual o video de fondo sin ruido.
3. **Problema → solución.** Qué le duele al visitante y cómo lo resuelves, con headline + 1 párrafo.
4. **Servicios o beneficios.** 3–6 bloques escaneables: ícono + título + una línea.
5. **Prueba social profunda.** Testimonios atribuibles y casos con resultados en números.
6. **Cómo funciona.** 3 pasos.
7. **Diferenciador u oferta.** Comparativa o paquetes/precios si aplica.
8. **FAQ desplegable.** Resuelve objeciones de compra.
9. **CTA final.** Repite el CTA principal con una razón para actuar hoy.
10. **Footer**
    - Contacto real (`tel:`, `mailto:`) y redes verificadas.
    - Legal: privacidad, términos y "Uso de IA" si aplica.
    - Copyright dinámico.

### 4.2 Toda página, sin excepción

- **Un objetivo** y un CTA dominante.
- `<title>` y meta description únicos, H1 único y Open Graph.
- Estados completos en cada elemento interactivo: default, hover, presionado, deshabilitado y carga.
- Formularios con validación en tiempo real, error y éxito diferenciados, y el mínimo de campos.
- Cero Lorem ipsum, cero links muertos, cero scroll horizontal en móvil.
- Imágenes en WebP/AVIF, con lazy load y ALT.
- Página 404 personalizada con salida al inicio.

### 4.3 Apps móviles (adicional)

- Áreas táctiles de mínimo 44×44 px.
- Barra inferior de 3–5 pestañas, con estado activo e inactivo claramente distinto.
- Un solo estilo de íconos y badges de notificación en la barra.
- Feedback táctil o visual en cada acción positiva (like, guardar, completar).
- Para publicar, cumplir `Checklist_Publicacion_Google_Play.md` completo (target API, 12 testers por 14 días, etiqueta de datos).

---

## 5. Sistema de motion

**Principio rector:** todo lo que tiene propósito se anima; nada se anima como decoración. Lo que se mueve sin razón se lee barato (heroes en loop, CTAs que rebotan, testimonios deslizantes).

**Los 3 fundamentos**
1. **Significado.** El movimiento refleja la personalidad de la marca: juguetón, elegante o técnico. Buscar metáforas del giro del cliente para loaders y transiciones.
2. **Física.**
   - Una sola dirección por grupo que anima a la vez.
   - Lo grande se mueve lento y lo pequeño rápido.
   - Nunca easing lineal, salvo estética digital o retro intencional.
3. **Coreografía.** Lo que no se mueve tiene la menor jerarquía. Se anima primero lo principal y después lo secundario, en escalonado.

**Las 5 técnicas base (80% de los sitios premiados)**
1. Scroll tracking: GSAP ScrollTrigger o Motion `useScroll`, con Lenis para suavizar.
2. Entrada al viewport: ScrollTrigger o `useInView` (IntersectionObserver).
3. `position: sticky` para secciones pinneadas.
4. Easing como identidad: definido en tokens.
5. Text splitting: GSAP SplitText. Conservar el texto original para lectores de pantalla y recalcular en resize.

**Efecto tipo Apple:** video que avanza y retrocede con el scroll (GSAP + Scrollyvideo). No es 3D en vivo.

**Tokens de motion** (valores iniciales sugeridos; ajustar en `DESIGN.md` por marca)
```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* entradas */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* movimientos entre estados */
--dur-micro: 150ms;   /* hover, press, toggles */
--dur-base: 250ms;    /* modales, menús, popovers */
--dur-large: 500ms;   /* reveals de sección, imágenes grandes */
--stagger: 60ms;      /* entre elementos hermanos */
```

**Presupuesto por página**
- Máximo 1–2 componentes "de impacto" (Aceternity, ThreeUI).
- Microinteracciones en todos los interactivos.
- Scrolljacking: no, salvo pedido explícito del cliente.

**Obligatorio**
- `prefers-reduced-motion`: toda animación tiene versión reducida. Con GSAP, usar `gsap.matchMedia()`.
- Animar solo `transform` y `opacity`; nada de `width`, `top` ni `left`.
- Probar en móvil real de gama media. Si baja de 60 fps, se simplifica.
- Lenis o smooth scroll no deben romper navegación por teclado ni anclas.

---

## 6. Librerías de componentes — cuándo usar cuál

| Necesidad | Librería | Nota |
|---|---|---|
| Base de componentes | shadcn/ui | Todo lo demás se monta encima |
| Hero de impacto | Aceternity UI | 1–2 por página, máximo |
| Texto animado, contadores, marquees | Magic UI / React Bits | Acentos, no estructura |
| Microinteracciones premium discretas | SmoothUI | Primera opción para inputs y popovers |
| Look con personalidad fuerte | RetroUI (neobrutalista) | Marcas jóvenes y creativas; nunca fintech o salud |
| 3D sin Three.js | ThreeUI | Medir peso en móvil antes de comprometerse |
| Smooth scroll | Lenis | Con reduced-motion |
| Coreografías y scroll | GSAP (+ScrollTrigger, SplitText) | Plugins gratis, incluido uso comercial |
| Transiciones simples | Motion o CSS | No usar GSAP para un hover |

Instalación vía registry de shadcn: copiar el comando exacto de la página del componente, no adivinarlo.

---

## 7. Copy

- Pasar todo texto público por Stop Slop antes de entregar.
- Titulares cortos y afirmativos, sin tecnicismos.
- Se escribe para escanear: títulos, frases cortas y números concretos.
- Se diseña para el visitante, no para el gusto del cliente ni el nuestro.

---

## 8. Definición de terminado (DoD)

Una página no está lista hasta que:
- [ ] Cumple la anatomía de la sección 4.
- [ ] Pasa la auditoría de las reglas de Vercel sin errores de accesibilidad.
- [ ] Tiene Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO (móvil).
- [ ] No tiene errores en consola.
- [ ] Funciona con `prefers-reduced-motion` activado.
- [ ] Se probó en un móvil real con datos móviles y en incógnito.
- [ ] Tiene todo lo 🔴 del checklist aplicable cerrado.
- [ ] Una búsqueda de `lorem`, `TODO`, `example.com` y `localhost` no devuelve nada.

---

## 9. Legal (recordatorio)

- Las cláusulas de arbitraje y términos con consumidores en México chocan con la LFPC. Las revisa un abogado; el agente no redacta la versión final.
- Si el producto usa IA: página "Uso de IA", etiquetado del contenido generado y botón de reporte in-app (requisito de Google Play).