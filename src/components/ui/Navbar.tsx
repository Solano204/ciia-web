"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/Cta";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { linkState } from "@/lib/nav";
import { CTA_COPY, NAV_LINKS, schedulingHref } from "@/lib/ciiia";

/**
 * - `hero`: sobre la secuencia del Hero. Sin fondo; solo un degradado negro
 *   arriba para que los enlaces se lean sobre el casco blanco.
 * - `solid`: fuera del Hero (o pasados 40 px en páginas sin Hero). La secuencia
 *   de «El reto» termina en un fotograma casi blanco y sin fondo los enlaces
 *   quedarían ilegibles.
 * - `clear`: arriba de una página sin Hero.
 */
type NavMode = "clear" | "hero" | "solid";

const LAYER = "pointer-events-none absolute transition-opacity duration-200 motion-reduce:transition-none";

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<NavMode>(pathname === "/" ? "hero" : "clear");

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const navHeight = headerRef.current?.offsetHeight ?? 0;
        setMode(hero.getBoundingClientRect().bottom > navHeight ? "hero" : "solid");
      } else {
        setMode(window.scrollY > 40 ? "solid" : "clear");
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40">
      {/* Opacidad plena sobre el nav y 40 px más para desvanecerse, sin caja ni borde. */}
      <div
        aria-hidden
        className={`${LAYER} inset-x-0 top-0 h-[calc(100%+40px)] ${mode === "hero" ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) calc(100% - 40px), transparent)" }}
      />
      <div
        aria-hidden
        className={`${LAYER} inset-0 border-b border-white/10 bg-black/80 backdrop-blur-md ${mode === "solid" ? "opacity-100" : "opacity-0"}`}
      />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]"
          />
          CII.IA
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map(({ href, label }) => {
            const state = linkState(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={state === "page" ? "page" : undefined}
                data-active={state ? "" : undefined}
                className={`font-sans text-[12px] uppercase tracking-[0.08em] underline-offset-[10px] transition-colors hover:text-foreground data-[active]:text-foreground data-[active]:underline data-[active]:decoration-accent ${
                  mode === "hero" ? "text-foreground" : "text-zinc-400"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA fijo. En móvil se recorta a «Agenda» para no empujar la marca
            fuera de pantalla; el nombre completo queda para lectores. */}
        <div className="flex shrink-0 items-center gap-3">
          <CtaButton href={schedulingHref()} className="shrink-0 max-sm:px-4">
            <span aria-hidden className="sm:hidden">
              Agenda
            </span>
            <span className="max-sm:sr-only">{CTA_COPY.agenda}</span>
          </CtaButton>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
