import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Social preview card (1200×630). Text stays in Latin-1 friendly English so the bundled
 * default font renders every glyph; Vietnamese pages reuse the same visual language.
 */
export function renderOg({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 85% 90%, rgba(139,92,246,0.30), transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "linear-gradient(135deg, rgba(14,165,233,0.35), rgba(139,92,246,0.35))",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {">_"}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.75)" }}>
            thanh<span style={{ color: "#7dd3fc" }}>.dev</span>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.4)",
              color: "#6ee7b7",
              fontSize: 20,
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 40 ? 60 : 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(180deg, #ffffff, #a5b4fc)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.7)", lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          {["Java 21", "Spring Boot 4", "PostgreSQL", "Spring AI"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
