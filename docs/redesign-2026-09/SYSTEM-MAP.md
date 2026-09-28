# מפת המערכת החזותית · נקודת פתיחה 6ba22207

נוצר ב־28.09.2026 מסקריפט קריאה בלבד: `neo-redesign-evidence/tools/system-map.mjs` (הפלט המלא: `neo-redesign-evidence/baseline/system-map.json`). המספרים כאן מתארים את `origin/main` 6ba22207, לפני כל שינוי.

## שתי שכבות עיצוב

| שכבה | היכן | תפקיד |
|---|---|---|
| Legacy | `app/globals.css` (Tailwind v4 config-in-CSS, `:root`) | הקנבס הניטרלי, Design System v2, הספרייה הקפואה (`app/library/**`) |
| NEO | `app/neo/*.css` (23 קבצים) + חלק NEO ב־`app/globals.css` | כל נתיבי `/neo/**`; הצבעים החמים מוגדרים ב־`app/neo/ground.css` ומוגבלים ל־`.nx-app` כדי לא לשנות את קנבס הספרייה |

כלל שנשמר: כל שינוי צבע של NEO נשאר תחת `.nx-app`. הספרייה הישנה ממשיכה לקבל את הקנבס שאומת עליה.

## היקף

| מדד | ערך |
|---|---|
| קובצי CSS | 24 · 22,791 שורות |
| ערכי hex קשיחים ב־CSS | 591 |
| שמות Tokens מוגדרים | 337 |
| הצללות (`box-shadow`) | 277 |
| `@keyframes` | 93 |
| רדיוס Pill | 62 דרך `var(--r-pill)` + 23 ליטרליים (`999px`) |
| קובצי TSX ב־NEO | 200 · 55 ערכי hex בתוך הקוד |
| framer-motion ב־NEO | 0 קבצים (כל התנועה ב־CSS) |
| lucide-react ב־NEO | 68 קבצים |
| מחלקות צבע של Tailwind ב־NEO | 0 |

## Tokens קיימים

| קבוצה | ערכים (בהיר · כהה) |
|---|---|
| טקסט | `--ink-1` #0b0c0e · #e8ecf1, `--ink-2` #3a3f47 · #c2c9d3, `--ink-3` #686f79 · #949cab |
| משטחים | `--surface` #ffffff · #14181f, `--surface-2` #f4f5f7 · #1b2029, `--hairline` #eaecef · #2b323d; ב־NEO הקרקע החמה ב־`ground.css` (179 hex) |
| מותג | `--brand` #d62027 · #ff5a5f, `--brand-dark`, `--brand-soft` |
| סטטוס | not-started #94a3b8, in-analysis #f59e0b, in-conversion #3b82f6, tested #8b5cf6, done #10b981, removed #dc2626 |
| מודולים | 20 טוקנים `--mod-*` (PM #0f766e, PP-PI #1d4ed8, PP #4d7c0f, MM #0e7490, QM #9d174d, EWM #047857, FI #6d28d9, Fiori #5b21b6, CO #86198f, PI/PO #4338ca ועוד) |
| טיפוגרפיה | `--t-micro` 12px, `--t-xs` 13px, `--t-sm` 13px, `--t-body` 14px, `--t-h2` 18px, `--t-h1` 24px, `--t-display` 34px |
| גופנים | `--font-sans` Segoe UI וגופני מערכת, `--font-mono` Cascadia Code וגופני מערכת |
| רדיוס | `--r-xs` 6px, `--r-sm` 8px, `--r-md` 12px, `--r-lg` 16px, `--r-xl` 20px, `--r-2xl` 24px, `--r-pill` 999px |
| עומק | `--elev-1..4`, `--shadow-card`, `--shadow-lift` |
| תנועה | `--dur-micro` 90ms, `--dur-fast` 120ms, `--dur-base` 220ms, `--dur-panel` 280ms, `--dur-slow` 360ms, `--dur-route` 420ms; שמונה עקומות `--ease-*` |

## ממצאים שהבריף מחייב לשנות

1. **גוונים סגולים: 16 ערכים שונים.** `#8b5cf6` (סטטוס tested), `#6d28d9` (FI ב־ERD, כריכת PP-PI), `#7c3aed` (כריכת WM), `#5b21b6` (Fiori), `#86198f` (CO), `#4338ca` (PI/PO, אינדיגו גבולי), וגוונים כהים ובהירים נלווים (`#1e1435`, `#4a2c5a`, `#a78bfa`, `#d8b4fe`, `#f5d0fe`, `#d494c4`, `#7a3f6b`, `#b98cf5`, `#9b5de5`, `#b79dff`, `#7231c9`). כולם יוחלפו.
2. **Pill:** 85 שימושים. כפתורים יהיו מלבניים ברדיוס קטן; `50%` נשאר רק לנקודות ולעיגולים אמיתיים.
3. **גופן קטן מדי:** `--t-body` 14px לטקסט רציף; 89 הצהרות של 10px ועוד עשרות של 11px. היעד: 16px לקריאה, 13–14px למידע משני, 12px מינימום.
4. **משקלים לא עקביים:** 650, 750, 780, 550 לצד 600 ו־700. בגופן מערכת אלה מתעגלים לא צפוי.
5. **ערכים קשיחים:** 591 hex ב־CSS ו־55 ב־TSX. היעד הוא Tokens סמנטיים; hex קשיח חדש דורש הצדקה.
6. **הצללות:** 277 הצהרות. היעד הוא מעט רמות עומק מוגדרות, וקווים וריווח לפני צל.

## מה נשמר

- מבנה ה־Tokens (`--t-*`, `--r-*`, `--elev-*`, `--dur-*`, `--ease-*`, `--mod-*`, `--status-*`): מחליפים ערכים ומצמצמים סולמות, לא ממציאים שמות חדשים בלי צורך.
- התחימה ל־`.nx-app`.
- תנועה ב־CSS בלבד בשכבת NEO, ללא ספריית תנועה חדשה; `<ViewTransition>` של React זמין ב־App Router בלי תלות נוספת.
- lucide-react כמערכת האייקונים היחידה.
