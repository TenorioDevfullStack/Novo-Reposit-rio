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

export function FloatingMascot({ size = 180, className }: FloatingMascotProps) {
  const handleClick = () => {
    openChat();
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("ai-assistant:open"));
  };

  return (
    <button
      type="button"
      aria-label="Abrir chat com IA"
      onClick={handleClick}
      className={cn(
        "relative rounded-full overflow-hidden border border-border bg-transparent p-0 animate-float shadow-[0_14px_30px_rgba(0,0,0,0.35)]",
        className,
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
  );
}
