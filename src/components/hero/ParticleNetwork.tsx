"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DISTANCE = 140;
const MOUSE_DISTANCE = 190;

/**
 * Canvas "distributed system" network: drifting nodes link to near neighbours and to the cursor.
 * Pauses when off-screen; draws a single static frame for reduced-motion users.
 */
export default function ParticleNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(95, Math.max(28, (width * height) / 15000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.3 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < 90) {
          p.x += (dx / d) * 0.8;
          p.y += (dy / d) * 0.8;
        }
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / LINK_DISTANCE) * 0.2})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_DISTANCE) {
          ctx.strokeStyle = `rgba(167,139,250,${(1 - dm / MOUSE_DISTANCE) * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE_DISTANCE;
        ctx.fillStyle = near ? "rgba(196,181,253,0.95)" : "rgba(147,197,253,0.65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r + 0.8 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion && visible) frame = requestAnimationFrame(draw);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduceMotion) draw();
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduceMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    });

    resize();
    draw();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
