/**
 * AI Chat — the consultant surface.
 *
 * Unlike Ask the Library this may answer from general SAP knowledge:
 * architecture, implementation, integration, ABAP, Fiori, BTP, troubleshooting
 * and design. It routes to the SAP_CONSULT profile, the one profile allowed
 * beyond the corpus.
 *
 * What it still cannot do, and says so on the page: reach SAP Help, SAP Notes or
 * the SAP Community live, or invent an identifier. See lib/ai/modes.ts.
 *
 * The path is unchanged because the nav, the mobile tab bar, the contextual FAB
 * and every object page deep-link here with `?q=`.
 */
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AiWorkspace = dynamic(() => import("@/components/ai/ai-workspace").then((m) => m.AiWorkspace));

export const metadata: Metadata = {
  title: "יועץ SAP — ארכיטקטורה, יישום ואבחון תקלות | SAP by Sali",
  description:
    "יועץ SAP: ארכיטקטורה, יישום, אינטגרציה, ABAP, Fiori, BTP, אבחון תקלות ושיטות עבודה. SAP by Sali · Project NEO.",
};

export default function ChatPage() {
  return <AiWorkspace mode="consult" />;
}
