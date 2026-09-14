"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { StepIndicator } from "@/components/ui/Stepper";
import type { ExecutionStage, ServiceItem } from "@/lib/ciiia";

export function CycleScrollRail({
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
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const ratiosRef = useRef(new Map<Element, number>());
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const panels = panelRefs.current.filter((el): el is HTMLElement => el !== null);
    const ratios = ratiosRef.current;

    // ponytail: IntersectionObserver callbacks only report elements whose
    // state changed, so we keep a running ratio per panel and re-scan the
    // whole map each time to find the true max, not just this batch's max.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestTarget: Element | null = null;
        let bestRatio = 0;
        for (const [target, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestTarget = target;
          }
        }
        if (bestTarget) {
          const index = panelRefs.current.findIndex((el) => el === bestTarget);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    panels.forEach((panel) => {
      ratios.set(panel, ratios.get(panel) ?? 0);
      observer.observe(panel);
    });

    return () => observer.disconnect();
  }, [stages.length]);

  const scrollToStage = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const activeStage = stages[activeIndex];
  const totalLabel = String(stages.length).padStart(2, "0");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-4">
          {eyebrow}
          <h2 className="font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">{description}</p>
        </div>

        <nav aria-label="Progreso del ciclo de ejecución" className="hidden lg:block">
          <ol className="flex flex-col">
            {stages.map((stage, index) => {
              const active = index === activeIndex;
              const isLast = index === stages.length - 1;
              return (
                <li key={stage.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <StepIndicator
                      step={index + 1}
                      currentStep={activeIndex + 1}
                      onClickStep={(clicked) => scrollToStage(clicked - 1)}
                    />
                    {!isLast && <StepConnectorVertical isComplete={activeIndex > index} />}
                  </div>
                  <button
                    type="button"
                    aria-current={active ? "step" : undefined}
                    onClick={() => scrollToStage(index)}
                    className={`pb-7 pt-1.5 text-left font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 motion-reduce:transition-none ${
                      active ? "text-foreground" : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {stage.name}
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="pl-[52px] font-mono text-xs">
            <span className="text-foreground">{activeStage.number}</span>
            <span className="text-zinc-600"> / {totalLabel}</span>
          </p>
        </nav>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
        {stages.map((stage, index) => (
          <article
            key={stage.id}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            aria-labelledby={`stage-${stage.id}-title`}
            className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 lg:min-h-[85vh] lg:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-0 z-0 select-none font-sans text-[100px] font-semibold leading-none text-white/3 lg:right-6 lg:text-[180px]"
            >
              {stage.number}
            </span>

            <div className="relative z-10 flex flex-1 flex-col gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                <span className="lg:hidden">{stage.number} &middot; </span>
                {stage.focus}
              </span>

              <h3
                id={`stage-${stage.id}-title`}
                className="font-sans text-3xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground lg:text-[56px]"
              >
                {stage.name}
              </h3>

              <p className="max-w-[60ch] text-[15px] leading-relaxed text-zinc-400 lg:text-[17px]">
                {stage.description}
              </p>

              <div className="border-t border-white/8" />

              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    Entregable
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-foreground">
                    {stage.deliverable}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    Productos
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {stage.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {product}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    Soluciones que intervienen
                  </dt>
                  <dd className="mt-2 flex flex-col gap-1.5">
                    {services
                      .filter((service) => service.stageMapping.includes(stage.id))
                      .map((service) => (
                        <Link
                          key={service.id}
                          href={`/soluciones/${service.id}`}
                          className="text-sm text-foreground underline decoration-white/20 underline-offset-4 transition-colors motion-reduce:transition-none hover:text-accent hover:decoration-accent"
                        >
                          {service.title}
                        </Link>
                      ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="h-0.5 flex-1 bg-white/8">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${((index + 1) / stages.length) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-accent">
                  {Math.round(((index + 1) / stages.length) * 100)}%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StepConnectorVertical({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="relative my-1 w-px flex-1 overflow-hidden bg-white/10" style={{ minHeight: "20px" }}>
      <motion.div
        className="absolute left-0 top-0 w-full bg-accent"
        initial={false}
        animate={{ height: isComplete ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
