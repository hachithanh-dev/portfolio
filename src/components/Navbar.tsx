"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import LangSwitch from "./ui/LangSwitch";
import { langFromPath, localePath } from "@/lib/i18n";

const ITEMS = [
  { id: "about", en: "About", vi: "Giới thiệu" },
  { id: "tech", en: "Skills", vi: "Kỹ năng" },
  { id: "projects", en: "Work", vi: "Dự án" },
  { id: "experience", en: "Experience", vi: "Kinh nghiệm" },
  { id: "contact", en: "Contact", vi: "Liên hệ" },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);
  const isHome = pathname === "/" || pathname === "/vi";

  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const visible = !isHome || pastHero;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setPastHero(latest > window.innerHeight * 0.85);
  });

  // Scroll spy (home only)
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const linkClass = (id: string, mobile = false) => {
    const active = isHome && activeSection === id;
    if (mobile) {
      return `rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
        active ? "bg-white/[0.06] text-white" : "text-white/65 hover:text-white"
      }`;
    }
    return `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
      active ? "text-white" : "text-white/65 hover:text-white"
    }`;
  };

  const renderLink = (item: (typeof ITEMS)[number], mobile = false) => {
    const label = item[lang];
    const inner = (
      <>
        {!mobile && isHome && activeSection === item.id && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative">{label}</span>
      </>
    );

    if (isHome) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            setMobileOpen(false);
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={linkClass(item.id, mobile)}
        >
          {inner}
        </button>
      );
    }
    return (
      <Link
        key={item.id}
        href={localePath(lang, `/#${item.id}`)}
        onClick={() => setMobileOpen(false)}
        className={linkClass(item.id, mobile)}
      >
        {inner}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: visible ? "0%" : "-120%" }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-12 lg:px-24"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[#050505]/75 px-4 py-3 backdrop-blur-2xl md:px-6">
          <Link
            href={localePath(lang, "/")}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2 transition-all duration-300"
            aria-label="Hà Chí Thanh — home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-gradient-to-br from-primary/20 to-secondary/20 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_12px_rgba(14,165,233,0.2)]">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-mono text-xs font-bold text-transparent">
                &gt;_
              </span>
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-white/75 transition-colors group-hover:text-white sm:inline">
              thanh<span className="text-sky-300/80">.dev</span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">{ITEMS.map((item) => renderLink(item))}</div>

          <div className="flex items-center gap-3">
            <LangSwitch id="nav" />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 origin-center bg-white/70"
              />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] w-5 bg-white/70" />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 origin-center bg-white/70"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={
          mobileOpen && visible
            ? { opacity: 1, y: 0, pointerEvents: "auto" as const }
            : { opacity: 0, y: -20, pointerEvents: "none" as const }
        }
        transition={{ duration: 0.3, ease: EASE }}
        className="fixed left-4 right-4 top-20 z-50 flex flex-col gap-1 rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/95 p-4 backdrop-blur-2xl lg:hidden"
      >
        {ITEMS.map((item) => renderLink(item, true))}
      </motion.div>
    </>
  );
}
