import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseTile } from "@/components/ui/CaseTile";
import { CtaButton, SectionCta } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { technologyLabel } from "@/lib/cases";
import { CTA_COPY, caseImageSrc, caseResults, type ProjectCase } from "@/lib/ciiia";

const CASES_HREF = "/casos";
const CONTACT_HREF = "/contacto";

/** Fila editorial: etiqueta a la izquierda, texto a la derecha, una línea fina arriba. */
function Line({ label, index, children }: { label: string; index: number; children: ReactNode }) {
  return (
    <Reveal index={index}>
      <div className="grid gap-3 border-t border-[var(--line)] py-8 md:grid-cols-12 md:gap-10">
        <h2 className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted md:col-span-3">
          {label}
        </h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </Reveal>
  );
}

const STORY_LINES = [
  { key: "challenge", label: "Reto" },
  { key: "approach", label: "Enfoque" },
  { key: "outcome", label: "Resultado" },
] as const;

export function CaseDetail({ item, related }: { item: ProjectCase; related: ProjectCase[] }) {
  const results = caseResults(item);

  return (
    <>
      {/* `id="hero"` hace que el Navbar aplique su degradado sobre la imagen. */}
      <div
        id="hero"
        className="relative h-[70svh] min-h-[440px] max-h-[760px] w-full overflow-hidden bg-white/[0.03]"
      >
        <Image
          src={caseImageSrc(item.id)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
              href={CASES_HREF}
              className="inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-[0.08em] text-foreground/70 transition-colors hover:text-foreground"
            >
              <span aria-hidden>&larr;</span> Casos
            </Link>
            <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-foreground/70">
              {item.sector} &middot; {technologyLabel(item.technology)}
            </span>
            <h1 className="font-display text-h2 font-semibold text-foreground">{item.title}</h1>
          </div>
        </div>
      </div>

      <Section id="caso" className="flex flex-col">
        <div className="flex flex-col">
          {STORY_LINES.map((line, index) => (
            <Line key={line.key} label={line.label} index={index}>
              {/* Con cifras destacadas, ellas son el resultado: el texto de
                  `outcome` las repite y no se muestra. */}
              {line.key === "outcome" && results.length > 0 ? (
                <ul className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
                  {results.map((result) => (
                    <li key={result.label} className="flex flex-col gap-2">
                      <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none text-foreground">
                        {result.value}
                      </span>
                      <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                        {result.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-[70ch] text-[17px] leading-relaxed text-[var(--text-secondary)]">
                  {item[line.key]}
                </p>
              )}
            </Line>
          ))}
          <Line label="Tags" index={STORY_LINES.length}>
            <p className="text-[15px] text-[var(--text-secondary)]">{item.tags.join(" · ")}</p>
          </Line>
          <SectionCta>
            <CtaButton href={CONTACT_HREF}>{CTA_COPY.asesoriaCaso}</CtaButton>
          </SectionCta>
        </div>
      </Section>

      {related.length > 0 && (
        <Section id="casos-relacionados" className="flex flex-col gap-10">
          <h2 className="font-display text-h2 font-semibold text-foreground">Casos relacionados</h2>
          <ul className="grid gap-8 md:grid-cols-2 md:gap-10">
            {related.map((relatedItem, index) => (
              <li key={relatedItem.id}>
                <Reveal index={index} className="h-full">
                  <CaseTile item={relatedItem} sizes="(min-width: 768px) 50vw, 100vw" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
