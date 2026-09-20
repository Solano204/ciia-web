"use client";

import Image from "next/image";
import Link from "next/link";
import type { DeckCardState } from "@/components/ui/Deck";
import { deckTransition } from "@/hooks/useDeckCarousel";
import { cycleImageSrc, type ExecutionStage, type ServiceItem } from "@/lib/ciiia";

const LABEL = "font-sans text-[12px] uppercase tracking-[0.08em] text-muted";

/**
 * Tarjeta de etapa del deck del Ciclo. Sin caja ni borde: imagen, número en
 * Clash, nombre, una frase, entregable y las soluciones que intervienen.
 */
export function StageCard({
  stage,
  services,
  index,
  isActive,
  animated,
  onSelect,
  onFocusCard,
}: { stage: ExecutionStage; services: ServiceItem[] } & DeckCardState) {
  const related = services.filter((service) => service.stageMapping.includes(stage.id));

  // Solo las laterales reaccionan: la activa no cambia nada al pulsarla.
  const select = () => {
    if (!isActive) onSelect(index);
  };

  return (
    <article
      data-deck-index={index}
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Etapa ${stage.number}: ${stage.name}`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        select();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if ((event.target as HTMLElement).closest("a")) return;
        event.preventDefault();
        select();
      }}
      onFocus={() => onFocusCard(index)}
      style={deckTransition(animated)}
      className={[
        "group relative flex w-[85%] shrink-0 snap-center flex-col lg:w-[520px]",
        "outline-none transition-[opacity,scale] focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        // Igual que Casos: el atenuado de las vecinas vive en CSS y solo desde `lg`.
        isActive
          ? "lg:scale-100 lg:opacity-100"
          : "cursor-pointer lg:scale-[0.96] lg:opacity-[0.35]",
      ].join(" ")}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-white/[0.03]">
        <Image
          src={cycleImageSrc(stage.id)}
          alt=""
          fill
          sizes="(min-width: 1024px) 520px, 85vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-display text-[64px] font-semibold leading-none tabular-nums text-foreground">
          {stage.number}
        </span>
        <h3 className="font-display text-h3 font-semibold uppercase text-foreground">
          {stage.name}
        </h3>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {stage.description}
      </p>

      <dl className="mt-6 flex flex-col gap-5 border-t border-[var(--line)] pt-6">
        <div>
          <dt className={LABEL}>Entregable</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-foreground">{stage.deliverable}</dd>
        </div>

        {related.length > 0 && (
          <div>
            <dt className={LABEL}>Soluciones que intervienen</dt>
            {/* En las laterales los enlaces no reciben clic ni foco: pulsarlas
                centra la tarjeta en vez de navegar. */}
            <dd
              className={`mt-2 flex flex-wrap gap-x-5 gap-y-1.5 ${isActive ? "" : "pointer-events-none"}`}
            >
              {related.map((service) => (
                <Link
                  key={service.id}
                  href={`/soluciones/${service.id}`}
                  tabIndex={isActive ? undefined : -1}
                  className="text-sm text-foreground underline decoration-white/20 underline-offset-4 outline-none transition-colors hover:text-accent hover:decoration-accent focus-visible:ring-2 focus-visible:ring-[var(--accent)] motion-reduce:transition-none"
                >
                  {service.title}
                </Link>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
