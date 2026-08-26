# SOURCE CONFLICT — MB1A, and the 15 codes behind it

**Status: FLAGGED FOR HUMAN SAP CONFIRMATION. No dataset was changed. No winner was chosen.**

The pre-production audit flagged one record. Measuring it properly turned it into a class:
**16 transaction codes** where the project's two S/4HANA sources make opposite claims, and
**zero** where they agree.

Everything below is quoted from the repository. No outside SAP knowledge was applied, and no SAP
Note number appears here that is not already written in the files.

---

## 1 · The two sources

### Source A — `data/lifecycle.ts`

A per-transaction S/4HANA lifecycle table. 36 entries: 17 `Obsolete`, 14 `Active`, 5 `Deprecated`.
It carries a hard boolean, `s4`, meaning *does this transaction exist in S/4HANA*.

`data/lifecycle.ts:24`

```ts
"MB1A": { status: "Obsolete", ecc: true, s4: false, fiori: "Post Goods Movement (F0843)",
          alt: "MIGO", simplification: "MM-IM: single-screen transaction MIGO",
          migration: "הוסר ב-S/4HANA. החלף ב-MIGO/Fiori. בדוק BDC/ממשקים שמשתמשים ב-MB1A.",
          impact: "High" },
```

**Exact claim: `s4: false` — removed in S/4HANA.** Impact High. Replace with MIGO.

### Source B — `data/tx-intel.ts`, reached through `components/neo-shell/data/tx-detail.ts`

The deep per-transaction intelligence record NEO's transaction page renders. Its `s4` block carries
a `disposition` and a free-text `note`.

For `MB1A`, `txDetail("MB1A").s4` evaluates to:

```json
{ "disposition": "superseded",
  "he": "יש יורש ב-S/4HANA",
  "note": "זמינה אך מסומנת כ-legacy; SAP ממליצה MIGO. הקוד עדיין רץ ברוב המערכות.",
  "delta": "ב-S/4HANA העדף MIGO או את אפליקציית Fiori Post Goods Movement (F0843); התנועות נרשמות ל-MATDOC.",
  "supersededBy": ["MIGO"] }
```

**Exact claim: available, marked legacy, "still runs on most systems".**

### The disagreement, stated plainly

| | Source A `lifecycle.ts` | Source B `tx-intel.ts` |
|---|---|---|
| Does MB1A exist in S/4HANA? | **No** (`s4: false`, "הוסר") | **Yes** ("זמינה", "עדיין רץ") |
| What should you use? | MIGO | MIGO |
| Severity | High | risk `high`, trust `verified` |

The two agree on the *recommendation* and contradict each other on the *fact*.

---

## 2 · It is not one record

Measured over all 36 `lifecycle.ts` entries (`audit/repair/probe-lifecycle-conflict.mjs`):

| | |
|---|---:|
| Entries in `lifecycle.ts` | 36 |
| Marked gone in S/4 (`s4: false`) | 17 |
| …of those, with a NEO transaction page | 16 |
| **NEO page also says removed** | **0** |
| **NEO page says available / legacy / superseded** | **16** |
| Marked gone but with no NEO page | 1 |

**The 16:**

`MB1A` `MB1B` `MB1C` `MB31` `MB01` `MB02` `MB03` `MB11` `MBST`
`ME21` `ME22` `ME23` `XD01` `XK01` `FK01` `FD01`

Three coherent families, which is why this reads as a systematic difference of interpretation
rather than sixteen independent typos:

- **MB\*** — classic inventory postings, successor `MIGO`
- **ME21 / ME22 / ME23** — classic purchase order, successor `ME21N / ME22N / ME23N`
- **XD01 / XK01 / FD01 / FK01** — classic customer/vendor master, successor `BP` (CVI)

---

## 3 · What a reader sees today

| Route | Source it reads | What it shows for MB1A |
|---|---|---|
| `/neo/transactions/MB1A/` | `tx-detail` → `tx-intel` | "זמינה אך מסומנת כ-legacy" — **available** |
| `/evolution/` (legacy site) | `LIFECYCLE` | **Obsolete** badge, alt MIGO, impact High |
| `/copilot/` (legacy site) | `lifecycle(code)` | "סטטוס: Obsolete · חלופה: MIGO · Impact: High" |
| `/tcode/MB1A/` (legacy site) | `tx-registry` breadth | no status shown at all |

Verified directly, not inferred: `txDetail("MB1A")` contains neither the string `Obsolete` nor
`הוסר`. **`data/lifecycle.ts` is not consulted anywhere under `/neo/`.**

So the two claims never appear on the same page. A reader on NEO sees only "available/legacy" and
has no signal that the project holds a second, contradicting record.

---

## 4 · Is there a resolver?

**No.** `lib/s4.ts` (`s4For`) arbitrates the S/4 standing of **tables**, keyed on
`S4_IMPACT` / the blueprint's S/4 column. It never sees a transaction code.
`lib/tx-registry.ts` merges `TX_INTEL` → `TRANSACTIONS` → `TCODE_DIRECTORY` → `TCODE_CATALOG`
by precedence — and `data/lifecycle.ts` is not in that chain at all.

The conflict is therefore **architectural**: two independent datasets, no shared arbiter, no
consistency check. Nothing in the build fails when they disagree, which is why 16 disagreements
sat undetected.

---

## 5 · What is actually being asked

The disagreement is a real SAP question with a real answer, and it is **not** a question a script
should settle:

> When a classic transaction is listed in the S/4HANA Simplification List with a successor, is the
> correct project vocabulary **"removed"** or **"still callable but not strategic"**?

Both readings are defensible and they differ **by S/4HANA release and by the customer's own
configuration**. Picking one silently would either
(a) tell a consultant a transaction is gone when it still runs on their system, or
(b) tell them it still runs when their target release rejects it.

Both failures are exactly the class of error this product exists to prevent.

---

## 6 · Recommended interpretation, and its confidence

**Recommendation: reconcile toward a THREE-state vocabulary rather than picking a winner,
and confirm the state per code against the target release.**

`lifecycle.ts` already has the three states — `Active` / `Deprecated` / `Obsolete` — and only two
are being used against `tx-intel`'s dispositions. The disagreement disappears if `Obsolete` is
split into:

- **removed** — the transaction does not exist in the target release
- **not strategic** — it exists and is callable, the successor is mandatory for new work

**Confidence: LOW on which state each of the 16 belongs in.** That is a per-code, per-release SAP
fact, and neither dataset in this repository cites a Simplification Item ID or a release number
that would settle it. `lifecycle.ts` names Simplification *areas* ("MM-IM") but no item ID;
`tx-intel` names no SAP Note at all.

**Confidence: HIGH that the two datasets currently contradict each other on all 16 codes**, and
HIGH that no NEO surface exposes the contradiction. Those two facts are measured, not judged.

---

## 7 · What is needed to close this

Per code, one line of evidence that this repository does not currently hold:

1. The **target S/4HANA release** for the project (2020 / 2021 / 2022 / 2023 …).
2. The **Simplification Item ID** covering the code, from the Simplification Item Catalog.
3. Whether the item's disposition for that release is *not available* or *not strategic*.

With (1)–(3) the 16 records reconcile mechanically, and a build-time assertion can then keep the
two datasets from drifting apart again.

---

## 8 · What was deliberately NOT done

- No entry in `data/lifecycle.ts` was edited.
- No entry in `data/tx-intel.ts` was edited.
- No SAP Note number, Simplification Item ID or release number was invented.
- No resolver was added that would silently pick one side.
- No banner was added to `/neo/transactions/[code]/`, because any wording for it presumes an
  answer to §5.

**One item is flagged. Every other repair in this pass proceeded without it.**
