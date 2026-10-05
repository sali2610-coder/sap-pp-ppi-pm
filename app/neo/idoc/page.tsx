// Project NEO · /neo/idoc/ — the IDoc directory, plus the shared IDoc reference.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do. nav-data.ts is untouched.
//
// This is the one directory that passes `children` (and `top`) to the surface.
// The project documents only three message types, but it documents the IDoc
// MECHANISM deeply. That knowledge is not
// per-message-type, so it is rendered once, under the list, instead of being
// copied onto both record pages.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { IdocReferenceBlock, IdocRoute } from "@/components/neo-shell/reference/idoc-reference-block";
import { idocDir, idocReference } from "@/components/neo-shell/reference/idoc-data";

export const metadata = {
  title: "IDocs · Project NEO",
  description:
    "קטלוג IDoc של Project NEO: סוגי הודעת IDoc מתועדים, מבנה ה-IDoc, קודי הסטטוס וטרנזקציות הניטור.",
  robots: { index: false, follow: false },
};

export default function NeoIdocDirectory() {
  const r = idocReference();
  // The route is the page's signature, above the list; the anatomy, the
  // status codes and the monitoring transactions follow the list.
  return (
    <RefSurface dir={idocDir()} top={<IdocRoute r={r} />}>
      <IdocReferenceBlock r={r} />
    </RefSurface>
  );
}
