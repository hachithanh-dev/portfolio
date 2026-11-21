"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, CheckCircle2, Code2, GraduationCap } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";
import { useT } from "@/lib/use-lang";

const EASE = [0.22, 1, 0.36, 1] as const;

const ENTRIES = [
  {
    date: "2026 —",
    current: true,
    icon: Briefcase,
    tags: ["Java 21", "Spring Boot 4", "PostgreSQL", "Flyway", "Testcontainers", "Docker"],
  },
  {
    date: "2023 —",
    current: false,
    icon: Code2,
    tags: ["Spring AI", "Qdrant", "Redis Streams", "Kafka", "Docker"],
  },
  {
    date: "2023 —",
    current: false,
    icon: GraduationCap,
    tags: ["Software Architecture", "Databases", "Distributed Systems"],
  },
];

type Entry = { title: string; organization: string; description: string; highlights: string[] };

const COPY: Record<"en" | "vi", { eyebrow: string; title: string; muted: string; present: string; current: string; entries: Entry[] }> = {
  en: {
    eyebrow: "Experience",
    title: "Journey",
    muted: "& Evolution.",
    present: "Present",
    current: "Current",
    entries: [
      {
        title: "Backend Engineer",
        organization: "E-commerce Analytics Platform · client under NDA",
        description:
          "Own the analytics service of a multi-module Spring Boot platform behind the leadership command center of a multi-channel e-commerce brand.",
        highlights: [
          "Built P&L, KPI, trend and inventory APIs on range-partitioned PostgreSQL with hand-tuned, partition-pruned JdbcClient SQL.",
          "Reproduced concurrent dashboard loads on a production-sized copy and designed admission control and shared reads to keep the dashboard responsive.",
          "Shipped Selling Plan Excel imports and supply-chain health metrics (days of cover, reorder points, open purchase orders).",
          "Kept quality measurable: Testcontainers, ArchUnit, NullAway, SQL-count regression tests, 30+ ADRs, Docker + GitLab CI delivery.",
        ],
      },
      {
        title: "Backend Engineer — Personal & Academic",
        organization: "Self-directed · IUH",
        description: "Designed and built backend systems end to end to go deeper than coursework requires.",
        highlights: [
          "AI chatbot backend with Spring AI, Gemini and Qdrant (RAG), streaming answers over Redis Streams + SSE.",
          "JWT RS256 and Google OAuth2 authentication, admin dashboards and event-driven services.",
          "Observability and resilience experiments with Prometheus, Grafana, Resilience4j and K6 load tests.",
        ],
      },
      {
        title: "B.Eng. Software Engineering (final year)",
        organization: "Industrial University of Ho Chi Minh City (IUH)",
        description: "Focus on backend systems, software architecture and database design.",
        highlights: [],
      },
    ],
  },
  vi: {
    eyebrow: "Kinh nghiệm",
    title: "Hành trình",
    muted: "& phát triển.",
    present: "Nay",
    current: "Hiện tại",
    entries: [
      {
        title: "Kỹ sư Backend",
        organization: "Nền tảng phân tích thương mại điện tử · khách hàng bảo mật (NDA)",
        description:
          "Phụ trách service phân tích dữ liệu trong nền tảng Spring Boot nhiều module, phục vụ trung tâm điều hành của ban lãnh đạo một thương hiệu thương mại điện tử đa kênh.",
        highlights: [
          "Xây API cho P&L, KPI, xu hướng và tồn kho trên PostgreSQL phân vùng theo thời gian, SQL JdbcClient viết tay và tận dụng partition pruning.",
          "Tái hiện cảnh nhiều người mở dashboard cùng lúc trên bản sao dữ liệu cỡ production, thiết kế cơ chế giới hạn tải và gộp lượt đọc để dashboard luôn phản hồi.",
          "Hoàn thiện import Selling Plan từ Excel và các chỉ số sức khỏe chuỗi cung ứng (số ngày tồn kho, điểm đặt hàng lại, đơn mua đang mở).",
          "Giữ chất lượng đo được: Testcontainers, ArchUnit, NullAway, test chặn số câu SQL tăng bất thường, hơn 30 ADR, triển khai bằng Docker + GitLab CI.",
        ],
      },
      {
        title: "Kỹ sư Backend — Dự án cá nhân & học thuật",
        organization: "Tự học · IUH",
        description: "Tự thiết kế và xây dựng trọn vẹn các hệ thống backend để đi sâu hơn yêu cầu của môn học.",
        highlights: [
          "Backend chatbot AI với Spring AI, Gemini và Qdrant (RAG), stream câu trả lời qua Redis Streams + SSE.",
          "Xác thực JWT RS256 và Google OAuth2, trang quản trị và các service hướng sự kiện.",
          "Thực nghiệm giám sát và chịu lỗi với Prometheus, Grafana, Resilience4j và kiểm thử tải bằng K6.",
        ],
      },
      {
        title: "Kỹ sư Kỹ thuật Phần mềm (năm cuối)",
        organization: "Đại học Công nghiệp TP. Hồ Chí Minh (IUH)",
        description: "Tập trung vào hệ thống backend, kiến trúc phần mềm và thiết kế cơ sở dữ liệu.",
        highlights: [],
      },
    ],
  },
};

export default function ExperienceSection() {
  const t = useT(COPY);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className="relative w-full overflow-x-clip px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading index="04" eyebrow={t.eyebrow} title={t.title} muted={t.muted} className="mb-20" />

        <div ref={containerRef} className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/[0.07] md:left-[27px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-sky-400 via-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] md:left-[27px]"
          />

          <div className="flex flex-col gap-12">
            {ENTRIES.map((entry, index) => {
              const Icon = entry.icon;
              const item = t.entries[index];
              return (
                <div key={index} className="relative pl-14 md:pl-20">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 bg-[#0a0a0d] shadow-[0_0_16px_rgba(56,189,248,0.25)] md:h-14 md:w-14"
                  >
                    {entry.current && (
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
                        <span className="font-mono text-xs tracking-wider text-sky-300/85">
                          {entry.date} {t.present}
                        </span>
                        {entry.current && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                            {t.current}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white md:text-2xl">{item.title}</h3>
                      <h4 className="mb-4 mt-1 text-sm font-medium text-white/55">{item.organization}</h4>
                      <p className="text-sm leading-relaxed text-white/65">{item.description}</p>

                      {item.highlights.length > 0 && (
                        <ul className="mt-5 space-y-2.5">
                          {item.highlights.map((h, hi) => (
                            <motion.li
                              key={h}
                              initial={{ opacity: 0, x: 12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + hi * 0.08 }}
                              className="flex gap-3 text-sm leading-relaxed text-white/65"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400/75" />
                              <span>{h}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/60"
                          >
                            {tag}
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
