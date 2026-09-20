"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A partir de `lg` el deck se mueve con `transform` y las vecinas se asoman;
 * por debajo es un scroller nativo con snap. El punto de corte tiene que
 * coincidir con los prefijos `lg:` del componente o la geometría y el pintado
 * dejan de estar de acuerdo.
 */
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Cadencia del deck. Iguala la del carrusel del Ciclo para que las dos
 * secciones con carrusel se sientan del mismo sitio: el principio rector pide
 * una sola intensidad de movimiento, y la referencia es el efecto del cursor.
 * Se tocan aquí y en ningún otro sitio.
 */
export const DECK_DURATION_MS = 320;
export const DECK_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Transición compartida por el riel y por las tarjetas. Con
 * `prefers-reduced-motion` la duración cae a cero: el cambio es instantáneo,
 * pero la escala y la opacidad de las vecinas se conservan, porque son
 * jerarquía visual y no movimiento.
 */
export function deckTransition(enabled: boolean): {
  transitionDuration: string;
  transitionTimingFunction: string;
} {
  return {
    transitionDuration: enabled ? `${DECK_DURATION_MS}ms` : "0ms",
    transitionTimingFunction: DECK_EASING,
  };
}

/** `useLayoutEffect` avisa en el render del servidor; aquí sólo mide el DOM. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type DeckCarousel = {
  activeIndex: number;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  /** Traslación del riel en escritorio. En móvil siempre 0: manda el scroll. */
  offsetX: number;
  /** Falso hasta la primera medición, para que el centrado inicial no se deslice. */
  ready: boolean;
  atStart: boolean;
  atEnd: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  railRef: RefObject<HTMLDivElement | null>;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
};

export function useDeckCarousel({
  count,
  resetKey,
  initialIndex = 0,
}: {
  count: number;
  /** Identidad del filtro activo. Al cambiar, el deck vuelve a la primera tarjeta. */
  resetKey: string;
  /** Tarjeta con la que abre el deck (enlaces directos como `/ciclo#desplegar`). */
  initialIndex?: number;
}): DeckCarousel {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [offsetX, setOffsetX] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [ready, setReady] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const lastIndex = Math.max(0, count - 1);
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Las tarjetas se localizan por `data-deck-index` en el momento de usarlas, no
  // con un mapa de refs. Con `key={item.id}`, al reabrir un filtro React reutiliza
  // las tarjetas que seguían montadas y NO vuelve a llamar al callback de ref, así
  // que un mapa se queda apuntando al índice viejo: el caso que pasaba de estar
  // solo a ser el último dejaba su hueco a `null` y el deck no se desplazaba.
  const cardAt = useCallback(
    (index: number) =>
      railRef.current?.querySelector<HTMLElement>(`[data-deck-index="${index}"]`) ?? null,
    [],
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Cambio de filtro: vuelta a la primera tarjeta. Se ajusta durante el render
  // —el patrón de React para reiniciar estado cuando cambia una prop— en vez de
  // en un efecto, que provocaría un render en cascada con la lista ya pintada.
  const [lastResetKey, setLastResetKey] = useState(resetKey);
  if (lastResetKey !== resetKey) {
    setLastResetKey(resetKey);
    setActiveIndex(0);
  }

  // El scroller de móvil sí es un sistema externo: su posición no la conoce
  // React y hay que devolverla al origen a mano.
  useIsomorphicLayoutEffect(() => {
    containerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [resetKey]);

  // Apertura directa en una tarjeta: el scroller móvil arranca centrado en ella,
  // sin deslizamiento. En escritorio no hace falta: ahí manda el `transform`.
  useIsomorphicLayoutEffect(() => {
    if (initialIndex <= 0 || window.matchMedia(DESKTOP_QUERY).matches) return;
    const container = containerRef.current;
    const card = cardAt(initialIndex);
    if (!container || !card) return;
    const view = container.getBoundingClientRect();
    const box = card.getBoundingClientRect();
    container.scrollTo({
      left: container.scrollLeft + box.left + box.width / 2 - (view.left + view.width / 2),
      behavior: "auto",
    });
  }, [initialIndex, cardAt]);

  const recalculate = useCallback(() => {
    const container = containerRef.current;
    const card = cardAt(activeIndex);
    if (!container || !card) return;
    // `offsetLeft` es posición de maquetación: el `transform` del riel no lo
    // altera, así que se puede medir en cualquier momento del ciclo.
    setOffsetX(container.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2));
  }, [activeIndex, cardAt]);

  useIsomorphicLayoutEffect(() => {
    if (!isDesktop) {
      setOffsetX(0);
      setReady(true);
      return;
    }
    recalculate();
    setReady(true);

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(recalculate);
    observer.observe(container);
    return () => observer.disconnect();
  }, [isDesktop, recalculate, count, resetKey]);

  // En móvil el índice lo dicta el dedo: la paginación sigue a lo que está
  // centrado, no al revés.
  useEffect(() => {
    if (isDesktop) return;
    const container = containerRef.current;
    if (!container) return;
    const cards = [...(railRef.current?.querySelectorAll<HTMLElement>("[data-deck-index]") ?? [])];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.deckIndex);
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { root: container, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [isDesktop, count, resetKey]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, index));
      setActiveIndex(clamped);
      if (isDesktop) return;

      const container = containerRef.current;
      const card = cardAt(clamped);
      if (!container || !card) return;

      // Se mide por rectángulos y no por `offsetLeft`: así el cálculo no
      // depende del relleno del scroller ni de dónde esté el scroll ahora
      // mismo, y sigue siendo un destino absoluto aunque haya un
      // desplazamiento suave a medio camino.
      const view = container.getBoundingClientRect();
      const box = card.getBoundingClientRect();
      const delta = box.left + box.width / 2 - (view.left + view.width / 2);
      container.scrollTo({
        left: container.scrollLeft + delta,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [isDesktop, lastIndex, prefersReducedMotion, cardAt],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const previous = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  return {
    activeIndex,
    isDesktop,
    prefersReducedMotion,
    offsetX,
    ready,
    atStart: activeIndex === 0,
    atEnd: activeIndex === lastIndex,
    containerRef,
    railRef,
    goTo,
    next,
    previous,
  };
}
