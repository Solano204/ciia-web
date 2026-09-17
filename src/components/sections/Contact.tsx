"use client";

import { useId, useState, type FormEvent } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CONTACT_INFO } from "@/lib/ciiia";

const inputClasses =
  "mt-2 block w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function Contact() {
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
    <BeamsBackground className="section-seam">
    <section
      id="contacto"
      className="px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
        <AnimatedSection className="grid gap-6 md:grid-cols-12">
          <AnimatedItem className="md:col-span-12">
            <EyebrowBadge>CII.IA // CONTACTO</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-6">
            <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
              Contacto
            </h2>
          </AnimatedItem>
          <AnimatedItem className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-zinc-400">
              Cuéntanos qué necesitas y en qué punto está tu organización.
            </p>
          </AnimatedItem>
        </AnimatedSection>

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
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-white/[0.1]"
                >
                  Preparar correo
                </button>
                <p className="mt-3 max-w-[48ch] text-xs text-[var(--text-muted-v2)]">
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
            <h3 className="font-sans text-lg font-semibold text-foreground">Contacto directo</h3>
            <dl className="mt-5 flex flex-col divide-y divide-white/8 border-y border-white/8">
              <div className="py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
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
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
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
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
                  Sede
                </dt>
                <dd className="mt-1 text-sm leading-snug text-foreground">
                  {CONTACT_INFO.location}
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
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
      </div>
    </section>
    </BeamsBackground>
  );
}
