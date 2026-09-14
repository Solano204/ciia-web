import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ExpandableList, type ExpandableItem } from "@/components/ui/ExpandableList";
import { EXECUTION_STAGES, SERVICES_DATA } from "@/lib/ciiia";

const items: ExpandableItem[] = SERVICES_DATA.map((service) => {
  const stages = EXECUTION_STAGES.filter((stage) => service.stageMapping.includes(stage.id));
  return {
    id: service.id,
    eyebrow: service.badge,
    title: service.title,
    subtitle: service.tagline,
    meta: service.category,
    detail: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed text-foreground">{service.description}</p>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            Qué incluye
          </h4>
          <ul className="mt-3 flex flex-col gap-2 border-t border-white/8">
            {service.points.map((point) => (
              <li key={point} className="border-b border-white/8 py-2.5 text-sm leading-snug">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Inversión de referencia
            </dt>
            <dd className="mt-1 text-sm text-foreground">{service.startingPrice}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Etapas del ciclo
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {stages.map((stage) => stage.name).join(" · ")}
            </dd>
          </div>
        </dl>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            Componentes
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.technicalSpecs.map((spec) => (
              <li
                key={spec}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
              >
                {spec}
              </li>
            ))}
          </ul>
        </div>

        {service.externalLink && (
          <a
            href={service.externalLink.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {service.externalLink.label} ↗
          </a>
        )}
      </div>
    ),
  };
});

export function Solutions() {
  return (
    <section
      id="soluciones"
      className="border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <AnimatedSection className="grid gap-6 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>CII.IA // SOLUCIONES</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-6">
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
              Soluciones
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-zinc-400">
              Cinco líneas de trabajo que cubren el ciclo completo: decidir qué merece
              construirse, probarlo en laboratorio, ponerlo a operar y dejar la capacidad
              instalada en tu organización.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedItem>
          <ExpandableList items={items} />
        </AnimatedItem>
      </div>
    </section>
  );
}
