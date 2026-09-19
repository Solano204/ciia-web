import type { ReactNode, Ref } from "react";
import { BeamsBackground } from "@/components/ui/BeamsBackground";

type SectionProps = {
  id: string;
  children: ReactNode;
  /** Clases del contenedor interior: columna, gap. */
  className?: string;
  ref?: Ref<HTMLElement>;
};

/** Sección de página: fondo, padding vertical (`--section-y`) y ancho máximo (`--container-max`). */
export function Section({ id, children, className = "", ref }: SectionProps) {
  return (
    <BeamsBackground className="section-seam">
      <section ref={ref} id={id} className="px-6 py-[var(--section-y)] md:px-10">
        <div className={`mx-auto max-w-[var(--container-max)] ${className}`}>{children}</div>
      </section>
    </BeamsBackground>
  );
}
