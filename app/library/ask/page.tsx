/**
 * Ask the Library — the grounded surface.
 *
 * Answers come only from the curated books, and the backend refuses when they
 * do not cover the question. That refusal is the feature: it is what makes a
 * citation here worth trusting.
 *
 * This route was a redirect stub for a while. It is a page again because the
 * product has two genuinely different assistants, not one assistant at two
 * paths — see lib/ai/modes.ts.
 */
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AiWorkspace = dynamic(() => import("@/components/ai/ai-workspace").then((m) => m.AiWorkspace));

export const metadata: Metadata = {
  title: "שאל את הספרייה — תשובות ממקורות מאומתים | SAP by Sali",
  description:
    "שאלות ותשובות על ספריית ה-SAP שלך: תשובות מבוססות ספרים בלבד, עם הפניה מדויקת לספר, לפרק ולסעיף. SAP by Sali · Project NEO.",
};

export default function AskLibraryPage() {
  return <AiWorkspace mode="library" />;
}
