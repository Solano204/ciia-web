import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  BRAND_PAIRS,
  CLIENT_QUOTES,
  FOUNDING_PARTNERS,
  INSTITUTIONAL_METRICS,
  MANIFESTO,
} from "@/lib/ciiia";

export function About() {
  return (
    <section
      id="nosotros"
      className="border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-20">
        <AnimatedSection className="grid gap-8 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>{MANIFESTO.eyebrow}</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-7">
            <h2 className="mt-4 max-w-[18ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              {MANIFESTO.problem[0]}
              <br />
              <span className="text-accent">{MANIFESTO.problem[1]}</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:self-end">
            <p className="max-w-[48ch] text-base leading-relaxed text-zinc-400 md:text-lg">
              {MANIFESTO.lead}
            </p>
            <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-zinc-500">
              {MANIFESTO.reto}
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-2 gap-6 border-t border-white/8 pt-12 md:grid-cols-4">
          {INSTITUTIONAL_METRICS.map((metric) => (
            <AnimatedItem key={metric.id} className="flex flex-col gap-2">
              <span className="font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {metric.value}
              </span>
              <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.18em] text-zinc-500">
                {metric.label}
              </span>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection className="grid gap-10 border-t border-white/8 pt-12 md:grid-cols-12">
          <AnimatedItem className="md:col-span-4">
            <h3 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
              Cinco instituciones fundadoras
            </h3>
            <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-zinc-400">
              El centro se inauguró en 2021 dentro del programa federal de Centros de Innovación
              Industrial. Monterrey IT Clúster se encarga de su administración.
            </p>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-8">
            <ul className="flex flex-col divide-y divide-white/8 border-t border-white/8">
              {FOUNDING_PARTNERS.map((partner) => (
                <li key={partner.name} className="flex flex-col gap-1 py-4">
                  <span className="font-sans text-base font-medium text-foreground">
                    {partner.name}
                  </span>
                  <span className="text-sm text-zinc-500">{partner.roleInEcosystem}</span>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="border-t border-white/8 pt-12">
          <AnimatedItem>
            <h3 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
              Cómo trabajamos
            </h3>
          </AnimatedItem>
          <ul className="mt-8 border-t border-white/8">
            {BRAND_PAIRS.map((pair) => (
              <AnimatedItem key={pair.verb1}>
                <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/8 py-4">
                  <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                    {pair.verb1},
                  </span>
                  <span className="text-sm italic text-zinc-400">{pair.verb2}</span>
                </li>
              </AnimatedItem>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="grid gap-10 border-t border-white/8 pt-12 md:grid-cols-2">
          {CLIENT_QUOTES.map((item) => (
            <AnimatedItem key={item.id}>
              <figure className="card-surface p-6">
                <blockquote className="font-sans text-lg italic leading-snug text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-zinc-500">{item.role}</figcaption>
              </figure>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
