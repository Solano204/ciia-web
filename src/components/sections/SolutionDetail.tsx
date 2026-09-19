import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DecayImage } from "@/components/ui/DecayImage";
import { StageRail } from "@/components/ui/StageRail";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CtaButton } from "@/components/ui/Cta";
import { CTA_COPY, type ExecutionStage, type ServiceItem } from "@/lib/ciiia";

// ponytail: these three sections only exist as anchors on the home page
// today, not standalone routes — linking there instead of a 404.
const SOLUTIONS_HREF = "/#soluciones";
const CONTACT_HREF = "/#contacto";

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
    <BeamsBackground className="min-h-screen">
    <main className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 py-24 md:px-10 bg-transparent">
      <Link
        href={SOLUTIONS_HREF}
        className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden>&larr;</span> Soluciones
      </Link>

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {service.category}
          </span>
          <h1 className="font-sans text-[56px] font-semibold uppercase leading-[0.95] tracking-tight text-foreground">
            {service.title}
          </h1>
          {service.previousName && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              ANTES: {stripAntesPrefix(service.previousName)}
            </p>
          )}
          <p className="text-xl font-semibold text-foreground">{service.tagline}</p>
        </div>

        <div className="glass-3-v2 p-6 lg:col-span-4 lg:col-start-9">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Inversión de referencia
          </span>
          <p className="mt-2 text-[22px] font-semibold leading-snug text-accent">
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
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
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
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Componentes
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.technicalSpecs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-[var(--line)] bg-white/[0.04] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--line)]">
            {imageExists && <DecayImage src={`/soluciones/${service.id}.jpg`} alt={service.title} />}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="flex flex-col items-start justify-between gap-6 border-t border-[var(--line)] py-16 sm:flex-row sm:items-center">
        <h2 className="font-sans text-[28px] font-semibold text-foreground">
          ¿Conversamos sobre tu proyecto?
        </h2>
        <CtaButton href={CONTACT_HREF} className="shrink-0">
          {CTA_COPY.asesoria}
        </CtaButton>
      </div>
    </main>
    </BeamsBackground>
  );
}
