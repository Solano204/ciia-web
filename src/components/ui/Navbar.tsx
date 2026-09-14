"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { scrollToAnchor } from "@/lib/smooth-anchor";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) =>
    scrollToAnchor(event, href, lenis);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          // ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
          // : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]"
          />
          
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {[
            ["#soluciones", "Soluciones"],
            ["#ciclo", "Ciclo"],
            ["#casos", "Casos"],
            ["#nosotros", "Nosotros"],
            ["#ecosistema", "Ecosistema"],
            ["#contacto", "Contacto"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(event) => handleAnchorClick(event, href)}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          onClick={(event) => handleAnchorClick(event, "#contacto")}
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.1] active:translate-y-[1px]"
        >
          Engage
          <ArrowUpRight
            size={14}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </header>
  );
}
