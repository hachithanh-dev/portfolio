import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ha Chi Thanh - Backend Engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    kicker: "Open to backend roles",
    title: "Hà Chí Thanh",
    subtitle: "Backend Engineer · Production analytics backends and AI systems.",
  });
}
