import { CaseTile } from "@/components/ui/CaseTile";
import { CasesBrowser } from "@/components/ui/CasesBrowser";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, PAGE_DESCRIPTIONS, PROJECT_CASES } from "@/lib/ciiia";

export function Cases({
  headingLevel = "h2",
  limit,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: solo los primeros `limit`, sin filtros y con enlace a /casos. */
  limit?: number;
}) {
  return (
    <Section id="casos" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Algunos de nuestros casos"
        description={PAGE_DESCRIPTIONS.casos}
      />

      {limit ? (
        <ul className="grid gap-8 md:grid-cols-3">
          {PROJECT_CASES.slice(0, limit).map((item) => (
            <li key={item.id}>
              <CaseTile item={item} sizes="(min-width: 768px) 33vw, 100vw" />
            </li>
          ))}
        </ul>
      ) : (
        <CasesBrowser />
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoria}</CtaButton>
        {limit && <CtaLink href="/casos">Ver todos los casos</CtaLink>}
      </SectionCta>
    </Section>
  );
}
