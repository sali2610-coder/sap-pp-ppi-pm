# קטלוג פקודות — מערכת ה‑SAP AI

> **תאריך אימות המקור:** 2026‑07‑23 · מבוסס על `/tmp/sap-brain-facts.md` (SOURCE OF TRUTH) + קריאה ישירה (read‑only)
> של `~/.claude/commands/hq.md`, `~/.claude/skills/hq/`, `~/.claude/skills/{sherlock,oracle,memory,flagship}/`,
> ותיקיית ה‑cache של תוסף `sc4sap`.
> כל עובדה בקטלוג מצוינת עם מקור. ערך שלא אומת מסומן **לא אומת**. אין המצאה של פקודות, גרסאות או מספרים.

---

## 0. איך לקרוא את הקטלוג (למתחיל ב‑SAP AI)

במערכת הזו יש שני סוגי "פקודות" שחשוב לא לבלבל ביניהם, כי הם מתנהגים אחרת:

1. **פקודת Slash אמיתית (Command file)** — קובץ `.md` תחת תיקיית `commands/` (למשל `~/.claude/commands/hq.md`).
   רק סוג זה מקבל **השלמה אוטומטית (autocomplete)** בשורת ה‑Slash אחרי הפעלה מחדש של הכלי. כרגע קיים **קובץ‑פקודה
   גלובלי יחיד: `/hq`** (מקור: facts שורה 143 `GLOBAL COMMANDS = hq.md`; קובץ `~/.claude/commands/hq.md`).
2. **Skill שמופעל‑ע"י‑מודל (model‑invoked) ומוצג כ"פקודה"** — סקיל שאין לו קובץ command נפרד, אלא הוא מופעל דרך
   כלי ה‑Skill או מוזכר בכתיב Slash מרחבי‑שם (namespace) של התוסף, למשל `/sc4sap:sap-doctor`. אלה **אינם**
   פקודות‑קובץ אמיתיות, ולכן ההתנהגות של autocomplete עבורם תלויה בכלי ההרצה ומסומנת בהתאם.

**כלל‑זהב שנשמר לאורך כל הקטלוג:** רק `/hq` הוא קובץ‑פקודה אמיתי היום. כל השאר הם סקילים (חלקם עם כתיב Slash של
תוסף). מקור: facts שורה 143 + היעדר תיקיית `commands/` בתוסף sc4sap (אומת: `ls .../sc4sap/0.6.14/commands/`
מחזיר ריק; הסקילים יושבים תחת `.../sc4sap/0.6.14/skills/`).

מקרא סטטוס (כפי שנדרש בהוראות): **מותקן** = התוסף/הסקיל קיים בדיסק · **פעיל** = נטען וזמין לשימוש ·
**מחובר** = MCP/שירות חיצוני מחובר בפועל · **דורש‑אימות** = צריך התחברות · **נכשל** = ניסה להתחבר ונכשל.

---

## 1. הפקודה הראשית — `/hq`

| שדה | ערך |
|---|---|
| **שם** | `/hq` (וגם `@hq`, `hq`) |
| **מקור** | `~/.claude/commands/hq.md` → מפעיל את סקיל `~/.claude/skills/hq/SKILL.md`. (facts שורות 143, 152) |
| **תפקיד** | **מנצח (Orchestrator) בלבד** — שער כניסה יחיד לכל מערכת ה‑SAP AI. חושב כיועץ SAP בכיר, אך לא פותר בעצמו. |
| **מה זה מפעיל** | שרשרת נימוק בת 10 שלבים (Observe→Classify→Health‑check→Hypotheses→Evidence★→Root Cause→Missing‑Info→Confidence→Explain‑Why→Never‑Guess), ואז ניתוב לשלושת המנהלים: **Sherlock** (חקירה), **Oracle** (ידע), **Memory** (היסטוריה). מסיים ב‑HQ Summary קבוע. (מקור: `hq/SKILL.md`) |
| **גלובלי?** | **כן** — קובץ‑פקודה גלובלי ב‑`~/.claude/commands/`. (facts שורה 143) |
| **Autocomplete?** | **כן — לאחר הפעלה מחדש** של הכלי (זהו קובץ‑command אמיתי). |
| **דוגמה** | `/hq יש לי IDOC בסטטוס 51 ב‑WE02, מה השורש?` |
| **סיכון** | נמוך. HQ הוא read‑only מבחינת מערכות SAP: מריץ healthcheck read‑only, ולא מתחבר ל‑SAP, לא מתקין ולא משנה קוד. אינו נוגע ב‑Sherlock/Oracle/Memory. (מקור: Guardrails ב‑`hq/SKILL.md`) |

### `/hq search <terms>` — תת‑מצב חיפוש

| שדה | ערך |
|---|---|
| **שם** | `/hq search <terms>` |
| **מקור** | `hq/SKILL.md` (בלוק Operational Intelligence) → `~/.claude/skills/hq/scripts/hq-ops.sh search`. |
| **תפקיד** | חיפוש בהיסטוריה בלבד (runbooks, lessons, incidents, archive, memory) והצעת התקרית הדומה ביותר. **לא** נפתח workspace חדש. |
| **מה זה מפעיל** | `hq-ops.sh search <terms>` (כותב רק תחת `~/SAP-HQ/`). |
| **גלובלי?** | כן (חלק מפקודת `/hq` הגלובלית). |
| **Autocomplete?** | כן ל‑`/hq`; תת‑המילה `search` היא ארגומנט חופשי, לא ערך שמושלם. |
| **דוגמה** | `/hq search idoc 51` · `/hq search WE20` · `/hq search message RU806` |
| **סיכון** | נמוך — קריאה/ארגון בלבד תחת `~/SAP-HQ/`. |

---

## 2. שלושת המנהלים — סקילים (model‑invoked)

> **הבהרה חשובה:** לשלושת המנהלים **אין קובץ‑command** משלהם היום. הם סקילים שמופעלים ע"י המודל, ותואמים‑לאחור
> לכתיב `/sherlock`, `/oracle`, `/memory` שממשיך לעבוד ישירות (מקור: `hq/SKILL.md`, שורת "Backward compatible").
> רק `/hq` הוא קובץ‑פקודה אמיתי (facts שורה 143).

### `/sherlock`

| שדה | ערך |
|---|---|
| **שם** | `/sherlock` (וגם `@sherlock`, `sherlock`, "שרלוק") |
| **מקור** | `~/.claude/skills/sherlock/SKILL.md` (facts שורה 169–171). |
| **תפקיד** | מנהל **חקירת תקלות** (orchestration only): dumps, IDoc/queue תקוע, ממשקים, הרשאות, ביצועים, debug. |
| **מה זה מפעיל** | מסווג ומנתב ל‑workers קיימים לפי `~/.claude/skills/flagship/CAPABILITY-REGISTRY.md` — למשל `sap-incident-commander`, `sap-ecc-troubleshooter`, סוכני sc4sap, `sap-sqlscript`, UI5/Fiori, browser; קורא ל‑Memory (נראה בעבר?) ו‑Oracle (Note?). מחזיר דוח חקירה קבוע בן 9 מקטעים. (מקור: `sherlock/SKILL.md`, `flagship/ARCHITECTURE.md`) |
| **גלובלי?** | כן — סקיל גלובלי תחת `~/.claude/skills/`. אין לו קובץ‑command. |
| **Autocomplete?** | **לא** כפקודת‑Slash אמיתית (אין קובץ command). מופעל ע"י מודל / בכתיב תואם‑לאחור. |
| **דוגמה** | `/sherlock תחקור ST22 עם CX_SY_OPEN_SQL_DB` |
| **סיכון** | נמוך — orchestration בלבד, לא מתחבר ל‑SAP חי. תלוי ב‑MCP; `sc4sap:sap` **נכשל/מנותק** → נופל ל"ראיות מודבקות". (facts שורות 80, 191) |

### `/oracle`

| שדה | ערך |
|---|---|
| **שם** | `/oracle` (וגם `@oracle`, "אורקל") |
| **מקור** | `~/.claude/skills/oracle/SKILL.md` (facts שורות 166–168). |
| **תפקיד** | מנהל **ידע SAP**: SAP Notes/KBAs, SAP Help, Community, Release Notes, Best Practices, התאמת ECC↔S/4, צורך ב‑SP/Kernel/Upgrade. |
| **מה זה מפעיל** | מנתב ל‑`deep-research`, `WebSearch`/`WebFetch`, `sap-forecaster`, `sap-function-finder`, `sap-abap-ecc-s4-expert`, `sap-api-policy`; מחזיר Knowledge Report. תמיד מציין תחולת ECC מול S/4. (מקור: `oracle/SKILL.md`, `flagship/ARCHITECTURE.md`) |
| **גלובלי?** | כן — סקיל גלובלי. אין קובץ‑command. |
| **Autocomplete?** | **לא** כפקודת‑Slash אמיתית. מופעל ע"י מודל / כתיב תואם‑לאחור. |
| **דוגמה** | `/oracle מה אומר SAP Note על שגיאת M7‑053 ב‑MIGO?` |
| **סיכון** | נמוך — מחקר/קריאה. מבצע WebSearch/WebFetch (גישה לרשת) — לשקול בעת עבודה offline. |

### `/memory`

| שדה | ערך |
|---|---|
| **שם** | `/memory` (וגם `@memory`, "memory") |
| **מקור** | `~/.claude/skills/memory/SKILL.md` (facts שורות 163–165). |
| **תפקיד** | מנהל **זיכרון ארגוני**: "כבר פתרנו את זה?", פרויקטים/תקריות/runbooks/lessons קודמים, מסמכי SAP שמורים. |
| **מה זה מפעיל** | מחפש ידע מקומי — קבצי memory (`~/.claude/projects/*/memory/*.md`), תיקיות SAP שמורות, PDF/Word/Excel — דרך `Grep`/`Glob`, `pdf`/`docx`/`xlsx`, `sap-document-intelligence`, `sap-israel-knowledge`; משמר לקחים חדשים דרך `reflexion:memorize`. (מקור: `memory/SKILL.md`, `flagship/ARCHITECTURE.md`) |
| **גלובלי?** | כן — סקיל גלובלי. אין קובץ‑command. |
| **Autocomplete?** | **לא** כפקודת‑Slash אמיתית. מופעל ע"י מודל / כתיב תואם‑לאחור. |
| **דוגמה** | `/memory כבר נתקלנו ב‑IDOC 51 מול Zetes בעבר?` |
| **סיכון** | נמוך — קריאה מקומית. שמירת לקחים חדשה מתבצעת רק באישור Sali (מקור: `hq/SKILL.md`, Continuous Learning). |

---

## 3. פקודות תוסף `sc4sap` — חשופות כסקילים (`/sc4sap:<name>`)

> **מקור וסטטוס:** תוסף `sc4sap@sc4sap v0.6.14` — **מותקן** (facts שורה 44), עם **16 סקילים** (facts שורה 126).
> אומת ישירות: אין תיקיית `commands/`; הסקילים יושבים תחת `.../sc4sap/0.6.14/skills/`, ולכן הם חשופים בכתיב
> Slash של תוסף `/sc4sap:<name>` ולא כקבצי‑command עצמאיים.
> **⚠️ MCP `plugin:sc4sap:sap` = נכשל/מנותק** (facts שורות 80, 191). כל פקודה שמצריכה מערכת SAP חיה **לא תפעל
> מול SAP** עד לחיבור; היא נופלת לניתוח על בסיס קלט/ראיות מודבקות. לכן עמודת הסיכון מסמנת זאת במפורש.

**גלובלי? / Autocomplete? לכל הפקודות בסעיף זה:** גלובלי = כן (scope=user, facts שורה 44). Autocomplete כפקודת‑Slash
אמיתית = **לא** (אין קובץ command; כתיב תוסף `/sc4sap:<name>`).

| שם | תפקיד | מה זה מפעיל | דוגמה | סיכון |
|---|---|---|---|---|
| `/sc4sap:setup` | הגדרה ראשונית של סביבת sc4sap | אשף הגדרה של התוסף (פרופילים/הגדרות) | `/sc4sap:setup` | בינוני — משנה הגדרות מקומיות. **אל תריץ** אלא אם המשתמש ביקש (ההוראות אוסרות setup/install). |
| `/sc4sap:sap-doctor` | אבחון בריאות סביבת sc4sap | בדיקות אבחון של התוסף | `/sc4sap:sap-doctor` | נמוך — אבחון/קריאה. |
| `/sc4sap:mcp-setup` | הגדרת חיבור ה‑MCP של sc4sap ל‑SAP | תצורת גשר ה‑MCP (`bridge/mcp-server.cjs`) | `/sc4sap:mcp-setup` | גבוה — מגדיר חיבור SAP. **אסור להריץ** (MCP נכשל/מנותק; אין לחבר SAP). |
| `/sc4sap:trust-session` | אישור/הרשאת סשן מהימן | ניהול אמון סשן מול הגשר | `/sc4sap:trust-session` | בינוני — נוגע בהרשאות סשן. |
| `/sc4sap:team` | הגדרת/ניהול צוות סוכני sc4sap | בחירה/תזמור של סוכני התוסף | `/sc4sap:team` | נמוך — קונפיגורציה. |
| `/sc4sap:release` | תהליך release / העברת אובייקטים | זרימת release של התוסף | `/sc4sap:release` | גבוה אם מחובר ל‑SAP — כרגע MCP מנותק, לא יבוצע מול מערכת. |
| `/sc4sap:create-program` | יצירת תוכנית ABAP חדשה | סוכני יצירה/כתיבה של sc4sap | `/sc4sap:create-program דוח ALV למלאי` | בינוני — מייצר קוד; ללא חיבור SAP נשאר מקומי. |
| `/sc4sap:create-object` | יצירת אובייקט SAP (כללי) | סוכני יצירה של sc4sap | `/sc4sap:create-object CDS view ל‑EQUI` | בינוני — כנ"ל. |
| `/sc4sap:analyze-code` | ניתוח קוד ABAP קיים | סוכני code‑review/analyst | `/sc4sap:analyze-code <ZPROGRAM>` | נמוך — ניתוח/קריאה. |
| `/sc4sap:analyze-cbo-obj` | ניתוח אובייקט CBO (Custom‑Built Object) | סוכני ניתוח custom‑code | `/sc4sap:analyze-cbo-obj <Z-obj>` | נמוך — ניתוח. |
| `/sc4sap:program-to-spec` | הפקת מפרט מתוך תוכנית קיימת | reverse‑engineering לקוד→מפרט | `/sc4sap:program-to-spec <ZPROG>` | נמוך — קריאה/תיעוד. |
| `/sc4sap:compare-programs` | השוואת שתי תוכניות | דיף/ניתוח השוואתי | `/sc4sap:compare-programs <A> <B>` | נמוך — קריאה. |
| `/sc4sap:analyze-symptom` | ניתוח תסמין תקלה | סוכני debug/analyst (חופף ל‑Sherlock) | `/sc4sap:analyze-symptom IDOC 51` | נמוך — ניתוח; ללא SAP חי מסתמך על קלט מודבק. |
| `/sc4sap:ask-consultant` | שאלה ליועץ SAP וירטואלי (מודולי) | סוכני יועצים (PP/PM/MM/…) | `/sc4sap:ask-consultant איך מגדירים batch determination?` | נמוך — ידע. |
| `/sc4sap:deep-interview` | ראיון עומק לאיסוף דרישות | סוכן תשאול מובנה | `/sc4sap:deep-interview לתהליך רכש` | נמוך — שיח/איסוף. |
| `/sc4sap:sap-option` | בחירת אפשרויות/תצורת התנהגות התוסף | תפריט אפשרויות sc4sap | `/sc4sap:sap-option` | נמוך — קונפיגורציה. |

> הערה: `sc4sap` כולל גם **28 סוכנים** (facts שורות 126, 136–137: `sap-pp-consultant`, `sap-pm-consultant`,
> `sap-debugger`, `sap-code-reviewer`, וכו'). אלה **סוכנים** ולא פקודות, ולכן אינם רשומים כאן כפקודות אלא כ‑workers
> שהפקודות/הסקילים מעליהם מפעילים.

---

## 4. פקודות/סקילים ייעודיים נוספים (תוספי SAP)

> כולם **גלובליים** (scope=user) ו‑**מותקנים** לפי facts. Autocomplete כפקודת‑Slash אמיתית = **לא** (כתיב תוסף
> `/<plugin>:<name>`, ללא קובץ command עצמאי אלא אם צוין אחרת).

### תוסף `sap-sqlscript` (v2.2.2, מותקן — facts שורה 40, 122: skills=1 agents=3 cmds=4)

| שם | מקור | תפקיד | מה זה מפעיל | דוגמה | סיכון |
|---|---|---|---|---|---|
| `/sap-sqlscript:sqlscript-validate` | תוסף `sap-sqlscript` | ולידציה של קוד SQLScript (HANA) | בודק תחביר/כללים של SQLScript | `/sap-sqlscript:sqlscript-validate <proc.sql>` | נמוך — ניתוח קוד. |
| `/sap-sqlscript:sqlscript-convert` | כנ"ל | המרת SQL/קוד ל‑SQLScript | ממיר בין ניבים | `/sap-sqlscript:sqlscript-convert <in.sql>` | נמוך — טרנספורמציית קוד. |
| `/sap-sqlscript:sqlscript-optimize` | כנ"ל | אופטימיזציה של SQLScript | מנתח ומציע שיפורי ביצועים | `/sap-sqlscript:sqlscript-optimize <proc.sql>` | נמוך — ניתוח/המלצות. |
| `/sap-sqlscript:sqlscript-setup` | כנ"ל | הגדרת סביבת SQLScript | אשף הגדרה | `/sap-sqlscript:sqlscript-setup` | בינוני — משנה הגדרות מקומיות. |

> הערה: הקבצים במרקטפלייס מוגדרים כ‑`cmds=4` עבור sap-sqlscript (facts שורה 122) — לכן ארבעת אלה קרובים ל"פקודות".
> עם זאת, ההוראות מציינות אותם במפורש כ‑"sap-sqlscript commands" ולכן הם נכללים כאן; אם קיים גם קובץ‑command גלובלי
> תחת `~/.claude/commands/` — **לא אומת** (facts שורה 143 מפרטת רק `hq.md` כגלובלי).

### תוסף `sap-abap` (v2.4.0, מותקן — facts שורה 26, 108: skills=1 cmds=1)

| שם | מקור | תפקיד | מה זה מפעיל | דוגמה | סיכון |
|---|---|---|---|---|---|
| `/sap-abap:abap-cloud-review` | תוסף `sap-abap` | סקירת קוד ABAP Cloud / Clean Core | מנתח קוד ABAP לתאימות Cloud/Clean‑Core | `/sap-abap:abap-cloud-review <ZCL_...>` | נמוך — סקירה/קריאה. |

### תוסף `sap-dependency-security` (v2.4.0, מותקן — facts שורה 38, 120: skills=1 cmds=1 hooks=1)

| שם | מקור | תפקיד | מה זה מפעיל | דוגמה | סיכון |
|---|---|---|---|---|---|
| `/sap-dependency-security:sap-dependency-upgrade-plan` | תוסף `sap-dependency-security` | בניית תוכנית שדרוג תלויות מאובטחת | מנתח תלויות ומפיק תוכנית שדרוג | `/sap-dependency-security:sap-dependency-upgrade-plan` | נמוך — ניתוח/תכנון (לא מבצע שדרוג בפועל). |

### תוסף `sap-btp-master-data-integration` (v2.4.0, מותקן — facts שורה 36, 118: skills=1 cmds=1)

| שם | מקור | תפקיד | מה זה מפעיל | דוגמה | סיכון |
|---|---|---|---|---|---|
| `/sap-btp-master-data-integration:mdi-replication-check` | תוסף `sap-btp-master-data-integration` | בדיקת רפליקציה של Master Data Integration ב‑BTP | מריץ בדיקת סטטוס/עקביות רפליקציה | `/sap-btp-master-data-integration:mdi-replication-check` | נמוך–בינוני — בדיקה; מול BTP חי תלוי בהרשאות/חיבור (**לא אומת** אם מחובר). |

---

## 5. סיכום מהיר — מה באמת "פקודה גלובלית" היום

| קטגוריה | פריטים | קובץ‑command אמיתי? | Autocomplete אמיתי? |
|---|---|---|---|
| שער ראשי | `/hq` (+`/hq search`) | **כן** (`~/.claude/commands/hq.md`) | **כן**, לאחר restart |
| שלושת המנהלים | `/sherlock` · `/oracle` · `/memory` | לא (סקילים, תואמי‑לאחור) | לא כפקודת‑Slash אמיתית |
| sc4sap | 16 סקילים `/sc4sap:*` | לא (אין תיקיית commands) | לא כפקודת‑Slash אמיתית |
| sap-sqlscript | 4 (`validate/convert/optimize/setup`) | מסומן `cmds=4` במרקטפלייס; גלובלי תחת `~/.claude/commands/` **לא אומת** | לא אומת |
| sap-abap / dependency‑security / mdi | 3 סקילים/פקודות‑תוסף | חד‑ערכי לכל תוסף (`cmds=1`); גלובליות תחת `~/.claude/commands/` **לא אומת** | לא אומת |

**עקרונות‑על שנשמרו:** רק `/hq` הוא קובץ‑פקודה גלובלי מאומת (facts שורה 143). `sc4sap:sap` MCP = **נכשל/מנותק**
ולא מסומן כמחובר בשום מקום (facts שורות 80, 191). לא הוצגו סודות/טוקנים. כל ערך לא‑ודאי סומן **לא אומת**.

---

*מסמך זה הוא חלק ממערך "SAP AI Brain". קובץ אחות: `SAP_AI_ARCHITECTURE.md` (ארכיטקטורת המערכת המלאה).*
