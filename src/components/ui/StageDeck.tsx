"use client";

import { Deck } from "@/components/ui/Deck";
import { StageCard } from "@/components/ui/StageCard";
import type { ExecutionStage, ServiceItem } from "@/lib/ciiia";

/** Números de etapa sobre el deck: un segundo control, además de flechas y puntos. */
function StageNumbers({
  stages,
  activeIndex,
  onSelect,
}: {
  stages: ExecutionStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-2">
      {stages.map((stage, index) => {
        const active = index === activeIndex;
        return (
          <li key={stage.id}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Ir a la etapa ${index + 1}: ${stage.name}`}
              aria-current={active ? "step" : undefined}
              className="group flex items-baseline gap-2 rounded-sm py-1 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span
                className={`font-mono text-sm transition-colors duration-200 motion-reduce:transition-none ${
                  active ? "text-accent" : "text-muted group-hover:text-foreground"
                }`}
              >
                {stage.number}
              </span>
              <span
                className={`hidden font-sans text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 motion-reduce:transition-none md:inline ${
                  active ? "text-foreground" : "text-muted group-hover:text-[var(--text-secondary)]"
                }`}
              >
                {stage.name}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function StageDeck({
  stages,
  services,
}: {
  stages: ExecutionStage[];
  services: ServiceItem[];
}) {
  return (
    <Deck
      items={stages}
      getKey={(stage) => stage.id}
      resetKey="ciclo"
      ariaLabel={`Etapas del ciclo de ejecución, ${stages.length} en total`}
      previousLabel="Etapa anterior"
      nextLabel="Etapa siguiente"
      dotLabel={(stage, index) => `Ir a la etapa ${index + 1}: ${stage.name}`}
      announce={(index) => `Etapa ${index + 1} de ${stages.length}: ${stages[index].name}`}
      dotFocusClass="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
      renderHeader={({ activeIndex, goTo }) => (
        <StageNumbers stages={stages} activeIndex={activeIndex} onSelect={goTo} />
      )}
      renderCard={(stage, state) => <StageCard stage={stage} services={services} {...state} />}
    />
  );
}
