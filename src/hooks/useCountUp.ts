"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseCountUpOptions = {
  /** Duración total del conteo, en ms. */
  duration?: number;
  /** Porción del elemento visible que dispara el conteo. */
  threshold?: number;
  /** Si es false, el valor final se imprime sin animar. */
  enabled?: boolean;
};

type UseCountUpResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  count: number;
};

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Cuenta de 0 hasta `target` la primera vez que el elemento entra en viewport.
 * Con `prefers-reduced-motion: reduce` imprime el valor final de inmediato.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  { duration = 1200, threshold = 0.4, enabled = true }: UseCountUpOptions = {},
): UseCountUpResult<T> {
  const ref = useRef<T>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!enabled || !node || prefersReducedMotion) {
      setCount(target);
      return;
    }

    let frame = 0;
    let startedAt: number | null = null;

    const step = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(target * easeOut(progress)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.unobserve(node);
        frame = requestAnimationFrame(step);
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, threshold, enabled]);

  return { ref, count };
}
