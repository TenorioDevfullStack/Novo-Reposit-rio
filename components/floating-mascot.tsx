"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type FloatingMascotProps = {
  size?: number;
  className?: string;
};

const MASCOT_IMAGE_SRC = "/mascote/mascote-ids-dorminho-transparent.png";
const WAKE_VIDEO_SRC = "/mascote/mascote-acordando.mp4";
const CHROMA_LOW = 12;
const CHROMA_HIGH = 60;
const CHROMA_SAMPLE_SIZE = 24;

export function FloatingMascot({ size = 180, className }: FloatingMascotProps) {
  const [isWakeOpen, setIsWakeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [videoAspect, setVideoAspect] = useState<string | null>(null);
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null);
  const [showRawVideo, setShowRawVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const bgColorRef = useRef<[number, number, number] | null>(null);
  const lastFrameAtRef = useRef<number>(0);
  const fallbackTimerRef = useRef<number | null>(null);

  const handleClick = () => {
    const video = videoRef.current;
    setShowRawVideo(false);
    lastFrameAtRef.current = 0;
    if (video) {
      bgColorRef.current = null;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      if (video.readyState === 0) {
        video.load();
      }
      video.currentTime = 0;
      void video.play().catch(() => {
        // Playback may be blocked on some devices; canvas will still render when frames are available.
      });
    }
    setIsWakeOpen(true);
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("ai-assistant:open"));
  };

  const handleCloseWake = () => {
    setIsWakeOpen(false);
    openChat();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isWakeOpen) {
      setShowRawVideo(false);
      lastFrameAtRef.current = 0;
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    }
  }, [isWakeOpen]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!isWakeOpen || !video || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let stopped = false;

    const syncCanvasSize = () => {
      const width = video.videoWidth || 0;
      const height = video.videoHeight || 0;
      const rect = containerRef.current?.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      if (!rect || rect.width === 0 || rect.height === 0 || width === 0 || height === 0) {
        return;
      }

      const targetWidth = Math.min(width, Math.round(rect.width * dpr));
      const targetHeight = Math.min(height, Math.round(rect.height * dpr));

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
    };

    const renderFrame = () => {
      if (stopped) return;
      if (showRawVideo) return;
      if (video.readyState < 2) return;
      if (canvas.width === 0 || canvas.height === 0) {
        syncCanvasSize();
      }
      if (canvas.width === 0 || canvas.height === 0) return;

      try {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {
        return;
      }

      let frame: ImageData;
      try {
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch {
        return;
      }
      const data = frame.data;

      if (!bgColorRef.current) {
        const size = Math.min(CHROMA_SAMPLE_SIZE, canvas.width, canvas.height);
        let rSum = 0;
        let gSum = 0;
        let bSum = 0;
        let count = 0;
        const corners: Array<[number, number]> = [
          [0, 0],
          [canvas.width - size, 0],
          [0, canvas.height - size],
          [canvas.width - size, canvas.height - size],
        ];

        for (const [startX, startY] of corners) {
          for (let y = 0; y < size; y += 1) {
            for (let x = 0; x < size; x += 1) {
              const px = Math.min(canvas.width - 1, startX + x);
              const py = Math.min(canvas.height - 1, startY + y);
              const idx = (py * canvas.width + px) * 4;
              rSum += data[idx];
              gSum += data[idx + 1];
              bSum += data[idx + 2];
              count += 1;
            }
          }
        }

        bgColorRef.current = [
          rSum / count,
          gSum / count,
          bSum / count,
        ];
      }

      const bg = bgColorRef.current ?? [255, 255, 255];
      const range = Math.max(1, CHROMA_HIGH - CHROMA_LOW);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const dr = r - bg[0];
        const dg = g - bg[1];
        const db = b - bg[2];
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);

        if (dist <= CHROMA_LOW) {
          data[i + 3] = 0;
          continue;
        }

        if (dist < CHROMA_HIGH) {
          const t = (dist - CHROMA_LOW) / range;
          data[i + 3] = Math.round(255 * t);
        } else {
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(frame, 0, 0);
      lastFrameAtRef.current = Date.now();
    };

    const scheduleNext = () => {
      if (stopped) return;
      if ("requestVideoFrameCallback" in video) {
        (video as HTMLVideoElement).requestVideoFrameCallback(() => {
          renderFrame();
          scheduleNext();
        });
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!video.paused && !video.ended) {
          renderFrame();
        }
        scheduleNext();
      });
    };

    const handleLoaded = () => {
      syncCanvasSize();
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setVideoAspect(`${video.videoWidth} / ${video.videoHeight}`);
        setVideoSize({ width: video.videoWidth, height: video.videoHeight });
      }
      bgColorRef.current = null;
      renderFrame();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncCanvasSize();
        renderFrame();
      });
      resizeObserver.observe(containerRef.current);
    }

    const handleTimeUpdate = () => {
      renderFrame();
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleTimeUpdate);
    video.addEventListener("seeked", handleTimeUpdate);

    video.currentTime = 0;
    bgColorRef.current = null;
    renderFrame();

    scheduleNext();

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    fallbackTimerRef.current = window.setTimeout(() => {
      if (!lastFrameAtRef.current) {
        setShowRawVideo(true);
      }
    }, 700);

    return () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      video.pause();
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleTimeUpdate);
      video.removeEventListener("seeked", handleTimeUpdate);
      resizeObserver?.disconnect();
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [isWakeOpen, showRawVideo]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir chat com IA"
        onClick={handleClick}
        className={cn(
          "relative rounded-full overflow-hidden border border-border bg-transparent p-0 animate-float shadow-[0_14px_30px_rgba(0,0,0,0.35)]",
          className
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={MASCOT_IMAGE_SRC}
          alt=""
          fill
          sizes={`${size}px`}
          quality={100}
          priority
          className="pointer-events-none object-cover"
          draggable={false}
        />
      </button>

      {isWakeOpen &&
        isMounted &&
        createPortal(
          <div className="fixed inset-0 z-[999] grid place-items-center bg-transparent p-4">
            <div
              ref={containerRef}
              className="relative w-[85vw] max-w-4xl overflow-hidden bg-transparent sm:w-[75vw]"
              style={{ aspectRatio: videoAspect ?? "16 / 9" }}
            >
              <canvas
                ref={canvasRef}
                className={`block h-full w-full bg-transparent ${showRawVideo ? "opacity-0" : "opacity-100"}`}
              />
            </div>
          </div>,
          document.body
        )}
      <video
        ref={videoRef}
        src={WAKE_VIDEO_SRC}
        className={
          isWakeOpen && showRawVideo
            ? "fixed left-1/2 top-1/2 z-[1000] h-auto w-[85vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 opacity-100 pointer-events-none sm:w-[75vw]"
            : isWakeOpen
              ? "absolute inset-0 h-full w-full opacity-0 pointer-events-none"
              : "fixed -left-[9999px] top-0 h-px w-px opacity-0 pointer-events-none"
        }
        style={isWakeOpen && showRawVideo ? { aspectRatio: videoAspect ?? "16 / 9" } : undefined}
        width={videoSize?.width}
        height={videoSize?.height}
        playsInline
        muted
        onEnded={handleCloseWake}
        controls={false}
        preload="auto"
      />
    </>
  );
}
