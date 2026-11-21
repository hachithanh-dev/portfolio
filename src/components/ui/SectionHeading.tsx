"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Numbered eyebrow + two-line title whose words rise in one by one. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  muted,
  description,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  muted?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const words = (text: string, offset: number, tone: string) =>
    text.split(" ").map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
        <motion.span
          className={cn("inline-block", tone)}
          initial={{ y: "110%", rotate: 4 }}
          whileInView={{ y: "0%", rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 * (i + offset) }}
        >
          {word}
          {" "}
        </motion.span>
      </span>
    ));

  const titleWords = title.split(" ").length;

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <motion.div
        initial={{ opacity: 0, x: align === "center" ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-sky-300/70",
          align === "center" && "justify-center"
        )}
      >
        <span className="text-white/55">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-sky-400/60 to-violet-400/60" />
        {eyebrow}
      </motion.div>
      <h2 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">
        {words(title, 0, "text-white")}
        {muted && (
          <>
            <br />
            {words(muted, titleWords, "text-white/40")}
          </>
        )}
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-white/50",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
