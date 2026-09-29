// Repository references in record text are relabelled for display, never
// dropped (gate 5, finding 18): the advice and the maintenance note together
// hold every sentence of the action, and a source keeps its files apart.
// The inputs are real strings from data/verification and tx evidence.
import test from "node:test";
import assert from "node:assert/strict";
import { repoSource, splitAction } from "../components/neo-shell/evidence/repo-text.ts";

const words = (s: string) => s.split(/\s+/).filter(Boolean).sort();

test("a maintenance sentence leaves the advice, and no word is lost", () => {
  const text = "לקריאה ולדיווח על תיאורי חומר ב-S/4HANA להשתמש ב-I_ProductDescription במקום SELECT ישיר מטבלת MAKT. לתקן את data/cds-map.ts: תצוגת הצריכה C_ProductMaster לא אותרה באף רשומה רשמית.";
  const { advice, note } = splitAction(text);
  assert.ok(advice.startsWith("לקריאה ולדיווח"));
  assert.ok(!/cds-map/.test(advice));
  assert.ok(note.startsWith("לתקן את data/cds-map.ts"));
  assert.deepEqual(words(`${advice} ${note}`), words(text));
});

test("a sentence that continues a note stays with it", () => {
  const text = "להוסיף את cds:I_MaintenancePlanBasic ליקום המזהים (data/cds-map.ts, lib/route-manifest.generated.ts) ולתעד אותה כרשומת verification משלה; לאחר מכן לעדכן את הרשומה. עד אז, כל פלט מבוסס על מיפוי הפרויקט בלבד.";
  const { advice, note } = splitAction(text);
  assert.equal(advice, "");
  assert.deepEqual(words(note), words(text));
});

test("advice with no repository path is untouched, a script name included", () => {
  const text = "להמשיך להשתמש ב-SRT_MONI לניטור הודעות SOAP; לא אותרה אפליקציית Fiori מובילה עבורו (fal-app.mjs --tcode SRT_MONI --release S32OP: none). בהסבה מ-ECC יש להחליף את השירותים לפי הפריט.";
  assert.deepEqual(splitAction(text), { advice: text, note: "" });
});

test("a source keeps its record key and gives up the file", () => {
  assert.deepEqual(repoSource("רשומת המאגר: tx-intel.ts#MIGO"), { label: "רשומת המאגר: MIGO", files: ["tx-intel.ts"] });
  assert.deepEqual(repoSource("שכבת ההעשרה של BAPI ההודעות (data/bapi-enrichment.pm.ts)"),
    { label: "שכבת ההעשרה של BAPI ההודעות", files: ["data/bapi-enrichment.pm.ts"] });
  assert.deepEqual(repoSource("מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IP01 / IP10 / IP30) ורשומת tx:IP30H"),
    { label: "מודיעין הטרנזקציות של הפרויקט (IP01 / IP10 / IP30) ורשומת tx:IP30H", files: ["data/tx-intel.ts"] });
  assert.deepEqual(repoSource("data/processes.ts#plan-to-produce"), { label: "רשומת המאגר: plan-to-produce", files: ["data/processes.ts"] });
  assert.deepEqual(repoSource("SAP Help Portal — Work Centers (PP-BD-WKC)"), { label: "SAP Help Portal — Work Centers (PP-BD-WKC)", files: [] });
});
