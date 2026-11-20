import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ha Chi Thanh | Backend Engineer",
  description:
    "Portfolio of Ha Chi Thanh — Backend Engineer building production analytics and AI systems with Java 21, Spring Boot and PostgreSQL.",
  keywords: [
    "Backend Engineer",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Data Engineering",
    "AI Systems",
    "Portfolio",
    "Ha Chi Thanh",
  ],
  authors: [{ name: "Ha Chi Thanh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hachithanh.dev",
    title: "Ha Chi Thanh | Backend Engineer",
    description:
      "Production analytics backends and AI systems with Java 21, Spring Boot & PostgreSQL. Explore my engineering portfolio.",
    siteName: "Ha Chi Thanh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ha Chi Thanh | Backend Engineer",
    description:
      "Building scalable AI systems with Java & Spring Boot.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-transparent text-foreground"
      >
        <GlobalBackground />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
