"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useRef } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Hero-specific radiant spotlight */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[15%] left-[45%] -translate-x-1/2 w-[900px] h-[900px] rounded-full mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)",
            animation: "float-orb-1 8s ease-in-out infinite",
          }}
        />

        {/* Data flow lines — subtle infrastructure feel */}
        <div className="absolute top-[38%] left-0 right-0 overflow-hidden h-[1px] opacity-[0.06]">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{ animation: "data-flow 12s linear infinite" }}
          />
        </div>
        <div className="absolute top-[52%] left-0 right-0 overflow-hidden h-[1px] opacity-[0.04]">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
            style={{ animation: "data-flow 18s linear infinite reverse" }}
          />
        </div>
        <div className="absolute top-[66%] left-0 right-0 overflow-hidden h-[1px] opacity-[0.03]">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ animation: "data-flow 15s linear infinite" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex flex-col items-start text-left px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto"
      >
        {/* Greeting */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-base md:text-lg font-mono text-muted/50 tracking-wide mb-3"
        >
          Hi, I am
        </motion.span>

        {/* Name — largest, hero anchor */}
        <motion.h1
          initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 leading-none py-2 w-fit pr-4"
        >
          Hà Chí Thanh
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-white/85 mb-10 flex items-center gap-3 w-fit"
        >
          Backend Engineer
          <span className="w-[2px] h-7 md:h-9 bg-primary/70 animate-pulse" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] transition-all duration-500 text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 glass border border-white/10 rounded-full font-medium text-white/90 flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          >
            Let&apos;s Connect <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

      {/* Social icons — right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
        className="hidden md:flex absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-20"
      >
        {[
          { href: "https://github.com/hachithanh-dev", icon: FaGithub, hoverColor: "hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
          { href: "https://www.linkedin.com/in/thanhtech/", icon: FaLinkedinIn, hoverColor: "hover:text-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.25)]" },
          { href: "mailto:hachithanh2005bh@gmail.com", icon: Mail, hoverColor: "hover:text-red-400 hover:shadow-[0_0_15px_rgba(248,113,113,0.2)]" },
        ].map(({ href, icon: Icon, hoverColor }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className={`flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.06] bg-white/[0.02] text-muted/50 transition-all duration-300 hover:scale-110 hover:border-white/15 ${hoverColor}`}
          >
            <Icon className="w-[18px] h-[18px]" />
          </a>
        ))}
      </motion.div>

      {/* Stats bar — bottom, subtle credibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-20 left-0 right-0 z-10 flex justify-center"
      >
        <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted/35">
          {["Java Backend", "Spring Boot", "AI Systems", "Distributed Architecture"].map(
            (item, i) => (
              <span key={item} className="flex items-center gap-3 md:gap-6">
                {i > 0 && <span className="text-primary/30">·</span>}
                {item}
              </span>
            )
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
