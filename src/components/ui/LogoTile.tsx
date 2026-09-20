import Image from "next/image";
import type { EcosystemTile } from "@/lib/ciiia";
import { logoWidthPercent, type LogoSizing } from "@/lib/logoSizing";

/**
 * Los logos se dimensionan por área, no por ancho: un logo apaisado y uno casi
 * cuadrado pesan lo mismo a la vista. Tile 3:2, más grande que en la primera
 * versión de la pared.
 */
const LOGO_SIZING: LogoSizing = { tileRatio: 3 / 2, area: 0.4, maxWidth: 0.84, maxHeight: 0.7 };

// Zoom de 1.03 al pasar el cursor; solo `transform`, y sin efecto con reduced motion.
const ZOOM =
  "transition-transform duration-[var(--dur-large)] ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/**
 * Muestra solo la caja del contenido del SVG. El marco tiene la razón de la
 * marca y la imagen, más grande, se desplaza para que la caja lo llene:
 * ancho = 1/w, izquierda = -x/w (los `%` horizontales son del ancho del marco
 * y los verticales, de su alto). Es el equivalente a `object-contain` sobre el
 * contenido real, sin que los márgenes del lienzo achiquen unos logos más que
 * otros.
 */
function LogoCrop({
  logo,
  onWhite = false,
}: {
  logo: NonNullable<EcosystemTile["logo"]>;
  onWhite?: boolean;
}) {
  const { box } = logo;
  const logoRatio = (box.w / box.h) * box.canvasRatio;

  return (
    <span
      className={`relative block overflow-hidden ${onWhite ? "mix-blend-multiply" : ""} ${ZOOM}`}
      style={{
        width: `${logoWidthPercent(logoRatio, LOGO_SIZING)}%`,
        aspectRatio: logoRatio,
      }}
    >
      <Image
        src={logo.src}
        alt=""
        width={1000}
        height={Math.round(1000 / box.canvasRatio)}
        className="absolute h-auto max-w-none"
        style={{
          width: `${100 / box.w}%`,
          left: `${(-box.x / box.w) * 100}%`,
          top: `${(-box.y / box.h) * 100}%`,
        }}
      />
    </span>
  );
}

/**
 * Tile claro uniforme: mismo tamaño, radio y fondo para todos los logos. Varios
 * SVG son azul marino o negro y desaparecen sobre el fondo oscuro; el tile deja
 * cada marca en su color real. El nombre va en `title` y `aria-label`.
 */
export function LogoTile({ partner }: { partner: EcosystemTile }) {
  const label = partner.note ? `${partner.name} — ${partner.note}` : partner.name;

  return (
    <div
      role="img"
      title={label}
      aria-label={label}
      className="group relative isolate flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl bg-foreground"
    >
      {partner.logo ? (
        <LogoCrop logo={partner.logo} onWhite={partner.onWhite} />
      ) : (
        <span className="line-clamp-2 px-3 text-center font-sans text-[12px] uppercase leading-tight tracking-wide text-zinc-700">
          {partner.name}
        </span>
      )}
    </div>
  );
}
