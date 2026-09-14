"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// ssr: false is only valid from within a Client Component boundary — this
// tiny wrapper exists so layout.tsx (a Server Component) can stay untouched
// by that constraint.
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

export function BeamsBackgroundMount() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1]">
      <Beams
        beamWidth={3}
        beamHeight={30}
        beamNumber={20}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
        beamColor="#3a2c10"
        backgroundColor="#000000"
      />
    </div>
  );
}
