import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { CycleScrollRail } from "@/components/ui/CycleScrollRail";
import { EXECUTION_STAGES, SERVICES_DATA } from "@/lib/ciiia";

export function ExecutionCycle() {
  return (
    <section
      id="ciclo"
      className="border-t border-white/5 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <CycleScrollRail
          stages={EXECUTION_STAGES}
          services={SERVICES_DATA}
          eyebrow={<EyebrowBadge>CII.IA // CICLO DE EJECUCIÓN</EyebrowBadge>}
          title="Ciclo de ejecución"
          description="Cada proyecto recorre cinco etapas. Elige una para ver qué se entrega y qué productos intervienen."
        />
      </div>
    </section>
  );
}
