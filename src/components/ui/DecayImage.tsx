"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface DecayImageProps {
  src: string;
  alt?: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  className?: string;
}

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;
const map = (x: number, a: number, b: number, c: number, d: number): number =>
  ((x - a) * (d - c)) / (b - a) + c;
const distance = (x1: number, x2: number, y1: number, y2: number): number =>
  Math.hypot(x1 - x2, y1 - y2);

export function DecayImage({
  src,
  alt = "",
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  className = "",
}: DecayImageProps) {
  const filterId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cachedCursor = { ...cursor };
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    const imgValues = { x: 0, y: 0, rz: 0, displacementScale: 0 };
    let rafId: number;

    const handleResize = () => {
      winsize.width = window.innerWidth;
      winsize.height = window.innerHeight;
    };
    const handleMouseMove = (ev: MouseEvent) => {
      cursor.x = ev.clientX;
      cursor.y = ev.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      let targetX = lerp(imgValues.x, map(cursor.x, 0, winsize.width, -120, 120), 0.1);
      let targetY = lerp(imgValues.y, map(cursor.y, 0, winsize.height, -120, 120), 0.1);
      const targetRz = lerp(imgValues.rz, map(cursor.x, 0, winsize.width, -10, 10), 0.1);

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.x = targetX;
      imgValues.y = targetY;
      imgValues.rz = targetRz;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${imgValues.x}px, ${imgValues.y}px) rotate(${imgValues.rz}deg)`;
      }

      const travelled = distance(cachedCursor.x, cursor.x, cachedCursor.y, cursor.y);
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(travelled, 0, 200, 0, maxDisplacement),
        0.06,
      );

      displacementMapRef.current?.setAttribute("scale", String(imgValues.displacementScale));

      cachedCursor.x = cursor.x;
      cachedCursor.y = cursor.y;

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [maxDisplacement, movementBound, prefersReducedMotion]);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 [will-change:transform] ${className}`}>
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        role="img"
        aria-label={alt}
      >
        <filter id={filterId}>
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          />
        </filter>
        <image
          href={src}
          x="0"
          y="0"
          width="600"
          height="750"
          filter={`url(#${filterId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}
