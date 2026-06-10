# SAP Learning Academy — Template Standard (v1.0)

The reusable standard for **every** SAP book in the academy. PP is the reference
implementation; all remaining books follow this exactly.

## 1. Data model (the template)

`data/library/pp-textbook/types.ts` defines the canonical shape. Reuse verbatim per book.

- `TextbookChapter { n, titleHe, titleEn, introHe, subchapters: LearningNode[] }`
- `LearningNode` — one complete learning unit (chapter subchapter **and** every nested source sub-heading share this shape, recursively via `children`).

### The 18 facets (every node, authored Hebrew)

1. `execHe` — executive explanation
2. `purposeHe` — business purpose
3. `beginnerHe` — beginner explanation
4. `consultantHe` — consultant explanation
5. `configHe[]` — configuration details
6. `navHe[]` — SPRO / IMG navigation (use `►` separators)
7. SAP objects — surfaced via the reference arrays below
8. `tcodes[]` — T-Codes
9. `tables[]` — Tables
10. `fiori[]` — Fiori Apps (real IDs only; omit on pure-SPRO nodes)
11. `masterDataHe[]` — master-data impact
12. `flow[]` — process-flow diagram (`FlowStep { he, code?, note? }`, 4–6 steps)
13. `cbcHe` — CBC (Coca-Cola bottling) example when relevant
14. `mistakesHe[]` — common mistakes
15. `troubleshootHe[]` — troubleshooting
16. `bestPracticeHe[]` — best practices
17. `interviewHe[]` — interview Q&A (`{ qHe, aHe }`)
18. `takeawaysHe[]` — key takeaways

Plus `relatedHe[]` — glossary + cross-book/cross-chapter links (`{ labelHe, href }`).

## 2. Hierarchy rule

- Preserve the **source book** chapter + subchapter hierarchy **exactly**.
- The PDF-TOC extraction (`pp-toc.json`) is often scrambled at the **parent** level: if a parent label contradicts its coherent children, correct the parent label and keep the child sub-headings verbatim, in order. Never invent or drop chapters. Document corrections in a file-header comment.

## 3. Authoring rules

- Transformative original Hebrew — never copy source prose (copyright-safe).
- SAP identifiers verbatim English (T-Codes, tables, Fiori IDs, IMG paths, field names).
- Escape inner double-quotes in Hebrew strings: `פק\"ע`.
- Depth ~5–10 min reading per node; chapter ≈ 30 nodes, ~6–8k words.
- One file per chapter: `data/library/<book>-textbook/chNN.ts` → `export const CHn: TextbookChapter`. A barrel `index.ts` assembles the record + stats.

## 4. UI rules

- Body text ≥ 15px, line-height 7; labels 12px uppercase. Generous spacing (`p-5`, `space-y-4`).
- Interactive accordion **is** the TOC: multi-open, expand/collapse-all, progress bar, reading-time badges.
- Three-level explanation cards (exec / beginner / consultant, color-coded).
- Process-flow diagrams + config-trees (SPRO path as tree). Object chips link to object pages.
- Interview Q&A as click-to-reveal. Mobile-first (rows stack), perfect RTL Hebrew.

## 5. Validation gate (before publish)

Per book, run the audit (reviewer per chapter + deterministic checks) and publish the
report at `/library/<book>-quality-report`. A chapter is **publish-ready** when:

- hierarchy matches source (corrections documented),
- no broken cross-links (object slugs exist; routes valid),
- no placeholder/invented Fiori IDs or fabricated tables,
- confidence ≥ benchmark.

Known systemic checks to enforce: dead object cross-links, over-reused Fiori IDs,
invented tables/tcodes, empty facets.

## 6. Rollout

One book at a time: author chapters (parallel agents) → build → audit → fix systemic
issues → register in `data/library/academy.ts` → it appears on the dashboard
`/library/academy`.
