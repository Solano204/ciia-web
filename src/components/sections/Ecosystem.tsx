import { Suspense } from "react";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { EcosystemGrid } from "@/components/ui/EcosystemGrid";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, ECOSYSTEM_INTRO, ECOSYSTEM_TEASER } from "@/lib/ciiia";

export function Ecosystem({
  headingLevel = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: 6 logos en fila, con enlace a /ecosistema. */
  teaser?: boolean;
}) {
  return (
    <Section id="ecosistema" className="flex flex-col gap-12">
      <SectionHeader
        animated
        as={headingLevel}
        title="Ecosistema"
        description={ECOSYSTEM_INTRO}
      />

      {teaser ? (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {ECOSYSTEM_TEASER.map((partner, index) => (
            <li key={partner.id}>
              <Reveal index={index}>
                <LogoTile partner={partner} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        // `useSearchParams` obliga a un límite de Suspense; la reserva evita el salto de página.
        <Suspense fallback={<div aria-hidden className="min-h-[60svh]" />}>
          <EcosystemGrid />
        </Suspense>
      )}

      <SectionCta>
        <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
        {teaser && <CtaLink href="/ecosistema">Ver todo el ecosistema</CtaLink>}
      </SectionCta>
    </Section>
  );
}
