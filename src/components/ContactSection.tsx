"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUp, Check, Copy, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import GlowCard from "./ui/GlowCard";
import Magnetic from "./ui/Magnetic";

const EMAIL = "hachithanh2005bh@gmail.com";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "tech" },
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 pb-12 pt-32 md:px-12 lg:px-24">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <GlowCard beam className="overflow-hidden rounded-[2.5rem] bg-[#07080d]/60">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-3xl" />
            <div className="relative px-6 py-16 text-center md:px-20 md:py-20">
              <span className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-sky-300/70">
                <span className="text-white/30">06</span>
                <span className="h-px w-8 bg-gradient-to-r from-sky-400/60 to-violet-400/60" />
                Contact
              </span>

              <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
                Let&apos;s build <br />
                <span className="text-shimmer">the next big thing.</span>
              </h2>

              <p className="mx-auto mb-10 max-w-2xl text-base text-white/55 md:text-lg">
                Hiring for a backend role, or have a system that needs to scale? Let&apos;s talk.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-7 py-4 font-medium text-white transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.45)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Mail className="relative h-5 w-5" />
                    <span className="relative">Send an email</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass flex items-center gap-3 rounded-full border border-white/10 px-6 py-4 font-mono text-sm text-white/75 transition-all duration-300 hover:border-white/25 hover:text-white"
                >
                  <span className="max-w-[60vw] truncate">{EMAIL}</span>
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-4 w-4 text-emerald-400" />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="h-4 w-4 opacity-60" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="mt-6 h-5 font-mono text-xs text-emerald-300/80" aria-live="polite">
                {copied ? "Email copied to clipboard" : ""}
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/thanhtech/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/[0.08] px-5 py-2.5 text-sm text-white/60 transition-all duration-300 hover:border-[#0A66C2]/50 hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href="https://github.com/hachithanh-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/[0.08] px-5 py-2.5 text-sm text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-16 max-w-7xl border-t border-white/[0.05] pt-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Hà Chí Thanh. All rights reserved.</p>
            <p className="mt-1 font-mono text-xs text-white/25">Architecture first, code second.</p>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-white/40 transition-colors hover:text-white/80"
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-xs text-white/40 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/30">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </footer>
    </section>
  );
}
