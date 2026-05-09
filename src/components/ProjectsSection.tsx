"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, GitBranch, ExternalLink } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface Project {
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "AI Chatbot System",
    subtitle: "Production-grade AI infrastructure with RAG pipeline",
    challenge:
      "Design a production-ready chatbot backend capable of handling multi-turn conversations with context-aware responses, real-time streaming, and secure multi-tenant access.",
    solution:
      "Architected a Spring Boot backend integrating Google Gemini via Spring AI, with Qdrant vector database for semantic retrieval (RAG). Implemented Redis Streams for real-time SSE delivery, JWT RS256 authentication, and a full Admin Dashboard for conversation management.",
    tech: ["Spring Boot", "Spring AI", "Gemini", "Qdrant", "Redis Streams", "React/Vite"],
    github: "https://github.com/hachithanh-dev/chatbot-ai-backend",
    featured: true,
  },
  {
    title: "Blog Platform",
    subtitle: "Clean architecture backend with optimized data layer",
    challenge:
      "Build a high-performance blog API emphasizing clean separation of concerns, efficient query patterns, and robust data integrity.",
    solution:
      "Implemented a multi-layer Spring Boot architecture with JPA/Hibernate, optimized N+1 query patterns, and designed a normalized data model supporting rich content management.",
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate"],
    github: "https://github.com/hachithanh-dev/blog",
    featured: false,
  },
  {
    title: "AI Chatbot Frontend",
    subtitle: "Modern real-time chat interface with SSE streaming",
    challenge:
      "Create a responsive chat frontend supporting real-time AI response streaming, authentication flows, and an admin management interface.",
    solution:
      "Built with Vite 7 + TypeScript, implementing Server-Sent Events for streaming responses, Google OAuth2 integration, Admin Dashboard with role-based access, and Dark/Light mode theming.",
    tech: ["TypeScript", "Vite", "React", "Tailwind"],
    github: "https://github.com/hachithanh-dev/chatbot-ai-frontend",
    featured: false,
  },
];

function SpotlightCard({ project, index }: { project: Project; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.1), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-[#0a0a0a]/70 border border-white/[0.06] overflow-hidden"
    >
      {/* Spotlight layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlight }}
      />

      <div
        className="relative p-8 md:p-10 flex flex-col gap-6 z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Header */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted/50 font-mono">{project.subtitle}</p>
        </div>

        {/* Challenge & Solution */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-mono block mb-1.5">
              Challenge
            </span>
            <p className="text-sm text-muted/70 leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-mono block mb-1.5">
              Solution
            </span>
            <p className="text-sm text-muted/70 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Tech Stack + Links */}
        <div className="mt-auto pt-4 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-muted/60 group-hover:border-primary/20 group-hover:text-muted/80 transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-muted/70 hover:text-white hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
            >
              <GitBranch className="w-4 h-4" />
              Source
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/15 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured)!;
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Featured <br />
            <span className="text-muted/50">Engineering Work.</span>
          </h2>
          <p className="text-muted/50 max-w-xl text-lg">
            Systems designed for resilience, scale, and real-world complexity.
          </p>
        </SectionReveal>

        {/* Featured Project — Full width */}
        <div className="mb-8 perspective-[2000px]">
          <SpotlightCard project={featured} index={0} />
        </div>

        {/* Secondary Projects — Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-[2000px]">
          {secondary.map((project, idx) => (
            <SpotlightCard key={project.title} project={project} index={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
