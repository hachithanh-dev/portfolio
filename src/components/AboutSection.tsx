"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Database } from "lucide-react";
import SectionReveal from "./SectionReveal";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const cards = [
  {
    icon: Server,
    title: "Backend Engineering",
    description: "Specializing in Java & Spring Boot. Designing multi-layer architectures and robust APIs.",
    color: "text-primary",
    delay: 0.1,
  },
  {
    icon: Cpu,
    title: "AI Systems",
    description: "Integrating LLMs with Agentic RAG, Qdrant vector databases, and real-time streaming architectures.",
    color: "text-secondary",
    delay: 0.2,
  },
  {
    icon: Database,
    title: "Resilience & Scalability",
    description: "Event-driven communication with Redis Streams. Fault tolerance with Circuit Breakers and Bulkheads.",
    color: "text-accent",
    delay: 0.3,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left Column */}
        <SectionReveal className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Architecting <br />
            <span className="text-muted/50">the Unseen.</span>
          </h2>
          <p className="text-lg text-muted/60 leading-relaxed max-w-md">
            I am a Final-year Software Engineering student at Industrial University of Ho Chi Minh City (IUH). My obsession lies in building scalable, resilient systems that power modern applications.
          </p>
        </SectionReveal>

        {/* Right Column — Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 relative">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE, delay: card.delay }}
                className={`glass p-8 rounded-2xl border-t border-l border-white/[0.06] hover:border-white/10 transition-colors duration-500 ${
                  idx === 2 ? "md:col-span-2" : idx === 0 ? "md:mt-8" : ""
                }`}
              >
                <Icon className={`w-7 h-7 ${card.color} mb-5 opacity-80`} />
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-muted/55 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
