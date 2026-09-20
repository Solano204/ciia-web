import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DecayImage } from "@/components/ui/DecayImage";
import { StageRail } from "@/components/ui/StageRail";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/Cta";
import { CTA_COPY, type ExecutionStage, type ServiceItem } from "@/lib/ciiia";

const SOLUTIONS_HREF = "/soluciones";
const CONTACT_HREF = "/contacto";

function hasLocalImage(id: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "soluciones", `${id}.jpg`));
}

// ponytail: some previousName values already start with "Antes:" in the
// source data (e.g. "Antes: AI Training") and some don't (e.g. "Laboratorio
// de prototipado") — strip any existing prefix before adding ours so it
// never doubles up.
function stripAntesPrefix(value: string): string {
  return value.replace(/^antes:\s*/i, "");
}

export function SolutionDetail({
  service,
  stages,
}: {
  service: ServiceItem;
  stages: ExecutionStage[];
}) {
  const imageExists = hasLocalImage(service.id);

  return (
    <Section id="solucion" className="flex flex-col gap-16">
      <Link
        href={SOLUTIONS_HREF}
        className="inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden>&larr;</span> Soluciones
      </Link>

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
            {service.category}
          </span>
          <h1 className="font-display text-h2 font-semibold uppercase text-foreground">
            {service.title}
          </h1>
          {service.previousName && (
            <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
              ANTES: {stripAntesPrefix(service.previousName)}
            </p>
          )}
          <p className="text-xl font-semibold text-foreground">{service.tagline}</p>
        </div>

        <div className="border-t border-[var(--line-strong)] pt-6 lg:col-span-4 lg:col-start-9">
          <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
            Inversión de referencia
          </span>
          <p className="mt-2 text-h3 font-semibold text-accent">
            {service.startingPrice}
          </p>
        </div>
      </div>

      {/* Stage rail */}
      <StageRail stages={stages} activeStageIds={service.stageMapping} />

      {/* Body */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <p className="text-[17px] leading-relaxed text-[var(--text-secondary)]">{service.description}</p>

          <div>
            <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
              Qué incluye
            </h2>
            <ul className="mt-4 flex flex-col border-t border-[var(--line)]">
              {service.points.map((point, pointIndex) => (
                <li key={point} className="flex gap-4 border-b border-[var(--line)] py-3">
                  <span className="font-mono text-muted">
                    {String(pointIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

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

          <div>
            <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
              Componentes
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {service.technicalSpecs.join(" · ")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            {imageExists && <DecayImage src={`/soluciones/${service.id}.jpg`} alt={service.title} />}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="flex flex-col items-start justify-between gap-6 border-t border-[var(--line)] py-16 sm:flex-row sm:items-center">
        <h2 className="font-display text-h3 font-semibold text-foreground">
          ¿Conversamos sobre tu proyecto?
        </h2>
        <CtaButton href={CONTACT_HREF} className="shrink-0">
          {CTA_COPY.asesoria}
        </CtaButton>
      </div>
    </Section>
  );
}
