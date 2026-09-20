"use client";

import { CaseCard } from "@/components/ui/CaseCard";
import { Deck } from "@/components/ui/Deck";
import type { ProjectCase } from "@/lib/ciiia";

export function CasesDeck({
  cases,
  resetKey,
}: {
  cases: ProjectCase[];
  /** Identidad del filtro: al cambiar, el deck se reconstruye desde la primera. */
  resetKey: string;
}) {
  return (
    <Deck
      items={cases}
      getKey={(item) => item.id}
      resetKey={resetKey}
      ariaLabel={`Casos del CII.IA, ${cases.length} en total`}
      previousLabel="Caso anterior"
      nextLabel="Caso siguiente"
      dotLabel={(item, index) => `Ir al caso ${index + 1}: ${item.title}`}
      renderCard={(item, state) => (
        <CaseCard
          item={item}
          index={state.index}
          isActive={state.isActive}
          onSelect={state.onSelect}
          onFocusCard={state.onFocusCard}
          animated={state.animated}
        />
      )}
    />
  );
}
