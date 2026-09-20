import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { SolutionRow } from "@/components/ui/SolutionRow";
import { SolutionTile } from "@/components/ui/SolutionTile";
import { CTA_COPY, PAGE_DESCRIPTIONS, SERVICES_DATA, type ServiceItem } from "@/lib/ciiia";

// En móvil, carrusel con snap que sangra a los bordes de la pantalla (el único
// scroll horizontal permitido); desde md, tres columnas.
function SolutionTiles({ services }: { services: ServiceItem[] }) {
  return (
    <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-2[scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {services.map((service, index) => (
        <li key={service.id} className="w-[78%] shrink-0 snap-start md:w-auto">
          <Reveal index={index} className="h-full">
            <SolutionTile service={service} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

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
        <SolutionTiles services={services} />
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
