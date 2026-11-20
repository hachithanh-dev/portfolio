"use client";

import { motion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "scale";
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
