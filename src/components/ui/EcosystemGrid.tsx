"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_PARTNERS,
  type EcosystemCategoryId,
} from "@/lib/ciiia";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** 60 ms entre logos con tope de 600 ms en total (índice 10). */
const MAX_STAGGER_INDEX = 10;

const QUERY_KEY = "categoria";

const isCategoryId = (value: string | null): value is EcosystemCategoryId =>
  value !== null && ECOSYSTEM_CATEGORIES.some((category) => category.id === value);

/** "Academia e investigación" → "ACADEMIA" para el pill. */
const pillLabel = (label: string): string => label.split(" ")[0].toUpperCase();

export function EcosystemGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);

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

  const visibleCount = useMemo(
    () =>
      ECOSYSTEM_PARTNERS.filter(
        (partner) => activeId === null || partner.categoryId === activeId,
      ).length,
    [activeId],
  );

  // Los pills entran una sola vez, al aparecer la barra.
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-fx='eco-pill']", {
          opacity: 0,
          y: 12,
          scale: 0.9,
          duration: 0.45,
          ease: "back.out(1.6)",
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-fx='eco-filters']", start: "top 92%", once: true },
        });
      }, scope);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div
        data-fx="eco-filters"
        className="flex flex-wrap items-center justify-between gap-4 border-y border-white/8 py-4"
      >
        <div
          role="tablist"
          aria-label="Filtrar el ecosistema por categoría"
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <FilterPill
            isActive={activeId === null}
            label="TODAS"
            onSelect={() => selectCategory(null)}
          />
          {ECOSYSTEM_CATEGORIES.map((category) => (
            <FilterPill
              key={category.id}
              isActive={activeId === category.id}
              label={pillLabel(category.label)}
              onSelect={() => selectCategory(category.id)}
            />
          ))}
        </div>

        <span className="shrink-0 font-mono text-[12px] tracking-wide text-muted" aria-live="polite">
          {visibleCount} DE {ECOSYSTEM_PARTNERS.length}
        </span>
      </div>

      <div
        key={activeId ?? "todas"}
        className="animate-[eco-fade_200ms_ease-out] motion-reduce:animate-none"
      >
        {visibleCategories.map((category) => {
          const partners = ECOSYSTEM_PARTNERS.filter(
            (partner) => partner.categoryId === category.id,
          );

          return (
            <div
              key={category.id}
              data-fx="eco-block"
              className="grid gap-5 border-b border-white/8 py-8 lg:grid-cols-12 lg:gap-8"
            >
              <h3
                data-fx="eco-label"
                className="font-sans text-[17px] font-medium leading-snug text-foreground lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
              >
                {category.label}
              </h3>

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

/** Muestra plana de los primeros `limit` logos: sin filtros ni categorías. */
export function EcosystemLogos({ limit }: { limit: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {ECOSYSTEM_PARTNERS.slice(0, limit).map((partner, index) => (
        <Reveal key={partner.id} index={Math.min(index, MAX_STAGGER_INDEX)}>
          <LogoTile partner={partner} />
        </Reveal>
      ))}
    </div>
  );
}

type FilterPillProps = {
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

function FilterPill({ label, isActive, onSelect }: FilterPillProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      data-fx="eco-pill"
      className={[
        "shrink-0 rounded-full border px-4 py-1.5 font-sans text-[12px] uppercase tracking-wide",
        "transition-colors duration-200 motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "border-accent text-accent"
          : "border-white/10 text-muted hover:border-white/20 hover:text-zinc-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
