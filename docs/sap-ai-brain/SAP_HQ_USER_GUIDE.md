# מדריך משתמש — HQ (מטה ה-SAP)

> **מקור המידע:** מדריך `~/.claude/skills/hq/HQ-USER-GUIDE.md` + קבצי המערכת
> `~/.claude/skills/hq/SKILL.md`, `references/request-modes.md`, `references/routing.md`, `references/expert-packs.md`.
> כל עובדה כאן מגובה במקור אמיתי. ערך שלא אומת מסומן במפורש כ־"לא אומת".

---

## מה זה HQ ולמה הוא קיים

HQ (ראשי תיבות של *SAP Headquarters* — "מטה ה-SAP") הוא **שער הכניסה היחיד** לכל מערכת ה-AI של SAP.
הרעיון פשוט: אתה אף פעם לא צריך לזכור עשרות סוכנים, סקילים או כלים. אתה פונה ל-HQ בלבד, ו-HQ מחליט
לבד מה להפעיל.

חשוב להבין נקודה מרכזית: **HQ הוא מנצח (Orchestrator) בלבד — הוא לעולם לא פותר בעצמו.**
לפי `SKILL.md`, HQ מבצע שלושה דברים:
1. **מסווג** את הבקשה (איזה סוג בקשה זו).
2. **מריץ בדיקת תקינות** (health check) על המערכת.
3. **מנתב** לשלושת המנהלים — Sherlock, Oracle, Memory — או לשילוב שלהם, ואז מחזיר **סיכום HQ אחד וקצר**.

מתחת ל-HQ יושבים שלושה מנהלים, וכל אחד מנהל בעצמו את כל ה"עובדים" הפנימיים (סקילים, סוכנים, כלים):

| מנהל | תפקיד | מתי מופעל |
|---|---|---|
| 🔍 **Sherlock** | חקירה (Investigation) | תקלות, dumps, IDoc/תורים, ממשקים, הרשאות, ביצועים, דיבאג |
| 📚 **Oracle** | ידע (Knowledge) | SAP Notes/KBA, Help, תכנון (design), קונפיגורציה, ABAP how-to, למידה |
| 🧠 **Memory** | היסטוריה (History) | "האם כבר פתרנו את זה?", פרויקטים/לקחים קודמים, מסמכים שמורים |

> נקודה חשובה לפי `SKILL.md`: HQ אינו רק "נתב". הוא **מנוע חשיבה (Reasoning Engine)**. כל בקשה עוברת שרשרת
> חשיבה בת 10 שלבים של יועץ SAP בכיר: Observe → Classify → Build Hypotheses → Gather Evidence (מדורג ★) →
> Root Cause → Missing-Info Detector → Confidence → Explain-Why → Continuous Learning → Never-Guess.
> HQ **לעולם לא קופץ לפתרון** לפני שאסף ראיות.

---

## איך מתחילים לעבוד עם HQ

לפי המדריך הרשמי (`HQ-USER-GUIDE.md`):

- **`/hq <הבקשה שלך>`** — נקודת הכניסה הראשית. עובד בכל פרויקט (סקיל גלובלי + פקודה גלובלית).
- **`/hq search <מילות חיפוש>`** — חיפוש בתקלות קודמות / runbooks / לקחים / SAP Notes / זיכרון.
- זמינים גם ישירות (תאימות לאחור): **`/sherlock`** (חקירה), **`/oracle`** (ידע), **`/memory`** (היסטוריה).
- **בהתקנה ראשונה:** יש להפעיל מחדש את Claude Code כדי ש-`/hq` יופיע בהשלמה האוטומטית של `/`.

עצה מעשית: אתה תמיד מתחיל כל דבר שקשור ל-SAP עם `/hq`. אתה **לא בוחר** מצב (mode) ולא בוחר איזה מומחה
ירוץ — HQ מחליט את זה לבד לפי הסיווג.

---

## 12 מצבי הבקשה (Request Modes)

לפני שהוא מנתב, HQ מזהה אוטומטית את **סוג הבקשה** ומתאים את ההתנהגות שלו. לפי `references/request-modes.md`
יש **12 מצבים**. אתה אף פעם לא בוחר אותם ידנית — HQ מזהה ובוחר לבד, כולל את חבילות המומחים (Expert Packs).

| # | מצב (Mode) | סימנים שמפעילים אותו | מנהל אחראי | חבילות מומחים |
|---|---|---|---|---|
| 1 | **Incident** (תקלה) | תקלה/dump/תקוע/שגיאה/"תחקור"/tcode+status | **Sherlock** | לפי סוג התקלה (PP/PM/IDOC/Auth/…) |
| 2 | **Learning** (למידה) | "תסביר", "מה זה", "איך עובד", "למד אותי" | **Oracle** (+Memory) | תחום הנושא |
| 3 | **Architecture** (ארכיטקטורה) | "איך לתכנן", "ארכיטקטורה", תכנון ממשק | **Oracle** | ECC/S4 + BTP + המודול הרלוונטי |
| 4 | **Design** (תכנון אובייקט) | תכנון פתרון/אובייקט (CDS/RAP/ממשק) | **Oracle** | ABAP + OData + מודול |
| 5 | **SAP Note** | "מה אומר Note", חיפוש/השוואת Notes/KBA | **Oracle** | תחום ה-Note |
| 6 | **Business Process** (תהליך עסקי) | "איך עובד תהליך…", O2C/P2P/PP flow | **Oracle** (+Memory) | מודול (SD/MM/PP/…) |
| 7 | **Interview** (ראיון/הכנה) | "תראיין אותי", תרגול, שאלות ותשובות | **HQ מוביל** (+Oracle) | התחום שנבחר |
| 8 | **Migration ECC→S/4** (מעבר) | "מעבר ל-S/4", simplification, impact | **Oracle** | S/4HANA + ECC + מודול |
| 9 | **Development** (פיתוח) | כתיבה/how-to של ABAP/CDS/OData/BAPI/FM | **Oracle** | ABAP + OData |
| 10 | **Performance Review** (ביצועים) | ניתוח/שיפור ביצועים | **Sherlock** (אם חי) / Oracle | Performance |
| 11 | **Authorization Analysis** (הרשאות) | תכנון תפקידים/הרשאות או חסימת הרשאה חיה | **Sherlock** (חי) / Oracle | Authorization |
| 12 | **Configuration Help** (קונפיגורציה) | "איך להגדיר…", SPRO/customizing | **Oracle** | מודול |

**כללי ניתוב חשובים** (מתוך `request-modes.md`):
- בקשה שנראית כמו תקלה אך מעורפלת → מטופלת כ-**Incident** (מצב אינטראקטיבי).
- בקשות ידע (מצבים 2-9, 12) → נענות ישירות עם Oracle + חבילות מומחים; **לא** נפתחת סביבת תקלה ולא רץ
  שער "מידע חסר". אין `hq-ops.sh new`.
- כל טענה עובדתית מצטטת מקור, או אומרת "לא נמצא מקור". **HQ אף פעם לא ממציא מספרי Note.**

---

## דוגמאות שימוש לפי מצב

הדוגמאות הבאות מבוססות ישירות על `HQ-USER-GUIDE.md` ו-`request-modes.md`.

### תקלה (Incident)
```
/hq יש IDoc בסטטוס 51, inbound ORDERS, לא נרשם
```
מה HQ עושה: מזהה תקלת IDoc → שואל **רק** את מה שחסר (טקסט status-51 + מספר IDoc + partner/basic type) →
**עוצר ומחכה** → מריץ את Sherlock (חבילות IDOC + SD) → מנתח שורש (RCA) בעברית פשוטה → סיכום HQ →
מציע לשמור playbook.

עיקרון הזהב במצב תקלה (מתוך `SKILL.md`): **שואל, ואז מחכה** — אף פעם לא קופץ למסקנה כשראיה מרכזית חסרה,
ואף פעם לא מבקש הכול בבת אחת (רק 2-4 הפריטים שמשנים את האבחנה). בסוף, ה-RCA מוסבר כשש תשובות:
**מה קרה · למה · איך הוכחנו · סיכון · פתרון · מניעה עתידית.**

### למידה (Learning)
```
/hq תסביר לי מה זה CDS View ומתי משתמשים בו
```
מה HQ עושה: מלמד שלב-אחר-שלב בעברית, נותן דוגמאות, משווה ECC מול S/4, מסביר טבלאות/tcodes/annotations,
מצייר תרשים זרימה טקסטואלי, ומציע שאלת תרגול קצרה. אין חקירה, אין סביבת עבודה.
מבנה ההוראה (מתוך `request-modes.md`): (1) הסבר שלב-אחר-שלב (2) דוגמאות (3) ECC מול S/4HANA
(4) הסבר האובייקטים — Tables · Transactions · BAPIs · Function Modules · IDocs (5) תרשים זרימה טקסטואלי
(6) שאלות המשך / תרגול.

### ארכיטקטורה (Architecture)
```
/hq איך לתכנן ממשק בין S/4 לצד שלישי דרך BTP
```
מה HQ עושה (מצב Architecture → Oracle + חבילות BTP/ECC-S4): מציג אפשרויות (IDoc/OData/RAP/Integration Suite),
trade-offs, דלתא ECC מול S/4, אבטחה/destinations, וממליץ על תבנית עם מקורות.

### מעבר ECC → S/4HANA (Migration)
```
/hq מה ההשפעה של המעבר ל-S/4 על טבלאות MM
```
מה HQ עושה (מצב Migration → `sap-forecaster` + `sap-abap-ecc-s4-expert`): פריטי simplification,
שינויי MATDOC/BSEG, השפעה על קוד מותאם (custom code), מה נשבר, מה צריך לבדוק.

### ראיון (Interview)
```
/hq תראיין אותי על PP-PI לקראת ראיון עבודה
```
מה HQ עושה (מצב Interview): שואל שאלות מדורגות, בודק את התשובות, מסביר פערים, ומעלה הדרגתית את רמת הקושי.

### תהליך עסקי (Business Process)
```
/hq תסביר את תהליך Order-to-Cash ב-SD
```
מה HQ עושה (מצב Business Process → חבילת SD): את הזרימה מקצה-לקצה כתרשים טקסטואלי
(order → delivery → PGI → billing → FI) עם ה-tcodes/tables/BAPIs המרכזיים בכל שלב, והערות ECC מול S/4.

---

## חבילות מומחים (Expert Packs)

"חבילת מומחים" היא צרור בעל שם של **עובדים שכבר מותקנים** (סקילים/סוכנים). לא נוצרים סוכנים חדשים —
כל חבילה רק ממפה תחום לעובדים הקיימים ש-HQ צריך להפעיל. HQ בוחר את החבילה אוטומטית מהסיווג; אתה אף פעם
לא בוחר. לפי `references/expert-packs.md` קיימות **20 חבילות**: PP, PM, MM, SD, FI, CO, QM, ABAP,
Authorization, IDOC, Gateway, OData, Fiori, Workflow, Performance, Basis, PI/PO, BTP, ECC, S/4HANA.

אם תקלה חוצה תחומים (למשל IDoc נכנס ORDERS = IDOC + SD), HQ מפעיל את **שתי החבילות** — אבל Sherlock
תמיד בעל ה-RCA היחיד. כל פעולה היא לקריאה-בלבד (read-only) אלא אם זו כתיבה ל-DEV דרך sc4sap
(שחסומה על QA/PRD ע"י ה-hook של הדרגה — ובכל מקרה, כרגע `sc4sap:sap` **מנותק**).

---

## Best Practices (שיטות עבודה מומלצות)

מתוך `HQ-USER-GUIDE.md`:
- **הדבק את הראיות** ש-HQ מבקש (ST22/WE02/SU53/payload…) — הוא לא ינחש בלעדיהן.
- לתקלה חיה, תן קודם את **מזהה ההודעה המדויק + צילום מסך** — זה מקפיץ את רמת הביטחון הכי מהר.
- תן ל-HQ לשמור **playbook** כשתיקון עובד — התקלה הדומה הבאה תיפתר הרבה יותר מהר.
- השתמש ב-`/hq search` **לפני** חקירה חדשה — אולי כבר פתרת את זה.
- שמור **תקלה אחת per thread** של `/hq` כדי שסביבת העבודה והציר-זמן יישארו נקיים.

מתוך רובריקת הביטחון (`routing.md`) — כך לקרוא את אחוז הביטחון בסיכום HQ:
- **90-100%**: שורש קשור לראיה קונקרטית (dump/trace/IDoc status) + Note מאשר או התאמה היסטורית.
- **70-89%**: השערה יחידה חזקה, ראיות חלקיות.
- **50-69%**: סביר, דורש עוד ראיה אחת (HQ ינקוב בשמה).
- **מתחת ל-50%**: אין מספיק ראיות — HQ יבקש את הקלט החסר הספציפי.

---

## Do's & Don'ts (עשה ואל תעשה)

מתוך `HQ-USER-GUIDE.md`:

**עשה (Do)**
- התחל **כל** דבר SAP עם `/hq`.
- סמוך על בחירת המצב האוטומטית ובחירת המומחה האוטומטית.
- אשר שמירת לקחים ל-Memory אחרי תיקון אמיתי.
- חבר פרופיל **DEV** של sc4sap (בהמשך) אם אתה רוצה ראיות SAP חיות לקריאה-בלבד.

**אל תעשה (Don't)**
- אל תצפה לתיקון ודאי ברמת ביטחון נמוכה — HQ יגיד "אני צריך עוד ראיות" בכוונה.
- אל תחבר את sc4sap ל-QA/PRD — כתיבות חסומות בעיצוב; שמור אותו ל-DEV בלבד.
- אל תערוך ידנית קבצים תחת `~/SAP-HQ/` באמצע תקלה — תן ל-HQ לנהל אותם.
- אל תעקוף את HQ כדי לשנן את עשרות תת-הסוכנים — זו העבודה של HQ.

---

## איפה הדברים יושבים (Where things live)

מתוך `HQ-USER-GUIDE.md`:
- **מערכת:** `~/.claude/skills/{hq,flagship,sherlock,oracle,memory}/` · פקודה: `~/.claude/commands/hq.md`
- **נתוני ריצה:** `~/SAP-HQ/` (incidents, archive, runbooks, playbooks, knowledge-graph, lessons-learned)
- **בדיקת תקינות (health probe):** `~/.claude/skills/flagship/scripts/healthcheck.sh`

---

## סטטוס מערכת נכון לתמונת המצב האחרונה (2026-07-23)

הפרדה ברורה בין הרכיבים לפי מצבם האמיתי (מקור: `claude mcp list` + healthcheck ב-`sap-brain-facts.md`).
זה חשוב כדי לא להטעות: לא כל רכיב שמותקן הוא גם מחובר.

- **פעיל / מחובר (MCP):** Google Drive, Gmail, Google Calendar, Figma, `sap-fiori-tools:fiori-tools`,
  `sapui5:ui5-tooling`, magic, mobbin, browser-use — כולם **✔ Connected**.
- **דורש אימות (Needs authentication):** Microsoft 365, Make, `vercel:vercel`.
- **ממתין לאישור:** `pptxgenjs` (Pending approval).
- **נכשל / מנותק:** ⚠️ **`sc4sap:sap` — ✘ Failed to connect / DISCONNECTED.**
  המשמעות המעשית: אין חיבור חי לקריאת ראיות מ-SAP. לתקלות חיות המערכת עובדת על **ראיות מודבקות**
  (pasted evidence) שאתה מספק ידנית (ST22/WE02/SU53/payload). זה לא באג — זה מצב ה-fallback המתוכנן.

> תזכורת: כל עוד `sc4sap:sap` מנותק, סוכני sc4sap (למשל sap-pp-consultant, sap-mm-consultant, sap-debugger)
> עדיין זמינים כידע, אך לא יכולים לשאוב נתונים ממערכת SAP חיה. HQ ימשיך לעבוד באמצעות הראיות שתדביק.

---

*מסמך זה נבנה מרכיבים אמיתיים בלבד. סביבות: ECC6 + S/4HANA On-Premise. דגש: PP / PP-PI / PM / ממשקים / troubleshooting.*
