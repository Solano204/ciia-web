"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { MotionConfig } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

type Props = { children: ReactNode };

export function SmoothScrollProvider({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      lerp: 0.075,
      duration: 1.4,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
    });

    // ScrollTrigger lee la posición del scroller en cada update de Lenis.
    instance.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    setLenis(instance);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
