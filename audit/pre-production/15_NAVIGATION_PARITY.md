# 15 · NAVIGATION PARITY — `nav-data.ts` against what the app actually serves

**Audit only.** No file under `app/`, `components/`, `data/`, `lib/`, `public/` or any config was modified.
Every claim below is either a line citation or a live observation from the dev server already running at
`http://localhost:3111`.

Subject: `components/neo-shell/nav-data.ts` (660 lines), the single source the NEO rail, the mobile sheet and
the ⌘K palette are built from, plus its consumers `components/neo-shell/mobile-nav.tsx`,
`components/neo-shell/search/build.ts`, `components/neo-shell/search/command-index.ts` and
`components/neo-shell/nav-context/fallbacks.ts`.

## 1 · What the sidebar declares

`seeds()` (nav-data.ts:112–178) produces **19 destinations in 6 groups**. The served page confirms it:
the rail header reads *"19 יעדי ניווט · האינדקס המלא בלוח הפקודות"* on every NEO route checked.

| Group | Items | Destinations |
|---|---:|---|
| מודולים | 3 | `/neo/pm/`, `/neo/pp-pi/`, `/neo/erd/` (id `domain-model`, explicit `href` at :122) |
| עיון · Reference | 7 | `/neo/tables/`, `/neo/transactions/`, `/neo/bapi/`, `/neo/idoc/`, `/neo/cds/`, `/neo/fiori-apps/`, `/neo/enhancements/` |
| ספרייה | 2 | `/neo/books/` (id `library`, explicit `href` at :155), `/neo/ai/` |
| ידע ולמידה | 4 | `/neo/knowledge/`, `/neo/academy/`, `/neo/incidents/`, `/neo/certification/` |
| כלים | 2 | `/neo/centers/` (:174), `/neo/studio/` |
| עוזר SAP | 1 | `/neo/chat/` |

**Result: no sidebar entry lands on a Stage-1 placeholder.** All 19 hrefs resolve to a built surface — verified
by fetching each. The two overrides at :122 and :155 are exactly what keeps that true; without them the
`id`-as-route fallback (`href: it.href ?? \`/neo/${it.id}/\``, :203) would send `domain-model` and `library` to
the placeholder frame.

`components/neo-shell/mobile-nav.tsx:65-83` renders the same `groups` array with the same `it.href` — the
mobile sheet cannot diverge from the desktop rail. No finding.

## 2 · Orphaned NEO routes

`app/neo/[hub]/generateStaticParams` emits all 19 `NEO_HUBS` ids. Next resolves a static
`app/neo/<id>/page.tsx` ahead of the dynamic route, and 15 of the 19 ids have one. `pm` and `pp-pi` render
`ModuleWorkspace`. That leaves **two** ids served by the Stage-1 hub frame.

### 2.1 `/neo/domain-model/` — generated, reachable by URL, linked from nowhere · **P2**

- HTTP **200** on the dev server. Renders `<h1>מודל נתונים</h1>` and one `<h2>תחומים</h2>` listing the 39
  `DOMAINS` entries **as plain text** — `app/neo/[hub]/page.tsx:83-91` emits `<li><b>{r.t}</b><span>{r.s}</span></li>`
  with no `<Link>`, so every row is a dead end.
- A repo-wide grep for `domain-model` inside `app/neo/**` and `components/neo-shell/**` returns only
  `mod-var.ts:43` (a colour token) and `nav-data.ts` itself (:99, :122, :150, :198-199, :249, :555). **Not one
  `href` points at it.** The rail item that carries the id points at `/neo/erd/`.
- Consequence: the page ships (it is in `generateStaticParams`, so it lands in `out/`) and no one can reach it
  by navigating.

### 2.2 `/neo/library/` — a second "Digital Library" that undercounts the real one · **P1**

- HTTP **200**. Served content: *"ספרייה דיגיטלית · 10 ספרים · 105 פרקים · 7,914 עמודים"*, then a
  **non-clickable** list of 10 book titles.
- The real shelf `/neo/books/` reports **11**. The sidebar item labelled **"ספרייה דיגיטלית"** carries
  `count: allBookIds().length` = **11** and points at `/neo/books/`.
- The placeholder is nonetheless linked from **six** in-app places, four of them with a label a user will read
  as the same thing:

  | File:line | Label |
  |---|---|
  | `app/neo/page.tsx:777` | `ספרייה · 11 ספרים` |
  | `app/neo/page.tsx:819` | `אל הספרייה הדיגיטלית` |
  | `app/neo/books/page.tsx:121` | `הספרייה הדיגיטלית` |
  | `components/neo-shell/object/object-view.tsx:812` | (library CTA) |
  | `components/neo-shell/data/tables-detail-view.tsx:811` | (library CTA) |
  | `components/neo-shell/workspace/workspace-learn.tsx:41` | (library CTA) |

  `app/neo/page.tsx:777` is the sharpest case: the button **says 11** (`nf.format(d.books)`) and lands on a page
  that **says 10**.
- `app/neo/page.tsx:814-818` documents the intent — two destinations, two labels. The labels are not two.

**No third placeholder exists.** Every other hub id is shadowed by a real page.

## 3 · Cross-shell leaks — NEO search links into the OLD app · **P1**

`components/app-shell.tsx:80` bares the whole OLD chrome for `/neo` and `/neo/*`. Any link out of the NEO
namespace therefore drops the user into a different header, a different rail and a different footer.

Two such links are generated **by the NEO command palette itself**:

| File:line | Emits | Records affected | NEO equivalent that exists |
|---|---|---:|---|
| `components/neo-shell/search/build.ts:181` | `` href: `/cds/${encodeURIComponent(r.t)}/` `` | **39** CDS views | `/neo/cds/[view]/` — 39 pages, `cdsNames().length === 39` |
| `components/neo-shell/search/build.ts:193` | `` href: slug ? `/fiori-apps/${slug}/` : r.href `` | **20** Fiori apps | `/neo/fiori-apps/[slug]/` — 20 pages, `fioriSlugs().length === 20` |

Verified live, both destinations serve:

```
/neo/cds/I_Product/            -> 200
/cds/I_Product/                -> 200
/neo/fiori-apps/confirm-jobs/  -> 200
/fiori-apps/confirm-jobs/      -> 200
```

Note the pattern is deliberate everywhere else in the same file: `table` (:134), `tcode` (:145) and `func`
(:167) all resolve to a NEO page or to `null`. These two branches are the only ones that hard-code the OLD
namespace, and they overwrite the `/neo/cds/` and `/neo/fiori-apps/` hrefs that `nav-data.ts:357-358` had
already put on the record.

## 4 · Search results that land on a list instead of the record · **P2**

| Source | Records | Sent to | Record page that exists |
|---|---:|---|---|
| `nav-data.ts:359` | 10 books (`LIBRARY`) | `/neo/library/` — the Stage-1 placeholder | `/neo/books/[bookId]/` (11 ids) |
| `command-index.ts:183` | **every chapter of every book** (`LIBRARY[].chapters`, 105 chapters) | `/neo/library/` | `/neo/read/[bookId]/` opens the chapter in the reader |
| `command-index.ts:208` | 33 concepts (`CONCEPTS`) | `/neo/knowledge/` (index) | `/neo/knowledge/[slug]/` — all 33 generate |
| `command-index.ts:197` | 39 domains (`DOMAINS`) | `/neo/erd/` | no per-domain NEO page exists — see `21_MISSING_ITEMS` and the `/domain/[slug]` P0 row |

The concept row is the clearest regression: `conceptSlugs()` generates a page for all 33 and the palette still
drops the user on the directory.

## 5 · A rail count that its destination does not render · **P2**

`nav-data.ts:122`:

```ts
{ id: "domain-model", href: "/neo/erd/", label: "מודל נתונים", icon: "GitBranch",
  count: DOMAINS.length, countLabel: "תחומים" },
```

The rail shows **"מודל נתונים · 39 תחומים"**. `/neo/erd/`, observed live, states
**"15 מודולים · 170 שיוכי טבלה · 220 טבלאות · 232 קשרים"** — it renders no domain list at all. The count comes
from `data/domains.ts`; the destination comes from `components/neo-shell/erd/model.ts`.

That is exactly the case the file's own HONESTY RULE (nav-data.ts:6-11) forbids: *"a count is produced by the
same helper the corresponding page renders from — never a literal, never a doc figure."* Here it is produced by
a different dataset than the page. Every other item passes the rule (spot-checked: `tables` 126 = `ALL_TABLES`,
`transactions` 1,817 = `registryStats().total`, `bapi` 147, `cds` 39, `fiori-apps` 20, `enhancements` 13,
`knowledge` 33, `academy` 8, `incidents` 156, `centers` 89 — all match the served page).

Related, smaller: `app/neo/erd/page.tsx:14` describes the surface as **"13 מודולי SAP"** while the page renders
**15**. **P3.**

## 6 · Return-path gaps (`nav-context/fallbacks.ts`)

`PARENTS` (fallbacks.ts:30-58) declares a parent for 21 NEO prefixes. Two families are absent:

| Missing prefix | Pages affected | Effect |
|---|---:|---|
| `/neo/centers/` | 11 family pages + 89 item pages | `parentOf()` falls through to the `/neo/` entry and returns **"מסך הבית"**. Mitigated: `centers-view.tsx:120` renders its own hardcoded back link to `/neo/centers/<family>/`, and the family page carries `/neo/centers/`. **P3**, cosmetic inconsistency rather than a dead end. |
| `/neo/read/` | 11 reader pages | Same fall-through to Home. `components/neo-shell/reader/neo-reader.tsx` does use `SmartReturn`, so a cold entry to a reader URL offers "back to Home" instead of "back to the shelf". **P2.** |

`app/neo/centers/**` and `app/neo/read/[bookId]/page.tsx` are also the only two NEO route families that do not
import `SmartReturn` (24 other NEO surfaces do).

`/neo/object/` has no `page.tsx` and returns **404**, but nothing links to it — `fallbacks.ts:36` uses the
string only as a *prefix* and maps it to `/neo/tables/`. Not a finding.

## 7 · Reachability sweep — all 36 NEO route files

Every NEO route file was checked for at least one inbound `href` from inside the NEO namespace.

| Result | Count | Notes |
|---|---:|---|
| Reachable from the sidebar | 19 destinations | Section 1. |
| Reachable from a parent surface only (deep routes, expected) | 16 | `object/[name]` (14 linking files), `read/[bookId]`, `books/[bookId]`, `tables/[name]`, `transactions/[code]`, `bapi/[name]`, `cds/[view]`, `idoc/[name]`, `fiori-apps/[slug]`, `enhancements/[slug]`, `knowledge/[slug]`, `incidents/[slug]`, `academy/[courseId]`, `academy/[courseId]/[slug]`, `centers/[family]`, `centers/[family]/[slug]`, `certification/exam`. |
| **Orphaned — generated, zero inbound links** | **1** | `/neo/domain-model/` (§2.1). |

## 8 · Findings, ranked

| # | Finding | Severity |
|---|---|---|
| 1 | NEO command palette links all **39 CDS views** and **20 Fiori apps** out of the NEO shell into the OLD routes, although NEO pages exist for every one. `search/build.ts:181,193`. | **P1** |
| 2 | `/neo/library/` is a Stage-1 placeholder reporting **10 books** and is linked from 6 places, including a Home button that itself prints **11**. The real shelf `/neo/books/` has 11. Two surfaces, one label. | **P1** |
| 3 | Every book **chapter** in the palette (105 chapters) resolves to that same flat placeholder instead of the reader. `command-index.ts:183`. | **P2** |
| 4 | All **33 concept** hits resolve to `/neo/knowledge/` although `/neo/knowledge/[slug]/` generates all 33. `command-index.ts:208`. | **P2** |
| 5 | Rail shows "מודל נתונים · **39** תחומים" pointing at a page that renders 15 modules / 220 tables and no domains. Breaks the file's own honesty rule. `nav-data.ts:122`. | **P2** |
| 6 | `/neo/domain-model/` is generated and shipped with zero inbound links. | **P2** |
| 7 | Reader pages (`/neo/read/*`) have no `PARENTS` entry, so a cold entry returns to Home instead of the shelf. `fallbacks.ts:30-58`. | **P2** |
| 8 | `/neo/centers/**` (100 pages) has no `PARENTS` entry; mitigated by hardcoded back links. | **P3** |
| 9 | `app/neo/erd/page.tsx:14` says 13 modules; the page renders 15. | **P3** |
| 10 | `hubContent()` carries 10 fully-written branches (`tables`, `transactions`, `bapi`, `idoc`, `cds`, `fiori-apps`, `enhancements`, `knowledge`, `academy`, `incidents`) plus the `default` Stage-1 branch that **can never render** — each id is shadowed by a static NEO page. Dead code that overstates the surface count. | **P3** |
