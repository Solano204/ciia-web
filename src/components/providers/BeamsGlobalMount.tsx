"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ssr: false is only valid from within a Client Component boundary.
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

// ponytail: one Beams instance, fixed behind the whole page, so the pattern
// is continuous across section boundaries instead of restarting per-section.
// Paused while any opaque scroll-driven frame-sequence section (Hero,
// Challenge — both share the `.scroll-animation` class) is in view, since
// they fully occlude it anyway, and while the tab is hidden.
function useBeamsPaused(): boolean {
  const [occluded, setOccluded] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const opaqueSections = document.querySelectorAll(".scroll-animation");
    if (opaqueSections.length === 0) {
      setOccluded(false);
      return;
    }
    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      setOccluded(intersecting.size > 0);
    });
    opaqueSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return occluded || tabHidden;
}

export function BeamsGlobalMount() {
  const paused = useBeamsPaused();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-1]">
      <Beams
        beamWidth={3}
        beamHeight={30}
        beamNumber={20}
        lightColor="#3A3A3A"
        beamColor="#000000"
        backgroundColor="#000000"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
        dpr={[1, 1.5]}
        paused={paused}
      />
    </div>
  );
}
