"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiApachekafka,
  SiDocker,
  SiFlyway,
  SiGithubactions,
  SiGitlab,
  SiGooglegemini,
  SiGrafana,
  SiHibernate,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPrometheus,
  SiReact,
  SiRedis,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";
import { BrainCircuit, Database, Server, Wrench } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const groups = [
  {
    title: "Backend",
    icon: Server,
    color: "text-sky-300",
    items: [
      "Java 21+",
      "Spring Boot 3 & 4",
      "Spring Security",
      "OAuth2 Resource Server",
      "Spring Data JPA",
      "JdbcClient SQL",
      "REST · OpenAPI",
      "Bean Validation",
    ],
  },
  {
    title: "Data",
    icon: Database,
    color: "text-cyan-300",
    items: [
      "PostgreSQL",
      "Range partitioning",
      "Query plans & indexing",
      "Flyway",
      "Redis · Redis Streams",
      "Apache Kafka",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    title: "AI Systems",
    icon: BrainCircuit,
    color: "text-violet-300",
    items: ["Spring AI", "Google Gemini", "Agentic RAG", "Qdrant", "Cohere Rerank", "Tool Calling", "SSE streaming"],
  },
  {
    title: "Quality & Delivery",
    icon: Wrench,
    color: "text-emerald-300",
    items: [
      "JUnit 5",
      "Testcontainers",
      "ArchUnit",
      "NullAway",
      "Docker Compose",
      "GitLab CI · GitHub Actions",
      "Prometheus · Grafana",
      "Resilience4j · K6",
    ],
  },
];

type Logo = { name: string; icon: IconType; color: string };

const logosA: Logo[] = [
  { name: "Java", icon: SiOpenjdk, color: "#f89820" },
  { name: "Spring", icon: SiSpring, color: "#6db33f" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Spring Security", icon: SiSpringsecurity, color: "#6db33f" },
  { name: "Hibernate", icon: SiHibernate, color: "#bcae79" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "Flyway", icon: SiFlyway, color: "#cc0200" },
  { name: "Redis", icon: SiRedis, color: "#ff4438" },
  { name: "Kafka", icon: SiApachekafka, color: "#ffffff" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Gemini", icon: SiGooglegemini, color: "#8e75b2" },
];

const logosB: Logo[] = [
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "GitLab CI", icon: SiGitlab, color: "#fc6d26" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "Prometheus", icon: SiPrometheus, color: "#e6522c" },
  { name: "Grafana", icon: SiGrafana, color: "#f46800" },
  { name: "JUnit 5", icon: SiJunit5, color: "#25a162" },
  { name: "Swagger", icon: SiSwagger, color: "#85ea2d" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
];

function LogoMarquee({ logos, reverse, duration }: { logos: Logo[]; reverse?: boolean; duration: number }) {
  return (
    <div className={`marquee marquee-mask relative flex overflow-hidden ${reverse ? "marquee-reverse" : ""}`}>
      <div
        className="marquee-track flex w-max gap-4 py-2"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[...logos, ...logos].map(({ name, icon: Icon, color }, i) => (
          <div
            key={`${name}-${i}`}
            aria-hidden={i >= logos.length}
            className="group flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-sm text-white/55 transition-colors duration-300 hover:border-white/20 hover:text-white"
          >
            <Icon className="h-5 w-5 opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" style={{ color }} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section id="tech" className="relative w-full overflow-hidden py-32">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Tech"
          muted="Arsenal."
          description="Tools I use in production — chosen for correctness first, then measured for speed."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {groups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: gi * 0.08 }}
              >
                <GlowCard className="h-full p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${group.color}`} />
                    <h3 className="font-semibold text-white">{group.title}</h3>
                    <span className="ml-auto font-mono text-xs text-white/25">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 + gi * 0.08 } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, y: 8 },
                          visible: { opacity: 1, scale: 1, y: 0 },
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="cursor-default rounded-full border border-white/[0.07] bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-white/65 transition-colors duration-300 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3">
        <LogoMarquee logos={logosA} duration={45} />
        <LogoMarquee logos={logosB} duration={50} reverse />
      </div>
    </section>
  );
}
