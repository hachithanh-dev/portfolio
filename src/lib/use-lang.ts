"use client";

import { usePathname } from "next/navigation";
import { langFromPath, type Lang, type Localized } from "./i18n";

export function useLang(): Lang {
  return langFromPath(usePathname());
}

export function useT<T>(content: Localized<T>): T {
  return content[useLang()];
}
