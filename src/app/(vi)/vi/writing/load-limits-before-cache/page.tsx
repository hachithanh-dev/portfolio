import LoadLimitsPostPage from "@/content/LoadLimitsPostPage";
import { LOAD_LIMITS_POST, postPath } from "@/content/posts";
import { pageMetadata } from "@/lib/metadata";

const text = LOAD_LIMITS_POST.text.vi;

export const metadata = pageMetadata("vi", postPath(LOAD_LIMITS_POST.slug), text.title, text.summary);

export default function Page() {
  return <LoadLimitsPostPage lang="vi" />;
}
