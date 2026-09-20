"use client";

import { useState } from "react";
import { CaseFilters, type CaseFilterState } from "@/components/ui/CaseFilters";
import { CaseTile } from "@/components/ui/CaseTile";
import { PROJECT_CASES } from "@/lib/ciiia";

const NO_FILTERS: CaseFilterState = { sector: "todos", technology: "todas" };

/** Retícula de /casos: 1 columna en móvil, 2 en tablet y 3 en escritorio. */
export function CasesBrowser() {
  const [filters, setFilters] = useState<CaseFilterState>(NO_FILTERS);

  const filtered = PROJECT_CASES.filter(
    (item) =>
      (filters.sector === "todos" || item.sector === filters.sector) &&
      (filters.technology === "todas" || item.technology === filters.technology),
  );

  return (
    <>
      <CaseFilters cases={PROJECT_CASES} value={filters} onChange={setFilters} />

      {/* La `key` remonta el bloque al cambiar de filtro y relanza el fundido;
          con reduced motion el cambio es instantáneo. */}
      <div
        key={`${filters.sector}|${filters.technology}`}
        className="animate-[eco-fade_var(--dur-base)_var(--ease-out)] motion-reduce:animate-none"
      >
        {filtered.length === 0 ? (
          <div role="status" className="flex flex-col items-start gap-4">
            <p className="text-body text-[var(--text-secondary)]">
              Aún no tenemos un caso con esa combinación. Prueba con otro filtro.
            </p>
            <button
              type="button"
              onClick={() => setFilters(NO_FILTERS)}
              className="rounded-sm font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground underline underline-offset-[6px] outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
            >
              Ver todos los casos
            </button>
          </div>
        ) : (
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <CaseTile item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
