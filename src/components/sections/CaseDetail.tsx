import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { DecayImage } from "@/components/ui/DecayImage";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { technologyLabel } from "@/lib/cases";
import { CtaButton } from "@/components/ui/Cta";
import { CTA_COPY, type ProjectCase } from "@/lib/ciiia";

// ponytail: "/casos" and "/contacto" only exist as home-page anchors today,
// not standalone routes — linking there instead of a 404.
const CASES_HREF = "/#casos";
const CONTACT_HREF = "/#contacto";

function hasLocalImage(id: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "casos", `${id}.jpg`));
}

const STORY_BLOCKS = [
  { key: "challenge", eyebrow: "El reto", heading: "El reto" },
  { key: "approach", eyebrow: "El enfoque", heading: "El enfoque" },
  { key: "outcome", eyebrow: "El resultado", heading: "El resultado" },
] as const;

export function CaseDetail({
  item,
  prev,
  next,
}: {
  item: ProjectCase;
  prev: ProjectCase;
  next: ProjectCase;
}) {
  const imageExists = hasLocalImage(item.id);
  const techLabel = technologyLabel(item.technology);
  // ponytail: technology's friendly label often appears verbatim as one of
  // the tags (e.g. "Visión por computadora") — don't show it twice in the
  // compact metadata strip. The full tag list below stays untouched.
  const strippedTags = item.tags.filter((tag) => tag !== techLabel);
  const etiquetasValue = strippedTags.length > 0 ? strippedTags.join(" · ") : techLabel;

  return (
    <BeamsBackground className="min-h-screen">
    <main className="flex flex-col gap-16 py-24">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-6 md:px-10">
        <Link
          href={CASES_HREF}
          className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden>&larr;</span> Casos
        </Link>

        {/* Hero */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {item.sector}
          </span>
          <h1 className="font-sans text-[64px] font-semibold leading-[0.95] tracking-tight text-foreground">
            {item.title}
          </h1>
        </div>

        {/* Visual panel with overlaid metric */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)]">
          {imageExists && <DecayImage src={`/casos/${item.id}.jpg`} alt={item.title} />}
          <div className="absolute inset-x-0 bottom-0 flex justify-start p-0">
            <div className="glass-3-v2 px-6 py-6 sm:px-8 sm:py-8">
              <span className="block font-sans text-5xl font-semibold leading-none text-foreground md:text-[72px]">
                {item.metricHighlight}
              </span>
              <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {item.metricLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Body: reto / enfoque / resultado */}
        <div className="mx-auto flex w-full max-w-[800px] flex-col">
          {STORY_BLOCKS.map((block, index) => (
            <div
              key={block.key}
              className={`flex flex-col gap-4 py-12 ${index > 0 ? "border-t border-[var(--line)]" : ""}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {block.eyebrow}
              </span>
              <h2 className="text-2xl font-semibold text-foreground">{block.heading}</h2>
              <p className="text-[17px] leading-relaxed text-[var(--text-secondary)]">{item[block.key]}</p>
            </div>
          ))}
        </div>

        {/* Metadata strip */}
        <dl className="grid grid-cols-2 gap-8 border-y border-[var(--line)] py-8 md:grid-cols-4">
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Sector
            </dt>
            <dd className="mt-2 text-sm text-foreground">{item.sector}</dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Tecnología
            </dt>
            <dd className="mt-2 text-sm text-foreground">{techLabel}</dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Resultado clave
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {item.metricHighlight} · {item.metricLabel}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Etiquetas
            </dt>
            <dd className="mt-2 text-sm text-foreground">{etiquetasValue}</dd>
          </div>
        </dl>

        {/* Tags */}
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Tags
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] bg-white/[0.04] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-[var(--line)] py-16 sm:flex-row sm:items-center">
          <h2 className="font-sans text-[28px] font-semibold text-foreground">
            ¿Tienes un reto parecido?
          </h2>
          <CtaButton href={CONTACT_HREF} className="shrink-0">
            {CTA_COPY.asesoriaCaso}
          </CtaButton>
        </div>

        {/* Prev / next */}
        <nav aria-label="Otros casos" className="grid gap-8 border-t border-[var(--line)] pt-12 sm:grid-cols-2">
          <Link href={`/casos/${prev.id}`} className="group flex flex-col gap-2">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span aria-hidden>&larr;</span> Caso anterior
            </span>
            <span className="text-base text-foreground transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/casos/${next.id}`}
            className="group flex flex-col items-end gap-2 text-right"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Caso siguiente <span aria-hidden>&rarr;</span>
            </span>
            <span className="text-base text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>
    </main>
    </BeamsBackground>
  );
}
