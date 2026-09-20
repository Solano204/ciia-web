"use client";

import { FilterChip, FilterGroup } from "@/components/ui/FilterChips";
import { TECHNOLOGIES } from "@/lib/cases";
import type { ProjectCase } from "@/lib/ciiia";

export type CaseFilterState = { sector: string; technology: string };

export function CaseFilters({
  cases,
  value,
  onChange,
}: {
  cases: ProjectCase[];
  value: CaseFilterState;
  onChange: (value: CaseFilterState) => void;
}) {
  const sectors = Array.from(new Set(cases.map((item) => item.sector)));

  return (
    <div className="flex flex-col gap-4">
      <FilterGroup label="Sector">
        <FilterChip
          label="Todos"
          active={value.sector === "todos"}
          onClick={() => onChange({ ...value, sector: "todos" })}
        />
        {sectors.map((sector) => (
          <FilterChip
            key={sector}
            label={sector}
            active={value.sector === sector}
            onClick={() => onChange({ ...value, sector })}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Tecnología">
        <FilterChip
          label="Todas"
          active={value.technology === "todas"}
          onClick={() => onChange({ ...value, technology: "todas" })}
        />
        {TECHNOLOGIES.map((technology) => (
          <FilterChip
            key={technology.id}
            label={technology.label}
            active={value.technology === technology.value}
            onClick={() => onChange({ ...value, technology: technology.value })}
          />
        ))}
      </FilterGroup>
    </div>
  );
}
