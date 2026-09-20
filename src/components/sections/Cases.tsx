import { CaseTile } from "@/components/ui/CaseTile";
import { CasesBrowser } from "@/components/ui/CasesBrowser";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { TileRow } from "@/components/ui/TileRow";
import { CTA_COPY, PAGE_DESCRIPTIONS, TEASER_CASES } from "@/lib/ciiia";

export function Cases({
  headingLevel = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: 3 casos, sin filtros y con enlace a /casos. */
  teaser?: boolean;
}) {
  return (
    <Section id="casos" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Algunos de nuestros casos"
        description={PAGE_DESCRIPTIONS.casos}
      />

      {teaser ? (
        <TileRow
          items={TEASER_CASES}
          getKey={(item) => item.id}
          renderTile={(item) => <CaseTile item={item} sizes="(min-width: 768px) 33vw, 78vw" />}
        />
      ) : (
        <CasesBrowser />
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoria}</CtaButton>
        {teaser && <CtaLink href="/casos">Ver todos los casos</CtaLink>}
      </SectionCta>
    </Section>
  );
}
