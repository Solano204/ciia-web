"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/Cta";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { linkState } from "@/lib/nav";
import { CTA_COPY, NAV_LINKS, schedulingHref } from "@/lib/ciiia";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      // El fondo al hacer scroll no es sólo estética: la secuencia de «El reto»
      // termina en un fotograma casi blanco y sin él los enlaces quedan
      // ilegibles encima. Las dos ramas estaban comentadas, de modo que la
      // plantilla interpolaba `scrolled` y colaba `true`/`false` como clase.
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
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
                className="font-sans text-[12px] uppercase tracking-[0.08em] text-zinc-400 underline-offset-[10px] transition-colors hover:text-foreground data-[active]:text-foreground data-[active]:underline data-[active]:decoration-accent"
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
