"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Database, Server, ShieldCheck } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";
import { useT } from "@/lib/use-lang";

const EASE = [0.22, 1, 0.36, 1] as const;

const STYLE = [
  { icon: Server, accent: "from-sky-400/20 to-sky-400/0 text-sky-300", span: "md:col-span-2" },
  { icon: Database, accent: "from-cyan-400/20 to-cyan-400/0 text-cyan-300", span: "" },
  { icon: BrainCircuit, accent: "from-violet-400/20 to-violet-400/0 text-violet-300", span: "" },
  { icon: ShieldCheck, accent: "from-emerald-400/20 to-emerald-400/0 text-emerald-300", span: "md:col-span-2" },
];

const COPY = {
  en: {
    eyebrow: "About me",
    title: "Architecting",
    muted: "the Unseen.",
    intro: [
      "Backend Engineer and final-year Software Engineering student at the Industrial University of Ho Chi Minh City. I turn messy, multi-source business data into fast, trustworthy APIs — and I care as much about ",
      "how a system is verified",
      " as how it is built.",
    ],
    cards: [
      {
        title: "Production Backend",
        body: "Shipping a Spring Boot 4 analytics service in a Maven multi-module platform that leadership uses for daily P&L and inventory decisions.",
      },
      {
        title: "Data-Intensive Systems",
        body: "Range-partitioned PostgreSQL, partition-pruned SQL, Flyway migrations and a CDC-fed warehouse shared with a data team.",
      },
      {
        title: "AI Systems",
        body: "Agentic RAG with Spring AI, Gemini and Qdrant, real-time SSE streaming over Redis Streams.",
      },
      {
        title: "Quality & Resilience",
        body: "Testcontainers, ArchUnit and NullAway on every change; load reproduced on production-sized data before a fix is adopted; decisions written down as ADRs.",
      },
    ],
    facts: [
      { k: "Role", v: "Backend Engineer" },
      { k: "Focus", v: "Java · Spring · PostgreSQL" },
      { k: "Education", v: "Software Engineering, IUH" },
      { k: "Based in", v: "Ho Chi Minh City, VN" },
    ],
  },
  vi: {
    eyebrow: "Giới thiệu",
    title: "Kiến trúc",
    muted: "phía sau màn hình.",
    intro: [
      "Kỹ sư Backend, sinh viên năm cuối ngành Kỹ thuật Phần mềm tại Đại học Công nghiệp TP.HCM. Tôi biến dữ liệu kinh doanh rời rạc từ nhiều nguồn thành API nhanh và đáng tin cậy — và quan tâm đến ",
      "cách một hệ thống được kiểm chứng",
      " không kém gì cách nó được xây dựng.",
    ],
    cards: [
      {
        title: "Backend chạy production",
        body: "Phát triển service phân tích dữ liệu bằng Spring Boot 4 trong nền tảng Maven nhiều module, được ban lãnh đạo dùng hằng ngày để ra quyết định về P&L và tồn kho.",
      },
      {
        title: "Hệ thống dữ liệu lớn",
        body: "PostgreSQL phân vùng theo khoảng thời gian, SQL tận dụng partition pruning, Flyway migration và kho dữ liệu nạp qua CDC dùng chung với team Data.",
      },
      {
        title: "Hệ thống AI",
        body: "Agentic RAG với Spring AI, Gemini và Qdrant, stream câu trả lời thời gian thực qua SSE và Redis Streams.",
      },
      {
        title: "Chất lượng & độ bền",
        body: "Testcontainers, ArchUnit và NullAway cho mọi thay đổi; tái hiện tải trên dữ liệu cỡ production trước khi chọn cách sửa; ghi lại quyết định bằng ADR.",
      },
    ],
    facts: [
      { k: "Vai trò", v: "Kỹ sư Backend" },
      { k: "Trọng tâm", v: "Java · Spring · PostgreSQL" },
      { k: "Học vấn", v: "Kỹ thuật Phần mềm, IUH" },
      { k: "Nơi ở", v: "TP. Hồ Chí Minh" },
    ],
  },
};

export default function AboutSection() {
  const t = useT(COPY);

  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-5">
          <SectionHeading index="01" eyebrow={t.eyebrow} title={t.title} muted={t.muted} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/60"
          >
            {t.intro[0]}
            <span className="text-white/90">{t.intro[1]}</span>
            {t.intro[2]}
          </motion.p>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-5"
          >
            {t.facts.map((f) => (
              <motion.div
                key={f.k}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="border-l border-white/10 pl-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">{f.k}</dt>
                <dd className="mt-1 text-sm text-white/85">{f.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:col-span-7">
          {t.cards.map((card, idx) => {
            const { icon: Icon, accent, span } = STYLE[idx];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
                className={span}
              >
                <GlowCard className="group h-full p-7">
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} ring-1 ring-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{card.body}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
