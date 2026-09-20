"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterChip, FilterGroup } from "@/components/ui/FilterChips";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_PARTNERS,
  type EcosystemCategoryId,
} from "@/lib/ciiia";

/** 60 ms entre logos con tope de 600 ms en total (índice 10). */
const MAX_STAGGER_INDEX = 10;

const QUERY_KEY = "categoria";

const isCategoryId = (value: string | null): value is EcosystemCategoryId =>
  value !== null && ECOSYSTEM_CATEGORIES.some((category) => category.id === value);

export function EcosystemGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // La URL es la única fuente de verdad: no hay estado espejo que sincronizar.
  const paramValue = searchParams.get(QUERY_KEY);
  const activeId: EcosystemCategoryId | null = isCategoryId(paramValue) ? paramValue : null;

  const selectCategory = useCallback(
    (id: EcosystemCategoryId | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set(QUERY_KEY, id);
      else params.delete(QUERY_KEY);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const visibleCategories = useMemo(
    () =>
      ECOSYSTEM_CATEGORIES.filter((category) => activeId === null || category.id === activeId),
    [activeId],
  );

  return (
    <div className="flex flex-col gap-10">
      <FilterGroup label="Categoría">
        <FilterChip label="Todas" active={activeId === null} onClick={() => selectCategory(null)} />
        {ECOSYSTEM_CATEGORIES.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label}
            active={activeId === category.id}
            onClick={() => selectCategory(category.id)}
          />
        ))}
      </FilterGroup>

      {/* La `key` remonta el bloque al cambiar de filtro y relanza el fundido
          (el mismo de Casos); con reduced motion el cambio es instantáneo. */}
      <div
        key={activeId ?? "todas"}
        className="animate-[eco-fade_var(--dur-base)_var(--ease-out)] motion-reduce:animate-none"
      >
        {visibleCategories.map((category) => {
          const partners = ECOSYSTEM_PARTNERS.filter(
            (partner) => partner.categoryId === category.id,
          );

          return (
            <div
              key={category.id}
              className="grid gap-5 border-t border-[var(--line)] py-8 lg:grid-cols-12 lg:gap-8"
            >
              <h2 className="font-display text-h3 font-semibold text-foreground lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
                {category.label}
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:col-span-9 xl:grid-cols-4">
                {partners.map((partner, index) => (
                  <Reveal key={partner.id} index={Math.min(index, MAX_STAGGER_INDEX)}>
                    <LogoTile partner={partner} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
