import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Limit load before you cache";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    kicker: "Writing",
    title: "Limit load before you cache",
    subtitle: "Keeping a dashboard up when everyone opens it at once.",
  });
}
