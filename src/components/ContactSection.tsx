"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import SectionReveal from "./SectionReveal";

const NAV_ITEMS = ["About", "Tech", "Projects", "Experience", "Contact"];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionReveal>
          <div className="glass rounded-[2.5rem] p-12 md:p-20 text-center border border-white/[0.06] relative overflow-hidden group">
            {/* Subtle gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 relative z-10">
              Let&apos;s build <br />
              <span className="text-gradient">the next big thing.</span>
            </h2>

            <p className="text-base md:text-lg text-muted/55 max-w-2xl mx-auto mb-10 relative z-10">
              Whether you have a vision to scale or a complex system to architect, I&apos;m ready to bring it to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href="mailto:hachithanh2005bh@gmail.com"
                className="group/btn px-8 py-4 glass border border-white/10 rounded-full font-medium text-white/90 flex items-center gap-3 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-primary/70" />
                <span>hachithanh2005bh@gmail.com</span>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
              </a>

              <a
                href="https://www.linkedin.com/in/thanhtech/"
                target="_blank"
                rel="noreferrer"
                className="group/btn px-8 py-4 glass border border-white/[0.06] rounded-full font-medium text-white/70 flex items-center gap-3 hover:text-[#0A66C2] hover:border-[#0A66C2]/20 transition-all duration-300"
              >
                <FaLinkedinIn className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted/35 text-sm">
              © {new Date().getFullYear()} Ha Chi Thanh. All rights reserved.
            </p>
            <p className="text-muted/25 text-xs mt-1 font-mono">
              Architecture first, code second.
            </p>
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs text-muted/35 hover:text-muted/70 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hachithanh-dev"
              target="_blank"
              rel="noreferrer"
              className="text-muted/30 hover:text-white/60 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/thanhtech/"
              target="_blank"
              rel="noreferrer"
              className="text-muted/30 hover:text-[#0A66C2]/60 transition-colors"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
