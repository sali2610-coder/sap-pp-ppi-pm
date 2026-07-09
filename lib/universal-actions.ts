// Universal Actions — the "cherry on top" of universal search. For any result,
// return the direct actions a consultant would want, each routing to a REAL page
// or in-page anchor that already exists (no dead links). Powers the action strip
// under the active search result.
import { Eye, Network, BookOpen, Sigma, Plug, Terminal, LayoutGrid, FlaskConical, ShieldCheck, Workflow, Gauge, Boxes, Cable } from "lucide-react";
import { hasApp } from "@/lib/apps-intel";

export type ActionKind = "table" | "tcode" | "cds" | "bapi" | "fm" | "idoc" | "fiori" | "page";
export interface UAction { icon: typeof Eye; label: string; href: string }

const enc = encodeURIComponent;
const modHub = (m?: string) => (m === "PM" ? "/pm/" : m === "PP-PI" || m === "PP" ? "/pp-pi/" : "");

export function actionsFor(kind: ActionKind, name: string, module?: string): UAction[] {
  const n = name;
  if (kind === "table") {
    const a: UAction[] = [
      { icon: Eye, label: "פתח טבלה", href: `/object/${enc(n)}/` },
      { icon: Network, label: "מפת קשרים", href: `/studio/` },
      { icon: Gauge, label: "ניתוח השפעה", href: `/impact/${enc(n)}/` },
      { icon: BookOpen, label: "מילון נתונים", href: `/object/${enc(n)}/` },
    ];
    const hub = modHub(module);
    if (hub) a.push({ icon: Boxes, label: "בבלוּפרינט", href: `${hub}?q=${enc(n)}` });
    return a;
  }
  if (kind === "tcode") {
    const app = hasApp(n);
    if (!app) return [{ icon: Terminal, label: "פתח טרנזקציה", href: `/tcode/${enc(n)}/` }];
    const base = `/apps/${enc(n)}/`;
    return [
      { icon: Terminal, label: "פתח טרנזקציה", href: base },
      { icon: LayoutGrid, label: "חלופת Fiori", href: `${base}#fiori` },
      { icon: BookOpen, label: "טבלאות קשורות", href: `${base}#tech` },
      { icon: Workflow, label: "תהליך עסקי", href: `${base}#flow` },
      { icon: FlaskConical, label: "תרחישי QA", href: `${base}#testing` },
      { icon: ShieldCheck, label: "הרשאות", href: `${base}#auth` },
    ];
  }
  if (kind === "cds") return [
    { icon: Sigma, label: "פתח CDS", href: `/cds/${enc(n)}/` },
    { icon: Network, label: "חוקר CDS", href: `/cds/` },
  ];
  if (kind === "bapi" || kind === "fm") return [
    { icon: Plug, label: "פתח אובייקט", href: `/bapi/${enc(n)}/` },
  ];
  if (kind === "idoc") return [
    { icon: Cable, label: "פתח IDoc", href: `/idoc/${enc(n)}/` },
    { icon: Network, label: "חוקר IDoc", href: `/idoc/` },
  ];
  if (kind === "fiori") return [
    { icon: LayoutGrid, label: "מרכז Fiori", href: `/fiori-apps/` },
  ];
  return [];
}
