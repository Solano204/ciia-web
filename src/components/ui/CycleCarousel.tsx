"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// Los alias sin sufijo (`CaretLeft`) están deprecados en phosphor v2.1.
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { CtaButton } from "@/components/ui/Cta";
import {
  CTA_COPY,
  cycleImageSrc,
  schedulingHref,
  type ExecutionStage,
  type ServiceItem,
} from "@/lib/ciiia";

/** Desplazamiento de la transición. El tope lo marca el efecto del cursor. */
const SHIFT_PX = 12;
const DURATION_S = 0.3;

/** Umbral de swipe en píxeles, y cuánto más horizontal que vertical debe ser. */
const SWIPE_MIN = 48;
const SWIPE_RATIO = 1.4;

export function CycleCarousel({
  stages,
  services,
  eyebrow,
  title,
  description,
}: {
  stages: ExecutionStage[];
  services: ServiceItem[];
  eyebrow: ReactNode;
  title: string;
  description: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Signo de la última transición: la tarjeta entra desde el lado del que viene.
  const [direction, setDirection] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const lastIndex = stages.length - 1;
  // Con una sola etapa el riel no tiene recorrido: evita el 0/0 del `calc`.
  const railRatio = lastIndex > 0 ? activeIndex / lastIndex : 0;

  const goTo = useCallback(
    (next: number, { focusTab = false }: { focusTab?: boolean } = {}) => {
      const clamped = Math.max(0, Math.min(lastIndex, next));
      setActiveIndex((current) => {
        if (clamped !== current) setDirection(clamped > current ? 1 : -1);
        return clamped;
      });
      if (focusTab) tabRefs.current[clamped]?.focus();
    },
    [lastIndex],
  );

  // Patrón de pestañas de WAI-ARIA: las flechas mueven la selección y el foco.
  // Se aceptan las cuatro porque la lista es horizontal en móvil y vertical en
  // escritorio, y quien navega con teclado no debería tener que adivinarlo.
  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowDown: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      ArrowUp: activeIndex - 1,
      Home: 0,
      End: lastIndex,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    goTo(next, { focusTab: true });
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Sólo cuenta como swipe si el gesto es claramente horizontal: si no, es
    // alguien haciendo scroll y no queremos robarle el gesto.
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1);
  };

  // Clic en cualquier parte de la tarjeta: avanza y da la vuelta al llegar al
  // final, para que el recorrido no se sienta trabado en la etapa 05. Los
  // enlaces y botones de dentro conservan su propio clic.
  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    goTo(activeIndex === lastIndex ? 0 : activeIndex + 1);
  };

  const activeStage = stages[activeIndex];
  const totalLabel = String(stages.length).padStart(2, "0");
  const progress = ((activeIndex + 1) / stages.length) * 100;
  const relatedServices = services.filter((service) =>
    service.stageMapping.includes(activeStage.id),
  );

  const enter = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: direction * SHIFT_PX };
  const exit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: direction * -SHIFT_PX };

  return (
    <div className="flex flex-col gap-12">
      {/* Cabecera a todo lo ancho, con el mismo patrón que Soluciones y Casos:
          antes vivía apilada en la columna izquierda y empujaba el riel hacia
          abajo, dejando un hueco muerto junto a la tarjeta. */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-12">{eyebrow}</div>
        <div className="md:col-span-6">
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <p className="text-base leading-relaxed text-[var(--text-secondary-v2)]">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        {/* `min-w-0` en toda la cadena: sin él, el `min-width:auto` que traen
            por defecto los ítems de grid y flex impide que el riel se encoja,
            el `overflow-x-auto` no llega a aplicarse y las cinco etapas
            desbordaban la página casi 375px a lo ancho en móvil. */}
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-3">
          {/* Riel: horizontal y desplazable en móvil, vertical en escritorio. */}
          <div className="relative min-w-0">
            <span
              aria-hidden
              className="absolute left-[17px] top-6 bottom-6 hidden w-px bg-[var(--border-v2)] lg:block"
            />
            <span
              aria-hidden
              className="absolute left-[17px] top-6 hidden w-px origin-top bg-accent-v2 transition-[height] duration-300 ease-out motion-reduce:transition-none lg:block"
              style={{ height: `calc((100% - 48px) * ${railRatio})` }}
            />

            <div
              role="tablist"
              aria-label="Etapas del ciclo de ejecución"
              aria-orientation="vertical"
              onKeyDown={handleTabKeyDown}
              className="flex min-w-0 gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-x-visible lg:pb-0"
            >
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;
                const isDone = index < activeIndex;
                return (
                  <button
                    key={stage.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`ciclo-tab-${stage.id}`}
                    aria-selected={isActive}
                    aria-controls={`ciclo-panel-${stage.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(index)}
                    className="group relative z-10 flex shrink-0 items-center gap-3 rounded-full px-1 py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-light-v2 lg:rounded-none lg:py-2.5"
                  >
                    <span
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                        "transition-colors duration-300 motion-reduce:transition-none",
                        isActive
                          ? "border-accent-v2 bg-accent-soft-v2 text-accent-bright-v2"
                          : isDone
                            ? "border-accent-v2 bg-accent-v2 text-white"
                            : "border-[var(--border-strong-v2)] bg-white/[0.04] text-[var(--text-muted-v2)]",
                      ].join(" ")}
                    >
                      {stage.number}
                    </span>
                    <span
                      className={[
                        "whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em]",
                        "transition-colors duration-200 motion-reduce:transition-none",
                        isActive
                          ? "text-foreground"
                          : "text-[var(--text-muted-v2)] group-hover:text-[var(--text-secondary-v2)]",
                      ].join(" ")}
                    >
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <CycleArrow
                label="Etapa anterior"
                disabled={activeIndex === 0}
                onClick={() => goTo(activeIndex - 1)}
              >
                <CaretLeftIcon size={15} weight="bold" />
              </CycleArrow>
              <CycleArrow
                label="Etapa siguiente"
                disabled={activeIndex === lastIndex}
                onClick={() => goTo(activeIndex + 1)}
              >
                <CaretRightIcon size={15} weight="bold" />
              </CycleArrow>
            </div>

            <p className="font-mono text-xs" aria-live="polite">
              <span className="text-foreground">{activeStage.number}</span>
              <span className="text-[var(--text-muted-v2)]"> / {totalLabel}</span>
            </p>
          </div>
        </div>

        <div
          className="min-w-0 lg:col-span-9"
          onTouchStart={(event) => {
            const touch = event.changedTouches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={activeStage.id}
              role="tabpanel"
              id={`ciclo-panel-${activeStage.id}`}
              aria-labelledby={`ciclo-tab-${activeStage.id}`}
              tabIndex={0}
              onClick={handleCardClick}
              initial={enter}
              animate={{ opacity: 1, x: 0 }}
              exit={exit}
              transition={{ duration: prefersReducedMotion ? 0 : DURATION_S, ease: "easeOut" }}
              // El alto mínimo iguala al de la etapa más larga (DISEÑAR): sin
              // él la tarjeta oscilaba unos 58px al cambiar y arrastraba todo
              // lo que viene debajo.
              className="glass-2-v2 relative grid cursor-pointer gap-6 overflow-hidden p-6 outline-none focus-visible:ring-2 focus-visible:ring-accent-light-v2 md:grid-cols-12 md:gap-8 lg:min-h-[512px] lg:p-8"
            >
              {/* La imagen va al costado desde tablet: apilada encima hacía la
                  tarjeta casi el doble de alta de lo que pide su contenido. */}
              <div className="md:col-span-5">
                <StageImage stage={activeStage} />
              </div>

              <div className="flex flex-col gap-5 md:col-span-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted-v2)]">
                  {activeStage.focus}
                </span>

                <h3 className="font-sans text-3xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground lg:text-[44px]">
                  {activeStage.name}
                </h3>

                <p className="max-w-[60ch] text-[15px] leading-relaxed text-[var(--text-secondary-v2)]">
                  {activeStage.description}
                </p>

                <div className="border-t border-[var(--border-v2)]" />

                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
                      Entregable
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-foreground">
                      {activeStage.deliverable}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
                      Productos
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {activeStage.products.map((product) => (
                        <span
                          key={product}
                          className="rounded-full border border-[var(--border-v2)] bg-white/[0.04] px-2.5 py-1 text-xs text-[var(--text-secondary-v2)]"
                        >
                          {product}
                        </span>
                      ))}
                    </dd>
                  </div>
                  {relatedServices.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
                        Soluciones que intervienen
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                        {relatedServices.map((service) => (
                          <Link
                            key={service.id}
                            href={`/soluciones/${service.id}`}
                            className="text-sm text-foreground underline decoration-white/20 underline-offset-4 transition-colors motion-reduce:transition-none hover:text-accent-light-v2 hover:decoration-accent-light-v2"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* El guardia de `handleCardClick` ignora los clics que caen
                    sobre un enlace, así que este CTA no avanza de etapa. */}
                <div className="mt-auto pt-2">
                  <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <div className="h-0.5 flex-1 bg-[var(--border-v2)]">
                    <div
                      className="h-full bg-accent-v2 transition-[width] duration-300 ease-out motion-reduce:transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-accent-light-v2">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CycleArrow({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong-v2)] bg-white/[0.04] text-[var(--text-secondary-v2)] outline-none transition-colors duration-200 motion-reduce:transition-none hover:bg-white/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-light-v2 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

/**
 * Render del robot de la etapa. Mientras `public/ciclo/` no exista, cae al
 * número gigante en vez de dejar un hueco roto.
 */
function StageImage({ stage }: { stage: ExecutionStage }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-[var(--border-v2)] bg-white/[0.02] md:aspect-[4/3]">
        <span
          aria-hidden
          className="select-none font-sans text-[72px] font-semibold leading-none text-white/5"
        >
          {stage.number}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-white/[0.03] md:aspect-[4/3]">
      <Image
        src={cycleImageSrc(stage.id)}
        alt=""
        fill
        sizes="(min-width: 1024px) 420px, 100vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
