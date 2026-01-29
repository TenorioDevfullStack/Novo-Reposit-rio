"use client";

import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const bgColorRef = useRef<[number, number, number] | null>(null);

  const handleClick = () => {
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
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!isWakeOpen || !video || !canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let stopped = false;

    const syncCanvasSize = () => {
      const width = video.videoWidth || 0;
      const height = video.videoHeight || 0;
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const renderFrame = () => {
      if (stopped) return;
      if (canvas.width === 0 || canvas.height === 0) {
        syncCanvasSize();
      }
      if (canvas.width === 0 || canvas.height === 0) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
      }
      bgColorRef.current = null;
      renderFrame();
    };

    video.addEventListener("loadeddata", handleLoaded);

    video.currentTime = 0;
    bgColorRef.current = null;
    void video.play().catch(() => {
      renderFrame();
    });

    scheduleNext();

    return () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, [isWakeOpen]);

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
        <img
          src={MASCOT_IMAGE_SRC}
          alt=""
          className="pointer-events-none h-full w-full object-cover"
          draggable={false}
        />
      </button>

      {isWakeOpen &&
        isMounted &&
        createPortal(
          <div className="fixed inset-0 z-[999] grid place-items-center bg-transparent p-4">
            <div
              className="relative w-[85vw] max-w-4xl overflow-hidden bg-transparent sm:w-[75vw]"
              style={{ aspectRatio: videoAspect ?? "16 / 9" }}
            >
              <canvas ref={canvasRef} className="block h-full w-full bg-transparent" />
              <video
                ref={videoRef}
                src={WAKE_VIDEO_SRC}
                className="absolute inset-0 h-full w-full opacity-0 pointer-events-none"
                playsInline
                muted
                onEnded={handleCloseWake}
                controls={false}
                preload="auto"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
