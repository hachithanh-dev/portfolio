"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import CaseStudy from "./projects/CaseStudy";
import SectionHeading from "./ui/SectionHeading";
import { useT } from "@/lib/use-lang";
import { GITHUB } from "@/lib/site";

interface Project {
  index: string;
  title: string;
  tech: string[];
  github: string;
  demo?: string;
  accent: string;
}

interface ProjectText {
  subtitle: string;
  challenge: string;
  solution: string;
}

const projects: Project[] = [
  {
    index: "02",
    title: "AI Chatbot System",
    tech: ["Spring Boot", "Spring AI", "Gemini", "Qdrant", "Redis Streams", "JWT RS256"],
    github: "https://github.com/hachithanh-dev/chatbot-ai-backend",
    accent: "56,189,248",
  },
  {
    index: "03",
    title: "AI Chatbot Frontend",
    tech: ["TypeScript", "Vite", "React", "Tailwind", "OAuth2"],
    github: "https://github.com/hachithanh-dev/chatbot-ai-frontend",
    accent: "167,139,250",
  },
  {
    index: "04",
    title: "Blog Platform",
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate"],
    github: "https://github.com/hachithanh-dev/blog",
    accent: "45,212,191",
  },
];

const COPY = {
  en: {
    eyebrow: "Selected work",
    title: "Featured",
    muted: "Engineering Work.",
    description: "Systems built for real users, real data and real failure modes.",
    challenge: "Challenge",
    solution: "Solution",
    source: "Source code",
    demo: "Live demo",
    more: "More on GitHub",
    projects: [
      {
        subtitle: "AI backend with a RAG pipeline",
        challenge:
          "A chatbot backend for multi-turn conversations with context-aware answers, real-time streaming and secure multi-tenant access.",
        solution:
          "Spring Boot + Spring AI on Google Gemini, Qdrant for semantic retrieval (RAG), Redis Streams feeding SSE, JWT RS256 authentication and an admin dashboard for conversation management.",
      },
      {
        subtitle: "Real-time chat interface with SSE streaming",
        challenge:
          "A responsive chat client that streams AI responses token by token, with auth flows and an admin interface.",
        solution:
          "Vite + TypeScript with Server-Sent Events, Google OAuth2 sign-in, a role-based admin dashboard and dark/light theming.",
      },
      {
        subtitle: "Clean-architecture backend with an optimized data layer",
        challenge:
          "A blog API that keeps concerns separated, queries efficient and data consistent as content grows.",
        solution:
          "Layered Spring Boot architecture on JPA/Hibernate with N+1 queries removed and a normalized data model for rich content management.",
      },
    ] as ProjectText[],
  },
  vi: {
    eyebrow: "Dự án tiêu biểu",
    title: "Những dự án",
    muted: "kỹ thuật nổi bật.",
    description: "Hệ thống xây cho người dùng thật, dữ liệu thật và những tình huống lỗi thật.",
    challenge: "Thách thức",
    solution: "Giải pháp",
    source: "Mã nguồn",
    demo: "Bản demo",
    more: "Xem thêm trên GitHub",
    projects: [
      {
        subtitle: "Backend AI với pipeline RAG",
        challenge:
          "Backend chatbot hỗ trợ hội thoại nhiều lượt, trả lời theo ngữ cảnh, stream thời gian thực và phân quyền an toàn cho nhiều người dùng.",
        solution:
          "Spring Boot + Spring AI trên Google Gemini, Qdrant cho truy xuất ngữ nghĩa (RAG), Redis Streams đẩy dữ liệu qua SSE, xác thực JWT RS256 và trang quản trị hội thoại.",
      },
      {
        subtitle: "Giao diện chat thời gian thực với SSE",
        challenge:
          "Ứng dụng chat responsive hiển thị câu trả lời AI theo từng token, có luồng đăng nhập và giao diện quản trị.",
        solution:
          "Vite + TypeScript dùng Server-Sent Events, đăng nhập Google OAuth2, trang quản trị theo vai trò và giao diện sáng/tối.",
      },
      {
        subtitle: "Backend kiến trúc sạch với tầng dữ liệu tối ưu",
        challenge:
          "API blog tách bạch trách nhiệm, truy vấn hiệu quả và dữ liệu nhất quán khi nội dung tăng dần.",
        solution:
          "Kiến trúc Spring Boot phân tầng trên JPA/Hibernate, loại bỏ truy vấn N+1 và mô hình dữ liệu chuẩn hóa cho quản lý nội dung.",
      },
    ] as ProjectText[],
  },
};

type Labels = { challenge: string; solution: string; source: string; demo: string };

function ProjectCard({
  project,
  text,
  labels,
  index,
}: {
  project: Project;
  text: ProjectText;
  labels: Labels;
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(${project.accent},0.14), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    tiltX.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    tiltY.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0d]/75 transition-colors duration-500 hover:border-white/15"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 flex flex-1 flex-col gap-6 p-7 md:p-8" style={{ transform: "translateZ(24px)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="mb-3 block font-mono text-xs text-white/55">{project.index}</span>
            <h3 className="mb-1 text-xl font-bold tracking-tight text-white md:text-2xl">{project.title}</h3>
            <p className="font-mono text-xs text-white/55">{text.subtitle}</p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — ${labels.source}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="space-y-4">
          <div>
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300/75">
              {labels.challenge}
            </span>
            <p className="text-sm leading-relaxed text-white/65">{text.challenge}</p>
          </div>
          <div>
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/75">
              {labels.solution}
            </span>
            <p className="text-sm leading-relaxed text-white/65">{text.solution}</p>
          </div>
        </div>

        <div className="mt-auto border-t border-white/[0.05] pt-5">
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/60 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <FaGithub className="h-4 w-4" />
              {labels.source}
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-300 transition-all duration-300 hover:bg-sky-400/15"
              >
                <ExternalLink className="h-4 w-4" />
                {labels.demo}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const t = useT(COPY);

  return (
    <section id="projects" className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow={t.eyebrow}
          title={t.title}
          muted={t.muted}
          description={t.description}
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <CaseStudy />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 perspective-[2000px] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              text={t.projects[idx]}
              labels={t}
              index={idx}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 font-mono text-sm text-white/55 transition-colors hover:text-white"
          >
            <FaGithub className="h-4 w-4" />
            {t.more}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
