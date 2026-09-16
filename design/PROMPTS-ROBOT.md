# Pack de generación — El robot CII.IA como hilo conductor

Para regenerar los 17 renders de Soluciones y Casos (más los 6 pendientes de
Ciclo y Contacto) con el robot del hero como protagonista.

Los renders que hay hoy en `public/soluciones/` y `public/casos/` son objetos
abstractos (pieza de ajedrez, lente, placas de vidrio). Este pack los sustituye
por el personaje.

## 1. Referencias del personaje

En `design/robot-referencia/`, extraídas de la propia secuencia del hero. **Pásalas
como image reference / character reference al generador.** Es lo que más pesa
para que el robot sea el mismo en las 23 imágenes; el texto solo no basta.

| Archivo | Qué aporta |
| --- | --- |
| `01-busto-dorado.jpg` | Cabeza y casco en detalle, visor, aletas, luz dorada |
| `02-torso-dorado.jpg` | Pectoral con «CII.IA», emisor circular, hombreras |
| `03-cuerpo-completo-cian.jpg` | Proporciones de cuerpo entero, pose frontal, variante cian |
| `04-mano-escena-roja.jpg` | Mano articulada, gesto, ambiente rojo del cierre |

## 2. Ficha del personaje (va en todos los prompts)

**Cuerpo.** Robot humanoide de placas mate blanco hueso / gris claro, con
desgaste y micro-rayaduras sutiles. Bajo las placas, estructura interna gris
oscuro casi negra: cuello, antebrazos, manos articuladas de dedos negros,
interior de muslos y articulaciones. Proporción atlética, hombreras planas y
anchas en forma de pétalo.

**Cabeza.** Casco ovoide liso, sin ojos ni boca. Una **sola ranura de visor
horizontal luminosa** cruzando la cara. Dos aletas/antenas rectas apuntando
hacia arriba y atrás.

**Marcas luminosas** (siempre las mismas cuatro):
1. Texto **«CII.IA»** grabado y encendido en el pectoral.
2. **Emisor circular** encendido en el abdomen, bajo el texto.
3. **Tira de luz** en el canto de cada hombrera.
4. **Collarín** encendido en la base del cuello.

**Iluminación y ambiente.** Estudio oscuro, fondo casi negro (`#0a0a0b`) con
degradado suave y neblina volumétrica baja. Luz clave cinematográfica frontal
baja, luz de contra marcando la silueta. Piso oscuro con reflejo tenue.
Profundidad de campo corta. Grano fino de película. Sin logotipos ajenos, sin
texto suelto, sin marcas de agua.

## 3. Color: dos variantes, no mezclar dentro de una sección

La secuencia del hero recorre el dorado y el cian, así que **ambos son del
sitio**. La regla es por sección, no por imagen:

| Variante | Hex | Dónde |
| --- | --- | --- |
| **Ámbar** | `#d4a22f` | Ciclo de ejecución, Contacto |
| **Cian** | `#3d52ff` … cian brillante | Soluciones, Casos |
| **Rojo** | — | Solo el remate final (corrección 6). No usar aquí. |

Dentro de una misma sección, las cinco o doce imágenes llevan **exactamente** la
misma temperatura de color, la misma intensidad de glow y el mismo nivel de
neblina. Es lo que hace que la retícula se lea como un sistema.

## 4. Bloque de estilo (pegar al final de cada prompt)

```
Personaje: robot humanoide de placas mate blanco hueso y gris claro con desgaste
sutil, estructura interna gris oscuro en cuello, antebrazos y manos de dedos
negros, hombreras planas en forma de pétalo. Casco ovoide liso sin ojos ni boca,
una sola ranura de visor horizontal luminosa, dos antenas rectas hacia arriba.
Texto «CII.IA» encendido en el pectoral, emisor circular encendido en el abdomen,
tira de luz en el canto de cada hombrera, collarín encendido.
Estudio oscuro, fondo casi negro #0a0a0b con neblina volumétrica baja, luz clave
cinematográfica frontal baja y contraluz marcando la silueta, piso oscuro con
reflejo tenue, profundidad de campo corta, grano fino de película.
Acento luminoso: <ÁMBAR #d4a22f | CIAN>.
Render 3D fotorrealista, octane/redshift, 8k. Sin texto suelto, sin logotipos
ajenos, sin marca de agua.
```

## 5. Los 17 prompts

### Soluciones — acento CIAN — 5 imágenes

Carpeta `public/soluciones/` · **16:9** · nombres exactos (no cambiar).

| Archivo | Escena |
| --- | --- |
| `ai-execution.jpg` | El robot de pie ante un tablero de estrategia flotante, moviendo una pieza con la mano. Plano medio, tres cuartos. Decidir qué merece construirse. |
| `ai-lab.jpg` | El robot en banco de laboratorio sosteniendo un componente industrial a contraluz, inspeccionándolo con el visor. Brazos robóticos desenfocados al fondo. |
| `academy.jpg` | El robot de pie frente a paneles de conocimiento apilados y translúcidos, con la mano extendida hacia ellos. Transferencia de capacidad. |
| `hiva.jpg` | El robot de frente, en el centro, rodeado de pequeños nodos de agente orbitando a distintas alturas, unidos por hilos de luz. Plano medio. |
| `pymes.jpg` | Un robot tendiendo la mano abierta hacia el frente, a escala humana, cercano y accesible. Plano medio, ligeramente en contrapicado. |

### Casos — acento CIAN — 12 imágenes

Carpeta `public/casos/` · **16:9** · `caso-01.jpg` … `caso-12.jpg`. El código
deriva la ruta del `id` (`caseImageSrc`), así que el nombre debe ser exacto.

| Archivo | Caso | Escena |
| --- | --- | --- |
| `caso-01.jpg` | Sistema de Inspección | Robot inspeccionando una pieza en línea de producción, retícula de visión proyectada sobre ella |
| `caso-02.jpg` | Mantenimiento Predictivo | Robot con la mano sobre una máquina industrial, ondas de diagnóstico saliendo del punto de contacto |
| `caso-03.jpg` | Plataforma Inteligente de Producción | Robot ante un muro de paneles de planta, brazos abiertos abarcándolos |
| `caso-04.jpg` | Inspección de Calidad | Primer plano del visor del robot examinando una pieza pequeña sostenida entre dos dedos |
| `caso-05.jpg` | Plataforma de Asistentes Virtuales | Robot de frente con varias siluetas de conversación luminosas flotando alrededor de la cabeza |
| `caso-06.jpg` | Sistema de Recomendación | Robot eligiendo entre varios objetos flotantes; el elegido se enciende |
| `caso-07.jpg` | Sistema de Visión Retail | Robot observando anaqueles de tienda, marcos de detección sobre los productos |
| `caso-08.jpg` | Sistema de Visión para Seguridad | Robot de guardia en nave industrial en penumbra, visor barriendo el espacio |
| `caso-09.jpg` | Detección de Intrusos | Robot en perímetro nocturno, haz de barrido cruzando el encuadre |
| `caso-10.jpg` | Análisis de Comportamiento de Cartera | Robot ante curvas y flujos de datos flotantes, mano siguiendo una trayectoria |
| `caso-11.jpg` | Detección de Anomalías y Planeación de Demanda | Robot ante una retícula de puntos donde uno destaca encendido; el resto apagados |
| `caso-12.jpg` | Plataforma de Incidencia Delictiva | Robot ante un mapa urbano proyectado, zonas marcadas con intensidad distinta |

## 6. Los 6 pendientes (para las correcciones 4 y 8)

### Ciclo de ejecución — acento ÁMBAR — 5 imágenes

Carpeta `public/ciclo/` · **4:3**. Las cinco con el mismo encuadre y la misma
distancia de cámara: al pasar de una etapa a otra en el carrusel, lo único que
debe cambiar es lo que hace el robot.

| Archivo | Etapa | Escena |
| --- | --- | --- |
| `descubrir.jpg` | 01 DESCUBRIR | Robot inclinado analizando una pieza, retícula de visión sobre ella |
| `disenar.jpg` | 02 DISEÑAR | Robot ante planos técnicos proyectados, trazando una línea con el dedo |
| `desarrollar.jpg` | 03 DESARROLLAR | Robot ensamblando en banco de laboratorio, celda de manufactura detrás |
| `desplegar.jpg` | 04 DESPLEGAR | Robot en planta junto a línea de producción en marcha |
| `escalar.jpg` | 05 ESCALAR | Cinco robots idénticos en formación, en profundidad, el primero enfocado |

### Contacto — acento ÁMBAR — 1 imagen

`public/contacto.jpg` · **16:9** · Robot de frente con la mano abierta tendida
hacia el espectador, en gesto de invitación. Postura abierta, no defensiva.
Cercano, plano medio.

## 7. Al entregar los archivos

Ponerlos en su carpeta con el nombre exacto de las tablas. **No hay que tocar
código**: las rutas ya están cableadas y los `alt` van vacíos a propósito
(imágenes decorativas; el título de cada tarjeta lleva la información).

Antes de publicar, revisar las tres cosas que rompen la uniformidad:
- que las 12 de Casos tengan el mismo encuadre y peso visual entre sí;
- que el glow no varíe de intensidad de una tarjeta a otra;
- que ninguna traiga texto legible además del «CII.IA» del pectoral.
