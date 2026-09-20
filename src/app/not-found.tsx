import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <Section id="no-encontrada" className="flex min-h-[70vh] flex-col justify-center gap-6">
      <p className="font-mono text-h3 font-semibold text-accent">404</p>
      <h1 className="font-display text-h2 font-semibold text-foreground">
        No encontramos esa página
      </h1>
      <p className="max-w-[48ch] text-body text-[var(--text-secondary)]">
        La dirección no existe o cambió de lugar.
      </p>
      <div>
        <CtaLink href="/">Volver al inicio</CtaLink>
      </div>
    </Section>
  );
}
