import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { localePath } from "./i18n";
import { SITE_URL } from "./site";

/**
 * Page metadata with canonical + hreflang alternates.
 * `path` is the English path ("/", "/work/command-center"); the Vietnamese one is derived.
 */
export function pageMetadata(lang: Lang, path: string, title: string, description: string): Metadata {
  const url = localePath(lang, path);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: "Hà Chí Thanh" }],
    alternates: {
      canonical: url,
      languages: { en: path, vi: localePath("vi", path) },
    },
    openGraph: {
      type: path === "/" ? "website" : "article",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      url,
      title,
      description,
      siteName: "Hà Chí Thanh",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
