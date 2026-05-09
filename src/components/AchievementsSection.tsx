"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Code2, GitMerge, Users } from "lucide-react";
import SectionReveal from "./SectionReveal";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

const stats = [
  {
    icon: Code2,
    label: "Lines of Code",
    value: 10000,
    suffix: "+",
    color: "text-primary",
  },
  {
    icon: GitMerge,
    label: "Commits",
    value: 100,
    suffix: "+",
    color: "text-secondary",
  },
  {
    icon: Users,
    label: "Projects",
    value: 10,
    suffix: "+",
    color: "text-accent",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            By the Numbers
          </h2>
          <p className="text-muted/50 max-w-2xl mx-auto">
            Metrics that showcase the scale and dedication to my craft.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative p-8 rounded-2xl glass text-center overflow-hidden border border-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-white/[0.06] flex items-center justify-center mb-6 bg-[#0a0a0a]">
                    <Icon className={`w-5 h-5 ${stat.color} opacity-80`} />
                  </div>
                  <div className="text-3xl md:text-5xl font-bold tracking-tight mb-2 flex items-baseline">
                    <Counter from={0} to={stat.value} duration={2.5} />
                    <span className={`text-xl ${stat.color} opacity-70`}>{stat.suffix}</span>
                  </div>
                  <p className="text-muted/50 text-xs font-medium uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
