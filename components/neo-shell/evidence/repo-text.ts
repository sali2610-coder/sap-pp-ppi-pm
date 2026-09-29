/* ============================================================================
   PROJECT NEO · repository references in record text, presented honestly.
   ----------------------------------------------------------------------------
   The evidence records are protected data and are never edited. Some of their
   strings speak to the people who maintain this repository, not to a
   consultant: a recommended action that ends "לתקן את data/cds-enrichment.ts:
   …", a source titled "רשומת המאגר: tx-intel.ts#MIGO". Shown as they are, a
   consultant reads a development task as advice for their project, and file
   names as sources (gate 5, finding 18; brief principle 7).

   These two functions only SORT and RELABEL for display. Every word of the
   original reaches the page: a maintenance sentence moves to its own labelled
   line, and a file name moves out of a source's label into its metadata.
   Pure and import-free (test/content-repo-text.test.ts).
   ========================================================================== */

/** A path or file of this repository: "data/tx-intel.ts#MIGO", "lifecycle.ts",
 *  "lib/route-manifest.generated.ts". Scripts (.mjs) are not matched: a
 *  sentence naming the Fiori-library search it ran is method, not a task. */
const PATH = /(?:(?:data|lib|components|app|scripts)\/)?[\w-]+(?:\.[\w-]+)*\.tsx?(?:#[\w./-]+)?(?![\w-])/g;
const HAS_PATH = new RegExp(PATH.source);

/** A sentence that carries on the one before it ("עד אז, …" after "להוסיף את …
 *  ל-data/cds-map.ts") belongs with it. */
const CONTINUES = /^(?:עד אז|לאחר מכן)/;

/** The recommended action, split into advice for the reader and a maintenance
 *  note for this repository. Sentences keep their order within each part. */
export function splitAction(text: string): { advice: string; note: string } {
  const advice: string[] = [];
  const note: string[] = [];
  let prevNote = false;
  for (const s of (text || "").split(/(?<=\.)\s+/)) {
    if (!s.trim()) continue;
    const isNote: boolean = HAS_PATH.test(s) || (prevNote && CONTINUES.test(s.trim()));
    (isNote ? note : advice).push(s.trim());
    prevNote = isNote;
  }
  return { advice: advice.join(" "), note: note.join(" ") };
}

/** A source title, with the repository file taken out of the label: the record
 *  key it names stays ("רשומת המאגר: tx-intel.ts#MIGO" reads "רשומת המאגר:
 *  MIGO"), and the files are returned apart (`files`) so the page can still
 *  show them, as metadata. A title that is only a path becomes "רשומת המאגר:
 *  <key>". */
export function repoSource(title: string): { label: string; files: string[] } {
  const t = (title || "").trim();
  const refs = t.match(PATH) ?? [];
  if (!refs.length) return { label: t, files: [] };
  const key = (ref: string) => ref.split("#")[1] ?? "";
  const files = refs.map((r) => r.split("#")[0]);
  if (refs.length === 1 && refs[0] === t) {
    const k = key(t) || files[0].replace(/^.*\//, "").replace(/\.tsx?$/, "");
    return { label: `רשומת המאגר: ${k}`, files };
  }
  const label = t
    .replace(PATH, (m) => key(m))
    .replace(/\(\s*,\s*/g, "(")
    .replace(/\s*,\s*\)/g, ")")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,)])/g, "$1")
    .replace(/[:\s]+$/, "")
    .trim();
  return { label: label || "רשומת המאגר", files };
}
