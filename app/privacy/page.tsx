import type { Metadata } from "next";
import "@/app/neo/legal.css";
import { LegalView } from "@/components/neo-shell/legal/legal-view";
import { PRIVACY } from "@/components/neo-shell/legal/legal-content";

// The URL the Play Store listing points at. It renders the same document as
// /neo/privacy/, from components/neo-shell/legal/legal-content.ts, so the two
// cannot drift. The text it replaced (2026-07-23) said no data leaves the
// device and there are no external endpoints; questions to the AI assistants
// do leave it (docs/redesign-2026-09/LEGAL-READINESS.md, claims 1, 8 and 12).
// The title template appends the brand, so the title is the document's own.
export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.lede,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <LegalView doc={PRIVACY} />;
}
