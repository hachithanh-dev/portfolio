"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // Scroll-reactive: mesh gradient shifts vertically with scroll
  const meshY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  // Scroll-reactive: grid fades through sections
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.5, 0.75, 1],
    [0.06, 0.04, 0.015, 0.03, 0.015, 0.04]
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#050505] overflow-hidden pointer-events-none">

      {/* L2: Scroll-Reactive Gradient Mesh — tall div shifts up with scroll */}
      <motion.div
        style={{ y: isMobile || shouldReduceMotion ? 0 : meshY }}
        className="absolute inset-x-0 top-0 w-full"
        aria-hidden="true"
      >
        <div
          className="w-full"
          style={{
            height: "250vh",
            background: [
              "radial-gradient(ellipse 80% 60% at 25% 8%, rgba(59,130,246,0.12) 0%, transparent 55%)",
              "radial-gradient(ellipse 60% 50% at 70% 22%, rgba(99,102,241,0.07) 0%, transparent 50%)",
              "radial-gradient(ellipse 70% 60% at 35% 42%, rgba(6,182,212,0.11) 0%, transparent 55%)",
              "radial-gradient(ellipse 50% 40% at 65% 60%, rgba(139,92,246,0.07) 0%, transparent 50%)",
              "radial-gradient(ellipse 70% 50% at 40% 82%, rgba(59,130,246,0.09) 0%, transparent 55%)",
            ].join(", "),
          }}
        />
      </motion.div>

      {/* L2b: Ambient Orbs — CSS-animated for GPU performance */}
      {!isMobile && !shouldReduceMotion && (
        <div className="absolute inset-0 opacity-25" aria-hidden="true">
          <div
            className="absolute top-[5%] left-[15%] w-[45vw] h-[45vw] rounded-full mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
              animation: "float-orb-1 25s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
              animation: "float-orb-2 30s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute bottom-[15%] left-[30%] w-[30vw] h-[30vw] rounded-full mix-blend-screen"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
              animation: "float-orb-3 35s ease-in-out infinite",
              willChange: "transform",
            }}
          />
        </div>
      )}

      {/* Mobile fallback: static gradient mesh */}
      {(isMobile || shouldReduceMotion) && (
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.12) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 40%, rgba(99,102,241,0.08) 0%, transparent 45%)",
              "radial-gradient(circle at 40% 75%, rgba(6,182,212,0.08) 0%, transparent 50%)",
            ].join(", "),
          }}
        />
      )}

      {/* L3: Infrastructure Grid — scroll-reactive opacity */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gridOpacity }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at center, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* L4: Cinematic Grain — static, high-quality */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
