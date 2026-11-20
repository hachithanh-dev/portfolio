"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Database,
  FileSpreadsheet,
  Gauge,
  GitPullRequestArrow,
  KeyRound,
  Layers,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Store,
  Workflow,
} from "lucide-react";
import GlowCard from "../ui/GlowCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const pipeline = [
  { icon: Store, label: "Marketplaces · Ads · Royalties", note: "Amazon, KDP, supply chain", tone: "text-amber-300" },
  { icon: Workflow, label: "CDC data pipeline", note: "owned by the data team", tone: "text-cyan-300" },
  { icon: Database, label: "PostgreSQL warehouse", note: "range-partitioned fact tables", tone: "text-sky-300" },
  { icon: Layers, label: "Analytics API · Spring Boot 4", note: "my service — Java 21, JdbcClient", tone: "text-violet-300", mine: true },
  { icon: LayoutDashboard, label: "Command Center UI", note: "P&L · KPIs · trends · inventory", tone: "text-emerald-300" },
];

const sideInputs = [
  { icon: FileSpreadsheet, label: "Excel plan imports" },
  { icon: KeyRound, label: "OAuth2 / session auth" },
];

const highlights = [
  {
    icon: BarChart3,
    title: "Multi-channel P&L engine",
    body: "One P&L across sales channels with source-line drill-down, comparison periods and explicit partial-data states — leaders see a gap, never a silent zero.",
  },
  {
    icon: Database,
    title: "Partition-aware SQL",
    body: "Hand-written JdbcClient SQL over range-partitioned fact tables. Every fact query carries a time predicate so PostgreSQL prunes partitions. No ORM on the read path.",
  },
  {
    icon: Boxes,
    title: "Inventory & supply health",
    body: "Days of cover, reorder points, open and in-production purchase orders, plus Selling Plan Excel imports (Apache POI) with row-level validation.",
  },
  {
    icon: Gauge,
    title: "Measured performance",
    body: "Reproduced production load on a production-volume copy, then removed 503s under concurrent page loads with bounded read gates and shared reads — each option benchmarked first.",
  },
  {
    icon: ShieldCheck,
    title: "Quality gates",
    body: "Testcontainers PostgreSQL, ArchUnit layer rules, NullAway, Spotless and SQL-count regression tests guard every change.",
  },
  {
    icon: GitPullRequestArrow,
    title: "Contracts across teams",
    body: "30+ Architecture Decision Records, an API contract pack, OpenAPI docs and schema hand-off scripts for the data team that runs the warehouse.",
  },
];

const stack = [
  "Java 21",
  "Spring Boot 4",
  "Spring Security",
  "PostgreSQL",
  "JdbcClient",
  "Flyway",
  "Apache POI",
  "Testcontainers",
  "ArchUnit",
  "Docker",
  "GitLab CI",
  "OpenAPI",
];

const metrics = [
  { value: "840+", label: "Java classes" },
  { value: "250+", label: "test classes" },
  { value: "30+", label: "ADRs" },
  { value: "Live", label: "in production" },
];

function Connector() {
  return (
    <div className="relative ml-[22px] h-7 w-px overflow-hidden bg-white/10">
      <span className="flow-dot absolute left-0 top-0 h-3 w-px bg-gradient-to-b from-transparent via-sky-300 to-transparent" />
    </div>
  );
}

export default function CaseStudy() {
  return (
    <GlowCard beam className="overflow-hidden bg-[#07080d]/70">
      <div className="grid grid-cols-1 gap-10 p-7 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        {/* Story */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              ● Production
            </span>
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300">
              Featured case study
            </span>
            <span className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-white/45">
              <Lock className="h-3 w-3" /> Client under NDA
            </span>
          </div>

          <h3 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            E-commerce Command Center
          </h3>
          <p className="mb-8 text-lg text-white/55">
            The analytics backend behind a leadership dashboard for a multi-channel e-commerce brand —
            turning ads, sales, royalties and supply-chain data into one P&amp;L and decision view.
          </p>

          <div className="mb-8 space-y-5">
            <div>
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300/70">
                Challenge
              </span>
              <p className="text-sm leading-relaxed text-white/65">
                Data arrives from many marketplaces through a CDC warehouse owned by another team, at
                different grains and with gaps. Leadership needs numbers they can trust, fast enough for
                daily decisions — including what is missing, not just what is there.
              </p>
            </div>
            <div>
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/70">
                My role
              </span>
              <p className="text-sm leading-relaxed text-white/65">
                Backend Engineer owning the analytics service end to end: API contracts, SQL and schema
                migrations, performance work, test strategy, deployment and hand-offs to the frontend and
                data teams.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 * i }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <div className="text-gradient text-2xl font-bold">{m.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-white/[0.06] bg-black/30 p-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              <span>Data flow</span>
              <span className="flex items-center gap-1.5 text-emerald-300/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
              </span>
            </div>
            {pipeline.map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={node.label}>
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 * i }}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                      node.mine
                        ? "border-violet-400/40 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.18)]"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                      <Icon className={`h-4 w-4 ${node.tone}`} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-snug text-white/90">{node.label}</div>
                      <div className="font-mono text-[11px] leading-snug text-white/40">{node.note}</div>
                    </div>
                    {node.mine && (
                      <span className="ml-auto shrink-0 rounded-md bg-violet-400/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-violet-200">
                        me
                      </span>
                    )}
                  </motion.div>
                  {i < pipeline.length - 1 && <Connector />}
                </div>
              );
            })}
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
              {sideInputs.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/45"
                >
                  <Icon className="h-3 w-3" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-px border-t border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.div
              key={h.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.7, delay: 0.07 * i }}
              className="group bg-[#07080d] p-7 transition-colors duration-500 hover:bg-[#0b0d16]"
            >
              <Icon className="mb-4 h-5 w-5 text-sky-300/80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
              <h4 className="mb-2 font-semibold text-white">{h.title}</h4>
              <p className="text-sm leading-relaxed text-white/50">{h.body}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/[0.06] p-7 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="shrink-0 font-mono text-[11px] text-white/35">
          Source is private · architecture walkthrough on request
        </p>
      </div>
    </GlowCard>
  );
}
