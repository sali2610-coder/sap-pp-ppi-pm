// The RTL run splitter: Latin runs keep their own brackets, Hebrew keeps its own.
import test from "node:test";
import assert from "node:assert/strict";
import { rtlRuns } from "../components/neo-shell/rtl-runs.ts";

const latin = (s: string) => rtlRuns(s).filter((r) => r.latin).map((r) => r.t);

test("a Latin run keeps a bracket it opened and gives back one it did not", () => {
  assert.deepEqual(latin("מרשם בקרה ל-MES (CO53)"), ["MES (CO53)"]);
  assert.deepEqual(latin("פקודת תהליך (COR1)"), ["COR1"]);
  assert.deepEqual(latin("בוטלה → ACDOCA (compat view)."), ["ACDOCA (compat view)"]);
  assert.deepEqual(latin("הסיומת _INTERN מסמנת"), ["_INTERN"]);
});

test("a percent sign stays with its number", () => {
  assert.deepEqual(latin("חיסכון של 40% בזמן"), ["40%"]);
  assert.deepEqual(latin("משקל: Fiori 30%, CDS 30%, סימון"), ["Fiori 30%, CDS 30%"]);
  assert.deepEqual(latin("(30%) בלבד"), ["30%"]);
});

test("a wildcard or a plus stays with its name", () => {
  assert.deepEqual(latin("נשמרים (BAPI_GOODSMVT_CREATE, BAPI_PRODORDCONF_*); חלק"), ["BAPI_GOODSMVT_CREATE, BAPI_PRODORDCONF_*"]);
  assert.deepEqual(latin("NAST ו-BRF+ נתמך"), ["NAST", "BRF+"]);
  assert.deepEqual(latin("סכום + מע״מ"), []);
});

test("the runs put back together are the original sentence", () => {
  for (const s of ["חיסכון של 40% בזמן", "Backflush + GR + אישור", "CRTD→REL→CNF", "(PP-PI, order category 40) מבוססת", "סוג פקודה"]) {
    assert.equal(rtlRuns(s).map((r) => r.t).join(""), s);
  }
});
