"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_PARTNERS,
  type EcosystemCategoryId,
  type EcosystemPartnerEntry,
} from "@/lib/ciiia";
import { logoWidthPercent, type LogoSizing } from "@/lib/logoSizing";

gsap.registerPlugin(ScrollTrigger);

const QUERY_KEY = "categoria";

const isCategoryId = (value: string | null): value is EcosystemCategoryId =>
  value !== null && ECOSYSTEM_CATEGORIES.some((category) => category.id === value);

/** "Academia e investigación" → "ACADEMIA" para el pill. */
const pillLabel = (label: string): string => label.split(" ")[0].toUpperCase();

/**
 * Tile `aspect-[3/2]` en una cuadrícula densa (hasta 6 por fila): menos área
 * que en Nosotros para que la pared respire.
 */
const ECOSYSTEM_LOGO_SIZING: LogoSizing = {
  tileRatio: 3 / 2,
  area: 0.28,
  maxWidth: 0.78,
  maxHeight: 0.6,
};

type TileProps = { partner: EcosystemPartnerEntry };

function PartnerTile({ partner }: TileProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const label = partner.note ? `${partner.name} — ${partner.note}` : partner.name;
  const logo = logoFailed ? undefined : partner.logo;

  // Tile claro, mismo tratamiento que las instituciones fundadoras: varios SVG
  // son azul marino o negro (FIME, AMT, Intel, el texto de NVIDIA) y sobre el
  // fondo oscuro desaparecían. Así cada marca conserva su color real.
  const tileClass = [
    "group/tile relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-[10px] border",
    "border-white/10 bg-foreground",
    "transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
    "hover:border-white/40 hover:bg-zinc-100 focus-visible:border-white/40 focus-visible:bg-zinc-100",
  ].join(" ");

  const inner = logo ? (
    <LogoCrop logo={logo} name={partner.name} onError={() => setLogoFailed(true)} />
  ) : (
    <span className="line-clamp-2 px-3 text-center font-mono text-[12px] uppercase leading-tight tracking-wide text-zinc-700">
      {partner.name}
    </span>
  );

  return (
    <div data-fx="eco-cell" className="group/cell flex flex-col">
      {partner.url ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${tileClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
        >
          {inner}
          <span className="sr-only">Se abre en una ventana nueva</span>
        </a>
      ) : (
        <div className={tileClass} aria-label={label} role="img">
          {inner}
        </div>
      )}

      {/* Altura reservada siempre: la nota entra por opacidad y la cuadrícula
          no salta. `opacity-0` sigue siendo legible por lectores de pantalla. */}
      <span className="mt-1.5 block h-4 overflow-hidden">
        {partner.note ? (
          <span
            className={[
              "block truncate font-mono text-[12px] leading-4 text-muted opacity-0",
              "transition-opacity duration-300 motion-reduce:transition-none",
              "group-hover/cell:opacity-100 group-focus-within/cell:opacity-100",
            ].join(" ")}
          >
            {partner.note}
          </span>
        ) : null}
      </span>
    </div>
  );
}

type LogoCropProps = {
  logo: NonNullable<EcosystemPartnerEntry["logo"]>;
  name: string;
  onError: () => void;
};

/**
 * Muestra sólo la caja del contenido del SVG. El marco tiene la razón de la
 * marca y la imagen, más grande, se desplaza para que la caja lo llene:
 * ancho = 1/w, izquierda = -x/w (los `%` horizontales son del ancho del marco
 * y los verticales, de su alto).
 */
function LogoCrop({ logo, name, onError }: LogoCropProps) {
  const { box } = logo;
  const logoRatio = (box.w / box.h) * box.canvasRatio;

  return (
    <span
      data-fx="eco-logo"
      className={[
        "relative block overflow-hidden",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        "group-hover/tile:scale-[1.04] group-focus-visible/tile:scale-[1.04] motion-reduce:scale-100",
      ].join(" ")}
      style={{
        width: `${logoWidthPercent(logoRatio, ECOSYSTEM_LOGO_SIZING)}%`,
        aspectRatio: logoRatio,
      }}
    >
      <Image
        src={logo.src}
        alt={name}
        width={1000}
        height={Math.round(1000 / box.canvasRatio)}
        onError={onError}
        className="absolute h-auto max-w-none"
        style={{
          width: `${100 / box.w}%`,
          left: `${(-box.x / box.w) * 100}%`,
          top: `${(-box.y / box.h) * 100}%`,
        }}
      />
    </span>
  );
}

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

  // Entrada en cascada: corre al montar y cada vez que cambia el filtro, porque
  // los bloques se desmontan y los ScrollTrigger se recrean sobre el DOM nuevo.
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        scope.querySelectorAll<HTMLElement>("[data-fx='eco-block']").forEach((block) => {
          gsap
            .timeline({ scrollTrigger: { trigger: block, start: "top 92%", once: true } })
            .from(block.querySelectorAll("[data-fx='eco-label']"), {
              opacity: 0,
              x: -24,
              duration: 0.6,
              ease: "power3.out",
            })
            .from(
              block.querySelectorAll("[data-fx='eco-cell']"),
              {
                opacity: 0,
                y: 22,
                scale: 0.92,
                duration: 0.55,
                ease: "power3.out",
                stagger: { each: 0.035, from: "start", grid: "auto" },
              },
              0.08,
            );
        });

        // Cada logo toma su color conforme su tile sube por el viewport: entra
        // desaturado y tenue y llega a color pleno antes de la mitad de la
        // pantalla. Ligado al scroll (`scrub`), así que se descubren al ritmo
        // del usuario y se revierten si vuelve hacia arriba. Sólo `grayscale`
        // y `opacity`, que no alteran las proporciones ni el tono de la marca.
        scope.querySelectorAll<HTMLElement>("[data-fx='eco-cell']").forEach((cell) => {
          const logo = cell.querySelector("[data-fx='eco-logo']");
          if (!logo) return;
          gsap.fromTo(
            logo,
            // Suelo más alto que el original (grayscale 1 / opacidad 0.45): la
            // pared de logos entraba tan apagada que las marcas no se
            // reconocían hasta casi la mitad del recorrido.
            { filter: "grayscale(0.7)", opacity: 0.7 },
            {
              filter: "grayscale(0)",
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: { trigger: cell, start: "top 95%", end: "center 60%", scrub: 0.8 },
            },
          );
        });
      }, scope);

      // Aquí había un `ScrollTrigger.refresh()`. Era redundante —GSAP ya
      // agrupa un `_refreshAll` en el siguiente frame cada vez que se crean
      // triggers (`_queueRefreshAll`)— y además dañino: forzaba un refresco
      // SÍNCRONO desde dentro del callback de `matchMedia`, que es justo
      // cuando hay triggers a medio construir. El bucle de refresco lee
      // `t.vars.end` de cada trigger registrado y reventaba con
      // «Cannot read properties of undefined (reading 'end')», a veces en
      // este componente y a veces en About, según cuál estuviera creándose.
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [activeId]);

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

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:col-span-9 lg:grid-cols-4 xl:grid-cols-6">
                {partners.map((partner) => (
                  <PartnerTile key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
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
        "shrink-0 rounded-full border px-4 py-1.5 font-mono text-[12px] uppercase tracking-wide",
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
