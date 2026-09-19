"use client";

import { useMemo, useState } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { CaseFilters, type CaseFilterState } from "@/components/ui/CaseFilters";
import { CasesDeck } from "@/components/ui/CasesDeck";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, PROJECT_CASES, schedulingHref } from "@/lib/ciiia";

export function Cases({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
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
    <Section id="casos" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Casos"
        description="Doce soluciones de inteligencia artificial documentadas por el CII.IA en manufactura, comercio, servicios financieros y seguridad."
      />

      <AnimatedItem>
        <CaseFilters cases={PROJECT_CASES} value={filters} onChange={setFilters} />
      </AnimatedItem>

      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-muted">
          Ningún caso coincide con esa combinación de filtros.
        </p>
      ) : (
        <CasesDeck cases={filtered} resetKey={`${filters.sector}|${filters.technology}`} />
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoriaCaso}</CtaButton>
        <CtaLink href={schedulingHref()}>{CTA_COPY.agenda}</CtaLink>
      </SectionCta>
    </Section>
  );
}
