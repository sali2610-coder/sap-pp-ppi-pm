# v4 First-Pilot Recommendation — פיילוט ראשון בטוח

**המלצה: IDocs Reference** (Explorer/Reference feature). לא לממש עדיין — זו המלצה בלבד.

---

## השוואת המועמדים (v4 §17 מציע "IDocs / פרק PP-PI")

| מועמד | ראיה בריפו | סיכון רגרסיה | מדידות coverage | קשרי Registry | מקור קיים | מבחן חוזה+איכות | סיכון ל-Library/reader |
|--------|-------------|---------------|------------------|----------------|-----------|------------------|-------------------------|
| **IDocs** ✅ | `lib/idoc-intel.ts` (3 records + 7 statuses), `components/idoc-explorer.tsx`, 2 IDoc types ב-manifest | **הכי נמוך** — dataset סגור וקטן | קל (7 status codes + סגמנטים) | ברור: status→cause→fix, IDoc→segment→table | קיים (`idoc-intel.ts` + `data/integration.ts`) | מלא — מפעיל 3 השופטים | **אפס** |
| PM Master-Data section | `data/pm-master-data-facets.ts` (11 facets), `domain-detail.ts` (~10 domains) | בינוני — נוגע ב-`module-portal` (blast radius) | בינוני | עשיר | קיים | מלא | נמוך |
| פרק PP-PI (Content) | `data/library/*`, manifests | בינוני-גבוה — content כבד, מקור PDF | מלא (coverage 100%) | בינוני | קיים | מלא (Content Judge) | נמוך |
| דף Reference קטן (CDS/Exit) | `data/cds-map.ts`, `data/exits.ts` | נמוך | דל — כיסוי דק | דל | קיים | חלקי | אפס |

---

## למה IDocs

1. **סיכון רגרסיה מינימלי.** Explorer מבודד לגמרי מ-Learning Wing. אפס נגיעה ב-Library, reader, covers, אנימציות, Academy. עומד ב-strict rule "no risk to the Library or reader".
2. **Dataset קטן וסגור = מבחן חוזה מלא בלי סיכון.** 7 status codes + סגמנטים + 2 IDoc types. אפשר לכתוב `feature.json` מלא, `registry_refs` מדויקים, ו-`quality_profile: content-reference` — ולראות את כל השרשרת נגזרת אוטומטית (search, cross-links, ניווט) על היקף קטן ונשלט.
3. **קשרי Registry נקיים ומדידים.** status→cause→fix ו-IDoc→segment→table הם edges ברורים ל-`relationships/` — פיילוט אידיאלי ל-`registry-check` ו-cross-links.
4. **מפעיל את שלושת השופטים באמת:**
   - *SAP Accuracy Judge* — נכונות 7 קודי הסטטוס (51/64/SYSFAIL...) וה-cause/fix מול SAP.
   - *Design Judge* — דף ה-Explorer עובר design-lint (tokens-only) + Design Review (Mobile/Desktop/RTL).
   - *Content Judge* — הפרוזה של ה-reference (הסבר סטטוס) נאמנה למקור.
5. **מפעיל design-lint על שטח קטן** — `idoc-explorer.tsx` הוא דף בודד; קל לוודא tokens-only ו-template compliance.
6. **מקור קיים, אפס המצאה** — הנתונים כבר בריפו ואומתו; הפיילוט מפרמל, לא ממציא.
7. **מיושר ל-v4 §17** — IDocs מוצע שם מפורשות כפיילוט E3, והוא הבטוח מבין השניים (פרק PP-PI כבד יותר).

## למה לא האחרים
- **PM Master-Data** — עשיר אבל נוגע ב-`module-portal` (blast radius) וב-PM portal הקרוב-לקפוא. סיכון מיותר לפיילוט ראשון.
- **פרק PP-PI** — content כבד עם מקור PDF; מבחן Content Judge טוב אבל היקף גדול לצעד ראשון.
- **דף Reference בודד** — בטוח אבל כיסוי דק מכדי לבחון את החוזה והאיכות ברצינות.

## מה הפיילוט יוכיח (Definition of Done — לא לביצוע עכשיו)
`feature.json` ל-IDocs → registry-refs מאומתים ב-`registry-check` → search-entries + cross-links נגזרים אוטומטית → `design-lint` נקי על `idoc-explorer` → שלושת השופטים PASS → `neo-enterprise-ux-auditor` APPROVE → Preview URL → אישור Sali → merge. **אפס שינוי ב-Library/Academy/reader. אפס dead links. tsc 0 / eslint 0.**

**prerequisites:** E1 (Truth/registry) + E2 (feature.json + search) + D1 (tokens.json נעול) + D2 (design-lint). כלומר הפיילוט הוא הצעד שבו כל התשתית נפגשת לראשונה — על השטח הבטוח ביותר.
