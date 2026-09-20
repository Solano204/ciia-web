import Image from "next/image";
import Link from "next/link";
import { MEDIA_CLASS } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceItem } from "@/lib/ciiia";

/**
 * Fila editorial: imagen (~60%) y texto (~40%), alternando lado. El enlace es
 * hermano absoluto del resto, no ancestro: un ancestro con `transform` (el
 * reveal) acotaría su área y la fila dejaría de ser clicable entera.
 */
export function SolutionRow({ service, reverse }: { service: ServiceItem; reverse: boolean }) {
  const image = service.media?.kind === "image" ? service.media : null;

  return (
    <article
      className={`group relative grid items-center gap-8 border-t border-[var(--line)] py-16 first:border-t-0 first:pt-0 md:gap-16 md:py-20 ${
        reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"
      }`}
    >
      <Reveal className={reverse ? "md:order-2" : ""}>
        <div className={MEDIA_CLASS}>
          <div className="relative aspect-video bg-white/[0.03]">
            {image && (
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col items-start gap-4">
        <Reveal index={1}>
          <h2 className="font-display text-h2 font-semibold text-foreground underline-offset-8 group-hover:underline">
            {service.title}
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="max-w-[40ch] text-body text-[var(--text-secondary)]">{service.tagline}</p>
        </Reveal>
        <Reveal index={3}>
          <p className="font-mono text-small text-foreground">{service.startingPrice}</p>
        </Reveal>
        <Reveal index={4}>
          <span
            aria-hidden
            className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground"
          >
            Ver solución
            <span className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
              →
            </span>
          </span>
        </Reveal>
      </div>

      <Link
        href={`/soluciones/${service.id}`}
        className="absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="sr-only">Ver solución {service.title}</span>
      </Link>
    </article>
  );
}
