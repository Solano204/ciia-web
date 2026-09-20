import fs from "node:fs";
import path from "node:path";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { StageDeck } from "@/components/ui/StageDeck";
import { StageRail } from "@/components/ui/StageRail";
import {
  CTA_COPY,
  EXECUTION_STAGES,
  PAGE_DESCRIPTIONS,
  SERVICES_DATA,
  schedulingHref,
} from "@/lib/ciiia";

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
        <StageRail stages={EXECUTION_STAGES} activeStageIds={[]} />
        <SectionCta>
          <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          <CtaLink href="/ciclo">Ver el ciclo completo</CtaLink>
        </SectionCta>
      </Section>
    );
  }

  // Se comprueba aquí, en el build, y no en el navegador: una imagen que no
  // existe ni se pide, así que no hay 404 en la consola.
  const imageIds = EXECUTION_STAGES.filter((stage) =>
    fs.existsSync(path.join(process.cwd(), "public", "ciclo", `${stage.id}.jpg`)),
  ).map((stage) => stage.id);

  return (
    <Section id="ciclo" className="flex flex-col gap-12">
      <SectionHeader as={headingLevel} title={TITLE} description={DESCRIPTION} />
      <StageDeck stages={EXECUTION_STAGES} services={SERVICES_DATA} imageIds={imageIds} />
      <SectionCta>
        <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
      </SectionCta>
    </Section>
  );
}
