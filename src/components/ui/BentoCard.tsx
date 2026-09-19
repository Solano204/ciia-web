"use client";

import { CardMedia, type MediaAspect } from "@/components/ui/CardMedia";
import { CtaLink } from "@/components/ui/Cta";
import { MediaCard } from "@/components/ui/MediaCard";
import { CTA_COPY, type ServiceItem } from "@/lib/ciiia";

// La destacada lleva la franja panorámica; el resto comparten 16:9. `square`
// dejaba las tarjetas de una tercera parte de ancho con una imagen altísima.
function aspectFromSpan(col: number): MediaAspect {
  return col >= 7 ? "wide" : "video";
}

// Regla de la tarjeta: nombre, una frase y el dato clave. La descripción, los
// puntos y las specs viven en /soluciones/[id].
export function BentoCard({
  service,
  className = "",
}: {
  service: ServiceItem;
  className?: string;
}) {
  return (
    <MediaCard
      className={className}
      href={`/soluciones/${service.id}`}
      media={
        <CardMedia media={service.media ?? { kind: "none" }} aspect={aspectFromSpan(service.span.col)} />
      }
      label={service.category}
      title={service.title}
      description={service.tagline}
      datum={service.startingPrice}
      action={
        <CtaLink href="#contacto" className="py-0 text-[12px]">
          {CTA_COPY.asesoria}
        </CtaLink>
      }
    />
  );
}
