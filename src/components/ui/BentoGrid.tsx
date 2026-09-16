import { BentoCard } from "@/components/ui/BentoCard";
import { TiltCard } from "@/components/ui/TiltCard";
import type { ServiceItem } from "@/lib/ciiia";

// ponytail: explicit maps, not `lg:col-span-${n}` — Tailwind only generates
// classes it can see literally in source, so a template string here would
// silently produce no styles.
const COL_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

const ROW_SPAN: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
  4: "lg:row-span-4",
};

export function BentoGrid({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
      {services.map((service, index) => (
        <TiltCard
          key={service.id}
          // En tablet van dos por fila; si el total es impar, la última ocupa
          // el ancho completo para no dejar media fila coja. Sin esto el salto
          // era de una columna directamente a cinco.
          className={`col-span-12 ${
            index === services.length - 1 && services.length % 2 === 1
              ? "md:col-span-12"
              : "md:col-span-6"
          } ${COL_SPAN[service.span.col] ?? ""} ${ROW_SPAN[service.span.row] ?? ""}`}
        >
          <BentoCard service={service} />
        </TiltCard>
      ))}
    </div>
  );
}
