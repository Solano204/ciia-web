"use client";

import type { ReactNode } from "react";

/** Grupo de chips de filtro con su etiqueta. Lo comparten Casos y Ecosistema. */
export function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function FilterChip({
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
