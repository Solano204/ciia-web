import { Fragment } from "react";
import Link from "next/link";
import type { ExecutionStage } from "@/lib/ciiia";

const METHODOLOGY_HREF = "/ciclo";

function nodeClass(active: boolean) {
  return active
    ? "bg-accent text-on-accent"
    : "border border-[var(--line-strong)] text-muted";
}

function labelClass(active: boolean) {
  return active ? "text-foreground" : "text-muted";
}

/**
 * Variante compacta de la ficha de solución: una sola fila, también en móvil,
 * con las etapas activas en dorado. En móvil los nombres van en una línea
 * debajo, porque cinco etiquetas no caben en 390 px.
 */
function CompactStageRail({
  stages,
  activeStageIds,
}: {
  stages: ExecutionStage[];
  activeStageIds: string[];
}) {
  const activeNames = stages
    .filter((stage) => activeStageIds.includes(stage.id))
    .map((stage) => stage.name);

  return (
    <div>
      <ol className="flex">
        {stages.map((stage, index) => {
          const active = activeStageIds.includes(stage.id);
          const isLast = index === stages.length - 1;
          const nextActive = !isLast && activeStageIds.includes(stages[index + 1].id);
          return (
            <li key={stage.id} className="relative flex flex-1 flex-col items-center gap-2">
              {!isLast && (
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-3.5 h-px w-full ${
                    active && nextActive ? "bg-accent" : "bg-[var(--line)]"
                  }`}
                />
              )}
              <Link
                href={METHODOLOGY_HREF}
                aria-label={`Etapa ${stage.number}: ${stage.name}`}
                aria-current={active ? "step" : undefined}
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none ${
                  active
                    ? "bg-accent text-on-accent"
                    : "border border-[var(--line-strong)] bg-background text-muted"
                }`}
              >
                {stage.number}
              </Link>
              <span
                className={`hidden font-sans text-[12px] uppercase tracking-[0.08em] md:block ${labelClass(active)}`}
              >
                {stage.name}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 font-sans text-[12px] uppercase tracking-[0.08em] text-foreground md:hidden">
        {activeNames.join(" · ")}
      </p>
    </div>
  );
}

export function StageRail({
  stages,
  activeStageIds,
  variant = "default",
}: {
  stages: ExecutionStage[];
  activeStageIds: string[];
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return <CompactStageRail stages={stages} activeStageIds={activeStageIds} />;
  }

  const columnCount = stages.length * 2 - 1;
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  return (
    <div>
      {/* Desktop: horizontal rail */}
      <div className="hidden lg:block">
        <div className="grid items-center" style={gridStyle}>
          {stages.map((stage, index) => {
            const active = activeStageIds.includes(stage.id);
            const isLast = index === stages.length - 1;
            const nextActive = !isLast && activeStageIds.includes(stages[index + 1].id);
            return (
              <Fragment key={stage.id}>
                <Link
                  href={METHODOLOGY_HREF}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs transition-colors duration-200 motion-reduce:transition-none ${nodeClass(active)}`}
                >
                  {stage.number}
                </Link>
                {!isLast && (
                  <div className={`h-px w-full ${active && nextActive ? "bg-accent" : "bg-[var(--line)]"}`} />
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="mt-3 grid" style={gridStyle}>
          {stages.map((stage, index) => {
            const active = activeStageIds.includes(stage.id);
            const isLast = index === stages.length - 1;
            return (
              <Fragment key={stage.id}>
                <span
                  className={`text-center font-sans text-[12px] uppercase tracking-[0.08em] ${labelClass(active)}`}
                >
                  {stage.name}
                </span>
                {!isLast && <span aria-hidden />}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical rail */}
      <div className="flex flex-col lg:hidden">
        {stages.map((stage, index) => {
          const active = activeStageIds.includes(stage.id);
          const isLast = index === stages.length - 1;
          const nextActive = !isLast && activeStageIds.includes(stages[index + 1].id);
          return (
            <div key={stage.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Link
                  href={METHODOLOGY_HREF}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors duration-200 motion-reduce:transition-none ${nodeClass(active)}`}
                >
                  {stage.number}
                </Link>
                {!isLast && (
                  <div
                    className={`w-px flex-1 ${active && nextActive ? "bg-accent" : "bg-[var(--line)]"}`}
                    style={{ minHeight: "24px" }}
                  />
                )}
              </div>
              <span
                className={`pt-2 pb-4 font-sans text-[12px] uppercase tracking-[0.08em] ${labelClass(active)}`}
              >
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
