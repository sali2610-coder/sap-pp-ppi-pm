"use client";

/* ============================================================================
   PROJECT NEO · CERTIFICATION · the selection primitives.
   ----------------------------------------------------------------------------
   The bank / level / length pickers used to live inside the exam runner only,
   and the entry page (/neo/certification/) described the banks at length
   before handing the reader to a second screen that asked the three real
   questions. The design audit (S7-CERT-2) asked the entry to adopt the
   selection screen's simplicity, so the pickers are shared: the entry page
   asks the three questions first and passes the answers to the runner in the
   URL; the runner reads them back and, when asked to, starts at once.

   Nothing here authors a question. MODULES / LEVELS / LENGTHS mirror the exam
   engine's own enums (lib/cert/generate) and nothing else.
   ========================================================================== */

import type { CertModule, Level } from "@/lib/cert/generate";

export const MODULES: { id: CertModule; he: string }[] = [
  { id: "PM", he: "תחזוקת מפעל" },
  { id: "PP-PI", he: "תעשיות תהליכיות" },
  { id: "PP", he: "תכנון ייצור" },
];
export const LEVELS: Level[] = [1, 2, 3, 4];
export const LENGTHS = [10, 20, 30];

export const EXAM_HREF = "/neo/certification/exam/";

/** The runner's URL for a choice made on the entry page. `start=1` asks the
 *  runner to begin at once; without it the runner only pre-fills its pickers. */
export function examHref(mod: CertModule, level: Level, len: number, start = true): string {
  const q = new URLSearchParams({ mod, level: String(level), len: String(len) });
  if (start) q.set("start", "1");
  return `${EXAM_HREF}?${q.toString()}`;
}

/** The reverse: what a URL asks for. Anything the enums do not know is
 *  dropped, never guessed. */
export function parseExamQuery(search: string): { mod?: CertModule; level?: Level; len?: number; start: boolean } {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const mod = MODULES.find((m) => m.id === q.get("mod"))?.id;
  const lv = Number(q.get("level"));
  const level = LEVELS.find((l) => l === lv);
  const ln = Number(q.get("len"));
  const len = LENGTHS.find((n) => n === ln);
  return { mod, level, len, start: q.get("start") === "1" };
}

export function Picker({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="nce-pick">
      <h2 className="nce-pick-h">
        {label}
        {hint ? <span className="nce-pick-hint"> · {hint}</span> : null}
      </h2>
      <div className="nce-pick-row">{children}</div>
    </section>
  );
}

export function Opt({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="nce-opt" data-on={on ? "1" : "0"} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
