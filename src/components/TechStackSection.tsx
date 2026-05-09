"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const coreTech = [
  "Java 24", "C", "C++", "TypeScript", "JavaScript",
  "Spring Boot 3.5", "Spring Security", "Spring AI 1.1", "Spring Data JPA", "Hibernate",
];

const infrastructureTech = [
  "JWT RS256", "OAuth2", "Google OAuth2", "Docker", "Docker Compose",
  "GitHub Actions", "Nginx", "Prometheus", "Grafana", "Resilience4j",
  "Git", "K6", "IntelliJ IDEA", "Postman", "Apidog", "Flyway", "Vite",
];

const dataTech = [
  "Google Gemini", "Qdrant", "Cohere Rerank", "Agentic RAG", "Tool Calling",
  "PostgreSQL", "Redis", "MySQL", "SQL Server", "MongoDB", "Redis Streams", "Apache Kafka",
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  // For reduced motion, show static grid
  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-3 justify-center py-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="px-5 py-2.5 rounded-full glass text-white/60 text-sm font-medium tracking-wide"
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex overflow-hidden group">
      <motion.div
        className="flex whitespace-nowrap gap-3 py-3 pr-3 marquee-track"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="px-5 py-2.5 rounded-full glass text-white/55 text-sm font-medium tracking-wide hover:text-white/85 hover:border-primary/20 transition-all duration-300 cursor-default"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="relative w-full py-28 bg-transparent overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-14 text-center">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Tech Arsenal
          </h2>
          <p className="text-muted/50 max-w-2xl mx-auto">
            A curated selection of tools and technologies I use to build robust,
            scalable, and high-performance systems.
          </p>
        </SectionReveal>
      </div>

      <div className="flex flex-col gap-4 relative z-10 w-[110%] -ml-[5%]">
        <MarqueeRow items={coreTech} direction="left" speed={35} />
        <MarqueeRow items={infrastructureTech} direction="right" speed={45} />
        <MarqueeRow items={dataTech} direction="left" speed={40} />
      </div>
    </section>
  );
}
