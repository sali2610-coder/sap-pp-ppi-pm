# קטלוג סוכני SAP (SAP Agents Catalog)

> מסמך זה מבוסס אך ורק על עובדות מאומתות מתוך `/tmp/sap-brain-facts.md` ומקריאה ישירה (קריאה בלבד) של קובצי ההגדרה של הסוכנים תחת `~/.claude/plugins/cache/`.
> מקור לכל עובדה מצוין. ערך שלא אומת נכתב במפורש כ**"לא אומת"**. אין להמציא רכיב, גרסה, SAP Note או מספר.

---

## הבהרת סטטוס קריטית — קרא לפני הכול

| מונח | משמעות במסמך זה |
|------|----------------|
| **מותקן** | הפלאגין נמצא ב-`installed_plugins.json` וקבצי הסוכן קיימים ב-cache. |
| **פעיל** | הסוכן ניתן להפעלה ע"י Claude (קובץ ההגדרה תקין). |
| **מחובר** | ה-MCP שהסוכן צורך נמצא במצב `Connected` ב-`claude mcp list`. |
| **דורש-אימות** | ה-MCP במצב `Needs authentication`. |
| **נכשל** | ה-MCP במצב `Failed to connect`. |

### אזהרה על סוכני sc4sap — ה-MCP שלהם מנותק

**מקור:** `claude mcp list` (שורה 80 ב-`sap-brain-facts.md`) ו-Healthcheck (שורה 191):

```
plugin:sc4sap:sap: node .../sc4sap/0.6.14/bridge/mcp-server.cjs — ✘ Failed to connect
```

כל 26 סוכני **sc4sap** מגדירים בקוד שלהם כלי `mcp__plugin_sc4sap_sap__*` (נצפה ישירות ב-frontmatter של כל קובץ סוכן).
מאחר ש-MCP זה במצב **נכשל / מנותק**, כלים אלה **לא זמינים בפועל**. המשמעות:

- הסוכנים **מותקנים ופעילים** (הקבצים קיימים ותקינים) אך **אינם מחוברים** למערכת SAP חיה.
- **fallback רשמי** (מ-Healthcheck שורה 191): `fallback: pasted evidence` — כלומר יש להזין ידנית ראיות (dump/tcode/טבלה) שהודבקו ע"י המשתמש.
- אין להריץ, לתקן, ליצור או לשנות אובייקטים ב-SAP דרך סוכנים אלה כל עוד ה-MCP מנותק.

**מקרא כתיבה ל-SAP (Read-Write אל מערכת ה-SAP):** רק שלושה סוכני sc4sap מוגדרים עם כלי כתיבה אל SAP (`Update*`/`Create*`/`Delete*`), וכולם על מודל Sonnet — מיועדים ל-**DEV בלבד**:

| סוכן | R/W אל SAP | מקור (frontmatter) |
|------|-----------|--------------------|
| **sap-executor** | ✅ כן (Create/Update/Delete מלא) | `tools:` כולל `CreateClass`, `UpdateProgram`, `DeleteTable`... |
| **sap-debugger** | ✅ כן (Update + CreateTransport) | `tools:` כולל `UpdateClass`, `UpdateProgram`, `CreateTransport` |
| **sap-qa-tester** | ✅ כן (Create/Update/Delete unit tests) | `tools:` כולל `CreateUnitTest`, `DeleteUnitTest`, `CreateTransport` |

**כל שאר היועצים (Consultants) הם R/O** — ה-frontmatter שלהם כולל `disallowedTools: [Write, Edit]` ורק כלי `Get*`/`Search*` (קריאה בלבד).
`sap-planner`, `sap-stocker`, `sap-writer` כותבים ל-**קבצים מקומיים** (Edit/Write) אך **R/O אל SAP** (ראה פירוט לכל אחד).

---

## סקירת ספירה

| מקור פלאגין | מספר סוכנים | מקור עובדה |
|-------------|-------------|-----------|
| `sc4sap@sc4sap` v0.6.14 | 26 | `sap-brain-facts.md` שורה 126 (`agents=28` בספירת cache הכוללת) + רשימת top-level שורה 137 |
| `sap-sqlscript@sap-skills` v2.2.2 | 3 | `sap-brain-facts.md` שורה 122 (`agents=3`); קבצים: `amdp-helper`, `procedure-generator`, `sqlscript-analyzer` |
| `sapui5@sap-skills` v2.2.0 | 4 | `sap-brain-facts.md` שורה 125 (`agents=4`); קבצים: `ui5-migration-specialist`, `ui5-api-explorer`, `ui5-code-quality-advisor`, `ui5-app-scaffolder` |

**הערת דיוק על הספירה:** שורה 126 ב-`sap-brain-facts.md` מציינת `sc4sap ... agents=28` (סריקת cache כוללת). רשימת קובצי ה-top-level (`agents/*.md`, שורה 137) מונה **26 סוכנים**. ההפרש (28 מול 26) — **לא אומת** מקורו המדויק (ככל הנראה קבצי `agent_details/` נלווים בתיקייה שאינם סוכנים עצמאיים). מסמך זה מפרט את **26 הסוכנים ברשימת ה-top-level** כפי שאומתו בקריאה ישירה של ה-frontmatter.

---

## חלק א' — 26 סוכני sc4sap

מאפיינים משותפים לכל סוכני sc4sap (מאומת מ-frontmatter):
- **פלאגין הורה:** `sc4sap@sc4sap` v0.6.14
- **MCP בשימוש:** `plugin:sc4sap:sap` — **מנותק / נכשל** (ראה אזהרה למעלה).
- **מתי HQ מפעיל:** HQ הוא **מתזמר בלבד** ומנתב ל-Sherlock/Oracle/Memory. מכיוון ש-MCP של sc4sap מנותק, HQ **אינו** מפעיל סוכני sc4sap ישירות מול SAP; במקום זאת השכבה של Oracle (ידע) / Sherlock (חקירה) עונה על בסיס ידע ו-"pasted evidence". *(מקור: `routing.md` — HQ→Oracle→sap-abap-ecc-s4-expert; אזהרת MCP.)*
- **fallback משותף:** `pasted evidence` (הזנת ראיות ידנית) — מ-Healthcheck שורה 191.
- **דוגמת סיכון משותפת:** ניסיון להפעיל כלי `mcp__plugin_sc4sap_sap__*` ייכשל בזמן ריצה כל עוד ה-MCP מנותק.

### א.1 — יועצי מודולים (Module Consultants) — כולם R/O

כל היועצים במודל **claude-opus-4-7**, עם `disallowedTools: [Write, Edit]` וסט כלי קריאה (`GetPackage`, `SearchObject`, `GetTable`, `GetStructure`, `GetDataElement`).
**R/O אל SAP** (קריאה בלבד). **task type:** שאלות פונקציונליות/הסבר/ניתוח פער במודול. **מתי HQ מפעיל:** בקשת ידע/עיצוב במודול הרלוונטי (דרך Oracle). **fallback:** pasted evidence + ידע Oracle. **סיכון:** — (R/O, ללא כתיבה ל-SAP).

| # | שם הסוכן | מודול / תחום | מודל |
|---|----------|--------------|------|
| 1 | **sap-pp-consultant** | Production Planning — MRP, הזמנות ייצור, תכנון קיבולת, בקרת רצפת ייצור | Opus 4-7 |
| 2 | **sap-pm-consultant** | Plant Maintenance — הזמנות תחזוקה, ניהול ציוד, תחזוקה מונעת, הודעות | Opus 4-7 |
| 3 | **sap-qm-consultant** | Quality Management — תכנון בדיקות, הודעות איכות, תעודות איכות, דגימה | Opus 4-7 |
| 4 | **sap-mm-consultant** | Materials Management — Procure-to-Pay, ניהול מלאי, קונפיגורציית רכש | Opus 4-7 |
| 5 | **sap-sd-consultant** | Sales & Distribution — Order-to-Cash, תמחור, חיוב, משלוח | Opus 4-7 |
| 6 | **sap-fi-consultant** | Financial Accounting — ספר ראשי, AP/AR, חשבונאות נכסים, בנקאות | Opus 4-7 |
| 7 | **sap-co-consultant** | Controlling — מרכזי עלות, הזמנות פנימיות, תמחיר מוצר, ניתוח רווחיות | Opus 4-7 |
| 8 | **sap-ps-consultant** | Project System — WBS, רשתות, תכנון עלויות פרויקט, תקצוב, חיוב אבני דרך | Opus 4-7 |
| 9 | **sap-wm-consultant** | Warehouse Management — ניהול תאי אחסון, תנועות סחורה, אסטרטגיות ליקוט/אחסון, EWM | Opus 4-7 |
| 10 | **sap-tm-consultant** | Transportation Management — ניהול הובלה, תכנון מסלול, בחירת מוביל, סליקת הובלה | Opus 4-7 |
| 11 | **sap-hcm-consultant** | Human Capital Management — ניהול כוח אדם, שכר, ניהול זמן, ניהול ארגוני | Opus 4-7 |
| 12 | **sap-tr-consultant** | Treasury — ניהול מזומנים, ניהול סיכונים, תקשורת בנקאית, In-House Cash | Opus 4-7 |
| 13 | **sap-bw-consultant** | Business Warehouse — מידול נתונים, ETL, שאילתות BEx, BW/4HANA | Opus 4-7 |
| 14 | **sap-ariba-consultant** | Ariba — רכש, Sourcing, ניהול ספקים, ניהול חוזים, Ariba Network | Opus 4-7 |
| 15 | **sap-bc-consultant** | Basis — ניטור מערכת, ניהול transports, כוונון ביצועים, ניתוח dumps | Opus 4-7 |

> **דוגמה (sap-pm-consultant):** משתמש שואל "איך מגדירים תחזוקה מונעת מבוססת מונה ב-PM?" → HQ→Oracle מנתב לתחום PM; הסוכן משיב על בסיס ידע (R/O). **הערה:** אם נדרשת קריאת אובייקט חי ב-SAP — יידרש MCP `sc4sap:sap` שכרגע **מנותק**, ולכן התשובה תסתמך על ידע/ראיות מודבקות.
>
> **חריג טכני ב-sap-bc-consultant:** ה-frontmatter שלו כולל גם כלי runtime (`RuntimeAnalyzeDump`, `RuntimeListDumps`, `ListTransports`, `GetTransport`) — כלים אלה **קוראים** dumps/transports אך אינם כותבים. נשאר **R/O אל SAP**. *(מקור: frontmatter sap-bc-consultant.)*

### א.2 — סוכני תשתית / תהליך (R/O אל SAP)

| # | שם | תפקיד | מודל | R/W? | מקור |
|---|-----|-------|------|------|------|
| 16 | **sap-analyst** | ניתוח דרישות — מפרטים פונקציונליים, ניתוח פערים, קריטריוני קבלה | Opus 4-7 | **R/O** (`disallowedTools: Write, Edit`) | frontmatter |
| 17 | **sap-architect** | ארכיטקטורת מערכת — עיצוב טכני, ארכיטקטורת ABAP, דפוסי אינטגרציה | Opus 4-7 | **R/O** (`disallowedTools: Write, Edit`) | frontmatter |
| 18 | **sap-code-reviewer** | סקירת קוד ABAP — Clean ABAP, ביצועים, אבטחה, תאימות תקן SAP | Opus 4-7 | **R/O** (`disallowedTools: Write, Edit`) | frontmatter |
| 19 | **sap-critic** | שער איכות — סקירת מפרט פונקציונלי, ולידציית קונפיגורציה, ביקורת תוכנית מימוש | Opus 4-7 | **R/O** (`disallowedTools: Write, Edit`) | frontmatter |
| 20 | **sap-doc-specialist** | הפניית תיעוד — SAP Help Portal, OSS Notes, תיעוד IMG, ABAP keyword docs | **Sonnet 4-6** | **R/O** (`disallowedTools: Write, Edit`) | frontmatter |

**task type:** ניתוח, סקירה, ולידציה, הפניה לתיעוד. **מתי HQ מפעיל:** דרך Oracle (ידע/עיצוב) או Sherlock (חקירה). **fallback:** pasted evidence. **סיכון:** — (R/O).

### א.3 — סוכני כתיבה מקומית (R/O אל SAP, R/W לקבצים מקומיים)

| # | שם | תפקיד | מודל | R/W SAP | R/W מקומי | מקור |
|---|-----|-------|------|---------|-----------|------|
| 21 | **sap-planner** | תכנון פרויקט — Roadmaps, תכנון WRICEF, תכנון Cutover | Opus 4-7 | **R/O** (רק כלי `Get*`/`Search*`/`ListTransports`) | ✅ Edit, Write | frontmatter |
| 22 | **sap-stocker** | מלאי CBO — מיפוי packages, גרפי where-used, היסק מטרה עסקית, שמירת artifacts | **Sonnet 4-6** | **R/O אל SAP** (רק `Get*`) | ✅ Edit/Write אל `.sc4sap/` מקומי | תיאור frontmatter מפורש: "R/O on SAP + R/W on local .sc4sap/" |
| 23 | **sap-writer** | תיעוד טכני — מפרטים פונקציונליים, מדריכי קונפיגורציה, מדריכי משתמש | **Haiku 4-5** | **R/O אל SAP** (רק `Get*`/`Search*`) | ✅ Edit, Write | frontmatter |

**task type:** תכנון, אינוונטריזציה, כתיבת תיעוד. **סיכון:** כתיבה לקבצים מקומיים בלבד — **אין** כתיבה ל-SAP. `sap-planner`/`sap-writer` אינם מגדירים `disallowedTools` אך גם אינם כוללים כלי `Create*`/`Update*`/`Delete*` אל SAP.

### א.4 — סוכני R/W אל SAP (DEV בלבד) — ⚠️ כותבים למערכת

| # | שם | תפקיד | מודל | היקף כתיבה אל SAP | מקור |
|---|-----|-------|------|-------------------|------|
| 24 | **sap-executor** | מימוש קוד ABAP — programs, function modules, classes, enhancements, CDS | **Sonnet 4-6** | **R/W מלא** — `Create*`, `Update*`, `Delete*` על כל סוגי האובייקטים (Class/Program/Table/CDS/Service...), `CreateTransport`, `RunUnitTest` | frontmatter (רשימת `tools` כוללת עשרות כלי Create/Update/Delete) |
| 25 | **sap-debugger** | דיבוג ABAP — ניתוח dump בזמן ריצה, profiling, פתרון שגיאות transport | **Sonnet 4-6** | **R/W חלקי** — `UpdateClass/Program/FunctionModule/Interface/Include`, `CreateTransport`, `RunUnitTest`, כלי Runtime | frontmatter |
| 26 | **sap-qa-tester** | בדיקות — ABAP unit tests, תרחישי אינטגרציה, ניהול נתוני בדיקה | **Sonnet 4-6** | **R/W ממוקד בדיקות** — `Create/Update/Delete UnitTest` ו-`CdsUnitTest`, `CreateTransport`, `RunUnitTest` | frontmatter |

**task type:** מימוש, דיבוג, בדיקות. **מתי HQ מפעיל:** רק בהקשר פיתוח מפורש; HQ עצמו לא מתזמר כתיבה ל-SAP (ראה מגבלות המערכת: "Do NOT connect SAP, run setup, install, update, delete"). **fallback:** pasted evidence.
**⚠️ סיכון גבוה:** כלים אלה כותבים אובייקטי ABAP ופותחים transports. חובה **DEV בלבד**. כרגע חסום בפועל כי MCP `sc4sap:sap` **מנותק** — הכלים לא ירוצו עד חיבור ואימות.

> **דוגמה (sap-executor):** "צור CDS view ל-Z_SALES עם association ל-KNA1" → הסוכן (בסביבת DEV מחוברת) היה יוצר את ה-CDS ואת ה-transport. **כרגע:** ייכשל בזמן ריצה — MCP מנותק.

---

## חלק ב' — 3 סוכני sap-sqlscript

- **פלאגין הורה:** `sap-sqlscript@sap-skills` v2.2.2
- **מודול:** SAP HANA SQLScript / AMDP (ABAP Managed Database Procedures)
- **MCP בשימוש:** **אין** — `sap-brain-facts.md` שורה 122 מציין `mcp=0` לפלאגין זה. הסוכנים עובדים על **קבצים מקומיים בלבד**.
- **task type:** יצירה/ניתוח/סקירת קוד SQLScript ו-AMDP.
- **fallback:** עבודה על קוד מודבק/קבצים מקומיים (אין תלות ב-SAP חי).

| # | שם | תפקיד | כלים (frontmatter) | R/W | סיכון |
|---|-----|-------|--------------------|-----|-------|
| 1 | **amdp-helper** | יצירת/המרת מחלקות AMDP, מיפוי טיפוסים ABAP↔SQLScript, אבחון שגיאות AMDP (`IF_AMDP_MARKER_HDB`) | `Read`, `Write`, `Grep` | R/W **לקבצים מקומיים** בלבד | נמוך — קבצים מקומיים; אין גישה ל-SAP |
| 2 | **procedure-generator** | יצירת procedures/table functions/AMDP חדשים מדרישות; שואל שאלות הבהרה לפני יצירה | `Read`, `Write`, `Grep` | R/W **לקבצים מקומיים** בלבד | נמוך — קבצים מקומיים |
| 3 | **sqlscript-analyzer** | ניתוח/סקירת procedures של HANA — ביצועים, cursor usage, engine mixing, best practices, מגבלות AMDP | `Read`, `Grep`, `Glob` | **R/O** (ללא Write) | — |

**מודל:** כל השלושה `model: inherit` (יורש מהמודל הפעיל). **מתי HQ מפעיל:** בקשות SQLScript/HANA/AMDP (למשל דרך skill `sap-sqlscript`). **הערה:** אף אחד מהם **אינו** כותב אל SAP — אין להם כלי MCP כלל.

---

## חלק ג' — 4 סוכני sapui5

- **פלאגין הורה:** `sapui5@sap-skills` v2.2.0
- **מודול:** SAPUI5 / Fiori (Frontend)
- **MCP בשימוש:** `plugin:sapui5:ui5-tooling` (`npx -y @ui5/mcp-server@0.2.11`) — **מחובר** ✅ (`sap-brain-facts.md` שורה 82: `✔ Connected`).
- **task type:** גילוי API, scaffolding, סקירת קוד, מיגרציה — **על פרויקטי UI5 מקומיים**, לא על מערכת ECC/S4 חיה.
- **fallback:** אם MCP `ui5-tooling` אינו זמין — קריאת קבצי פרויקט מקומיים + WebFetch לתיעוד.

| # | שם | תפקיד | MCP tools בשימוש | R/W | סיכון |
|---|-----|-------|-------------------|-----|-------|
| 1 | **ui5-api-explorer** | גילוי API של UI5, תיעוד controls, דוגמאות שימוש (`sap.m.Table` וכו') | `get_api_reference`, `get_version_info` + `Read/Grep/Glob/WebFetch` | **R/O** (ללא Write/Edit) | — |
| 2 | **ui5-app-scaffolder** | יצירת פרויקטי UI5 חדשים, scaffolding, Integration Cards, Fiori Elements/CAP | `create_ui5_app`, `get_project_info`, `create_integration_card` + `Write/Edit/AskUserQuestion` | **R/W לקבצים מקומיים** | נמוך — יוצר קבצי פרויקט מקומיים |
| 3 | **ui5-code-quality-advisor** | סקירת קוד, linting, best practices, נגישות, אבטחה, אופטימיזציה | `run_ui5_linter`, `get_guidelines`, `get_version_info` + `Edit/AskUserQuestion` | **R/W לקבצים מקומיים** (Edit לתיקונים) | נמוך |
| 4 | **ui5-migration-specialist** | שדרוגי גרסה, המרת TypeScript, מיגרציית OData v2→v4, מודרניזציה, הסרת jQuery.sap | `get_typescript_conversion_guidelines`, `get_version_info`, `run_ui5_linter`, `get_api_reference` + `Edit/Bash` | **R/W לקבצים מקומיים** | בינוני — משנה קוד פרויקט (Edit/Bash) |

**מודל:** כל הארבעה `model: inherit`. **מתי HQ מפעיל:** בקשות פיתוח/מיגרציית Fiori/UI5 (דרך skill `sapui5` או `sap-fiori-tools`). **הערה:** סוכנים אלה פועלים על **קוד frontend מקומי**; הם **אינם** כותבים אל מערכת ה-ECC/S4 backend.

---

## סיכום מיפוי R/O מול R/W אל SAP

| כותב אל SAP (R/W, DEV בלבד) | R/O אל SAP | ללא גישה ל-SAP (מקומי בלבד) |
|----------------------------|------------|------------------------------|
| sap-executor · sap-debugger · sap-qa-tester | 15 יועצי מודולים + sap-analyst · sap-architect · sap-code-reviewer · sap-critic · sap-doc-specialist · sap-planner · sap-stocker · sap-writer | 3 סוכני sqlscript · 4 סוכני sapui5 |

**מצב חיבור נוכחי (מאומת):**
- `plugin:sc4sap:sap` — **נכשל / מנותק** → כל 26 סוכני sc4sap חסומים בפועל מגישה חיה ל-SAP; fallback = pasted evidence.
- `plugin:sapui5:ui5-tooling` — **מחובר** ✅ → 4 סוכני sapui5 פעילים במלואם (על קוד מקומי).
- `sap-sqlscript` — **ללא MCP** → 3 סוכנים פעילים על קבצים מקומיים.

**מגבלות מערכת חלות:** אין לחבר SAP, להריץ setup/install/update/delete, לבצע commit או push. סוכני R/W אל SAP (executor/debugger/qa-tester) מיועדים ל-DEV בלבד ואינם ניתנים להפעלה כל עוד ה-MCP מנותק.

---
*מקורות: `/tmp/sap-brain-facts.md` (שורות 80, 82, 122, 125, 126, 137, 191) · frontmatter של קובצי הסוכנים תחת `~/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/agents/`, `.../sap-skills/sap-sqlscript/2.2.2/agents/`, `.../sap-skills/sapui5/2.2.0/agents/` · `~/.claude/skills/hq/references/routing.md`. כל ערך שלא נמצא במקורות אלה סומן "לא אומת".*
