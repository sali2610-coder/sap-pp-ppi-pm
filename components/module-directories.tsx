import type { SAPModuleData, SAPSheet } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Renders a verbatim directory sheet (header + rows): desktop grid, mobile
// card-stack. Drops the leading "#" column for a cleaner read.
function DirTable({ sheet }: { sheet?: SAPSheet }) {
  if (!sheet || !sheet.rows.length) return null;
  // strip a leading "#" / "מס'" index column if present
  const drop = /^(#|מס)/.test(sheet.headers[0] ?? "") ? 1 : 0;
  const headers = sheet.headers.slice(drop);
  const rows = sheet.rows.map((r) => r.slice(drop));

  return (
    <section className="glass space-y-3 rounded-2xl p-5">
      <h3 className="flex items-center gap-2 font-semibold text-brand">
        <span className="size-2 rounded-full bg-brand" />
        {sheet.title}
      </h3>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h, i) => (
                <TableHead key={i} className="whitespace-normal">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                {headers.map((_, c) => (
                  <TableCell
                    key={c}
                    className={c === 0 ? "tech align-top font-semibold text-brand" : "align-top"}
                  >
                    {r[c] ?? ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="space-y-2 md:hidden">
        {rows.map((r, i) => (
          <li key={i} className="rounded-md border border-border bg-muted/40 p-3">
            <div className="tech mb-1 font-bold text-brand">{r[0]}</div>
            <dl className="space-y-1 text-sm">
              {headers.slice(1).map((h, c) =>
                r[c + 1] ? (
                  <div key={c}>
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
  const sheets = [
    module.tcodesDir,
    module.tools,
    module.ppvs,
    module.simplification,
    module.config,
    module.customCode,
  ].filter(Boolean) as SAPSheet[];

  if (!sheets.length) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">אין מדריכים זמינים למודול זה.</p>
    );
  }

  return (
    <div className="space-y-6">
      {sheets.map((s, i) => (
        <DirTable key={i} sheet={s} />
      ))}
    </div>
  );
}
