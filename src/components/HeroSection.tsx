"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ParticleNetwork from "./hero/ParticleNetwork";
import TerminalCard from "./hero/TerminalCard";
import Magnetic from "./ui/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAME = "Hà Chí Thanh".normalize("NFC");

const ROLES = [
  "Backend Engineer",
  "Java & Spring Boot Developer",
  "Data-Intensive Systems Builder",
  "AI Systems Integrator",
];

const SOCIALS = [
  { href: "https://github.com/hachithanh-dev", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/thanhtech/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:hachithanh2005bh@gmail.com", icon: Mail, label: "Email" },
];

const HIGHLIGHTS = ["Java 21", "Spring Boot 4", "PostgreSQL", "Spring AI · RAG", "Docker · CI/CD"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-shimmer whitespace-nowrap font-medium"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleCanvas = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const words = NAME.split(" ");
  const wordOffsets = words.map((_, wi) =>
    words.slice(0, wi).reduce((n, w) => n + Array.from(w).length, 0)
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* Interactive network background */}
      <motion.div style={{ scale: scaleCanvas }} className="absolute inset-0 z-0">
        <ParticleNetwork className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_80%)]" />
      </motion.div>

      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[30%] top-[10%] z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)",
          animation: "float-orb-1 10s ease-in-out infinite",
        }}
      />

      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-32 pt-28 md:px-12 lg:grid-cols-12 lg:px-16 xl:px-24"
      >
        {/* Left — identity */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-1.5 text-xs font-medium text-emerald-300/90 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to backend opportunities
            <span className="hidden items-center gap-1 text-white/40 sm:inline-flex">
              <MapPin className="h-3 w-3" /> Ho Chi Minh City
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="mb-3 font-mono text-base tracking-wide text-white/45 md:text-lg"
          >
            Hi, I am
          </motion.p>

          <h1
            aria-label={NAME}
            className="mb-5 text-[3.4rem] font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.6rem] xl:text-[5.6rem]"
          >
            {words.map((word, wi) => (
              <span key={wi} aria-hidden="true" className="mr-[0.22em] inline-block whitespace-nowrap">
                {Array.from(word).map((char, ci) => {
                  const i = wordOffsets[wi] + ci;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: "0.6em", rotateX: -80, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: "0em", rotateX: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.45 + i * 0.05 }}
                      className="inline-block bg-gradient-to-b from-white via-sky-100 to-indigo-400/90 bg-clip-text pb-[0.08em] pt-[0.18em] text-transparent"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="mb-6 flex max-w-full items-baseline gap-x-3 text-xl font-light text-white/80 sm:text-2xl md:text-3xl xl:text-4xl"
          >
            <span className="text-white/35">&gt;</span>
            <RoleRotator />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
          >
            I design and ship production backends — from{" "}
            <span className="text-white/85">time-partitioned PostgreSQL analytics</span> that power
            business decisions to{" "}
            <span className="text-white/85">AI-powered RAG services</span>
            {" — with Java 21 & Spring Boot, tested and measured before they go live."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects");
                }}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.45)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">View My Work</span>
                <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="glass flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 font-medium text-white/90 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                Let&apos;s Connect <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>

            <div className="flex items-center gap-3 sm:ml-2">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — live code window */}
        <div className="hidden lg:col-span-5 lg:block">
          <TerminalCard />
        </div>
      </motion.div>

      {/* Tech highlights strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-20 left-0 right-0 z-10 hidden justify-center px-6 md:flex"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          {HIGHLIGHTS.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-sky-400/40">◆</span>}
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to about"
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/20 pt-2"
      >
        <motion.span
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-2 w-1 rounded-full bg-sky-300"
        />
      </motion.button>
    </section>
  );
}
