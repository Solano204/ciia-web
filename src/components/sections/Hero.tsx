"use client";

import { useCallback, useRef } from "react";
import { CtaButton, CtaLink } from "@/components/ui/Cta";
import {
  FRAME_COUNT,
  HERO_TEXT_FADE_END,
  HERO_TEXT_FADE_START,
  framePath,
} from "@/lib/hero";
import { CTA_COPY, HERO_LEAD, HERO_PROOF, schedulingHref } from "@/lib/ciiia";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";

export function Hero() {
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = useCallback((progress: number) => {
    const el = heroTextRef.current;
    if (!el) return;
    const fade = (progress - HERO_TEXT_FADE_START) / (HERO_TEXT_FADE_END - HERO_TEXT_FADE_START);
    const opacity = 1 - Math.min(1, Math.max(0, fade));
    el.style.opacity = String(opacity);
    el.style.transform = `translateY(${(1 - opacity) * 12}px)`;
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,0.88), rgba(10,10,11,0.55) 45%, transparent)",
          }}
        />

        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-6 px-6 pb-14 md:px-12 md:pb-20"
          style={{ willChange: "opacity, transform" }}
        >
          <h1 className="font-display text-display font-semibold text-foreground">
            De la idea
            <br />a la <span className="text-accent">operación</span>.
          </h1>
          <p className="max-w-[52ch] font-sans text-base leading-relaxed text-foreground/80">
            {HERO_LEAD}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
            <CtaLink href="/soluciones">Ver soluciones</CtaLink>
          </div>
          <p className="border-t border-[var(--line-strong)] pt-4 font-sans text-small text-[var(--text-secondary)]">
            {HERO_PROOF}
          </p>
        </div>

        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-background px-6">
            <span className="inline-flex items-center gap-2 font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              CII.IA // CARGANDO
            </span>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
              Cargando CII.IA &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
