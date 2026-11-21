"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { FileText, FolderGit2, GitCommitHorizontal, TestTube2 } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";
import { useT } from "@/lib/use-lang";

function Counter({ to, duration = 2.2 }: { to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (nodeRef.current) nodeRef.current.textContent = Math.round(value).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [to, duration, inView]);

  return <span ref={nodeRef}>0</span>;
}

const STATS = [
  { icon: GitCommitHorizontal, value: 380, color: "text-sky-300" },
  { icon: TestTube2, value: 250, color: "text-emerald-300" },
  { icon: FileText, value: 30, color: "text-violet-300" },
  { icon: FolderGit2, value: 10, color: "text-amber-300" },
];

const COPY = {
  en: {
    eyebrow: "Impact",
    title: "By the",
    muted: "Numbers.",
    stats: [
      { label: "Commits", detail: "to a production analytics platform" },
      { label: "Test classes", detail: "unit, slice & Testcontainers integration" },
      { label: "ADRs", detail: "architecture decisions written down" },
      { label: "Projects", detail: "backend, AI & full-stack builds" },
    ],
  },
  vi: {
    eyebrow: "Dấu ấn",
    title: "Những",
    muted: "con số.",
    stats: [
      { label: "Commit", detail: "cho một nền tảng phân tích đang chạy production" },
      { label: "Class kiểm thử", detail: "unit, slice & tích hợp với Testcontainers" },
      { label: "ADR", detail: "quyết định kiến trúc được ghi lại" },
      { label: "Dự án", detail: "backend, AI & full-stack" },
    ],
  },
};

export default function AchievementsSection() {
  const t = useT(COPY);

  return (
    <section id="achievements" className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading index="06" eyebrow={t.eyebrow} title={t.title} muted={t.muted} align="center" className="mb-16" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const text = t.stats[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: 25 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 800 }}
              >
                <GlowCard className="group h-full p-8 text-center">
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#0a0a0d] transition-transform duration-500 group-hover:scale-110">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="mb-2 flex items-baseline justify-center text-5xl font-bold tracking-tight text-white">
                    <Counter to={stat.value} />
                    <span className={`text-2xl ${stat.color}`}>+</span>
                  </div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70">{text.label}</p>
                  <p className="text-xs text-white/50">{text.detail}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
