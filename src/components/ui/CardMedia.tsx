"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useScrollFrameSequence } from "@/hooks/use-scroll-frame-sequence";
import type { CardMedia as CardMediaData } from "@/lib/ciiia";

export type MediaAspect = "video" | "square" | "wide" | "auto";

const ASPECT_CLASS: Record<MediaAspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  auto: "min-h-40",
};

const IMAGE_SIZES: Record<MediaAspect, string> = {
  video: "(min-width: 1024px) 700px, 100vw",
  wide: "(min-width: 1024px) 900px, 100vw",
  square: "(min-width: 1024px) 420px, 100vw",
  auto: "(min-width: 1024px) 420px, 100vw",
};

const MAX_VIDEO_BYTES = 2 * 1024 * 1024;

// ponytail: module-level registry so at most one video plays at a time once
// a page has more than two video tiles — an O(n) scan per scroll frame,
// fine for a handful of tiles; revisit with a shared IntersectionObserver
// ranking if this grid ever grows past a few dozen.
type VideoRegistryEntry = { video: HTMLVideoElement; container: HTMLElement };
const videoRegistry = new Set<VideoRegistryEntry>();
let recomputeScheduled = false;
let scrollListenerCount = 0;

function recomputeActiveVideo() {
  if (videoRegistry.size <= 2) return;
  const viewportCenter = window.innerHeight / 2;
  let closest: VideoRegistryEntry | null = null;
  let closestDistance = Infinity;
  for (const entry of videoRegistry) {
    const rect = entry.container.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = entry;
    }
  }
  for (const entry of videoRegistry) {
    if (entry === closest) entry.video.play().catch(() => {});
    else entry.video.pause();
  }
}

function scheduleRecompute() {
  if (recomputeScheduled) return;
  recomputeScheduled = true;
  requestAnimationFrame(() => {
    recomputeScheduled = false;
    recomputeActiveVideo();
  });
}

function attachScrollListener() {
  if (scrollListenerCount === 0) {
    window.addEventListener("scroll", scheduleRecompute, { passive: true });
    window.addEventListener("resize", scheduleRecompute);
  }
  scrollListenerCount++;
}

function detachScrollListener() {
  scrollListenerCount = Math.max(0, scrollListenerCount - 1);
  if (scrollListenerCount === 0) {
    window.removeEventListener("scroll", scheduleRecompute);
    window.removeEventListener("resize", scheduleRecompute);
  }
}

export function CardMedia({ media, aspect }: { media: CardMediaData; aspect: MediaAspect }) {
  switch (media.kind) {
    case "none":
      return null;
    case "video":
      return <VideoMedia media={media} aspect={aspect} />;
    case "image":
      return (
        <div className={`relative overflow-hidden rounded-xl ${ASPECT_CLASS[aspect]}`}>
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover"
            sizes={IMAGE_SIZES[aspect]}
          />
        </div>
      );
    case "frames":
      return <FramesMedia media={media} aspect={aspect} />;
    case "text":
      return (
        <p className="font-mono text-xs leading-relaxed text-[var(--text-secondary-v2)]">{media.content}</p>
      );
    case "stat":
      return (
        <div className="flex flex-col gap-1">
          <span className="font-sans text-4xl font-semibold text-foreground">{media.value}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted-v2)]">
            {media.label}
          </span>
        </div>
      );
  }
}

function VideoMedia({
  media,
  aspect,
}: {
  media: Extract<CardMediaData, { kind: "video" }>;
  aspect: MediaAspect;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [oversized, setOversized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(media.src, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const length = res.headers.get("content-length");
        if (length && Number(length) > MAX_VIDEO_BYTES) {
          setOversized(true);
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[CardMedia] ${media.src} pesa ${(Number(length) / 1024 / 1024).toFixed(1)}MB, ` +
                `supera el máximo de 2MB. Usando poster en su lugar.`,
            );
          }
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [media.src]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const canPlay = inView && !prefersReducedMotion && !oversized;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !canPlay) return;

    const entry: VideoRegistryEntry = { video, container };
    videoRegistry.add(entry);
    attachScrollListener();
    if (videoRegistry.size <= 2) video.play().catch(() => {});
    scheduleRecompute();

    return () => {
      videoRegistry.delete(entry);
      detachScrollListener();
      video.pause();
    };
  }, [canPlay]);

  useEffect(() => {
    if (!canPlay) videoRef.current?.pause();
  }, [canPlay]);

  const showStaticPoster = prefersReducedMotion || oversized;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-white/[0.03] ${ASPECT_CLASS[aspect]}`}
    >
      {showStaticPoster ? (
        media.poster && (
          <Image
            src={media.poster}
            alt=""
            fill
            className="object-cover"
            sizes={IMAGE_SIZES[aspect]}
          />
        )
      ) : (
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function FramesMedia({
  media,
  aspect,
}: {
  media: Extract<CardMediaData, { kind: "frames" }>;
  aspect: MediaAspect;
}) {
  const framePath = (n: number) => `${media.dir}/frame_${String(n).padStart(4, "0")}.jpg`;
  const { sectionRef, canvasRef } = useScrollFrameSequence({
    frameCount: media.count,
    framePath,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden rounded-xl bg-white/[0.03] ${ASPECT_CLASS[aspect]}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </section>
  );
}
