"use client";

import dynamic from "next/dynamic";

// ssr: false is only valid from within a Client Component boundary — this
// tiny wrapper exists so layout.tsx (a Server Component) can stay untouched
// by that constraint.
const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), {
  ssr: false,
});

export function SplashCursorMount() {
  return (
    <SplashCursor
      DENSITY_DISSIPATION={9.5}
      VELOCITY_DISSIPATION={9.5}
      PRESSURE={0.1}
      CURL={3}
      SPLAT_RADIUS={0.2}
      SPLAT_FORCE={6000}
      COLOR_UPDATE_SPEED={10}
      SHADING
      RAINBOW_MODE={false}
      COLOR="#5C4514"
    />
  );
}
