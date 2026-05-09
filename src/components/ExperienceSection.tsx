"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import SectionReveal from "./SectionReveal";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const timelineData = [
  {
    type: "education",
    title: "Final-year SE Student",
    organization: "Industrial University of Ho Chi Minh City (IUH)",
    date: "2023 — Present",
    description:
      "Specializing in Software Engineering. Focused on Backend Systems, Software Architecture, and Database Design.",
    icon: GraduationCap,
  },
  {
    type: "experience",
    title: "Backend Engineer (Personal & Academic)",
    organization: "Self-Directed / IUH",
    date: "2023 — Present",
    description:
      "Built scalable architectures using Spring Boot, integrated Vector databases (Qdrant) with Gemini for RAG systems, and engineered event-driven microservices.",
    icon: Briefcase,
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Journey <br />
            <span className="text-muted/50">& Evolution.</span>
          </h2>
        </SectionReveal>

        <div className="relative">
          {/* Base line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-white/[0.06] rounded-full" />

          {/* Animated glowing line */}
          <motion.div
            className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 w-[1.5px] bg-gradient-to-b from-primary via-secondary to-primary rounded-full shadow-[0_0_8px_rgba(14,165,233,0.4)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center md:justify-between w-full ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_12px_rgba(14,165,233,0.2)]">
                    <Icon className="w-4 h-4 text-white/80" />
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="w-full ml-16 md:ml-0 md:w-[44%] glass p-8 rounded-2xl border-t border-l border-white/[0.04] hover:border-primary/15 transition-colors duration-500"
                  >
                    <span className="text-primary/70 text-xs font-mono tracking-wider mb-2 block">
                      {item.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                    <h4 className="text-white/45 font-medium text-sm mb-4">
                      {item.organization}
                    </h4>
                    <p className="text-muted/55 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
