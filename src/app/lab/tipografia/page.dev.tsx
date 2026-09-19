import type { CSSProperties, ReactNode } from "react";
import localFont from "next/font/local";
import { BentoCard } from "@/components/ui/BentoCard";
import { CtaButton, CtaLink } from "@/components/ui/Cta";
import { CTA_COPY, MANIFESTO, SERVICES_DATA, schedulingHref } from "@/lib/ciiia";

const cabinetGrotesk = localFont({
  src: "../../../fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 900",
  display: "swap",
});

const generalSans = localFont({
  src: "../../../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general",
  weight: "200 700",
  display: "swap",
});

const OPTION_B_STYLE = {
  "--font-clash": "var(--font-cabinet)",
  "--font-satoshi": "var(--font-general)",
} as CSSProperties;

const SCALE = [
  { token: "display", className: "font-display text-display font-semibold", sample: "De la idea a la operación" },
  { token: "h2", className: "font-display text-h2 font-semibold", sample: "Ciclo de ejecución" },
  { token: "h3", className: "font-display text-h3 font-semibold", sample: "Convertimos estrategia en soluciones" },
  { token: "body", className: "text-body", sample: "Acompañamos a empresas e instituciones de la idea a la operación." },
  { token: "small", className: "text-small text-muted", sample: "Parque de Investigación e Innovación Tecnológica, Apodaca" },
];

function Option({
  title,
  fonts,
  className = "",
  style,
}: {
  title: string;
  fonts: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={`border-t border-[var(--line-strong)] py-16 ${className}`} style={style}>
      <header className="mb-10">
        <h2 className="text-h3 font-semibold text-foreground">{title}</h2>
        <p className="text-small text-muted">{fonts}</p>
      </header>

      <div className="flex flex-col items-start gap-5">
        <span className="text-small font-semibold uppercase tracking-[0.08em] text-accent">
          {MANIFESTO.eyebrow}
        </span>
        <h1 className="max-w-[16ch] font-display text-display font-semibold text-foreground">
          {MANIFESTO.problem[0]} <span className="text-accent">{MANIFESTO.problem[1]}</span>
        </h1>
        <p className="max-w-[56ch] text-body text-[var(--text-secondary)]">{MANIFESTO.lead}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          <CtaLink href="/soluciones">Ver soluciones</CtaLink>
        </div>
      </div>

      <div className="mt-16 max-w-[560px]">
        <BentoCard service={SERVICES_DATA[0]} />
      </div>

      <dl className="mt-16 flex flex-col gap-6">
        {SCALE.map(({ token, className: scaleClass, sample }) => (
          <div key={token} className="grid gap-2 md:grid-cols-[6rem_1fr] md:items-baseline">
            <dt className="text-small text-muted">{token}</dt>
            <dd className={`${scaleClass} text-foreground`}>{sample}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Page({ children }: { children: ReactNode }) {
  return <main className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10">{children}</main>;
}

export default function LabTipografiaPage() {
  return (
    <Page>
      <header className="mb-12">
        <p className="text-small text-muted">Solo desarrollo. No se publica.</p>
        <h1 className="font-display text-h2 font-semibold text-foreground">Tipografía: elige una opción</h1>
      </header>

      <Option title="Opción A" fonts="Clash Display (títulos) + Satoshi (texto)" />
      <Option
        title="Opción B"
        fonts="Cabinet Grotesk (títulos) + General Sans (texto)"
        className={`${cabinetGrotesk.variable} ${generalSans.variable}`}
        style={OPTION_B_STYLE}
      />
    </Page>
  );
}
