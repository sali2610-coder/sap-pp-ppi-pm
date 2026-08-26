# OPEN · SAP LIFECYCLE CONFLICTS — evidence required before any data change

**Status: OPEN. Nothing in `data/lifecycle.ts` or `data/tx-intel.ts` was changed.
No replacement transaction was inferred. No SAP Note number appears here that is not already
written in the repository.**

`data/lifecycle.ts` marks **17** transactions as absent from S/4HANA (`s4: false`).
Measuring what NEO actually renders for each turned "17 conflicts" into three different problems.
They need three different kinds of evidence, and only one of them is a genuine SAP-knowledge
question.

---

## 1 · The three groups

| Group | Count | Codes | What it actually is |
|---|---:|---|---|
| **A · Genuine disagreement** | **12** | `MB01` `MB02` `MB03` `MB11` `MB1A` `MB1B` `MB1C` `MB31` `MBST` `ME21` `ME22` `ME23` | lifecycle.ts says removed; NEO's prose says available / legacy. A real SAP fact is in dispute. |
| **B · Enum mismatch only** | **4** | `FD01` `FK01` `XD01` `XK01` | NEO's prose **already agrees** — it says "חסומה ב-S/4HANA" / "Obsolete בלוגיקה הקלאסית". Only the structured `disposition` field disagrees. |
| **C · No NEO surface** | **1** | `ENPR` | lifecycle.ts holds a record; NEO generates no transaction page, so nothing contradicts it and nothing shows it. |

---

## 2 · Group A — the 12 that need an authoritative SAP source

These are the only ones where the project holds two incompatible claims about the same SAP fact.

| Code | `lifecycle.ts` claim | NEO (`tx-intel`) claim | NEO trust | Successor named by both |
|---|---|---|---|---|
| `MB1A` | Obsolete · `s4:false` · "הוסר ב-S/4HANA" · impact **High** | `superseded` · "זמינה אך מסומנת כ-legacy… הקוד עדיין רץ ברוב המערכות" | verified | MIGO |
| `MB1B` | Obsolete · `s4:false` · impact **High** | `superseded` · "זמינה כ-legacy; SAP ממליצה MIGO/MIGO_TR" | verified | MIGO |
| `MB1C` | Obsolete · `s4:false` · impact **High** | `superseded` · "זמינה כ-legacy; MIGO היא הסטנדרט" | verified | MIGO |
| `MB01` | Obsolete · `s4:false` | `superseded` | verified | MIGO |
| `MB02` | Obsolete · `s4:false` | `changed` | partial | MIGO |
| `MB03` | Obsolete · `s4:false` | **`available`** | partial | MIGO |
| `MB11` | Obsolete · `s4:false` · impact Medium | `changed` · "MB11 ומשפחת MB1x נחשבות legacy" | partial | MIGO |
| `MB31` | Obsolete · `s4:false` · impact Medium | `changed` · "זמינה כ-legacy; MIGO/MIGO_GR הם הסטנדרט" | verified | MIGO |
| `MBST` | Obsolete · `s4:false` | **`available`** | partial | MIGO / MBRL |
| `ME21` | Obsolete · `s4:false` | `superseded` | verified | ME21N |
| `ME22` | Obsolete · `s4:false` | `superseded` | verified | ME22N |
| `ME23` | Obsolete · `s4:false` | `superseded` | verified | ME23N |

### Evidence required, per code

For each of the 12, one of the following, quoted with its identifier — **not paraphrased, and not
inferred from the successor's existence**:

1. **SAP Simplification Item** — the item ID from the Simplification Item Catalog that covers the
   transaction, and its disposition for the project's target release. This is the authoritative
   artefact for exactly this question and it is what the project does not currently hold:
   `lifecycle.ts` names Simplification *areas* ("MM-IM", "Business Partner Approach") but **no item
   ID**, and `tx-intel` names none at all.
2. **SAP Help Portal** — the page for the target release stating whether the transaction exists,
   with its URL and the release it documents.
3. **SAP Note / KBA** — where one exists that states the removal or the continued availability.
   A number must come from `launchpad.support.sap.com`; none is written here.

### The one input that unblocks all 12 at once

**The project's target S/4HANA release.** These dispositions are release-dependent. Without a
target release the question has no single answer, which is precisely why neither dataset can be
declared correct today.

---

## 3 · Group B — the 4 that need no SAP research

`FD01` `FK01` `XD01` `XK01`. The two sources already say the same thing in words:

> `XD01` · lifecycle.ts: "לקוח/ספק דרך BP בלבד. XD01 חסום/מנותב ל-BP."
> `XD01` · tx-intel: "**Obsolete בלוגיקה הקלאסית.** ב-S/4HANA יצירת לקוח נעשית דרך Business Partner
> (BP) עם תפקיד FLCU00…"

> `XK01` · lifecycle.ts: "ספק דרך BP בלבד. CVI חובה."
> `XK01` · tx-intel: "**חסומה ב-S/4HANA.** הקמת ספק מתבצעת אך ורק דרך BP…"

The disagreement is that `tx-intel`'s `disposition` enum has no value meaning *removed* — the
closest values in use are `superseded` and `available`, and one of those gets picked. This is a
**schema gap, not a knowledge gap**, and it can be closed without any SAP source: give the enum a
`removed` value, or drive the badge from the prose the record already carries.

Still not changed here, because it edits validated project data and the brief reserves that.

---

## 4 · Group C — `ENPR`

`lifecycle.ts` marks it removed. `/neo/transactions/ENPR/` is not generated, so the claim is
neither contradicted nor visible. Needs the same Simplification-Item evidence as Group A **if** the
code is meant to be surfaced at all; otherwise it is simply an unused record.

---

## 5 · Why NEO shows only one side today

`lib/tx-registry.ts` merges `TX_INTEL` → `TRANSACTIONS` → `TCODE_DIRECTORY` → `TCODE_CATALOG`.
**`data/lifecycle.ts` is not in that chain.** Verified directly: `txDetail("MB1A")` contains
neither the string `Obsolete` nor `הוסר`.

`lib/s4.ts` (`s4For`) does arbitrate S/4 standing — but only for **tables**, keyed on `S4_IMPACT`.
It never sees a transaction code.

So there is no resolver to correct, and nothing in the build fails when the two datasets disagree.
That is why 17 disagreements sat undetected.

---

## 6 · What must NOT happen

- Do **not** pick `lifecycle.ts` because it is more specific.
- Do **not** pick `tx-intel` because it is `trust: verified` — that flag describes the record's own
  authoring, not an adjudication against the other dataset.
- Do **not** infer a replacement transaction from the successor already named. Both datasets
  already agree on the successor; the successor's existence says nothing about whether the
  predecessor still runs.
- Do **not** add a "conflict" badge to `/neo/transactions/[code]/`. Any wording for it presumes an
  answer to §2.

---

## 7 · Recommended sequence when you have the evidence

1. Fix the target release.
2. Pull the Simplification Item for each of the 12 and record the item ID in `lifecycle.ts`
   alongside the existing area name.
3. Close Group B by extending the `disposition` enum, not by editing prose.
4. Add a build-time assertion that fails when `lifecycle.ts` and `tx-intel` disagree on a code, so
   the two can never silently drift apart again.

**Until step 1 exists, this item stays OPEN and no validated project data is touched.**
