import type { SAPModuleData } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Generic directory table: desktop grid, mobile card-stack. Renders the real
// positional tuples from the source knowledge base with proper Hebrew headers.
function DirTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  if (!rows?.length) return null;
  return (
    <section className="space-y-3 rounded-lg border border-border bg-card p-5">
      <h3 className="font-semibold text-brand">{title}</h3>

      {/* desktop */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                {headers.map((_, c) => (
                  <TableCell key={c} className={c === 0 ? "tech font-semibold text-brand align-top" : "align-top"}>
                    {r[c] ?? ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* mobile */}
      <ul className="space-y-2 md:hidden">
        {rows.map((r, i) => (
          <li key={i} className="rounded-md border border-border bg-muted/40 p-3">
            <div className="tech mb-1 font-bold text-brand">{r[0]}</div>
            <dl className="space-y-1 text-sm">
              {headers.slice(1).map((h, c) =>
                r[c + 1] ? (
                  <div key={h}>
                    <dt className="text-xs text-muted-foreground">{h}</dt>
                    <dd>{r[c + 1]}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ModuleDirectories({ module }: { module: SAPModuleData }) {
  const isPM = module.module === "PM";
  return (
    <div className="space-y-6">
      <DirTable
        title="מדריך טרנזקציות (T-Codes Directory)"
        headers={["טרנזקציה", isPM ? "קטגוריה" : "היקף", "תיאור", "הערת S/4HANA", "אפליקציית Fiori", "Fiori ID", "פירוט"]}
        rows={module.tcodesDir}
      />

      {module.tools && (
        <DirTable
          title="ארגז כלים למיישם (Implementer Toolkit)"
          headers={["כלי", "תיאור", "הערת S/4HANA", "אפליקציית Fiori", "Fiori ID", "פירוט"]}
          rows={module.tools}
        />
      )}

      {module.ppvs && (
        <DirTable
          title="PP מול PP-PI — השוואה"
          headers={["היבט", "ייצור בדיד (PP)", "ייצור תהליכי (PP-PI)", "CBC"]}
          rows={module.ppvs}
        />
      )}

      {Array.isArray(module.simplification) && (
        <DirTable
          title="S/4HANA Simplification — נקודות שינוי"
          headers={["תחום", "שינוי", "SAP Note", "סטטוס", "פירוט"]}
          rows={module.simplification as string[][]}
        />
      )}

      {Array.isArray(module.config) && (
        <DirTable
          title="קונפיגורציה (Customizing)"
          headers={["פריט קונפיגורציה", "טרנזקציה", "פירוט"]}
          rows={module.config as string[][]}
        />
      )}
    </div>
  );
}
