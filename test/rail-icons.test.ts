// Every rail icon the nav model names must resolve in components/neo-shell/icon.tsx.
// An unknown name falls back to Database: that drew the same cylinder on every
// S/4HANA tab (Gauge, Truck and the domain map's icon were not in the map).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (f: string) => readFileSync(path.join(ROOT, f), "utf8");

test("every icon the rail names is in the icon map", () => {
  const map = read("components/neo-shell/icon.tsx").match(/const MAP: Record<string, LucideIcon> = \{([\s\S]*?)\};/);
  assert.ok(map, "icon.tsx MAP not found");
  const mapped = new Set(map[1].split(",").map((s) => s.trim()).filter(Boolean));
  const used = [...read("components/neo-shell/nav-data.ts").matchAll(/icon:\s*"([A-Z][A-Za-z]+)"/g)].map((m) => m[1]);
  assert.ok(used.length > 10, "no rail icons found in nav-data.ts");
  assert.deepEqual([...new Set(used.filter((n) => !mapped.has(n)))], []);
});
