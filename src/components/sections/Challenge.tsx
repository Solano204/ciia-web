"use client";

import { useCallback, useRef } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import {
  CHALLENGE_ENTER_FADE_END,
  CHALLENGE_EXIT_FADE_START,
  CHALLENGE_FRAME_COUNT,
  CHALLENGE_TEXT_FADE_IN_END,
  challengeFramePath,
} from "@/lib/challenge";
import { INSTITUTIONAL_METRICS, MANIFESTO } from "@/lib/ciiia";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";

const FOUNDING_METRIC = INSTITUTIONAL_METRICS[3];

export function Challenge() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const enterVeilRef = useRef<HTMLDivElement | null>(null);
  const exitVeilRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = useCallback((progress: number) => {
    if (textRef.current) {
      const opacity = Math.min(1, progress / CHALLENGE_TEXT_FADE_IN_END);
      textRef.current.style.opacity = String(opacity);
      textRef.current.style.transform = `translateY(${(1 - opacity) * 14}px)`;
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${progress})`;
    }

    // Se escriben directamente en el estilo, igual que el resto de esta
    // sección: van atadas al scroll y no deben provocar un render por frame.
    if (enterVeilRef.current) {
      enterVeilRef.current.style.opacity = String(
        1 - Math.min(1, progress / CHALLENGE_ENTER_FADE_END),
      );
    }

    if (exitVeilRef.current) {
      exitVeilRef.current.style.opacity = String(
        Math.max(0, (progress - CHALLENGE_EXIT_FADE_START) / (1 - CHALLENGE_EXIT_FADE_START)),
      );
    }
  }, []);

  const { sectionRef, canvasRef, loaded, loadProgress } = useScrollFrameSequence({
    frameCount: CHALLENGE_FRAME_COUNT,
    framePath: challengeFramePath,
    onProgress: handleProgress,
  });

  return (
    <section ref={sectionRef} className="scroll-animation relative">
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

        {/* Velos de empalme. Van sobre el lienzo pero bajo el texto (z-10),
            para que la copia siga legible mientras la escena se funde. */}
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
          ref={textRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-6 px-6 pb-24 md:px-12 md:pb-28"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <EyebrowBadge>CII.IA // EL RETO</EyebrowBadge>
          <div className="flex flex-wrap items-end gap-5">
            <span className="font-sans font-semibold leading-none tracking-tighter text-accent text-[clamp(4rem,10vw,9rem)]">
              {FOUNDING_METRIC.value}
            </span>
            <span className="max-w-[24ch] pb-2 font-mono text-xs uppercase leading-snug tracking-[0.2em] text-zinc-400 md:text-sm">
              {FOUNDING_METRIC.label}
            </span>
          </div>
          <p className="max-w-[56ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            {MANIFESTO.reto}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted-v2)] md:mx-10">
            <span>SEQ 002 / 169</span>
            <span>CII.IA // CONTEXTO</span>
            <span>Despl&aacute;zate &darr;</span>
          </div>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted-v2)]">
              Cargando CII.IA &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
