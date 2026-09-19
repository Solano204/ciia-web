# PRODUCT.md — CII.IA

## Qué es
CII.IA es el Centro de Innovación Industrial en Inteligencia Artificial. Opera desde el PIIT, en Apodaca, Nuevo León. Lleva la inteligencia artificial de la idea a la operación: laboratorio propio, integración con sistemas existentes y adopción acompañada en piso. Lo administra Monterrey IT Clúster.

Lema institucional: "Global Solutions delivered Locally". Mensaje central del sitio: "De la idea a la operación".

## Audiencia
Directivos de manufactura, retail, finanzas y gobierno en Nuevo León. Toman decisiones, tienen poco tiempo y desconfían de la promesa vaga. Vienen a saber qué hacemos, si lo hemos hecho antes y cómo empezar.

## Acción principal
Agendar una conversación. Todo módulo cierra con un solo CTA hacia esa acción.
Mientras `SCHEDULING_URL` (en `src/lib/ciiia.ts`) esté vacío, "Agenda con nosotros" lleva a Contacto.

## Voz de marca
- Directa. Pocas palabras.
- Afirmativa y concreta: qué hacemos, para quién, qué entregamos.
- Sin tecnicismos ni tono de startup. Sin adjetivos que no se puedan probar.
- Se escribe para escanear: frases cortas, un mensaje por bloque.

## CTAs aprobados
Solo estos tres. No crear variantes ni reescribirlos por sección.
1. Contáctanos
2. Busca una asesoría
3. Agenda con nosotros

Variante permitida, solo en la ficha de caso: "Busca una asesoría para tu caso" (`CTA_COPY`).
Enlaces como "Ver soluciones" son navegación secundaria, no CTAs: máximo uno por sección, junto al CTA dorado.

## Regla de cifras
No inventar cifras, clientes ni cargos. Todo dato sale de `src/lib/ciiia.ts`.
Si falta un dato, se omite (o se usa `SIN_DATO`). Un conteo de funciones o de contenido ("3 modelos", "12 soluciones") no se presenta como resultado.

## Pendientes del cliente
Confirmar dorado y tipografía, URL de agenda, aviso de privacidad y resultados reales de los casos 02 al 12.
