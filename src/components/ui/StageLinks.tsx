import Link from "next/link";
import type { ExecutionStage } from "@/lib/ciiia";

/**
 * Teaser del Ciclo en la home: las cinco etapas en una fila compacta, número y
 * nombre. Cada una abre /ciclo en su tarjeta. En móvil es una lista de cinco
 * filas, porque cinco columnas no dan para «DESARROLLAR» a 12 px.
 */
export function StageLinks({ stages }: { stages: ExecutionStage[] }) {
  return (
    <ol className="grid md:grid-cols-5 md:gap-8">
      {stages.map((stage) => (
        <li key={stage.id} className="border-t border-[var(--line)]">
          <Link
            href={`/ciclo#${stage.id}`}
            className="group flex items-baseline gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex-col md:gap-3 md:py-6"
          >
            <span className="font-display text-h2 font-semibold leading-none tabular-nums text-foreground transition-colors duration-200 group-hover:text-accent motion-reduce:transition-none">
              {stage.number}
            </span>
            <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-[var(--text-secondary)] underline-offset-[6px] transition-colors duration-200 group-hover:text-foreground group-hover:underline motion-reduce:transition-none">
              {stage.name}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
