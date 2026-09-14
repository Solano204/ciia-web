"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getReducedMotion = (): boolean => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** En el servidor no hay media query: se asume movimiento permitido y el
 *  cliente corrige tras hidratar, sin desajuste. */
const getServerReducedMotion = (): boolean => false;

type UseRevealOnScrollOptions = {
  /** Porción del elemento visible que dispara el revelado. */
  threshold?: number;
  rootMargin?: string;
  /** Si es true (por defecto) se revela una sola vez y desconecta el observer. */
  once?: boolean;
};

type UseRevealOnScrollResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  isVisible: boolean;
};

/**
 * Marca un elemento como visible la primera vez que entra en viewport.
 * Con `prefers-reduced-motion: reduce` no se crea observer y el elemento nace
 * visible, para que el estado final se pinte sin animación.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLElement>({
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: UseRevealOnScrollOptions = {}): UseRevealOnScrollResult<T> {
  const ref = useRef<T>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setHasEntered(true);
          if (once) observer.unobserve(node);
          return;
        }

        if (!once) setHasEntered(false);
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, threshold, rootMargin, once]);

  return { ref, isVisible: reduceMotion || hasEntered };
}
