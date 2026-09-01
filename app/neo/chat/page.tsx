// Project NEO · /neo/chat/ — the general SAP assistant.
//
// NOT the same screen as /neo/ai/. The two used to be one component rendered in
// two modes, and the result was that nobody could tell them apart. They are now
// two surfaces with two identities: components/neo-shell/chat/library-chat.tsx
// answers from the project's books and states which book, chapter and section
// it read; this one is the general assistant and states, in a standing panel,
// exactly what it does not have access to.
//
// What did NOT change is the engine. lib/ai/modes still defines the contract
// and the server still pins the task per endpoint: "library" answers only from
// the books, "consult" is the general surface. The split here is in the UI.
//
// Route precedence: see the note in app/neo/ai/page.tsx. `chat` is a hub id, so
// this static route takes over /neo/chat/ from app/neo/[hub] exactly as
// /neo/tables/ does, and components/neo-shell/nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/chat.css";
import { GeneralChat } from "@/components/neo-shell/chat/general-chat";

export const metadata = {
  title: "NEO AI · Project NEO",
  description: "עוזר SAP כללי: ארכיטקטורה, יישום, אינטגרציה ואבחון תקלות. כל תשובה מציינת את רמת הביסוס שלה ומה דורש אימות מול מערכת SAP.",
  robots: { index: false, follow: false },
};

export default function NeoChatPage() {
  return <GeneralChat />;
}
