"use client";

import { useCallback, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { CtaButton, CtaLink } from "@/components/ui/Cta";
import { DIALOGUES, FRAME_COUNT, HERO_TEXT_FADE_END, framePath } from "@/lib/hero";
import { CTA_COPY, INSTITUTIONAL_METRICS, MANIFESTO, schedulingHref } from "@/lib/ciiia";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";

export function Hero() {
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const bigLeftTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const prevVisibleIdsRef = useRef("");

  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const handleProgress = useCallback((progress: number) => {
    if (heroTextRef.current) {
      const opacity = Math.max(0, 1 - progress / HERO_TEXT_FADE_END);
      heroTextRef.current.style.opacity = String(opacity);
      heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 12}px)`;
    }

    if (bigLeftTextRef.current) {
      const op = Math.min(1, Math.max(0, (progress - 0.1) / 0.08));
      bigLeftTextRef.current.style.opacity = String(op);
      bigLeftTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${progress})`;
    }

    const newVisible = new Set<string>();
    for (const d of DIALOGUES) {
      if (progress >= d.show && progress <= d.hide) newVisible.add(d.id);
    }
    const newIds = [...newVisible].sort().join(",");
    if (newIds !== prevVisibleIdsRef.current) {
      prevVisibleIdsRef.current = newIds;
      setVisibleCards(newVisible);
    }
  }, []);

  const { sectionRef, canvasRef, loaded, loadProgress } = useScrollFrameSequence({
    frameCount: FRAME_COUNT,
    framePath,
    onProgress: handleProgress,
  });

  return (
    <section id="hero" ref={sectionRef} className="scroll-animation relative">
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-background"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />

        <div className="pointer-events-none absolute left-6 top-24 text-accent md:left-10 md:top-28">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-accent md:right-10 md:top-28">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-accent md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-accent md:bottom-16 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-5 px-6 pb-24 md:px-12 md:pb-28"
          style={{ transition: "opacity 80ms linear" }}
        >
          <EyebrowBadge>{MANIFESTO.eyebrow}</EyebrowBadge>
          <h1 className="max-w-[16ch] font-sans text-5xl font-semibold leading-[0.95] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
            {MANIFESTO.problem[0]}
            <br />
            <span className="text-accent">{MANIFESTO.problem[1]}</span>
          </h1>
          <p className="max-w-[56ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            {MANIFESTO.lead}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
            <CtaLink href="#soluciones">Ver soluciones</CtaLink>
          </div>
        </div>

        <div
          ref={bigLeftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[58%] flex-col gap-5 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
            PIIT &middot; Nuevo Le&oacute;n
          </span>
          <h2 className="font-sans font-semibold leading-[0.88] tracking-tighter text-foreground text-[clamp(4rem,9.5vw,9rem)]">
            De la idea
            <br />
            a la <span className="text-accent">operaci&oacute;n</span>.
          </h2>
          <p className="max-w-[42ch] font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            {INSTITUTIONAL_METRICS[0].value} {INSTITUTIONAL_METRICS[0].label} &middot;{" "}
            {INSTITUTIONAL_METRICS[1].value} {INSTITUTIONAL_METRICS[1].label}
          </p>
        </div>

        <div className="pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
          <div className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            CII.IA &mdash; En vivo
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            {INSTITUTIONAL_METRICS[2].label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {INSTITUTIONAL_METRICS[2].value}
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted md:mx-10">
            <span>SEQ 001 / 169</span>
            <span>CII.IA // DIAGN&Oacute;STICO</span>
            <span>Despl&aacute;zate &darr;</span>
          </div>
        </div>

        {DIALOGUES.map((d, index) => {
          const visible = visibleCards.has(d.id);
          const position =
            index === 0
              ? "top-[60%] right-6 md:right-12"
              : index === 1
              ? "top-1/2 -translate-y-1/2 right-6 md:right-12"
              : "bottom-44 right-6 md:bottom-88 md:right-12";
          return (
            <div
              key={d.id}
              className={`pointer-events-none absolute ${position} z-20 hidden w-[420px] max-w-[90vw] md:block`}
            >
              <figure
                className={`card-surface pointer-events-auto p-6 transition-all duration-400 ease-out ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <blockquote className="font-sans text-xl font-medium leading-snug tracking-tight text-foreground">
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between">
                  <span className="font-sans text-sm text-zinc-300">{d.speaker}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    {d.source}
                  </span>
                </figcaption>
              </figure>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 top-[38%] z-20 flex flex-col gap-3 px-6 md:hidden">
          {DIALOGUES.map((d) => {
            const visible = visibleCards.has(d.id);
            return (
              <figure
                key={d.id}
                className={`card-surface pointer-events-auto p-5 transition-all duration-400 ease-out ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <blockquote className="font-sans text-base font-medium leading-snug text-foreground">
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 flex items-center justify-between">
                  <span className="font-sans text-xs text-zinc-300">
                    {d.speaker}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                    {d.source}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-background px-6">
            <EyebrowBadge>CII.IA // CARGANDO</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Cargando CII.IA &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
