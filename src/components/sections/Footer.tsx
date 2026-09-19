"use client";

import type { MouseEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { scrollToAnchor } from "@/lib/smooth-anchor";
import { CONTACT_INFO, NAV_LINKS, PRIVACY_NOTICE_HREF } from "@/lib/ciiia";

export function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) =>
    scrollToAnchor(event, href, lenis);

  return (
    <BeamsBackground className="section-seam">
      <footer id="footer" className="px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-foreground">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]"
                />
                CII.IA
              </div>
              <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-300">
                Centro de Innovación Industrial en Inteligencia Artificial.
                Administrado por Monterrey IT Clúster.
              </p>
              <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400">
                {CONTACT_INFO.location}
              </p>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-14">
              <nav aria-label="Navegación del sitio" className="flex flex-col gap-3">
                <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-zinc-400">
                  Navegación
                </h2>
                {NAV_LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(event) => handleAnchorClick(event, href)}
                    className="font-sans text-[13px] font-medium text-zinc-300 transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-3">
                <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-zinc-400">
                  Contacto
                </h2>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="font-sans text-[13px] font-medium text-zinc-300 transition-colors hover:text-accent"
                >
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-sans text-[13px] font-medium text-zinc-300 transition-colors hover:text-accent"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-zinc-400">
                  Redes
                </h2>
                {CONTACT_INFO.social.map((network) => (
                  <a
                    key={network.href}
                    href={network.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group font-sans text-[13px] font-medium text-zinc-300 transition-colors hover:text-accent"
                  >
                    {network.label}
                    <ArrowUpRight
                      size={11}
                      weight="bold"
                      className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-sans text-[12px] uppercase tracking-[0.08em] text-zinc-400 md:flex-row md:items-center md:justify-between">
            <span>
              &copy; {year} CII.IA &nbsp;&middot;&nbsp; Administrado por Monterrey IT
              Clúster
            </span>
            {PRIVACY_NOTICE_HREF && (
              <a
                href={PRIVACY_NOTICE_HREF}
                className="transition-colors hover:text-accent"
              >
                Aviso de privacidad
              </a>
            )}
          </div>
        </div>
      </footer>
    </BeamsBackground>
  );
}
