import { Suspense } from "react";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { EcosystemGrid, EcosystemLogos } from "@/components/ui/EcosystemGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, ECOSYSTEM_INTRO } from "@/lib/ciiia";

export function Ecosystem({
  headingLevel = "h2",
  limit,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: solo los primeros `limit` logos, con enlace a /ecosistema. */
  limit?: number;
}) {
  return (
    <Section id="ecosistema" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Ecosistema"
        description={ECOSYSTEM_INTRO}
      />

      {limit ? (
        <EcosystemLogos limit={limit} />
      ) : (
        // `useSearchParams` obliga a un límite de Suspense; la reserva evita el salto de página.
        <Suspense fallback={<div aria-hidden className="min-h-[60svh]" />}>
          <EcosystemGrid />
        </Suspense>
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
        {limit && <CtaLink href="/ecosistema">Ver todo el ecosistema</CtaLink>}
      </SectionCta>
    </Section>
  );
}
