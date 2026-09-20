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
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";

export function Hero() {
  const reducedMotion = useReducedMotion();
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
    reducedMotion,
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

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-accent/80 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${loadProgress})`, opacity: loaded ? 0 : 1 }}
        />
      </div>
    </section>
  );
}
