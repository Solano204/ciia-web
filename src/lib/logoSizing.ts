export type LogoSizing = {
  /** Razón ancho/alto del tile que contiene el logo. */
  tileRatio: number;
  /** Área que ocupa cada logo, en unidades de alto² del tile. */
  area: number;
  /** Techos (fracción del tile) para que ningún logo toque los bordes. */
  maxWidth: number;
  maxHeight: number;
};

/**
 * Ancho del logo en % del tile, a área constante: un logo apaisado (3:1) y uno
 * vertical (3:4) pesan lo mismo a la vista, en vez de que el vertical se vea
 * enorme y el apaisado como una tira.
 */
export function logoWidthPercent(logoRatio: number, sizing: LogoSizing): number {
  const byArea = Math.sqrt(sizing.area * logoRatio) / sizing.tileRatio;
  const byHeight = (sizing.maxHeight * logoRatio) / sizing.tileRatio;
  return Math.min(byArea, byHeight, sizing.maxWidth) * 100;
}
