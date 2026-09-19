"use client";

import { useMemo, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { CaseFilters, type CaseFilterState } from "@/components/ui/CaseFilters";
import { CasesDeck } from "@/components/ui/CasesDeck";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { CTA_COPY, PROJECT_CASES, schedulingHref } from "@/lib/ciiia";

export function Cases() {
  const [filters, setFilters] = useState<CaseFilterState>({ sector: "todos", technology: "todas" });

  const filtered = useMemo(
    () =>
      PROJECT_CASES.filter(
        (item) =>
          (filters.sector === "todos" || item.sector === filters.sector) &&
          (filters.technology === "todas" || item.technology === filters.technology),
      ),
    [filters],
  );

  return (
    <BeamsBackground className="section-seam">
      <section id="casos" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
          <AnimatedSection className="grid gap-6 md:grid-cols-12">
            <AnimatedItem className="md:col-span-12">
              <EyebrowBadge tone="muted-v2">CII.IA // CASOS</EyebrowBadge>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-6">
              <h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">
                Casos
              </h2>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                Doce soluciones de inteligencia artificial documentadas por el CII.IA en
                manufactura, comercio, servicios financieros y seguridad.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedItem>
            <CaseFilters cases={PROJECT_CASES} value={filters} onChange={setFilters} />
          </AnimatedItem>

          {filtered.length === 0 ? (
            <p className="font-sans text-sm text-muted">
              Ningún caso coincide con esa combinación de filtros.
            </p>
          ) : (
            <CasesDeck
              cases={filtered}
              resetKey={`${filters.sector}|${filters.technology}`}
            />
          )}

          <SectionCta>
            <CtaButton href="#contacto">{CTA_COPY.asesoriaCaso}</CtaButton>
            <CtaLink href={schedulingHref()}>{CTA_COPY.agenda}</CtaLink>
          </SectionCta>
        </div>
      </section>
    </BeamsBackground>
  );
}
