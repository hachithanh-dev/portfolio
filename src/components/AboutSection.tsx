"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Database, Server, ShieldCheck } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    icon: Server,
    title: "Production Backend",
    description:
      "Shipping a Spring Boot 4 analytics service in a Maven multi-module platform that leadership uses for daily P&L and inventory decisions.",
    accent: "from-sky-400/20 to-sky-400/0 text-sky-300",
    span: "md:col-span-2",
  },
  {
    icon: Database,
    title: "Data-Intensive Systems",
    description:
      "Range-partitioned PostgreSQL, partition-pruned SQL, Flyway migrations and a CDC-fed warehouse shared with a data team.",
    accent: "from-cyan-400/20 to-cyan-400/0 text-cyan-300",
    span: "",
  },
  {
    icon: BrainCircuit,
    title: "AI Systems",
    description:
      "Agentic RAG with Spring AI, Gemini and Qdrant, real-time SSE streaming over Redis Streams.",
    accent: "from-violet-400/20 to-violet-400/0 text-violet-300",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Resilience",
    description:
      "Testcontainers, ArchUnit and NullAway on every change; load measured on production-sized data before a fix is adopted; decisions written down as ADRs.",
    accent: "from-emerald-400/20 to-emerald-400/0 text-emerald-300",
    span: "md:col-span-2",
  },
];

const facts = [
  { k: "Role", v: "Backend Engineer" },
  { k: "Focus", v: "Java · Spring · PostgreSQL" },
  { k: "Education", v: "Software Engineering, IUH" },
  { k: "Based in", v: "Ho Chi Minh City, VN" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-5">
          <SectionHeading index="01" eyebrow="About me" title="Architecting" muted="the Unseen." />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/55"
          >
            Backend Engineer and final-year Software Engineering student at the Industrial
            University of Ho Chi Minh City. I turn messy, multi-source business data into fast,
            trustworthy APIs — and I care as much about{" "}
            <span className="text-white/85">how a system is verified</span> as how it is built.
          </motion.p>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-5"
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="border-l border-white/10 pl-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{f.k}</dt>
                <dd className="mt-1 text-sm text-white/80">{f.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:col-span-7">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
                className={card.span}
              >
                <GlowCard className="group h-full p-7">
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} ring-1 ring-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{card.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
