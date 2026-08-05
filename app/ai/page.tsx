import dynamic from "next/dynamic";
import type { Metadata } from "next";

// The workspace is interactive-only and pulls the scope tree; keeping it out of
// the server bundle avoids shipping it to anyone who never opens the page.
const AiWorkspace = dynamic(() => import("@/components/ai/ai-workspace").then((m) => m.AiWorkspace));

export const metadata: Metadata = {
  title: "שאל את הספרייה — NEO AI",
  description:
    "שאלות ותשובות מבוססות מקורות על ספריית SAP: בחירת ספר, פרק וסעיף, תשובות עם הפניה מדויקת לפרק ולסעיף. SAP by Sali · Project NEO.",
  openGraph: {
    title: "SAP by Sali | שאל את הספרייה — NEO AI",
    description: "תשובות מבוססות מקורות על ספריית SAP, עם ציטוט הפרק והסעיף המדויק.",
  },
};

export default function Page() {
  return <AiWorkspace />;
}
