"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlurText } from "@/components/ui/BlurText";
import { useCountUp } from "@/hooks/useCountUp";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import {
  ABOUT_DATA,
  CLIENT_QUOTES,
  type AboutFoundingPartner,
  type WorkPrinciple,
} from "@/lib/ciiia";

gsap.registerPlugin(ScrollTrigger);

/** Radio de `rounded-xl`, necesario para que el wipe no cuadre las esquinas. */
const FRAME_RADIUS = "12px";

/** "12" → 12 + ""; "50+" → 50 + "+"; "5%" → 5 + "%". */
const COUNTABLE_VALUE = /^(\d+)(\D*)$/;

type CountingValueProps = {
  value: string;
  animate: boolean;
  className?: string;
  /** Gancho `data-fx` para las tweens de GSAP. */
  fx?: string;
};

function CountingValue({ value, animate, className, fx }: CountingValueProps) {
  const parsed = COUNTABLE_VALUE.exec(value);
  const target = parsed ? Number(parsed[1]) : 0;
  const suffix = parsed ? parsed[2] : "";
  const shouldCount = animate && parsed !== null;
  const { ref, count } = useCountUp<HTMLSpanElement>(target, { enabled: shouldCount });

  return (
    <span ref={ref} className={className} data-fx={fx}>
      {shouldCount ? `${count}${suffix}` : value}
    </span>
  );
}

const INITIALS_STOPWORDS = new Set(["de", "del", "la", "el", "y", "en", "los", "las"]);

/** Fallback cuando el logo no carga: iniciales de la institución. */
function initialsOf(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, " ")
    .split(/[^\p{L}]+/u)
    .filter((word) => word.length > 1 && !INITIALS_STOPWORDS.has(word.toLowerCase()));

  if (words.length === 0) return "—";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

type PartnerTileProps = {
  partner: AboutFoundingPartner;
  isActive: boolean;
  onActivate: () => void;
};

function PartnerTile({ partner, isActive, onActivate }: PartnerTileProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  // El fondo va opaco (`bg-background` + capa de tinte) porque el tile crea su
  // propio contexto de apilado: sin un backdrop opaco, `mix-blend-screen` del
  // logo no tiene contra qué mezclar y el fondo invertido se ve como recuadro.
  const tileClass = [
    "relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border bg-background p-5",
    "transition-colors duration-200 motion-reduce:transition-none",
    isActive ? "border-white/25" : "border-white/8",
  ].join(" ");

  const tint = (
    <span
      aria-hidden
      className={`absolute inset-0 transition-colors duration-200 motion-reduce:transition-none ${
        isActive ? "bg-white/[0.05]" : "bg-white/[0.02]"
      }`}
    />
  );

  const content = logoFailed ? (
    <span className="relative font-mono text-sm uppercase tracking-[0.18em] text-zinc-600">
      {initialsOf(partner.name)}
    </span>
  ) : (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={partner.logoWidth}
      height={partner.logoHeight}
      sizes="(min-width: 1024px) 12vw, (min-width: 768px) 22vw, 40vw"
      onError={() => setLogoFailed(true)}
      className={[
        // `max-h-14` en vez de `max-h-10`: los PNG traen margen interno propio,
        // así que a 40px la marca real quedaba diminuta dentro del tile.
        "relative h-auto w-auto max-h-14 max-w-full object-contain",
        "transition-[opacity,filter] duration-300 motion-reduce:transition-none",
        // Los assets traen fondo opaco: `screen` lo funde con el tile y
        // `invert` sube las marcas oscuras a claras.
        partner.logoOnLight ? "mix-blend-screen grayscale invert" : "mix-blend-screen grayscale",
        isActive ? "opacity-100" : "opacity-50",
        isActive && !partner.logoOnLight ? "grayscale-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (!partner.url) {
    return (
      <div className={tileClass} data-fx="partner-tile" onMouseEnter={onActivate}>
        {tint}
        {content}
      </div>
    );
  }

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      data-fx="partner-tile"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`${tileClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      {tint}
      {content}
      <span className="sr-only">{partner.name} — se abre en una ventana nueva</span>
    </a>
  );
}

function FoundingPartners() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const partners = ABOUT_DATA.foundingPartners;

  return (
    <AnimatedSection className="grid gap-10 border-t border-white/8 pt-20 lg:grid-cols-12">
      <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <BlurText
          as="h3"
          text={ABOUT_DATA.foundingPartnersTitle}
          delay={70}
          className="font-sans text-[30px] font-medium leading-tight text-foreground"
        />
        <AnimatedItem>
          <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-zinc-400">
            {ABOUT_DATA.foundingPartnersCopy}
          </p>
        </AnimatedItem>
      </div>

      <div className="space-y-10 lg:col-span-8" onMouseLeave={() => setActiveId(null)}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5" data-fx="partner-tiles">
          {partners.map((partner) => (
            <PartnerTile
              key={partner.id}
              partner={partner}
              isActive={activeId === partner.id}
              onActivate={() => setActiveId(partner.id)}
            />
          ))}
        </div>

        <ul data-fx="partner-rows">
          {partners.map((partner) => {
            const isActive = activeId === partner.id;
            return (
              <li
                key={partner.id}
                data-fx="partner-row"
                onMouseEnter={() => setActiveId(partner.id)}
                className={[
                  "flex flex-col gap-1 border-b border-l-2 border-white/8 py-4 pl-4",
                  "transition-colors duration-200 motion-reduce:transition-none",
                  "lg:flex-row lg:items-baseline lg:justify-between lg:gap-6",
                  isActive ? "border-l-accent" : "border-l-transparent",
                ].join(" ")}
              >
                <span
                  className={`text-[15px] transition-colors duration-200 motion-reduce:transition-none ${
                    isActive ? "text-foreground" : "text-zinc-300"
                  }`}
                >
                  {partner.name}
                </span>
                <span
                  className={`text-[13px] transition-colors duration-200 motion-reduce:transition-none lg:text-right ${
                    isActive ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  {partner.role}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedSection>
  );
}

/** Cada línea lleva su propio delay de cascada en una custom property, para
 *  que el ::after del tachado pueda encadenarse con `calc()`. */
type RevealDelayStyle = CSSProperties & Record<"--reveal-delay", string>;

function WorkPrincipleLine({ principle, index }: { principle: WorkPrinciple; index: number }) {
  const { ref, isVisible } = useRevealOnScroll<HTMLLIElement>();
  const style: RevealDelayStyle = { "--reveal-delay": `${index * 70}ms` };
  const order = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={ref}
      style={style}
      className={[
        "transition-[opacity,transform] duration-600 ease-out [transition-delay:var(--reveal-delay)]",
        "motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      {/* Capa aparte para el arrastre horizontal: GSAP escribe `transform` aquí
          y así no pelea con la transición del revelado, que vive en el <li>. */}
      <div
        data-fx="principle-shift"
        className="flex flex-wrap items-baseline gap-x-4 gap-y-1 will-change-transform"
      >
        <span
          aria-hidden
          className={[
            "w-7 shrink-0 font-mono text-xs tabular-nums",
            "transition-colors duration-600 ease-out motion-reduce:transition-none",
            "[transition-delay:calc(var(--reveal-delay)+150ms)]",
            isVisible ? "text-zinc-700" : "text-zinc-800",
          ].join(" ")}
        >
          {order}
        </span>

        <span
          className={`font-sans text-[clamp(26px,4.2vw,48px)] font-bold uppercase leading-[1.05] tracking-tight ${
            principle.highlighted ? "text-accent" : "text-foreground"
          }`}
        >
          {principle.affirmative}
        </span>

        <span className="ml-11 flex basis-full items-baseline gap-3 md:ml-0 md:basis-auto">
          <span aria-hidden className="text-[clamp(15px,2vw,22px)] text-zinc-700">
            /
          </span>
          {/* El tachado es un ::after animable; `no-underline` quita el
              line-through nativo de <s>, que no se puede animar. */}
          <s
            className={[
              "relative text-[clamp(15px,2vw,22px)] italic text-zinc-600 no-underline",
              "after:absolute after:left-0 after:top-1/2 after:h-[1.5px] after:w-full",
              "after:origin-left after:bg-white/25 after:content-['']",
              "after:transition-transform after:duration-500 after:ease-out",
              "after:[transition-delay:calc(var(--reveal-delay)+250ms)]",
              "motion-reduce:after:transition-none",
              isVisible ? "after:scale-x-100" : "after:scale-x-0",
            ].join(" ")}
          >
            {principle.negative}
          </s>
        </span>
      </div>
    </li>
  );
}

function WorkPrinciples() {
  return (
    <AnimatedSection className="border-t border-white/8 pt-10">
      <div data-fx="principles-header">
        <span className="block" data-fx="principles-eyebrow">
          <EyebrowBadge>{ABOUT_DATA.principlesEyebrow}</EyebrowBadge>
        </span>
        <span className="mt-5 block overflow-hidden pb-[0.08em]">
          <h3
            className="font-sans text-[36px] font-medium leading-tight text-foreground"
            data-fx="principles-title"
          >
            {ABOUT_DATA.principlesTitle}
          </h3>
        </span>
      </div>

      {/* `overflow-x-clip` (no `hidden`) contiene el arrastre sin crear un
          contenedor de scroll ni recortar verticalmente. */}
      <ul className="mt-10 flex flex-col gap-5 overflow-x-clip">
        {ABOUT_DATA.workPrinciples.map((principle, index) => (
          <WorkPrincipleLine key={principle.id} principle={principle} index={index} />
        ))}
      </ul>
    </AnimatedSection>
  );
}

export function About() {
  const lastHeadlineIndex = ABOUT_DATA.headlineLines.length - 1;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    // Con reduced motion no se crea ninguna tween: todo queda en su estado final.
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Imagen: wipe horizontal de izquierda a derecha + desescalado del render.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='lab-frame']", start: "top 85%", once: true },
        })
        .fromTo(
          "[data-fx='lab-frame']",
          { clipPath: `inset(0% 100% 0% 0% round ${FRAME_RADIUS})` },
          {
            clipPath: `inset(0% 0% 0% 0% round ${FRAME_RADIUS})`,
            duration: 1.8,
            ease: "power3.inOut",
          },
        )
        .fromTo(
          "[data-fx='lab-image']",
          { scale: 1.3 },
          { scale: 1.15, duration: 2, ease: "power3.out" },
          0,
        )
        .from("[data-fx='lab-caption']", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, 0.9);

      // Parallax horizontal dentro del marco. El recorrido corto y el scrub con
      // retardo son lo que lo hacen avanzar despacio respecto del scroll.
      gsap.fromTo(
        "[data-fx='lab-image']",
        { xPercent: -3.5 },
        {
          xPercent: 3.5,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-fx='lab-frame']",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      // Bloque del 5%: la regla se dibuja y el número sube dentro de su máscara.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='highlight']", start: "top 85%", once: true },
        })
        .from("[data-fx='divider']", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          ease: "power2.out",
        })
        .from(
          "[data-fx='highlight-value']",
          { yPercent: 110, duration: 1.1, ease: "power3.out" },
          0.1,
        )
        .from("[data-fx='highlight-copy']", { opacity: 0, y: 18, duration: 0.7, ease: "power2.out" }, 0.45);

      // Stats: cada número sube enmascarado y su etiqueta aparece detrás.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='stats']", start: "top 88%", once: true },
        })
        .from("[data-fx='stat-value']", {
          yPercent: 115,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
        })
        .from(
          "[data-fx='stat-label']",
          { opacity: 0, y: 12, duration: 0.6, ease: "power2.out", stagger: 0.09 },
          0.2,
        );

      // Logo wall: los tiles entran en cascada y las filas se deslizan detrás.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='partner-tiles']", start: "top 85%", once: true },
        })
        .from("[data-fx='partner-tile']", {
          opacity: 0,
          y: 26,
          scale: 0.96,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
        })
        .from(
          "[data-fx='partner-row']",
          { opacity: 0, x: -18, duration: 0.6, ease: "power2.out", stagger: 0.06 },
          0.25,
        );

      // Encabezado del manifiesto: el título sube enmascarado tras el badge.
      // Las nueve líneas las revela `useRevealOnScroll`, una por una.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='principles-header']", start: "top 85%", once: true },
        })
        .from("[data-fx='principles-eyebrow']", {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-fx='principles-title']",
          { yPercent: 110, duration: 1, ease: "power3.out" },
          0.1,
        );
    }, scope);

    // Arrastre horizontal de las frases, ligado al scroll. Va en su propio
    // matchMedia para bajar la amplitud en pantallas chicas; con reduced motion
    // no se crea ninguna tween.
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        small: "(max-width: 767px)",
        medium: "(min-width: 768px) and (max-width: 1023px)",
        // Sin esta condición el callback no corre en desktop: matchMedia sólo
        // lo invoca cuando al menos una de las queries hace match.
        large: "(min-width: 1024px)",
      },
      (context) => {
        const conditions = context.conditions ?? {};
        if (conditions.reduce) return;

        const travel = conditions.small ? 14 : conditions.medium ? 28 : 48;
        const lines = scope.querySelectorAll<HTMLElement>("[data-fx='principle-shift']");

        lines.forEach((line, index) => {
          // Direcciones alternas: la lista avanza en zigzag al hacer scroll.
          const direction = index % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            line,
            { x: -travel * direction },
            {
              x: travel * direction,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      },
      scope,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-20">
        <AnimatedSection className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          {/* Columna izquierda. En móvil se disuelve (`contents`) para que sus
              bloques se intercalen con los de la derecha vía `order`. */}
          <div className="contents lg:col-span-6 lg:block">
            <AnimatedItem className="order-1">
              <EyebrowBadge>{ABOUT_DATA.eyebrow}</EyebrowBadge>
            </AnimatedItem>

            <AnimatedItem className="order-2 lg:mt-8">
              <h2 className="font-sans text-[40px] font-bold leading-[1.05] tracking-tight text-foreground lg:text-[56px]">
                {ABOUT_DATA.headlineLines.map((line, index) => (
                  <BlurText
                    key={line}
                    as="span"
                    text={line}
                    delay={80}
                    initialDelay={index * 180}
                    className={index === lastHeadlineIndex ? "text-accent" : ""}
                  />
                ))}
              </h2>
            </AnimatedItem>

            <div className="order-5" data-fx="highlight">
              <div className="my-12 h-px w-16 bg-white/15" data-fx="divider" />
              <span className="block overflow-hidden pb-[0.06em]">
                <CountingValue
                  value={ABOUT_DATA.highlightValue}
                  animate
                  fx="highlight-value"
                  className="block font-sans text-[clamp(72px,8vw,112px)] font-bold leading-none tracking-tight text-accent tabular-nums"
                />
              </span>
              <p
                className="mt-6 max-w-[420px] text-[17px] leading-relaxed text-zinc-300"
                data-fx="highlight-copy"
              >
                {ABOUT_DATA.highlightCopy}
              </p>
            </div>
          </div>

          {/* Columna derecha. */}
          <div className="contents lg:col-span-6 lg:block">
            <AnimatedItem className="order-3">
              <p className="text-[17px] leading-relaxed text-foreground">
                {ABOUT_DATA.leadParagraph}
              </p>
            </AnimatedItem>

            <div className="order-4 lg:mt-10">
              <figure>
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]"
                  data-fx="lab-frame"
                >
                  <Image
                    src={ABOUT_DATA.labImageSrc}
                    alt={ABOUT_DATA.labImageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    data-fx="lab-image"
                  />
                </div>
                <figcaption
                  className="mt-5 text-sm leading-relaxed text-zinc-500"
                  data-fx="lab-caption"
                >
                  {ABOUT_DATA.labCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="border-t border-white/8 pt-16">
          <div
            className="grid grid-cols-2 divide-white/8 lg:grid-cols-4 lg:divide-x"
            data-fx="stats"
          >
            {ABOUT_DATA.stats.map((stat, index) => (
              <div
                key={stat.id}
                className={[
                  "px-6 py-6",
                  index % 2 === 1 ? "border-l border-white/8" : "",
                  index >= 2 ? "border-t border-white/8 lg:border-t-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="block overflow-hidden pb-[0.06em]">
                  <CountingValue
                    value={stat.value}
                    animate={!stat.isDate}
                    fx="stat-value"
                    className="block font-sans text-[44px] font-medium leading-none tracking-tight text-foreground tabular-nums"
                  />
                </span>
                <span
                  className="mt-3 block font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-zinc-500"
                  data-fx="stat-label"
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <FoundingPartners />

        <WorkPrinciples />

        <AnimatedSection className="grid gap-10 border-t border-white/8 pt-12 md:grid-cols-2">
          {CLIENT_QUOTES.map((item) => (
            <AnimatedItem key={item.id}>
              <figure className="card-surface p-6">
                <blockquote className="font-sans text-lg italic leading-snug text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-zinc-500">{item.role}</figcaption>
              </figure>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
