"use client";

import { motion } from "framer-motion";
import { Database, FileSpreadsheet, KeyRound, Layers, LayoutDashboard, Store, Workflow } from "lucide-react";
import { useT } from "@/lib/use-lang";

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  { icon: Store, tone: "text-amber-300" },
  { icon: Workflow, tone: "text-cyan-300" },
  { icon: Database, tone: "text-sky-300" },
  { icon: Layers, tone: "text-violet-300", mine: true },
  { icon: LayoutDashboard, tone: "text-emerald-300" },
];

const COPY = {
  en: {
    title: "Data flow",
    live: "live",
    me: "me",
    nodes: [
      { label: "Marketplaces · Ads · Royalties", note: "sales channels, ads, supply chain" },
      { label: "CDC data pipeline", note: "owned by the data team" },
      { label: "PostgreSQL warehouse", note: "range-partitioned fact tables" },
      { label: "Analytics API · Spring Boot 4", note: "my service — Java 21, JdbcClient" },
      { label: "Command Center UI", note: "P&L · KPIs · trends · inventory" },
    ],
    side: ["Excel plan imports", "OAuth2 / session auth"],
  },
  vi: {
    title: "Luồng dữ liệu",
    live: "trực tiếp",
    me: "tôi",
    nodes: [
      { label: "Sàn bán · Quảng cáo · Bản quyền", note: "kênh bán, quảng cáo, chuỗi cung ứng" },
      { label: "Pipeline dữ liệu CDC", note: "do team Data quản lý" },
      { label: "Kho dữ liệu PostgreSQL", note: "bảng fact phân vùng theo thời gian" },
      { label: "Analytics API · Spring Boot 4", note: "service của tôi — Java 21, JdbcClient" },
      { label: "Giao diện Command Center", note: "P&L · KPI · xu hướng · tồn kho" },
    ],
    side: ["Import kế hoạch từ Excel", "Xác thực OAuth2 / session"],
  },
};

function Connector() {
  return (
    <div className="relative ml-[22px] h-7 w-px overflow-hidden bg-white/10">
      <span className="flow-dot absolute left-0 top-0 h-3 w-px bg-gradient-to-b from-transparent via-sky-300 to-transparent" />
    </div>
  );
}

/** Vertical architecture diagram with a pulse travelling along each connector. */
export default function PipelineDiagram() {
  const t = useT(COPY);
  const sideIcons = [FileSpreadsheet, KeyRound];

  return (
    <figure className="h-full rounded-2xl border border-white/[0.06] bg-black/30 p-6">
      <figcaption className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
        <span>{t.title}</span>
        <span className="flex items-center gap-1.5 text-emerald-300/80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {t.live}
        </span>
      </figcaption>
      {NODES.map(({ icon: Icon, tone, mine }, i) => (
        <div key={i}>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 * i }}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
              mine
                ? "border-violet-400/40 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.18)]"
                : "border-white/[0.06] bg-white/[0.02]"
            }`}
          >
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
              <Icon className={`h-4 w-4 ${tone}`} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium leading-snug text-white/90">{t.nodes[i].label}</div>
              <div className="font-mono text-[11px] leading-snug text-white/50">{t.nodes[i].note}</div>
            </div>
            {mine && (
              <span className="ml-auto shrink-0 rounded-md bg-violet-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-violet-200">
                {t.me}
              </span>
            )}
          </motion.div>
          {i < NODES.length - 1 && <Connector />}
        </div>
      ))}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        {t.side.map((label, i) => {
          const Icon = sideIcons[i];
          return (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/55"
            >
              <Icon className="h-3 w-3" /> {label}
            </span>
          );
        })}
      </div>
    </figure>
  );
}
