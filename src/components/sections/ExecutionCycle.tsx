import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { StageDeck } from "@/components/ui/StageDeck";
import { StageLinks } from "@/components/ui/StageLinks";
import {
  CTA_COPY,
  EXECUTION_STAGES,
  PAGE_DESCRIPTIONS,
  SERVICES_DATA,
  schedulingHref,
} from "@/lib/ciiia";
import { robotImage } from "@/lib/robotImage";

const TITLE = "Ciclo de ejecución";
const DESCRIPTION = PAGE_DESCRIPTIONS.ciclo;

export function ExecutionCycle({
  headingLevel = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: las cinco etapas en una fila, con enlace a /ciclo. */
  teaser?: boolean;
}) {
  if (teaser) {
    return (
      <Section id="ciclo" className="flex flex-col gap-12">
        <SectionHeader as={headingLevel} title={TITLE} description={DESCRIPTION} />
        <StageLinks stages={EXECUTION_STAGES} />
        <SectionCta>
          <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          <CtaLink href="/ciclo">Ver el ciclo completo</CtaLink>
        </SectionCta>
      </Section>
    );
  }

  // Se decide aquí, en el build (WebP, si no JPG), y no en el navegador: una
  // imagen que no existe ni se pide, así que no hay 404 en la consola.
  const imageSrcs = Object.fromEntries(
    EXECUTION_STAGES.flatMap((stage) => {
      const src = robotImage(`ciclo/${stage.id}`);
      return src ? [[stage.id, src]] : [];
    }),
  );

  const services = SERVICES_DATA.map(({ id, title, stageMapping }) => ({ id, title, stageMapping }));

  return (
    <Section id="ciclo" className="flex flex-col gap-12">
      <SectionHeader as={headingLevel} title={TITLE} description={DESCRIPTION} />
      <StageDeck stages={EXECUTION_STAGES} services={services} imageSrcs={imageSrcs} />
      <SectionCta>
        <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
      </SectionCta>
    </Section>
  );
}
