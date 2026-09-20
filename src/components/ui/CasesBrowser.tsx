"use client";

import { useState } from "react";
import { CaseFilters, type CaseFilterState } from "@/components/ui/CaseFilters";
import { CaseTile } from "@/components/ui/CaseTile";
import { PROJECT_CASES } from "@/lib/ciiia";

/** Retícula de /casos: 1 columna en móvil, 2 en tablet y 3 en escritorio. */
export function CasesBrowser() {
  const [filters, setFilters] = useState<CaseFilterState>({ sector: "todos", technology: "todas" });

  const filtered = PROJECT_CASES.filter(
    (item) =>
      (filters.sector === "todos" || item.sector === filters.sector) &&
      (filters.technology === "todas" || item.technology === filters.technology),
  );

  return (
    <>
      <CaseFilters cases={PROJECT_CASES} value={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-muted">
          Ningún caso coincide con esa combinación de filtros.
        </p>
      ) : (
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <CaseTile item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
