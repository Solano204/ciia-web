"use client";

import { useMemo, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ExpandableList, type ExpandableItem } from "@/components/ui/ExpandableList";
import { INDUSTRIAL_SECTORS, PROJECT_CASES } from "@/lib/ciiia";

function toItem(item: (typeof PROJECT_CASES)[number]): ExpandableItem {
  return {
    id: item.id,
    eyebrow: item.sector,
    title: item.title,
    subtitle: item.challenge,
    meta: `${item.metricHighlight} · ${item.metricLabel}`,
    detail: (
      <div className="flex flex-col gap-6">
        {[
          { label: "Reto", text: item.challenge },
          { label: "Enfoque", text: item.approach },
          { label: "Resultado", text: item.outcome },
        ].map((block) => (
          <div key={block.label}>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              {block.label}
            </h4>
            <p className="mt-2 text-base leading-relaxed text-foreground">{block.text}</p>
          </div>
        ))}

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Tecnología
            </dt>
            <dd className="mt-1 text-sm text-foreground">{item.technology}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              En cifras
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {item.metricHighlight} — {item.metricLabel}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    ),
  };
}

export function Cases() {
  const [sector, setSector] = useState<string | null>(null);

  const filtered = useMemo(
    () => PROJECT_CASES.filter((item) => !sector || item.sector === sector),
    [sector],
  );

  return (
    <section
      id="casos"
      className="border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <AnimatedSection className="grid gap-6 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>CII.IA // CASOS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-6">
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
              Casos
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-zinc-400">
              Doce soluciones de inteligencia artificial documentadas por el CII.IA en
              manufactura, comercio, servicios financieros y seguridad.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedItem className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSector(null)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              sector === null
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-foreground"
            }`}
          >
            Todos ({PROJECT_CASES.length})
          </button>
          {INDUSTRIAL_SECTORS.map((item) => {
            const count = PROJECT_CASES.filter((c) => c.sector === item.name).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSector((current) => (current === item.name ? null : item.name))}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  sector === item.name
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:text-foreground"
                }`}
              >
                {item.name} ({count})
              </button>
            );
          })}
        </AnimatedItem>

        <AnimatedItem>
          <ExpandableList items={filtered.map(toItem)} />
        </AnimatedItem>
      </div>
    </section>
  );
}
