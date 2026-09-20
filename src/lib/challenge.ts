export const CHALLENGE_FRAME_COUNT = 169;

export const challengeFramePath = (n: number) =>
  `/frames2/frame_${String(n).padStart(4, "0")}.jpg`;

/** Rampa suave de 0 a 1 entre `from` y `to` (fracciones del scroll de la sección). */
const ramp = (progress: number, from: number, to: number): number => {
  const t = Math.min(1, Math.max(0, (progress - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

/**
 * La secuencia abre en rojo saturado y cierra en un fotograma casi blanco,
 * pero llega desde una sección casi negra y desemboca en Contacto, también
 * casi negra. Dos velos negros de opacidad evitan el corte en ambos extremos:
 * el de entrada deja que el rojo suba de menos a más, y el de salida devuelve
 * el blanco al fondo del sitio antes de que aparezca el CTA.
 *
 * El texto vive en la franja roja: pasado el ~60% los frames viran a rosa y
 * blanco, y la copia clara dejaría de leerse.
 */
export function challengeLayers(progress: number) {
  return {
    enterVeil: 1 - ramp(progress, 0, 0.45),
    text: ramp(progress, 0.38, 0.48) * (1 - ramp(progress, 0.58, 0.68)),
    exitVeil: ramp(progress, 0.6, 0.9),
    cta: ramp(progress, 0.85, 0.95),
  };
}

/** Con reduced motion la escena es una sola pantalla: frame rojo fijo, todo visible. */
export const CHALLENGE_REDUCED_PROGRESS = 0.5;
export const CHALLENGE_REDUCED_LAYERS = { enterVeil: 0.25, text: 1, exitVeil: 0, cta: 1 };
