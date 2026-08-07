/**
 * Turns an answer into blocks. Extracted from the renderer so it can be tested
 * without a DOM — it is pure, and it caused an incident, which is exactly the
 * combination that belongs in its own module.
 *
 * The invariant every branch must uphold: each iteration of the outer loop
 * MUST advance the cursor. A branch that consumes nothing spins forever, and
 * because this runs on the main thread there is no error to catch and no
 * timeout that can fire — the tab simply stops. See test/answer-parse.test.ts.
 */

export type Block =
  | { t: "h"; level: 2 | 3; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "code"; text: string; lang?: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "callout"; kind: "note" | "warn" | "tip"; text: string };

const BLOCK_START = /^\s*([-*•]|\d+[.)]|#{2,3}\s|\||```)/;

const CALLOUT_RE = /^\s*(?:>\s*)?(?:\*\*)?(שים לב|הערה|אזהרה|זהירות|טיפ|המלצה|Note|Warning|Caution|Tip|Best Practice)(?:\*\*)?\s*[:：-]\s*(.+)$/i;
const WARN = /אזהרה|זהירות|warning|caution/i;
const TIP = /טיפ|המלצה|tip|best practice/i;

/** Groups lines into blocks. The corpus emits a small, predictable subset. */
export function parseAnswerBlocks(src: string): Block[] {
  const lines = src.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const cursorAtStart = i;
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    // fenced code
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim().toLowerCase() || undefined;
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) buf.push(lines[i++]);
      i++;
      blocks.push({ t: "code", text: buf.join("\n"), lang });
      continue;
    }

    // markdown table: | a | b |  then a separator row
    if (trimmed.startsWith("|") && lines[i + 1]?.trim().match(/^\|[\s:|-]+\|$/)) {
      const cells = (s: string) => s.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      blocks.push({ t: "table", head, rows });
      continue;
    }

    const h = trimmed.match(/^(#{2,3})\s+(.*)$/);
    if (h) { blocks.push({ t: "h", level: h[1].length === 2 ? 2 : 3, text: h[2] }); i++; continue; }

    const call = trimmed.match(CALLOUT_RE);
    if (call) {
      const label = call[1];
      blocks.push({
        t: "callout",
        kind: WARN.test(label) ? "warn" : TIP.test(label) ? "tip" : "note",
        text: call[2],
      });
      i++;
      continue;
    }

    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) items.push(lines[i++].trim().replace(/^[-*•]\s+/, ""));
      blocks.push({ t: "ul", items });
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].trim().replace(/^\d+[.)]\s+/, ""));
      blocks.push({ t: "ol", items });
      continue;
    }

    // Paragraph: join until a blank line or the start of another block.
    //
    // The guard set must never be able to leave `i` unmoved. It could: a line
    // beginning with "|" that no earlier branch claimed — a table header whose
    // separator row has not been revealed yet, or a mermaid edge label — fell
    // through to here, matched the guard, consumed nothing, and span the outer
    // loop forever. That locked the main thread with no error and no recovery.
    // Consuming the first line unconditionally makes progress structural rather
    // than something every future branch has to remember.
    const buf: string[] = [lines[i++].trim()];
    while (i < lines.length && lines[i].trim() && !BLOCK_START.test(lines[i])) buf.push(lines[i++].trim());
    blocks.push({ t: "p", text: buf.join(" ") });

    // Invariant: every iteration consumes at least one line. If a future branch
    // forgets, this degrades to one skipped line instead of a frozen tab.
    if (i === cursorAtStart) i++;
  }
  return blocks;
}
