// Project NEO · /neo/notes-graph/ — SAP-note topics ↔ incidents ↔ objects ↔ OSS keywords, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { NotesGraphView } from "@/components/neo-shell/tools/notes-graph-view";

export async function generateMetadata() {
  return {
    title: "גרף SAP Notes · Project NEO",
    description: "נושאי SAP Notes לפי רכיב יישום, והקשר שלהם לתקלות, לאובייקטים עסקיים ולמילות חיפוש OSS. ללא מספרי Note מומצאים.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <NotesGraphView />;
}
