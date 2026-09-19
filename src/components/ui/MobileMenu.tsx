"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { CtaButton } from "@/components/ui/Cta";
import { linkState } from "@/lib/nav";
import { CTA_COPY, schedulingHref } from "@/lib/ciiia";

/** Igual que `--dur-base`: lo que tarda en apagarse antes de cerrar el diálogo. */
const CLOSE_MS = 250;

const ICON_BUTTON =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] text-foreground outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-accent";

/**
 * Menú por debajo de `lg`. El <dialog> modal aporta lo difícil: foco atrapado,
 * Esc y fondo inerte. Aquí se añade el bloqueo del scroll, el cierre al navegar
 * y una animación de opacidad y transformación.
 */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  // «Abierto» solo vale para la ruta en la que se abrió: al navegar se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    dialog.showModal();
    closeRef.current?.focus();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    const frame = requestAnimationFrame(() => setShown(true));

    return () => {
      cancelAnimationFrame(frame);
      setShown(false);
      root.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  const requestClose = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpenPath(null);
      return;
    }
    setShown(false);
    window.setTimeout(() => setOpenPath(null), CLOSE_MS);
  }, []);

  // El <dialog> deja escapar el foco a la interfaz del navegador tras el último
  // elemento; aquí se cierra el ciclo para que el foco quede atrapado.
  const trapTab = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenPath(pathname)}
        className={`${ICON_BUTTON} lg:hidden`}
      >
        <ListIcon size={18} weight="bold" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label="Menú principal"
        data-shown={shown ? "" : undefined}
        onKeyDown={trapTab}
        onCancel={(event) => {
          event.preventDefault();
          requestClose();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none translate-y-2 border-0 bg-background p-0 text-foreground opacity-0 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:translate-y-0 motion-reduce:transition-none data-[shown]:translate-y-0 data-[shown]:opacity-100"
      >
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em]">
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent" />
              CII.IA
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label="Cerrar menú"
              onClick={requestClose}
              className={ICON_BUTTON}
            >
              <XIcon size={18} weight="bold" aria-hidden />
            </button>
          </div>

          <nav aria-label="Principal" className="mt-12 flex flex-1 flex-col gap-6">
            {links.map(({ href, label }) => {
              const state = linkState(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={requestClose}
                  aria-current={state === "page" ? "page" : undefined}
                  data-active={state ? "" : undefined}
                  className="w-fit font-display text-h2 font-semibold text-foreground underline-offset-[10px] outline-none focus-visible:ring-2 focus-visible:ring-accent data-[active]:underline data-[active]:decoration-accent"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="pb-6">
            <CtaButton href={schedulingHref()}>{CTA_COPY.agenda}</CtaButton>
          </div>
        </div>
      </dialog>
    </>
  );
}
