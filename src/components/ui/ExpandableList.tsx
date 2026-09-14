"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type ExpandableItem = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  detail: ReactNode;
};

export function ExpandableList({ items }: { items: ExpandableItem[] }) {
  const [active, setActive] = useState<ExpandableItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="card-surface flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/8 p-6">
                <div>
                  {active.eyebrow && (
                    <motion.p
                      layoutId={`eyebrow-${active.id}-${id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent"
                    >
                      {active.eyebrow}
                    </motion.p>
                  )}
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="mt-2 font-sans text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {active.title}
                  </motion.h3>
                  {active.subtitle && (
                    <p className="mt-1 text-sm text-zinc-400">{active.subtitle}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Cerrar"
                  className="shrink-0 rounded-full border border-white/12 bg-white/[0.04] p-2 text-zinc-400 transition-colors hover:text-foreground"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="overflow-y-auto p-6 text-sm leading-relaxed text-zinc-400 [scrollbar-width:none]">
                {active.detail}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="flex flex-col divide-y divide-white/8 border-y border-white/8">
        {items.map((item) => (
          <motion.li
            layoutId={`card-${item.id}-${id}`}
            key={item.id}
            onClick={() => setActive(item)}
            className="group flex cursor-pointer flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:bg-white/[0.03]"
          >
            <div>
              {item.eyebrow && (
                <motion.p
                  layoutId={`eyebrow-${item.id}-${id}`}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent"
                >
                  {item.eyebrow}
                </motion.p>
              )}
              <motion.h3
                layoutId={`title-${item.id}-${id}`}
                className="mt-1 font-sans text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent"
              >
                {item.title}
              </motion.h3>
              {item.subtitle && (
                <p className="mt-1 max-w-[52ch] text-sm text-zinc-400">{item.subtitle}</p>
              )}
            </div>
            {item.meta && (
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {item.meta}
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6l-12 12" strokeLinecap="round" />
      <path d="M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}
