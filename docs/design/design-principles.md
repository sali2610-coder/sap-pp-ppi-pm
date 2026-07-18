# SAP by Sali — Design Principles (Global Design Language)

**סוג:** תיעוד בלבד. אפס שינוי קוד/CSS. מקודד את שפת העיצוב **הקיימת** (Design System v2) לחוק. כל ערך כאן נגזר מ-`app/globals.css` + `lib/motion.ts` בפועל — לא מומצא.
**עיקרון-על:** כל דף, פיצ'ר ומודול עתידי חייב להיראות כאילו עוצב ע"י אותו צוות באותו יום.

---

## 0. חמשת עקרונות הליבה הוויזואליים

1. **Neutral-first, red is accent only.** הקנבס ניטרלי (`#fcfcfd`→`#f4f5f7`), הטקסט שחור-רך (`#0b0c0e`), האדום `#d62027` הוא **מבטא בלבד** — לעולם לא רקע של כרטיס/סקציה. (`globals.css:8-19,36`)
2. **One card system.** משפחת כרטיסים אחת (`card` / `card-interactive` / `surface` / `card-premium`) — כרטיס חדש = וריאנט, לא כרטיס מאפס. (`globals.css:214-231,266-306,505-519`)
3. **Elevation over borders.** היררכיה דרך סולם צל רך (`--elev-1..4`) + hairline `#eaecef` של 1px, לא דרך קווים כבדים או צבע. (`globals.css:248-251`)
4. **Restraint + craft.** Benchmark מוצהר בקוד: "Linear/Stripe/Vercel restraint + Apple craft" (`globals.css:245`). פחות תנועה, פחות צבע, יותר דיוק אופטי.
5. **Offline · RTL · Presentation-ready.** גופן מערכת בלבד (Segoe UI), עברית RTL תחילה, קוד SAP תמיד LTR/mono, והכל מתאים מפולפון עד מסך 86".

---

## 1. Color System

**מקור אמת:** `:root` ב-`app/globals.css:8-52` + `@theme inline:54-96`. חוק: אין hex גולמי בקוד פיצ'ר — רק הפניה לטוקן.

### Surfaces (ניטרלי)
| טוקן | ערך | שימוש |
|------|------|--------|
| `--background` | `#fcfcfd` | קנבס האפליקציה |
| `--background-2` | `#f4f5f7` | תחתית ה-gradient הסביבתי |
| `--surface` / `--card` | `#ffffff` | רקע כרטיס |
| `--surface-2` / `--muted` | `#f4f5f7` | רקע משני (badge, icon well) |
| `--hairline` / `--border` | `#eaecef` | גבול 1px — **ברירת מחדל לכל גבול** |

### Ink (טקסט — 3 רמות)
| טוקן | ערך | שימוש |
|------|------|--------|
| `--ink-1` | `#0b0c0e` | כותרות, טקסט ראשי |
| `--ink-2` | `#3a3f47` | גוף, טקסט משני |
| `--ink-3` | `#6b727c` | metadata, eyebrow, placeholder (במובייל מתחזק ל-`#5b6570` לניגודיות) `globals.css:868` |

### Brand (מבטא בלבד)
`--brand #d62027` · `--brand-dark #a3171c` · `--brand-soft #fef2f2` · `--brand-foreground #ffffff`. שימושים מותרים: `text-brand`, accent hairline ב-hover, קו `accent-rule`, אינדיקטור-active בניווט, inline-code chips. **אסור:** רקע כרטיס/סקציה אדום.

### Module accents (זהות מודול)
PM `#f97316` · PP-PI `#6d28d9` · QM `#059669`/`#0891b2` · MM `#d97706` · WM `#7c3aed` · IBP `#0891b2` · Fiori `#db2777` · Foundation `#475569`. (`book-cover.tsx:11-19`) — מודול חדש בוחר accent אחד מהמשפחה הזאת.

### Status (מיגרציה ECC→S/4)
`not-started #94a3b8` · `in-analysis #f59e0b` · `in-conversion #3b82f6` · `tested #8b5cf6` · `done #10b981`. (`globals.css:42-46`) צבע פונקציונלי תמיד עם אייקון/טקסט, לעולם לא צבע-בלבד.

### Semantic callout palettes (מקודדים בפועל)
- **אזהרה/mistakes:** רקע `#fff8ec` · גבול-start `#f59e0b` · טקסט `#92400e`.
- **best-practices/tips:** רקע `#f0f6f5` · גבול `#cfe6e2` · טקסט `#0f5e57`.
- **business-value:** רקע `indigo-50/40` · גבול-start `indigo-400` · טקסט `indigo-700`.
- **deep-link flash:** צהוב SAP `rgba(250,204,21,*)`.

---

## 2. Typography Hierarchy

**Families (`globals.css:85-86`):** `--font-sans` = `"Segoe UI", system-ui, -apple-system, ...` · `--font-mono` = `"Cascadia Code", "JetBrains Mono", "Consolas", ...`. **חוק:** קוד SAP (טבלה/T-Code/BAPI/CDS/SPRO) תמיד `--font-mono` + `direction:ltr; unicode-bidi:isolate` — גם בתוך משפט עברית. (`globals.css:184-190`)

**Type scale (minor-third 1.20, rem-based → מכבד font-scale):** (`globals.css:255-256`)
`2xs .6875` · `xs .75` · `sm .875` · `base 1` · `lg 1.125` · `xl 1.375` · `2xl 1.75` · `3xl 2.25` · `display 3rem`.

**Fluid heading utilities (`globals.css:359-383`):** `text-display` (clamp 2.25→3.75rem, w800, tracking -.03em) · `text-h1` (clamp 1.5→2.25, w800) · `text-h2` (clamp 1.125→1.5, w700) · `text-eyebrow` (.6875rem, uppercase, tracking .18em) · `text-caption` (.75rem, ink-3).

**Eyebrow (תג-על):** `eyebrow-2` — .6875rem, w700, tracking .08em, uppercase, ink-3 (`globals.css:233-239`).

**חוקים:** H1 אחד לדף · אין קפיצות רמה · headings מקבלים `letter-spacing -.02em` + `text-wrap: balance` (`globals.css:354-357`) · מספרים בטבלאות ב-`tabular-nums` · אורך שורה לימודי מוגבל (74ch reader).

---

## 3. Spacing, Radius, Elevation, Shadows

- **Spacing:** מבוסס Tailwind (סולם 4pt). המרווחים החוזרים בפועל: card padding `p-5 sm:p-6/7`, grid gap `0.625/0.75/1/1.25rem` (מתרחב במסכי ענק), section gap `space-y-3/4/5/6`.
- **Radius (`globals.css:48,88-92`):** base `--radius .75rem`. סולם: `sm` (calc-6px) · `md` (-3px) · `lg` (.75rem) · `xl` (+4px) · `2xl` (+10px). כרטיסים בפועל: `rounded-2xl` (1rem) / `rounded-3xl` (hero/path).
- **Elevation (`globals.css:248-251`):** `--elev-1` (rest, 1px) · `--elev-2` (כרטיס ברירת מחדל) · `--elev-3` (hover) · `--elev-4` (modal/palette). צל תמיד רך, שכבתי, נמוך-ניגודיות.
- **Focus ring:** `--ring-soft` = 4px טבעת ב-brand 14% (`globals.css:252`); keyboard `:focus-visible` = 2px outline brand + 2px offset; על ה-header האדום → outline לבן (`globals.css:418-426`).

---

## 4. Cards & Sections (הקנון)

| שכבה | utility | anatomy | hover |
|------|---------|---------|-------|
| בסיס לא-אינטראקטיבי | `card` | bg-surface · 1px hairline · radius 1rem · shadow 0 1px 2px | — |
| אינטראקטיבי | `card-interactive` | כנ"ל + transition 0.18s | lift shadow + hairline→brand 30% |
| פרימיום | `surface` | bg-card · elev-2 · will-change transform | elev-3 + translateY(-2px) + brand 22% border |
| פרימיום v2 | `card-premium` | bg-#fff · elev-2 · transition 0.4s ease-premium | elev-3 + translateY(-2px/-4px) |

**Section container קנוני:** `rounded-2xl border-hairline bg-surface p-5 sm:p-6 scroll-mt-24/28` + header = icon-well (`grid size-8/11 place-items-center rounded-lg/xl bg-surface-2 text-brand`) + `eyebrow-2` + `h2/h3`. (מ-`object-expert.tsx:23-32`, `process-flow.tsx:70-90`)

**Icon-well קנוני:** `grid size-{8,9,10,11} place-items-center rounded-{lg,xl}`, רקע = `{accent}1f` (accent 12%), צבע = accent.

---

## 5. Grid & Layout System

- **Container יחיד (`container-app`, `globals.css:449-474`):** max-width `1800px` → `1960@1920` → `2320@2560` → `2760@3200` → `3280@3840`. padding מתרחב `1→1.5→2→2.5→3→3.5→4rem`. **מקור יחיד לרוחב/padding של כל דף.**
- **Adaptive grids:** `grid-adaptive` = `auto-fill minmax(clamp(260px,21vw,360px),1fr)` · `grid-adaptive-sm` = `clamp(150px,13vw,220px)` (מובייל: 2-col מובטח). (`globals.css:486-502`)
- **תבניות דף סגורות (canon):** Portal Home · Learning Page · Reference/Object Page · Explorer Page · Studio Canvas · Knowledge Center · Search Results. כל route משתייך לאחת (ראו `design-blueprint.md`).
- **אזורי דף קבועים:** Breadcrumb → Header(eyebrow/title/metrics/actions) → Content → Related/Cross-links → Continue/Footer.

---

## 6. Responsive Behavior (Adaptive Layout Engine — Phase 9)

מנוע אחד שכל דף יורש (`globals.css:459-546`). שני מנופים: (1) container גדל עם המסך, (2) `:root font-size` עולה `16→17.5@2560→19.5@3200→21.5@3840` כך שכל טיפוגרפיה+spacing (rem) גדלים יחד — בלי browser zoom בחדרי ישיבות.

**מחלקות viewport:** Compact(phone 390) · Medium(tablet 768) · Large(laptop) · XL(desktop 1280) · XXL(ultra-wide 2560) · Presentation(55"–86").
**חוקים:** אין גלילה אופקית ברמת דף (`html/body overflow-x: hidden/clip`) · טבלאות רחבות = overflow-x פנימי + עמודת-מפתח דביקה (`globals.css:890-899`) · inputs 16px במובייל (anti-zoom) · touch targets `.tap ≥44px` על coarse pointer (`globals.css:529-531`) · chip-rails עם scroll-snap + hidden scrollbar.

---

## 7. RTL Rules

1. עברית RTL מלא (`dir="rtl"`). קודים/טבלאות/T-Codes/SPRO תמיד LTR עם `unicode-bidi: isolate` — משפט מעורב לא נשבר. (`globals.css:184-190`)
2. Logical properties בכל CSS: `padding-inline`, `inset-inline-start`, `border-inline-start`, `margin-inline` — "start/end", לא "left/right". דוגמה: sticky key column `inset-inline-start:0` (`globals.css:892`).
3. אייקוני כיווניות (חצים, breadcrumb `ArrowLeft`) עקביים ל-RTL — "קדימה" = שמאלה. ה-Reader ממפה `←`=הבא, `→`=הקודם (`figure-viewer` RTL keymap).
4. מעבר לאנגלית = אותה מערכת ב-LTR, בלי עיצוב נפרד.

---

## 8. Motion Principles (תמצית — פירוט ב-`motion-system.md`)

מטוקנים בלבד (`lib/motion.ts` + `globals.css`): `DUR fast .12 / base .24 / page .32 / slow .5` · `EASE.out [0.2,0,0,1]` (חתימה) · spring יחיד `SPRING_MORPH` (260/30) שמור למורף figure. חוקים: תנועה משרתת הבנה, לא קישוט · transform+opacity בלבד (60fps) · `prefers-reduced-motion` מכבה הכל (נאכף גלובלית `globals.css:429-436`) · אין CLS · כניסה מתוזמרת פעם אחת (stagger `Math.min(i*0.03..0.06, 0.3)`).

---

## 9. Freeze Rules — ויזואלי (אסור לשנות בלי אישור Sali)

ראו מפה מלאה: `docs/architecture/v4-freeze-protection-map.md`. ויזואלית מוקפאים:
- **Reader** — כל מצבי קריאה, page-turn, figure-viewer, sepia/night themes (`globals.css:646-859`).
- **Bookshelf + Book Covers** — cover pure-CSS דטרמיניסטי, spine width function, ledge (`book-cover.tsx`).
- **Academy identity** — lesson-view Block, tone bars, learning-path timeline, gamification ring, completion celebration.
- **Motion style** — `lib/motion.ts` DUR/EASE/SPRING_MORPH.
- **Navigation behavior** — sidebar active-indicator, mobile tab bar, command palette ⌘K, breadcrumbs.
- **Design tokens v2** — 95 ה-CSS vars; שינוי טוקן = שינוי גלובלי → Design Review מלא + רגרסיה ויזואלית.

**חוק:** תיקון = Design Review מלא. שינוי גלובלי (טוקן/קומפוננטה משותפת) לעולם לא בדרך-אגב.

---

## 10. Enforcement (איך העקרונות הופכים לחוק — עתידי, docs-only היום)

- **design-lint (D2):** tokens-only (אין hex/px קשיח), component-allowlist, template-required, focus-visible, contrast, touch-target, reduced-motion, CLS.
- **Design Judge (D3):** שימוש נכון בקומפוננטה, עקביות שפה ("האם דף זה נבנה ע"י מי שבנה את השאר?"), RTL, a11y, hierarchy, motion quality — עם צילומי Mobile+Desktop+RTL.
- **Reviewer skills קיימים שכבר אוכפים חלק מזה:** `neo-sap-visual-designer`, `enterprise-adaptive-ui-reviewer`, `neo-accessibility-reviewer`, ושער `neo-enterprise-ux-auditor`.
