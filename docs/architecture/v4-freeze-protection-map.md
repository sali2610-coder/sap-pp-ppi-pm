# v4 Freeze & Protection Map — מפת "אין לגעת"

**מטרה:** להגן על כל מה שעובד ומאושר בפרוד. **חוק:** אף פריט ברשימה זו לא משתנה בלי אישור מפורש של Sali. שינוי גלובלי (טוקן/קומפוננטה משותפת) = תמיד Design Review מלא + רגרסיה ויזואלית.

מתוך 150 מערכות, **54 סומנו `freeze=true`**. להלן הקבצים המדויקים.

---

## A. FROZEN HARD — הליבה החווייתית (v4 freeze list במלואה)

### A.1 Library · Bookshelf · Covers
| רכיב | קבצים | למה מוקפא |
|------|--------|-----------|
| Book Cover System | `components/book-cover.tsx` | דטרמיניסטי, 100% offline, בשימוש ב-Library/Academy/landing; `MODULE_COLORS` נעול |
| Library Landing / Shelf | `app/library/page.tsx`, `app/library/layout.tsx`, `data/library.ts` | חוויית גילוי, `READER` map, `neo:lib:recent`, אנימציות מדף |

### A.2 Reader (כל מנגנון הקריאה)
| רכיב | קבצים |
|------|--------|
| Book Reader container | `components/book-reader.tsx` |
| Chapter Reader + Section Spread | `components/chapter-reader.tsx`, `components/section-spread.tsx` |
| Figure Viewer (zoom/pan/a11y/morph) | `components/figure-viewer.tsx` |
| Page-Turn engine | `components/page-view.tsx` |
| Reading state (progress/bookmarks/history) | `lib/reader-store.ts`, `lib/learn-store.ts`, `lib/continuity-store.ts` |
| Reader sound synthesis | `lib/reader-sound.ts`, `lib/sound.ts` |
| Reader typography/themes CSS | `app/globals.css:650-786`, `:823-854` (`.neo-reader`) |

**חוקי מפתח לא-משתנים:** מפתחות localStorage (`neo:reader:{bookId}`, `neo:continuity:v1`, `neo:learn:streak`) — שינוי דורש migration. מזהי ספרים + מספור פרקים (`READER`, `LIB_BY_BOOK`) — שינוי שובר deep links. עוגני `#ch-N`/`#sec-{id}` — בשימוש scroll-spy.

### A.3 Motion tokens
`lib/motion.ts` — DUR/EASE/SPRING_MORPH. נעול; שינוי דורש animation audit מלא.

### A.4 SAP Academy — חוויית הלמידה הקיימת
| רכיב | קבצים |
|------|--------|
| מנוע בלוקים (החוזה) | `lib/academy/lesson-types.ts` |
| Renderer | `components/academy/lesson-view.tsx` |
| Learning Path | `components/academy/learning-path.tsx` |
| Academy Home + gamification | `components/academy-home.tsx`, `lib/academy/gamification.ts` |
| Progress/recent | `lib/academy/lesson-progress.ts`, `lib/academy/recent.ts` |
| רישום שיעורים | `data/academy/lessons/**` (62 שיעורים: PM/PP-PI/QM) |
| Academy routes | `app/academy/**` |
| Library academy modules | `app/library/{pm,wm,qm,sop,mm,ppds,pmu,pp}-academy/**` |

> הערה: תוכן חדש (מודול MM וכו') **מתווסף** ע"י data files חדשים בלבד — המנוע והחוויה מוקפאים. הוספה ≠ שינוי.

### A.5 Architecture Studio
`components/architecture-studio.tsx`, `lib/studio-graph.ts` — חלק מהזהות הוויזואלית; מוקפא.

### A.6 Reviewer / Governance layer
כל 11 ה-Skills + השער הסופי (`.claude/skills/**`) — מוקפאים. שינוי בהם משנה את חוקי-המשחק של כל PR.

---

## B. FROZEN by design-token law — נוגעים רק דרך D-track מבוקר

| רכיב | קבצים | תנאי שינוי |
|------|--------|-------------|
| Design tokens v2 | `app/globals.css` (95 CSS vars, `@theme inline`) | שינוי טוקן = שינוי גלובלי → Design Review מלא + רגרסיה ויזואלית (v4 §9.15). נעילה סופית ב-D1 באישור Sali |
| Design System v2 palette | brand `#d62027` accent-only, `--surface`/`--ink-1/2/3`/`--hairline` | נאכף ע"י `neo-sap-visual-designer` per PR |
| Adaptive Layout Engine (Phase 9) | `.container-app` ramp, font-size ramp | נאכף ע"י `enterprise-adaptive-ui-reviewer` |

---

## C. FRAGILE / Large-Blast-Radius — לגעת בזהירות מרבית

| רכיב | קובץ | סיבת השבירה |
|------|------|--------------|
| App Shell | `components/app-shell.tsx` | מרנדר 11 globals + header + sidebar + footer → נוגע בכל דף |
| Root layout | `app/layout.tsx` | עוטף את הכל |
| Page transition | `app/template.tsx` | fade על כל route |
| Primary nav | `components/knowledge-sidebar.tsx` | `NAV` inline (4 קבוצות×18 פריטים) בכל דף |
| Mobile nav | `components/mobile-tab-bar.tsx` | ניווט ראשי במובייל |
| Centers registry | `lib/centers.ts` | מזין mega-menu + sheet + related + command palette |
| Global CSS | `app/globals.css` | כל שינוי CSS גלובלי משפיע על כל האתר |
| Route manifest | `lib/route-manifest.generated.ts` | **generated — לעולם לא לערוך ידנית**; `npm run gen:routes` בלבד |
| Module portal engine | `lib/module-portal.ts`, `components/module-portal.tsx` | מזין PM/PP-PI/Infrastructure |
| Search haystacks | `lib/data.ts`, `lib/tcode-search.ts`, `lib/extra-search.ts` | 3 נתיבי-אינדקס; שינוי לא-מתואם שובר חיפוש |

---

## D. כפילויות / חפיפות שזוהו (לא לפתור עכשיו — רק לתעד)

| נושא | מצב | פעולה עתידית |
|------|------|---------------|
| **אינדקסי חיפוש** | 3 נתיבי-חישוב נפרדים (`HAYSTACK` / `buildSearchIndex` / `fieldIndex`) | איחוד ל-`lib/search-index.ts` יחיד — E2/E5, באישור |
| מודלי גרף | `lib/knowledge-graph.ts` (טבלאות), `knowledge-graph-global.ts` (הכל), `studio-graph.ts` (studio), `object-graph.ts` (connections) | לאחד תחת `relationships/` — E1/E3 |
| Design tokens | CSS ב-`globals.css` בלבד (מקור יחיד) + ~25 hex קשיחים בקומפוננטות | להסיר את ה-hex הקשיחים (design-lint) — D2 |
| **Routes** | **אין כפילות/redirect** — Transaction Center כבר אוחד; מודולים ו-centers ייחודיים | ✅ נקי |
| Registries | אין כפילות registry אמיתית; TS מוקלד יחיד לכל סוג | ✅ |

---

## E. Deep links / persisted state שאסור לשבור

- production routes: כל 147 (במיוחד `/library/book{1-11}`, `/academy/lesson/[slug]`, `/tcode/[code]`, `/bapi/[name]`, `/pm`, `/pp-pi`, `/delivery|integration|security|alm|fiori`).
- localStorage keys: `neo:reader:*`, `neo:continuity:v1`, `neo:learn:*`, `neo:academy:activity`, `neo:lib:recent`, `neo:obj:recent`, `neo:home:recent`, `neo:nav:open`, `neo:sidebar:collapsed`, `neo:onboarded`.
- anchors: `#ch-N`, `#sec-{id}`, section-nav ids.

**שינוי כל אחד מאלה = migration מתוכנן + אישור Sali, לעולם לא בדרך-אגב.**
