"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Snapshot = TargetAndTransition;

/** Componentes estáticos: crearlos en el render remontaría el árbol en cada pasada. */
const MOTION_TAGS = {
  p: motion.p,
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export type BlurTextTag = keyof typeof MOTION_TAGS;

/** El wrapper puede ser cualquiera de MOTION_TAGS, así que el ref debe servir
 *  para todos: la intersección es asignable a cada uno de ellos. */
type BlurTextElement = HTMLParagraphElement &
  HTMLDivElement &
  HTMLSpanElement &
  HTMLHeadingElement;

const buildKeyframes = (from: Snapshot, steps: Snapshot[]) => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ]);

  const keyframes: Record<string, unknown[]> = {};
  keys.forEach((key) => {
    keyframes[key] = [
      (from as Record<string, unknown>)[key],
      ...steps.map((step) => (step as Record<string, unknown>)[key]),
    ];
  });
  return keyframes as Snapshot;
};

type Props = {
  text: string;
  /** Element rendered as the wrapper. Defaults to `p`. */
  as?: BlurTextTag;
  className?: string;
  /** Delay between each word/letter, in ms. */
  delay?: number;
  /** Delay before the whole block starts, in ms. Useful to chain several blocks. */
  initialDelay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  /** Duration of each animation step, in seconds. */
  stepDuration?: number;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  onAnimationComplete?: () => void;
};

export function BlurText({
  text,
  as: Tag = "p",
  className = "",
  delay = 120,
  initialDelay = 0,
  animateBy = "words",
  direction = "top",
  stepDuration = 0.35,
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  onAnimationComplete,
}: Props) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<BlurTextElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<Snapshot>(
    () => ({ filter: "blur(10px)", opacity: 0, y: direction === "top" ? -32 : 32 }),
    [direction],
  );

  const defaultTo = useMemo<Snapshot[]>(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 4 : -4 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  const MotionTag = MOTION_TAGS[Tag];

  // El árbol es idéntico con y sin reduced motion (evita desajustes de
  // hidratación): lo único que cambia es si se parte del estado final.
  const restSnapshot = toSnapshots[toSnapshots.length - 1] ?? fromSnapshot;
  const initialSnapshot = reduceMotion ? restSnapshot : fromSnapshot;

  return (
    <MotionTag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <motion.span
            key={index}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={initialSnapshot}
            animate={reduceMotion ? restSnapshot : inView ? animateKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times,
              ease: [0.22, 1, 0.36, 1],
              delay: (initialDelay + index * delay) / 1000,
            }}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
