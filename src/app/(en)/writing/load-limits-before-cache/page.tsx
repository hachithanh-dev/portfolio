import LoadLimitsPostPage from "@/content/LoadLimitsPostPage";
import { LOAD_LIMITS_POST, postPath } from "@/content/posts";
import { pageMetadata } from "@/lib/metadata";

const text = LOAD_LIMITS_POST.text.en;

export const metadata = pageMetadata("en", postPath(LOAD_LIMITS_POST.slug), text.title, text.summary);

export default function Page() {
  return <LoadLimitsPostPage lang="en" />;
}
