import { Inter, JetBrains_Mono } from "next/font/google";
import type { Lang } from "@/lib/i18n";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import GlobalBackground from "./GlobalBackground";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  // Labels and code only — keep it off the critical path of the first paint.
  preload: false,
});

/** <html>/<body> shared by the English and Vietnamese root layouts. */
export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-transparent text-foreground">
        <GlobalBackground />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
