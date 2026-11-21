import HomePage from "@/components/HomePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "vi",
  "/",
  "Hà Chí Thanh | Kỹ sư Backend",
  "Kỹ sư Backend xây dựng hệ thống phân tích dữ liệu và AI chạy production với Java 21, Spring Boot và PostgreSQL."
);

export default function Page() {
  return <HomePage />;
}
