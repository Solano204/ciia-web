import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ALL_PARTNERS, ECOSYSTEM_GROUPS } from "@/lib/ciiia";

export function Ecosystem() {
  return (
    <section
      id="ecosistema"
      className="border-t border-white/5 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <AnimatedSection className="grid gap-6 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>CII.IA // ECOSISTEMA</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-6">
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
              Ecosistema
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-zinc-400">
              Más de 50 organizaciones de tecnología, academia, gobierno e industria forman
              parte del ecosistema del CII.IA.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="flex flex-col gap-10">
          {ECOSYSTEM_GROUPS.map((group) => {
            const members = ALL_PARTNERS.filter(
              (partner) => partner.category === group.category && !partner.isFoundingPartner,
            );
            return (
              <AnimatedItem
                key={group.category}
                className="grid gap-4 border-t border-white/8 pt-6 md:grid-cols-12"
              >
                <h3 className="font-sans text-lg font-semibold text-foreground md:col-span-3">
                  {group.title}
                </h3>
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-9 md:grid-cols-3">
                  {members.map((partner) => (
                    <li key={partner.name}>
                      <span className="block text-sm font-medium leading-snug text-foreground">
                        {partner.name}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500">
                        {partner.roleInEcosystem}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
