import type { ReactNode } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";

/** Nivel del título: h1 en la página propia de la sección, h2 en la home. */
export type HeadingLevel = "h1" | "h2";

type SectionHeaderProps = {
  title: ReactNode;
  /** Una frase. */
  description?: ReactNode;
  /** Revela el bloque al entrar en pantalla, como el resto de cabeceras. */
  animated?: boolean;
  as?: HeadingLevel;
};

const TITLE_CLASS = "font-display text-h2 font-semibold text-foreground";
const DESCRIPTION_CLASS = "text-body text-[var(--text-secondary)]";

/** Título h2 con los tokens de escala y una frase opcional. Sin pastilla. */
export function SectionHeader({
  title,
  description,
  animated = false,
  as: Heading = "h2",
}: SectionHeaderProps) {
  if (animated) {
    return (
      <AnimatedSection className="grid gap-6 md:grid-cols-12">
        <AnimatedItem className="md:col-span-6">
          <Heading className={TITLE_CLASS}>{title}</Heading>
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
        <Heading className={TITLE_CLASS}>{title}</Heading>
      </div>
      {description && (
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <p className={DESCRIPTION_CLASS}>{description}</p>
        </div>
      )}
    </div>
  );
}
