"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { CaseFilters, type CaseFilterState } from "@/components/ui/CaseFilters";
import { CaseCard } from "@/components/ui/CaseCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { PROJECT_CASES } from "@/lib/ciiia";

export function Cases() {
  const [filters, setFilters] = useState<CaseFilterState>({ sector: "todos", technology: "todas" });
  const prefersReducedMotion = useReducedMotion();

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
    <BeamsBackground className="border-t border-[var(--border-v2)]">
      <section id="casos" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
          <AnimatedSection className="grid gap-6 md:grid-cols-12">
            <AnimatedItem className="md:col-span-12">
              <EyebrowBadge tone="muted-v2">CII.IA // CASOS</EyebrowBadge>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-6">
              <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
                Casos
              </h2>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
              <p className="text-base leading-relaxed text-[var(--text-secondary-v2)]">
                Doce soluciones de inteligencia artificial documentadas por el CII.IA en
                manufactura, comercio, servicios financieros y seguridad.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedItem>
            <CaseFilters cases={PROJECT_CASES} value={filters} onChange={setFilters} />
          </AnimatedItem>

          {filtered.length === 0 ? (
            <p className="font-mono text-sm text-[var(--text-muted-v2)]">
              Ningún caso coincide con esa combinación de filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence initial={false}>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  >
                    <TiltCard>
                      <CaseCard item={item} />
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </BeamsBackground>
  );
}
