import Image from "next/image";
import { BlurText } from "@/components/ui/BlurText";
import { CountingValue } from "@/components/ui/CountingValue";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { FoundingPartners } from "@/components/ui/FoundingPartners";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HeadingLevel } from "@/components/ui/SectionHeader";
import { WorkPrinciples } from "@/components/ui/WorkPrinciples";
import { ABOUT_DATA, CTA_COPY } from "@/lib/ciiia";

function Stats() {
  return (
    <ul className="grid gap-12 md:grid-cols-3">
      {ABOUT_DATA.stats.map((stat, index) => (
        <li key={stat.id}>
          <Reveal index={index} className="flex flex-col gap-3">
            <CountingValue
              value={stat.value}
              animate={!stat.isDate}
              className="font-display text-display font-semibold leading-none text-foreground tabular-nums"
            />
            <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
              {stat.label}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function About({
  headingLevel: Heading = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: titular y foto, con enlace a /nosotros. */
  teaser?: boolean;
}) {
  return (
    <>
      <Section id="nosotros" className="flex flex-col gap-8">
        <Heading className="font-display text-h2 font-semibold text-foreground">
          {ABOUT_DATA.headlineLines.map((line, index) => (
            <BlurText key={line} as="span" text={line} delay={80} initialDelay={index * 180} />
          ))}
        </Heading>
        <Reveal>
          <p className="max-w-[80ch] text-[19px] leading-snug text-foreground">
            {ABOUT_DATA.leadParagraph}
          </p>
        </Reveal>
      </Section>

      <figure>
        <Reveal>
          <div className="relative h-[60svh] min-h-[320px] max-h-[720px] w-full overflow-hidden bg-white/[0.03]">
            <Image
              src={ABOUT_DATA.labImageSrc}
              alt={ABOUT_DATA.labImageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <figcaption className="px-6 pt-5 text-sm text-zinc-400 md:px-10">
          <span className="mx-auto block max-w-[var(--container-max)]">{ABOUT_DATA.labCaption}</span>
        </figcaption>
      </figure>

      {teaser ? (
        <Section id="nosotros-cierre" className="flex flex-col">
          <SectionCta>
            <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
            <CtaLink href="/nosotros">Conocer al CII.IA</CtaLink>
          </SectionCta>
        </Section>
      ) : (
        <Section id="cifras" className="flex flex-col gap-16">
          <Stats />
          <FoundingPartners />
          <WorkPrinciples />
          <SectionCta>
            <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
          </SectionCta>
        </Section>
      )}
    </>
  );
}
