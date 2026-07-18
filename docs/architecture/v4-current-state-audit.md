# v4 Current-State Audit — מצב הריפו בפועל מול Platform Design v4

**סוג:** Audit קריאה-בלבד. אפס שינוי קוד/עיצוב/route/data. **תאריך:** 17.07.2026
**שיטה:** 9 auditors מקבילים (read-only) על הריפו, כל אחד ממופה לסעיפי v4. 150 מערכות, כל ממצא עם ראיה (file:line/symbol/count).
**מסקנת-על:** מתוך 150 מערכות — **0 קונפליקטים** מול v4. עקרון "Evolution, לא Rewrite" מאומת: אין ארכיטקטורה שסותרת את v4; כל הפערים הם פערי *פורמליזציה* (הפונקציונליות חיה, המבנה הפורמלי של v4 לא קיים כקבצים).

---

## 0. מספרים

| מדד | ערך |
|------|------|
| מערכות שנבדקו | 150 |
| Routes (page.tsx) | 147 |
| קיים (v4-shape) | 101 |
| קיים-בשם-אחר (AliasName) | 4 |
| חלקי (Partial) | 26 |
| חסר (Missing) | 18 |
| כפילות (Duplicate) | 1 |
| **קונפליקט** | **0** |
| סיכון גבוה / קריטי | 3 / 1 |
| מוקפא (freeze) | 54 |

---

## 1. Product + Domain Architecture (v4 §1–2)

**קיים בפועל.** הפלטפורמה כבר בנויה כשני אגפים על תשתית אחת, בדיוק כמו הדיאגרמה ב-v4 §1.1:
- **Learning Wing** — SAP Academy (`app/academy/**`, 62 שיעורים ב-`data/academy/lessons/`), Library (11 ספרים + 8 academy modules ב-`app/library/**`), Knowledge Centers (`lib/centers.ts` — 5 centers), Incidents (`components/incident-explorer.tsx`).
- **Tools Wing** — Architecture Studio (`components/architecture-studio.tsx`), Data Model, Explorers (Transactions/Tables/BAPI/CDS/IDoc/Exits/Enhancements), Master Data (`components/master-data-facets.tsx`), Search (⌘K).
- **Shared Foundation** — Registry (TS files), Relationship Graph (`lib/knowledge-graph*.ts`), Search Index (runtime), Design tokens (`app/globals.css`), Static/Offline/RTL runtime.

ששת הדומיינים של v4 §2 קיימים כתחומי-אחריות, אבל **הבעלות על נתונים היא לפי קובץ TS, לא לפי תיקיית `registry/` פורמלית**. תקשורת בין דומיינים כבר עוברת דרך מזהי אובייקט (`route-manifest`, `object-intel`), לא בהעתקת נתונים — עקרון v4 §2 מכובד דה-פקטו.

## 2. Feature Architecture (v4 §3)

- שני סוגי הפיצ'רים (Content / Application) קיימים בפועל אבל **בלי `feature.json`** — אין תיקיית `features/`. הגזירה האוטומטית (search, cross-links, ניווט) קורית דרך קוד (`lib/module-portal.ts`, `lib/cross-links.ts`, `lib/data.ts`), לא דרך חוזה מוצהר.
- **פער:** Feature Contract (v4 §3.2) — חסר לגמרי. זה השלד שמאפשר את "מבחן השנתיים". Roadmap: E2/D2.

## 3. Knowledge Architecture (v4 §4)

- מנוע השיעורים (`lib/academy/lesson-types.ts`) הוא כבר מודל v4 מדויק: Chapter→Lessons→Sections→Facet Cards→Concepts, 23 BlockKinds, coverage-tracking. **זה החוזה הפורמלי הקיים היחיד** בכל הריפו.
- Progressive Disclosure קיים ונספר ב-coverage (`lesson-progress.ts`). Traceability חלקי (`source`/`lastReviewed` per block) אבל **אין `manifests/` פורמלי** שקושר כל Knowledge Unit למקום מדויק במקור.
- **פער:** manifests/ + relationships/ כ-Truth Layer — חסר. Roadmap: E1/D1.

## 4. AI Architecture (v4 §5)

- **Build-Time AI קיים בפועל** — הפייפליין (sap-document-intelligence → knowledge-builder → sap-XX-consultant → function-finder → reviewers) הופעל בכל בניית מודול Academy. רץ רק בזמן בנייה, לא באתר החי — תואם v4 §5.1.
- **Runtime AI — לא קיים** (מתוכנן, נכון). `components/copilot.tsx` + `lib/gemini.ts` קיימים כשלד אבל אינם ה-Runtime AI של §5.2 (הסבר-לי/עוזר-חיפוש/מנתח-תקלות מוגבל ל-Registry). Roadmap: E6.

## 5. Data Architecture (v4 §6)

מבנה בפועל שונה מ-v4 בצורה, זהה בתוכן:

| שכבת v4 | בפועל | פער |
|----------|--------|------|
| A — Truth: `registry/`, `manifests/`, `relationships/` | `data/*.ts` + `lib/*.ts` מוקלדים (126 טבלאות, 606 שדות, 1,731 T-Codes, 234 BAPIs, 39 CDS) | **קריטי:** אין תיקיות פורמליות; אין ולידציית סכימה ב-build |
| B — Content | `data/academy/`, `data/library/`, `data/troubleshooting*` | קיים |
| C — Contracts & Design: `features/`, `quality-profiles/`, `design/tokens.json`, `design/components.json` | אין. עיצוב = 95 CSS vars ב-`app/globals.css` | **חסר** כמבנה פורמלי |
| D — Derived: `search-index/`, `cross-links/`, `reports/` | מחושב ב-runtime (`HAYSTACK`, `objectGraph`), לא נבנה מראש לקבצים | **חסר** כ-artifacts |

## 6. Build Pipeline + Quality (v4 §7–8)

**G2 דטרמיניסטי — 5 gates פעילים ב-`.github/workflows/ci.yml`:** tsc (0), eslint (0 errors), build (static export ~4373 pages), M1 route-manifest drift, M2 dead-link crawl. חסרים: coverage-diff, registry-check, lighthouse, design-lint.

**G3 שיפוטי — קיים כ-11 Skills, לא כשלושה Judges פורמליים.** מיפוי בפועל (`.claude/skills/NEO-REVIEWERS.md`):
- **Content Judge** ← `neo-sap-content-quality-reviewer` + `sap-knowledge-architect`
- **SAP Accuracy Judge** ← אותם + סוכני `sap-XX-consultant` (advisory)
- **Design Judge** ← `neo-sap-visual-designer` + `enterprise-adaptive-ui-reviewer` + `neo-accessibility-reviewer` + `enterprise-ux-reviewer` + `neo-architecture-studio-reviewer` + `neo-search-experience-reviewer`
- **שער סופי** ← `neo-enterprise-ux-auditor` (מסנתז את כולם ל-APPROVE/BLOCK).

כלומר v4 §8.2 (Design Judge) כבר קיים תפקודית — פשוט לא מקודד כ-Judge יחיד עם design-lint אוטומטי. Quality Profiles (v4 §8.1) — חסרים כקבצים; הספים hardcoded ב-`academy-quality-report.tsx`.

## 7. Presentation Architecture / Design System (v4 §9)

הבסיס קיים וחזק, אבל **לא מקודד כחוק אכיף**:
- **Tokens:** 95 CSS custom properties ב-`app/globals.css` (color/elevation/type/motion/radius/breakpoints). **אין `tokens.json`.** חוק-הטוקנים (§9.1) לא נאכף — נמצאו ~25 hex/inline קשיחים בקומפוננטות (`page-help.tsx:73`, `process-flow.tsx:89`, `object-expert.tsx:159`).
- **Component catalog:** ~129 קומפוננטות + 10 ב-`components/ui/`. **אין `components/design/components.json`** ואין approval-workflow → סיכון **גבוה**.
- **Page templates:** התבניות (Portal/Explorer/Learning/Studio) קיימות כקומפוננטות אבל **לא כ-registry סגור**; אין "route בלי תבנית = כשל lint".
- **Motion:** `lib/motion.ts` — מקור אמת מצוין (DUR/EASE/SPRING_MORPH), נאכף בשימוש עקבי. `prefers-reduced-motion` מכובד ב-72 קומפוננטות.
- **A11y:** focus rings, reduced-motion, 44px touch, RTL bidi — מיושמים. אין CI gate לניגודיות.
- **Theme Engine:** צבעים סמנטיים קיימים; מיפוי Theme יחיד (Light). תשתית ל-Dark קיימת חלקית.
- **פער עיקרי:** design-lint (§9.14א) + Design Judge פורמלי (§9.14ב) + Governance (§9.15) — חסרים כאוטומציה. Roadmap: D0→D3.

## 8. Search (v4 §10)

- ⌘K + omni-search + synonyms קיימים ועובדים (`command-palette.tsx`, `lib/search-intel.ts` — 13 synonyms, `planQuery`). offline static.
- **סיכון גבוה — כפילות אינדקסים:** שלושה נתיבי-חישוב נפרדים — `HAYSTACK` (`data.ts:17`, נבנה ב-module load), `buildSearchIndex()` (`tcode-search.ts:37`, on-demand), `fieldIndex()` (`extra-search.ts`). לא מאוחדים; סיכון חוסר-קוהרנטיות. v4 §10 דורש מקור-אינדקס יחיד. Roadmap: E2/E5.
- דירוג פורמלי (§10 — קוד>כותרת>מושג>גוף) קיים כהיוריסטיקה, לא כחוק מוצהר.

## 9. Runtime / Deployment / Monitoring / Loops (v4 §11–14)

- **Runtime:** Static Export + Offline + RTL + Progressive Disclosure — **קיים במלואו**. Error Boundaries + תקציב ביצועים פורמלי — חסרים.
- **Deployment:** אחסון סטטי + `sapbysali.app` קיים. **Preview env, Rollback, Artifact versioning — חסרים** (Missing, סיכון בינוני). כל פרסום בונה `out/` מחדש; אין גרסאות.
- **Monitoring:** `@vercel/analytics` בסיסי בלבד. אין ניטור זמינות/dead-links שבועי/מגמות Lighthouse/דשבורד. חסר.
- **Scheduled Loops:** אין `schedule: cron` ב-CI. 7 הלולאות של v4 §14 — לא קיימות.

## 10. Prior Architecture (v2/v3) — מה כבר תוכנן

`docs/` מכיל תכנון קודם עשיר שמאשר את v4: `HANDOVER.md` (1,687 שורות spec), `UX-ARCHITECTURE.md`, `SAP_LIBRARY_ARCHITECTURE.md`, `SKILLS_ARCHITECTURE.md`, `neo-design-system-v1.md`, ו-`d1–d7` (design track כבר תועד: IA/UX-flows/UI-redesign/motion/search/QA). ה-Design Track של v4 §17 (D0–D5) הוא במידה רבה **פורמליזציה של עבודה שכבר בוצעה ב-d1–d7**, לא התחלה מאפס.

---

## 11. שורה תחתונה

הריפו הוא **מימוש בוגר של v4 עם פערי-פורמליזציה, לא פערי-פונקציונליות**. כל מה ש-v4 מכנה "[קיים]" — קיים. רוב מה ש-v4 מכנה "[חדש]" הוא **הפיכת קוד קיים לחוזה/סכימה/gate אכיף** (tokens.json, components.json, registry/, feature.json, design-lint, judges פורמליים, preview/rollback/loops). אין שכתוב. אין ארכיטקטורה מקבילה. הדרך היחידה קדימה תואמת בדיוק ל-Evolution Roadmap של v4 §17.
