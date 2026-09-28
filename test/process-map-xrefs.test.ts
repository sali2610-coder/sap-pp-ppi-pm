import test from "node:test";
import assert from "node:assert/strict";
import { PROCESS_MAPS } from "../data/processes.ts";
import { SAP_NOTES } from "../data/sap-notes.ts";
import { readFileSync } from "node:fs";

/* Design audit §11 (2026-09-22) · every reference a process step makes must
   open a real record. Two did not: `pir-strategy` named no record at all, and
   `qm-ud-stock-block` was a row of the SAP-notes catalog filed as an incident.
   Both rendered as chips without a link, which hid the gap instead of closing
   it. */

// data/troubleshooting.ts merges its four extension files through extensionless
// imports that the loader-free test runner cannot resolve, so the incident slugs
// are read from the five source files directly.
const INCIDENT_FILES = ["troubleshooting", "troubleshooting-ext", "troubleshooting-ext2", "troubleshooting-ext3", "troubleshooting-ext4"];
const incidents = new Set(
  INCIDENT_FILES.flatMap((f) => [...readFileSync(`data/${f}.ts`, "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])),
);
const notes = new Set(SAP_NOTES.map((n) => n.slug));

test("the incident catalogue reads as the 156 records the site renders", () => {
  assert.equal(incidents.size, 156);
});

test("every process-map incident slug is an incident", () => {
  const bad = PROCESS_MAPS.flatMap((m) => m.steps.flatMap((s) => (s.incidents ?? []).filter((x) => !incidents.has(x)).map((x) => `${m.slug}: ${x}`)));
  assert.deepEqual(bad, []);
});

test("every process-map note slug is a SAP-notes record", () => {
  const bad = PROCESS_MAPS.flatMap((m) => m.steps.flatMap((s) => (s.notes ?? []).filter((x) => !notes.has(x)).map((x) => `${m.slug}: ${x}`)));
  assert.deepEqual(bad, []);
});
