"use client";

import { useCallback, useRef } from "react";
import { CtaButton } from "@/components/ui/Cta";
import {
  CHALLENGE_FRAME_COUNT,
  CHALLENGE_REDUCED_LAYERS,
  CHALLENGE_REDUCED_PROGRESS,
  challengeFramePath,
  challengeLayers,
} from "@/lib/challenge";
import { CTA_COPY, INAUGURATION, RETO_STAT, schedulingHref } from "@/lib/ciiia";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex max-w-[30ch] flex-col gap-3">
      <span className="font-display text-display font-semibold text-foreground">{value}</span>
      <span className="font-sans text-base leading-snug text-foreground/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]">
        {label}
      </span>
    </div>
  );
}

export function Challenge() {
  const reducedMotion = useReducedMotion();
  const textRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const enterVeilRef = useRef<HTMLDivElement | null>(null);
  const exitVeilRef = useRef<HTMLDivElement | null>(null);

  // Todo se escribe directo en el estilo, atado al scroll: no debe provocar
  // un render por frame.
  const handleProgress = useCallback(
    (progress: number) => {
      const layers = reducedMotion ? CHALLENGE_REDUCED_LAYERS : challengeLayers(progress);

      if (enterVeilRef.current) enterVeilRef.current.style.opacity = String(layers.enterVeil);
      if (exitVeilRef.current) exitVeilRef.current.style.opacity = String(layers.exitVeil);

      if (textRef.current) {
        textRef.current.style.opacity = String(layers.text);
        textRef.current.style.transform = `translateY(${(1 - layers.text) * 14}px)`;
      }

      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(layers.cta);
        ctaRef.current.style.transform = `translateY(${(1 - layers.cta) * 14}px)`;
        // Oculto no recibe foco ni clics mientras el CTA no se ve.
        ctaRef.current.style.visibility = layers.cta > 0.02 ? "visible" : "hidden";
      }
    },
    [reducedMotion],
  );

  const { sectionRef, canvasRef } = useScrollFrameSequence({
    frameCount: CHALLENGE_FRAME_COUNT,
    framePath: challengeFramePath,
    onProgress: handleProgress,
    reducedMotion,
    reducedProgress: CHALLENGE_REDUCED_PROGRESS,
  });

  return (
    <section ref={sectionRef} className="scroll-animation relative">
      {/* Funde el final de la sección anterior a negro antes de que entre el rojo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[16vh] z-10 h-[16vh]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />

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
              "linear-gradient(to top, rgba(10,10,11,0.8), rgba(10,10,11,0.4) 50%, transparent)",
          }}
        />

        {/* Velos de opacidad. Van sobre el lienzo y bajo el texto (z-10). */}
        <div
          ref={enterVeilRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-background"
          style={{ opacity: 1 }}
        />
        <div
          ref={exitVeilRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-background"
          style={{ opacity: 0 }}
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-10 px-6 pb-14 md:px-12 md:pb-20">
          <div
            ref={textRef}
            className="flex flex-col gap-8 md:flex-row md:gap-16"
            style={{ opacity: 0, willChange: "opacity, transform" }}
          >
            <Stat value={INAUGURATION.value} label={INAUGURATION.label} />
            <Stat value={RETO_STAT.value} label={RETO_STAT.label} />
          </div>
          <div
            ref={ctaRef}
            style={{ opacity: 0, visibility: "hidden", willChange: "opacity, transform" }}
          >
            <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
