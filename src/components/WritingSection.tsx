"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import SectionHeading from "./ui/SectionHeading";
import { localePath } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";
import { POSTS, formatDate, postPath } from "@/content/posts";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  en: {
    eyebrow: "Writing",
    title: "Notes from",
    muted: "production.",
    description: "Engineering write-ups on the decisions behind the systems I build.",
    read: "Read article",
    minutes: "min read",
  },
  vi: {
    eyebrow: "Bài viết",
    title: "Ghi chép từ",
    muted: "production.",
    description: "Những bài viết kỹ thuật về các quyết định phía sau hệ thống tôi xây dựng.",
    read: "Đọc bài viết",
    minutes: "phút đọc",
  },
};

export default function WritingSection() {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <section id="writing" className="relative w-full px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          muted={t.muted}
          description={t.description}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6">
          {POSTS.map((post, i) => {
            const text = post.text[lang];
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              >
                <Link href={localePath(lang, postPath(post.slug))} className="group block">
                  <GlowCard className="p-7 md:p-10">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-violet-400/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <BookOpen className="h-6 w-6 text-sky-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                          <span className="text-white/50">/</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readingMinutes} {t.minutes}
                          </span>
                        </div>
                        <h3 className="mb-3 text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-sky-200 md:text-2xl">
                          {text.title}
                        </h3>
                        <p className="max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">{text.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-sky-300">
                        {t.read}
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 transition-all duration-300 group-hover:rotate-45 group-hover:bg-sky-400/10">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
