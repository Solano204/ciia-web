"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { deckTransition } from "@/hooks/useDeckCarousel";
import { technologyLabel } from "@/lib/cases";
import type { ProjectCase } from "@/lib/ciiia";

export type CaseCardProps = {
  item: ProjectCase;
  index: number;
  isActive: boolean;
  /** Trae al centro una tarjeta lateral. No navega. */
  onSelect: (index: number) => void;
  /** El foco nunca debe quedarse en algo recortado por el borde del riel. */
  onFocusCard: (index: number) => void;
  animated: boolean;
};

export function CaseCard({
  item,
  index,
  isActive,
  onSelect,
  onFocusCard,
  animated,
}: CaseCardProps) {
  const router = useRouter();
  const href = `/casos/${item.id}`;

  // Un solo punto de decisión: lateral centra, activa navega. La tarjeta no
  // puede envolverse en un enlace o el primer clic se iría a la ficha.
  const activate = () => {
    if (isActive) router.push(href);
    else onSelect(index);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    // «Ver caso» es un enlace de verdad y ya lleva su propio `stopPropagation`;
    // esto cubre el caso de que el clic nazca en un descendiente suyo.
    if ((event.target as HTMLElement).closest("a")) return;
    activate();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if ((event.target as HTMLElement).closest("a")) return;
    event.preventDefault();
    activate();
  };

  return (
    <article
      data-deck-index={index}
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${item.title}. ${item.sector}, ${technologyLabel(item.technology)}.`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => onFocusCard(index)}
      style={deckTransition(animated)}
      className={[
        // El 85% deja asomar los separadores del riel a ambos lados y es el
        // número del que salen sus anchos: (100% − 85%) / 2.
        "group relative flex w-[85%] shrink-0 cursor-pointer snap-center flex-col",
        "rounded-2xl border border-white/8 bg-white/[0.02] p-9",
        "min-h-[400px] lg:min-h-[440px] lg:w-[520px]",
        // Tailwind v4 emite `scale-*` como la propiedad `scale`, no dentro de
        // `transform`: la transición tiene que nombrarla o el cambio es seco.
        "outline-none transition-[opacity,scale] focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        // El atenuado de las vecinas vive en CSS y sólo desde `lg`, para que no
        // haya un parpadeo entre el HTML del servidor y la primera medición.
        isActive ? "lg:scale-100 lg:opacity-100" : "lg:scale-[0.96] lg:opacity-[0.35]",
      ].join(" ")}
    >
      <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        {item.sector} &middot; {technologyLabel(item.technology)}
      </span>

      <span className="mt-6 font-sans text-[56px] font-bold leading-none tabular-nums text-accent lg:text-[72px]">
        {item.metricHighlight}
      </span>
      <span className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
        {item.metricLabel}
      </span>

      <div className="my-6 h-px w-full bg-white/8" />

      <h3 className="font-sans text-[20px] font-medium text-foreground lg:text-[24px]">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {item.challenge}
      </p>

      {/* El enlace se renderiza en las doce tarjetas y sólo se oculta con
          opacidad: si no está en el DOM, el rastreador no ve la ficha. Al
          recibir foco, su tarjeta se trae al centro y se hace visible. */}
      <div className="mt-auto flex justify-end pt-6">
        <Link
          href={href}
          onClick={(event) => event.stopPropagation()}
          onFocus={() => onFocusCard(index)}
          style={deckTransition(animated)}
          className={`inline-flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] outline-none transition-opacity hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
            isActive ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Ver caso
          <ArrowRightIcon size={14} weight="bold" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
