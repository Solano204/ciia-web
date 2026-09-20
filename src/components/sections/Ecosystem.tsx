"use client";

import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EcosystemGrid, EcosystemLogos } from "@/components/ui/EcosystemGrid";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { Section } from "@/components/ui/Section";
import type { HeadingLevel } from "@/components/ui/SectionHeader";
import { CTA_COPY, ECOSYSTEM_INTRO, schedulingHref } from "@/lib/ciiia";

gsap.registerPlugin(ScrollTrigger);

export function Ecosystem({
  headingLevel: Heading = "h2",
  limit,
}: {
  headingLevel?: HeadingLevel;
  /** Teaser de la home: solo los primeros `limit` logos, con enlace a /ecosistema. */
  limit?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: "[data-fx='eco-header']", start: "top 88%", once: true },
        })
        .from("[data-fx='eco-title']", { yPercent: 110, duration: 1, ease: "power3.out" }, 0.1)
        .from(
          "[data-fx='eco-intro']",
          { opacity: 0, y: 18, duration: 0.6, ease: "power2.out" },
          0.35,
        );
    }, scope);

    return () => mm.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="ecosistema" className="flex flex-col gap-10">
          <AnimatedSection className="grid gap-6 lg:grid-cols-12" >
            <div className="lg:col-span-12" data-fx="eco-header">
              <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
                <span className="block overflow-hidden pb-[0.08em] lg:col-span-6">
                  <Heading
                    className="font-display text-h2 font-medium text-foreground"
                    data-fx="eco-title"
                  >
                    Ecosistema
                  </Heading>
                </span>
                <p
                  className="max-w-[420px] text-[15px] leading-relaxed text-zinc-400 lg:col-span-5 lg:col-start-8"
                  data-fx="eco-intro"
                >
                  {ECOSYSTEM_INTRO}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <AnimatedItem>
              {limit ? (
                <EcosystemLogos limit={limit} />
              ) : (
                <Suspense fallback={<div className="h-px w-full border-y border-white/8" />}>
                  <EcosystemGrid />
                </Suspense>
              )}
            </AnimatedItem>
          </AnimatedSection>

          <SectionCta className="border-white/8">
            <CtaButton href="/contacto">{CTA_COPY.contacto}</CtaButton>
            {limit ? (
              <CtaLink href="/ecosistema">Ver todo el ecosistema</CtaLink>
            ) : (
              <CtaLink href={schedulingHref()}>{CTA_COPY.agenda}</CtaLink>
            )}
          </SectionCta>
    </Section>
  );
}
