import { Fragment } from "react";
import Link from "next/link";
import type { ExecutionStage } from "@/lib/ciiia";

// ponytail: "/metodologia" doesn't exist as its own route yet — the
// equivalent content lives at the home page's #ciclo section, so the rail
// links there instead of a dead 404.
const METHODOLOGY_HREF = "/#ciclo";

function nodeClass(active: boolean) {
  return active
    ? "bg-accent text-on-accent"
    : "border border-[var(--line-strong)] text-muted";
}

function labelClass(active: boolean) {
  return active ? "text-foreground" : "text-muted";
}

export function StageRail({
  stages,
  activeStageIds,
}: {
  stages: ExecutionStage[];
  activeStageIds: string[];
}) {
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
