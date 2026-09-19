import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { CTA_COPY, SERVICES_DATA } from "@/lib/ciiia";

export function Solutions() {
  return (
    <BeamsBackground className="section-seam">
      <section id="soluciones" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
          <AnimatedSection className="grid gap-6 md:grid-cols-12">
            <AnimatedItem className="md:col-span-12">
              <EyebrowBadge tone="muted-v2">CII.IA // SOLUCIONES</EyebrowBadge>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-6">
              <h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">
                Soluciones
              </h2>
            </AnimatedItem>
            <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                Cinco líneas de trabajo que cubren el ciclo completo, de decidir qué merece
                construirse a dejar la capacidad instalada.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedItem>
            <BentoGrid services={SERVICES_DATA} />
          </AnimatedItem>

          <SectionCta>
            <CtaButton href="#contacto">{CTA_COPY.asesoria}</CtaButton>
            <CtaLink href="#ciclo">Ver cómo trabajamos</CtaLink>
          </SectionCta>
        </div>
      </section>
    </BeamsBackground>
  );
}
