export const FRAME_COUNT = 169;

export const framePath = (n: number) =>
  `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

/** Fracción del scroll del Hero en la que el texto empieza a salir y en la que ya no se ve. */
export const HERO_TEXT_FADE_START = 0.35;
export const HERO_TEXT_FADE_END = 0.5;
