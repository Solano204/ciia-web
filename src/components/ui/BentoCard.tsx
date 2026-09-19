"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { CardMedia, type MediaAspect } from "@/components/ui/CardMedia";
import { CtaLink } from "@/components/ui/Cta";
import { CTA_COPY, type ServiceItem } from "@/lib/ciiia";

type Size = "lg" | "md" | "sm";

function sizeFromSpan(col: number): Size {
  if (col >= 7) return "lg";
  if (col >= 5) return "md";
  return "sm";
}

// El tamaño se deriva del ancho en escritorio, pero por debajo de `lg` todas
// las tarjetas caben a media anchura o menos: sin el escalón, el titular de la
// destacada se partía en cuatro líneas en tablet.
const TAGLINE_CLASS: Record<Size, string> = {
  lg: "text-[22px] lg:text-[32px]",
  md: "text-[20px] lg:text-[24px]",
  sm: "text-[18px] lg:text-[20px]",
};

// La destacada lleva la franja panorámica; el resto comparten 16:9. `square`
// dejaba las tarjetas de una tercera parte de ancho con una imagen altísima.
const MEDIA_ASPECT: Record<Size, MediaAspect> = {
  lg: "wide",
  md: "video",
  sm: "video",
};

export function BentoCard({
  service,
  className = "",
}: {
  service: ServiceItem;
  className?: string;
}) {
  const size = sizeFromSpan(service.span.col);

  return (
    // Deja de ser un <a> que envuelve toda la tarjeta: con el CTA dentro eso
    // anidaría enlaces, que es HTML inválido. En su lugar, el titular lleva el
    // enlace y su ::after cubre la tarjeta entera, de modo que sigue siendo
    // clicable completa; el CTA se eleva por encima con z-10.
    <article
      className={`group relative flex h-full flex-col gap-4 rounded-2xl transition-colors duration-200 motion-reduce:transition-none glass-hover-v2 ${
        service.featured ? "glass-2-v2 glass-featured-v2" : "glass-1-v2"
      } ${size === "sm" ? "p-5" : "p-6"} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-sans text-xs uppercase tracking-[0.08em] text-foreground">
          {service.title}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--text-secondary)] transition-transform duration-200 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
          <ArrowUpRightIcon size={14} weight="bold" />
        </span>
      </div>

      {/* El zoom del hover vive aquí, contenido por el `overflow-hidden` del
          propio CardMedia. 3% en 500ms: por debajo del umbral de movimiento
          que marca el cursor, y anulado con reduced motion. */}
      <div className="overflow-hidden rounded-xl [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[&_img]:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100">
        <CardMedia media={service.media ?? { kind: "none" }} aspect={MEDIA_ASPECT[size]} />
      </div>

      {/* Regla de la tarjeta: título + una frase + dato clave. La descripción,
          los puntos y las specs viven en /soluciones/[id]. */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
          {service.category}
        </span>
        <h3
          className={`font-display font-semibold leading-tight text-foreground ${TAGLINE_CLASS[size]}`}
        >
          <Link
            href={`/soluciones/${service.id}`}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {service.tagline}
          </Link>
        </h3>
      </div>

      <p
        className={`mt-auto font-mono text-sm font-semibold text-foreground ${size === "sm" ? "line-clamp-2" : ""}`}
      >
        {service.startingPrice}
      </p>

      {/* Por encima del ::after del enlace extendido, para que sea clicable
          por separado en vez de llevar también a la página de la solución. */}
      <div className="relative z-10">
        <CtaLink href="#contacto" className="py-0 text-[12px]">
          {CTA_COPY.asesoria}
        </CtaLink>
      </div>
    </article>
  );
}
