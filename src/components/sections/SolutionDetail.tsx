import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SolutionTile } from "@/components/ui/SolutionTile";
import { StageRail } from "@/components/ui/StageRail";
import { CTA_COPY, type ExecutionStage, type ServiceItem } from "@/lib/ciiia";

const SOLUTIONS_HREF = "/soluciones";
const CONTACT_HREF = "/contacto";

function hasLocalImage(id: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "soluciones", `${id}.jpg`));
}

/** Bloque editorial: etiqueta a la izquierda, contenido a la derecha, una línea fina arriba. */
function Block({ label, index, children }: { label: string; index: number; children: ReactNode }) {
  return (
    <Reveal index={index}>
      <div className="grid gap-4 border-t border-[var(--line)] py-12 md:grid-cols-12 md:gap-10 md:py-14">
        <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted md:col-span-3">
          {label}
        </h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

export function SolutionDetail({
  service,
  stages,
  related,
}: {
  service: ServiceItem;
  stages: ExecutionStage[];
  related: ServiceItem[];
}) {
  const imageExists = hasLocalImage(service.id);

  return (
    <>
      {/* `id="hero"` hace que el Navbar aplique su degradado sobre la imagen. */}
      <div
        id="hero"
        className="relative h-[70svh] min-h-[440px] max-h-[760px] w-full overflow-hidden bg-white/[0.03]"
      >
        {imageExists && (
          <Image
            src={`/soluciones/${service.id}.jpg`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.55) 40%, transparent 75%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-4 px-6 pb-12 md:px-10 md:pb-16">
            <Link
              href={SOLUTIONS_HREF}
              className="inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-[0.08em] text-foreground/70 transition-colors hover:text-foreground"
            >
              <span aria-hidden>&larr;</span> Soluciones
            </Link>
            <h1 className="font-display text-h2 font-semibold text-foreground">{service.title}</h1>
            <p className="max-w-[48ch] text-xl text-foreground/85">{service.tagline}</p>
          </div>
        </div>
      </div>

      <Section id="solucion" className="flex flex-col">
        <Block label="Qué incluye" index={0}>
          <p className="max-w-[60ch] text-[17px] leading-relaxed text-[var(--text-secondary)]">
            {service.description}
          </p>
          <ul className="mt-8 flex max-w-[80ch] flex-col border-t border-[var(--line)]">
            {service.points.map((point, pointIndex) => (
              <li key={point} className="flex gap-4 border-b border-[var(--line)] py-3">
                <span className="font-mono text-muted">{String(pointIndex + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Etapas del ciclo donde interviene" index={1}>
          <StageRail stages={stages} activeStageIds={service.stageMapping} />
        </Block>

        <Block label="Inversión de referencia" index={2}>
          <p className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight text-accent">
            {service.startingPrice}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaButton href={CONTACT_HREF}>{CTA_COPY.asesoria}</CtaButton>
            {service.externalLink && (
              <a
                href={service.externalLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {service.externalLink.label} <span aria-hidden>&#8599;</span>
                <span className="sr-only"> (abre en otra pestaña)</span>
              </a>
            )}
          </div>
        </Block>
      </Section>

      {related.length > 0 && (
        <Section id="otras-soluciones" className="flex flex-col gap-10">
          <h2 className="font-display text-h2 font-semibold text-foreground">Otras soluciones</h2>
          <ul className="grid gap-8 md:grid-cols-2 md:gap-10">
            {related.map((item, index) => (
              <li key={item.id}>
                <Reveal index={index} className="h-full">
                  <SolutionTile service={item} sizes="(min-width: 768px) 50vw, 100vw" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
