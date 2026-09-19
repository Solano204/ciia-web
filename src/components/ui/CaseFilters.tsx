"use client";

import type { ReactNode } from "react";
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
          label={`Todos (${cases.length})`}
          active={value.sector === "todos"}
          onClick={() => onChange({ ...value, sector: "todos" })}
        />
        {sectors.map((sector) => {
          const count = cases.filter((item) => item.sector === sector).length;
          return (
            <FilterChip
              key={sector}
              label={`${sector} (${count})`}
              active={value.sector === sector}
              onClick={() => onChange({ ...value, sector })}
            />
          );
        })}
      </FilterGroup>

      <FilterGroup label="Tecnología">
        <FilterChip
          label={`Todas (${cases.length})`}
          active={value.technology === "todas"}
          onClick={() => onChange({ ...value, technology: "todas" })}
        />
        {TECHNOLOGIES.map((technology) => {
          const count = cases.filter((item) => item.technology === technology.value).length;
          return (
            <FilterChip
              key={technology.id}
              label={`${technology.label} (${count})`}
              active={value.technology === technology.value}
              onClick={() => onChange({ ...value, technology: technology.value })}
            />
          );
        })}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-sans text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 motion-reduce:transition-none ${
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-[var(--line)] text-[var(--text-secondary)] hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
