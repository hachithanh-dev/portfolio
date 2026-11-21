import type { Localized } from "@/lib/i18n";

export interface PostMeta {
  slug: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  text: Localized<{ title: string; summary: string }>;
}

export const LOAD_LIMITS_POST: PostMeta = {
  slug: "load-limits-before-cache",
  date: "2026-11-21",
  readingMinutes: 7,
  tags: ["Spring Boot", "PostgreSQL", "Concurrency", "Caching"],
  text: {
    en: {
      title: "Limit load before you cache: keeping a dashboard up when everyone opens it at once",
      summary:
        "A busy morning turned a slow analytics dashboard into a wall of 503s. Why making each query faster was not enough, and how admission control, shared reads and a short cache fit together.",
    },
    vi: {
      title: "Giới hạn tải trước, cache sau: giữ dashboard ổn định khi mọi người cùng mở",
      summary:
        "Một buổi sáng đông người dùng biến dashboard phân tích vốn đã chậm thành một loạt lỗi 503. Vì sao chỉ tăng tốc từng truy vấn là chưa đủ, và giới hạn tải, gộp lượt đọc, cache ngắn hạn kết hợp với nhau thế nào.",
    },
  },
};

export const POSTS: PostMeta[] = [LOAD_LIMITS_POST];

export function postPath(slug: string) {
  return `/writing/${slug}`;
}

export function formatDate(iso: string, lang: "en" | "vi") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
