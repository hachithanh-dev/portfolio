"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Segment = { t: string; c: string };

const KW = "text-violet-400";
const TYPE = "text-sky-300";
const STR = "text-emerald-300";
const FN = "text-amber-200";
const TXT = "text-white/80";
const CMT = "text-white/50";

const LINES: Segment[][] = [
  [{ t: "// Engineer.java", c: CMT }],
  [
    { t: "record ", c: KW },
    { t: "Engineer", c: TYPE },
    { t: "(String name,", c: TXT },
  ],
  [{ t: "                List<String> stack) {}", c: TXT }],
  [],
  [
    { t: "var ", c: KW },
    { t: "thanh = ", c: TXT },
    { t: "new ", c: KW },
    { t: "Engineer", c: TYPE },
    { t: "(", c: TXT },
  ],
  [
    { t: '    "Hà Chí Thanh"', c: STR },
    { t: ",", c: TXT },
  ],
  [
    { t: "    List.", c: TXT },
    { t: "of", c: FN },
    { t: "(", c: TXT },
    { t: '"Java 21"', c: STR },
    { t: ", ", c: TXT },
    { t: '"Spring Boot 4"', c: STR },
    { t: ",", c: TXT },
  ],
  [
    { t: '        "PostgreSQL"', c: STR },
    { t: ", ", c: TXT },
    { t: '"Spring AI"', c: STR },
    { t: "));", c: TXT },
  ],
  [],
  [
    { t: "thanh.", c: TXT },
    { t: "ship", c: FN },
    { t: "(", c: TXT },
    { t: "scalable", c: FN },
    { t: "(), ", c: TXT },
    { t: "tested", c: FN },
    { t: "(), ", c: TXT },
    { t: "observable", c: FN },
    { t: "());", c: TXT },
  ],
];

const TOTAL = LINES.reduce((sum, line) => sum + line.reduce((n, s) => n + s.t.length, 0) + 1, 0);

function Caret() {
  return <span className="caret ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-sky-300/80" />;
}

export default function TerminalCard() {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reduceMotion ? TOTAL : typed;
  const done = shown >= TOTAL;

  // 3D tilt following the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setTyped((n) => {
          if (n >= TOTAL) {
            clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, 18);
    }, 1100);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion]);

  // How many characters of each line are visible, and which line holds the caret.
  const layout: { visible: number; caret: boolean }[] = [];
  {
    let remaining = shown;
    let caretPlaced = false;
    for (const line of LINES) {
      const lineLength = line.reduce((n, s) => n + s.t.length, 0);
      const caret = !done && !caretPlaced && remaining <= lineLength;
      if (caret) caretPlaced = true;
      layout.push({ visible: Math.max(0, Math.min(remaining, lineLength)), caret });
      remaining -= lineLength + 1;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      {/* glow behind the window */}
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-fuchsia-500/20 blur-3xl" />

      <div className="float-soft">
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - rect.left) / rect.width - 0.5);
          my.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="border-beam glow-card overflow-hidden rounded-2xl bg-[#07080d]/85 shadow-2xl shadow-sky-950/40">
          {/* window chrome */}
          <div className="relative z-10 flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-white/55">Engineer.java</span>
            <span className="ml-auto rounded-md border border-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50">
              java 21
            </span>
          </div>

          {/* code */}
          <div className="relative z-10 flex gap-4 px-4 py-5 font-mono text-[13px] leading-[1.7]">
            <div className="select-none text-right text-white/50">
              {LINES.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              {LINES.map((line, li) => {
                const { visible, caret } = layout[li];
                let offset = 0;
                const segments = line.map((s, si) => {
                  const part = s.t.slice(0, Math.max(0, visible - offset));
                  offset += s.t.length;
                  return part ? (
                    <span key={si} className={s.c}>
                      {part}
                    </span>
                  ) : null;
                });
                return (
                  <div key={li} className="min-h-[1.7em] whitespace-pre">
                    {segments}
                    {caret && <Caret />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* build output */}
          <div className="relative z-10 border-t border-white/[0.06] bg-black/30 px-4 py-3 font-mono text-xs">
            <motion.div
              initial={false}
              animate={{ opacity: done ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              {done ? (
                <>
                  <span className="text-emerald-400">✓ BUILD SUCCESS</span>
                  <span className="text-white/55">· all checks passed · ready to ship</span>
                  <Caret />
                </>
              ) : (
                <span className="text-white/55">$ ./mvnw verify …</span>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}
