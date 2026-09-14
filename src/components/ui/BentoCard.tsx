"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { CardMedia, type MediaAspect } from "@/components/ui/CardMedia";
import type { ServiceItem } from "@/lib/ciiia";

type Size = "lg" | "md" | "sm";

function sizeFromSpan(col: number): Size {
  if (col >= 7) return "lg";
  if (col >= 5) return "md";
  return "sm";
}

const TAGLINE_CLASS: Record<Size, string> = {
  lg: "text-[32px]",
  md: "text-[24px]",
  sm: "text-[20px]",
};

const MEDIA_ASPECT: Record<Size, MediaAspect> = {
  lg: "wide",
  md: "video",
  sm: "square",
};

const MAX_CHIPS_MEDIUM = 3;

export function BentoCard({
  service,
  className = "",
}: {
  service: ServiceItem;
  className?: string;
}) {
  const size = sizeFromSpan(service.span.col);
  const showBody = size !== "sm";
  const chips =
    size === "lg" ? service.technicalSpecs : service.technicalSpecs.slice(0, MAX_CHIPS_MEDIUM);
  const hiddenChipCount = service.technicalSpecs.length - chips.length;

  return (
    <Link
      href={`/soluciones/${service.id}`}
      className={`group flex h-full flex-col gap-4 rounded-2xl border transition-colors duration-200 motion-reduce:transition-none ${
        service.featured
          ? "border-accent/40 bg-accent-soft hover:border-accent/60"
          : "border-[var(--card-border)] bg-[var(--card-bg)] hover:border-accent/60"
      } ${size === "sm" ? "p-5" : "p-6"} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">
          {service.title}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-transform duration-200 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
          <ArrowUpRight size={14} weight="bold" />
        </span>
      </div>

      <CardMedia media={service.media ?? { kind: "none" }} aspect={MEDIA_ASPECT[size]} />

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          {service.category}
        </span>
        <h3
          className={`font-sans font-semibold leading-tight tracking-tight text-foreground ${TAGLINE_CLASS[size]}`}
        >
          {service.tagline}
        </h3>
        {showBody && (
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {service.description}
          </p>
        )}
      </div>

      <p className={`font-mono text-sm text-accent ${size === "sm" ? "line-clamp-1" : ""}`}>
        {service.startingPrice}
      </p>

      {showBody && (
        <div className="mt-auto flex flex-wrap gap-2">
          {chips.map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
            >
              {spec}
            </span>
          ))}
          {hiddenChipCount > 0 && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300">
              +{hiddenChipCount}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
