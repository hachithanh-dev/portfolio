import CaseStudyPage, { CASE_STUDY_META } from "@/content/CaseStudyPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("vi", "/work/command-center", CASE_STUDY_META.vi.title, CASE_STUDY_META.vi.description);

export default function Page() {
  return <CaseStudyPage lang="vi" />;
}
