import { ArrowLeft, Server, Sparkles } from "lucide-react";

// ECC → S/4HANA / Fiori transformation card with a clear visual arrow.
export function FioriTransform({
  tcodes,
  s4Note,
  fioriApp,
  s4AltTable,
  s4AltTcode,
}: {
  tcodes: string;
  s4Note: string;
  fioriApp?: string;
  s4AltTable?: string;
  s4AltTcode?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {/* ECC side */}
        <div className="flex-1 rounded-xl border border-border bg-muted/40 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            <Server className="size-3.5" />
            ECC 6.0 (Classic)
          </div>
          <div className="tech text-sm font-semibold">{tcodes || "—"}</div>
        </div>

        {/* arrow */}
        <div className="flex shrink-0 items-center justify-center">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand">
            <ArrowLeft className="size-4" />
          </span>
        </div>

        {/* S/4 side */}
        <div className="flex-1 rounded-xl border border-brand/30 bg-brand-soft p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand">
            <Sparkles className="size-3.5" />
            S/4HANA · Fiori
          </div>
          {fioriApp ? (
            <div className="tech text-sm font-semibold text-brand-dark">{fioriApp}</div>
          ) : (
            <div className="text-sm text-foreground">{s4AltTcode || s4Note || "—"}</div>
          )}
        </div>
      </div>

      {/* S/4 detail chips */}
      {(s4AltTable || s4AltTcode || s4Note) && (
        <dl className="grid gap-2 rounded-xl border border-border/60 bg-background/40 p-3 text-sm sm:grid-cols-3">
          {s4AltTable && (
            <div>
              <dt className="text-[11px] text-muted-foreground">טבלה/שדה חלופי</dt>
              <dd className="tech">{s4AltTable}</dd>
            </div>
          )}
          {s4AltTcode && (
            <div>
              <dt className="text-[11px] text-muted-foreground">טרנז'/תוכנית מחליפה</dt>
              <dd>{s4AltTcode}</dd>
            </div>
          )}
          {s4Note && (
            <div className="sm:col-span-3">
              <dt className="text-[11px] text-muted-foreground">סטטוס / פער S/4HANA</dt>
              <dd>{s4Note}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
