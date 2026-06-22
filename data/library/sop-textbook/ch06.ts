// ===== S&OP with SAP IBP — Chapter 6 (gold-standard learning chapter) =====
// Consolidation: Integrated Reconciliation, Executive Review, and operationalizing
// the approved constrained plan. Every node is a complete LearningNode with 18
// facets of authored Hebrew (beginner + consultant friendly). SAP object names
// kept verbatim in English. CBC = Coca-Cola bottling S&OP context.
import type { TextbookChapter } from "./types";

export const CH6: TextbookChapter = {
  n: 6,
  titleHe: "איחוד (Consolidation)",
  titleEn: "Consolidation",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשלב האיחוד (Consolidation) בתהליך ה-S&OP ב-SAP IBP. כאן כל זרמי-התכנון — ביקוש, היצע, מלאי וכספים — מתכנסים לתוכנית-אחת מאוזנת ומאושרת. השלב מורכב משני מפגשים מרכזיים: Integrated Reconciliation (איחוד התכניות מכלל המחלקות ופתרון פערים) ו-Executive Review (אישור התוכנית המוגבלת על-ידי ההנהלה הבכירה), ולאחריהם Operationalize — תרגום התוכנית המאושרת לפעולה דרך אינטגרציה ל-IBP for Demand, IBP for Inventory, IBP for Response ול-Financial Planning. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC, ניווט באפליקציות IBP, אובייקטים וטבלאות, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את שלב האיחוד ב-S&OP מקצה-לקצה ללא תלות בספר המקורי.",
  subchapters: [
    // ============================================================ 6.1
    {
      id: "6.1",
      titleHe: "מבט-על על האיחוד (Consolidation at a Glance)",
      titleEn: "Consolidation at a Glance",
      execHe:
        "שלב האיחוד הוא נקודת-ההתכנסות של מחזור ה-S&OP החודשי: כל התכניות שנבנו בשלבי הביקוש, ההיצע, המלאי והכספים מתאחדות לתוכנית-עסקית-אחת. שני מפגשים מבניים מובילים אותו — Integrated Reconciliation לאיזון בין-מחלקתי, ו-Executive Review לאישור. הפלט הוא תוכנית מוגבלת מאושרת (Approved Constrained Plan) שהופכת למחייבת לכל הארגון.",
      beginnerHe:
        "דמיין שכל מחלקה הכינה תחזית משלה: השיווק חזה ביקוש, התפעול חישב יכולת-ייצור, הכספים תרגם להכנסות. עכשיו צריך לשבת ולאחד הכל למספר אחד שכולם מסכימים עליו. זה בדיוק שלב האיחוד — קודם פותרים פערים (Integrated Reconciliation), ואז ההנהלה מאשרת (Executive Review). אחרי האישור, התוכנית כבר לא 'הצעה' — היא הופכת לתוכנית-העבודה הרשמית.",
      consultantHe:
        "ב-IBP for Sales and Operations שלב האיחוד נשען על Planning Area יחיד עם Key Figures משותפים, על Scenarios להשוואת חלופות, ועל Process Management/Case Management לתיעוד ההחלטות. ה-Integrated Reconciliation מבוצע ברובו ב-Excel Add-In ובדשבורדים של IBP (Analytics), בעוד ה-Executive Review מסתמך על Dashboards מנהליים ועל גרסת-בסיס (baseline) מוקפאת לצורך ביקורת. החלטה קריטית: לסמן את הגרסה המאושרת כ-Consensus/Final Key Figure שתשמש כמקור-האמת ל-downstream (Demand, Response, Finance).",
      purposeHe:
        "המטרה היא ליצור תוכנית-עסקית-אחת, מאוזנת ומאושרת, המגשרת בין הרצוי (ביקוש) למצוי (יכולת והיצע), ומתורגמת לערך-כספי. ללא איחוד, כל מחלקה פועלת לפי מספר משלה — מה שמוביל לעודפי-מלאי, מחסור, או יעדים פיננסיים לא-ריאליים.",
      processExampleHe:
        "במחזור החודשי, מנהל ה-S&OP אוסף את תחזית-הביקוש המוסכמת ואת תוכנית-ההיצע המוגבלת, מזהה פער של 5% בין הביקוש לקיבולת בקטגוריה מסוימת, מציג שלושה Scenarios (תוספת-משמרת, מיקור-חוץ, דחיית-מבצע), ומביא אותם ל-Integrated Reconciliation. שם נבחר תרחיש, ולאחר מכן ה-Executive Review מאשר אותו כתוכנית מחייבת.",
      cbcHe:
        "ב-CBC (מבקבקת Coca-Cola): לקראת עונת-הקיץ, תחזית-הביקוש למשקאות-קלים עולה ב-20%, אך קיבולת קווי-המילוי מוגבלת. מפגש ה-Consensus מאחד את ביקוש-השיווק עם יכולת-התפעול, וה-Executive Review מחליט על הקצאת-עדיפויות בין מותגי-הליבה למותגי-נישה — והופך זאת לתוכנית מאושרת לרבעון.",
      navHe: [
        "SAP IBP for Sales and Operations ► Dashboards ► S&OP Process Cockpit",
        "SAP IBP ► Process Management ► Process Modeling (הגדרת שלבי Reconciliation ו-Review)",
        "SAP IBP Excel Add-In ► Planning View ► Consensus Demand / Constrained Supply Key Figures",
      ],
      tables: ["Planning Area", "Key Figure", "Scenario", "Version", "Process Step"],
      tcodes: ["IBP Web UI", "IBP Excel Add-In", "Process Management"],
      fiori: ["Dashboards (Advanced)", "Manage Process", "My Process Steps"],
      configHe: [
        "Planning Area יחיד עם Key Figures לכל זרם: Demand, Constrained Supply, Inventory, Financials — בסיס לאיחוד.",
        "Process Management: הגדרת Process Template עם שני שלבים — Integrated Reconciliation ו-Executive Review, עם אחראים ו-deadlines.",
        "Versions/Scenarios: גרסת-בסיס (baseline) להשוואה, ו-Scenarios לחלופות שמובאות לדיון.",
        "Consensus Key Figure המסומן כמקור-האמת לאחר אישור.",
      ],
      flow: [
        { he: "תכניות מכל הזרמים מוכנות", code: "Demand/Supply/Inv/Fin" },
        { he: "איחוד ופתרון פערים", code: "Integrated Reconciliation" },
        { he: "אישור הנהלה", code: "Executive Review" },
        { he: "תוכנית מוגבלת מאושרת", code: "Approved Constrained Plan" },
        { he: "תרגום לפעולה", code: "Operationalize" },
      ],
      masterDataHe: [
        "Consensus Demand Key Figure · Constrained Supply Key Figure · Approved Plan Version.",
        "Product / Location / Customer Master כבסיס למימדי-התכנון המשותפים.",
      ],
      mistakesHe: [
        "ניהול האיחוד בגיליונות-Excel חיצוניים במקום ב-IBP — אובדן מקור-אמת אחד.",
        "אישור תוכנית ללא הקפאת-גרסה (baseline) — אי-אפשר לבקר מה אושר בפועל.",
        "ערבוב ביקוש לא-מוגבל (unconstrained) עם תוכנית מוגבלת באותו Key Figure.",
        "דילוג על ה-Integrated Reconciliation ומעבר ישיר ל-Executive Review — אין למה ההנהלה לאשר.",
      ],
      troubleshootHe: [
        "ההנהלה רואה מספרים שונים מהתפעול ➔ ודא Key Figure אחיד וגרסה אחת מוצגת לכולם.",
        "פער לא-מוסבר בין ביקוש להיצע ➔ בדוק שה-Constrained Supply עודכן אחרי ריצת ה-Supply Planning.",
        "החלטות לא מתועדות ➔ הפעל Case Management/Process Management לתיעוד.",
        "downstream מקבל תוכנית ישנה ➔ ודא שה-Consensus/Approved Key Figure עודכן ושותף.",
      ],
      bestPracticeHe: [
        "נהל את כל שלב האיחוד בתוך IBP — דשבורד אחד, גרסה אחת, מקור-אמת אחד.",
        "הקפא baseline לפני כל מפגש כדי לאפשר השוואה וביקורת.",
        "הבא ל-Reconciliation 2–3 Scenarios ברורים, לא רשימה אינסופית.",
        "תעד כל החלטה ב-Process Management עם אחראי ותאריך.",
      ],
      interviewHe: [
        { qHe: "מהו שלב האיחוד (Consolidation) ב-S&OP?", aHe: "השלב שבו כל תכניות-הזרמים (ביקוש, היצע, מלאי, כספים) מתאחדות לתוכנית-עסקית-אחת, דרך Integrated Reconciliation (איזון) ו-Executive Review (אישור), עד לתוכנית מוגבלת מאושרת." },
        { qHe: "מה ההבדל בין Integrated Reconciliation ל-Executive Review?", aHe: "Reconciliation מאזן בין-מחלקתי ופותר פערים ברמת-עבודה; Executive Review הוא מפגש-הנהלה לאישור התוכנית והכרעות-עדיפויות אסטרטגיות." },
        { qHe: "מהו Approved Constrained Plan?", aHe: "התוכנית המוגבלת (ביכולת ובהיצע) שאושרה על-ידי ההנהלה והפכה מחייבת — מקור-האמת ל-downstream." },
      ],
      takeawaysHe: [
        "האיחוד מכנס את כל הזרמים לתוכנית-אחת מאושרת.",
        "שני מפגשים: Integrated Reconciliation ואז Executive Review.",
        "הפלט: Approved Constrained Plan כמקור-אמת מחייב.",
        "נהל הכל ב-IBP עם גרסה אחת ותיעוד-החלטות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תכנון ביקוש", href: "/library/sop/chapter-04/" },
        { labelHe: "S&OP · תכנון היצע", href: "/library/sop/chapter-05/" },
      ],
      children: [
        {
          id: "6.1.1",
          titleHe: "סקירת האיחוד המשולב (Integrated Reconciliation Review)",
          titleEn: "Integrated Reconciliation Review",
          execHe:
            "ה-Integrated Reconciliation Review הוא המפגש שבו תכניות-הביקוש, ההיצע, המלאי והכספים מובאות לשולחן-אחד, הפערים ביניהן מזוהים, וחלופות-פתרון נדונות ומומלצות. זהו 'מטבח-העבודה' של האיחוד — כאן נסגרים הפערים לפני שהתוכנית עולה להנהלה.",
          beginnerHe:
            "זה המפגש שבו נציגי כל המחלקות יושבים יחד ובודקים: האם הביקוש שווה ליכולת? האם המלאי מספיק? האם זה עומד ביעדים הכספיים? כל מקום שבו המספרים לא מסתדרים נקרא 'פער', ובמפגש הזה מציעים דרכים לסגור אותו — לפני שמביאים את התוכנית להנהלה לאישור.",
          consultantHe:
            "ב-IBP המפגש מתבסס על Dashboards המציגים את כל ה-Key Figures זה-לצד-זה (Demand vs Constrained Supply vs Target Inventory vs Financial Plan), על Alerts (Custom Alerts) לזיהוי-אוטומטי של פערים, ועל Scenarios להצגת חלופות. ה-Reconciliation אינו רק תצוגה — בו נקבע איזה Scenario הופך למומלץ (Recommended), עם תיעוד ב-Case Management. הפלט הוא תוכנית-מומלצת מאוזנת המוכנה ל-Executive Review.",
          purposeHe:
            "לסגור פערים בין-מחלקתיים ברמת-העבודה כך שה-Executive Review יעסוק בהכרעות אסטרטגיות בלבד, לא בטכניקה. המפגש מבטיח שהתוכנית שמגיעה להנהלה כבר מאוזנת ופנימית-עקבית.",
          processExampleHe:
            "מנהל ה-S&OP מציג דשבורד עם פער של 8% בין ביקוש לקיבולת ברבעון הבא. Custom Alert סימן את הפער מראש. שלושה Scenarios מוצגים: תוספת-משמרת (+עלות), מיקור-חוץ (+lead time), ודחיית-מבצע (-הכנסות). הצוות ממליץ על מיקור-חוץ חלקי ומתעד את ההמלצה.",
          cbcHe:
            "ב-CBC: צוות ה-Reconciliation מזהה שביקוש-הקיץ למשקה-דגל עולה על קיבולת קו-המילוי. מוצגים תרחישים — העברת-ייצור למפעל-אחות, תוספת-משמרת-לילה, או הקטנת מותגי-נישה — והצוות ממליץ על שילוב, לקראת ה-Executive Review.",
          navHe: [
            "SAP IBP for Sales and Operations ► Dashboards ► Reconciliation Dashboard",
            "SAP IBP ► Analytics ► Charts (Demand vs Supply vs Inventory vs Financials)",
            "SAP IBP ► Alerts ► Custom Alerts (Gap Alerts) · Case Management",
          ],
          tables: ["Key Figure", "Scenario", "Custom Alert", "Case", "Dashboard"],
          tcodes: ["IBP Web UI", "Analytics", "Excel Add-In"],
          fiori: ["Dashboards (Advanced)", "Custom Alerts", "Manage Cases"],
          configHe: [
            "Dashboard ייעודי המציג בו-זמנית Consensus Demand, Constrained Supply, Target/Projected Inventory ו-Financial Plan.",
            "Custom Alerts לזיהוי פערים אוטומטי (למשל Demand > Supply מעבר לסף).",
            "Scenarios שמורים לכל חלופה, להשוואה זו-מול-זו בדשבורד.",
            "Case Management לתיעוד הפער, החלופות וההמלצה.",
          ],
          flow: [
            { he: "הצגת כל ה-Key Figures יחד", code: "Reconciliation Dashboard" },
            { he: "זיהוי פערים", code: "Custom Alerts" },
            { he: "בניית חלופות", code: "Scenarios" },
            { he: "המלצה מתועדת", code: "Case Management" },
            { he: "מוכן ל-Executive Review", code: "Recommended Plan" },
          ],
          masterDataHe: [
            "Consensus Demand · Constrained Supply · Target Inventory · Financial Plan Key Figures.",
            "Scenario Versions לכל חלופה.",
          ],
          mistakesHe: [
            "הצגת כל Key Figure במסך נפרד — אי-אפשר לראות את הפער.",
            "הבאת עשרות Scenarios — שיתוק-החלטה במקום מיקוד.",
            "אי-תיעוד ההמלצה — ה-Executive Review מתחיל מאפס.",
            "התבססות על מספרים ישנים שלא רוענו אחרי ריצת-התכנון.",
          ],
          troubleshootHe: [
            "פער מוצג אך לא ברור מקורו ➔ פרק (drill-down) לפי Product/Location בדשבורד.",
            "Alert לא נדלק על פער ידוע ➔ בדוק הגדרת-סף ב-Custom Alert.",
            "Scenario לא מציג שינוי ➔ ודא שהחישוב (calculation/snapshot) הורץ עליו.",
            "המלצה אבדה בין מפגשים ➔ נהל ב-Case Management ולא במייל.",
          ],
          bestPracticeHe: [
            "דשבורד-אחד שמציג את כל הזרמים זה-לצד-זה.",
            "הגבל ל-2–3 Scenarios איכותיים.",
            "השתמש ב-Custom Alerts כדי להגיע למפגש עם הפערים כבר ממופים.",
            "תעד פער+חלופות+המלצה ב-Case לכל סעיף.",
          ],
          interviewHe: [
            { qHe: "מה מטרת ה-Integrated Reconciliation Review?", aHe: "לאחד את תכניות כל הזרמים, לזהות פערים ולגבש המלצה מאוזנת לפני ה-Executive Review." },
            { qHe: "כיצד IBP תומך בזיהוי פערים?", aHe: "דרך Dashboards המציגים Key Figures יחד ו-Custom Alerts המסמנים פערים אוטומטית מעבר לסף מוגדר." },
          ],
          takeawaysHe: [
            "Reconciliation = איזון בין-מחלקתי ברמת-עבודה.",
            "Dashboards + Custom Alerts + Scenarios הם הכלים.",
            "הפלט: תוכנית-מומלצת מאוזנת ל-Executive Review.",
          ],
          relatedHe: [{ labelHe: "S&OP · Executive Review", href: "/library/sop/chapter-06/#sub-6.1.2" }],
        },
        {
          id: "6.1.2",
          titleHe: "סקירת ההנהלה (Executive Review)",
          titleEn: "Executive Review",
          execHe:
            "ה-Executive Review הוא מפגש-ההנהלה הבכירה החותם את מחזור ה-S&OP: כאן התוכנית-המומלצת מוצגת, מתקבלות הכרעות-עדיפויות אסטרטגיות (השקעה, הקצאה, סיכון), והתוכנית מאושרת רשמית והופכת ל-Approved Constrained Plan. זהו רגע-ההכרעה שבו תכנון הופך למחויבות עסקית.",
          beginnerHe:
            "אחרי שהצוותים סגרו את רוב הפערים, מגיע תור ההנהלה. כאן המנכ\"ל וסמנכ\"לים מקבלים את ההחלטות הגדולות — למשל 'נשקיע במשמרת נוספת' או 'נעדיף את מותג-הדגל'. ברגע שהם אומרים 'מאושר', התוכנית הופכת רשמית וכל הארגון מתחיל לפעול לפיה.",
          consultantHe:
            "ב-IBP ה-Executive Review מסתמך על Executive Dashboards מתומצתים (KPIs, מגמות, סיכונים) ועל הצגת ה-Recommended Scenario מול ה-baseline. ההחלטה מסומנת על-ידי קידום ה-Scenario/Version ל-Approved/Consensus Key Figure, ולעיתים הקפאת snapshot לביקורת. Process Management מתעד את האישור (מי אישר, מתי). זהו ה-gate שמשחרר את ה-downstream integration.",
          purposeHe:
            "להבטיח שהתוכנית הסופית נושאת מנדט-הנהלה — מחויבות לתקציב, לקיבולת ולעדיפויות. בלי אישור-הנהלה, התוכנית נשארת המלצה ואין לה כוח-מחייב על המחלקות.",
          processExampleHe:
            "ה-CFO וה-COO רואים דשבורד עם ההמלצה (מיקור-חוץ חלקי) מול ה-baseline: +2% עלות אך +6% הכנסות-נטו. ההנהלה מאשרת, ומנהל ה-S&OP מקדם את ה-Scenario ל-Approved Plan ומקפיא snapshot.",
          cbcHe:
            "ב-CBC: הנהלת המבקבקת מחליטה ב-Executive Review להקצות עדיפות-קיבולת למשקאות-הליבה על-חשבון מותגי-נישה לעונת-הקיץ, מאשרת תוספת-משמרת מוגבלת, וקובעת זאת כתוכנית-הרבעון המחייבת.",
          navHe: [
            "SAP IBP for Sales and Operations ► Dashboards ► Executive Dashboard",
            "SAP IBP ► Process Management ► Approve Step (Executive Review)",
            "SAP IBP ► Versions ► Copy/Promote Scenario to Approved Version",
          ],
          tables: ["Executive Dashboard", "Version", "Scenario", "Process Step", "Snapshot"],
          tcodes: ["IBP Web UI", "Process Management"],
          fiori: ["Dashboards (Advanced)", "My Process Steps", "Manage Versions"],
          configHe: [
            "Executive Dashboard מתומצת: KPIs כספיים, שירות, מלאי, וסיכון — ברמת-קטגוריה/אזור.",
            "Process Step מסוג Approval עם אחראי-הנהלה ו-deadline.",
            "מנגנון קידום Scenario ל-Approved/Consensus Version לאחר אישור.",
            "Snapshot/Version-freeze ל-baseline מאושר לצורך ביקורת.",
          ],
          flow: [
            { he: "הצגת המלצה מול baseline", code: "Executive Dashboard" },
            { he: "הכרעות-עדיפויות", code: "Trade-off decisions" },
            { he: "אישור רשמי", code: "Approval Step" },
            { he: "קידום לגרסה מאושרת", code: "Promote to Approved" },
            { he: "הקפאת snapshot", code: "Snapshot/Freeze" },
          ],
          masterDataHe: [
            "Approved Constrained Plan Version · Consensus Key Figure.",
            "KPIs מנהליים: Revenue, Service Level, Inventory, Capacity Utilization.",
          ],
          mistakesHe: [
            "הצגת דשבורד-תפעולי עמוס במקום מנהלי-מתומצת — ההנהלה טובעת בפרטים.",
            "אי-קידום ה-Scenario המאושר ל-Approved Version — downstream לא יודע מה אושר.",
            "אישור ללא הקפאת snapshot — אין מה לבקר בדיעבד.",
            "הבאת פערים פתוחים שהיו צריכים להיסגר ב-Reconciliation.",
          ],
          troubleshootHe: [
            "ההנהלה מבקשת פירוט שאין בדשבורד ➔ הכן drill-down מוכן מראש.",
            "אחרי אישור, downstream עדיין רואה ישן ➔ ודא קידום ל-Approved Version ושיתוף.",
            "אי-בהירות מי אישר ➔ הפעל Process Management עם חתימת-אישור.",
            "ההחלטה נסתרת בחודש הבא ➔ הצג את ה-snapshot המוקפא להשוואה.",
          ],
          bestPracticeHe: [
            "דשבורד מנהלי מתומצת — KPIs, מגמות, סיכונים, החלטות-נדרשות בלבד.",
            "הגע עם פערים סגורים; הבא רק trade-offs אסטרטגיים להכרעה.",
            "קדם מיד ל-Approved Version והקפא snapshot.",
            "תעד את האישור ב-Process Management.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-Executive Review?", aHe: "אישור רשמי של התוכנית בידי ההנהלה הבכירה, כולל הכרעות-עדיפויות אסטרטגיות, והפיכתה ל-Approved Constrained Plan מחייב." },
            { qHe: "כיצד מסומן בפועל אישור ב-IBP?", aHe: "קידום ה-Scenario/Version ל-Approved/Consensus Key Figure, הקפאת snapshot ותיעוד ב-Process Management." },
          ],
          takeawaysHe: [
            "Executive Review = שער-האישור של ההנהלה.",
            "מתמקד בהכרעות אסטרטגיות, לא בטכניקה.",
            "מקדם ל-Approved Version ומקפיא snapshot.",
          ],
          relatedHe: [{ labelHe: "S&OP · Operationalize", href: "/library/sop/chapter-06/#sub-6.1.3" }],
        },
        {
          id: "6.1.3",
          titleHe: "תפעול התוכנית המוגבלת המאושרת (Operationalize the Approved Constrained Plan)",
          titleEn: "Operationalize the Approved Constrained Plan",
          execHe:
            "לאחר האישור, התוכנית המוגבלת חייבת לעבור מ'מסמך' ל'פעולה': תרגומה לתחזית-ביקוש מבצעית, להזמנות-מילוי-מלאי, ולתגובת-supply קצרת-טווח. ה-Operationalize הוא הגשר בין ה-S&OP הטקטי (time-series) לבין הביצוע (Demand, Inventory, Response) ולכספים.",
          beginnerHe:
            "אישרנו תוכנית — מה עכשיו? צריך 'לתרגם' אותה לפעולות יומיומיות: לעדכן את תחזית-הביקוש שעובדים לפיה, לקבוע יעדי-מלאי, ולתת לתפעול הוראות-ייצור קצרות-טווח. ה-Operationalize דואג שהמספר שאושר בהנהלה יגיע בפועל לכל מערכת שצריכה אותו.",
          consultantHe:
            "טכנית, ה-Operationalize מתבצע דרך Key Figure copy/disaggregation מ-IBP for S&OP אל planning levels של IBP for Demand (תחזית), IBP for Inventory (יעדי-מלאי) ו-IBP for Response (תוכנית מבוססת-הזמנות). בין time-series ל-order-based משתמשים ב-disaggregation ובמיפוי-attributes. אינטגרציה לכספים נעשית דרך Key Figure-to-financial mapping. תזמון: Application Jobs מתוזמנים שמעבירים את ה-Approved Plan downstream.",
          purposeHe:
            "להבטיח שהתוכנית המאושרת אכן מניעה ביצוע — שאין נתק בין מה שההנהלה אישרה לבין מה שהמפעל, הרכש והמלאי מבצעים בפועל.",
          processExampleHe:
            "ה-Approved Constrained Plan מפורק (disaggregate) לתחזית-שבועית ב-IBP for Demand, מזין יעדי-מלאי-בטחון ב-IBP for Inventory, ומשמש בסיס ל-deployment ב-IBP for Response. Application Job מתוזמן מריץ את ההעברה בלילה.",
          cbcHe:
            "ב-CBC: תוכנית-הקיץ המאושרת מפורקת לתחזית-שבועית לכל SKU ומרכז-הפצה, יעדי-מלאי-הבטחון מתעדכנים לפני העונה, וה-Response קובע סדר-deployment בין מרכזי-ההפצה.",
          navHe: [
            "SAP IBP ► Application Jobs ► Copy Operator / Key Figure Calculation (S&OP → Demand/Inventory)",
            "SAP IBP ► Integration ► Time-Series to Order-Based (Demand to Response)",
            "SAP IBP ► Data Integration ► Financial Mapping",
          ],
          tables: ["Application Job", "Copy Operator", "Key Figure", "Planning Level", "Version"],
          tcodes: ["IBP Web UI", "Application Jobs", "Excel Add-In"],
          fiori: ["Application Jobs", "Manage Copy Operators", "Data Integration"],
          configHe: [
            "Copy Operators להעברת ה-Approved Key Figure מ-S&OP אל Demand/Inventory.",
            "Disaggregation rules לפירוק מ-time-series aggregate לרמות-ביצוע.",
            "Application Jobs מתוזמנים להרצה אוטומטית של ההעברה.",
            "מיפוי Key Figure-to-financial לאינטגרציה כספית.",
          ],
          flow: [
            { he: "תוכנית מאושרת", code: "Approved Plan" },
            { he: "פירוק לרמות-ביצוע", code: "Disaggregation" },
            { he: "העברה ל-Demand/Inventory", code: "Copy Operator" },
            { he: "תגובת supply קצרת-טווח", code: "IBP for Response" },
            { he: "הזנת כספים", code: "Financial mapping" },
          ],
          masterDataHe: [
            "Approved Key Figure · Demand Forecast Key Figure · Target Stock Key Figure.",
            "Planning Levels וכללי-disaggregation בין time-series ל-order-based.",
          ],
          mistakesHe: [
            "השארת התוכנית המאושרת ב-S&OP בלבד — downstream לא מקבל אותה.",
            "disaggregation לא-נכון — סכום הרמות אינו שווה ל-aggregate המאושר.",
            "העברה ידנית במקום Application Job מתוזמן — שגיאות וחוסר-עקביות.",
            "אי-עדכון יעדי-מלאי לפני העונה — מחסור או עודף.",
          ],
          troubleshootHe: [
            "downstream רואה תוכנית ישנה ➔ בדוק שה-Copy Operator/Job רץ על הגרסה המאושרת.",
            "סכום לא תואם אחרי פירוק ➔ בדוק disaggregation key/proportional factors.",
            "כספים לא מתעדכנים ➔ בדוק מיפוי Key Figure-to-financial.",
            "Response לא מקבל ביקוש ➔ בדוק אינטגרציית time-series→order-based.",
          ],
          bestPracticeHe: [
            "אוטומט את ההעברה דרך Application Jobs מתוזמנים.",
            "ודא reconciliation: סכום הרמות-המפורקות = ה-aggregate המאושר.",
            "עדכן יעדי-מלאי ב-Inventory לפני שינויי-עונה.",
            "סנכרן תזמון: העבר downstream רק אחרי אישור והקפאת-snapshot.",
          ],
          interviewHe: [
            { qHe: "מה משמעות 'Operationalize the plan'?", aHe: "תרגום התוכנית המאושרת לפעולה — העברתה ל-IBP for Demand/Inventory/Response ולכספים, כך שתניע ביצוע בפועל." },
            { qHe: "כיצד מעבירים את התוכנית מ-S&OP ל-downstream?", aHe: "דרך Copy Operators ו-disaggregation, מתוזמנים ב-Application Jobs, ממימד-time-series של S&OP לרמות-הביצוע." },
          ],
          takeawaysHe: [
            "Operationalize = הגשר בין אישור לביצוע.",
            "העברה אוטומטית ל-Demand/Inventory/Response וכספים.",
            "ודא disaggregation עקבי ותזמון אחרי האישור.",
          ],
          relatedHe: [{ labelHe: "S&OP · אינטגרציה ל-Demand", href: "/library/sop/chapter-06/#sub-6.3.2" }],
        },
      ],
    },
    // ============================================================ 6.2
    {
      id: "6.2",
      titleHe: "תחזיות פיננסיות וסקירה (Financial Projections and Review)",
      titleEn: "Financial Projections and Review",
      execHe:
        "מימד-הכסף הוא מה שהופך את ה-S&OP מתרגיל-תפעולי לתהליך-עסקי. תת-פרק זה עוסק בתרגום התוכנית התפעולית לתחזית-פיננסית (הכנסות, עלויות, רווחיות), בהבאתה ל-Integrated Reconciliation לצד הזרמים התפעוליים, ובאישורה ב-Management Business Review מול היעדים הפיננסיים.",
      beginnerHe:
        "כל החלטה תפעולית היא גם החלטה כספית. אם נייצר יותר — נשלם יותר; אם נמכור יותר — נרוויח יותר. תת-הפרק הזה מסביר איך הופכים את תוכנית-היחידות לתוכנית-של-כסף, ואיך ההנהלה בודקת שהתוכנית עומדת ביעדים הפיננסיים לפני שהיא מאשרת אותה.",
      consultantHe:
        "ב-IBP מימד-הכסף מיוצג ב-Key Figures פיננסיים (Revenue, COGS, Margin) הנגזרים מ-Key Figures תפעוליים דרך נוסחאות-חישוב (calculated Key Figures) שמכפילות כמות במחיר/עלות. ה-Financial Reconciliation מבוצע באותו Planning Area, מה שמאפשר one-number plan בכמות ובכסף. ה-Management Business Review מסתמך על Dashboards פיננסיים ועל השוואה ל-Budget/Target Version.",
      purposeHe:
        "להבטיח שהתוכנית התפעולית מתורגמת לערך-כספי ונבדקת מול היעדים הפיננסיים — כך שלא נאשר תוכנית שעומדת ביחידות אך נכשלת ברווחיות.",
      processExampleHe:
        "תחזית-המכירות (יחידות) מוכפלת במחיר-ממוצע ל-Revenue, ובעלות-תקן ל-COGS; המרווח מושווה ל-Budget. פער-מרווח של 3% מתחת ליעד מובא ל-Reconciliation, ושם נבחנת העלאת-מחיר או שינוי-תמהיל.",
      cbcHe:
        "ב-CBC: תחזית-המשקאות מתורגמת להכנסות לפי מחיר-מכירה-לארגז ולעלות לפי תרכיז/אריזה/לוגיסטיקה. ה-Management Business Review בוחן את מרווח-התרומה לקטגוריה מול תקציב-הרבעון.",
      navHe: [
        "SAP IBP for Sales and Operations ► Dashboards ► Financial Dashboard",
        "SAP IBP ► Configuration ► Calculated Key Figures (Revenue = Qty × Price; COGS = Qty × Cost)",
        "SAP IBP ► Versions ► Budget/Target Version",
      ],
      tables: ["Calculated Key Figure", "Version", "Planning Area", "Dashboard"],
      tcodes: ["IBP Web UI", "Excel Add-In", "Analytics"],
      fiori: ["Dashboards (Advanced)", "Manage Key Figures", "Manage Versions"],
      configHe: [
        "Calculated Key Figures: Revenue = Consensus Demand × Average Price; COGS = Demand × Standard Cost; Margin = Revenue − COGS.",
        "Budget/Target Version לצורך השוואה ל-actual plan.",
        "Financial Dashboard המציג Revenue/COGS/Margin מול תקציב.",
        "Currency/UoM conversion attributes לאחידות-מטבע.",
      ],
      flow: [
        { he: "תוכנית תפעולית (יחידות)", code: "Consensus Demand" },
        { he: "תרגום לכסף", code: "Calculated KFs" },
        { he: "השוואה ל-Budget", code: "Financial Dashboard" },
        { he: "איזון פיננסי", code: "Integrated Reconciliation" },
        { he: "אישור מנהלי", code: "Management Business Review" },
      ],
      masterDataHe: [
        "Average Price · Standard Cost · Currency per Product/Location.",
        "Revenue · COGS · Margin Key Figures · Budget Version.",
      ],
      mistakesHe: [
        "ניהול הכסף בגיליון נפרד מהיחידות — אובדן one-number plan.",
        "שימוש במחיר/עלות לא-מעודכנים — תחזית-רווחיות מטעה.",
        "אי-המרת-מטבע אחידה בארגון רב-מדינתי.",
        "אישור לפי יחידות בלבד בלי בדיקת-מרווח.",
      ],
      troubleshootHe: [
        "Revenue לא מסתדר עם הצפי ➔ בדוק Average Price ויחידת-מטבע.",
        "Margin שלילי לא-צפוי ➔ בדוק Standard Cost / Currency conversion.",
        "פער מול Budget לא-מוסבר ➔ השווה Version ובדוק תאריך-snapshot.",
        "המרת-מטבע שגויה ➔ בדוק שערי-המרה ו-attributes.",
      ],
      bestPracticeHe: [
        "תרגם את התוכנית לכסף באותו Planning Area — one number בכמות ובכסף.",
        "השתמש ב-Calculated Key Figures, לא בייצוא ל-Excel חיצוני.",
        "השווה תמיד מול Budget/Target Version.",
        "ודא מחיר/עלות/מטבע מעודכנים לפני ה-Review.",
      ],
      interviewHe: [
        { qHe: "כיצד מתורגמת התוכנית התפעולית לפיננסית ב-IBP?", aHe: "דרך Calculated Key Figures שמכפילות כמות (Demand) במחיר ל-Revenue ובעלות ל-COGS, באותו Planning Area." },
        { qHe: "מדוע חשוב מימד-הכסף ב-S&OP?", aHe: "כי הוא מאפשר להעריך רווחיות, להשוות לתקציב ולהבטיח שהתוכנית תקפה לא רק תפעולית אלא גם פיננסית." },
      ],
      takeawaysHe: [
        "מימד-הכסף הופך S&OP לתהליך-עסקי.",
        "Calculated Key Figures מתרגמות כמות לערך באותו Planning Area.",
        "השוואה ל-Budget היא לב ה-Management Business Review.",
      ],
      relatedHe: [{ labelHe: "S&OP · אינטגרציה לכספים", href: "/library/sop/chapter-06/#sub-6.3.5" }],
      children: [
        {
          id: "6.2.1",
          titleHe: "תחזיות פיננסיות של התוכנית (Financial Projections of the Plan)",
          titleEn: "Financial Projections of the Plan",
          execHe:
            "תחזיות-פיננסיות הן ההיטל-הכספי של התוכנית התפעולית: כמה הכנסה, עלות ורווח התוכנית הנוכחית מייצרת לאורך אופק-התכנון. הן הופכות יחידות למטבע ומאפשרות להעריך את ערך התוכנית עוד לפני האישור.",
          beginnerHe:
            "תחזית-פיננסית עונה על השאלה 'כמה כסף התוכנית הזו תכניס ותעלה?'. לוקחים את היחידות שמתכננים, מכפילים במחיר כדי לקבל הכנסות, ובעלות כדי לקבל הוצאות, וההפרש הוא הרווח הצפוי.",
          consultantHe:
            "ב-IBP מיושמות כ-Calculated Key Figures בנוסחה: Revenue = Qty × Price, COGS = Qty × Cost, Gross Margin = Revenue − COGS. הנוסחאות יכולות לכלול מימדי-זמן (תקופתי) ו-attributes (מחיר לפי לקוח/אזור). חשוב ש-price/cost יישבו ברמת-מימד נכונה כדי שה-disaggregation יחשב נכון. ניתן להוסיף Key Figures ל-Discounts, Freight ו-Net Margin.",
          purposeHe:
            "לתת לתוכנית 'תווית-מחיר' — להראות את הערך הכספי של כל תרחיש כדי שההחלטות יתקבלו על-בסיס ערך ולא רק על-בסיס יחידות.",
          processExampleHe:
            "תחזית של 100K ארגזים × 12₪ מחיר = 1.2M₪ הכנסות; × 8₪ עלות = 800K₪ COGS; מרווח 400K₪. שינוי-תמהיל למוצר-פרמיום מעלה את המרווח ל-450K₪.",
          cbcHe:
            "ב-CBC: תחזית-המשקאות מתורגמת להכנסה-לארגז ולעלות-תרכיז+אריזה; שינוי-תמהיל לטובת משקאות-פרמיום משפר את מרווח-התרומה הצפוי לקטגוריה.",
          navHe: [
            "SAP IBP ► Configuration ► Manage Key Figures (Calculated: Revenue, COGS, Margin)",
            "SAP IBP Excel Add-In ► Planning View ► Financial Key Figures",
            "SAP IBP ► Dashboards ► Financial Projection Chart",
          ],
          tables: ["Calculated Key Figure", "Key Figure", "Attribute", "Planning Level"],
          tcodes: ["IBP Web UI", "Excel Add-In"],
          fiori: ["Manage Key Figures", "Dashboards (Advanced)"],
          configHe: [
            "Revenue KF: Qty × Price (price ב-attribute/Key Figure ברמת-מימד מתאימה).",
            "COGS KF: Qty × Standard Cost.",
            "Margin KF: Revenue − COGS; אופציונלי Net Margin אחרי Discounts/Freight.",
            "ודא Aggregation/Disaggregation Mode נכון ל-price/cost (לרוב לא-סכימה אלא ממוצע-משוקלל).",
          ],
          flow: [
            { he: "כמות מתוכננת", code: "Qty KF" },
            { he: "× מחיר", code: "Revenue" },
            { he: "× עלות", code: "COGS" },
            { he: "הפרש", code: "Gross Margin" },
            { he: "תצוגה", code: "Financial Chart" },
          ],
          masterDataHe: [
            "Price · Standard Cost · Discount · Freight per Product/Customer/Region.",
            "Revenue · COGS · Margin Calculated Key Figures.",
          ],
          mistakesHe: [
            "הגדרת price כ-Key Figure סכים — סכום-מחירים חסר-משמעות; צריך ממוצע-משוקלל.",
            "מחיר/עלות ברמת-מימד שגויה — disaggregation מעוות.",
            "התעלמות מ-Discounts/Freight — מרווח-נטו מנופח.",
            "אי-עדכון Standard Cost בתחילת-תקופה.",
          ],
          troubleshootHe: [
            "Revenue גבוה/נמוך בלי-הסבר ➔ בדוק Aggregation Mode של price ורמת-המימד.",
            "Margin לא תואם ידני ➔ בדוק נוסחת-COGS ויחידות.",
            "price מתפצל לא-נכון ➔ הגדר calculation מבוסס-ממוצע ולא סכום.",
          ],
          bestPracticeHe: [
            "הגדר price/cost כ-Key Figures לא-סכימים (ממוצע-משוקלל).",
            "שמור את הנוסחאות ב-IBP, לא ב-Excel חיצוני.",
            "הוסף Net Margin אחרי Discounts/Freight לתמונה אמיתית.",
            "סנכרן Standard Cost עם ה-CO בתחילת כל מחזור.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושבת Revenue ב-IBP?", aHe: "כ-Calculated Key Figure: Qty (Consensus Demand) × Price, ברמת-המימד המתאימה." },
            { qHe: "מדוע price חייב Aggregation Mode מיוחד?", aHe: "כי מחיר אינו נסכם; צריך ממוצע-משוקלל אחרת ה-aggregate וה-disaggregate יהיו שגויים." },
          ],
          takeawaysHe: [
            "תחזיות-פיננסיות = ערך כספי של התוכנית.",
            "Calculated KFs: Revenue, COGS, Margin.",
            "שים-לב ל-Aggregation Mode של price/cost.",
          ],
        },
        {
          id: "6.2.2",
          titleHe: "סקירת האיחוד המשולב (Integrated Reconciliation Review)",
          titleEn: "Integrated Reconciliation Review",
          execHe:
            "בהקשר הפיננסי, ה-Integrated Reconciliation מאזן את התוכנית התפעולית מול היעדים הפיננסיים: לא רק 'האם הביקוש = ההיצע' אלא 'האם התוכנית עומדת ביעדי-הרווחיות'. כאן נסגרים פערי-מרווח ופערי-תקציב לצד הפערים התפעוליים.",
          beginnerHe:
            "אותו מפגש-איחוד, אבל עכשיו מסתכלים גם על הכסף. גם אם הביקוש וההיצע מסתדרים, צריך לבדוק שהתוכנית מרוויחה מספיק. אם המרווח נמוך מהיעד — מחפשים פתרון: מחיר, תמהיל, או עלות.",
          consultantHe:
            "מבוצע באותו Reconciliation Dashboard, אך עם Key Figures פיננסיים (Revenue/COGS/Margin) מוצגים לצד התפעוליים ומול Budget Version. Custom Alerts פיננסיים (Margin < Target) מסמנים פערים. Scenarios משווים השפעת-החלטות (העלאת-מחיר, שינוי-תמהיל) גם על היחידות וגם על הכסף בו-זמנית — היתרון של one-number plan.",
          purposeHe:
            "להבטיח שההמלצה שעולה ל-Review מאוזנת תפעולית וגם פיננסית — שלא נמליץ על תרחיש שמסדר קיבולת אך הורס רווחיות.",
          processExampleHe:
            "תרחיש מיקור-חוץ פותר את פער-הקיבולת אך מעלה COGS ב-4% ומוריד מרווח מתחת ליעד. ב-Reconciliation מוצג גם תרחיש-מחיר חלופי; הצוות ממליץ על שילוב ששומר על המרווח.",
          cbcHe:
            "ב-CBC: תרחיש העברת-ייצור למפעל-אחות מוסיף עלות-לוגיסטיקה. ה-Reconciliation הפיננסי בודק את ההשפעה על מרווח-התרומה ומציע התאמת-מחיר נקודתית בערוץ מסוים.",
          navHe: [
            "SAP IBP ► Dashboards ► Reconciliation Dashboard (Operational + Financial KFs)",
            "SAP IBP ► Alerts ► Custom Alerts (Margin Gap)",
            "SAP IBP ► Scenarios ► Compare (Units + Financials)",
          ],
          tables: ["Key Figure", "Scenario", "Custom Alert", "Version", "Case"],
          tcodes: ["IBP Web UI", "Analytics", "Excel Add-In"],
          fiori: ["Dashboards (Advanced)", "Custom Alerts", "Manage Cases"],
          configHe: [
            "Dashboard המשלב Operational ו-Financial Key Figures מול Budget Version.",
            "Custom Alerts פיננסיים: Margin < Target, Revenue < Plan.",
            "Scenarios המחשבים אוטומטית גם יחידות וגם כסף.",
            "Case Management לתיעוד פער-המרווח וההמלצה.",
          ],
          flow: [
            { he: "הצגת תפעולי + פיננסי יחד", code: "Reconciliation Dashboard" },
            { he: "זיהוי פער-מרווח", code: "Margin Alert" },
            { he: "השוואת תרחישים בכסף", code: "Scenarios" },
            { he: "המלצה מאוזנת", code: "Case" },
          ],
          masterDataHe: [
            "Revenue/COGS/Margin KFs · Budget Version · Operational KFs.",
            "Scenario Versions עם השפעה כפולה (יחידות + כסף).",
          ],
          mistakesHe: [
            "איזון תפעולי בלבד בלי בדיקת-מרווח — תוכנית מאוזנת אך לא-רווחית.",
            "השוואת תרחישים ביחידות בלבד — מפספסים את ההשפעה הכספית.",
            "אי-קישור ל-Budget — אין מול-מה למדוד.",
            "פערי-מרווח לא מתועדים — Review מתחיל מאפס.",
          ],
          troubleshootHe: [
            "תרחיש 'טוב' תפעולית גרוע כספית ➔ הצג גם Margin KF בהשוואה.",
            "Margin Alert לא נדלק ➔ בדוק סף ב-Custom Alert הפיננסי.",
            "פער מול Budget לא ברור ➔ ודא Version ו-snapshot תואמים.",
          ],
          bestPracticeHe: [
            "הצג תמיד תפעולי + פיננסי באותו דשבורד.",
            "השווה תרחישים גם ביחידות וגם בכסף בו-זמנית.",
            "קשר ל-Budget Version והשתמש ב-Margin Alerts.",
            "תעד פער-מרווח+המלצה ב-Case.",
          ],
          interviewHe: [
            { qHe: "מה מוסיף ה-Reconciliation הפיננסי על-פני התפעולי?", aHe: "בדיקת התוכנית מול יעדי-רווחיות ותקציב, וסגירת פערי-מרווח, לא רק פערי כמות/קיבולת." },
            { qHe: "מהו היתרון של one-number plan כאן?", aHe: "כל תרחיש מחושב אוטומטית גם ביחידות וגם בכסף, כך שניתן להעריך השפעה כפולה במקום אחד." },
          ],
          takeawaysHe: [
            "Reconciliation פיננסי = איזון מול רווחיות ותקציב.",
            "תרחישים מושווים ביחידות ובכסף יחד.",
            "Margin Alerts מסמנים פערי-רווחיות מראש.",
          ],
        },
        {
          id: "6.2.3",
          titleHe: "סקירת ביצועים עסקית של ההנהלה (Management Business Review)",
          titleEn: "Management Business Review",
          execHe:
            "ה-Management Business Review הוא מפגש-ההנהלה שבוחן את התוכנית מנקודת-מבט עסקית-פיננסית: ביצועים מול יעדים, מגמות, סיכונים והזדמנויות. הוא משלים את ה-Executive Review בכך שהוא מעמיד את התוכנית במבחן הערך-העסקי לפני המחויבות הסופית.",
          beginnerHe:
            "זהו מפגש שבו ההנהלה מסתכלת על התמונה העסקית הגדולה: האם אנחנו עומדים ביעדי-המכירות והרווח? מה המגמות? איפה הסיכונים? במקום להתמקד ביחידות, מתמקדים בערך-העסקי של התוכנית.",
          consultantHe:
            "ב-IBP נתמך ע\"י Management/Executive Dashboards פיננסיים: Revenue/Margin actual-vs-plan-vs-budget, KPIs (Forecast Accuracy, Service Level, DIO), ומגמות לאורך-זמן. ההצגה מבוססת על ה-Approved/Consensus Version ועל Budget Version להשוואה. ההחלטות מתועדות ב-Process Management. לעיתים זהו ה-gate הפיננסי שמשלים את ה-Executive Review התפעולי.",
          purposeHe:
            "להעמיד את התוכנית במבחן העסקי הכולל — לוודא שהיא לא רק ישימה אלא גם משיגה את היעדים הפיננסיים והאסטרטגיים לפני שמתחייבים אליה.",
          processExampleHe:
            "ה-CFO מציג Revenue actual-vs-plan, מרווח מול תקציב, ו-Forecast Accuracy של הרבעון הקודם. ההנהלה מזהה הזדמנות בקטגוריה צומחת ומחליטה להגדיל השקעה-שיווקית, מה שמעדכן את תחזית-הביקוש.",
          cbcHe:
            "ב-CBC: ה-Management Business Review בוחן את מרווח-התרומה לקטגוריה מול תקציב-השנה, מגמות-נתח-שוק, וסיכוני-מחיר-חומרי-גלם (סוכר/אלומיניום), ומכוון את עדיפויות-ההשקעה לעונה.",
          navHe: [
            "SAP IBP ► Dashboards ► Management Business Review Dashboard",
            "SAP IBP ► Analytics ► KPI Trends (Revenue, Margin, Forecast Accuracy, DIO)",
            "SAP IBP ► Process Management ► Review Step",
          ],
          tables: ["Dashboard", "KPI", "Version", "Process Step"],
          tcodes: ["IBP Web UI", "Analytics", "Process Management"],
          fiori: ["Dashboards (Advanced)", "My Process Steps"],
          configHe: [
            "Management Dashboard: Revenue/Margin actual-vs-plan-vs-budget + KPI trends.",
            "KPIs: Forecast Accuracy, Service Level, Days Inventory Outstanding.",
            "Process Step מסוג Review עם אחראי-הנהלה.",
            "השוואה ל-Budget Version ול-snapshot קודם.",
          ],
          flow: [
            { he: "הצגת ביצועים מול יעדים", code: "Management Dashboard" },
            { he: "ניתוח מגמות וסיכונים", code: "KPI Trends" },
            { he: "החלטות-ערך עסקי", code: "Strategic decisions" },
            { he: "תיעוד", code: "Process Management" },
          ],
          masterDataHe: [
            "Revenue/Margin KFs · Budget Version · KPI definitions.",
            "Forecast Accuracy · Service Level · DIO.",
          ],
          mistakesHe: [
            "התמקדות ביחידות במקום בערך-עסקי — מפספסים את מטרת המפגש.",
            "הצגת actuals בלי השוואה ל-Budget/Plan — אין הקשר.",
            "התעלמות מ-KPIs היסטוריים (Forecast Accuracy) — אין למידה.",
            "החלטות לא מתועדות.",
          ],
          troubleshootHe: [
            "actual-vs-plan לא תואם ➔ בדוק Version ותקופת-snapshot.",
            "KPI לא מחושב ➔ בדוק הגדרת-KPI ונתוני-actuals.",
            "החלטה לא משפיעה על התוכנית ➔ ודא שעודכן Key Figure/Version הנכון.",
          ],
          bestPracticeHe: [
            "התמקד בערך-עסקי: Revenue, Margin, KPIs, מגמות.",
            "הצג תמיד actual-vs-plan-vs-budget.",
            "כלול Forecast Accuracy ללמידה מתמשכת.",
            "תעד החלטות ועדכן את התוכנית בהתאם.",
          ],
          interviewHe: [
            { qHe: "מה מבדיל את ה-Management Business Review מ-Executive Review?", aHe: "ה-Management Business Review מתמקד בערך-העסקי-פיננסי (ביצועים מול יעדים, מגמות, KPIs), ומשלים את ה-Executive Review התפעולי." },
            { qHe: "אילו KPIs נבחנים בו?", aHe: "Revenue/Margin מול תקציב, Forecast Accuracy, Service Level ו-Days Inventory Outstanding, בין היתר." },
          ],
          takeawaysHe: [
            "Management Business Review = מבחן הערך-העסקי של התוכנית.",
            "actual-vs-plan-vs-budget + KPI trends.",
            "משלים את ה-Executive Review לפני המחויבות.",
          ],
        },
      ],
    },
    // ============================================================ 6.3
    {
      id: "6.3",
      titleHe: "תפעול התוכנית (Operationalizing the Plan)",
      titleEn: "Operationalizing the Plan",
      execHe:
        "תת-פרק זה מפרט כיצד התוכנית הטקטית המאושרת ב-IBP for S&OP מתחברת ומניעה את שאר מודולי ה-IBP ואת התכנון הפיננסי. הוא סוקר את ארכיטקטורת-האינטגרציה: בין S&OP ל-Demand, ל-Inventory, בין time-series ל-order-based (Response), ובין ה-S&OP הטקטי ל-Financial Planning.",
      beginnerHe:
        "התכנון לא חי לבד. אחרי שאישרנו תוכנית ב-S&OP, היא צריכה 'לדבר' עם המערכות שעושות את העבודה היומיומית: תכנון-ביקוש מפורט, ניהול-מלאי, תגובה-מהירה להזמנות, ותקצוב. תת-הפרק מסביר איך כל אלה מחוברים כך שהתוכנית זורמת בלי נתק.",
      consultantHe:
        "כל מודולי ה-IBP חולקים פלטפורמה אחת (HANA) ויכולים לשתף Planning Areas, Master Data Types ו-Key Figures, מה שמפשט אינטגרציה. עם זאת, S&OP ו-Demand הם time-series, ואילו Response הוא order-based — מה שמחייב disaggregation ומיפוי בין-המודלים. האינטגרציה מבוססת על Copy Operators, Application Jobs מתוזמנים, ועל Key Figure mapping. הבנת ההבדל time-series↔order-based היא קריטית לעיצוב נכון.",
      purposeHe:
        "להבטיח זרימת-תוכנית רציפה מ-S&OP הטקטי אל כל נקודות-הביצוע, ללא העתקות-ידניות וללא נתק בין-מודולי.",
      processExampleHe:
        "ה-Approved Plan זורם ל-Demand (תחזית מפורטת), משם ל-Inventory (יעדי-מלאי), ול-Response (deployment מבוסס-הזמנות), ובמקביל ל-Financial Planning. הכל מתוזמן ב-Application Jobs.",
      cbcHe:
        "ב-CBC: התוכנית הטקטית מזינה תחזית-ביקוש שבועית ל-Demand, יעדי-מלאי-בטחון ל-Inventory, סדר-deployment בין מרכזי-הפצה ל-Response, ותחזית-הכנסות ל-Financial Planning — הכל מאותו מקור-אמת.",
      navHe: [
        "SAP IBP ► Application Jobs ► Copy Operators (cross-module)",
        "SAP IBP ► Configuration ► Planning Areas & Master Data Types (shared)",
        "SAP IBP ► Integration ► Time-Series ↔ Order-Based",
      ],
      tables: ["Planning Area", "Master Data Type", "Copy Operator", "Application Job", "Key Figure"],
      tcodes: ["IBP Web UI", "Application Jobs", "Data Integration"],
      fiori: ["Application Jobs", "Manage Copy Operators", "Data Integration"],
      configHe: [
        "Planning Areas ו-Master Data Types משותפים בין מודולים היכן שניתן.",
        "Copy Operators להעברת Key Figures בין מודולים.",
        "Application Jobs מתוזמנים לאוטומציה.",
        "Disaggregation ומיפוי בין time-series ל-order-based.",
      ],
      flow: [
        { he: "S&OP טקטי מאושר", code: "Approved Plan" },
        { he: "אינטגרציה ל-Demand", code: "6.3.2" },
        { he: "אינטגרציה ל-Inventory", code: "6.3.3" },
        { he: "time-series → order-based", code: "6.3.4" },
        { he: "אינטגרציה לכספים", code: "6.3.5" },
      ],
      masterDataHe: [
        "Shared Master Data Types (Product, Location, Customer).",
        "Cross-module Key Figures · Copy Operators · Application Jobs.",
      ],
      mistakesHe: [
        "תכנון כל מודול בנפרד בלי אינטגרציה — איים מנותקים.",
        "התעלמות מהבדל time-series↔order-based — מיפוי שגוי.",
        "העברות ידניות במקום Application Jobs.",
        "Master Data לא-מסונכרן בין מודולים.",
      ],
      troubleshootHe: [
        "מודול לא מקבל נתונים ➔ בדוק Copy Operator ו-Job.",
        "אי-התאמה בין time-series ל-order-based ➔ בדוק disaggregation ומיפוי.",
        "Master Data שונה בין מודולים ➔ אחד Master Data Types.",
        "תזמון לא-מסונכרן ➔ סדר את ה-Jobs בשרשרת תלות.",
      ],
      bestPracticeHe: [
        "נצל פלטפורמה משותפת — שתף Planning Areas/MDT/KFs.",
        "אוטומט הכל ב-Application Jobs מתוזמנים בשרשרת.",
        "תכנן בקפידה את הגשר time-series↔order-based.",
        "סנכרן Master Data כמקור-אמת אחד.",
      ],
      interviewHe: [
        { qHe: "מה היתרון של פלטפורמת IBP אחת לאינטגרציה?", aHe: "כל המודולים על HANA אחד ויכולים לשתף Planning Areas, Master Data ו-Key Figures, מה שמפשט מאוד את האינטגרציה ביניהם." },
        { qHe: "מהו האתגר המרכזי באינטגרציה בין S&OP ל-Response?", aHe: "S&OP הוא time-series ו-Response הוא order-based, ולכן נדרשים disaggregation ומיפוי-attributes בין שני המודלים." },
      ],
      takeawaysHe: [
        "Operationalize מחבר את S&OP לכל מודולי הביצוע.",
        "פלטפורמה משותפת מפשטת אינטגרציה.",
        "time-series↔order-based הוא הגשר הקריטי.",
      ],
      relatedHe: [{ labelHe: "S&OP · Operationalize Approved Plan", href: "/library/sop/chapter-06/#sub-6.1.3" }],
      children: [
        {
          id: "6.3.1",
          titleHe: "סקירת אינטגרציית התוכנית (Plan Integration Overview)",
          titleEn: "Plan Integration Overview",
          execHe:
            "סקירה זו מציגה את התמונה הכוללת של אינטגרציית-התוכנית: אילו מודולים מעורבים (S&OP, Demand, Inventory, Response, Financial), כיוון-הזרימה ביניהם, וסוגי-החיבור (time-series, order-based). היא מפת-הדרכים להבנת כל החיבורים הספציפיים שיפורטו בהמשך.",
          beginnerHe:
            "לפני שצוללים לכל חיבור בנפרד, כדאי לראות את כל התמונה: S&OP במרכז, וממנו יוצאים חצים ל-Demand, Inventory, Response ו-Financial. הסקירה הזו מראה 'מי מתחבר למי' ובאיזה כיוון.",
          consultantHe:
            "מבחינה ארכיטקטונית, S&OP (time-series, aggregate, טקטי) הוא ה-hub. Demand (time-series) מזין לו תחזית ומקבל ממנו consensus; Inventory (time-series, optimization) מקבל ביקוש ומחזיר יעדי-מלאי; Response (order-based, אופרטיבי) מקבל ביקוש מפורק ומחזיר ATP/confirmation; Financial Planning מקבל את ה-Key Figures הכספיים. החיבורים מבוססים על shared Planning Area היכן שאפשר, או Copy Operators/Integration בין Planning Areas שונים.",
          purposeHe:
            "לתת מפה-קונספטואלית של כל החיבורים כך שמתכננים ויועצים יבינו את זרימת-הנתונים לפני מימוש כל חיבור.",
          processExampleHe:
            "מנהל-מימוש משרטט diagram: Demand→S&OP (תחזית), S&OP→Inventory (ביקוש מוסכם), Inventory→S&OP (יעדי-מלאי), S&OP→Response (תוכנית מפורקת), S&OP→Financial (הכנסות/עלויות). מכאן הוא גוזר את ה-Copy Operators הנדרשים.",
          cbcHe:
            "ב-CBC: מפת-האינטגרציה מראה כיצד תחזית-הקיץ זורמת מ-Demand ל-S&OP, מתאזנת מול ההיצע, ומשם מתפזרת ל-Inventory, Response ו-Financial — מקור-אמת אחד לכל המבקבקת.",
          navHe: [
            "SAP IBP ► Configuration ► Planning Areas (overview of modules)",
            "SAP IBP ► Integration ► Architecture Overview",
            "SAP IBP ► Application Jobs ► Copy Operators (map of flows)",
          ],
          tables: ["Planning Area", "Master Data Type", "Copy Operator", "Key Figure"],
          tcodes: ["IBP Web UI", "Data Integration"],
          fiori: ["Manage Planning Areas", "Data Integration"],
          configHe: [
            "מיפוי המודולים: S&OP, Demand, Inventory, Response, Financial — וכיווני-הזרימה.",
            "החלטה: shared Planning Area מול Planning Areas נפרדים + Copy Operators.",
            "סימון אילו חיבורים הם time-series ואילו order-based.",
            "תכנון תזמון-Jobs בשרשרת לפי תלות.",
          ],
          flow: [
            { he: "Demand → S&OP", code: "תחזית" },
            { he: "S&OP ↔ Inventory", code: "ביקוש/יעדי-מלאי" },
            { he: "S&OP → Response", code: "תוכנית מפורקת" },
            { he: "S&OP → Financial", code: "ערך כספי" },
          ],
          masterDataHe: [
            "Shared Master Data Types בין כל המודולים.",
            "מפת Key Figures חוצי-מודולים.",
          ],
          mistakesHe: [
            "מימוש חיבורים בלי מפה כוללת — חיבורים סותרים/כפולים.",
            "אי-החלטה מראש על shared vs separate Planning Area.",
            "ערבוב time-series ו-order-based בלי תכנון-גשר.",
          ],
          troubleshootHe: [
            "זרימה לא-צפויה בין מודולים ➔ חזור למפת-האינטגרציה ובדוק כיוון.",
            "כפילות-נתונים ➔ בדוק שאין שני Copy Operators מקבילים.",
          ],
          bestPracticeHe: [
            "התחל ממפת-אינטגרציה כוללת לפני מימוש.",
            "העדף shared Planning Area היכן שאפשר.",
            "סמן מראש כל חיבור כ-time-series או order-based.",
          ],
          interviewHe: [
            { qHe: "מהי מטרת ה-Plan Integration Overview?", aHe: "לספק מפה כוללת של המודולים, כיווני-הזרימה וסוגי-החיבור לפני מימוש כל חיבור ספציפי." },
            { qHe: "מתי לבחור shared Planning Area מול נפרד?", aHe: "shared מפשט שיתוף Key Figures ו-Master Data; נפרד מתאים כשמודלי-הנתונים או מחזורי-התכנון שונים מהותית, ואז משתמשים ב-Copy Operators/Integration." },
          ],
          takeawaysHe: [
            "Overview = מפת כל החיבורים והכיוונים.",
            "S&OP הוא ה-hub; סביבו Demand/Inventory/Response/Financial.",
            "סמן time-series מול order-based מראש.",
          ],
        },
        {
          id: "6.3.2",
          titleHe: "אינטגרציה בין IBP for S&OP ל-IBP for Demand",
          titleEn: "Integration between IBP for S&OP and IBP for Demand",
          execHe:
            "IBP for Demand מספק תחזית-סטטיסטית מפורטת ו-demand sensing קצר-טווח; IBP for S&OP צורך את התחזית לבניית consensus ומחזיר את התוכנית המוסכמת. שני המודולים הם time-series, מה שמקל על האינטגרציה — לרוב באותו Planning Area או דרך Copy Operators פשוטים.",
          beginnerHe:
            "Demand הוא ה'מנבא' — הוא מחשב תחזית מדויקת מהיסטוריה. S&OP לוקח את התחזית הזו, מאזן אותה מול היכולת, ומחזיר ל-Demand את המספר המוסכם. כיוון ש-שניהם 'עובדים באותה שפה' (time-series), החיבור פשוט יחסית.",
          consultantHe:
            "מאחר ששניהם time-series, ניתן לשתף Planning Area יחיד עם Key Figures: Statistical Forecast (מ-Demand), Consensus Demand (ב-S&OP), Final Demand. ה-disaggregation זהה (proportional/snapshot), והעברת-הנתונים היא Key Figure copy פשוט (לרוב אפילו לא נדרש copy אם shared). Demand Sensing קצר-הטווח עשוי לרוץ בתדירות גבוהה יותר ולעדכן Key Figure נפרד.",
          purposeHe:
            "לחבר תחזית-סטטיסטית מדויקת (Demand) עם איזון-עסקי (S&OP) — כך שה-consensus נשען על בסיס-נתוני חזק והתחזית מעודכנת בהחלטות-העסק.",
          processExampleHe:
            "Demand מייצר Statistical Forecast; S&OP צורך אותו כ-baseline, מוסיף שיפוט-עסקי (מבצעים, אירועים) ל-Consensus Demand; המספר המוסכם מוחזר ומשמש בסיס ל-Demand Sensing.",
          cbcHe:
            "ב-CBC: Demand מנבא ביקוש-משקאות לפי עונתיות והיסטוריה; S&OP מוסיף ידע על מבצע-קיץ ואירוע-ספורט ל-Consensus; המספר המעודכן מזין את תכנון-ההפצה היומי.",
          navHe: [
            "SAP IBP for Demand ► Statistical Forecasting (Forecast Models)",
            "SAP IBP ► Configuration ► Shared Planning Area (Demand + S&OP Key Figures)",
            "SAP IBP ► Application Jobs ► Demand Sensing / Copy Operator",
          ],
          tables: ["Statistical Forecast KF", "Consensus Demand KF", "Planning Area", "Copy Operator"],
          tcodes: ["IBP Web UI", "Excel Add-In", "Application Jobs"],
          fiori: ["Manage Forecast Models", "Application Jobs", "Manage Copy Operators"],
          configHe: [
            "Shared Planning Area עם Key Figures: Statistical Forecast, Consensus Demand, Final Demand.",
            "Forecast Models ב-Demand (ARIMA, exponential smoothing וכו').",
            "Copy Operator (אם נדרש) להעברת Statistical→Consensus baseline.",
            "Demand Sensing job בתדירות גבוהה ל-Key Figure קצר-טווח.",
          ],
          flow: [
            { he: "תחזית סטטיסטית", code: "IBP for Demand" },
            { he: "baseline ל-S&OP", code: "Statistical Forecast KF" },
            { he: "שיפוט-עסקי", code: "Consensus Demand" },
            { he: "החזרה ל-Demand", code: "Final Demand" },
            { he: "demand sensing", code: "short-term KF" },
          ],
          masterDataHe: [
            "Statistical Forecast · Consensus Demand · Final Demand Key Figures.",
            "Product/Customer/Location Master משותף.",
          ],
          mistakesHe: [
            "כפילות Planning Areas כש-shared היה מספיק — אינטגרציה מיותרת.",
            "אי-החזרת ה-Consensus ל-Demand — demand sensing על baseline ישן.",
            "ערבוב statistical ו-consensus באותו Key Figure.",
            "תדירות-job לא-מתאימה ל-Demand Sensing.",
          ],
          troubleshootHe: [
            "S&OP לא רואה תחזית ➔ בדוק shared PA או Copy Operator.",
            "Demand Sensing על נתון-ישן ➔ ודא החזרת Consensus ותדירות-job.",
            "אי-התאמת disaggregation ➔ שניהם time-series, בדוק proportional factors.",
          ],
          bestPracticeHe: [
            "העדף shared Planning Area — שניהם time-series.",
            "הפרד Key Figures: statistical, consensus, final.",
            "החזר את ה-Consensus ל-Demand ל-sensing מדויק.",
            "התאם תדירות-job ל-Demand Sensing קצר-הטווח.",
          ],
          interviewHe: [
            { qHe: "מדוע האינטגרציה S&OP↔Demand פשוטה יחסית?", aHe: "כי שני המודולים הם time-series ויכולים לשתף Planning Area, Key Figures ו-disaggregation — לעיתים ללא copy כלל." },
            { qHe: "מה מחזיר S&OP ל-Demand?", aHe: "את ה-Consensus/Final Demand המוסכם, שמשמש בסיס מעודכן ל-Demand Sensing קצר-טווח." },
          ],
          takeawaysHe: [
            "Demand מספק תחזית; S&OP מספק consensus.",
            "שניהם time-series → אינטגרציה פשוטה (shared PA).",
            "החזר Consensus ל-Demand ל-sensing מדויק.",
          ],
          relatedHe: [{ labelHe: "S&OP · תכנון ביקוש", href: "/library/sop/chapter-04/" }],
        },
        {
          id: "6.3.3",
          titleHe: "אינטגרציה בין IBP for S&OP ל-IBP for Inventory",
          titleEn: "Integration between IBP for S&OP and IBP for Inventory",
          execHe:
            "IBP for Inventory מחשב יעדי-מלאי אופטימליים (safety stock, target stock) על-בסיס שונות-ביקוש, lead time ורמת-שירות. הוא מקבל את הביקוש מ-S&OP ומחזיר יעדי-מלאי שמזינים בחזרה את תכנון-ההיצע — לולאת-משוב חיונית לאיזון מלאי-שירות.",
          beginnerHe:
            "Inventory עונה על השאלה 'כמה מלאי-בטחון להחזיק?'. הוא לוקח את הביקוש מ-S&OP, מחשב כמה מלאי דרוש כדי לעמוד ברמת-השירות הרצויה למרות חוסר-הוודאות, ומחזיר את היעדים ל-S&OP כדי שתכנון-ההיצע יתחשב בהם.",
          consultantHe:
            "Inventory הוא time-series עם optimization engine (multi-echelon). הוא צורך Consensus Demand ו-demand variability מ-S&OP/Demand, מחשב Recommended Safety Stock/Target Stock, ומחזירם כ-Key Figures ל-S&OP. האינטגרציה היא Key Figure copy (לרוב shared PA או Copy Operator). חשוב להזין שונות-ביקוש (CoV) ו-lead time variability נכונים, אחרת ה-optimization מטעה.",
          purposeHe:
            "לאזן בין רמת-שירות לעלות-מלאי — לוודא שהתוכנית מחזיקה מספיק מלאי לשירות הלקוח אך לא עודף שמקפיא הון.",
          processExampleHe:
            "S&OP מספק Consensus Demand ו-CoV; Inventory מחשב safety stock ל-95% שירות; היעדים מוחזרים ל-S&OP ומגדילים את דרישת-ההיצע בהתאם, מה שנבחן ב-Reconciliation.",
          cbcHe:
            "ב-CBC: לפני עונת-הקיץ, Inventory מחשב מלאי-בטחון מוגבר למשקאות-ליבה לפי שונות-ביקוש עונתית; היעדים מוחזרים ל-S&OP ומגדילים את תוכנית-הייצור המוקדמת.",
          navHe: [
            "SAP IBP for Inventory ► Inventory Optimization (Safety Stock Calculation)",
            "SAP IBP ► Application Jobs ► Inventory Optimization Run",
            "SAP IBP ► Configuration ► Shared/Copy Key Figures (Demand In, Target Stock Out)",
          ],
          tables: ["Consensus Demand KF", "Demand CoV KF", "Recommended Safety Stock KF", "Target Stock KF"],
          tcodes: ["IBP Web UI", "Application Jobs", "Excel Add-In"],
          fiori: ["Inventory Optimization", "Application Jobs", "Manage Copy Operators"],
          configHe: [
            "קלט ל-Inventory: Consensus Demand, Demand Variability (CoV), Lead Time + variability, Service Level.",
            "פלט מ-Inventory: Recommended Safety Stock, Target Stock, Recommended Inventory.",
            "Inventory Optimization Run כ-Application Job.",
            "Copy/Shared KFs להחזרת היעדים ל-S&OP.",
          ],
          flow: [
            { he: "S&OP → ביקוש + שונות", code: "Demand + CoV" },
            { he: "אופטימיזציית מלאי", code: "IBP for Inventory" },
            { he: "יעדי safety/target stock", code: "Recommended Stock" },
            { he: "החזרה ל-S&OP", code: "Target Stock KF" },
            { he: "השפעה על ההיצע", code: "Supply Plan" },
          ],
          masterDataHe: [
            "Demand CoV · Lead Time + variability · Service Level Target.",
            "Recommended Safety Stock · Target Stock Key Figures.",
          ],
          mistakesHe: [
            "הזנת שונות-ביקוש שגויה ➔ safety stock מנופח/חסר.",
            "אי-החזרת יעדי-המלאי ל-S&OP — ההיצע מתעלם מהם.",
            "התעלמות מ-lead time variability — אופטימיזציה לא-ריאלית.",
            "שימוש ב-target stock ידני במקום optimization.",
          ],
          troubleshootHe: [
            "safety stock גבוה מדי ➔ בדוק CoV ו-Service Level Target.",
            "ההיצע לא מתחשב במלאי ➔ ודא החזרת Target Stock ל-S&OP.",
            "אופטימיזציה לא רצה ➔ בדוק Application Job ונתוני-קלט.",
          ],
          bestPracticeHe: [
            "הזן שונות-ביקוש ו-lead time variability מדויקים.",
            "החזר תמיד את יעדי-המלאי ל-S&OP ל-Reconciliation.",
            "השתמש ב-multi-echelon optimization, לא ביעדים ידניים.",
            "הרץ את האופטימיזציה כ-Application Job מתוזמן.",
          ],
          interviewHe: [
            { qHe: "מה מחשב IBP for Inventory ומה הקלט שלו?", aHe: "הוא מחשב Safety/Target Stock אופטימליים מקלט של Consensus Demand, שונות-ביקוש (CoV), lead time + variability ורמת-שירות יעד." },
            { qHe: "מהי לולאת-המשוב בין S&OP ל-Inventory?", aHe: "S&OP מספק ביקוש ושונות; Inventory מחזיר יעדי-מלאי שמשפיעים על דרישת-ההיצע — לולאה שמאזנת שירות מול עלות." },
          ],
          takeawaysHe: [
            "Inventory מחשב יעדי-מלאי אופטימליים מ-ביקוש+שונות.",
            "לולאת-משוב: S&OP→ביקוש, Inventory→יעדי-מלאי→היצע.",
            "שונות-ביקוש ו-lead time variability הם קלט קריטי.",
          ],
          relatedHe: [{ labelHe: "S&OP · תכנון היצע", href: "/library/sop/chapter-05/" }],
        },
        {
          id: "6.3.4",
          titleHe: "אינטגרציה בין תכנון טקטי מבוסס-זמן לתכנון מבוסס-הזמנות",
          titleEn: "Integration between Tactical Time-Series and Order-Based Plans",
          execHe:
            "זהו הגשר הטכני המורכב ביותר: חיבור התכנון הטקטי מבוסס-הזמן (S&OP/Demand — aggregate, תקופתי) לתכנון מבוסס-ההזמנות (IBP for Response — מפורט, אופרטיבי). הוא מחייב disaggregation מ-buckets-זמן לאובייקטי-הזמנה, ומיפוי-attributes בין שני מודלי-נתונים שונים.",
          beginnerHe:
            "Time-series זה כמו לתכנן 'כמה למכור החודש' (סכום גדול, תקופתי). Order-based זה 'אילו הזמנות בדיוק נמלא ובאיזה סדר' (פירוט מלא). כדי לעבור מהאחד לשני צריך 'לפרק' את המספר-החודשי להזמנות יומיות — וזו פעולה עדינה שדורשת כללי-פירוק נכונים.",
          consultantHe:
            "time-series מאחסן Key Figures לפי time bucket ו-attributes; order-based (Response) מאחסן orders/supply elements. ההמרה כוללת disaggregation של ה-aggregate demand ל-daily/weekly buckets ומיפוי attributes (Product/Location/Customer) לאובייקטי-הזמנה. ב-IBP זה מתבצע דרך integration בין Planning Areas (time-series PA → order-based PA) או דרך Demand→Response mapping. שמירה על reconciliation (סכום order-based = aggregate time-series) חיונית.",
          purposeHe:
            "לאפשר שהתוכנית הטקטית תניע ביצוע אופרטיבי (confirmation, deployment, allocation) למרות ההבדל המהותי בין שני מודלי-התכנון.",
          processExampleHe:
            "Consensus Demand חודשי (time-series) מפורק לתחזית-יומית ומומר לדרישות-הזמנה ב-Response; ה-Response מריץ allocation/ATP ומחזיר confirmation; reconciliation מוודא שסכום ההזמנות = הביקוש-הטקטי.",
          cbcHe:
            "ב-CBC: תוכנית-הקיץ החודשית מפורקת לדרישות-יומיות לכל SKU ומרכז-הפצה ומומרת ל-Response, שקובע סדר-deployment בין מרכזי-ההפצה לפי זמינות בפועל.",
          navHe: [
            "SAP IBP for Response ► Order-Based Planning",
            "SAP IBP ► Integration ► Time-Series PA → Order-Based PA",
            "SAP IBP ► Configuration ► Disaggregation & Attribute Mapping",
          ],
          tables: ["Time-Series Planning Area", "Order-Based Planning Area", "Disaggregation Rule", "Attribute Mapping"],
          tcodes: ["IBP Web UI", "Application Jobs", "Data Integration"],
          fiori: ["Order-Based Planning", "Data Integration", "Application Jobs"],
          configHe: [
            "Disaggregation rules: מ-monthly/weekly buckets ל-daily; proportional factors.",
            "Attribute mapping בין time-series attributes לאובייקטי-הזמנה (Product/Location/Customer).",
            "Integration job בין time-series PA ל-order-based PA.",
            "Reconciliation check: סכום order-based = aggregate time-series.",
          ],
          flow: [
            { he: "ביקוש טקטי (aggregate)", code: "Time-Series" },
            { he: "פירוק ל-buckets קטנים", code: "Disaggregation" },
            { he: "מיפוי לאובייקטי-הזמנה", code: "Attribute Mapping" },
            { he: "תכנון מבוסס-הזמנות", code: "IBP for Response" },
            { he: "אימות-סכום", code: "Reconciliation" },
          ],
          masterDataHe: [
            "Disaggregation factors · Attribute mappings.",
            "Time-series Key Figures ↔ Order-based supply/demand elements.",
          ],
          mistakesHe: [
            "disaggregation שגוי ➔ סכום ההזמנות ≠ הביקוש-הטקטי.",
            "מיפוי-attributes חסר ➔ הזמנות חסרות-מימד.",
            "התעלמות מ-reconciliation בין שני המודלים.",
            "ניסיון לתכנן order-based על אופק טקטי-ארוך (לא מתאים).",
          ],
          troubleshootHe: [
            "סכומים לא תואמים ➔ בדוק disaggregation factors ו-rounding.",
            "הזמנות לא נוצרות ב-Response ➔ בדוק attribute mapping ו-integration job.",
            "מימד אבד בהמרה ➔ השלם attribute mapping חסר.",
          ],
          bestPracticeHe: [
            "הקפד על reconciliation: סכום order-based = aggregate time-series.",
            "השתמש ב-Response רק לאופק קצר-בינוני האופרטיבי.",
            "תעד את כללי-ה-disaggregation וה-mapping.",
            "בדוק rounding כדי למנוע סטיות מצטברות.",
          ],
          interviewHe: [
            { qHe: "מהו ההבדל בין time-series ל-order-based planning?", aHe: "time-series מתכנן בסכומים תקופתיים (aggregate, טקטי); order-based מתכנן ברמת-הזמנות בודדות (מפורט, אופרטיבי) כמו ב-IBP for Response." },
            { qHe: "מה נדרש כדי לחבר ביניהם?", aHe: "disaggregation מ-buckets-זמן לאובייקטי-הזמנה, מיפוי-attributes, ו-reconciliation שמוודא שהסכומים תואמים." },
          ],
          takeawaysHe: [
            "הגשר time-series↔order-based הוא החיבור הטכני המורכב ביותר.",
            "דורש disaggregation, attribute mapping ו-reconciliation.",
            "Response = order-based, אופרטיבי, קצר-בינוני.",
          ],
          relatedHe: [{ labelHe: "S&OP · אינטגרציה ל-Demand", href: "/library/sop/chapter-06/#sub-6.3.2" }],
        },
        {
          id: "6.3.5",
          titleHe: "אינטגרציה בין S&OP טקטי לתכנון פיננסי",
          titleEn: "Integration between Tactical S&OP and Financial Planning",
          execHe:
            "אינטגרציה זו מחברת את התוכנית התפעולית הטקטית לתכנון-הפיננסי הארגוני: תרגום היחידות לערך-כספי, השוואה לתקציב, והזנת ה-financial actuals/plan חזרה ל-S&OP. היא סוגרת את הלולאה בין התפעול לכספים ומאפשרת S&OP פיננסית-מודעת.",
          beginnerHe:
            "התוכנית התפעולית צריכה 'לדבר' עם הכספים. כאן מחברים את תוכנית-היחידות לתוכנית-התקציב: התחזית הופכת להכנסות-צפויות, ומשווים אותן ליעד הפיננסי. אם יש פער — חוזרים ומתאימים את התוכנית.",
          consultantHe:
            "האינטגרציה כוללת: (1) Calculated Key Figures שמתרגמים Demand לערך (Revenue/COGS/Margin) בתוך IBP, (2) השוואה ל-Budget Version, ו-(3) חיבור חיצוני ל-financial systems (S/4HANA Group Reporting / FP&A / SAP Analytics Cloud) דרך Data Integration (SAP Cloud Integration / CPI-DS). Key Figure-to-financial-account mapping וכן currency conversion הם קריטיים. ה-actuals מוזרמים חזרה ל-IBP להשוואת plan-vs-actual.",
          purposeHe:
            "להפוך את ה-S&OP לתהליך פיננסי-מודע ולסגור את הפער בין התכנון-התפעולי לתקצוב — כך שההחלטות יתקבלו על-בסיס ערך ולא רק יחידות.",
          processExampleHe:
            "Consensus Demand מתורגם ל-Revenue/COGS ב-IBP; הנתונים מוזרמים ל-SAP Analytics Cloud להשוואה מול תקציב; פער-מרווח מוחזר ל-S&OP ומוביל להתאמת-תמהיל ב-Reconciliation.",
          cbcHe:
            "ב-CBC: תחזית-המשקאות מתורגמת להכנסות-ולעלויות-רבעון ומוזרמת ל-FP&A; פער מול תקציב-המבקבקת מוחזר ומכוון את החלטות-העדיפות ב-Executive Review.",
          navHe: [
            "SAP IBP ► Configuration ► Calculated Financial Key Figures",
            "SAP IBP ► Data Integration ► SAP Cloud Integration (CPI-DS) to Finance",
            "SAP IBP ► Versions ► Budget Version (plan-vs-budget)",
          ],
          tables: ["Calculated Key Figure", "Budget Version", "Currency Conversion", "Integration Mapping"],
          tcodes: ["IBP Web UI", "Data Integration", "Application Jobs"],
          fiori: ["Manage Key Figures", "Data Integration", "Manage Versions"],
          configHe: [
            "Calculated Financial KFs: Revenue/COGS/Margin בתוך IBP.",
            "Currency conversion attributes לארגון רב-מטבעי.",
            "Data Integration (CPI-DS / SAP Cloud Integration) ל-S/4HANA FP&A / SAP Analytics Cloud.",
            "Key Figure-to-financial-account mapping + Budget Version להשוואה.",
          ],
          flow: [
            { he: "ביקוש תפעולי", code: "Consensus Demand" },
            { he: "תרגום לערך", code: "Calculated Financial KFs" },
            { he: "הזרמה לכספים", code: "Data Integration" },
            { he: "השוואה לתקציב", code: "Budget Version" },
            { he: "פער מוחזר ל-S&OP", code: "feedback loop" },
          ],
          masterDataHe: [
            "Price · Standard Cost · Currency · Financial-account mapping.",
            "Revenue/COGS/Margin KFs · Budget Version · Actuals.",
          ],
          mistakesHe: [
            "תרגום-לכסף ב-Excel חיצוני במקום Calculated KFs — אובדן one-number.",
            "אי-מיפוי ל-financial accounts — אינטגרציה חיצונית נכשלת.",
            "התעלמות מ-currency conversion בארגון רב-מטבעי.",
            "חוסר feedback loop — פערי-תקציב לא חוזרים ל-S&OP.",
          ],
          troubleshootHe: [
            "הזרמה לכספים נכשלת ➔ בדוק Data Integration (CPI-DS) ו-account mapping.",
            "Revenue לא תואם ל-FP&A ➔ בדוק currency conversion ו-KF mapping.",
            "פער-תקציב לא מטופל ➔ ודא feedback loop ל-Reconciliation.",
          ],
          bestPracticeHe: [
            "תרגם לכסף בתוך IBP (Calculated KFs), לא חיצונית.",
            "הגדר Key Figure-to-account mapping מדויק ו-currency conversion.",
            "השתמש ב-Data Integration סטנדרטי (CPI-DS / SAP Cloud Integration).",
            "סגור את הלולאה: החזר פערי-תקציב ל-S&OP Reconciliation.",
          ],
          interviewHe: [
            { qHe: "כיצד מחברים S&OP טקטי לתכנון-פיננסי ב-IBP?", aHe: "דרך Calculated Financial Key Figures בתוך IBP, ו-Data Integration (CPI-DS) ל-FP&A/SAP Analytics Cloud, עם account mapping, currency conversion והשוואה ל-Budget Version." },
            { qHe: "מהי לולאת-המשוב הפיננסית?", aHe: "פערי plan-vs-budget מוחזרים ל-S&OP Reconciliation ומובילים להתאמת-תוכנית, כך שה-S&OP נשאר פיננסית-מודע." },
          ],
          takeawaysHe: [
            "האינטגרציה הפיננסית הופכת S&OP לפיננסית-מודע.",
            "Calculated KFs בתוך IBP + Data Integration (CPI-DS) החוצה.",
            "סגור את הלולאה: פערי-תקציב חוזרים ל-Reconciliation.",
          ],
          relatedHe: [{ labelHe: "S&OP · תחזיות פיננסיות", href: "/library/sop/chapter-06/#sub-6.2" }],
        },
      ],
    },
    // ============================================================ 6.4
    {
      id: "6.4",
      titleHe: "סיכום (Summary)",
      titleEn: "Summary",
      execHe:
        "פרק האיחוד הראה כיצד S&OP הופך מאוסף-תכניות-נפרדות לתוכנית-עסקית-אחת מאושרת ומופעלת. שני המפגשים — Integrated Reconciliation ו-Executive Review — סוגרים פערים ומאשרים, והשלב Operationalize מתרגם את ה-Approved Constrained Plan לפעולה דרך אינטגרציה ל-Demand, Inventory, Response ו-Financial Planning.",
      beginnerHe:
        "בפרק הזה ראינו את 'הקו-הסיום' של מחזור ה-S&OP: איך כל התכניות מתאחדות, נפתרות, מאושרות והופכות לפעולה. הנקודה המרכזית — תוכנית-אחת שכולם מסכימים עליה, ההנהלה מאשרת, וכל המערכות פועלות לפיה.",
      consultantHe:
        "מבחינת מימוש, הצלחת האיחוד נשענת על: Planning Area משותף עם Key Figures חוצי-זרמים, Process Management לתיעוד Reconciliation/Review, גרסה מאושרת (Approved/Consensus) מוקפאת כ-snapshot, ו-Copy Operators/Application Jobs לאינטגרציה אוטומטית. ההבחנה time-series↔order-based היא נקודת-העיצוב הקריטית באינטגרציה, ו-Calculated Key Figures + Data Integration סוגרים את הלולאה הפיננסית.",
      purposeHe:
        "לקבע את עקרונות-הליבה של שלב האיחוד כך שהלומד יוכל לתכנן, להריץ ולפתור-תקלות במחזור-S&OP מלא ב-IBP מקצה-לקצה.",
      processExampleHe:
        "מחזור מלא: זרמים מוכנים → Integrated Reconciliation (פערים+תרחישים) → Executive Review (אישור) → Approved Plan מוקפא → Operationalize ל-Demand/Inventory/Response/Financial → ביצוע → actuals חוזרים ל-Management Business Review.",
      cbcHe:
        "ב-CBC: מחזור-הקיץ מסתיים בתוכנית מאושרת שמזינה תחזית, מלאי, deployment והכנסות — ומדודה בחזרה מול תקציב-המבקבקת ב-Review הבא, וכך נסגרת הלולאה התמידית.",
      navHe: [
        "SAP IBP ► Dashboards ► S&OP Process Cockpit (מבט מחזורי כולל)",
        "SAP IBP ► Process Management ► Full Cycle Template",
        "SAP IBP ► Application Jobs ► End-to-End Integration Chain",
      ],
      tables: ["Planning Area", "Key Figure", "Version", "Process Step", "Application Job"],
      tcodes: ["IBP Web UI", "Process Management", "Application Jobs"],
      fiori: ["Dashboards (Advanced)", "Manage Process", "Application Jobs"],
      configHe: [
        "Process Template מלא: Reconciliation → Review → Operationalize.",
        "Approved/Consensus Version מוקפאת כ-snapshot לכל מחזור.",
        "שרשרת Application Jobs לאינטגרציה אוטומטית downstream.",
        "Calculated Financial KFs + Data Integration לסגירת הלולאה הכספית.",
      ],
      flow: [
        { he: "זרמים מוכנים", code: "Demand/Supply/Inv/Fin" },
        { he: "איחוד", code: "Reconciliation" },
        { he: "אישור", code: "Executive Review" },
        { he: "הפעלה", code: "Operationalize" },
        { he: "מדידה וחזרה", code: "Management Review" },
      ],
      masterDataHe: [
        "Approved/Consensus Key Figure · snapshot Version.",
        "Cross-stream Key Figures · Copy Operators · Integration mappings.",
      ],
      mistakesHe: [
        "ניהול האיחוד מחוץ ל-IBP — אובדן מקור-אמת.",
        "אישור בלי snapshot — אין ביקורת.",
        "אינטגרציה ידנית במקום Application Jobs.",
        "התעלמות מהבחנת time-series↔order-based.",
      ],
      troubleshootHe: [
        "מספרים שונים בין מחלקות ➔ Key Figure/Version אחיד.",
        "downstream לא מעודכן ➔ בדוק Copy Operators/Jobs.",
        "אי-התאמה פיננסית ➔ בדוק Calculated KFs ו-Data Integration.",
        "החלטות לא-מתועדות ➔ Process/Case Management.",
      ],
      bestPracticeHe: [
        "מקור-אמת אחד: Planning Area + Approved Version בתוך IBP.",
        "תעד הכל ב-Process Management והקפא snapshot לכל מחזור.",
        "אוטומט אינטגרציה דרך Application Jobs בשרשרת.",
        "סגור את הלולאה: actuals חוזרים ל-Management Business Review.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת התוצרים המרכזיים של שלב האיחוד?", aHe: "(1) תוכנית מאוזנת מ-Reconciliation, (2) Approved Constrained Plan מ-Executive Review, ו-(3) תוכנית מופעלת (Operationalized) ב-Demand/Inventory/Response/Financial." },
        { qHe: "מהי נקודת-העיצוב הקריטית באינטגרציה?", aHe: "ההבחנה בין time-series (S&OP/Demand/Inventory) ל-order-based (Response), המחייבת disaggregation, attribute mapping ו-reconciliation." },
      ],
      takeawaysHe: [
        "האיחוד = Reconciliation → Review → Operationalize.",
        "Approved Constrained Plan הוא מקור-האמת המחייב.",
        "אינטגרציה אוטומטית ל-Demand/Inventory/Response/Financial.",
        "סגור את הלולאה עם Management Business Review מבוסס-actuals.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מבט-על על האיחוד", href: "/library/sop/chapter-06/#sub-6.1" },
        { labelHe: "S&OP · תפעול התוכנית", href: "/library/sop/chapter-06/#sub-6.3" },
      ],
    },
  ],
};
