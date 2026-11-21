"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { localePath } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface TocItem {
  id: string;
  title: string;
}

const LABELS = {
  en: { back: "Back to portfolio", toc: "On this page" },
  vi: { back: "Về trang portfolio", toc: "Nội dung" },
};

/** The last heading whose top has passed 35% of the viewport (robust to fast jumps). */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");
  useEffect(() => {
    const list = key.split("|");
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = list[0] ?? "";
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);
  return active;
}

/** Long-form page: header, sticky table of contents on wide screens, readable body. */
export default function ArticleLayout({
  eyebrow,
  title,
  lead,
  meta,
  tags,
  toc,
  backHash,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  meta: React.ReactNode;
  tags: string[];
  toc: TocItem[];
  backHash: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const lang = useLang();
  const labels = LABELS[lang];
  const active = useActiveHeading(toc.map((t) => t.id));

  return (
    <main className="relative w-full px-6 pb-24 pt-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href={localePath(lang, `/#${backHash}`)}
          className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          {labels.back}
        </Link>

        <header className="mb-14 max-w-3xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-sky-300/85">{eyebrow}</p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-white/65 md:text-xl">{lead}</p>
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs text-white/55">{meta}</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="prose-article min-w-0 max-w-3xl"
          >
            {children}
          </motion.article>

          <aside className="hidden xl:block">
            <nav className="sticky top-28" aria-label={labels.toc}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">{labels.toc}</p>
              <ul className="space-y-1 border-l border-white/[0.08]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-300 ${
                        active === item.id
                          ? "border-sky-400 text-white"
                          : "border-transparent text-white/50 hover:text-white/85"
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {footer && <div className="mt-20 max-w-3xl">{footer}</div>}
      </div>
    </main>
  );
}
