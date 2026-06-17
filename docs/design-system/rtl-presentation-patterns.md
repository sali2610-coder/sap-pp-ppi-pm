# NEO Cockpit — RTL Presentation Patterns

Reusable RTL/bidi standards for every NEO page. Learned from RTL-document engineering, converted to NEO web rules. **Offline-safe** (no remote fonts/assets).

> Core truth: correct RTL *markup* ≠ correct RTL *rendering*. Mixed Hebrew + SAP-Latin + numbers reorder silently unless each Latin run is isolated. This is the #1 cause of "the code looks scrambled."

---

## 1. Direction baseline
- Root already sets `dir="rtl"` (`app/layout.tsx`). Keep it. Never set `dir` ad-hoc per component.
- Author with **logical CSS**, not physical: `margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`, `border-inline`. Tailwind: prefer `ms-*/me-*/ps-*/pe-*/start-*/end-*` over `ml-*/mr-*/pl-*/pr-*/left-*/right-*`. Layout then mirrors automatically and never needs an RTL fork.

## 2. LTR isolation — the non-negotiable rule
Every Latin/number run sitting inside Hebrew must be isolated, or it reorders around the Hebrew:

```css
.tech { direction: ltr; unicode-bidi: isolate; }   /* SAP codes */
.num  { direction: ltr; unicode-bidi: isolate; text-align: start; }  /* numbers, dates, % */
```

**Isolate in NEO whenever you render:**
- table/structure names (`AUFK`, `EQUI`, `PLPO`), T-codes (`IW31`), BAPIs/FM/IDocs (`BAPI_ALM_ORDER_MAINTAIN`), CDS views, program names, domains, data elements
- field tech names + type/length (`CHAR 18`), key flags (`PK`/`FK`)
- numbers, counts, percentages, money (`1,200 ₪`), versions (`S/4HANA 2023`)
- dates and any English fragment in a Hebrew sentence

Rule: **wrap, don't trust auto-detection.** A label like `טבלת AUFK` with an un-isolated `AUFK` can flip. Use `<span class="tech" dir="ltr">`. NEO already ships `.tech` + `dir="ltr"` on code chips — make it mandatory, not optional, and add it to the lint checklist.

## 3. Arrow glyphs are banned in RTL text
`→ ← ↑ ↓ « »` as **text characters** re-orient unpredictably across renderers/PDF export. 
- For flow direction use **SVG icons** (lucide `ArrowLeft`/`ChevronLeft`) — they are graphics, immune to bidi. NEO's blueprint flow already does `ArrowLeft rotate-180` ✓.
- For "leads to / then" in copy use a comma, `ואז`, a colon, or numbered steps — never a glyph arrow.
- Exception: dedicated `dir="ltr"` LTR islands (an English diagram) may use arrows freely.

## 4. Numbers, dates, currency
- **Dates DD/MM/YYYY** (Israeli secular). Never MM/DD/YYYY.
- **Currency after the isolated number**: `1,200 ₪` / `6.6 ₪`, number isolated LTR.
- Percentages, counts, ranges: isolate (`90%`, `~4,350`, `10–100%`).
- Right-align numeric table columns but keep their content LTR-isolated.

## 5. Hebrew typography rules (apply everywhere)
- **Never add letter-spacing/`tracking-*` to Hebrew** — it breaks letterform joins and reads broken. Tracking is allowed only on Latin eyebrows/labels (`.eyebrow`, all-caps EN). Guard: don't put `tracking-wide` on a Hebrew `<h*>`.
- **Leading 1.6–1.8** for Hebrew body (Hebrew needs more than Latin). NEO body should not drop below `leading-relaxed` for paragraphs.
- **No nikud** (vowel marks) in product/technical Hebrew — reads unprofessional.
- Hebrew reads slightly larger than Latin at the same point size — don't shrink Hebrew below comfortable reading size to fit; split content instead.

## 6. Mixed-run composition checklist (per component)
Before shipping any Hebrew+code component, confirm:
1. Hebrew flows right-to-left, code/numbers sit where intended (didn't jump).
2. Every Latin/number run is wrapped `.tech`/`.num` (`dir="ltr"`, isolate).
3. No text arrow glyphs in RTL copy.
4. No `tracking-*` on Hebrew headings.
5. Logical spacing props (`ms/me/ps/pe`), so it mirrors.
6. Dates DD/MM/YYYY; currency after isolated number.

## 7. NEO offline note
The source skill recommends Rubik/Heebo/Assistant (Google Fonts). **NEO is 100% offline** → those are out. Keep the system `Segoe UI` Hebrew stack (`app/globals.css`). All rules above are font-independent; apply the *leading / no-tracking / isolation* discipline on the system stack. If a distinctive display face is ever wanted, self-host one OFL woff2 in `/public` — never `next/font/google`.
