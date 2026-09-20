"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollFrameSequenceOptions = {
  frameCount: number;
  framePath: (n: number) => string;
  onProgress?: (progress: number) => void;
  /** Con reduced motion la escena no sigue al scroll: se queda en `reducedProgress`. */
  reducedMotion?: boolean;
  reducedProgress?: number;
};

export function useScrollFrameSequence({
  frameCount,
  framePath,
  onProgress,
  reducedMotion = false,
  reducedProgress = 0,
}: UseScrollFrameSequenceOptions) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [firstReady, setFirstReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const bump = () => {
      if (cancelled) return;
      loadedCount++;
      setLoadProgress(loadedCount / frameCount);
      if (loadedCount === frameCount) {
        loadedRef.current = true;
        setLoaded(true);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (i === 1 && !cancelled) setFirstReady(true);
        bump();
      };
      img.onerror = bump;
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [frameCount, framePath]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // ponytail: sized off the parent box (not the canvas itself, which we're
    // about to resize) so it works both for a viewport-filling hero and a
    // small grid tile — for Hero/Challenge the parent is already
    // viewport-sized, so this is a no-op there.
    const width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    const height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(1, 1);
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!firstReady) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [firstReady, drawFrame]);

  useEffect(() => {
    if (loaded) window.dispatchEvent(new Event("scroll"));
  }, [loaded]);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section || !loadedRef.current) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const scrolled =
          scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
        const progress = reducedMotion ? reducedProgress : scrolled;

        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(progress * frameCount),
        );
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        onProgress?.(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame, frameCount, onProgress, reducedMotion, reducedProgress]);

  return { sectionRef, canvasRef, loaded, loadProgress };
}
