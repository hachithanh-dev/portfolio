"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#tech" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Show navbar after scrolling past hero (100vh)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > window.innerHeight * 0.85);
  });

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: "-100%" }}
        animate={{ y: visible ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 bg-[#050505]/70 backdrop-blur-2xl border border-white/[0.06]">
          {/* Logo — Terminal-style monogram */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 hover:opacity-100 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/[0.08] group-hover:border-primary/30 group-hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] transition-all duration-300">
              <span className="text-xs font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">&gt;_</span>
            </span>
            <span className="text-sm font-semibold tracking-tight text-white/70 group-hover:text-white/90 transition-colors hidden sm:inline">
              thanh<span className="text-primary/60">.dev</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? "text-white"
                    : "text-muted/60 hover:text-white/80"
                }`}
              >
                {activeSection === href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/70 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white/70"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white/70 origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mobileOpen && visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20, pointerEvents: "none" as const }}
        transition={{ duration: 0.3, ease: EASE }}
        className="fixed top-20 left-6 right-6 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-1"
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-all ${
              activeSection === href.slice(1)
                ? "text-white bg-white/[0.06]"
                : "text-muted/60 hover:text-white/80"
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>
    </>
  );
}
