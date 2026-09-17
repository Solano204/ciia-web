"use client";

import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EcosystemGrid } from "@/components/ui/EcosystemGrid";
import { BeamsBackground } from "@/components/ui/BeamsBackground";
import { CtaButton, CtaLink, SectionCta } from "@/components/ui/Cta";
import { CTA_COPY, ECOSYSTEM_INTRO, schedulingHref } from "@/lib/ciiia";

gsap.registerPlugin(ScrollTrigger);

export function Ecosystem() {
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
        .from("[data-fx='eco-eyebrow']", { opacity: 0, y: 14, duration: 0.55, ease: "power2.out" })
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
    <BeamsBackground className="section-seam">
      <section ref={sectionRef} id="ecosistema" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
          <AnimatedSection className="grid gap-6 lg:grid-cols-12" >
            <div className="lg:col-span-12" data-fx="eco-header">
              <span className="block" data-fx="eco-eyebrow">
                <EyebrowBadge>CII.IA // ECOSISTEMA</EyebrowBadge>
              </span>

              <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:items-end">
                <span className="block overflow-hidden pb-[0.08em] lg:col-span-6">
                  <h2
                    className="font-sans text-[clamp(38px,5vw,52px)] font-medium leading-[1.05] text-foreground"
                    data-fx="eco-title"
                  >
                    Ecosistema
                  </h2>
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
              <Suspense fallback={<div className="h-px w-full border-y border-white/8" />}>
                <EcosystemGrid />
              </Suspense>
            </AnimatedItem>
          </AnimatedSection>

          <SectionCta className="border-white/8">
            <CtaButton href="#contacto">{CTA_COPY.contacto}</CtaButton>
            <CtaLink href={schedulingHref()}>{CTA_COPY.agenda}</CtaLink>
          </SectionCta>
        </div>
      </section>
    </BeamsBackground>
  );
}
