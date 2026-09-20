"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Año calculado en el cliente. El servidor y la hidratación usan el año del
 * build, así que el primer render coincide con el HTML y nunca hay desajuste;
 * si el año cambió desde el build, se corrige justo después de montar.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );

  return <>{year}</>;
}
