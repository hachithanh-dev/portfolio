"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle2, Code2, GraduationCap } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const timeline = [
  {
    title: "Backend Engineer",
    organization: "E-commerce Analytics Platform · client under NDA",
    date: "2026 — Present",
    current: true,
    icon: Briefcase,
    description:
      "Own the analytics service of a multi-module Spring Boot platform behind the leadership command center of a multi-channel e-commerce brand.",
    highlights: [
      "Built P&L, KPI, trend and inventory APIs on range-partitioned PostgreSQL with hand-tuned, partition-pruned JdbcClient SQL.",
      "Profiled a production-volume copy, then fixed overload under concurrent page loads with bounded read gates and leaner queries.",
      "Shipped Selling Plan Excel imports and supply-chain health metrics (days of cover, reorder points, open purchase orders).",
      "Kept quality measurable: Testcontainers, ArchUnit, NullAway, SQL-count regression tests, 30+ ADRs, Docker + GitLab CI delivery.",
    ],
    tags: ["Java 21", "Spring Boot 4", "PostgreSQL", "Flyway", "Testcontainers", "Docker"],
  },
  {
    title: "Backend Engineer — Personal & Academic",
    organization: "Self-directed · IUH",
    date: "2023 — Present",
    current: false,
    icon: Code2,
    description:
      "Designed and built backend systems end to end to go deeper than coursework requires.",
    highlights: [
      "AI chatbot backend with Spring AI, Gemini and Qdrant (RAG), streaming answers over Redis Streams + SSE.",
      "JWT RS256 and Google OAuth2 authentication, admin dashboards and event-driven services.",
      "Observability and resilience experiments with Prometheus, Grafana, Resilience4j and K6 load tests.",
    ],
    tags: ["Spring AI", "Qdrant", "Redis Streams", "Kafka", "Docker"],
  },
  {
    title: "B.Eng. Software Engineering (final year)",
    organization: "Industrial University of Ho Chi Minh City (IUH)",
    date: "2023 — Present",
    current: false,
    icon: GraduationCap,
    description:
      "Focus on backend systems, software architecture and database design.",
    highlights: [],
    tags: ["Software Architecture", "Databases", "Distributed Systems"],
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className="relative w-full overflow-x-clip px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="04" eyebrow="Experience" title="Journey" muted="& Evolution." className="mb-20" />

        <div ref={containerRef} className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/[0.07] md:left-[27px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-sky-400 via-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] md:left-[27px]"
          />

          <div className="flex flex-col gap-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative pl-14 md:pl-20">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 bg-[#0a0a0d] shadow-[0_0_16px_rgba(56,189,248,0.25)] md:h-14 md:w-14"
                  >
                    {item.current && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-sky-400/40" />
                    )}
                    <Icon className="h-4 w-4 text-white/85 md:h-5 md:w-5" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ duration: 0.8, ease: EASE, delay: index * 0.05 }}
                  >
                    <GlowCard className="p-7 md:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs tracking-wider text-sky-300/80">{item.date}</span>
                        {item.current && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white md:text-2xl">{item.title}</h3>
                      <h4 className="mb-4 mt-1 text-sm font-medium text-white/45">{item.organization}</h4>
                      <p className="text-sm leading-relaxed text-white/60">{item.description}</p>

                      {item.highlights.length > 0 && (
                        <ul className="mt-5 space-y-2.5">
                          {item.highlights.map((h, hi) => (
                            <motion.li
                              key={h}
                              initial={{ opacity: 0, x: 12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + hi * 0.08 }}
                              className="flex gap-3 text-sm leading-relaxed text-white/60"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400/70" />
                              <span>{h}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
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
