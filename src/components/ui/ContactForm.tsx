"use client";

import { useId, useState, type FormEvent } from "react";
import { CONTACT_INFO } from "@/lib/ciiia";

const inputClasses =
  "mt-2 block w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function ContactForm() {
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
          <input id={correoId} name="correo" type="email" required className={inputClasses} />
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
  );
}
