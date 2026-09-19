import type { ReactNode } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

type SectionHeaderProps = {
  title: ReactNode;
  /** Una frase. */
  description?: ReactNode;
  /** Revela el bloque al entrar en pantalla, como el resto de cabeceras. */
  animated?: boolean;
};

const TITLE_CLASS = "font-display text-h2 font-semibold text-foreground";
const DESCRIPTION_CLASS = "text-body text-[var(--text-secondary)]";

/** Título h2 con los tokens de escala y una frase opcional. Sin pastilla. */
export function SectionHeader({ title, description, animated = false }: SectionHeaderProps) {
  if (animated) {
    return (
      <AnimatedSection className="grid gap-6 md:grid-cols-12">
        <AnimatedItem className="md:col-span-6">
          <h2 className={TITLE_CLASS}>{title}</h2>
        </AnimatedItem>
        {description && (
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className={DESCRIPTION_CLASS}>{description}</p>
          </AnimatedItem>
        )}
      </AnimatedSection>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-6">
        <h2 className={TITLE_CLASS}>{title}</h2>
      </div>
      {description && (
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <p className={DESCRIPTION_CLASS}>{description}</p>
        </div>
      )}
    </div>
  );
}
