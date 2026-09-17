export const CHALLENGE_FRAME_COUNT = 169;

export const challengeFramePath = (n: number) =>
  `/frames2/frame_${String(n).padStart(4, "0")}.jpg`;

export const CHALLENGE_TEXT_FADE_IN_END = 0.18;

/**
 * La secuencia abre en rojo saturado y cierra en un fotograma casi blanco,
 * pero llega desde un hero casi negro y desemboca en Soluciones, también casi
 * negra. Sin estos velos el tono salta dos veces de golpe: el de entrada hace
 * que el rojo nazca del fondo del sitio, y el de salida devuelve el blanco a
 * ese mismo fondo antes de que empiece la siguiente sección.
 */
export const CHALLENGE_ENTER_FADE_END = 0.12;
export const CHALLENGE_EXIT_FADE_START = 0.82;
