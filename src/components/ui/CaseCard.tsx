"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { technologyLabel } from "@/lib/cases";
import { caseImageSrc, type ProjectCase } from "@/lib/ciiia";

// ponytail: char checks, not regex — a "%" or a leading -/+ marks an impact
// result (e.g. "-55%", "+3.4x"); a bare count (e.g. "3", "7") reads smaller.
function metricPresentation(value: string): { sizeClass: string; colorClass: string } {
  const isImpact = value.includes("%") || value.startsWith("-") || value.startsWith("+");
  return isImpact
    ? { sizeClass: "text-[56px]", colorClass: "text-foreground" }
    : { sizeClass: "text-[40px]", colorClass: "text-[var(--text-secondary-v2)]" };
}

export function CaseCard({ item }: { item: ProjectCase }) {
  const metric = metricPresentation(item.metricHighlight);

  return (
    <Link
      href={`/casos/${item.id}`}
      className="surface-flat-v2 glass-hover-v2 group flex h-full flex-col p-6 transition-colors duration-200 motion-reduce:transition-none"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="text-[var(--text-muted-v2)]">{item.sector}</span>
          <span className="text-[var(--text-muted-v2)]">&middot;</span>
          <span className="text-[var(--text-muted-v2)]">{technologyLabel(item.technology)}</span>
        </span>
        <span className="text-[var(--text-secondary-v2)] opacity-0 transition-opacity duration-200 motion-reduce:transition-none group-hover:opacity-100">
          <ArrowUpRight size={14} weight="bold" />
        </span>
      </div>

      {/* El visual va arriba del número clave. Mismo zoom contenido del 3% que
          las tarjetas de Soluciones, anulado con reduced motion. */}
      <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-white/[0.03]">
        <Image
          src={caseImageSrc(item.id)}
          alt=""
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-col items-center gap-1 py-7 text-center">
        <span
          className={`font-sans font-semibold leading-none tracking-tight ${metric.colorClass} ${metric.sizeClass}`}
        >
          {item.metricHighlight}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted-v2)]">
          {item.metricLabel}
        </span>
      </div>

      <div className="border-t border-[var(--border-v2)]" />

      {/* Título + una frase. El reto completo, el enfoque, el resultado y las
          etiquetas viven en /casos/[id]. */}
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <h3 className="font-sans text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary-v2)]">
          {item.challenge}
        </p>
      </div>
    </Link>
  );
}
