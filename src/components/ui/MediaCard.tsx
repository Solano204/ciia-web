import Link from "next/link";
import type { ReactNode } from "react";

type MediaCardProps = {
  href: string;
  /** Imagen protagonista. */
  media: ReactNode;
  title: ReactNode;
  /** Texto corto sobre el título. */
  label?: ReactNode;
  /** Una frase. */
  description?: ReactNode;
  /** Dato clave, en mono. */
  datum?: ReactNode;
  /** CTA propio de la tarjeta; queda por encima del enlace extendido. */
  action?: ReactNode;
  className?: string;
};

// El zoom de 3% vive en la imagen, contenida por el `overflow-hidden` del marco.
// Solo `transform`, y sin efecto con reduced motion.
export const MEDIA_CLASS =
  "overflow-hidden rounded-xl [&_img]:transition-transform [&_img]:duration-[var(--dur-large)] [&_img]:ease-[var(--ease-out)] group-hover:[&_img]:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100";

// El enlace lleva el título y su ::after cubre la tarjeta entera, así que toda
// ella es clicable sin anidar enlaces.
const LINK_CLASS =
  "underline-offset-4 outline-none after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:underline focus-visible:after:ring-2 focus-visible:after:ring-accent";

/** Imagen protagonista + título + una frase + dato opcional. Sin borde, fondo ni glass. */
export function MediaCard({
  href,
  media,
  title,
  label,
  description,
  datum,
  action,
  className = "",
}: MediaCardProps) {
  return (
    <article className={`group relative flex h-full flex-col gap-4 ${className}`}>
      <div className={MEDIA_CLASS}>{media}</div>

      <div className="flex flex-col gap-2">
        {label && (
          <span className="text-[12px] uppercase tracking-[0.08em] text-muted">{label}</span>
        )}
        <h3 className="font-display text-h3 font-semibold text-foreground">
          <Link href={href} className={LINK_CLASS}>
            {title}
          </Link>
        </h3>
        {description && <p className="text-body text-[var(--text-secondary)]">{description}</p>}
      </div>

      {datum && <p className="mt-auto font-mono text-sm font-semibold text-foreground">{datum}</p>}

      {action && <div className="relative z-10">{action}</div>}
    </article>
  );
}
