import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, SERVICES_DATA } from "@/lib/ciiia";

export function Solutions({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  return (
    <Section id="soluciones" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Soluciones"
        description="Cinco líneas de trabajo que cubren el ciclo completo, de decidir qué merece construirse a dejar la capacidad instalada."
      />

      <AnimatedItem>
        <BentoGrid services={SERVICES_DATA} />
      </AnimatedItem>

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoria}</CtaButton>
        <CtaLink href="/ciclo">Ver cómo trabajamos</CtaLink>
      </SectionCta>
    </Section>
  );
}
