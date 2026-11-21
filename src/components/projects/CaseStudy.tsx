"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Boxes, Database, Gauge, GitPullRequestArrow, Lock, ShieldCheck } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import PipelineDiagram from "./PipelineDiagram";
import { localePath, type Localized } from "@/lib/i18n";
import { useLang } from "@/lib/use-lang";
import { CASE_STUDY_STACK } from "@/content/stack";

const EASE = [0.22, 1, 0.36, 1] as const;


const ICONS = [BarChart3, Database, Boxes, Gauge, ShieldCheck, GitPullRequestArrow];

const COPY: Localized<{
  production: string;
  featured: string;
  nda: string;
  title: string;
  lead: string;
  challengeLabel: string;
  challenge: string;
  roleLabel: string;
  role: string;
  metrics: { value: string; label: string }[];
  highlights: { title: string; body: string }[];
  readMore: string;
  privateNote: string;
}> = {
  en: {
    production: "● Production",
    featured: "Featured case study",
    nda: "Client under NDA",
    title: "E-commerce Command Center",
    lead: "The analytics backend behind a leadership dashboard for a multi-channel e-commerce brand — turning ads, sales, royalties and supply-chain data into one P&L and decision view.",
    challengeLabel: "Challenge",
    challenge:
      "Data arrives from many marketplaces through a CDC warehouse owned by another team, at different grains and with gaps. Leadership needs numbers they can trust, fast enough for daily decisions — including what is missing, not just what is there.",
    roleLabel: "My role",
    role: "Backend Engineer owning the analytics service end to end: API contracts, SQL and schema migrations, performance work, test strategy, deployment and hand-offs to the frontend and data teams.",
    metrics: [
      { value: "840+", label: "Java classes" },
      { value: "250+", label: "test classes" },
      { value: "30+", label: "ADRs" },
      { value: "Live", label: "in production" },
    ],
    highlights: [
      {
        title: "Multi-channel P&L engine",
        body: "One P&L across sales channels with source-line drill-down, comparison periods and explicit partial-data states — leaders see a gap, never a silent zero.",
      },
      {
        title: "Partition-aware SQL",
        body: "Hand-written JdbcClient SQL over range-partitioned fact tables. Every fact query carries a time predicate so PostgreSQL prunes partitions. No ORM on the read path.",
      },
      {
        title: "Inventory & supply health",
        body: "Days of cover, reorder points, open and in-production purchase orders, plus Selling Plan Excel imports (Apache POI) with row-level validation.",
      },
      {
        title: "Load-aware reads",
        body: "Reproduced concurrent dashboard loads on a production-sized copy, then designed admission control and shared reads so a busy morning degrades gracefully instead of failing.",
      },
      {
        title: "Quality gates",
        body: "Testcontainers PostgreSQL, ArchUnit layer rules, NullAway, Spotless and SQL-count regression tests guard every change.",
      },
      {
        title: "Contracts across teams",
        body: "30+ Architecture Decision Records, an API contract pack, OpenAPI docs and schema hand-off scripts for the data team that runs the warehouse.",
      },
    ],
    readMore: "Read the full case study",
    privateNote: "Source is private · architecture walkthrough on request",
  },
  vi: {
    production: "● Đang chạy production",
    featured: "Case study nổi bật",
    nda: "Khách hàng bảo mật (NDA)",
    title: "E-commerce Command Center",
    lead: "Backend phân tích dữ liệu đứng sau dashboard của ban lãnh đạo một thương hiệu thương mại điện tử đa kênh — gom dữ liệu quảng cáo, doanh số, bản quyền và chuỗi cung ứng thành một bức tranh P&L để ra quyết định.",
    challengeLabel: "Thách thức",
    challenge:
      "Dữ liệu đến từ nhiều sàn qua kho dữ liệu CDC do một team khác quản lý, mỗi nguồn một độ chi tiết và có chỗ thiếu. Lãnh đạo cần con số đáng tin, đủ nhanh để quyết định hằng ngày — và phải biết cả phần còn thiếu, không chỉ phần đang có.",
    roleLabel: "Vai trò của tôi",
    role: "Kỹ sư Backend phụ trách trọn vẹn service phân tích: hợp đồng API, SQL và migration schema, tối ưu hiệu năng, chiến lược kiểm thử, triển khai và bàn giao cho team Frontend và team Data.",
    metrics: [
      { value: "840+", label: "class Java" },
      { value: "250+", label: "class kiểm thử" },
      { value: "30+", label: "ADR" },
      { value: "Live", label: "production" },
    ],
    highlights: [
      {
        title: "P&L đa kênh",
        body: "Một P&L chung cho mọi kênh bán, xem chi tiết đến từng dòng nguồn, so sánh theo kỳ và trạng thái dữ liệu thiếu rõ ràng — lãnh đạo thấy chỗ trống, không bao giờ thấy một số 0 giả.",
      },
      {
        title: "SQL tận dụng partition",
        body: "SQL viết tay bằng JdbcClient trên bảng fact phân vùng theo thời gian. Mọi truy vấn fact đều có điều kiện thời gian để PostgreSQL bỏ qua partition không liên quan. Đường đọc không dùng ORM.",
      },
      {
        title: "Sức khỏe tồn kho & cung ứng",
        body: "Số ngày tồn kho đủ bán, điểm đặt hàng lại, đơn mua đang mở và đang sản xuất, cùng chức năng import Selling Plan từ Excel (Apache POI) kiểm tra từng dòng.",
      },
      {
        title: "Đọc dữ liệu chịu tải",
        body: "Tái hiện cảnh nhiều người mở dashboard cùng lúc trên bản sao dữ liệu cỡ production, rồi thiết kế cơ chế giới hạn tải và gộp lượt đọc trùng để giờ cao điểm chậm lại có kiểm soát thay vì báo lỗi.",
      },
      {
        title: "Cổng chất lượng",
        body: "Testcontainers PostgreSQL, quy tắc tầng bằng ArchUnit, NullAway, Spotless và test chặn số câu SQL tăng bất thường cho mọi thay đổi.",
      },
      {
        title: "Hợp đồng giữa các team",
        body: "Hơn 30 ADR, bộ hợp đồng API, tài liệu OpenAPI và script bàn giao schema cho team Data vận hành kho dữ liệu.",
      },
    ],
    readMore: "Đọc case study đầy đủ",
    privateNote: "Mã nguồn riêng tư · sẵn sàng trình bày kiến trúc khi phỏng vấn",
  },
};

export default function CaseStudy() {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <GlowCard beam className="overflow-hidden bg-[#07080d]/70">
      <div className="grid grid-cols-1 gap-10 p-7 md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              {t.production}
            </span>
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300">
              {t.featured}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-white/55">
              <Lock className="h-3 w-3" /> {t.nda}
            </span>
          </div>

          <h3 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{t.title}</h3>
          <p className="mb-8 text-lg text-white/60">{t.lead}</p>

          <div className="mb-8 space-y-5">
            <div>
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300/80">
                {t.challengeLabel}
              </span>
              <p className="text-sm leading-relaxed text-white/70">{t.challenge}</p>
            </div>
            <div>
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/80">
                {t.roleLabel}
              </span>
              <p className="text-sm leading-relaxed text-white/70">{t.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 * i }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <div className="text-gradient text-2xl font-bold">{m.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <PipelineDiagram />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border-t border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
        {t.highlights.map((h, i) => {
          const Icon = ICONS[i];
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
              <p className="text-sm leading-relaxed text-white/55">{h.body}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col gap-5 border-t border-white/[0.06] p-7 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {CASE_STUDY_STACK.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-white/65"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
          <Link
            href={localePath(lang, "/work/command-center")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.45)]"
          >
            {t.readMore}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="font-mono text-[11px] text-white/55">{t.privateNote}</p>
        </div>
      </div>
    </GlowCard>
  );
}
