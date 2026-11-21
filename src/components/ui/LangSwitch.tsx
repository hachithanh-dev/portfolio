"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { langFromPath, switchPath, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const OPTIONS: { lang: Lang; label: string; title: string }[] = [
  { lang: "en", label: "EN", title: "English" },
  { lang: "vi", label: "VI", title: "Tiếng Việt" },
];

/** EN/VI pill. Switching changes root layout, so it is a full page load (plain links). */
export default function LangSwitch({ className, id }: { className?: string; id: string }) {
  const pathname = usePathname() ?? "/";
  const current = langFromPath(pathname);

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-white/10 bg-black/40 p-0.5 font-mono text-[11px] backdrop-blur",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map(({ lang, label, title }) => {
        const active = lang === current;
        return (
          <Link
            key={lang}
            href={switchPath(pathname, lang)}
            hrefLang={lang}
            lang={lang}
            title={title}
            aria-current={active ? "page" : undefined}
            prefetch={false}
            className={cn(
              "relative rounded-full px-2.5 py-1 transition-colors duration-300",
              active ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/40 to-indigo-500/40 ring-1 ring-white/15"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
