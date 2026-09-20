"use client";

import { useId, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { CONTACT_INFO, CTA_COPY } from "@/lib/ciiia";

type FieldName = "nombre" | "organizacion" | "correo" | "mensaje";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const FIELD_NAMES: FieldName[] = ["nombre", "organizacion", "correo", "mensaje"];
const EMPTY_VALUES: Values = { nombre: "", organizacion: "", correo: "", mensaje: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES: Record<FieldName, string> = {
  nombre: "Escribe tu nombre.",
  organizacion: "Escribe el nombre de tu organización.",
  correo: "Escribe un correo válido, p. ej. nombre@empresa.com",
  mensaje: "Cuéntanos brevemente qué necesitas.",
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.nombre.trim()) errors.nombre = MESSAGES.nombre;
  if (!values.organizacion.trim()) errors.organizacion = MESSAGES.organizacion;
  if (!EMAIL.test(values.correo.trim())) errors.correo = MESSAGES.correo;
  if (!values.mensaje.trim()) errors.mensaje = MESSAGES.mensaje;
  return errors;
}

// Fundido de 150 ms (`--dur-micro`) al aparecer un error o el aviso de éxito.
const FADE = "animate-[eco-fade_var(--dur-micro)_var(--ease-out)] motion-reduce:animate-none";

// El borde es el affordance del campo (excepción documentada en DESIGN.md). El
// foco siempre es dorado y visible; el error cambia solo el borde.
const INPUT =
  "mt-2 block w-full rounded-lg border bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors duration-[var(--dur-micro)] hover:border-white/30 focus:border-accent focus:ring-2 focus:ring-accent motion-reduce:transition-none";

type FieldProps = {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  type?: "text" | "email";
  multiline?: boolean;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function Field({
  name,
  label,
  value,
  error,
  autoComplete,
  type = "text",
  multiline = false,
  className,
  onChange,
  onBlur,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const props = {
    id,
    name,
    value,
    autoComplete,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange,
    onBlur,
    className: `${INPUT} ${error ? "border-[var(--danger)]" : "border-[var(--line-stronger)]"}`,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea {...props} rows={5} className={`${props.className} resize-y`} />
      ) : (
        <input {...props} type={type} />
      )}
      {error && (
        <p id={errorId} className={`mt-2 text-sm text-[var(--danger)] ${FADE}`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sent, setSent] = useState(false);

  const errors = validate(values);
  const visibleError = (name: FieldName) => (touched[name] ? errors[name] : undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Un mensaje enviado deja de valer en cuanto se edita el formulario.
    setSent(false);
  };

  // Validación al salir del campo: el error no aparece mientras se escribe.
  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ nombre: true, organizacion: true, correo: true, mensaje: true });

    const firstInvalid = FIELD_NAMES.find((name) => errors[name]);
    if (firstInvalid) {
      const element = event.currentTarget.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    const body = [
      `Nombre: ${values.nombre.trim()}`,
      `Organización: ${values.organizacion.trim()}`,
      `Correo: ${values.correo.trim()}`,
      "",
      values.mensaje.trim(),
    ].join("\n");
    const subject = "Contacto desde el sitio";

    window.location.assign(
      `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  const shared = { onChange: handleChange, onBlur: handleBlur };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="nombre"
          label="Nombre"
          value={values.nombre}
          error={visibleError("nombre")}
          autoComplete="name"
          {...shared}
        />
        <Field
          name="organizacion"
          label="Organización"
          value={values.organizacion}
          error={visibleError("organizacion")}
          autoComplete="organization"
          {...shared}
        />
        <Field
          name="correo"
          label="Correo"
          type="email"
          value={values.correo}
          error={visibleError("correo")}
          autoComplete="email"
          className="sm:col-span-2"
          {...shared}
        />
      </div>

      <Field
        name="mensaje"
        label="Mensaje"
        multiline
        value={values.mensaje}
        error={visibleError("mensaje")}
        autoComplete="off"
        {...shared}
      />

      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-background outline-none transition-[filter] duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          {CTA_COPY.contacto}
        </button>
        <p className="mt-3 max-w-[48ch] text-xs text-muted">
          Se abrirá tu aplicación de correo con el mensaje listo.
        </p>

        <div role="status" className="mt-4">
          {sent && (
            <div
              className={`max-w-[48ch] border-l-2 border-[var(--success)] pl-4 text-sm leading-relaxed text-foreground ${FADE}`}
            >
              <p>Listo: abrimos tu aplicación de correo con el mensaje. Solo falta enviarlo desde ahí.</p>
              <p className="mt-2 text-[var(--text-secondary)]">
                Si no se abrió, escríbenos a{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-foreground underline decoration-white/30 underline-offset-4 hover:text-accent"
                >
                  {CONTACT_INFO.email}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
