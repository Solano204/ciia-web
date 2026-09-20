"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlurText } from "@/components/ui/BlurText";
import { CountingValue } from "@/components/ui/CountingValue";
import { FoundingPartners } from "@/components/ui/FoundingPartners";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HeadingLevel } from "@/components/ui/SectionHeader";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import {
  ABOUT_DATA,
  CLIENT_QUOTES,
  CTA_COPY,
  type WorkPrinciple,
} from "@/lib/ciiia";

gsap.registerPlugin(ScrollTrigger);

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
            // El estado revelado debe cumplir AA: la jerarquía frente a la
            // palabra de 48px la da el tamaño, no un gris ilegible (antes
            // zinc-700, 1.33:1). El estado previo es transitorio.
            isVisible ? "text-muted" : "text-zinc-800",
          ].join(" ")}
        >
          {order}
        </span>

        <span
          className={`font-display text-[clamp(26px,4.2vw,48px)] font-bold uppercase leading-[1.05] ${
            principle.highlighted ? "text-accent" : "text-foreground"
          }`}
        >
          {principle.affirmative}
        </span>

        <span className="ml-11 flex basis-full items-baseline gap-3 md:ml-0 md:basis-auto">
          <span aria-hidden className="text-[clamp(15px,2vw,22px)] text-muted">
            /
          </span>
          {/* El tachado es un ::after animable; `no-underline` quita el
              line-through nativo de <s>, que no se puede animar. */}
          <s
            className={[
              // Contenido real («no diagnosticamos»), no decoración: zinc-600
              // daba 2.56:1. Sigue siendo el tono más apagado que cumple AA.
              "relative text-[clamp(15px,2vw,22px)] italic text-muted no-underline",
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
        <span className="block overflow-hidden pb-[0.08em]">
          <h3
            className="font-display text-h2 font-medium text-foreground"
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

export function About({
  headingLevel: Heading = "h2",
  teaser = false,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: titular, dato del 5% y foto, con enlace a /nosotros. */
  teaser?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    // Con reduced motion no se crea ninguna tween: todo queda en su estado final.
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // En el teaser de la home no hay cifras, socios ni principios.
      if (teaser) return;

      // Encabezado del manifiesto: el título sube enmascarado.
      // Las nueve líneas las revela `useRevealOnScroll`, una por una.
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='principles-header']", start: "top 85%", once: true },
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
          // Aquí había un try/catch que se tragaba
          // «Cannot read properties of undefined (reading 'end')». La causa no
          // estaba en esta línea sino en EcosystemGrid, que forzaba un
          // `ScrollTrigger.refresh()` síncrono dentro de su `matchMedia` y
          // reventaba el trigger que se estuviera creando en ese momento.
          // Resuelto allí; aquí ya no hace falta enmascarar nada.
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
  }, [teaser]);

  return (
    <>
      <Section id="nosotros" className="flex flex-col gap-8">
        <Heading className="font-display text-h2 font-semibold text-foreground">
          {ABOUT_DATA.headlineLines.map((line, index) => (
            <BlurText key={line} as="span" text={line} delay={80} initialDelay={index * 180} />
          ))}
        </Heading>
        <Reveal>
          <p className="max-w-[80ch] text-[19px] leading-snug text-foreground">
            {ABOUT_DATA.leadParagraph}
          </p>
        </Reveal>
      </Section>

      <figure>
        <Reveal>
          <div className="relative h-[60svh] min-h-[320px] max-h-[720px] w-full overflow-hidden bg-white/[0.03]">
            <Image
              src={ABOUT_DATA.labImageSrc}
              alt={ABOUT_DATA.labImageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <figcaption className="px-6 pt-5 text-sm text-zinc-400 md:px-10">
          <span className="mx-auto block max-w-[var(--container-max)]">{ABOUT_DATA.labCaption}</span>
        </figcaption>
      </figure>

      <Section ref={sectionRef} id="cifras" className="flex flex-col gap-20">

        {!teaser && (
          <>
        <ul className="grid gap-12 md:grid-cols-3">
          {ABOUT_DATA.stats.map((stat, index) => (
            <li key={stat.id}>
              <Reveal index={index} className="flex flex-col gap-3">
                <CountingValue
                  value={stat.value}
                  animate={!stat.isDate}
                  className="font-display text-display font-semibold leading-none text-foreground tabular-nums"
                />
                <span className="font-sans text-[12px] uppercase tracking-[0.08em] text-muted">
                  {stat.label}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <FoundingPartners />

        <WorkPrinciples />
          </>
        )}

        <SectionCta className="border-white/8">
          <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
          {teaser ? (
            <CtaLink href="/nosotros">Conocer al CII.IA</CtaLink>
          ) : (
            <CtaLink href="/ecosistema">Ver el ecosistema</CtaLink>
          )}
        </SectionCta>

        {!teaser && (
        <AnimatedSection className="grid gap-10 border-t border-white/8 pt-12 md:grid-cols-2">
          {CLIENT_QUOTES.map((item) => (
            <AnimatedItem key={item.id}>
              <figure className="max-w-[60ch] border-l border-[var(--line-strong)] pl-6">
                  <blockquote className="font-sans text-lg italic leading-snug text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted">{item.role}</figcaption>
              </figure>
            </AnimatedItem>
          ))}
        </AnimatedSection>
        )}
    </Section>
    </>
  );
}
