"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { CtaButton } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CONTACT_INFO, CTA_COPY, SCHEDULING_URL } from "@/lib/ciiia";

const inputClasses =
  "mt-2 block w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function Contact({ headingLevel = "h2" }: { headingLevel?: HeadingLevel }) {
  const [prepared, setPrepared] = useState(false);
  const nombreId = useId();
  const orgId = useId();
  const correoId = useId();
  const mensajeId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const lines = [
      `Nombre: ${field("nombre")}`,
      `Organización: ${field("organizacion")}`,
      `Correo: ${field("correo")}`,
      "",
      field("mensaje"),
    ];

    const subject = "Contacto desde el sitio";
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setPrepared(true);
  };

  return (
    <Section id="contacto" className="flex flex-col gap-12">
        <SectionHeader
          animated
          as={headingLevel}
          title="Contacto"
          description="Cuéntanos qué necesitas y en qué punto está tu organización."
        />

        <div className="grid gap-12 md:grid-cols-12">
          <AnimatedItem className="md:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={nombreId} className="text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <input id={nombreId} name="nombre" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor={orgId} className="text-sm font-medium text-foreground">
                    Organización
                  </label>
                  <input id={orgId} name="organizacion" required className={inputClasses} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={correoId} className="text-sm font-medium text-foreground">
                    Correo
                  </label>
                  <input
                    id={correoId}
                    name="correo"
                    type="email"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={mensajeId} className="text-sm font-medium text-foreground">
                  Mensaje
                </label>
                <textarea
                  id={mensajeId}
                  name="mensaje"
                  required
                  rows={5}
                  className={`${inputClasses} resize-y`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-background outline-none transition-[filter] duration-200 motion-reduce:transition-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Preparar correo
                </button>
                <p className="mt-3 max-w-[48ch] text-xs text-muted">
                  Se abrirá tu aplicación de correo con el mensaje listo para enviarlo a{" "}
                  {CONTACT_INFO.email}.
                </p>
                {prepared && (
                  <p className="mt-4 max-w-[48ch] border-l-2 border-accent pl-4 text-sm text-zinc-400">
                    Si no se abrió tu correo, escríbenos directamente a{" "}
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-accent underline">
                      {CONTACT_INFO.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </AnimatedItem>

          <AnimatedItem className="md:col-span-4 md:col-start-9">
            {/* Sólo aparece cuando hay agenda configurada: sin URL sería un
                botón que no lleva a ninguna parte. Ver SCHEDULING_URL. */}
            {SCHEDULING_URL && (
              <div className="mb-8 border-t border-[var(--line-strong)] pt-6">
                <h3 className="font-display text-h3 font-semibold text-foreground">
                  ¿Prefieres una reunión?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Elige un horario y hablamos de tu caso.
                </p>
                <CtaButton href={SCHEDULING_URL} className="mt-4">
                  {CTA_COPY.agenda}
                </CtaButton>
              </div>
            )}

            <h3 className="font-display text-h3 font-semibold text-foreground">Contacto directo</h3>
            <dl className="mt-5 flex flex-col divide-y divide-white/8 border-y border-white/8">
              <div className="py-4">
                <dt className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                  Correo
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-foreground underline decoration-white/20 underline-offset-4 hover:text-accent"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                  Teléfono
                </dt>
                <dd className="mt-1">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-sm text-foreground underline decoration-white/20 underline-offset-4 hover:text-accent"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                  Sede
                </dt>
                <dd className="mt-1 text-sm leading-snug text-foreground">
                  {CONTACT_INFO.location}
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                  Redes
                </dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {CONTACT_INFO.social.map((network) => (
                    <a
                      key={network.href}
                      href={network.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground underline decoration-white/20 underline-offset-4 hover:text-accent"
                    >
                      {network.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </AnimatedItem>
        </div>
    </Section>
  );
}
