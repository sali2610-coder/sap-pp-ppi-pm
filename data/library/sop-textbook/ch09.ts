// ===== S&OP with SAP IBP Digital Textbook — Chapter 9 =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Topic: Process Management in SAP IBP — orchestrating the monthly S&OP cycle.
// Hierarchy preserved exactly; SAP objects kept verbatim English. IBP cloud.
import type { TextbookChapter } from "./types";

export const CH9: TextbookChapter = {
  n: 9,
  titleHe: "ניהול תהליך (Process Management)",
  titleEn: "Process Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לרכיב Process Management ב-SAP IBP — המנוע שמתזמן, מתעד ומנהל את מחזור ה-S&OP החודשי מקצה-לקצה. בעוד שמודלי-התכנון, ה-key figures וה-planning views מספקים את ה'תוכן', Process Management מספק את ה'ניצוח': מי עושה מה, מתי, באיזה סדר, ובאילו תלויות. כל תת-פרק וכל תת-סעיף מהמקור הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון (מחזור S&OP חודשי של מבקבק Example Product), עצי-ניווט באפליקציות ה-Fiori של IBP, פרטי הגדרה, תרשים-זרימה של המחזור החודשי, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בניהול-תהליך ב-IBP בלי הספר המקורי. אובייקטי SAP (Process Management, process template, application jobs, Gantt, Manage Processes, APIs/OData) נשמרים באנגלית מקורית.",
  subchapters: [
    // ============================================================ 9.1
    {
      id: "9.1",
      titleHe: "ניהול תהליך הלכה למעשה",
      titleEn: "Process Management in Practice",
      execHe:
        "Process Management הוא הרכיב ב-SAP IBP שהופך את מחזור ה-S&OP מסדרת-משימות מפוזרת לתהליך עסקי מנוהל, חוזר וניתן-למדידה. במקום שמתכנן 'יזכור' לרענן תחזית או ש-Demand Planner 'ינחש' מתי ה-Supply Review הסתיים, התהליך מוגדר פעם אחת כ-process template, מורץ מדי חודש, ומספק שקיפות מלאה: היכן אנחנו במחזור, מי מעכב, ומה הצעד הבא. עבור הנהלה זהו הבדל בין S&OP 'באמונה' ל-S&OP נמדד.",
      beginnerHe:
        "דמיין רשימת-מטלות חכמה למחזור החודשי של התכנון. במקום פתק על המקרר, IBP מחזיק 'תהליך' שיודע מה הצעד הראשון (איסוף ביקוש), מי אחראי עליו, מתי הוא אמור להסתיים, ומה קורה אחריו (סקירת-היצע). כל אחד רואה את אותו לוח, מסמן 'סיימתי', והתהליך מתקדם לבד לצעד הבא. זה בדיוק מה ש-Process Management עושה: מנהל את 'הריקוד' החודשי של כל המעורבים.",
      consultantHe:
        "Process Management ב-IBP בנוי משכבתיים: (1) שכבת-תבנית — ה-process template, שמוגדרת פעם אחת ומכילה steps, sub-steps, tasks, roles, durations ו-automations; (2) שכבת-מופע — process instances שנוצרות מהתבנית מדי מחזור דרך Manage Processes. הרכיב משולב עם application jobs (לאוטומציה של copy/snapshot/forecast), עם תפקידי-המשתמש (assignments), עם SAP IBP Add-In for Microsoft Excel (השלמת-tasks), ועם SAP Build Work Zone (חוויית-משתמש מאוחדת). חשוב להבחין: Process Management אינו workflow-engine כללי — הוא תפור ל-rhythm של תכנון מחזורי (S&OP/IBP for S&OP), עם תמיכה ב-sequential ו-parallel branches ובתצוגת Gantt.",
      purposeHe:
        "המטרה העסקית: לתת ל-S&OP ממשל (governance) — סטנדרטיזציה של המחזור, אחריותיות (accountability) ברורה לכל צעד, מדידת cycle-time ו-bottlenecks, וצמצום התלות בידע-שבטי. תהליך מוגדר היטב מאפשר לקצר את מחזור ה-S&OP, לזהות עיכובים בזמן-אמת, ולספק audit-trail לכל מי-עשה-מה-ומתי.",
      processExampleHe:
        "בארגון תעשייתי: מחזור S&OP חודשי מוגדר כ-process template עם חמישה שלבים — Data Gathering, Demand Review, Supply Review, Pre-S&OP, Executive S&OP. כל שלב מכיל tasks המשויכים ל-roles. ב-1 לחודש נוצר process instance; application job מעדכן אוטומטית את ה-actuals; ה-Demand Planner מקבל task, משלים אותו, והתהליך פותח אוטומטית את Supply Review. בסוף החודש ההנהלה רואה ב-dashboard ש-95% מה-steps הושלמו בזמן.",
      scenarioHe:
        "בארגון (מבקבק Example Product): מחזור ה-S&OP החודשי מנוהל כ-process template יחיד המשרת את כל ה-SKU-portfolio (פחיות, בקבוקים, חביות). השלב הראשון אוסף sell-out מהקמעונאים, השני מאחד תחזית-ביקוש לעונת-הקיץ, השלישי בודק קיבולת קווי-מילוי ותרכיז, והאחרון מאשר את התוכנית בישיבת-הנהלה. Process Management מבטיח שכל מדינת-בקבוק (bottling territory) משלימה את חלקה לפני שלב-האיחוד.",
      navHe: [
        "SAP Fiori Launchpad ► Process Management group ► Manage Processes",
        "SAP Fiori Launchpad ► Process Management group ► Process Templates",
        "SAP Fiori Launchpad ► Application Jobs ► Application Jobs (תזמון אוטומציות לשלבי-התהליך)",
      ],
      tables: [],
      tcodes: ["Manage Processes", "Process Templates", "My Process Steps"],
      fiori: ["Manage Processes", "Process Templates", "Application Jobs"],
      configHe: [
        "Process Management מופעל דרך הקצאת ה-business catalogs/roles המתאימים למשתמשים (PlanningArea-aware).",
        "התבנית (process template) היא נכס-ההגדרה המרכזי; המופעים (instances) נגזרים ממנה דרך Manage Processes.",
        "אוטומציות מחוברות דרך application jobs מסוג Process Step.",
      ],
      flow: [
        { he: "הגדרת process template חד-פעמית", code: "Process Templates", note: "steps + roles + durations" },
        { he: "יצירת מופע חודשי", code: "Manage Processes", note: "instance מהתבנית" },
        { he: "הרצת המחזור", note: "tasks + automations + Gantt" },
        { he: "ניטור ומדידה", note: "dashboards + cycle-time" },
      ],
      mistakesHe: [
        "שימוש ב-Process Management כ-workflow כללי לכל דבר — הוא תפור ל-rhythm מחזורי של תכנון, לא לתהליכים תפעוליים אד-הוק.",
        "בניית מופע ידני בכל חודש מאפס במקום לגזור מ-process template — אובדן סטנדרטיזציה.",
        "הגדרת steps ללא roles — אין למי להקצות tasks, התהליך 'נתקע'.",
      ],
      troubleshootHe: [
        "המחזור לא מתקדם ➔ בדוק שכל ה-tasks בשלב הנוכחי הושלמו ושה-dependencies מוגדרים נכון.",
        "משתמש לא רואה את ה-tasks שלו ➔ חסרה הקצאת-role או business catalog.",
        "אוטומציה לא רצה ➔ ה-application job לא קושר ל-process step או נכשל.",
      ],
      bestPracticeHe: [
        "התחל מ-process template אחד מייצג, הרץ כמה מחזורים, ורק אז שכלל.",
        "מדוד cycle-time מהמחזור הראשון — זהו ה-baseline לשיפור.",
        "תעד את משמעות כל step ו-role לארגון לפני ה-go-live.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין process template ל-process instance?", aHe: "Template = ההגדרה החד-פעמית (steps/roles/durations/automations); instance = המופע החודשי שנגזר ממנה ומורץ בפועל דרך Manage Processes." },
        { qHe: "מדוע Process Management ב-IBP אינו workflow-engine כללי?", aHe: "הוא תפור ל-rhythm של תכנון מחזורי (S&OP) — עם תמיכה ב-sequential/parallel steps, Gantt, ו-application jobs — ולא לתהליכים תפעוליים אד-הוק." },
      ],
      takeawaysHe: [
        "Process Management הופך את מחזור ה-S&OP מאוסף-מטלות לתהליך מנוהל ונמדד.",
        "שתי שכבות: template (הגדרה) ו-instance (הרצה חודשית).",
        "משולב עם application jobs, Excel Add-In, ו-SAP Build Work Zone.",
      ],
      relatedHe: [
        { labelHe: "S&OP · יישומי Excel Add-In", href: "/library/sop/chapter-09/#sub-9.4.2" },
        { labelHe: "S&OP · APIs לניהול-תהליך", href: "/library/sop/chapter-09/#sub-9.6" },
      ],
    },
    // ============================================================ 9.2
    {
      id: "9.2",
      titleHe: "הקמת process templates ואוטומציות",
      titleEn: "Setting Up Process Templates and Automations",
      execHe:
        "ה-process template הוא לב-ליבו של Process Management: הגדרה חד-פעמית של מבנה המחזור — שלבים, sub-steps, tasks, roles, משכים (durations), אזורי-זמן ואוטומציות — שממנה נגזר כל מופע חודשי. השקעה נכונה בתבנית מתורגמת ישירות לחיסכון-זמן ולעקביות בכל מחזור עתידי.",
      beginnerHe:
        "התבנית היא 'התבנית-אפייה' של המחזור: מגדירים אותה פעם אחת, ומכל הרצה יוצא אותו 'עוגה' מובנה. בתוכה קובעים אילו צעדים יש, מי אחראי על כל צעד, כמה זמן הוא אמור לקחת, ואיזה צעדים המחשב יעשה לבד (אוטומציות). אחרי שהתבנית מוכנה, כל חודש פשוט 'מפעילים' אותה.",
      consultantHe:
        "ה-process template מורכב מ-hierarchy: process ► steps ► sub-steps ► tasks. כל רמה נושאת מאפיינים: roles (מי), duration + time zone + workday calendar (מתי), task assignments (מה בדיוק), ו-automation (האם application job/IBP-action מורצים אוטומטית). ה-template תומך ב-sequential dependencies (step B מתחיל אחרי A) וב-parallel branches (כמה steps במקביל), והכול ניתן-לתצוגה ב-Gantt. שינוי בתבנית משפיע על מופעים עתידיים בלבד, לא על מופעים פעילים.",
      purposeHe:
        "המטרה: לקודד את מחזור ה-S&OP פעם אחת בצורה שניתנת-לחזרה, למדידה ולשיפור. תבנית טובה מבטיחה שכל מחזור רץ באותו סדר, עם אותן אחריותיות, ועם אותן אוטומציות — מבטלת שונות ומאיצה את המחזור.",
      processExampleHe:
        "צוות-תכנון מגדיר process template ל-S&OP חודשי: Step 1 Data Load (אוטומציה — application job של copy operator), Step 2 Demand Review (roles: Demand Planner; duration 3 ימי-עבודה), Step 3 Supply Review (role: Supply Planner; תלוי ב-Step 2), Step 4 Reconciliation (parallel: Finance + Sales), Step 5 Executive Sign-off. התבנית נשמרת ומשמשת כל חודש.",
      scenarioHe:
        "בארגון נבנית תבנית-S&OP אחת: Step 1 טוען sell-out ו-actuals אוטומטית (application job), Step 2 איחוד תחזית-ביקוש לפי territory (roles לכל מנהל-אזור, duration לפי workday calendar מקומי), Step 3 בדיקת קיבולת מילוי ותרכיז, Step 4 גישור Finance/Commercial במקביל, Step 5 אישור VP Supply Chain.",
      navHe: [
        "SAP Fiori Launchpad ► Process Management ► Process Templates ► Create/Edit Template",
        "בתוך התבנית ► Steps ► Add Step ► (Roles / Duration / Tasks / Automation)",
        "Template ► Gantt View (תצוגת sequential + parallel)",
      ],
      tables: [],
      tcodes: ["Process Templates", "Manage Processes"],
      fiori: ["Process Templates"],
      configHe: [
        "הגדרת process ► steps ► sub-steps ► tasks בהיררכיה.",
        "לכל step: roles, duration, time zone, workday calendar, task assignments ו-automation (application job).",
        "הגדרת dependencies בין steps (sequential) או הצבתם במקביל (parallel).",
        "תצוגת Gantt לוויזואליזציה ולעריכת תלויות.",
      ],
      flow: [
        { he: "יצירת template", code: "Process Templates" },
        { he: "הוספת steps + roles", note: "מי אחראי" },
        { he: "duration + time zone + workday", note: "מתי" },
        { he: "task assignments + automation", note: "מה + אוטומציה" },
        { he: "dependencies / parallel", note: "Gantt" },
      ],
      mistakesHe: [
        "תבנית מורכבת-מדי מההתחלה — קשה לתחזק ולשנות; עדיף להתחיל פשוט.",
        "עריכת תבנית מתוך ציפייה שתשפיע על מופע פעיל — היא משפיעה רק על מופעים עתידיים.",
        "הגדרת duration ללא workday calendar — תאריכי-יעד נופלים על סופי-שבוע/חגים.",
      ],
      troubleshootHe: [
        "תאריך-יעד של step שגוי ➔ בדוק time zone ו-workday calendar של ה-step.",
        "שינוי בתבנית לא נראה במחזור הנוכחי ➔ צפוי; הוא יחול במופע הבא בלבד.",
        "step לא ניתן-להקצאה ➔ חסר role בהגדרת ה-step.",
      ],
      bestPracticeHe: [
        "בנה תבנית מודולרית: steps ברורים עם אחריות יחידה לכל אחד.",
        "השתמש בתצוגת Gantt לאמת שהתלויות וה-parallelism הגיוניים.",
        "נהל גרסאות-תבנית: שכלל בין-מחזורים, לא תוך-כדי מחזור פעיל.",
      ],
      interviewHe: [
        { qHe: "מהי ההיררכיה בתוך process template?", aHe: "process ► steps ► sub-steps ► tasks; כל רמה נושאת roles, durations ו-automations." },
        { qHe: "האם עריכת template משפיעה על מופע פעיל?", aHe: "לא — שינויי-תבנית חלים על מופעים עתידיים בלבד; מופעים פעילים נשארים כפי שנוצרו." },
      ],
      takeawaysHe: [
        "התבנית מקודדת את המחזור פעם אחת: steps + roles + durations + automations.",
        "תומכת ב-sequential ו-parallel, ניתנת-לתצוגה ב-Gantt.",
        "שינויי-תבנית חלים על מופעים עתידיים בלבד.",
      ],
      children: [
        // -------------------- 9.2.1
        {
          id: "9.2.1",
          titleHe: "תפקידי תהליך (Process Roles)",
          titleEn: "Process Roles",
          execHe:
            "Process Roles מגדירים 'מי' אחראי על כל צעד במחזור — הם משייכים tasks למשתמשים או לקבוצות בלי לקודד שמות ספציפיים בתבנית. כך אותה תבנית משרתת אזורים, צוותים ואנשים שונים, וה-accountability ברורה לכל אורך המחזור.",
          beginnerHe:
            "Role הוא 'כובע' ולא 'אדם'. בתבנית כותבים 'מי שלובש את כובע ה-Demand Planner אחראי על צעד זה', ובהרצה בפועל קושרים את הכובע לאדם אמיתי. כך אם מתחלף עובד, מחליפים רק את הקישור — לא את התבנית.",
          consultantHe:
            "ב-IBP, process roles הם abstraction בין ה-step למשתמש. בתבנית משייכים role ל-step/task; ב-process instance (או דרך ה-assignment) קושרים את ה-role למשתמשים קונקרטיים. זה מאפשר reuse של אותה תבנית בין צוותים, ושינוי-אחריות בלי-נגיעה-בתבנית. ה-role הוא מושג ניהול-התהליך — להבדיל מ-business roles/catalogs של ה-authorization. מומלץ ליישר בין השניים אך הם אינם זהים.",
          purposeHe:
            "להפריד את 'מה צריך לקרות' (התבנית) מ-'מי יעשה זאת' (ההקצאה), כדי לאפשר reuse, גמישות-כוח-אדם, ו-accountability ברורה.",
          processExampleHe:
            "תבנית מגדירה role 'Demand Reviewer' ל-Step 2. בכל מחזור, ה-coordinator קושר את ה-role לשלושת ה-planners של אותו חודש. אם אחד יוצא לחופשה, מחליפים רק את הקישור ל-role, וה-task עובר לעמית — בלי לגעת בתבנית.",
          scenarioHe:
            "בארגון כל territory מקבל role משלו (Demand Reviewer – North, – South…); אותה תבנית-S&OP משרתת את כל המדינות, כשכל role מקושר למנהל-האזור המקומי. החלפת מנהל = שינוי קישור-role בלבד.",
          navHe: [
            "Process Templates ► Step ► Roles ► Assign Process Role",
            "Manage Processes ► Process ► Assignments ► Map Role to Users",
          ],
          tables: [],
          tcodes: ["Process Templates", "Manage Processes"],
          fiori: ["Process Templates", "Manage Processes"],
          configHe: [
            "הגדר process roles והקצה אותם ל-steps/tasks בתבנית.",
            "ב-instance/assignment — קשר כל role למשתמש או לקבוצת-משתמשים.",
            "יישר בין process roles ל-business roles/catalogs של ה-authorization (לא זהים אך משלימים).",
          ],
          mistakesHe: [
            "קידוד שם-משתמש בתבנית במקום role — שובר reuse בכל החלפת-עובד.",
            "בלבול בין process role (ניהול-תהליך) ל-business role (authorization).",
          ],
          troubleshootHe: [
            "task לא מגיע לאף-אחד ➔ ה-role לא קושר למשתמש ב-assignment.",
            "המשתמש הנכון לא רואה את ה-task ➔ קישור-role שגוי או חסר business catalog.",
          ],
          bestPracticeHe: [
            "השתמש ב-roles תמיד; לעולם אל תקודד שמות בתבנית.",
            "תעד מיפוי role↔אחריות-ארגונית כדי שהקישור החודשי יהיה חד-משמעי.",
          ],
          interviewHe: [
            { qHe: "מדוע להשתמש ב-process roles ולא בשמות-משתמש?", aHe: "כדי לאפשר reuse של התבנית בין צוותים/אזורים ולהחליף אחריות בלי לגעת בתבנית — רק בקישור ה-role." },
          ],
          takeawaysHe: [
            "Role = 'כובע' ולא 'אדם'; abstraction בין step למשתמש.",
            "מאפשר reuse של תבנית וגמישות-כוח-אדם.",
            "שונה מ-business role של ה-authorization.",
          ],
        },
        // -------------------- 9.2.2
        {
          id: "9.2.2",
          titleHe: "הגדרות אזור-זמן, יום-עבודה ומשך לצעדי-תהליך",
          titleEn: "Time Zone, Workday, and Duration Settings for Process Steps",
          execHe:
            "כל process step נושא duration, time zone ו-workday calendar שיחד קובעים את תאריכי-ההתחלה-והיעד שלו. בארגון גלובלי זה קריטי: 'שלושה ימי-עבודה' מ-ניו-יורק שונה מ-טוקיו, וחגים מקומיים אסור שיגרמו ל-step ליפול ביום-מנוחה.",
          beginnerHe:
            "כשאומרים 'הצעד הזה לוקח 3 ימים' צריך לדעת 3 ימים של מי — לפי איזה אזור-זמן, ואילו ימים נחשבים ימי-עבודה (לא שבת/חג). IBP מחשב את תאריך-היעד אוטומטית לפי המשך + אזור-הזמן + לוח-ימי-העבודה של ה-step.",
          consultantHe:
            "לכל step מגדירים duration (במונחי workdays או שעות), time zone, ו-workday/factory calendar. IBP מחשב את ה-planned start/end תוך דילוג על ימי-אי-עבודה לפי ה-calendar, ומתרגם בין אזורי-זמן של steps מקבילים/עוקבים. ה-durations מצטברות לאורך ה-sequential path ומגדירות את ה-critical path בתצוגת ה-Gantt. הגדרה שגויה של calendar/time zone היא הסיבה הנפוצה ביותר לתאריכי-יעד 'מוזרים'.",
          purposeHe:
            "להבטיח שתאריכי-היעד של כל צעד ריאליים ומתואמים-גלובלית — מכבדים ימי-עבודה, חגים ואזורי-זמן מקומיים — כך שה-cycle-plan ניתן-לעמידה בפועל.",
          processExampleHe:
            "Step 'Demand Review' בן 3 workdays עם calendar אמריקאי מתחיל ב-יום-שני ומסתיים ב-יום-רביעי; אם נופל חג, היעד נדחה אוטומטית ליום-עבודה הבא. ה-Gantt מציג את הדחייה ואת השפעתה על ה-critical path.",
          scenarioHe:
            "בארגון לכל territory workday calendar מקומי: השלב באזור עם ראש-השנה מקומי מקבל יותר זמן-קלנדרי כדי לעמוד באותם 3 ימי-עבודה. הגדרת time zone לכל אזור מונעת בלבול בתאריכי-מסירה בין מדינות-הבקבוק.",
          navHe: [
            "Process Templates ► Step ► Scheduling ► Duration / Time Zone / Workday Calendar",
            "Template ► Gantt View (אימות תאריכים מחושבים)",
          ],
          tables: [],
          tcodes: ["Process Templates"],
          fiori: ["Process Templates"],
          configHe: [
            "לכל step הגדר duration (workdays/hours), time zone, ו-workday/factory calendar.",
            "IBP מחשב planned start/end אוטומטית תוך דילוג על ימי-אי-עבודה.",
            "ה-durations מצטברות לאורך ה-sequential path ומגדירות critical path ב-Gantt.",
          ],
          flow: [
            { he: "הגדרת duration ל-step", note: "workdays/hours" },
            { he: "הגדרת time zone + calendar", note: "מקומי" },
            { he: "חישוב planned start/end", note: "דילוג על ימי-אי-עבודה" },
            { he: "תצוגת critical path", code: "Gantt" },
          ],
          mistakesHe: [
            "הגדרת duration ללא workday calendar — יעדים נופלים על שבת/חג.",
            "time zone אחיד לתהליך גלובלי — תאריכי-מסירה לא-מתואמים בין אזורים.",
            "ספירת ימים-קלנדריים במקום workdays — תכנון לא-ריאלי.",
          ],
          troubleshootHe: [
            "תאריך-יעד נופל ביום-מנוחה ➔ workday calendar שגוי או חסר ל-step.",
            "פער-תאריכים בין steps מקבילים ➔ time zones שונים שלא תואמו.",
            "critical path לא הגיוני ➔ durations או dependencies שגויים.",
          ],
          bestPracticeHe: [
            "השתמש תמיד ב-workdays ולא בימים-קלנדריים.",
            "הקצה calendar ו-time zone מקומיים לכל step גלובלי.",
            "אמת את התאריכים המחושבים בתצוגת Gantt לפני go-live.",
          ],
          interviewHe: [
            { qHe: "מה קובע את תאריך-היעד של process step?", aHe: "שילוב של duration, time zone ו-workday calendar; IBP מחשב start/end תוך דילוג על ימי-אי-עבודה." },
            { qHe: "מדוע time zone חשוב בתהליך גלובלי?", aHe: "כדי לתאם תאריכי-יעד בין steps מקבילים/עוקבים באזורים שונים ולמנוע בלבול-מסירה." },
          ],
          takeawaysHe: [
            "duration + time zone + workday calendar = תאריכי-היעד.",
            "השתמש ב-workdays, לא בימים-קלנדריים.",
            "ה-durations מצטברות ל-critical path ב-Gantt.",
          ],
        },
        // -------------------- 9.2.3
        {
          id: "9.2.3",
          titleHe: "הקצאת משימות (Tasks Assignment)",
          titleEn: "Tasks Assignment",
          execHe:
            "Tasks Assignment מגדיר את היחידה-הקטנה-ביותר של עבודה במחזור: מה בדיוק על המשתמש לעשות בכל step. ה-task הוא הגשר בין התהליך המופשט (steps) לפעולה המוחשית (לרענן תחזית, לאשר תוכנית, להזין הערה), והוא המקום שבו ה-accountability הופכת לפעולה.",
          beginnerHe:
            "אם step הוא 'פרק', task הוא 'מטלה בודדת' בתוכו. למשל ב-step של Demand Review יהיו tasks: 'בדוק תחזית סטטיסטית', 'הוסף ידע-שוק', 'אשר את התחזית'. כל task מוקצה לאדם (דרך role), והוא מסמן 'בוצע' כשסיים.",
          consultantHe:
            "tasks מוגדרים בתוך steps/sub-steps בתבנית, מוקצים ל-process roles, ויכולים לכלול הוראות, deep-links ל-planning view ספציפי, או טריגר ל-IBP action. סוג ה-task יכול להיות manual (המשתמש מסמן completion) או מקושר ל-automation. ה-task completion הוא היחידה שמניעה את ה-progress של ה-step ושל התהליך כולו. ניתן להגדיר tasks חובה מול אופציונליים, ולקשר deep-links שמובילים ישירות לתצוגת-העבודה הנכונה ב-Excel Add-In או ב-Fiori.",
          purposeHe:
            "להמיר אחריות מופשטת לפעולות מוחשיות, מדידות וניתנות-להשלמה — ולחבר את המשתמש ישירות לכלי-העבודה (planning view) הדרוש להשלמת המטלה.",
          processExampleHe:
            "Step 'Demand Review' מכיל tasks: (1) 'סקור תחזית סטטיסטית' עם deep-link ל-planning view; (2) 'הזן market intelligence'; (3) 'אשר תחזית סופית'. ה-Demand Planner מקבל את שלושתם, פותח את ה-view בלחיצה, ומסמן completion אחד-אחד; השלמת כולם סוגרת את ה-step.",
          scenarioHe:
            "בארגון ב-step של ביקוש-קיץ: task 'הזן תחזית-קמפיין-קיץ' עם deep-link ל-view של ה-promotions, task 'אשר תחזית פחיות 330מ\"ל', ו-task 'תעד הנחות-מזג-אוויר'. כל territory משלים את ה-tasks שלו לפני שלב-האיחוד.",
          navHe: [
            "Process Templates ► Step ► Tasks ► Add Task ► (Role / Instructions / Deep-link / Mandatory)",
            "My Process Steps / Manage Processes ► Task ► Complete",
          ],
          tables: [],
          tcodes: ["Process Templates", "My Process Steps"],
          fiori: ["Process Templates", "My Process Steps"],
          configHe: [
            "הגדר tasks בתוך steps/sub-steps; הקצה כל task ל-process role.",
            "הוסף הוראות, deep-link ל-planning view, וסמן mandatory/optional.",
            "task יכול להיות manual (completion ידני) או מקושר ל-automation.",
          ],
          mistakesHe: [
            "tasks עמומים ('עשה את Demand') ללא הוראות או deep-link — מבלבל את המבצע.",
            "כל ה-tasks mandatory בלי צורך — נוקשות שמעכבת את המחזור.",
            "task בלי role — אין מי שישלים אותו.",
          ],
          troubleshootHe: [
            "step לא נסגר למרות 'שסיימו' ➔ נותר task mandatory לא-מושלם.",
            "המבצע לא מוצא היכן לעבוד ➔ חסר deep-link ל-planning view.",
            "ה-task לא מופיע אצל המשתמש ➔ role לא קושר אליו.",
          ],
          bestPracticeHe: [
            "כתוב tasks אטומיים, ברורים ועם deep-link ישיר.",
            "סמן mandatory רק את הקריטיים; השאר את השאר אופציונליים.",
            "צרף הוראות קצרות לכל task כדי לצמצם שאלות.",
          ],
          interviewHe: [
            { qHe: "מה היחס בין step ל-task?", aHe: "step הוא 'פרק' המכיל tasks; ה-task הוא יחידת-העבודה הקטנה-ביותר המוקצית ל-role ומסומנת completion." },
            { qHe: "מה מועיל deep-link בתוך task?", aHe: "הוא מוביל את המבצע ישירות ל-planning view הנכון (ב-Fiori או ב-Excel Add-In), ומצמצם טעויות ואיבוד-זמן." },
          ],
          takeawaysHe: [
            "task = יחידת-העבודה הקטנה-ביותר, גשר בין step לפעולה.",
            "מוקצה ל-role, יכול לשאת deep-link ו-mandatory flag.",
            "השלמת ה-tasks מניעה את progress ה-step והתהליך.",
          ],
        },
        // -------------------- 9.2.4
        {
          id: "9.2.4",
          titleHe: "אוטומציה של צעדי-תהליך",
          titleEn: "Process Steps Automation",
          execHe:
            "Process Steps Automation מאפשר ל-IBP לבצע צעדים ללא מגע-יד-אדם — טעינת-נתונים, copy/snapshot, הרצת תחזית סטטיסטית, או חישוב — כחלק מהמחזור. צעד-אוטומטי מתחיל, רץ ומסתיים לבד, ומקדם את התהליך, ובכך מקצר cycle-time ומבטל משימות-שגרה ידניות.",
          beginnerHe:
            "חלק מהצעדים במחזור הם 'עבודת-מחשב טהורה' — להעתיק מספרים, ליצור snapshot, להריץ חישוב. אין סיבה שאדם יעשה זאת ידנית. צעד-אוטומטי אומר ל-IBP: 'כשמגיע תורך, הרץ את העבודה הזו בעצמך וסמן בוצע'.",
          consultantHe:
            "צעד-אוטומטי מקושר ל-application job (copy operator, snapshot, statistical forecast, calculation) או ל-IBP action. כשהתהליך מגיע ל-step, ה-job מורץ אוטומטית; בסיומו ה-step מסומן complete וה-dependency הבא משוחרר. ניתן לשלב automatic ו-manual steps באותו תהליך. חשוב: כשל ב-job יעצור את ה-step — לכן יש לנטר את ה-application jobs ולהגדיר התראות. ה-orchestration של מספר jobs מכוסה ב-9.2.5.",
          purposeHe:
            "להוריד מהמתכננים את עבודת-השגרה (טעינה/העתקה/חישוב), לקצר את המחזור, ולהבטיח עקביות — צעד-אוטומטי רץ אותו-דבר כל חודש בלי טעויות-אנוש.",
          processExampleHe:
            "Step 1 'Data Refresh' מוגדר אוטומטי ומקושר ל-application job של copy operator שמעדכן actuals. ב-1 לחודש התהליך מתחיל, ה-job רץ לבד, מעדכן את ה-key figures, מסמן complete, ופותח אוטומטית את Step 2 (Demand Review) למתכננים.",
          scenarioHe:
            "בארגון ה-step הראשון טוען sell-out מהקמעונאים ומריץ snapshot של ה-baseline אוטומטית בלילה; כשהמתכננים מתחילים בבוקר, הנתונים מוכנים ו-step הביקוש כבר פתוח — בלי שאיש נגע במערכת.",
          navHe: [
            "Process Templates ► Step ► Automation ► Assign Application Job / IBP Action",
            "Application Jobs ► Schedule Job (סוג Process Step)",
          ],
          tables: [],
          tcodes: ["Process Templates", "Application Jobs"],
          fiori: ["Process Templates", "Application Jobs"],
          configHe: [
            "סמן step כ-automated וקשר אותו ל-application job (copy/snapshot/forecast/calculation) או ל-IBP action.",
            "ה-job מורץ כשהתהליך מגיע ל-step; בסיומו ה-step מסומן complete.",
            "שלב automatic ו-manual steps באותו תהליך לפי הצורך.",
          ],
          flow: [
            { he: "התהליך מגיע ל-automated step", code: "Manage Processes" },
            { he: "הרצת application job", code: "Application Jobs", note: "copy/snapshot/forecast" },
            { he: "סיום job → step complete", note: "אוטומטי" },
            { he: "שחרור dependency הבא", note: "המחזור מתקדם" },
          ],
          mistakesHe: [
            "אוטומציה ללא ניטור — כשל ב-job עוצר את המחזור בשקט.",
            "אוטומציה של צעד שדורש שיקול-דעת אנושי — אובדן-בקרה.",
            "אי-הגדרת התראות-כשל ל-application jobs קריטיים.",
          ],
          troubleshootHe: [
            "automated step תקוע ➔ ה-application job נכשל; בדוק את ה-job log.",
            "step לא מתחיל אוטומטית ➔ ה-job לא קושר ל-step או לא מתוזמן.",
            "נתונים לא התעדכנו ➔ ה-job רץ אך על PlanningArea/scope שגוי.",
          ],
          bestPracticeHe: [
            "נטר תמיד application jobs קריטיים והגדר התראות-כשל.",
            "אוטמט רק צעדים דטרמיניסטיים; השאר שיקול-דעת לאדם.",
            "תזמן jobs כבדים מחוץ-לשעות-העומס (לילה).",
          ],
          interviewHe: [
            { qHe: "מה מחבר process step ל-automation?", aHe: "קישור ה-step ל-application job (copy/snapshot/statistical forecast/calculation) או ל-IBP action; ה-job רץ כשהתהליך מגיע ל-step." },
            { qHe: "מה קורה כש-application job של step נכשל?", aHe: "ה-step נעצר ולא משוחרר ה-dependency הבא — לכן חובה לנטר jobs ולהגדיר התראות-כשל." },
          ],
          takeawaysHe: [
            "צעד-אוטומטי מריץ application job/IBP action בלי מגע-יד.",
            "מקצר cycle-time ומבטל עבודת-שגרה.",
            "חובה לנטר — כשל-job עוצר את המחזור.",
          ],
          relatedHe: [
            { labelHe: "S&OP · Orchestration של application jobs", href: "/library/sop/chapter-09/#sub-9.2.5" },
          ],
        },
        // -------------------- 9.2.5
        {
          id: "9.2.5",
          titleHe: "תזמור (Orchestration) של application jobs",
          titleEn: "Process Orchestration of Application Jobs",
          execHe:
            "Process Orchestration of Application Jobs הוא היכולת לשרשר ולתאם מספר application jobs לרצף מנוהל בתוך התהליך — כך שטעינה, copy, חישוב ותחזית רצים בסדר הנכון, עם תלויות, במקום אוסף-jobs מבודדים שמישהו 'זוכר' להריץ. זהו ההבדל בין אוטומציה-נקודתית לאוטומציה-מתוזמרת.",
          beginnerHe:
            "לפעמים צעד-אוטומטי אחד דורש כמה פעולות-מחשב ברצף: קודם לטעון נתונים, אחר-כך להעתיק, ואז להריץ חישוב. Orchestration הוא 'המנצח' שמוודא שהם רצים בסדר הנכון, אחד-אחרי-השני, ושאם הראשון נכשל — השני לא יתחיל על נתונים חסרים.",
          consultantHe:
            "ה-orchestration מקשר רצף application jobs ל-process steps עם dependencies: job B מתחיל רק אחרי job A מצליח. ניתן לשלב jobs ב-steps עוקבים (sequential) או ב-branches מקבילים (parallel) ולתצוגתם ב-Gantt. ה-orchestration מטפל בהעברת-state ובכשלים: כשל-job עוצר את ה-downstream, ומאפשר re-run נקודתי. זהו המנגנון שמבטיח שה-data-pipeline של המחזור (load → copy → forecast → snapshot) רץ עקבי ומבוקר בכל מחזור.",
          purposeHe:
            "להבטיח שה-pipeline של נתוני-המחזור רץ בסדר נכון, עם תלויות-כשל, ובלי תלות-בזיכרון-אנושי — ולספק נקודת-בקרה אחת לכל האוטומציות של המחזור.",
          processExampleHe:
            "מחזור מתוזמר: job1 טוען actuals → (בהצלחה) job2 מריץ copy ל-baseline → job3 מריץ statistical forecast → job4 יוצר snapshot. כל job מקושר ל-step עם dependency על קודמו; כשל ב-job1 עוצר את כל השרשרת ומתריע, במקום להמשיך על נתונים חלקיים.",
          scenarioHe:
            "בארגון ה-orchestration הלילי: טען sell-out → copy ל-demand baseline → הרץ תחזית סטטיסטית לכל territory → snapshot ל-cycle. אם טעינת-ה-sell-out של אזור נכשלת, השרשרת נעצרת ומתריעה, כך שהמתכננים לא עובדים בבוקר על baseline-שגוי.",
          navHe: [
            "Process Templates ► Steps ► (סדרת automated steps עם dependencies)",
            "Application Jobs ► Schedule / Monitor (jobs מתוזמרים)",
            "Template ► Gantt View (רצף ה-jobs המתוזמרים)",
          ],
          tables: [],
          tcodes: ["Application Jobs", "Process Templates", "Manage Processes"],
          fiori: ["Application Jobs", "Process Templates"],
          configHe: [
            "שרשר application jobs ל-steps עוקבים עם dependencies (job B אחרי job A מצליח).",
            "שלב sequential ו-parallel branches; הצג ב-Gantt.",
            "הגדר טיפול-בכשל: עצירת downstream, התראה ו-re-run נקודתי.",
          ],
          flow: [
            { he: "job1 — load actuals", code: "Application Jobs" },
            { he: "job2 — copy baseline", note: "אחרי הצלחת job1" },
            { he: "job3 — statistical forecast", note: "תלוי ב-job2" },
            { he: "job4 — snapshot", note: "סוגר את ה-pipeline" },
          ],
          mistakesHe: [
            "הרצת jobs במקביל כשיש ביניהם תלות-נתונים — תוצאות על נתונים חלקיים.",
            "אי-הגדרת תלות-כשל — downstream רץ למרות כשל upstream.",
            "ניהול jobs כיחידים מבודדים במקום כ-pipeline מתוזמר.",
          ],
          troubleshootHe: [
            "התחזית רצה על נתונים-ישנים ➔ סדר ה-orchestration שגוי או חסרה dependency.",
            "השרשרת נעצרה ➔ אתר את ה-job הכושל ב-monitor, תקן והרץ re-run.",
            "תוצאות לא-עקביות בין-מחזורים ➔ jobs לא רצים באותו סדר/תלויות.",
          ],
          bestPracticeHe: [
            "הגדר dependencies מפורשות בין כל ה-jobs ב-pipeline.",
            "השתמש ב-Gantt לאמת את הרצף והתלויות.",
            "אפשר re-run נקודתי ל-job כושל בלי להריץ מחדש את כל השרשרת.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין automation ל-orchestration של application jobs?", aHe: "automation = הרצת job בודד ב-step; orchestration = שרשור מספר jobs עם dependencies ל-pipeline מנוהל (load→copy→forecast→snapshot)." },
            { qHe: "מה קורה ל-pipeline כש-job upstream נכשל?", aHe: "ה-downstream נעצר, מתקבלת התראה, וניתן re-run נקודתי — כדי שלא לעבוד על נתונים חלקיים." },
          ],
          takeawaysHe: [
            "Orchestration משרשר application jobs ל-pipeline מנוהל עם תלויות.",
            "מבטיח סדר נכון וטיפול-בכשל (עצירת downstream + re-run).",
            "ניתן-לתצוגה ב-Gantt; הבסיס ל-data-pipeline עקבי בכל מחזור.",
          ],
        },
        // -------------------- 9.2.6
        {
          id: "9.2.6",
          titleHe: "תצוגת Gantt של תהליכים sequential ו-parallel",
          titleEn: "Gantt Chart View of Sequential and Parallel Processes",
          execHe:
            "תצוגת ה-Gantt היא ההצגה הוויזואלית של התהליך לאורך-זמן — פסי-זמן לכל step, חיצי-תלות בין steps, וסימון ה-critical path. היא הופכת תהליך מורכב עם sequential ו-parallel branches למפה אחת מובנת, שבה רואים מיד מה רץ במקביל, מה מעכב מה, ומתי המחזור יסתיים.",
          beginnerHe:
            "Gantt הוא 'לוח-זמנים מצויר': כל צעד הוא פס אופקי על ציר-זמן, וחצים מראים מה-תלוי-במה. צעדים שרצים במקביל מופיעים זה-לצד-זה; צעדים-עוקבים מופיעים בשרשרת. במבט אחד מבינים את כל המחזור ואת התאריך-הסופי.",
          consultantHe:
            "ה-Gantt ב-IBP Process Management מציג את ה-steps עם planned ו-actual dates, את ה-dependencies (sequential arrows), את ה-parallel branches, ואת ה-critical path — הרצף-הקובע-משך-המחזור. הוא משמש גם להגדרה (גרירת תלויות, שינוי durations) וגם לניטור (where-are-we בזמן-אמת, חריגות-תאריך). שינוי duration ב-step על ה-critical path מזיז את כל תאריך-הסיום; steps מחוץ ל-critical path מכילים slack. זהו כלי-המפתח לזיהוי bottlenecks ולקיצור cycle-time.",
          purposeHe:
            "לתת תמונה אחת, מיידית ומדויקת, של מבנה-המחזור ולוח-הזמנים — לתכנון (היכן ה-critical path) ולניטור (היכן אנחנו ומי מעכב) — ובכך לאפשר ניהול-תהליך מבוסס-נתונים.",
          processExampleHe:
            "ב-Gantt רואים: Step 1 Data Load (אוטומטי, יום), אחריו Step 2 Demand Review (3 ימים) ו-Step 3 Supply Review (3 ימים) ברצף; Step 4 Reconciliation מתפצל ל-Finance ו-Sales במקביל; Step 5 Sign-off בסוף. ה-critical path מודגש; חריגה ב-Demand Review מאירה באדום ודוחפת את תאריך-הסיום.",
          scenarioHe:
            "בארגון ה-Gantt מציג את כל ה-territories ב-parallel branches בשלב-הביקוש, מתכנסים ל-sequential reconciliation ולאישור-הנהלה. ה-VP רואה במבט-אחד שה-territory הדרומי מעכב ושהוא על ה-critical path של מחזור-הקיץ.",
          navHe: [
            "Manage Processes ► Process ► Gantt View",
            "Process Templates ► Template ► Gantt View (הגדרת תלויות ו-durations)",
          ],
          tables: [],
          tcodes: ["Manage Processes", "Process Templates"],
          fiori: ["Manage Processes", "Process Templates"],
          configHe: [
            "ה-Gantt מציג steps עם planned/actual dates, dependencies, parallel branches ו-critical path.",
            "משמש להגדרה (גרירת תלויות, שינוי durations) ולניטור (סטטוס בזמן-אמת).",
            "steps מחוץ ל-critical path מכילים slack; שינוי על ה-critical path מזיז את תאריך-הסיום.",
          ],
          flow: [
            { he: "צפייה ב-steps על ציר-זמן", code: "Gantt" },
            { he: "זיהוי sequential vs parallel", note: "חיצי-תלות" },
            { he: "סימון critical path", note: "הרצף-הקובע" },
            { he: "ניטור חריגות בזמן-אמת", note: "אדום = עיכוב" },
          ],
          mistakesHe: [
            "התעלמות מה-critical path — שיפור step עם slack לא מקצר את המחזור.",
            "קריאת ה-Gantt כסטטי במקום כניטור-חי של actual מול planned.",
            "אי-שימוש ב-parallel branches במקום שאפשר — מאריך את המחזור מיותר.",
          ],
          troubleshootHe: [
            "המחזור ארוך מהצפוי ➔ זהה ב-Gantt את ה-critical path וקצר steps עליו.",
            "step 'מעכב' למרות slack ➔ הוא לא על ה-critical path; ההשפעה מוגבלת.",
            "תאריכים ב-Gantt לא תואמים מציאות ➔ durations/dependencies/calendar שגויים.",
          ],
          bestPracticeHe: [
            "התמקד תמיד בקיצור steps שעל ה-critical path.",
            "מקבל steps עצמאיים ל-parallel branches לקיצור המחזור.",
            "השתמש ב-Gantt כ-dashboard-ניטור חי, לא רק ככלי-הגדרה.",
          ],
          interviewHe: [
            { qHe: "מהו critical path בתצוגת Gantt?", aHe: "הרצף-הקובע של steps שמשכו-הכולל מגדיר את משך-המחזור; שינוי duration עליו מזיז את תאריך-הסיום, בעוד steps אחרים מכילים slack." },
            { qHe: "כיצד parallel branches מקצרים את המחזור?", aHe: "הם מריצים steps עצמאיים בו-זמנית במקום ברצף, כך שמשכם המצטבר אינו מוסיף ל-critical path." },
          ],
          takeawaysHe: [
            "ה-Gantt ממפה steps, dependencies, parallelism ו-critical path.",
            "כלי הן להגדרה והן לניטור-חי.",
            "קיצור cycle-time = קיצור ה-critical path; parallelize היכן שאפשר.",
          ],
        },
      ],
    },
    // ============================================================ 9.3
    {
      id: "9.3",
      titleHe: "ניהול תהליכים (Manage Processes)",
      titleEn: "Manage Processes",
      execHe:
        "אם ה-process template הוא ה'תוכנית', Manage Processes הוא ה'ביצוע': האפליקציה שבה יוצרים מופעי-תהליך מהתבנית, מריצים אותם מחזור-אחר-מחזור, מנהלים את מחזור-חייהם (התחלה, עצירה, השלמה) ומנטרים את הסטטוס. כאן מחזור ה-S&OP חי בפועל, ומכאן מנהלים אותו יום-יום.",
      beginnerHe:
        "Manage Processes הוא 'מסך-הבקרה' של המחזורים הפעילים. כאן לוחצים 'צור מחזור חדש מהתבנית', רואים את כל המחזורים הרצים, מי באיזה שלב, ומה הסטטוס. זה ההבדל בין 'מתכון בספר' (התבנית) ל'ארוחה על האש' (המופע הפעיל).",
      consultantHe:
        "Manage Processes הוא ה-application לניהול process instances: יצירה מ-template, scoping ל-PlanningArea ולתקופה, mapping של roles למשתמשים, start/stop/complete, וניטור-סטטוס. כל instance הוא snapshot של התבנית בזמן-היצירה — שינויי-תבנית עתידיים לא משפיעים עליו. דרך כאן רואים את ה-Gantt של המופע, את ה-task completion, ואת ה-dashboards. ה-instance עובר מחזור-חיים: Not Started → In Process → Completed (או Stopped/On Hold), כשכל מעבר ניתן-לבקרה ולתיעוד.",
      purposeHe:
        "לספק נקודת-שליטה אחת על כל המחזורים הפעילים — יצירתם מתבנית, ניהול מחזור-חייהם, וניטורם — כך שמנהל-ה-S&OP רואה את כל התמונה ומנהל אותה ממקום אחד.",
      processExampleHe:
        "ב-1 ליוני, מנהל-S&OP נכנס ל-Manage Processes, יוצר instance ל-'S&OP June' מהתבנית, ממפה roles למתכנני-החודש, ולוחץ Start. לאורך החודש הוא עוקב אחר הסטטוס, ובסוף מסמן Complete — וה-instance נארכב עם כל ה-audit-trail שלו.",
      scenarioHe:
        "בארגון נוצר מדי חודש instance 'S&OP – [חודש]' מתבנית-העל; ה-coordinator ממפה את מנהלי-ה-territories, מפעיל את המחזור, ובסוף מסמן Complete. ההיסטוריה של כל המחזורים נשמרת להשוואת cycle-time בין חודשים.",
      navHe: [
        "SAP Fiori Launchpad ► Process Management ► Manage Processes",
        "Manage Processes ► Create Process (from Template) ► Scope / Roles / Start",
        "Manage Processes ► Process ► (Gantt / Tasks / Status / Dashboard)",
      ],
      tables: [],
      tcodes: ["Manage Processes"],
      fiori: ["Manage Processes"],
      configHe: [
        "צור process instance מ-template; קבע scope (PlanningArea/תקופה) ומפה roles למשתמשים.",
        "כל instance הוא snapshot של התבנית בזמן-היצירה — חסין לשינויי-תבנית עתידיים.",
        "נהל מחזור-חיים: Start / Stop / Hold / Complete; נטר סטטוס ו-Gantt.",
      ],
      flow: [
        { he: "Create Process from template", code: "Manage Processes" },
        { he: "Scope + map roles", note: "PlanningArea / משתמשים" },
        { he: "Start → In Process", note: "המחזור רץ" },
        { he: "ניטור + Complete", note: "ארכוב + audit-trail" },
      ],
      mistakesHe: [
        "יצירת instance ללא mapping מלא של roles — tasks תלויים-באוויר.",
        "השארת מחזורים ישנים פתוחים — מבלבל את התמונה ומעוות מדדים.",
        "ציפייה ששינוי-תבנית ישנה instance פעיל — לא קורה.",
      ],
      troubleshootHe: [
        "instance לא מתחיל ➔ scope/PlanningArea חסר או roles לא ממופים.",
        "tasks לא מגיעים למשתמשים ➔ mapping של roles חסר ב-instance.",
        "המחזור 'תקוע' ➔ בדוק ב-Gantt איזה step פתוח ומה מעכב אותו.",
      ],
      bestPracticeHe: [
        "סגור/ארכב מחזורים שהושלמו כדי לשמור תמונה נקייה ומדדים אמינים.",
        "מפה roles במלואם לפני Start.",
        "השתמש בשם-instance עקבי (S&OP – [חודש]) להשוואות-עבר.",
      ],
      interviewHe: [
        { qHe: "מה היחס בין Manage Processes ל-process template?", aHe: "Process template = ההגדרה; Manage Processes = האפליקציה שיוצרת ומריצה ממנה process instances ומנהלת את מחזור-חייהם." },
        { qHe: "מדוע instance חסין לשינויי-תבנית?", aHe: "כל instance הוא snapshot של התבנית בזמן-היצירה — כדי לא לשבש מחזור פעיל; שינויים חלים על מופעים עתידיים." },
      ],
      takeawaysHe: [
        "Manage Processes = ה'ביצוע' של התבנית — יצירה, הרצה וניהול-מחזור-חיים.",
        "כל instance הוא snapshot חסין-שינויי-תבנית.",
        "נקודת-שליטה וניטור אחת לכל המחזורים הפעילים.",
      ],
      children: [
        // -------------------- 9.3.1
        {
          id: "9.3.1",
          titleHe: "מהו תהליך (Process)?",
          titleEn: "What Is a Process?",
          execHe:
            "Process ב-IBP הוא מופע-מורץ של מחזור-תכנון — אוסף מאורגן של steps, tasks, roles ו-automations הנגזר מ-process template ומבוצע על PlanningArea ותקופה מוגדרים. הוא ה'יחידה' שעליה מודדים cycle-time, accountability והתקדמות.",
          beginnerHe:
            "'תהליך' (Process) הוא מחזור-תכנון אחד-קונקרטי שרץ עכשיו — למשל 'S&OP של יוני'. הוא נולד מהתבנית, יש לו התחלה וסוף, ובתוכו כל הצעדים והמשימות של אותו חודש.",
          consultantHe:
            "טכנית, Process הוא instance של process template, מקושר ל-PlanningArea, עם horizon/תקופה, roles ממופים, ו-state (Not Started/In Process/Completed/Stopped). הוא מכיל את עץ ה-steps→tasks, את ה-dependencies וה-automations שנגזרו מהתבנית בזמן-היצירה. ה-Process הוא ה-entity שעליו ה-APIs (9.6) חושפים סטטוס ו-progress, ושמוצג ב-dashboards וב-Gantt. חשוב להבחין: 'process' (המופע) מול 'process template' (ההגדרה) — בלבול ביניהם הוא טעות-מושגית נפוצה.",
          purposeHe:
            "להגדיר את היחידה הניתנת-להרצה, למדידה ולניטור של מחזור-התכנון — כך שאפשר לנהל, להשוות ולשפר מחזורים כיחידות עצמאיות.",
          processExampleHe:
            "'S&OP June' הוא Process: נגזר מהתבנית, מקושר ל-PlanningArea של ה-finished-goods, רץ מ-1 עד 25 ביוני, עם roles ממופים ל-planners; הסטטוס שלו In Process, וה-progress 60%.",
          scenarioHe:
            "בארגון 'S&OP – יוני' ו-'S&OP – יולי' הם שני Processes נפרדים מאותה תבנית; כל אחד מודד את ה-cycle-time שלו, ומאפשר להשוות אם מחזור-הקיץ ארוך-יותר ממחזור-החורף.",
          navHe: [
            "Manage Processes ► Process List (כל ה-processes הפעילים/שהושלמו)",
            "Manage Processes ► Process ► Details (Steps / Status / Scope)",
          ],
          tables: [],
          tcodes: ["Manage Processes"],
          fiori: ["Manage Processes"],
          configHe: [
            "Process = instance של template, מקושר ל-PlanningArea, תקופה, roles ו-state.",
            "מכיל את עץ ה-steps→tasks, dependencies ו-automations מזמן-היצירה.",
            "הוא ה-entity שה-APIs וה-dashboards חושפים (סטטוס/progress).",
          ],
          mistakesHe: [
            "בלבול בין process (מופע) ל-process template (הגדרה).",
            "יצירת process בלי לקשרו ל-PlanningArea/תקופה נכונים.",
          ],
          troubleshootHe: [
            "ה-process לא מציג נתונים ➔ קישור ל-PlanningArea שגוי או scope ריק.",
            "סטטוס לא מתעדכן ➔ tasks/automations של ה-steps לא הושלמו.",
          ],
          bestPracticeHe: [
            "שמור על מוסכמת-שמות ברורה לכל process (תהליך–חודש).",
            "הקפד שכל process מקושר ל-PlanningArea ולתקופה הנכונים.",
          ],
          interviewHe: [
            { qHe: "מהו process ב-IBP?", aHe: "מופע-מורץ של מחזור-תכנון — instance של process template עם PlanningArea, תקופה, roles ו-state; היחידה למדידה ולניטור." },
            { qHe: "מה ההבדל בין process ל-process template?", aHe: "Template = ההגדרה החד-פעמית; process = המופע הקונקרטי הנגזר ממנה ומורץ בפועל." },
          ],
          takeawaysHe: [
            "Process = מופע-מורץ של מחזור-תכנון, נגזר מ-template.",
            "מקושר ל-PlanningArea, תקופה, roles ו-state.",
            "היחידה למדידת cycle-time, progress ו-accountability.",
          ],
        },
        // -------------------- 9.3.2
        {
          id: "9.3.2",
          titleHe: "יצירת תהליך",
          titleEn: "Creating a Process",
          execHe:
            "יצירת Process היא צעד-ההפעלה של המחזור: בוחרים process template, מגדירים scope (PlanningArea, תקופה), ממפים roles למשתמשים, וקובעים start. מרגע זה התבנית הופכת ל-instance חי, וה-automations וה-tasks מתחילים לזרום.",
          beginnerHe:
            "ליצור Process זה כמו 'להזמין ארוחה מהתפריט': בוחרים את התבנית (התפריט), אומרים לאיזה תקופה ואזור היא שייכת, מי הצוות, ולוחצים 'התחל'. מכאן המחזור רץ.",
          consultantHe:
            "ב-Manage Processes ► Create Process בוחרים template, מגדירים PlanningArea ו-planning-period/horizon, ממפים את כל ה-roles למשתמשים/קבוצות, ובוחרים start-date (מיידי או מתוזמן). בזמן-היצירה ה-instance 'מקפיא' snapshot של התבנית. ניתן ליצור ידנית או דרך API (9.6) לאוטומציה מלאה — למשל job שיוצר את ה-process של החודש אוטומטית. שגיאות-יצירה נפוצות: roles לא-ממופים, scope ריק, או start-date בעבר.",
          purposeHe:
            "להמיר הגדרה-סטטית (template) למחזור-פעיל בצורה מבוקרת ועקבית — עם scope ו-roles נכונים — כך שכל מחזור מתחיל 'נקי' ומוכן-לעבודה.",
          processExampleHe:
            "מנהל-S&OP בוחר template 'Monthly S&OP', מגדיר PlanningArea=FG, תקופה=יולי, ממפה Demand/Supply/Finance roles, וקובע start ל-1 ביולי. ה-instance נוצר, Step 1 (אוטומטי) מתוזמן, וה-tasks הראשונים ממתינים.",
          scenarioHe:
            "בארגון יוצרים את 'S&OP – יולי' מהתבנית, ממפים את כל מנהלי-ה-territories ל-roles, וקובעים start ל-1 בחודש; ה-application job של טעינת-ה-sell-out כבר משובץ ב-Step 1.",
          navHe: [
            "Manage Processes ► Create Process ► Select Template",
            "Create Process ► Scope (PlanningArea / Period) ► Map Roles ► Start Date",
            "(אופציונלי) API/OData ► יצירת process אוטומטית",
          ],
          tables: [],
          tcodes: ["Manage Processes"],
          fiori: ["Manage Processes"],
          configHe: [
            "בחר template, הגדר PlanningArea ותקופה/horizon, מפה את כל ה-roles, קבע start-date.",
            "ה-instance מקפיא snapshot של התבנית בזמן-היצירה.",
            "ניתן ליצור ידנית או דרך API/OData (9.6) לאוטומציה מלאה.",
          ],
          flow: [
            { he: "Select template", code: "Manage Processes" },
            { he: "Scope: PlanningArea + period", note: "היקף" },
            { he: "Map roles → users", note: "אחריות" },
            { he: "Start (now/scheduled)", note: "instance חי" },
          ],
          mistakesHe: [
            "start-date בעבר — המחזור 'מתחיל באיחור' מיד.",
            "roles לא-ממופים במלואם — tasks ללא בעלים.",
            "scope/PlanningArea שגוי — המחזור עובד על נתונים לא-נכונים.",
          ],
          troubleshootHe: [
            "Create נכשל ➔ template/scope/roles חסרים או start-date לא-תקין.",
            "ה-instance ריק מ-tasks ➔ roles לא ממופו או scope ריק.",
            "אוטומציה ראשונה לא רצה ➔ application job של Step 1 לא קושר/מתוזמן.",
          ],
          bestPracticeHe: [
            "אוטמט את יצירת ה-process החודשי דרך API/job כדי להבטיח עקביות.",
            "ודא mapping מלא של roles ו-scope לפני start.",
            "השתמש ב-start מתוזמן (1 לחודש) במקום ידני.",
          ],
          interviewHe: [
            { qHe: "אילו פרמטרים נדרשים ליצירת process?", aHe: "template, scope (PlanningArea/תקופה), mapping של roles למשתמשים, ו-start-date." },
            { qHe: "כיצד ניתן לאוטמט יצירת process חודשי?", aHe: "דרך ה-APIs/OData (9.6) או application job שיוצר את ה-process מהתבנית אוטומטית בתחילת כל מחזור." },
          ],
          takeawaysHe: [
            "יצירה = בחירת template + scope + mapping roles + start.",
            "ה-instance מקפיא snapshot של התבנית.",
            "ניתן לאוטמט יצירה דרך API/job.",
          ],
          relatedHe: [
            { labelHe: "S&OP · APIs לניהול-תהליך", href: "/library/sop/chapter-09/#sub-9.6" },
          ],
        },
        // -------------------- 9.3.3
        {
          id: "9.3.3",
          titleHe: "ניהול מחזור-חיי התהליך",
          titleEn: "Managing Process Lifecycle",
          execHe:
            "מחזור-חיי ה-process הוא מסע ה-instance מ-Not Started, דרך In Process, ועד Completed — עם אפשרויות Hold/Stop בדרך. ניהול נכון של מעברי-המצב מבטיח שמחזורים מסתיימים מסודר, נארכבים עם audit-trail, ולא 'נשארים פתוחים' ומעוותים את התמונה.",
          beginnerHe:
            "לכל מחזור יש 'מצבי-חיים': טרם-התחיל, רץ, בהמתנה, נעצר, הושלם. ניהול-מחזור-חיים זה פשוט להעביר את המחזור בין המצבים האלה בזמן הנכון — בעיקר לסגור אותו כשנגמר.",
          consultantHe:
            "ה-states: Not Started → In Process → Completed; בנוסף On Hold (השהיה זמנית) ו-Stopped (עצירה מבוקרת). מעברים מבוקרים-הרשאות ומתועדים ל-audit. סגירת-process סוגרת tasks פתוחים ומקפיאה את ה-snapshot להשוואות-עבר. אפשר לנהל מעברים ידנית או דרך API (9.6) — למשל auto-complete כשכל ה-steps הושלמו. שאלת-מפתח: מתי Stop מול Complete — Complete = הסתיים-כראוי; Stop = בוטל/הופסק לפני-זמנו (משפיע על מדדי-cycle-time).",
          purposeHe:
            "לשלוט בצורה מסודרת ומבוקרת-הרשאות במעבר המחזור בין מצביו — להבטיח סגירה נקייה, audit-trail מלא, ומדדים אמינים.",
          processExampleHe:
            "מחזור In Process; באמצע-החודש מתגלה בעיית-נתונים — מנהל-S&OP מעביר ל-On Hold, מתקן, ומחזיר ל-In Process. בסוף, כשכל ה-steps הושלמו, הוא מעביר ל-Completed וה-instance נארכב.",
          scenarioHe:
            "בארגון, מחזור-קיץ הועבר ל-On Hold ליומיים בגלל תקלת-טעינת-sell-out, ואז חזר ל-In Process. בסיום סומן Completed; מחזור שבוטל בגלל מיזוג-טריטוריות סומן Stopped כדי לא לזהם את ממוצע-ה-cycle-time.",
          navHe: [
            "Manage Processes ► Process ► Lifecycle Actions (Start / Hold / Resume / Stop / Complete)",
            "(אופציונלי) API/OData ► עדכון state של process",
          ],
          tables: [],
          tcodes: ["Manage Processes"],
          fiori: ["Manage Processes"],
          configHe: [
            "States: Not Started → In Process → Completed; בנוסף On Hold ו-Stopped.",
            "מעברים מבוקרי-הרשאות ומתועדים ל-audit.",
            "Complete = הסתיים-כראוי; Stop = הופסק לפני-זמנו (משפיע על מדדים).",
          ],
          flow: [
            { he: "Not Started", note: "נוצר, טרם-החל" },
            { he: "In Process", code: "Start", note: "רץ" },
            { he: "On Hold / Resume", note: "השהיה זמנית" },
            { he: "Completed / Stopped", note: "סיום + ארכוב" },
          ],
          mistakesHe: [
            "השארת מחזורים In Process אחרי שהסתיימו בפועל — מעוות מדדים.",
            "שימוש ב-Stop במקום Complete (או להפך) — מזהם cycle-time.",
            "מעברי-state ללא הרשאה/תיעוד — פוגע ב-audit.",
          ],
          troubleshootHe: [
            "לא ניתן ל-Complete ➔ נותרו tasks/steps פתוחים.",
            "מעבר-state נחסם ➔ חוסר-הרשאה לפעולת-lifecycle.",
            "cycle-time מעוות ➔ מחזורים פתוחים-לשווא או Stop/Complete מבולבלים.",
          ],
          bestPracticeHe: [
            "סגור מחזורים מיד עם סיומם בפועל.",
            "הבחן בקפדנות בין Stop (בוטל) ל-Complete (הסתיים).",
            "שקול auto-complete דרך API כשכל ה-steps הושלמו.",
          ],
          interviewHe: [
            { qHe: "מהם מצבי מחזור-חיי ה-process?", aHe: "Not Started → In Process → Completed, בתוספת On Hold (השהיה) ו-Stopped (עצירה מבוקרת)." },
            { qHe: "מה ההבדל בין Stop ל-Complete?", aHe: "Complete = המחזור הסתיים-כראוי; Stop = הופסק לפני-זמנו — וההבחנה משפיעה על מדדי-cycle-time." },
          ],
          takeawaysHe: [
            "Lifecycle: Not Started→In Process→Completed (+ Hold/Stop).",
            "מעברים מבוקרי-הרשאות ומתועדים ל-audit.",
            "סגירה נקייה = מדדים אמינים; הבחן Stop מ-Complete.",
          ],
        },
        // -------------------- 9.3.4
        {
          id: "9.3.4",
          titleHe: "ניטור סטטוס התהליך",
          titleEn: "Monitoring Process Status",
          execHe:
            "ניטור-סטטוס הוא היכולת לראות בזמן-אמת היכן עומד כל מחזור: אילו steps הושלמו, מה בתהליך, מה מאחר, ומי מעכב. זוהי ה'בקרת-טיסה' של ה-S&OP — מאפשרת התערבות מוקדמת לפני שעיכוב הופך לפספוס-מחזור.",
          beginnerHe:
            "ניטור-סטטוס זה פשוט 'לראות איך הולך': ירוק=בוצע, צהוב=בתהליך, אדום=מאחר. במקום לרדוף אחרי אנשים בטלפון, מסתכלים על מסך אחד ויודעים מיד מי מעכב.",
          consultantHe:
            "הסטטוס נחשף ברמות: process (overall progress %), step (completed/in-process/overdue), ו-task (done/open). הניטור משלב את ה-Gantt (תצוגת-זמן), רשימות-steps, והתראות. סטטוס נגזר מ-task completion ומ-due-dates המחושבים (9.2.2). ניתן לצרוך את הסטטוס גם דרך APIs (9.6) ל-dashboards חיצוניים או ל-SAP Build Work Zone (9.5). ניטור יעיל מבוסס על due-dates ריאליים ו-roles ממופים — בלעדיהם הסטטוס חסר-משמעות.",
          purposeHe:
            "לספק שקיפות בזמן-אמת על התקדמות-המחזור ולזהות bottlenecks מוקדם — כדי לאפשר התערבות-ניהולית בזמן ולעמוד בלוח-הזמנים.",
          processExampleHe:
            "מנהל-S&OP פותח את Manage Processes באמצע-החודש ורואה: progress 70%, Demand Review ירוק, Supply Review צהוב (in-process), Reconciliation אפור (ממתין). step אחד אדום (overdue) — הוא פונה לאחראי ומשחרר את החסם.",
          scenarioHe:
            "בארגון ה-VP רואה בלוח שכל ה-territories ירוקים חוץ-מהדרומי (אדום, overdue על ה-critical path); הוא מתערב מיד, כי עיכוב שם דוחה את אישור מחזור-הקיץ כולו.",
          navHe: [
            "Manage Processes ► Process ► Status / Gantt",
            "Manage Processes ► My Process Steps (סטטוס ה-tasks האישיים)",
            "(אופציונלי) APIs/OData ► שליפת process/step status",
          ],
          tables: [],
          tcodes: ["Manage Processes", "My Process Steps"],
          fiori: ["Manage Processes", "My Process Steps"],
          configHe: [
            "סטטוס בשלוש רמות: process (progress %), step (done/in-process/overdue), task (done/open).",
            "נגזר מ-task completion ומ-due-dates מחושבים.",
            "ניתן-לצריכה דרך APIs ל-dashboards או ל-SAP Build Work Zone.",
          ],
          mistakesHe: [
            "ניטור בלי due-dates ריאליים — 'overdue' חסר-משמעות.",
            "התעלמות מסטטוס עד-סוף-החודש — מאוחר-מדי להתערב.",
            "הסתמכות על דיווח-ידני במקום על הסטטוס-החי.",
          ],
          troubleshootHe: [
            "progress 'תקוע' ➔ task mandatory פתוח או automation כושלת.",
            "step אדום למרות שבוצע ➔ ה-task לא סומן complete.",
            "סטטוס לא-אמין ➔ due-dates/calendar שגויים (9.2.2).",
          ],
          bestPracticeHe: [
            "בדוק את הסטטוס בקצב-קבוע (יומי) במחזור פעיל.",
            "השתמש בהתראות-overdue להתערבות-מוקדמת.",
            "ודא due-dates ריאליים כדי שהסטטוס יהיה בעל-ערך.",
          ],
          interviewHe: [
            { qHe: "באילו רמות נחשף סטטוס-התהליך?", aHe: "ברמת process (progress %), step (done/in-process/overdue) ו-task (done/open); נגזר מ-task completion ו-due-dates." },
            { qHe: "כיצד ניתן לצרוך סטטוס מחוץ ל-Manage Processes?", aHe: "דרך ה-APIs/OData (9.6) — להזרמתו ל-dashboards חיצוניים או ל-SAP Build Work Zone." },
          ],
          takeawaysHe: [
            "ניטור = שקיפות בזמן-אמת על process/step/task.",
            "נגזר מ-task completion ו-due-dates; מזהה bottlenecks מוקדם.",
            "ניתן-לצריכה דרך APIs ול-Work Zone.",
          ],
        },
        // -------------------- 9.3.5
        {
          id: "9.3.5",
          titleHe: "לוחות-מחוונים של תהליכים (Process Dashboards)",
          titleEn: "Process Dashboards",
          execHe:
            "Process Dashboards מאחדים את סטטוס וביצועי-המחזורים לתצוגה-ניהולית אחת: progress, cycle-time, on-time-completion, ו-bottlenecks חוזרים. הם הופכים נתוני-תהליך גולמיים לתובנות-ניהול שמניעות שיפור מחזורי.",
          beginnerHe:
            "Dashboard הוא 'לוח-מחוונים' כמו ברכב: גרפים ומספרים שמסכמים איך הולכים המחזורים — כמה אחוז הושלם, כמה זמן לוקח מחזור, ואיפה תמיד נתקעים. במקום לחפור בפרטים, רואים את התמונה-הגדולה.",
          consultantHe:
            "ה-dashboards מצרפים נתונים ממספר processes: KPIs כמו cycle-time ממוצע, on-time-rate, overdue-steps, והתפלגות-עומס לפי role. הם ניזונים מ-process/step status ויכולים לשלב את ה-APIs (9.6) או embedded-analytics. ב-S&OP בוגר, ה-dashboards משווים מחזורים לאורך-זמן ומזהים bottlenecks-חוזרים (תמיד-Supply-Review מאחר), שמכוונים לשיפור-התבנית. ניתן להטמיע אותם ב-SAP Build Work Zone (9.5) לחוויית-מנהל מאוחדת.",
          purposeHe:
            "להפוך נתוני-תהליך מרובי-מחזורים לתובנות-ניהול ברות-פעולה — מדידת-ביצועים, השוואה-לאורך-זמן, וזיהוי-מוקדים-לשיפור.",
          processExampleHe:
            "Dashboard מציג: cycle-time ממוצע 18 ימים (ירד מ-22), on-time 92%, וה-step שהכי-מאחר באופן-חוזר הוא Supply Review. ההנהלה מחליטה לאוטמט חלק מ-Supply Review (9.2.4) כדי לקצרו.",
          scenarioHe:
            "בארגון ה-dashboard מראה ש-cycle-time של מחזורי-קיץ ארוך ב-3 ימים מהחורף, ושה-territory הדרומי הוא bottleneck-חוזר; ההחלטה: parallelize את ה-territories טוב-יותר ולאוטמט את טעינת-ה-sell-out שלהם.",
          navHe: [
            "SAP Fiori Launchpad ► Process Management ► Process Dashboard / Overview",
            "(אופציונלי) SAP Build Work Zone ► embedded Process dashboard",
            "(אופציונלי) APIs/OData ► הזנת KPIs ל-dashboard חיצוני",
          ],
          tables: [],
          tcodes: ["Manage Processes"],
          fiori: ["Manage Processes", "Process Dashboard"],
          configHe: [
            "ה-dashboards מצרפים KPIs ממספר processes: cycle-time, on-time-rate, overdue, עומס-לפי-role.",
            "ניזונים מ-process/step status; ניתן לשלב APIs/embedded-analytics.",
            "ניתנים-להטמעה ב-SAP Build Work Zone לחוויית-מנהל מאוחדת.",
          ],
          mistakesHe: [
            "מדידת progress בלבד בלי cycle-time/on-time — אין תובנת-שיפור.",
            "התעלמות מ-bottlenecks-חוזרים שה-dashboard חושף.",
            "dashboard מזוהם ממחזורים-פתוחים-לשווא (9.3.3).",
          ],
          troubleshootHe: [
            "KPIs לא-הגיוניים ➔ מחזורים לא-סגורים או Stop/Complete מבולבלים.",
            "ה-dashboard ריק ➔ אין processes ב-scope או חוסר-הרשאה.",
            "cycle-time מעוות ➔ due-dates/calendar שגויים (9.2.2).",
          ],
          bestPracticeHe: [
            "עקוב אחר cycle-time ו-on-time, לא רק progress.",
            "השתמש ב-bottleneck-חוזר כקלט לשיפור-תבנית (9.2).",
            "הטמע את ה-dashboard ב-Work Zone למנהלים (9.5).",
          ],
          interviewHe: [
            { qHe: "אילו KPIs מספק Process Dashboard?", aHe: "cycle-time ממוצע, on-time-completion, overdue-steps, ועומס-לפי-role — מצורפים ממספר processes." },
            { qHe: "כיצד dashboard מניע שיפור?", aHe: "הוא חושף bottlenecks-חוזרים (למשל Supply Review מאחר תמיד), שמכוונים לאוטמציה/שינוי-תבנית." },
          ],
          takeawaysHe: [
            "Dashboards מצרפים סטטוס וביצועים לתובנות-ניהול.",
            "מדוד cycle-time ו-on-time, לא רק progress.",
            "bottleneck-חוזר = קלט לשיפור-תבנית; ניתן-להטמעה ב-Work Zone.",
          ],
        },
      ],
    },
    // ============================================================ 9.4
    {
      id: "9.4",
      titleHe: "ניהול משימות (Task Management)",
      titleEn: "Task Management",
      execHe:
        "Task Management הוא הצד שבו המשתמש פוגש את התהליך: רשימת-המשימות האישית, השלמתן, והדרך שבה השלמתן מתורגמת ל-progress של המחזור. זהו 'הקומה-האחרונה' של Process Management — איפה הניצוח הופך לעבודה בפועל.",
      beginnerHe:
        "Task Management זה 'רשימת-המטלות שלי' בתוך המחזור: כל משתמש רואה מה מוטל עליו, נכנס לעבוד (לרוב דרך deep-link), ומסמן 'סיימתי'. כל סימון כזה מקדם את המחזור.",
      consultantHe:
        "Task Management חושף לכל משתמש את ה-tasks שהוקצו ל-roles שלו (My Process Steps), עם deep-links ל-planning views, הוראות, ו-completion. השלמה יכולה להתבצע מ-Fiori או מ-SAP IBP Add-In for Microsoft Excel (9.4.2). ה-completion מצטבר ל-step-progress ול-process-progress (9.4.3). זהו ה-touchpoint היומי של הרוב — לכן UX ו-deep-links נכונים קריטיים לאימוץ. ניתן גם לצרוך/לעדכן tasks דרך APIs (9.6).",
      purposeHe:
        "לחבר את המשתמש-הבודד לתהליך-הכולל בצורה פשוטה: לראות מה עליי לעשות, לעשותו במקום-הנכון, ולסמן-בוצע — כך שהתהליך מתקדם מעצמו מהשלמות-ה-tasks.",
      processExampleHe:
        "Demand Planner פותח את My Process Steps, רואה 3 tasks, לוחץ deep-link לכל אחד, עובד ב-planning view, ומסמן completion. עם השלמת השלישי, ה-step נסגר וה-Supply Review נפתח אוטומטית.",
      scenarioHe:
        "בארגון כל מנהל-territory רואה את ה-tasks שלו (תחזית-אזורית, אישור-SKU), משלים אותם — חלקם מתוך ה-Excel Add-In שבו הוא רגיל לעבוד — וההשלמות מצטברות ל-progress של שלב-הביקוש.",
      navHe: [
        "SAP Fiori Launchpad ► Process Management ► My Process Steps",
        "SAP IBP Add-In for Microsoft Excel ► Process Steps / Tasks",
        "(אופציונלי) APIs/OData ► קריאה/עדכון tasks",
      ],
      tables: [],
      tcodes: ["My Process Steps", "Manage Processes"],
      fiori: ["My Process Steps", "Manage Processes"],
      configHe: [
        "כל משתמש רואה tasks שהוקצו ל-roles שלו ב-My Process Steps, עם deep-links והוראות.",
        "Completion מ-Fiori או מ-SAP IBP Add-In for Microsoft Excel.",
        "Completion מצטבר ל-step-progress ול-process-progress.",
      ],
      mistakesHe: [
        "tasks ללא deep-link — המשתמש לא יודע היכן לעבוד.",
        "ריבוי tasks mandatory מיותרים — חיכוך ואיחורים.",
        "התעלמות מ-UX/Excel — אימוץ-נמוך והשלמות-חסרות.",
      ],
      troubleshootHe: [
        "המשתמש לא רואה tasks ➔ role לא ממופה אליו (9.2.1/9.3.2).",
        "completion לא משפיע על progress ➔ ה-task לא נשמר/לא mandatory כצפוי.",
        "deep-link מוביל ל-view שגוי ➔ הגדרת ה-task שגויה (9.2.3).",
      ],
      bestPracticeHe: [
        "הצמד deep-link ישיר לכל task.",
        "תמוך בהשלמה גם מ-Excel Add-In למשתמשים הרגילים בו.",
        "שמור על מספר-tasks סביר לכל role למניעת עומס.",
      ],
      interviewHe: [
        { qHe: "היכן משתמש רואה ומשלים את ה-tasks שלו?", aHe: "ב-My Process Steps (Fiori) או ב-SAP IBP Add-In for Microsoft Excel; ההשלמה מצטברת ל-step ול-process progress." },
        { qHe: "מדוע deep-links חשובים ב-Task Management?", aHe: "הם מובילים את המשתמש ישירות ל-planning view הנכון, מצמצמים טעויות ומגבירים אימוץ — touchpoint יומי." },
      ],
      takeawaysHe: [
        "Task Management = הצד-המשתמש של התהליך.",
        "השלמה מ-Fiori או מ-Excel Add-In; deep-links קריטיים.",
        "Completion מצטבר ל-step/process progress.",
      ],
      children: [
        // -------------------- 9.4.1
        {
          id: "9.4.1",
          titleHe: "הקצאות והשלמות משימות",
          titleEn: "Tasks Assignments and Completions",
          execHe:
            "הקצאה והשלמה הן שני קצות חיי-ה-task: הקצאה מחברת אותו לאדם (דרך role), והשלמה מסמנת שבוצע. ביחד הן הופכות אחריות-מופשטת לתוצאה-מדידה, ומניעות את התקדמות-המחזור.",
          beginnerHe:
            "כל task מחכה לשני דברים: שמישהו יקבל אותו (הקצאה) ושאותו מישהו יסמן 'בוצע' (השלמה). פשוט אבל קריטי — בלי הקצאה אין מי שיעבוד, ובלי השלמה התהליך לא מתקדם.",
          consultantHe:
            "ההקצאה נגזרת מ-role↔user mapping (9.2.1/9.3.2): כל task מוקצה אוטומטית למשתמשי-ה-role. ההשלמה היא event שמסומן ב-Fiori/Excel ונשמר עם timestamp+user (audit). task יכול להיות mandatory (חוסם step-completion) או optional. השלמה יכולה לדרוש פעולת-עבודה (deep-link) או רק אישור. במקרים מסוימים tasks מושלמים אוטומטית עם automation (9.2.4). ניתן לעקוב/לעדכן הקצאות והשלמות דרך APIs (9.6).",
          purposeHe:
            "להבטיח שכל יחידת-עבודה מגיעה לאדם-הנכון ומסומנת-כבוצעה בצורה מתועדת — הבסיס ל-accountability ול-progress.",
          processExampleHe:
            "task 'אשר תחזית' מוקצה אוטומטית ל-Demand Reviewer (לפי role). היא mandatory; ה-reviewer פותח deep-link, סוקר, ומסמן complete; ה-timestamp נשמר, וה-step מתקדם.",
          scenarioHe:
            "בארגון task 'אשר תחזית-פחיות-קיץ' מוקצה למנהל-האזור לפי role; הוא משלים מתוך ה-Excel Add-In, וההשלמה מתועדת עם שמו וזמנה — חיוני ל-audit מול ה-Commercial.",
          navHe: [
            "My Process Steps ► Task ► Complete",
            "Manage Processes ► Process ► Tasks (מעקב הקצאות/השלמות)",
            "(אופציונלי) APIs/OData ► assignments & completions",
          ],
          tables: [],
          tcodes: ["My Process Steps", "Manage Processes"],
          fiori: ["My Process Steps", "Manage Processes"],
          configHe: [
            "הקצאה נגזרת מ-role↔user mapping; כל task מגיע למשתמשי-ה-role.",
            "השלמה = event מסומן (Fiori/Excel) עם timestamp+user ל-audit.",
            "task mandatory חוסם step-completion; optional לא.",
          ],
          flow: [
            { he: "task נוצר ב-step", note: "מקושר ל-role" },
            { he: "הקצאה אוטומטית", note: "role→users" },
            { he: "ביצוע (deep-link)", note: "עבודה ב-view" },
            { he: "completion + timestamp", note: "audit + progress" },
          ],
          mistakesHe: [
            "role לא-ממופה — task לא מוקצה לאיש.",
            "כל task mandatory — חוסם step על מטלות-זניחות.",
            "השלמה 'פורמלית' בלי ביצוע-בפועל — נתונים-שגויים.",
          ],
          troubleshootHe: [
            "task לא מוקצה ➔ role↔user mapping חסר.",
            "step לא נסגר ➔ task mandatory לא-מושלם.",
            "completion לא נשמר ➔ בעיית-הרשאה או חיבור-Excel.",
          ],
          bestPracticeHe: [
            "ודא role-mapping מלא לפני start-מחזור.",
            "סמן mandatory רק את הקריטי.",
            "הסתמך על ה-timestamp/audit לבקרת-ביצוע.",
          ],
          interviewHe: [
            { qHe: "כיצד task מוקצה למשתמש?", aHe: "דרך role↔user mapping — כל task מוקצה אוטומטית למשתמשי-ה-role שהוגדר ל-step/task." },
            { qHe: "מה מבדיל task mandatory מ-optional?", aHe: "mandatory חוסם את step-completion עד שיושלם; optional לא חוסם." },
          ],
          takeawaysHe: [
            "הקצאה (role→user) + השלמה (event מתועד) = חיי-ה-task.",
            "mandatory חוסם step; completion נשמר עם timestamp/audit.",
            "הבסיס ל-accountability ול-progress.",
          ],
        },
        // -------------------- 9.4.2
        {
          id: "9.4.2",
          titleHe: "השלמת משימות מתוך SAP IBP Add-In for Microsoft Excel",
          titleEn: "Tasks Completion from SAP IBP Add-In for Microsoft Excel",
          execHe:
            "מתכננים רבים חיים ב-Excel — וה-SAP IBP Add-In for Microsoft Excel מאפשר להם לראות ולהשלים את ה-tasks שלהם בלי לעזוב את סביבת-העבודה המוכרת. זה מגדיל אימוץ דרמטית: אותו מסך שבו עורכים את התחזית הוא גם המסך שבו מסמנים 'בוצע'.",
          beginnerHe:
            "הרבה מתכננים עובדים ב-Excel דרך התוסף של IBP. במקום לעבור לדפדפן כדי לסמן 'סיימתי', התוסף מראה להם את המשימות שלהם ומאפשר להשלים אותן ישר מתוך Excel — איפה שהם כבר עובדים.",
          consultantHe:
            "ה-Add-In חושף את ה-process steps/tasks הרלוונטיים למשתמש ומאפשר completion מתוך Excel — באותו context של ה-planning view שבו עורכים את ה-key figures. השלמה זו מסונכרנת חזרה ל-Process Management (אותו progress, אותו audit) כמו השלמה מ-Fiori. זה קריטי לאימוץ בקרב planners 'Excel-first'. דורש Add-In מותקן ומחובר ל-tenant הנכון. ה-flow האידיאלי: ערוך תחזית ב-view → save → השלם את ה-task באותו חלון.",
          purposeHe:
            "להוריד את חסם-האימוץ: לאפשר השלמת-tasks בסביבה שבה המתכננים כבר עובדים (Excel), כך שניהול-התהליך משתלב בעבודה במקום להוסיף-עליה.",
          processExampleHe:
            "Demand Planner עורך תחזית ב-planning view בתוך Excel, שומר, ומיד באותו חלון רואה את ה-task 'השלם Demand Review' ומסמן complete; ה-progress ב-Manage Processes מתעדכן מיד.",
          scenarioHe:
            "בארגון מנהלי-ה-territories הם 'Excel-first'; הם עורכים את תחזית-האזור ומשלימים את ה-task מתוך ה-Add-In — בלי לפתוח דפדפן. זה הקפיץ את שיעור-ההשלמה-בזמן של שלב-הביקוש.",
          navHe: [
            "SAP IBP Add-In for Microsoft Excel ► Ribbon ► Process Steps / Tasks",
            "Add-In ► Task ► Complete (מסונכרן ל-Manage Processes)",
          ],
          tables: [],
          tcodes: ["SAP IBP Add-In for Microsoft Excel", "My Process Steps"],
          fiori: ["My Process Steps", "Manage Processes"],
          configHe: [
            "ה-Add-In חושף את ה-tasks הרלוונטיים ומאפשר completion מתוך Excel.",
            "ההשלמה מסונכרנת ל-Process Management (אותו progress/audit כמו Fiori).",
            "דורש Add-In מותקן ומחובר ל-tenant הנכון.",
          ],
          flow: [
            { he: "ערוך key figures ב-view (Excel)", code: "SAP IBP Add-In for Microsoft Excel" },
            { he: "Save", note: "שמירת התחזית" },
            { he: "השלם task באותו חלון", note: "completion" },
            { he: "סנכרון ל-Manage Processes", note: "progress + audit" },
          ],
          mistakesHe: [
            "אילוץ planners 'Excel-first' לעבור ל-Fiori רק כדי לסמן — פוגע באימוץ.",
            "Add-In לא-מעודכן/לא-מחובר — tasks לא מופיעים.",
            "השלמה ב-Excel בלי save — עבודה-לא-נשמרה לצד task-סגור.",
          ],
          troubleshootHe: [
            "tasks לא מופיעים ב-Add-In ➔ גרסת-Add-In ישנה או חיבור ל-tenant שגוי.",
            "completion לא מסונכרן ל-Fiori ➔ בעיית-חיבור/הרשאה.",
            "task נסגר אך התחזית-לא-נשמרה ➔ save לפני completion.",
          ],
          bestPracticeHe: [
            "עודד 'Excel-first' planners להשלים מתוך ה-Add-In.",
            "ודא Add-In מעודכן ומחובר ל-tenant הנכון.",
            "שמור (save) תמיד לפני completion.",
          ],
          interviewHe: [
            { qHe: "מה היתרון בהשלמת tasks מתוך ה-Excel Add-In?", aHe: "Planners 'Excel-first' משלימים tasks בסביבת-העבודה המוכרת בלי לעבור ל-Fiori — אימוץ גבוה והשלמה-בזמן." },
            { qHe: "האם completion מ-Excel שונה מ-Fiori?", aHe: "לא בתוצאה — הוא מסונכרן ל-Process Management עם אותו progress ו-audit; שונה רק ב-touchpoint." },
          ],
          takeawaysHe: [
            "ה-Add-In מאפשר completion מתוך Excel, מסונכרן ל-Process Management.",
            "מגדיל אימוץ בקרב planners 'Excel-first'.",
            "save לפני completion; ודא Add-In מחובר ומעודכן.",
          ],
          relatedHe: [
            { labelHe: "S&OP · הקצאות והשלמות משימות", href: "/library/sop/chapter-09/#sub-9.4.1" },
          ],
        },
        // -------------------- 9.4.3
        {
          id: "9.4.3",
          titleHe: "התקדמות התהליך לפי השלמת משימות",
          titleEn: "Process Progress Based on Tasks Completion",
          execHe:
            "התקדמות-התהליך נגזרת ישירות מהשלמת-ה-tasks: כל task שמושלם מקדם את ה-step, וכל step שנסגר מקדם את ה-process. כך ה-progress אינו הערכה-סובייקטיבית אלא מדד-אובייקטיבי המבוסס על עבודה-שבוצעה-בפועל.",
          beginnerHe:
            "כמה אחוז מהמחזור 'בוצע'? התשובה לא מנוחשת — היא מחושבת מכמה tasks סומנו 'בוצע'. השלמת-task = חתיכה-מהפאזל; כשכל החתיכות של step מושלמות, ה-step ירוק, וכך מתמלא ה-progress של המחזור כולו.",
          consultantHe:
            "ה-progress מתגלגל מלמטה-למעלה: task-completion → step-progress → process-progress, כש-mandatory tasks הם הקובעים ל-step-completion. ניתן לשקלל לפי מספר-tasks או לפי משך-step. ה-progress מוצג ב-Manage Processes, ב-Gantt וב-dashboards (9.3.5), ונחשף דרך APIs (9.6). מכיוון שה-progress אובייקטיבי, הוא בסיס-אמין ל-cycle-time, on-time-rate ו-bottleneck-analysis. תכנון-tasks נכון (9.2.3) הוא תנאי ל-progress בעל-משמעות.",
          purposeHe:
            "לספק מדד-התקדמות אובייקטיבי ושקוף המבוסס על עבודה-שהושלמה — הבסיס לניטור (9.3.4), ל-dashboards (9.3.5) ולשיפור-מחזורי.",
          processExampleHe:
            "step עם 4 mandatory tasks: השלמת 2 = 50% step-progress; השלמת כולם = step complete. process עם 5 steps: סגירת 3 ≈ 60% process-progress (משוקלל לפי משך). ה-Gantt וה-dashboard משקפים זאת בזמן-אמת.",
          scenarioHe:
            "בארגון שלב-הביקוש מורכב מ-task לכל territory; השלמת 8 מתוך 10 territories = 80% step-progress. ה-VP רואה במדויק כמה נותר לפני שלב-האיחוד יכול להתחיל.",
          navHe: [
            "Manage Processes ► Process ► Progress / Gantt",
            "Process Dashboard ► Progress KPIs",
            "(אופציונלי) APIs/OData ► שליפת progress",
          ],
          tables: [],
          tcodes: ["Manage Processes"],
          fiori: ["Manage Processes", "Process Dashboard"],
          configHe: [
            "Progress מתגלגל: task-completion → step-progress → process-progress.",
            "mandatory tasks קובעים step-completion; שקלול לפי מספר-tasks או משך-step.",
            "מוצג ב-Manage Processes/Gantt/dashboards ונחשף דרך APIs.",
          ],
          flow: [
            { he: "task complete", note: "יחידת-עבודה" },
            { he: "step-progress עולה", note: "mandatory tasks" },
            { he: "step complete", note: "כל ה-mandatory" },
            { he: "process-progress עולה", note: "משוקלל לפי משך" },
          ],
          mistakesHe: [
            "תכנון-tasks גרוע (9.2.3) — progress חסר-משמעות.",
            "סימון tasks 'בוצע' בלי ביצוע — progress-מנופח ושגוי.",
            "פרשנות progress כ-cycle-time — הם מדדים שונים.",
          ],
          troubleshootHe: [
            "progress לא-מתקדם למרות עבודה ➔ tasks לא סומנו complete או לא-mandatory.",
            "progress 'קופץ' לא-הגיוני ➔ שקלול לפי משך מול מספר לא-מובן.",
            "אי-התאמה בין Gantt ל-dashboard ➔ מחזורים-לא-סגורים מזהמים אגרגציה.",
          ],
          bestPracticeHe: [
            "תכנן tasks אטומיים כדי שה-progress יהיה מדויק.",
            "השתמש ב-progress כקלט ל-cycle-time ול-on-time, לא כתחליף.",
            "ודא שכל ה-mandatory tasks אכן הכרחיים.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושבת התקדמות-התהליך?", aHe: "מתגלגלת מלמטה: task-completion → step-progress → process-progress, כש-mandatory tasks קובעים step-completion (שקלול לפי מספר/משך)." },
            { qHe: "מדוע progress הוא מדד-אובייקטיבי?", aHe: "הוא נגזר מ-tasks שהושלמו-בפועל ולא מהערכה — ולכן בסיס-אמין ל-cycle-time ו-bottleneck-analysis." },
          ],
          takeawaysHe: [
            "Progress מתגלגל: task→step→process.",
            "mandatory tasks קובעים step-completion.",
            "מדד-אובייקטיבי — בסיס לניטור, dashboards ושיפור.",
          ],
        },
      ],
    },
    // ============================================================ 9.5
    {
      id: "9.5",
      titleHe: "ניהול תהליך עם SAP Build Work Zone",
      titleEn: "Process Management with SAP Build Work Zone",
      execHe:
        "SAP Build Work Zone מספק חוויית-משתמש מאוחדת שמרכזת את כל ניהול-התהליך — tasks, סטטוס, dashboards והתראות — במקום-עבודה-דיגיטלי אחד. במקום שמשתמשים יקפצו בין אפליקציות, הם מקבלים feed אישי של 'מה עליי לעשות עכשיו' ב-S&OP, משולב עם תוכן-ארגוני נוסף.",
      beginnerHe:
        "Work Zone הוא כמו 'דף-הבית הארגוני': מסך אחד שמרכז את כל מה שחשוב לך — המשימות שלך ב-S&OP, מצב-המחזור, הודעות וקישורים. במקום לזכור לאיזו אפליקציה להיכנס, הכול מגיע אליך למקום אחד.",
      consultantHe:
        "SAP Build Work Zone מטמיע את אפליקציות ותוכן ה-Process Management כ-cards/sections בתוך portal מאוחד: My Process Steps, סטטוס-מחזור, Process Dashboards, והתראות-overdue — לצד תוכן-ארגוני (חדשות, מסמכים). האינטגרציה דרך embedding של Fiori apps ו/או צריכת ה-APIs (9.6) להזנת cards. זה משפר אימוץ ע\"י personalization (feed לפי role) ו-single-entry-point. דורש הקמת Work Zone והקצאת התוכן ל-roles. ערך-המפתח: הפיכת ניהול-התהליך מ'אפליקציה שצריך לזכור' ל'מקום-עבודה שמגיע אליך'.",
      purposeHe:
        "לאחד את חוויית ניהול-התהליך במקום-עבודה-דיגיטלי אחד ומותאם-אישית — להגדיל אימוץ, לצמצם חיכוך-ניווט, ולשלב את ה-S&OP בזרימת-העבודה היומית הרחבה.",
      processExampleHe:
        "משתמש פותח את Work Zone בבוקר ורואה card 'My S&OP Tasks (3 open)', card 'Cycle Status 70%', והתראה 'Supply Review overdue'. בלחיצה הוא מגיע ישירות ל-task — בלי לחפש את האפליקציה הנכונה.",
      scenarioHe:
        "בארגון ה-Work Zone הוא דף-הבית של כל ה-planners; מנהל-territory רואה את ה-tasks האזוריים שלו, את מצב מחזור-הקיץ, ואת ה-dashboard — לצד חדשות-החברה — והכול מותאם ל-role שלו.",
      navHe: [
        "SAP Build Work Zone ► Home ► Process Management cards/sections",
        "SAP Build Work Zone ► Workspace ► embedded Fiori (My Process Steps / Manage Processes)",
        "(אופציונלי) APIs/OData ► הזנת cards של סטטוס/tasks",
      ],
      tables: [],
      tcodes: ["My Process Steps", "Manage Processes"],
      fiori: ["My Process Steps", "Manage Processes", "Process Dashboard"],
      configHe: [
        "הטמע את אפליקציות/תוכן ה-Process Management כ-cards/sections ב-Work Zone.",
        "אינטגרציה דרך embedding של Fiori apps ו/או צריכת APIs להזנת cards.",
        "הקצה תוכן ל-roles ל-personalization (feed לפי role).",
      ],
      mistakesHe: [
        "הטמעה ללא personalization — feed כללי שלא רלוונטי לכל role.",
        "כפילות תוכן בין Work Zone ל-Fiori בלי deep-links — בלבול.",
        "התעלמות מהרשאות — משתמשים רואים cards שאינם שלהם.",
      ],
      troubleshootHe: [
        "card ריק ➔ ה-API/embedding לא מחובר או חוסר-הרשאה.",
        "feed לא-רלוונטי ➔ תוכן לא הוקצה לפי role.",
        "קישור מ-card מוביל לשגוי ➔ embedding/deep-link שגוי.",
      ],
      bestPracticeHe: [
        "התאם את ה-feed לכל role לאימוץ-מרבי.",
        "השתמש ב-Work Zone כ-single-entry-point ל-S&OP.",
        "שלב dashboards (9.3.5) ו-My Process Steps באותו דף.",
      ],
      interviewHe: [
        { qHe: "מה מוסיף SAP Build Work Zone לניהול-התהליך?", aHe: "מקום-עבודה-דיגיטלי מאוחד ומותאם-אישית שמרכז tasks, סטטוס, dashboards והתראות — single-entry-point שמגדיל אימוץ." },
        { qHe: "כיצד Work Zone מתחבר ל-Process Management?", aHe: "דרך embedding של ה-Fiori apps ו/או צריכת ה-APIs (9.6) להזנת cards של סטטוס ו-tasks." },
      ],
      takeawaysHe: [
        "Work Zone = חוויית-משתמש מאוחדת ל-Process Management.",
        "cards/sections מותאמים ל-role; single-entry-point.",
        "אינטגרציה דרך embedding ו/או APIs.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Process Dashboards", href: "/library/sop/chapter-09/#sub-9.3.5" },
        { labelHe: "S&OP · APIs לניהול-תהליך", href: "/library/sop/chapter-09/#sub-9.6" },
      ],
    },
    // ============================================================ 9.6
    {
      id: "9.6",
      titleHe: "APIs לניהול תהליך",
      titleEn: "APIs for Process Management",
      execHe:
        "ה-APIs של Process Management חושפים את התהליך לאינטגרציה ולאוטומציה תכנותית: יצירת processes, קריאת/עדכון tasks וסטטוס, וניהול lifecycle — הכול דרך ממשקי OData. הם הופכים את ניהול-התהליך מ'אפליקציה ידנית' ל-platform שניתן לשלב בכל מערכת ולתזמן אוטומטית.",
      beginnerHe:
        "API הוא 'דלת-תכנותית' למערכת: במקום שאדם ילחץ כפתורים, תוכנית אחרת יכולה 'לבקש' מ-IBP ליצור מחזור, לשאול 'מה הסטטוס?', או לסמן task. כך אפשר לחבר את ניהול-התהליך לאוטומציות ולמערכות אחרות.",
      consultantHe:
        "Process Management ב-IBP נחשף דרך OData APIs (חלק מ-SAP IBP integration APIs) המאפשרים: create/read process instances, read/update steps & tasks, query status/progress, ו-lifecycle actions. ה-APIs מבוססי-REST/OData, מאובטחים (OAuth/basic לפי ה-tenant), ומתועדים ב-SAP API Business Hub. שימושים: יצירת ה-process החודשי אוטומטית, הזנת dashboards חיצוניים, אינטגרציה עם SAP Build Work Zone (9.5) או עם middleware (CPI). חשוב להבחין בין ה-Process Management APIs ל-planning-data APIs (key figures) — הם domains נפרדים. נהל גרסאות-API ו-rate-limits.",
      purposeHe:
        "לאפשר אוטומציה ואינטגרציה תכנותית מלאה של ניהול-התהליך — יצירה, ניטור ועדכון מתוכניות/מערכות חיצוניות — מעבר למה שניתן ידנית ב-Fiori.",
      processExampleHe:
        "job חיצוני (CPI) קורא ל-OData API ב-1 לחודש ליצירת ה-process 'S&OP' מהתבנית, ממפה roles אוטומטית, ומפעיל אותו; dashboard חיצוני קורא מדי-בוקר את status/progress דרך אותו API ומציג אותו להנהלה.",
      scenarioHe:
        "בארגון ה-IT מאוטמט את כל מחזור-הפתיחה: API יוצר את ה-process החודשי, ממפה את מנהלי-ה-territories, ומפעיל את ה-orchestration; פורטל-הנהלה חיצוני שואב progress דרך ה-API להצגה לדירקטוריון.",
      navHe: [
        "SAP API Business Hub ► SAP IBP ► Process Management OData APIs",
        "SAP IBP ► Communication Arrangements/Scenarios ► Process Management API",
        "(integration) SAP Integration Suite (CPI) ► OData call ► IBP Process Management",
      ],
      tables: [],
      tcodes: ["OData", "APIs", "Communication Arrangements"],
      fiori: ["Manage Processes", "Communication Arrangements"],
      configHe: [
        "OData APIs: create/read processes, read/update steps & tasks, query status/progress, lifecycle actions.",
        "מאובטחים (OAuth/basic לפי tenant) ומתועדים ב-SAP API Business Hub.",
        "הפרד בין Process Management APIs ל-planning-data APIs (domains שונים); נהל versions ו-rate-limits.",
      ],
      flow: [
        { he: "Auth ל-OData API", code: "OData", note: "OAuth/basic" },
        { he: "Create process from template", code: "APIs" },
        { he: "Read/Update tasks & status", note: "אינטגרציה" },
        { he: "Lifecycle action", note: "complete/stop תכנותי" },
      ],
      mistakesHe: [
        "בלבול בין Process Management APIs ל-key-figure APIs — domains שונים.",
        "התעלמות מ-rate-limits/versions — שבירת-אינטגרציה בשדרוג.",
        "אבטחה רופפת ל-credentials של ה-API.",
      ],
      troubleshootHe: [
        "קריאת-API נכשלת (401/403) ➔ auth/Communication Arrangement שגוי או חוסר-הרשאה.",
        "process לא נוצר דרך API ➔ template/scope/roles חסרים ב-payload.",
        "סטטוס לא-מעודכן בצרכן ➔ הצרכן קורא endpoint/גרסה שגויים.",
      ],
      bestPracticeHe: [
        "השתמש ב-Communication Arrangements ובאבטחה תקנית (OAuth).",
        "אוטמט יצירת-process וניטור דרך ה-APIs לעקביות.",
        "עקוב אחר versions ו-rate-limits; תעד את האינטגרציה.",
      ],
      interviewHe: [
        { qHe: "מה מאפשרים ה-APIs של Process Management?", aHe: "יצירה/קריאה של processes, קריאה/עדכון steps & tasks, שאילתת status/progress, ו-lifecycle actions — דרך OData, לאוטומציה ואינטגרציה." },
        { qHe: "מהי ההבחנה בין Process Management APIs ל-planning-data APIs?", aHe: "הם domains נפרדים: ה-Process Management APIs מנהלים את התהליך (processes/steps/tasks), בעוד planning-data APIs קוראים/כותבים key figures." },
      ],
      takeawaysHe: [
        "OData APIs חושפים create/read/update/lifecycle של התהליך.",
        "מאפשרים אוטומציה ואינטגרציה (CPI, Work Zone, dashboards).",
        "נפרדים מ-planning-data APIs; נהל auth, versions ו-rate-limits.",
      ],
      relatedHe: [
        { labelHe: "S&OP · יצירת תהליך", href: "/library/sop/chapter-09/#sub-9.3.2" },
        { labelHe: "S&OP · ניהול-תהליך עם Work Zone", href: "/library/sop/chapter-09/#sub-9.5" },
      ],
    },
    // ============================================================ 9.7
    {
      id: "9.7",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את Process Management כמנוע-הניצוח של מחזור ה-S&OP ב-SAP IBP: מ-process template (ההגדרה) דרך Manage Processes (ההרצה), Task Management (העבודה), חוויית SAP Build Work Zone, ועד ל-APIs לאוטומציה. הלקח-המרכזי: S&OP מצליח לא רק בזכות מודלים-טובים אלא בזכות תהליך-מנוהל, מדיד וניתן-לשיפור.",
      beginnerHe:
        "סיכמנו את כל 'הניצוח' של המחזור החודשי: איך מגדירים תבנית פעם-אחת, איך מריצים אותה כל חודש, איך כל אחד רואה ומשלים את המשימות שלו, איך עוקבים אחר ההתקדמות, ואיך מאחדים הכול ב-Work Zone או מאוטמטים דרך APIs. ביחד זה הופך תכנון-מבולגן לתהליך-מסודר.",
      consultantHe:
        "מבט-על מאחד: (1) ה-process template מקודד steps/roles/durations/automations עם sequential+parallel ו-Gantt; (2) automations ו-orchestration של application jobs מריצים את ה-data-pipeline; (3) Manage Processes יוצר ומנהל instances ומחזור-חייהם; (4) Task Management — מ-Fiori ומ-Excel Add-In — מניע progress אובייקטיבי; (5) dashboards מודדים cycle-time ו-bottlenecks לשיפור-מחזורי; (6) SAP Build Work Zone מאחד את החוויה; (7) APIs/OData חושפים הכול לאוטומציה ואינטגרציה. עקרון-העל: התחל פשוט, מדוד מהמחזור-הראשון, ושכלל את התבנית בין-מחזורים.",
      purposeHe:
        "לחבר את כל המקטעים לתמונה-אחת ולספק checklist-מנטלי ליישום Process Management — כך שהקורא יוכל לתכנן, להריץ, למדוד ולשפר מחזור-S&OP בלי הספר.",
      processExampleHe:
        "יישום מלא: הגדר template (steps+roles+durations+automations) → אמת ב-Gantt → צור instance חודשי (ידנית/API) → הרץ עם automations+orchestration → משתמשים משלימים tasks (Fiori/Excel) → נטר ב-Manage Processes → מדוד ב-dashboard → שכלל את התבנית למחזור-הבא.",
      scenarioHe:
        "בארגון המסע השלם: תבנית-S&OP אחת לכל ה-territories, orchestration לילי של sell-out→forecast→snapshot, השלמת-tasks אזורית מ-Excel, ניטור-VP ב-Work Zone, מדידת cycle-time ב-dashboard, ואוטומציית-פתיחה חודשית דרך API — מחזור הדוק, מדיד ומשתפר.",
      navHe: [
        "Process Templates ► Manage Processes ► My Process Steps ► Process Dashboard",
        "SAP Build Work Zone ► Process Management cards",
        "SAP API Business Hub ► Process Management OData APIs",
      ],
      tables: [],
      tcodes: ["Process Templates", "Manage Processes", "My Process Steps", "Application Jobs"],
      fiori: ["Process Templates", "Manage Processes", "My Process Steps", "Process Dashboard"],
      configHe: [
        "Template (steps/roles/durations/automations) → instances (Manage Processes) → tasks → dashboards.",
        "automations+orchestration של application jobs מריצים את ה-pipeline.",
        "Work Zone מאחד את החוויה; APIs/OData חושפים לאוטומציה.",
      ],
      flow: [
        { he: "Define template", code: "Process Templates" },
        { he: "Create + run instance", code: "Manage Processes" },
        { he: "Complete tasks", code: "My Process Steps", note: "Fiori/Excel" },
        { he: "Measure + improve", code: "Process Dashboard" },
      ],
      mistakesHe: [
        "השקעה במודלים בלי השקעה בתהליך — S&OP-לא-ממושל.",
        "אי-מדידת cycle-time מהמחזור-הראשון — אין baseline לשיפור.",
        "תבנית מורכבת-מדי מההתחלה במקום iteration.",
      ],
      troubleshootHe: [
        "המחזור לא מתקדם ➔ tasks/automations פתוחים או roles לא-ממופים.",
        "מדדים לא-אמינים ➔ מחזורים-פתוחים-לשווא או due-dates שגויים.",
        "אימוץ-נמוך ➔ חסרים deep-links/Excel/Work Zone.",
      ],
      bestPracticeHe: [
        "התחל פשוט, מדוד, ושכלל את התבנית בין-מחזורים.",
        "אוטמט מה-שדטרמיניסטי (jobs/orchestration/API), השאר שיקול-דעת לאדם.",
        "פגוש את המשתמשים היכן-שהם (Excel/Work Zone) להעלאת אימוץ.",
      ],
      interviewHe: [
        { qHe: "מהם שבעת אבני-הבניין של Process Management ב-IBP?", aHe: "process template, automations, orchestration של application jobs, Manage Processes (instances+lifecycle), Task Management, dashboards, ו-SAP Build Work Zone + APIs." },
        { qHe: "מהו עקרון-העל ליישום מוצלח?", aHe: "התחל פשוט, מדוד cycle-time מהמחזור-הראשון, אוטמט את הדטרמיניסטי, פגוש משתמשים היכן-שהם, ושכלל את התבנית בין-מחזורים." },
      ],
      takeawaysHe: [
        "Process Management = הניצוח המדיד של מחזור ה-S&OP.",
        "template→instance→tasks→dashboards, עם automations/orchestration ו-APIs.",
        "התחל פשוט, מדוד, ושפר; פגוש משתמשים ב-Excel/Work Zone.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ניהול-תהליך הלכה-למעשה", href: "/library/sop/chapter-09/#sub-9.1" },
        { labelHe: "S&OP · APIs לניהול-תהליך", href: "/library/sop/chapter-09/#sub-9.6" },
      ],
    },
  ],
};
