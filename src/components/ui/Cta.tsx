"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { scrollToAnchor } from "@/lib/smooth-anchor";

type CtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const isAnchor = (href: string) => href.startsWith("#");
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * Un solo componente resuelve las tres formas de destino que usa el sitio:
 * ancla con scroll suave de Lenis, enlace externo y ruta interna de Next.
 * Así ningún llamador tiene que acordarse de cuál le toca.
 */
function CtaAnchor({ href, className, children }: CtaProps) {
  const lenis = useLenis();

  if (isAnchor(href)) {
    const onClick = (event: MouseEvent<HTMLAnchorElement>) =>
      scrollToAnchor(event, href, lenis);
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }

  if (isExternal(href)) {
    const nuevaVentana = href.startsWith("http");
    return (
      <a
        href={href}
        {...(nuevaVentana ? { target: "_blank", rel: "noreferrer" } : {})}
        className={className}
      >
        {children}
        {nuevaVentana && <span className="sr-only">Se abre en una ventana nueva</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const BASE =
  "inline-flex items-center gap-2 rounded-full font-sans text-[12px] font-semibold uppercase tracking-[0.08em] outline-none transition-[background-color,color,filter] duration-200 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * CTA principal: botón dorado. El texto va en el color de fondo del sitio
 * (8.5:1 sobre el dorado), no en blanco, que sobre este ámbar se queda corto.
 */
export function CtaButton({ href, children, className = "" }: CtaProps) {
  return (
    <CtaAnchor
      href={href}
      className={`${BASE} bg-accent px-5 py-2.5 text-background hover:brightness-110 ${className}`}
    >
      {children}
      <ArrowUpRightIcon size={12} weight="bold" aria-hidden />
    </CtaAnchor>
  );
}

/** CTA secundario: enlace de texto, sin competir con el botón dorado. */
export function CtaLink({ href, children, className = "" }: CtaProps) {
  return (
    <CtaAnchor
      href={href}
      className={`${BASE} px-1 py-2.5 text-foreground underline-offset-[6px] hover:text-accent hover:underline ${className}`}
    >
      {children}
      <ArrowUpRightIcon size={12} weight="bold" aria-hidden />
    </CtaAnchor>
  );
}

/**
 * Fila de cierre de sección: separador fino y los CTA alineados. Se usa igual
 * en todas las secciones para que el remate sea el mismo en todo el sitio.
 */
export function SectionCta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--line)] pt-8 ${className}`}
    >
      {children}
    </div>
  );
}
