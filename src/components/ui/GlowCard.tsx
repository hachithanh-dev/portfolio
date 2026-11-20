"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with a cursor-tracked glowing border and inner spotlight.
 * The pointer position is written to CSS variables, so no React re-render happens on move.
 */
export default function GlowCard({
  children,
  className,
  beam = false,
}: {
  children: React.ReactNode;
  className?: string;
  beam?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("glow-card rounded-2xl", beam && "border-beam", className)}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
