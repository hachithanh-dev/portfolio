import CaseStudyPage, { CASE_STUDY_META } from "@/content/CaseStudyPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "/work/command-center", CASE_STUDY_META.en.title, CASE_STUDY_META.en.description);

export default function Page() {
  return <CaseStudyPage lang="en" />;
}
