"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { CaseCard } from "@/components/ui/CaseCard";
import { deckTransition, useDeckCarousel } from "@/hooks/useDeckCarousel";
import type { ProjectCase } from "@/lib/ciiia";

export function CasesDeck({
  cases,
  resetKey,
}: {
  cases: ProjectCase[];
  /** Identidad del filtro: al cambiar, el deck se reconstruye desde la primera. */
  resetKey: string;
}) {
  const {
    activeIndex,
    isDesktop,
    prefersReducedMotion,
    offsetX,
    ready,
    atStart,
    atEnd,
    containerRef,
    railRef,
    goTo,
    next,
    previous,
  } = useDeckCarousel({ count: cases.length, resetKey });

  const animated = ready && !prefersReducedMotion;
  // Con un solo caso no hay recorrido: las flechas y la paginación sobran.
  const showControls = cases.length > 1;
  const current = String(Math.min(activeIndex + 1, cases.length)).padStart(2, "0");
  const total = String(cases.length).padStart(2, "0");

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const railStyle: CSSProperties = {
    // En móvil manda el scroller nativo; un `transform` aquí pelearía con él.
    transform: isDesktop ? `translate3d(${offsetX}px, 0, 0)` : undefined,
    ...deckTransition(animated && isDesktop),
  };

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Casos del CII.IA, ${cases.length} en total`}
      onKeyDown={handleKeyDown}
    >
      <div className="relative">
        <div
          ref={containerRef}
          className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:snap-none lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          {/* Los huecos de los extremos son separadores de verdad, no relleno:
              ni el `padding` del scroller ni el del riel cuentan como área
              desplazable, y a la última tarjeta le faltaban 24px para llegar al
              centro. Miden (100% − 85%) / 2 del contenedor menos el `gap`, que
              ya aporta sus 20px. Desde `lg` sobran: ahí manda el `transform`. */}
          <div
            ref={railRef}
            style={railStyle}
            className="relative flex gap-5 transition-transform before:w-[calc(7.5%-20px)] before:shrink-0 before:content-[''] after:w-[calc(7.5%-20px)] after:shrink-0 after:content-[''] lg:before:hidden lg:after:hidden"
          >
            {cases.map((item, index) => (
              <CaseCard
                key={item.id}
                item={item}
                index={index}
                isActive={index === activeIndex}
                onSelect={goTo}
                onFocusCard={goTo}
                animated={animated}
              />
            ))}
          </div>
        </div>

        {showControls ? (
          <>
            <DeckArrow side="previous" muted={atStart} onClick={atStart ? undefined : previous} />
            <DeckArrow side="next" muted={atEnd} onClick={atEnd ? undefined : next} />
          </>
        ) : null}
      </div>

      {showControls ? (
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {cases.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir al caso ${index + 1}: ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="group py-2"
              >
                <span
                  style={deckTransition(animated)}
                  className={`block h-0.5 w-6 transition-colors ${
                    index === activeIndex
                      ? "bg-accent"
                      : "bg-white/15 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <span
            aria-live="polite"
            className="shrink-0 font-mono text-[11px] tabular-nums text-muted"
          >
            {current} / {total}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * En los extremos la flecha se apaga y deja de actuar, pero sin el atributo
 * `disabled`: así sigue anunciándose y el foco no salta de sitio al llegar al
 * final del recorrido.
 */
function DeckArrow({
  side,
  muted,
  onClick,
}: {
  side: "previous" | "next";
  muted: boolean;
  onClick?: () => void;
}) {
  const isPrevious = side === "previous";
  const Icon = isPrevious ? CaretLeftIcon : CaretRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-disabled={muted}
      aria-label={isPrevious ? "Caso anterior" : "Caso siguiente"}
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[var(--background)]/80 text-foreground outline-none backdrop-blur-sm transition-opacity focus-visible:ring-2 focus-visible:ring-[var(--accent)] motion-reduce:transition-none lg:flex ${
        isPrevious ? "left-2" : "right-2"
      } ${muted ? "opacity-30" : "opacity-100 hover:border-white/25"}`}
    >
      <Icon size={16} weight="bold" aria-hidden />
    </button>
  );
}
