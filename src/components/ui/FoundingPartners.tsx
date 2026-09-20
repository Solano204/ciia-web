import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_DATA, type AboutFoundingPartner } from "@/lib/ciiia";
import { logoWidthPercent, type LogoSizing } from "@/lib/logoSizing";

/** Tile 3:2 con solo cinco logos: se les da bastante presencia. */
const LOGO_SIZING: LogoSizing = { tileRatio: 3 / 2, area: 0.4, maxWidth: 0.82, maxHeight: 0.7 };

// Zoom de 1.03 al pasar el cursor; solo `transform`, y sin efecto con reduced motion.
const ZOOM =
  "transition-transform duration-[var(--dur-large)] ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/**
 * Los PNG traen fondo opaco y los colores de marca dependen de él. Los de fondo
 * blanco van sobre un tile claro (el `foreground` del sitio, no blanco puro) y
 * `multiply` deja el blanco del asset en el color del tile. PROSOFT trae su
 * fondo negro con halo: cubre el tile entero. Hasta tener SVG con fondo
 * transparente no se pueden poner los logos directo sobre la página.
 */
function Logo({ partner }: { partner: AboutFoundingPartner }) {
  const ratio = partner.logoWidth / partner.logoHeight;

  if (!partner.logoOnLight) {
    return (
      <Image
        src={partner.logo}
        alt=""
        width={partner.logoWidth}
        height={partner.logoHeight}
        sizes="(min-width: 768px) 30vw, 46vw"
        className={`h-full w-full object-cover ${ZOOM}`}
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center mix-blend-multiply ${ZOOM}`}
      style={{ width: `${logoWidthPercent(ratio, LOGO_SIZING)}%` }}
    >
      <Image
        src={partner.logo}
        alt=""
        width={partner.logoWidth}
        height={partner.logoHeight}
        sizes="(min-width: 768px) 25vw, 40vw"
        className="h-auto w-full"
      />
    </span>
  );
}

export function FoundingPartners() {
  const { foundingPartnersTitle, foundingPartnersCopy, foundingPartners } = ABOUT_DATA;

  return (
    <div className="flex flex-col gap-14 border-t border-[var(--line)] pt-16">
      <div className="grid gap-6 md:grid-cols-12">
        <h2 className="font-display text-h2 font-semibold text-foreground md:col-span-6">
          {foundingPartnersTitle}
        </h2>
        <p className="text-body text-[var(--text-secondary)] md:col-span-5 md:col-start-8 md:self-end">
          {foundingPartnersCopy}
        </p>
      </div>

      {/* Flex centrado en vez de grid: con 5 logos, las filas incompletas
          (2+2+1 en móvil, 3+2 desde md) quedan centradas y no cojas. */}
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-12">
        {foundingPartners.map((partner, index) => (
          <li
            key={partner.id}
            className="w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)]"
          >
            <Reveal index={index}>
              <figure className="group flex flex-col gap-4">
                <div
                  className={`relative isolate flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl ${
                    partner.logoOnLight ? "bg-foreground" : "bg-[#0f0f10]"
                  }`}
                >
                  <Logo partner={partner} />
                </div>
                <figcaption className="flex flex-col gap-1">
                  <span className="text-[13px] font-semibold text-foreground">{partner.name}</span>
                  <span className="text-[12px] leading-snug text-muted">{partner.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
