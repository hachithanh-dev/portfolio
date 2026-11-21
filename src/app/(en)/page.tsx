import HomePage from "@/components/HomePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "en",
  "/",
  "Hà Chí Thanh | Backend Engineer",
  "Backend Engineer building production analytics and AI systems with Java 21, Spring Boot and PostgreSQL."
);

export default function Page() {
  return <HomePage />;
}
