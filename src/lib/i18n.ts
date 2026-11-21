// Pure locale helpers, safe in server components and metadata. Hooks live in ./use-lang.

export type Lang = "en" | "vi";

export type Localized<T> = Record<Lang, T>;

/** English lives at "/", Vietnamese under "/vi". */
export function langFromPath(pathname: string | null): Lang {
  return pathname === "/vi" || pathname?.startsWith("/vi/") ? "vi" : "en";
}

/** Prefix an internal path ("/work/x", "/#about") for the given language. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return "/vi";
  if (path.startsWith("/#")) return `/vi${path.slice(1)}`;
  return `/vi${path}`;
}

/** The same page in the other language. */
export function switchPath(pathname: string, to: Lang): string {
  const bare = pathname === "/vi" ? "/" : pathname.startsWith("/vi/") ? pathname.slice(3) : pathname;
  return localePath(to, bare);
}
