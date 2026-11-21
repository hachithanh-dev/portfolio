import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Case study: E-commerce Command Center";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    kicker: "Case study",
    title: "E-commerce Command Center",
    subtitle: "The analytics backend behind a leadership dashboard: architecture, decisions and trade-offs.",
  });
}
