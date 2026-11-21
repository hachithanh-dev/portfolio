/** Absolute site URL for metadata and OG images; set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const EMAIL = "hachithanh2005bh@gmail.com";
export const GITHUB = "https://github.com/hachithanh-dev";
export const LINKEDIN = "https://www.linkedin.com/in/thanhtech/";
