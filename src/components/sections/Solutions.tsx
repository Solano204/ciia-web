import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { SolutionRow } from "@/components/ui/SolutionRow";
import { CTA_COPY, PAGE_DESCRIPTIONS, SERVICES_DATA } from "@/lib/ciiia";

export function Solutions({
  headingLevel = "h2",
  limit,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: solo los primeros `limit`, con enlace a /soluciones. */
  limit?: number;
}) {
  const services = limit ? SERVICES_DATA.slice(0, limit) : SERVICES_DATA;

  return (
    <Section id="soluciones" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Soluciones"
        description={PAGE_DESCRIPTIONS.soluciones}
      />

      {limit ? (
        <AnimatedItem>
          <BentoGrid services={services} />
        </AnimatedItem>
      ) : (
        <div>
          {services.map((service, index) => (
            <SolutionRow key={service.id} service={service} reverse={index % 2 === 1} />
          ))}
        </div>
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.asesoria}</CtaButton>
        {limit && <CtaLink href="/soluciones">Ver todas las soluciones</CtaLink>}
      </SectionCta>
    </Section>
  );
}
