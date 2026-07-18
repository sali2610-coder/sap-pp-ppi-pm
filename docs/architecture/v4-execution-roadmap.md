# v4 Execution Roadmap — תוכנית ביצוע (Evolution, לא Rewrite)

**מקור:** ה-Roadmap של v4 §17 (מסלול E תוכן/איכות + מסלול D עיצוב). לא מומצאת ארכיטקטורה חדשה. כל שלב הפיך, שום דבר קיים לא נשבר. **כל שלב = קריאה-בלבד עד שער אישור מפורש של Sali.**

**עיקרון פורש:** רוב העבודה היא **הוצאת מבנה מקוד שכבר עובד** (extract), לא כתיבת פונקציונליות. לכן הסיכון נמוך והכל הפיך.

---

## מפת שערים משותפת (חלה על כל שלב-מימוש)
`G2 דטרמיניסטי` (tsc 0 · eslint 0 · build · M1 route-manifest · M2 dead-links — כבר קיימים; מתווספים בהדרגה) → `G3 שיפוטי` (Skills reviewers → neo-enterprise-ux-auditor APPROVE/BLOCK) → **אישור Sali** → merge. אין עקיפה.

---

## מסלול E — תוכן ואיכות

### E0 — Baseline (קריאה-בלבד)
- **מטרה:** הרצת סקריפטי-מדידה על האתר הקיים בלי לשנות דבר.
- **תכולה:** תיעוד ה-Truth הקיים (TS files), הרצת coverage-baseline על Academy manifests, snapshot של המצב.
- **קבצים שישתנו:** `docs/architecture/**` בלבד (דוחות). **אסור לגעת:** כל `app/`, `components/`, `data/`, `lib/`.
- **תלות:** — · **רגרסיה:** אין (read-only) · **הצלחה:** דוחות baseline קיימים · **בדיקות:** אין קוד · **מקביל ל-D0.**
- **PRs:** 1 (docs) · **מאמץ:** ~1 סשן · **אישור:** קל.

### E1 — Truth Layer פורמלי
- **מטרה:** להפוך את `data/*.ts` המוקלד ל-Truth Layer עם ולידציית-סכימה, בלי לשנות ערכים.
- **תכולה:** יצירת `registry/schema/*.json` (sap-table, sap-func-object, tcode, cds); סקריפט שמאמת את `data/` מול הסכימה ב-build; מזהים אחידים. `relationships/` נגזר מ-`relations` הקיים.
- **קבצים חדשים:** `registry/**`, `scripts/registry-check.mjs`. **קבצים ששונים:** `.github/workflows/ci.yml` (gate חדש). **אסור:** לשנות ערכי SAP קיימים; לגעת ב-Library/Academy/reader.
- **תלות:** E0 · **רגרסיה:** נמוכה (סכימה סובבת סביב data קיים) · **rollback:** להסיר את ה-gate · **הצלחה:** registry-check ירוק על 100% מהאובייקטים · **בדיקות:** schema-validation · **reviewers:** `sap-knowledge-architect` · **צילומים:** — · **PRs:** 2–3 · **מאמץ:** 4–7 סשנים · **אישור:** נדרש (החלטת פורמט Truth).

### E2 — Feature Contracts + Search Index מהחוזים
- **מטרה:** `feature.json` לכל פיצ'ר קיים; אינדקס חיפוש נבנה מהחוזים.
- **תכולה:** `features/*/feature.json` (id/type/domain/routes/registry_refs/search_entries/quality_profile/design_profile). איחוד 3 נתיבי-החיפוש ל-`lib/search-index.ts` יחיד + `search-index/` derived.
- **קבצים חדשים:** `features/**`, `search-index/**`, `lib/search-index.ts`. **קבצים ששונים:** `lib/data.ts`/`tcode-search.ts`/`extra-search.ts` (מפנים לאינדקס המאוחד). **אסור:** לשנות חוויית ⌘K, deep links, ranking נראה-למשתמש.
- **תלות:** E1 · **רגרסיה:** בינונית (חיפוש הוא app-critical) · **rollback:** להחזיר את ה-haystacks הישנים (נשמרים עד אימות) · **הצלחה:** תוצאות חיפוש זהות byte-for-byte למצב הקיים + 0 dead search · **בדיקות:** snapshot חיפוש לפני/אחרי · **reviewers:** `neo-search-experience-reviewer` · **צילומים:** ⌘K mobile+desktop · **PRs:** 3–4 · **מאמץ:** 4–7 סשנים · **אישור:** נדרש (איחוד חיפוש = High risk).

### E3 — Pipeline מלא + Pilot
- **מטרה:** הרצת השלד המלא (contract → build → G2 → G3 → merge) על **פיילוט אחד** (ראו doc נפרד: IDocs).
- **תכולה:** quality-profiles/*.json; חיבור coverage-diff ל-CI; הרצת הפיילוט end-to-end כולל Design Review.
- **קבצים:** לפי הפיילוט + `quality-profiles/**`, `scripts/coverage-diff.mjs`. **אסור:** כל דבר מחוץ לטווח הפיילוט.
- **תלות:** E2, D2 · **רגרסיה:** נמוכה (פיילוט מבודד) · **rollback:** revert הפיילוט · **הצלחה:** הפיילוט עובר את כל השערים · **reviewers:** שלושתם + auditor · **צילומים:** דפי הפיילוט · **PRs:** 2–3 · **מאמץ:** חלק מ-11–18 הסשנים · **אישור:** נדרש (בחירת פיילוט).

### E4 — Judges + Preview + Rollback + Monitoring
- **מטרה:** הפיכת ה-Skills reviewers ל-G3 formal; תשתית פרסום בטוחה.
- **תכולה:** Preview env per-PR; Rollback (artifact קודם); Artifact versioning; ניטור (זמינות, dead-links שבועי, מגמות Lighthouse); Error Boundaries.
- **קבצים:** `.github/workflows/**` (preview + scheduled), `next.config.ts` (error boundaries), `docs/`. **אסור:** לוגיקת פיצ'רים.
- **תלות:** E3 · **רגרסיה:** נמוכה (CI/infra) · **rollback:** להסיר jobs · **הצלחה:** PR מקבל Preview URL; rollback עובד בדקה · **PRs:** 3–5 · **מאמץ:** חלק מ-E-track · **אישור:** נדרש (Preview/Rollback strategy).

### E5 — Cutover + מודול חדש ראשון (MM?)
- **מטרה:** מודול חדש נבנה **רק** דרך Contracts + Registry (Playbook v4 §15.1), מוכיח את "אין שלב 5".
- **אסור:** עיצוב חדש "לפי הטעם"; לגעת בקיים.
- **אישור:** נדרש (בחירת מודול).

### E6 — Runtime AI ראשון
- **מטרה:** "הסבר לי" בדף אובייקט, עונה רק מ-Registry עם ציטוט. הפלטפורמה עובדת 100% בלעדיו.
- **אישור:** נדרש (החלטת Runtime AI).

---

## מסלול D — עיצוב (מקביל, נפגש ב-Gate)

| שלב | תכולה | נפגש | קבצים חדשים | אסור לגעת | סיכון | rollback |
|------|--------|-------|--------------|-----------|--------|----------|
| **D0** | Design Audit: מיפוי טוקנים דה-פקטו מ-`globals.css`, קטלוג קומפוננטות דה-פקטו, איתור ~25 hex קשיחים | E0 | `docs/architecture/**` | הכל (read-only) | אין | — |
| **D1** | נעילת `design/tokens.json` + `design/components.json` + page-templates registry — **באישור Sali** | לפני E3 | `design/**` | ערכי טוקן (נגזרים מהקיים 1:1) | נמוך | להסיר קבצים |
| **D2** | `design-lint` ב-G2 + `verify-design` skill; ניקוי ה-hex הקשיחים לטוקנים | E3 | `scripts/design-lint.mjs` | ערכי צבע נראים (רק מקור הערך זז ל-token) | נמוך-בינוני | להסיר gate |
| **D3** | Design Judge פורמלי ב-G3 + רגרסיה ויזואלית + Design Consistency Sweep | E4 | `.github/workflows/**` | — | נמוך | להסיר |
| **D4** | מיזוג הדרגתי של כפילויות UI לקטלוג — דף-דף, בלי Big Bang | E4–E5 | — | Library/reader/Academy (frozen) | בינוני (per-cluster) | revert per-page |
| **D5** | Dark Mode כ-Theme שני על הטוקנים — אופציונלי | אחרי E5 | `design/themes/dark.json` | קומפוננטות (אפס שינוי) | נמוך | להסיר theme |

---

## הערכת מאמץ כוללת (מ-v4 §17)
E0–E3: 11–18 סשנים · E1–E2: 4–7 · תוספת מסלול D (D0–D4): 8–12 סשנים פרוסים. **מסלול D לא חוסם קריטי.**

## סדר מומלץ להתחלה (אחרי אישור)
**E0 + D0 במקביל** (שניהם read-only, אפס סיכון) → דוחות → נעילת D1 באישור Sali → E1 (Truth) → E2 (Contracts+Search) + D2 → E3 (Pilot: IDocs). כל מעבר-שלב = שער אישור.
