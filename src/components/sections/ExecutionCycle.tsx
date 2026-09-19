import { CycleCarousel } from "@/components/ui/CycleCarousel";
import { Section } from "@/components/ui/Section";
import type { HeadingLevel } from "@/components/ui/SectionHeader";
import { EXECUTION_STAGES, SERVICES_DATA } from "@/lib/ciiia";

export function ExecutionCycle({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  return (
    <Section id="ciclo">
      <CycleCarousel
        headingLevel={headingLevel}
        stages={EXECUTION_STAGES}
        services={SERVICES_DATA}
        title="Ciclo de ejecución"
        description="Cada proyecto recorre cinco etapas. Elige una para ver qué se entrega y qué productos intervienen."
      />
    </Section>
  );
}
