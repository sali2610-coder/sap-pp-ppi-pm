# Item 9A + 9D — measured, not eyeballed

## 9D — navigation / filter polish, no clipped rows or crowded toolbars

24 surfaces × {desktop light, desktop dark, phone with a real iPhone UA} = **72 renders**.

| check | result |
|---|---|
| console errors | **0** |
| horizontal overflow | **0** |
| controls off-screen and unreachable | **0** |
| buttons with no accessible name | **0** |
| tap targets under 24×24 | **0** |

Surfaces: Home · PM · PP-PI · ERD · Tables · Table detail (EQUI) · Transactions ·
Object AUFK · Object EQUI · Books · Book hub · Reader · Ask the Library · NEO AI ·
Academy · Knowledge Center · S/4HANA · S/4 Readiness · Migration Cockpit ·
Domain model · CDS · Fiori apps · Studio · Incidents.

### The 1,300 "clipped rows" that were not clipped rows

A first pass counted any `overflow:hidden` element whose `scrollHeight` exceeded
its `clientHeight` as a clipped row, and reported 121 on Transactions, 96 on
mobile CDS, 81 on Incidents. Every single one resolved to:

```
.nx-sr   clientHeight = 1px
```

which is this project's screen-reader-only utility (`rail.css:156` —
`inline-size: 1px; block-size: 1px; clip-path: inset(50%)`). The heuristic was
counting **accessibility markup as a defect**. There is no line-clamp, no
ellipsis truncation and no collapsed content behind those numbers. Corrected
count of genuinely clipped rows: **0**.

## 9A — professional Hebrew copy

298,849 characters of *rendered* copy across the 24 surfaces.

| check | result |
|---|---|
| AI writing tells (למנף · חוויה חלקה · להעצים · מהפכני · לא רק…אלא גם · בסופו של יום …) | **0** |
| placeholder / lorem / TODO / TBD | **0** |
| Latin or Cyrillic glued inside a Hebrew word (encoding damage) | **0** |
| em-dashes | 281 rendered · 95 in NEO-scope source strings |

### The em-dashes are a decision, not a defect — and they are NOT mine to make

The standing rule is zero em-dashes in text written for this project. The 95 in
NEO scope are almost entirely **SAP subject matter using the dash as a
definitional gloss**, which is correct Hebrew technical typography:

```
lib/idoc-intel.ts   "שגיאת יישום — ה-IDoc התקבל אך עיבוד היישום נכשל"     ← IDoc status 51
lib/s4.ts           "ללא שינוי מהותי ב-S/4HANA — הטבלה נשמרת (תואם)."
lib/cross-links.ts  "מנהלת ביצוע עבודת אחזקה — פעולות, מרכזי עבודה, חומרים…"  ← AUFK
lib/cross-links.ts  "בארגון: מפעיל פותח M1 'ממלאת #2 — דליפה'"              ← worked example
```

The rendered ones also include **published book titles**:

```
אחזקת מפעל ב-SAP S/4HANA — מדריך למשתמש העסקי
Plant Maintenance with SAP S/4HANA — Business User Guide
```

and text derived from the blueprint's own S/4 column:

```
כותרת מסמך חומר — מאוחדת ל-MATDOC. MKPF = View תאימות (NSDM_V_MKPF).
```

Rewriting these would mean editing validated SAP content and altering a real
book title, both of which are explicit hard NOs in this brief. **Left untouched
and escalated rather than silently changed.** If the style rule should override
the content rule for the ~30 strings that are genuinely UI chrome rather than
SAP subject matter, that is a call for the project owner, and it is a
mechanical change once the line is drawn.

## Measurement errors recorded this pass

13. **ERD toggles read as "no visual state".** They carry state in the label:
    `הסתר את המפה המוקטנת` (aria-pressed=true) ⇄ `הצג את המפה המוקטנת` (false).
    Not a defect. Verified by clicking rather than "fixed".
14. **1,300 clipped rows.** All `.nx-sr` screen-reader text at 1px. See above.
