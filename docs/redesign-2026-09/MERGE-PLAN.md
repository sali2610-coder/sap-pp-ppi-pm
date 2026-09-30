# תוכנית Merge ו־Production עתידית · deliverable 23

**לא בוצע דבר מהמסמך הזה.** העבודה נעצרת ב־Preview. כל שלב כאן מחייב אישור חדש ומפורש של בעל האתר אחרי צפייה ב־Preview; אישורים שניתנו לשחרורים קודמים אינם חלים עליו.

## 1. לפני ה־Merge: החלטות של בעל האתר

| נושא | מה צריך להחליט | היכן |
|---|---|---|
| מסמכים משפטיים | כל סימוני `REQUIRES_OWNER_INPUT`: זהות המפעיל, ספקי ה־AI ושמירת המידע אצלם, שמירת יומנים, דין חל, תאריכי תחולה, רישיונות, ערוצי פנייה, רכז נגישות, מצב Vercel Analytics ו־Speed Insights | `components/neo-shell/legal/legal-content.ts`, `LEGAL-READINESS.md` |
| לוחות ה־Bakeoff | האם `/design/redesign-2026/*` (noindex) נשארים ב־Production. אם לא: להוציא את `app/design/redesign-2026/**` ואת גופני Assistant ו־JetBrains Mono | `DEPENDENCIES.md` |
| קובץ ה־PWA | צילומי המסך ב־`manifest` הם של העיצוב הקודם, וארבעת קיצורי הדרך מפנים לעמודי הממשק הישן (`/academy/`, `/studio/`, `/knowledge/`, `/tables/`) ולא לעמודי NEO | `app/manifest.ts`, `public/screenshots/` |
| תוכן הספרים | אישור הרישיון לתוכן ספרי SAP PRESS (1 עד 10) ו־ZaranTech (11) שמוגש באתר | `BLOCKERS.md` |
| גבול הטעינה של השורש | למחוק את `app/loading.tsx` או להשאיר. בלעדיו קטלוג הטבלאות נצבע בטלפון ב־4.5 שניות במקום 9.1, ושאר הנתיבים בלי שינוי; לחיצה בתוך האתר משאירה את העמוד הנוכחי עד שהבא מוכן, בלי מסך הטעינה. אחרי מחיקה: לבנות ולהריץ שוב את השערים ואת הסדרה | `BLOCKERS.md` §2, `neo-redesign-evidence/exp-noloading/` |
| שאר ההחלטות הפתוחות | ראו `BLOCKERS.md` | |

## 2. ה־Merge

1. לוודא שהענף `design/neo-experience-redesign` מעודכן מול `main` (אם `main` התקדם: merge של `main` לתוך הענף, לא rebase ולא force-push).
2. להריץ על ה־SHA הסופי את כל השערים של `neo-redesign-evidence/final/run-final-gates.zsh`: tsc, בדיקות, evidence, academy, lint, build, sitemap, build, routes, sitemap, diag, crawl, reader, verify-reader, ו־`ZERO_CONTENT_LOSS 574/574`. הריצה האחרונה שלהם, על `63eb7549`, נמצאת ב־`neo-redesign-evidence/final-2/` (כל הצעדים rc=0).
3. Merge commit אל `main`, כמו בשחרורים הקודמים (`6ba22207`, `d23be74b`): `Merge branch 'design/neo-experience-redesign' into main`. לא squash, כדי לשמור את היסטוריית השלבים והראיות.
4. `npm run build` רגיל (עם ה־prebuild) רץ ב־Vercel. לוודא שהוא לא משנה את `data/ai-tree` או את `data/books` בענף (הם תוצרי build ולא נכנסים ל־commit).

## 3. שער ה־Production (סעיף 24 בבריף)

אחרי שה־deployment של `main` מוכן, ולפני שמכריזים עליו:

- [ ] `sapbysali.app` מחובר ל־SHA שאושר (Vercel → Deployments).
- [ ] הקבצים המהודרים עדכניים ולא הגיעו ממטמון בנייה ישן (`REVIEW-GUIDE.md`, בדיקה 0). אם לא: Redeploy בלי Build Cache.
- [ ] HTTPS תקין.
- [ ] Canonical נכון בכל סוגי העמודים.
- [ ] הפניות root ו־`www` עקביות.
- [ ] אין 404 בנתיבים המוכרים (סריקה מול הדומיין).
- [ ] Favicon, Apple Touch Icon, manifest ו־OG נכונים.
- [ ] שלושת המסמכים המשפטיים קיימים ונגישים מהפוטר בכל התצורות.
- [ ] הצהרת הנגישות קיימת, עם מספרי הבדיקה של הגרסה שפורסמה.
- [ ] אין אזכור "Built with AI".
- [ ] Smoke מלא מול הדומיין: הבית, קטלוגים, רשומות, ERD, ספרים וקורא, חיפוש, מסמכים משפטיים, 404; יום ולילה; מחשב וטלפון.
- [ ] `ZERO_CONTENT_LOSS 574/574` על הקוד שפורסם.
- [ ] אימות ידני: Safari ב־iPhone פיזי, ואיכות התשובות של עוזרי ה־AI בפועל.

## 4. Rollback

- **מיידי:** ב־Vercel, Promote ל־deployment הקודם של Production (זה של `6ba22207`). לא דורש שינוי קוד, ומחזיר את האתר תוך דקות.
- **בקוד:** `git revert -m 1 <merge-sha>` על `main` ודחיפה רגילה. בלי force-push ובלי reset.
- ההחלטה על Rollback, כמו ההחלטה על פרסום, בידי בעל האתר.

## 5. אחרי הפרסום

אימות לקריאה בלבד מול Production, כמו בשחרור הקודם: סריקת נתיבים, ריצת Astra מול הדומיין, axe על מדגם מסכים, Web Vitals, ובדיקת 574 קובצי הספרים. הדוח נשמר ליד דוח ה־Preview.
