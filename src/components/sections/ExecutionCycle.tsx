import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import Stepper, { Step } from "@/components/ui/Stepper";
import { EXECUTION_STAGES } from "@/lib/ciiia";

export function ExecutionCycle() {
  return (
    <section
      id="ciclo"
      className="border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <AnimatedSection className="grid gap-6 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>CII.IA // CICLO DE EJECUCIÓN</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-6">
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
              Ciclo de ejecución
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-zinc-400">
              Cada proyecto recorre cinco etapas. Elige una para ver qué se entrega y qué
              productos intervienen.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <div className="card-surface p-6 md:p-10">
          <Stepper>
            {EXECUTION_STAGES.map((stage) => (
              <Step key={stage.id}>
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  {stage.number}
                </span>
                <h3 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {stage.name}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.1em] text-zinc-500">
                  {stage.focus}
                </p>
                <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-400">
                  {stage.description}
                </p>

                <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Entregable
                    </dt>
                    <dd className="mt-1 text-sm text-foreground">{stage.deliverable}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                      Productos
                    </dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {stage.products.map((product) => (
                        <span
                          key={product}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
                        >
                          {product}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </section>
  );
}
