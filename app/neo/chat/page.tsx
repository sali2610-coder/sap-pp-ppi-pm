// Project NEO · /neo/chat/ — the SAP assistant conversation.
//
// Same surface, different contract. lib/ai/modes defines the two and the server
// pins the task per endpoint: "library" answers ONLY from the books and refuses
// when they do not cover the question; "consult" may answer from general SAP
// knowledge and says so on the page. Rendering one component in two modes is
// what keeps them from drifting into two half-maintained chats — the difference
// is the engine's, not the CSS's.
//
// Route precedence: see the note in app/neo/ai/page.tsx. `chat` is a hub id, so
// this static route takes over /neo/chat/ from app/neo/[hub] exactly as
// /neo/tables/ does, and components/neo-shell/nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/chat.css";
import { NeoChat } from "@/components/neo-shell/chat/neo-chat";

export const metadata = {
  title: "צ'אט AI · Project NEO",
  description: "עוזר SAP בשיחה — ארכיטקטורה, יישום, אינטגרציה ואבחון, עם אמירה מפורשת מה דורש אימות מול המערכת.",
  robots: { index: false, follow: false },
};

export default function NeoChatPage() {
  return <NeoChat mode="consult" />;
}
