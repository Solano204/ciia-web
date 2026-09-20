import { CaseTile } from "@/components/ui/CaseTile";
import { CasesBrowser } from "@/components/ui/CasesBrowser";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { TileRow } from "@/components/ui/TileRow";
import { CTA_COPY, PAGE_DESCRIPTIONS, PROJECT_CASES, TEASER_CASES } from "@/lib/ciiia";
import { robotImage } from "@/lib/robotImage";

/** id → ruta de la imagen, solo de los casos que la tienen (decidido en el build). */
const caseImageSrcs = (): Record<string, string> =>
  Object.fromEntries(
    PROJECT_CASES.flatMap((item) => {
      const src = robotImage(`casos/${item.id}`);
      return src ? [[item.id, src]] : [];
    }),
  );

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
          renderTile={(item) => (
            <CaseTile
              item={item}
              imageSrc={robotImage(`casos/${item.id}`)}
              sizes="(min-width: 768px) 33vw, 78vw"
            />
          )}
        />
      ) : (
        <CasesBrowser imageSrcs={caseImageSrcs()} />
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoria}</CtaButton>
        {teaser && <CtaLink href="/casos">Ver todos los casos</CtaLink>}
      </SectionCta>
    </Section>
  );
}
