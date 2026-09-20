import Link from "next/link";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { CONTACT_INFO, MAPS_HREF, NAV_LINKS, PRIVACY_NOTICE_HREF } from "@/lib/ciiia";

const HEADING = "font-sans text-[12px] uppercase tracking-[0.08em] text-muted";
const LINK =
  "font-sans text-[13px] font-medium text-[var(--text-secondary)] outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none";

export function Footer() {
  const buildYear = new Date().getFullYear();

  return (
    <BeamsBackground className="section-seam">
      <footer id="footer" className="px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-12">
          <div className="grid gap-10 md:grid-cols-3">
            <nav aria-label="Navegación del sitio" className="flex flex-col items-start gap-3">
              <h2 className={HEADING}>Navegación</h2>
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={LINK}>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col items-start gap-3">
              <h2 className={HEADING}>Contacto</h2>
              <a href={`mailto:${CONTACT_INFO.email}`} className={LINK}>
                {CONTACT_INFO.email}
              </a>
              <a href={CONTACT_INFO.phoneHref} className={LINK}>
                {CONTACT_INFO.phoneDisplay}
              </a>
              <p className="max-w-[38ch] font-sans text-[13px] leading-relaxed text-[var(--text-secondary)]">
                {CONTACT_INFO.location}
              </p>
              <a href={MAPS_HREF} target="_blank" rel="noreferrer" className={LINK}>
                Cómo llegar
                <span className="sr-only"> (se abre en una ventana nueva)</span>
              </a>
            </div>

            <div className="flex flex-col items-start gap-3">
              <h2 className={HEADING}>Redes</h2>
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
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--line)] pt-6 font-sans text-[12px] uppercase tracking-[0.08em] text-muted md:flex-row md:items-center md:justify-between">
            <p>
              © <CurrentYear buildYear={buildYear} /> CII.IA · Administrado por Monterrey IT Clúster
            </p>
            {PRIVACY_NOTICE_HREF && (
              <a
                href={PRIVACY_NOTICE_HREF}
                className="outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none"
              >
                Aviso de privacidad
              </a>
            )}
          </div>
        </div>
      </footer>
    </BeamsBackground>
  );
}
