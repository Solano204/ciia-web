"use client";

import { useSyncExternalStore } from "react";
import { Deck } from "@/components/ui/Deck";
import { StageCard, type StageService } from "@/components/ui/StageCard";
import type { ExecutionStage } from "@/lib/ciiia";

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

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
  imageSrcs,
}: {
  stages: ExecutionStage[];
  services: StageService[];
  /** id de etapa → ruta de su imagen, solo de las que existen (decidido en el build). */
  imageSrcs: Record<string, string>;
}) {
  // `/ciclo#desplegar` abre el carrusel en esa etapa. El hash solo existe en el
  // cliente: en el servidor y al hidratar vale "" (mismo HTML) y React lo
  // corrige antes del primer pintado. `key` remonta el deck ya centrado en ella,
  // sin deslizamiento visible.
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const start = Math.max(0, stages.findIndex((stage) => `#${stage.id}` === hash));

  return (
    <Deck
      key={start}
      initialIndex={start}
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
      renderCard={(stage, state) => (
        <StageCard
          stage={stage}
          services={services}
          imageSrc={imageSrcs[stage.id]}
          {...state}
        />
      )}
    />
  );
}
