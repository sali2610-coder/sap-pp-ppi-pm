/**
 * AI Chat.
 *
 * This route used to hold a self-contained chat built around Gemini: answers
 * rendered through react-markdown (so a diagram was never more than a code
 * block), a single hard-coded book as context, UI sounds, and a sidebar field
 * that asked the user to paste an API key which was then kept in localStorage.
 *
 * It now renders the same workspace as the rest of the product, so this page
 * gains streaming, diagrams, grounded citations, thread history and export —
 * none of which the previous implementation had — and the browser stops holding
 * credentials entirely.
 *
 * The path is unchanged on purpose: the nav, the mobile tab bar, the contextual
 * FAB and every object page deep-link here with `?q=`, which the workspace
 * already honours.
 */
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AiWorkspace = dynamic(() => import("@/components/ai/ai-workspace").then((m) => m.AiWorkspace));

export const metadata: Metadata = {
  title: "צ'אט AI — שאל את הספרייה | SAP by Sali",
  description:
    "שאלות ותשובות מבוססות מקורות על ספריית SAP: בחירת ספר, פרק וסעיף, תשובות עם הפניה מדויקת ותרשימים אינטראקטיביים. SAP by Sali · Project NEO.",
};

export default function ChatPage() {
  return <AiWorkspace />;
}
