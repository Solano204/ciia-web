"use client";

import { useCountUp } from "@/hooks/useCountUp";

/** "50+" → 50 + "+"; "5" → 5 + ""; "2021" no se anima (`animate={false}`). */
const COUNTABLE_VALUE = /^(\d+)(\D*)$/;

/** Cifra que sube de 0 a su valor una sola vez al entrar en pantalla. */
export function CountingValue({
  value,
  animate,
  className,
}: {
  value: string;
  animate: boolean;
  className?: string;
}) {
  const parsed = COUNTABLE_VALUE.exec(value);
  const target = parsed ? Number(parsed[1]) : 0;
  const suffix = parsed ? parsed[2] : "";
  const shouldCount = animate && parsed !== null;
  const { ref, count } = useCountUp<HTMLSpanElement>(target, { enabled: shouldCount });

  return (
    <span ref={ref} className={className}>
      {shouldCount ? `${count}${suffix}` : value}
    </span>
  );
}
