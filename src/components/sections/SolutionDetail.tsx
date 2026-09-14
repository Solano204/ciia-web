import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DecayImage } from "@/components/ui/DecayImage";
import { StageRail } from "@/components/ui/StageRail";
import type { ExecutionStage, ServiceItem } from "@/lib/ciiia";

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
  index,
  stages,
}: {
  service: ServiceItem;
  index: number;
  stages: ExecutionStage[];
}) {
  const serviceNumber = String(index + 1).padStart(2, "0");
  const imageExists = hasLocalImage(service.id);

  return (
    <main className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 py-24 md:px-10">
      <Link
        href={SOLUTIONS_HREF}
        className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-foreground"
      >
        <span aria-hidden>&larr;</span> Soluciones
      </Link>

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {service.category}
          </span>
          <h1 className="font-sans text-[56px] font-semibold uppercase leading-[0.95] tracking-tight text-foreground">
            {service.title}
          </h1>
          {service.previousName && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
              ANTES: {stripAntesPrefix(service.previousName)}
            </p>
          )}
          <p className="text-xl font-semibold text-foreground">{service.tagline}</p>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] p-6 lg:col-span-4 lg:col-start-9">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
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
          <p className="text-[17px] leading-relaxed text-zinc-400">{service.description}</p>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Qué incluye
            </h2>
            <ul className="mt-4 flex flex-col border-t border-white/8">
              {service.points.map((point, pointIndex) => (
                <li key={point} className="flex gap-4 border-b border-white/8 py-3">
                  <span className="font-mono text-accent">
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
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {service.externalLink.label} <span aria-hidden>&#8599;</span>
              <span className="sr-only"> (abre en otra pestaña)</span>
            </a>
          )}

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Componentes
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.technicalSpecs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--card-border)]">
            {imageExists ? (
              <DecayImage src={`/soluciones/${service.id}.jpg`} alt={service.title} />
            ) : (
              <>
                {/* ponytail: no local asset yet at public/soluciones/<id>.jpg —
                    placeholder photo so the decay effect is visible; swap to the
                    real image when it lands. */}
                <DecayImage
                  src={`https://picsum.photos/seed/${service.id}/800/600?grayscale`}
                  alt={service.title}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span
                    aria-hidden
                    className="select-none font-sans text-[140px] font-semibold leading-none text-white/10"
                  >
                    {serviceNumber}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="flex flex-col items-start justify-between gap-6 border-t border-white/8 py-16 sm:flex-row sm:items-center">
        <h2 className="font-sans text-[28px] font-semibold text-foreground">
          ¿Conversamos sobre tu proyecto?
        </h2>
        <Link
          href={CONTACT_HREF}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent-soft"
        >
          Agendar diagnóstico <span aria-hidden>&#8599;</span>
        </Link>
      </div>
    </main>
  );
}
