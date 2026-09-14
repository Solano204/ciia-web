import type { ReactNode } from "react";

// ponytail: no longer mounts its own Beams — a single global instance
// (BeamsGlobalMount, in layout.tsx) now covers the whole page so the pattern
// stays continuous instead of restarting at every section boundary. This
// wrapper is kept only so callers (Solutions/Cases/etc.) don't need to be
// touched again — it's just the transparent layout shell they already use.
export function BeamsBackground({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative ${className}`}>{children}</div>;
}
