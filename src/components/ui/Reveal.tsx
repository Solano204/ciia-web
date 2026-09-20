"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/** Retraso entre hermanos: `--stagger` (60 ms) en DESIGN.md. */
const STAGGER_MS = 60;

/**
 * Fade + 16 px hacia arriba al entrar en vista (`--dur-base`, 250 ms). `index`
 * escalona a los hermanos. Solo `opacity` y `transform`; con reduced motion el
 * elemento nace visible y sin transición.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${index * STAGGER_MS}ms` }}
    >
      {children}
    </div>
  );
}
