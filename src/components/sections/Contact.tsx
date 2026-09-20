import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";
import { CtaButton } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader, type HeadingLevel } from "@/components/ui/SectionHeader";
import { CONTACT_INFO, CTA_COPY, MAPS_HREF, PAGE_DESCRIPTIONS, SCHEDULING_URL } from "@/lib/ciiia";

const TITLE = "Contacto";
const DESCRIPTION = PAGE_DESCRIPTIONS.contacto;

const LINK =
  "text-sm text-foreground underline decoration-white/20 underline-offset-4 outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none";
const LABEL = "font-sans text-[12px] uppercase tracking-[0.08em] text-muted";

const IMAGE_FILE = "contacto.jpg";

/** Decidido en el build: sin el archivo, la banda usa el degradado y no hay 404. */
function hasContactImage(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", IMAGE_FILE));
}

/**
 * Banda superior. `id="hero"` hace que el Navbar aplique su degradado sobre
 * ella. Sin imagen, mismo fallback que el Ciclo: degradado oscuro con un brillo
 * dorado tenue.
 */
function ContactBand() {
  return (
    <div
      id="hero"
      className="relative h-[36svh] min-h-[240px] max-h-[420px] w-full overflow-hidden bg-background"
    >
      {hasContactImage() ? (
        <Image src={`/${IMAGE_FILE}`} alt="" fill priority sizes="100vw" className="object-cover" />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 45%, rgba(212,162,47,0.1), transparent 70%), linear-gradient(135deg, var(--gray-900), var(--gray-950))",
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 45%)" }}
      />
    </div>
  );
}

export function Contact({
  headingLevel: Heading = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Cierre de la home: solo el encabezado y un CTA hacia /contacto. */
  teaser?: boolean;
}) {
  if (teaser) {
    return (
      <Section id="contacto" className="flex flex-col gap-8">
        <SectionHeader animated as={Heading} title={TITLE} description={DESCRIPTION} />
        <div>
          <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
        </div>
      </Section>
    );
  }

  return (
    <>
      <ContactBand />
      <Section id="contacto" className="grid gap-16 md:grid-cols-12">
      <Reveal className="md:col-span-7">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Heading className="font-display text-h2 font-semibold text-foreground">{TITLE}</Heading>
            <p className="max-w-[48ch] text-body text-[var(--text-secondary)]">{DESCRIPTION}</p>
          </div>
          <ContactForm />
        </div>
      </Reveal>

      <Reveal index={1} className="md:col-span-4 md:col-start-9">
        {/* Solo aparece cuando hay agenda configurada: sin URL sería un botón
            que no lleva a ninguna parte. Ver SCHEDULING_URL. */}
        {SCHEDULING_URL && (
          <div className="mb-8 border-t border-[var(--line-strong)] pt-6">
            <h2 className="font-display text-h3 font-semibold text-foreground">
              ¿Prefieres una reunión?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Elige un horario y hablamos de tu caso.
            </p>
            <CtaButton href={SCHEDULING_URL} className="mt-4">
              {CTA_COPY.agenda}
            </CtaButton>
          </div>
        )}

        <h2 className="font-display text-h3 font-semibold text-foreground">Contacto directo</h2>
        <dl className="mt-5 flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <div className="py-4">
            <dt className={LABEL}>Correo</dt>
            <dd className="mt-1">
              <a href={`mailto:${CONTACT_INFO.email}`} className={LINK}>
                {CONTACT_INFO.email}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className={LABEL}>Teléfono</dt>
            <dd className="mt-1">
              <a href={CONTACT_INFO.phoneHref} className={LINK}>
                {CONTACT_INFO.phoneDisplay}
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className={LABEL}>Sede</dt>
            <dd className="mt-1 flex flex-col items-start gap-2">
              <span className="text-sm leading-snug text-foreground">{CONTACT_INFO.location}</span>
              <a href={MAPS_HREF} target="_blank" rel="noreferrer" className={LINK}>
                Cómo llegar
                <span className="sr-only"> (se abre en una ventana nueva)</span>
              </a>
            </dd>
          </div>
          <div className="py-4">
            <dt className={LABEL}>Redes</dt>
            <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {CONTACT_INFO.social.map((network) => (
                <a
                  key={network.href}
                  href={network.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {network.label}
                  <span className="sr-only"> (se abre en una ventana nueva)</span>
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </Reveal>
      </Section>
    </>
  );
}
