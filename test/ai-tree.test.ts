/**
 * The shipped navigation tree.
 *
 * This exists because the tree spent a long time rendering the literal string
 * "true" as 4,043 of its 4,314 section titles: the source `he` field is a
 * BOOLEAN meaning "a translation exists", and String(true) is truthy, so it won
 * the title fallback chain. A boolean must never reach a heading again.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "data", "ai-tree");
const books = readdirSync(DIR).filter((f) => /^book\d+\.json$/.test(f));

const BAD = /^(true|false|null|undefined)$/i;
const walk = (nodes: any[], fn: (n: any) => void) => {
  for (const n of nodes ?? []) { fn(n); if (n.children) walk(n.children, fn); }
};

test("the tree ships for every book", () => {
  assert.ok(books.length >= 11, `only ${books.length} trees`);
});

test("no title anywhere is a stringified boolean", () => {
  const offenders: string[] = [];
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    if (BAD.test(String(d.title))) offenders.push(`${f}:book`);
    for (const c of d.chapters) {
      if (BAD.test(String(c.t))) offenders.push(`${f}:ch${c.n}`);
      for (const s of c.sections) if (BAD.test(String(s.t))) offenders.push(`${f}:${s.id}`);
    }
  }
  assert.deepEqual(offenders, [], `boolean titles: ${offenders.slice(0, 5).join(", ")}`);
});

test("every node has a non-empty title", () => {
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const c of d.chapters) {
      assert.ok(String(c.t).trim(), `${f} ch${c.n} has no title`);
      for (const s of c.sections) assert.ok(String(s.t).trim(), `${f} ${s.id} has no title`);
    }
  }
});

test("nesting preserves every section — none dropped, none duplicated", () => {
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const c of d.chapters) {
      const seen: string[] = [];
      walk(c.nodes ?? [], (n) => seen.push(n.id));
      assert.equal(seen.length, c.sections.length,
        `${f} ch${c.n}: nested ${seen.length} vs flat ${c.sections.length}`);
      assert.equal(new Set(seen).size, seen.length, `${f} ch${c.n}: duplicate in nesting`);
    }
  }
});

test("a child's id extends its parent's", () => {
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const c of d.chapters) {
      const check = (n: any) => {
        for (const ch of n.children ?? []) {
          assert.ok(String(ch.id).startsWith(`${n.id}.`),
            `${f}: ${ch.id} is not a child of ${n.id}`);
          check(ch);
        }
      };
      (c.nodes ?? []).forEach(check);
    }
  }
});

test("metrics are non-negative integers", () => {
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const c of d.chapters) {
      for (const [k, v] of Object.entries(c.m ?? {})) {
        assert.ok(Number.isInteger(v) && (v as number) >= 0, `${f} ch${c.n} ${k}=${v}`);
      }
    }
  }
});

test("chapter metrics are the sum of their sections", () => {
  for (const f of books) {
    const d = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const c of d.chapters) {
      const sum = c.sections.reduce((n: number, s: any) => n + (s.m?.w ?? 0), 0);
      assert.equal(c.m.w, sum, `${f} ch${c.n}: words ${c.m.w} vs ${sum}`);
    }
  }
});

test("the tree and the book spine agree on titles", () => {
  // The whole reason the bug existed twice: two generators, one source.
  for (const f of books) {
    const tree = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    const spine = JSON.parse(readFileSync(path.join(process.cwd(), "data", "books", f), "utf8"));
    // A catalogue cross-lists the same app under two categories, and the
    // publisher does not always spell it identically ("Manage Product Master" /
    // "Manage Product Master Data"). So an id may legitimately carry more than
    // one title; the tree must use ONE OF THEM, not something of its own.
    const spineTitles = new Map<string, Set<string>>();
    for (const c of spine.chapters) {
      for (const s of c.sections) {
        const t = (s.title.he || s.title.en || s.id).trim();
        if (!spineTitles.has(s.id)) spineTitles.set(s.id, new Set());
        spineTitles.get(s.id)!.add(t);
      }
    }
    for (const c of tree.chapters) {
      for (const s of c.sections) {
        const want = spineTitles.get(s.id);
        if (want) assert.ok(want.has(s.t),
          `${f} ${s.id}: tree "${s.t}" is not among the spine's titles [${[...want].join(" | ")}]`);
      }
    }
  }
});
