"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { technologyLabel } from "@/lib/cases";
import type { ProjectCase } from "@/lib/ciiia";

const MAX_TAGS = 2;

// ponytail: char checks, not regex — a "%" or a leading -/+ marks an impact
// result (e.g. "-55%", "+3.4x"); a bare count (e.g. "3", "7") reads smaller.
function metricPresentation(value: string): { sizeClass: string; colorClass: string } {
  const isImpact = value.includes("%") || value.startsWith("-") || value.startsWith("+");
  return isImpact
    ? { sizeClass: "text-[56px]", colorClass: "text-foreground" }
    : { sizeClass: "text-[40px]", colorClass: "text-zinc-300" };
}

export function CaseCard({ item }: { item: ProjectCase }) {
  const metric = metricPresentation(item.metricHighlight);
  const visibleTags = item.tags.slice(0, MAX_TAGS);
  const hiddenTagCount = item.tags.length - visibleTags.length;

  return (
    <Link
      href={`/casos/${item.id}`}
      className="group flex h-full flex-col rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-colors duration-200 motion-reduce:transition-none hover:border-accent/40 hover:bg-accent-soft"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="text-accent">{item.sector}</span>
          <span className="text-zinc-600">&middot;</span>
          <span className="text-zinc-500">{technologyLabel(item.technology)}</span>
        </span>
        <span className="text-zinc-400 opacity-0 transition-opacity duration-200 motion-reduce:transition-none group-hover:opacity-100">
          <ArrowUpRight size={14} weight="bold" />
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 py-10 text-center">
        <span
          className={`font-sans font-semibold leading-none tracking-tight ${metric.colorClass} ${metric.sizeClass}`}
        >
          {item.metricHighlight}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {item.metricLabel}
        </span>
      </div>

      <div className="border-t border-white/8" />

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <h3 className="font-sans text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{item.challenge}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {tag}
          </span>
        ))}
        {hiddenTagCount > 0 && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300">
            +{hiddenTagCount}
          </span>
        )}
      </div>
    </Link>
  );
}
