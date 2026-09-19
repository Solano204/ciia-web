import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { CycleCarousel } from "@/components/ui/CycleCarousel";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { StageRail } from "@/components/ui/StageRail";
import { CTA_COPY, EXECUTION_STAGES, SERVICES_DATA, schedulingHref } from "@/lib/ciiia";

const TITLE = "Ciclo de ejecución";
const DESCRIPTION =
  "Cada proyecto recorre cinco etapas. Elige una para ver qué se entrega y qué productos intervienen.";

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
        <StageRail stages={EXECUTION_STAGES} activeStageIds={[]} />
        <SectionCta>
          <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          <CtaLink href="/ciclo">Ver el ciclo completo</CtaLink>
        </SectionCta>
      </Section>
    );
  }

  return (
    <Section id="ciclo">
      <CycleCarousel
        headingLevel={headingLevel}
        stages={EXECUTION_STAGES}
        services={SERVICES_DATA}
        title={TITLE}
        description={DESCRIPTION}
      />
    </Section>
  );
}
