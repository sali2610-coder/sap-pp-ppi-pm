# קטלוג מיומנויות SAP (SAP Skills Catalog)

מסמך זה מרכז את כל מיומנויות ה‑SAP הזמינות במערכת של סאלי חליף, מקובצות לפי מקור.
נכתב עבור מהנדס/יועץ SAP, כולל מתחילים. כל שם אומת מול תמונת המצב המאומתת
`/tmp/sap-brain-facts.md` (2026‑07‑23). מיומנות שלא נמצאה בתמונת המצב לא נכללת.

**מקרא מצב (חובה להבחין):**
- **מותקן** = הרכיב קיים על הדיסק (Plugin/Skill מותקן).
- **פעיל** = ניתן להפעלה מיידית כ‑Skill בשיחה.
- **מחובר** = שרת MCP במצב Connected.
- **דורש‑אימות** = MCP במצב Needs authentication.
- **נכשל** = MCP במצב Failed to connect.

**הבהרת סטטוס MCP קריטית:** השרת `plugin:sc4sap:sap` נמצא במצב **נכשל /
מנותק** (Failed to connect / DISCONNECTED). מיומנויות התלויות ב‑MCP הזה
מותקנות אך אינן פעילות מקצה‑לקצה עד שהחיבור יתוקן. אין להציג אותו כמחובר.
מקור: `sap-brain-facts.md` שורות 80, 191.

מקרא נוסף: **קריאה‑בלבד?** = האם המיומנות רק קוראת/מנתחת (Yes) או גם כותבת/
מייצרת קבצים/קוד/דיאגרמות (No). ECC/S4 = פלטפורמת היעד המרכזית.

---

## 1) מיומנויות ממקור Plugin (marketplace: sap-skills, sc4sap ועוד)

כל הפלאגינים בקבוצה זו מותקנים תחת scope=user. מקור המונים:
`sap-brain-facts.md` שורות 4–54 (רשימת פלאגינים) ו‑88–134 (מוני רכיבים).

### 1.1 marketplace `sap-skills` (מקור: /Users/salihalif/Downloads/sap-skills)

| שם המיומנות (Skill trigger) | Plugin@marketplace | גרסה | תיאור קצר | תחום SAP | ECC/S4 | קריאה‑בלבד? |
|---|---|---|---|---|---|---|
| `sap-abap:sap-abap` (+ `sap-abap:abap-cloud-review`) | sap-abap@sap-skills | v2.4.0 | פיתוח וסקירת קוד ABAP; כולל cmd אחד לסקירת ABAP Cloud. | ABAP | ECC + S/4 + Cloud | No |
| `sap-abap-cds:sap-abap-cds` | sap-abap-cds@sap-skills | v2.2.2 | פיתוח וסקירת CDS View Entities ואנוטציות. | CDS / Data Modeling | S/4 + Cloud | No |
| `sap-fiori-tools:sap-fiori-tools` | sap-fiori-tools@sap-skills | v2.2.0 | בנייה ושינוי אפליקציות Fiori; משויך ל‑MCP `fiori-tools`. | Fiori / UI | S/4 | No |
| `sapui5:ui5-*` (ui5-api, ui5-lint, ui5-scaffold, ui5-version, ui5-mcp-tools) | sapui5@sap-skills | v2.2.0 | פיתוח SAPUI5: API ref, לינטינג, scaffold, גרסאות; משויך ל‑MCP `ui5-tooling`. | SAPUI5 / UI | S/4 + Cloud | No |
| `sapui5-cli:sapui5-cli` | sapui5-cli@sap-skills | v2.2.0 | כלי שורת פקודה של UI5. | SAPUI5 / UI | S/4 + Cloud | No |
| `sapui5-linter:sapui5-linter` | sapui5-linter@sap-skills | v2.2.0 | לינטר UI5 לבדיקת איכות קוד UI. | SAPUI5 / UI | S/4 + Cloud | Yes |
| `sap-sqlscript:sap-sqlscript` (+ validate/convert/optimize/setup) | sap-sqlscript@sap-skills | v2.2.2 | כתיבה, ולידציה, המרה ואופטימיזציה של SQLScript ל‑HANA. | HANA / SQLScript | S/4 (HANA) | No |
| `sap-api-style:sap-api-style` | sap-api-style@sap-skills | v2.2.2 | סקירת סגנון/עיצוב של APIs לפי כללי SAP. | API / Integration | S/4 + BTP | Yes |
| `sap-api-policy:sap-api-policy` | sap-api-policy@sap-skills | v2.4.0 | בדיקת מדיניות API. | API / Integration | S/4 + BTP | Yes |
| `sap-dependency-security:sap-dependency-security` (+ `sap-dependency-upgrade-plan`) | sap-dependency-security@sap-skills | v2.4.0 | ניתוח אבטחת תלויות ותכנון שדרוג; כולל hook. | Security / Dependencies | BTP + S/4 | Yes |
| `sap-btp-connectivity:sap-btp-connectivity` | sap-btp-connectivity@sap-skills | v2.2.2 | הגדרות Connectivity ב‑BTP. | BTP | BTP | No |
| `sap-btp-master-data-integration:sap-btp-master-data-integration` (+ `mdi-replication-check`) | sap-btp-master-data-integration@sap-skills | v2.4.0 | אינטגרציית נתוני‑אב (MDI) ובדיקת רפליקציה. | BTP / MDI | BTP | No |
| `sap-btp-service-manager:sap-btp-service-manager` | sap-btp-service-manager@sap-skills | v2.2.2 | ניהול שירותי BTP (Service Manager). | BTP | BTP | No |
| `sap-btp-cias:sap-btp-cias` | sap-btp-cias@sap-skills | v2.2.0 | BTP CIAS. | BTP | BTP | No |
| `sap-btp-cloud-logging:sap-btp-cloud-logging` | sap-btp-cloud-logging@sap-skills | v2.2.0 | Cloud Logging ב‑BTP. | BTP | BTP | No |
| `sap-btp-cloud-platform` | sap-btp-cloud-platform@sap-skills | v2.2.2 | פלטפורמת ענן BTP (skill יחיד). | BTP | BTP | No |
| `sap-btp-cloud-transport-management:sap-btp-cloud-transport-management` | sap-btp-cloud-transport-management@sap-skills | v2.2.0 | Cloud Transport Management ב‑BTP. | BTP / Transport | BTP | No |
| `sap-btp-developer-guide:sap-btp-developer-guide` | sap-btp-developer-guide@sap-skills | v2.2.0 | מדריך מפתח BTP. | BTP | BTP | Yes |
| `sap-btp-integration-suite` | sap-btp-integration-suite@sap-skills | v2.2.0 | Integration Suite ב‑BTP (skill יחיד). | BTP / Integration | BTP | No |

הערות: כל הרשומות בסעיף זה **מותקנות ופעילות** כ‑Skills. `sap-fiori-tools`
ו‑`sapui5` תלויים גם ב‑MCP; שני ה‑MCP האלה **מחוברים** (Connected) לפי שורות
81–82. מקור מונים: שורות 25–43, 107–125.

### 1.2 marketplace `sc4sap` (SuperClaude for SAP)

| רכיב | Plugin@marketplace | גרסה | תיאור | סטטוס |
|---|---|---|---|---|
| חבילת sc4sap (16 skills, 28 agents, 1 MCP, 1 hook) | sc4sap@sc4sap | v0.6.14 | חבילת ייעוץ SAP רחבה: 26 agents פונקציונליים/טכניים (ראה למטה) ו‑16 skills תהליכיים. | **מותקן**; ה‑MCP `sap` **נכשל/מנותק** |

**skills פעילים ב‑sc4sap** (מאומתים, שורות בקובץ facts + סריקת מטמון):
`sc4sap:analyze-cbo-obj`, `analyze-code`, `analyze-symptom`, `ask-consultant`,
`compare-programs`, `create-object`, `create-program`, `deep-interview`,
`mcp-setup`, `program-to-spec`, `release`, `sap-doctor`, `sap-option`, `setup`,
`team`, `trust-session`.

**Agents ב‑sc4sap** (26 קבצי .md ברמה עליונה, מקור שורה 137): sap-analyst,
sap-architect, sap-ariba-consultant, sap-bc-consultant, sap-bw-consultant,
sap-co-consultant, sap-code-reviewer, sap-critic, sap-debugger,
sap-doc-specialist, sap-executor, sap-fi-consultant, sap-hcm-consultant,
sap-mm-consultant, sap-planner, sap-pm-consultant, sap-pp-consultant,
sap-ps-consultant, sap-qa-tester, sap-qm-consultant, sap-sd-consultant,
sap-stocker, sap-tm-consultant, sap-tr-consultant, sap-wm-consultant,
sap-writer.

- **תחום SAP:** רב‑מודולי (PP/PM/MM/SD/FI/CO/QM/PS/TM/WM/HCM/BW/BC + ABAP).
- **ECC/S4:** שני היעדים.
- **קריאה‑בלבד?** מעורב: `analyze-*`/`compare-programs`/`program-to-spec` = Yes;
  `create-*`/`release` = No.
- **המלצה קריטית:** ה‑skills המסתמכים על ה‑MCP `sap` (למשל `sap-doctor`,
  `analyze-symptom` בזמן‑אמת מול מערכת חיה) **לא יפעלו מקצה‑לקצה** עד תיקון
  החיבור. ראה `sc4sap:mcp-setup` להגדרה. אין להציג את sc4sap כמחובר.

### 1.3 פלאגינים כלליים עם רלוונטיות SAP חלקית

| רכיב | Plugin@marketplace | גרסה | הערה |
|---|---|---|---|
| `figma:*` | figma@claude-plugins-official | v2.2.81 | לא‑SAP במהותו; רלוונטי לעיצוב Fiori/UI. MCP `figma` **מחובר**. |
| `vercel:*` | vercel@claude-plugins-official | v0.44.0 | לא‑SAP; פריסה. MCP `vercel` **דורש‑אימות**. |

---

## 2) מיומנויות SAP מותאמות‑אישית (~/.claude/skills)

מקור: `sap-brain-facts.md` שורה 139 + קריאת כותרות ה‑SKILL.md.
כולן **מותקנות ופעילות** כ‑Skills מקומיים (אין תלות ב‑MCP שנכשל).

| שם (trigger) | תיאור | תחום SAP | ECC/S4 | קלט | פלט | קריאה‑בלבד? |
|---|---|---|---|---|---|---|
| `sap-abap-ecc-s4-expert` | מומחה ABAP מודע‑פלטפורמה שמחליט היכן פתרון שייך: ECC 6 (NW 7.0x–7.5x) / S/4 On‑Prem / ABAP Cloud, ומנתב לחומר עומק (Clean Core, RAP, CDS, released APIs). | ABAP | ECC + S/4 + Cloud | שאלת ABAP/דרישה | החלטת פלטפורמה + פתרון קוד/הכוונה | No |
| `sap-ecc-troubleshooter` | יועץ troubleshooting בכיר ל‑ECC6: מבנה תשובה קנוני (19 בלוקים), החזרת שערת שורש, T‑codes, טבלאות, FMs, נתיב debug, תיקון, תרחיש בדיקה. | Troubleshooting / PP/PP‑PI/PM/CS/IDOC/PI | ECC (S/4 delta מסומן) | תיאור תקלה/הודעה | RCA + צעדי תיקון | Yes (מייעץ) |
| `sap-incident-commander` | Orchestrator ברירת‑מחדל לכל תקלת ECC6/S/4: workflow 6 שלבים, Gate 0 לסיווג ממשק, איסוף ראיות, שיגור מומחים, RCA מאוחד יחיד, לכידת ידע. הסמכות היחידה שמסיקה מסקנה. | Incident / RCA / Interfaces | ECC + S/4 | תקלה/ארטיפקט | RCA מאוחד + לכידת ידע | Yes (מייעץ) |
| `sap-forecaster` | (שם פנימי ב‑SKILL.md: `sap-rpt1-oss-predictor`) שימוש במודל היסוד הטבלאי הפתוח SAP‑RPT‑1‑OSS לחיזוי/סיווג/רגרסיה על נתוני SAP (churn, עיכובי אספקה, סיכון תשלום, ביקוש). רץ מקומית דרך Hugging Face. | Analytics / Prediction | אגנוסטי (ייצוא טבלאי) | CSV/DataFrame | חיזוי/סיווג | No (מריץ מודל) |
| `sap-function-finder` | מציאת/הסבר FMs, BAPIs, BAdIs, מחלקות, exits, APIs לפי כוונה עסקית/טכנית; אסטרטגיית חיפוש SE37/SE80/SE84. עברית כברירת מחדל. | Functions / APIs | ECC first, S/4 delta | כוונה עסקית/טכנית | רשימת FM/BAPI + הסבר | Yes |
| `sap-knowledge-builder` | ממיר PDF/DOCX/PPTX לחבילת ידע SAP מובנית (specs, runbooks, lessons, patterns, glossary, incidents, תרגום עברית) תחת `knowledge/`. Orchestrator דק מעל sap-document-intelligence. | Knowledge / Docs | אגנוסטי | מסמך | חבילת ידע על דיסק | No (כותב) |
| `sap-document-intelligence` | ניתוח מסמכי SAP גדולים (PDF/DOCX/PPTX), כולל 1000+ עמודים ו‑OCR; חילוץ ידע, תרגום לעברית (שומר קודי SAP), בניית runbooks/specs. | Knowledge / Docs | אגנוסטי | מסמך גדול/סרוק | חבילת ידע מובנית | No (כותב) |
| `sap-israel-knowledge` | מאגר best practices מקומי לישראל (`israel_best_practices.md`). **אין SKILL.md ברמה עליונה** — נכס תוכן/הפניה, לא skill בר‑הפעלה עצמאית. | Localization / IL | ECC + S/4 | — | חומר הפניה | Yes |
| `abap-migration` | **מכולה** (אין SKILL.md עליון). מכילה 18 תת‑skills: abap, abap-cloud, abap-cloud-migration, abap-sql-amdp, abap-unit-testing, abapgit, atc-cloudification, authorization-iam, badi-enhancement, btp-abap-environment, btp-diagram-generator, cds-view-entities, clean-abap, odata, rap, rap-business-events, released-abap-classes, sap-fiori-apps-reference (שם פנימי: `sap-fiori-url-generator`). | ABAP / Cloud Migration | S/4 + Cloud | קוד/דרישת migration | הכוונת migration/קוד | No |

הערות אימות:
- `sap-forecaster` — שם התיקייה שונה מהשם הפנימי ב‑SKILL.md (`sap-rpt1-oss-predictor`). מסומן במפורש.
- `sap-israel-knowledge` ו‑`abap-migration` — אין SKILL.md ברמה עליונה; המבנה אומת בסריקת תיקיות. אינם מיומנויות‑הפעלה קלאסיות אלא מכולה/נכס.

---

## 3) מיומנויות פרויקט (sap/.claude/skills — Project NEO)

מקור: `sap-brain-facts.md` שורה 141 + קריאת כותרות. **מותקנות ופעילות** בפרויקט.

| שם | תיאור | תחום SAP | קלט | פלט | קריאה‑בלבד? |
|---|---|---|---|---|---|
| `sap-knowledge-architect` | סקירת מבנה ותקינות גרף מאגר הידע של NEO: כפילויות בין PM/PP/PP‑PI, relations יתומים/חד‑כיווניים, cross‑links חסרים, הפרדת ECC↔S/4 מבנית, אחידות breadcrumb/sidebar/portal. | Knowledge Graph / QA | מאגר NEO | דו"ח תקינות מבנה | Yes |
| `neo-sap-content-quality-reviewer` | QA לתוכן מאמרי SAP ב‑NEO: אימות שכל עובדה נגזרת מה‑dataset (ללא המצאה), הפרדת ECC מ‑S/4, עקביות טרמינולוגיה, סגנון עברית. | Content QA | מאמר/סעיף | דו"ח איכות תוכן | Yes |
| `neo-sap-visual-designer` | סקירת עיצוב/UI ב‑NEO: אכיפת Design System v2 tokens, אייקוני lucide בלבד, brand‑red כאקסנט, עקביות בין רכיבים. | Visual / UI QA | קומפוננט/עמוד | דו"ח עיצוב | Yes |

הערה: תיקיית project skills מכילה גם reviewers כלליים (neo-accessibility-reviewer,
enterprise-ux-reviewer וכו') וכלי תוכן — אך אלה אינם מיומנויות SAP במהותן ולכן
אינם בקטלוג זה. `NEO-REVIEWERS.md` הוא מסמך תיעוד, לא skill.

---

## 4) מיומנויות דגל HQ (Flagship — ~/.claude/skills/{hq,sherlock,oracle,memory})

מקור: `sap-brain-facts.md` שורות 144–172 + קריאת כותרות. **מותקנות ופעילות**.
כולן **Orchestrator‑only** — אינן פותרות בעצמן אלא מסווגות ומנתבות.

| שם | תיאור | תפקיד | קלט | פלט | קריאה‑בלבד? |
|---|---|---|---|---|---|
| `hq` | SAP Headquarters — נקודת כניסה יחידה למערכת SAP. מסווג בקשה, מריץ health check, מנתב ל‑Sherlock/Oracle/Memory, מחזיר HQ Summary אחד. גם פקודה גלובלית `hq.md` (שורה 143). | Orchestrator ראשי | כל בקשת SAP | HQ Summary + ניתוב | Yes |
| `sherlock` | ראש חקירת תקלות SAP (orchestration בלבד): מסווג ומנתב ל‑skills/agents/MCP קיימים לחקירת תקלה/dump/queue/IDoc/ממשק. | חקירה (Investigation) | ארטיפקט תקלה | סיווג + ניתוב לחקירה | Yes |
| `oracle` | מוח הידע של SAP (orchestration בלבד): מציאה/השוואה/הסבר של SAP Notes, KBAs, Help Portal, Release Notes, Best Practices, Simplification Items, Migration Guides. | ידע (Research) | שאלת ידע | ניתוב למקורות ידע | Yes |
| `memory` | בסיס הידע הארגוני (orchestration בלבד): "כבר פתרנו את זה?", היזכרות בפרויקטים/לקחים/runbooks/SAP Notes שמורים; מחפש בזיכרון המקומי. | היסטוריה (History) | שאלת היזכרות | ממצאים מהזיכרון | Yes |

תשתית תומכת (מאומתת, לא skills בר‑הפעלה): `flagship/` מכיל ARCHITECTURE.md,
CAPABILITY-REGISTRY.md, HEALTH-FALLBACK.md, healthcheck.sh. חבילות מומחה
(Expert Packs) = **20** (שורה 174): PP, PM, MM, SD, FI, CO, QM, ABAP,
Authorization, IDOC, Gateway, OData, Fiori, Workflow, Performance, Basis,
PI/PO, BTP, ECC ועוד.

---

## 5) כפילויות וחפיפות (Duplicates & Overlaps)

| נושא | רכיבים חופפים | הבחנה / המלצה |
|---|---|---|
| ABAP כללי | `sap-abap-ecc-s4-expert` (custom) ↔ `sap-abap@sap-skills` (plugin) ↔ `abap-migration/abap`+`clean-abap` (custom) ↔ `sc4sap:analyze-code`/`sap-code-reviewer` | ה‑custom `sap-abap-ecc-s4-expert` הוא ה‑orchestrator להחלטת פלטפורמה; ה‑plugin `sap-abap` לכתיבה/לינט; `abap-migration` להגירה ל‑Cloud. **המלצה:** התחל מ‑`sap-abap-ecc-s4-expert` והוא ינתב. |
| CDS | `sap-abap-cds@sap-skills` ↔ `abap-migration/cds-view-entities` | חפיפה מלאה כמעט. **המלצה:** ה‑plugin החדש יותר (v2.2.2) כברירת מחדל; `abap-migration/cds-view-entities` כחומר עומק. |
| OData / RAP / BAdI / Auth | `abap-migration/{odata,rap,badi-enhancement,authorization-iam}` ↔ `sap-abap@sap-skills` | חפיפה. **המלצה:** `abap-migration` לנושאי Clean Core/Cloud; `sap-abap` לפיתוח כללי. |
| Troubleshooting / RCA | `sap-incident-commander` ↔ `sap-ecc-troubleshooter` ↔ `sherlock`/`hq` ↔ `sc4sap:sap-doctor`/`analyze-symptom` | **היררכיה:** `hq` הוא הכניסה → מנתב ל‑`sherlock` → שמנתב ל‑`sap-incident-commander` (ה‑orchestrator שמסיק) → שמשתמש ב‑`sap-ecc-troubleshooter` לתוכן. **אין להריץ במקביל.** sc4sap דורש MCP מחובר (כרגע נכשל). |
| Fiori / UI | `sap-fiori-tools@sap-skills` ↔ `abap-migration/sap-fiori-apps-reference` ↔ `sapui5*` | `sap-fiori-tools` לבנייה (עם MCP מחובר); `sap-fiori-apps-reference` לייצור URL בלבד; `sapui5*` לשכבת UI5. |
| ניתוח מסמכים / ידע | `sap-knowledge-builder` ↔ `sap-document-intelligence` | `knowledge-builder` הוא orchestrator דק מעל `document-intelligence`. **המלצה:** התחל מ‑`sap-knowledge-builder`. |
| BTP | ריבוי פלאגיני `sap-btp-*` (10+) | כל אחד תחום‑משנה נפרד (Connectivity/MDI/Logging/Transport/Service Manager/CIAS/Integration Suite וכו'). אין חפיפה אמיתית — בחר לפי תת‑התחום. |

---

## 6) המלצות מפתח (Key Recommendations)

1. **תקן את חיבור `plugin:sc4sap:sap`** (Failed/Disconnected). עד אז, כל
   skill/agent של sc4sap שדורש מערכת חיה (sap-doctor, analyze-symptom בזמן‑אמת)
   אינו פעיל מקצה‑לקצה. הרץ `sc4sap:mcp-setup` (אין לבצע כאן — קריאה בלבד).
2. **נקודת כניסה יחידה:** לכל בקשת SAP התחל מ‑`hq`. הוא מבצע health check
   ומנתב ל‑Sherlock/Oracle/Memory, כך שאין צורך לזכור איזה רכיב להריץ.
3. **הבחנה ECC↔S/4:** `sap-ecc-troubleshooter` ו‑`sap-function-finder`
   הן ECC‑first עם סימון delta ל‑S/4; `sap-abap-ecc-s4-expert` מכריע פלטפורמה.
4. **המצאה אסורה:** `neo-sap-content-quality-reviewer` אוכף שכל עובדה נגזרת
   מה‑dataset — הפעל אותו על כל תוכן SAP חדש בפרויקט NEO לפני מיזוג.
5. **MCP מחוברים ובטוחים לשימוש:** `sap-fiori-tools:fiori-tools` ו‑
   `sapui5:ui5-tooling` — Connected. `vercel` — דורש‑אימות. `sc4sap:sap` — נכשל.

---

## נספח: מקורות אימות

- תמונת מצב מאומתת: `/tmp/sap-brain-facts.md` (2026‑07‑23) — פלאגינים (4–54),
  MCP live (71–86), מוני רכיבים (88–134), sc4sap agents (137), custom skills
  (139), project skills (141), commands (143), HQ files (144–172), expert
  packs (174), healthcheck (189–192).
- קריאת כותרות SKILL.md (read‑only) עבור: HQ/Sherlock/Oracle/Memory,
  sap-abap-ecc-s4-expert, sap-ecc-troubleshooter, sap-incident-commander,
  sap-forecaster, sap-function-finder, sap-knowledge-builder,
  sap-document-intelligence, project NEO SAP reviewers, ו‑18 תת‑skills של
  abap-migration.
- ערכים שלא ניתן היה לאמת סומנו במפורש. לא נוספו רכיבים, גרסאות או SAP Notes
  שאינם בתמונת המצב.

*נוצר עבור מערכת ה‑SAP AI של סאלי חליף — פרויקט NEO Cockpit (CBC Israel).*
