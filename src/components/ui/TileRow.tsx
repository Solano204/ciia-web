import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Fila de tiles de imagen de un teaser. En móvil, carrusel con snap que sangra
 * a los bordes de la pantalla (el único scroll horizontal permitido); desde md,
 * tres columnas. Lo comparten los teasers de Soluciones y de Casos.
 */
export function TileRow<T>({
  items,
  getKey,
  renderTile,
}: {
  items: T[];
  getKey: (item: T) => string;
  renderTile: (item: T) => ReactNode;
}) {
  return (
    <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((item, index) => (
        <li key={getKey(item)} className="w-[78%] shrink-0 snap-start md:w-auto">
          <Reveal index={index} className="h-full">
            {renderTile(item)}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
