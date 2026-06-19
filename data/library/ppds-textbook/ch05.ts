// ===== PP/DS Digital Textbook — Chapter 5 (Production Planning) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly (ids + order); x.y.z nested under x.y.
// Transformative Hebrew (beginner + consultant friendly); SAP objects verbatim EN.
// CBC = Coca-Cola bottling PP/DS planning of fill-line production.
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "תכנון ייצור",
  titleEn: "Production Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון-ייצור ב-PP/DS של SAP S/4HANA. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (תכנון קווי-מילוי משקאות), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, השפעת נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד מתי להשתמש ב-PP/DS, את פונקציות-הליבה (Pegging, חישוב-דרישות-נטו, מקור-אספקה), את עולם ה-Heuristics וה-Service Heuristics, הרצת-תכנון אינטראקטיבית/רקע ו-MRP Live, ניטור והערכת-הרצות, ה-Production Planning Optimizer ו-PP/DS עם SAP IBP — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1",
      titleHe: "מתי להשתמש ב-PP/DS לתכנון",
      titleEn: "Determining When PP/DS Should Be Used for Planning",
      execHe:
        "PP/DS (Production Planning and Detailed Scheduling) הוא מנוע-תכנון מתקדם ב-S/4HANA לחומרים בעלי מגבלות-קיבולת קריטיות, צווארי-בקבוק, או דרישת-תזמון-מדויק. ההחלטה אילו חומרים מתוכננים ב-PP/DS לעומת MRP הקלאסי היא החלטה אסטרטגית: PP/DS נותן תכנון מודע-קיבולת (finite), Pegging מפורש ואופטימיזציה — אך עולה בעלות-מורכבות. לא כל חומר צריך אותו.",
      beginnerHe:
        "MRP הקלאסי מניח קיבולת אינסופית — הוא מתכנן 'כמה ומתי' בלי לבדוק אם המכונה פנויה. PP/DS לעומתו יודע שהקו תפוס: הוא מתכנן מול קיבולת-סופית (finite), משבץ פעולות על משאבים אמיתיים, ויודע בדיוק איזו אספקה מכסה איזו דרישה (Pegging). השתמש בו רק לחומרים שבהם התזמון והקיבולת באמת קריטיים — צווארי-בקבוק, קווים יקרים, מוצרים רגישים-לזמן.",
      consultantHe:
        "חומר נכנס ל-PP/DS דרך הדגל Advanced Planning באב-החומר (MARC, תצוגת Advanced Planning) — בעבר העברה ל-SCM/APO דרך CIF, וב-S/4HANA embedded PP/DS דרך אותו client. קריטריוני-בחירה: חומרים עם משאבי-bottleneck, צורך ב-finite scheduling, sequence-dependent setup, Pegging/Block planning, או אופטימיזציה. חומרים 'רגילים' נשארים ב-classic MRP. שים לב: ב-MRP Live חומרי-PP/DS ו-classic מתוכננים בריצה אחת (One MRP Run) אך כל אחד במנועו. Master data רלוונטי: PDS/PPM (לא Routing ישיר), Resources (לא Work Center ישיר), Planning Procedure ו-Heuristic ברמת-מוצר.",
      purposeHe:
        "למקד את ההשקעה בתכנון-מתקדם רק היכן שהיא משתלמת: לתת תכנון מודע-קיבולת ותזמון-מדויק לחומרים הקריטיים, בלי להעמיס מורכבות על כלל ה-portfolio. בחירה נכונה = ROI גבוה; over-engineering (הכל ב-PP/DS) = תחזוקה כבדה ללא ערך.",
      processExampleHe:
        "מפעל מזהה שקו-המילוי הוא צוואר-הבקבוק. המוצרים הזורמים דרכו מסומנים Advanced Planning באב-החומר; חומרי-הגלם והאריזה נשארים classic MRP. בהרצת-MRP-Live חומרי-ה-FERT מתוכננים ב-PP/DS (finite, מול ה-Resource של הקו), בעוד הרכיבים מתוכננים classic — והכל בריצה אחת.",
      cbcHe:
        "ב-CBC קווי-המילוי (Filling Lines) הם צווארי-הבקבוק היקרים: המשקאות המוגמרים (FERT) הזורמים דרכם מסומנים Advanced Planning ומתוכננים ב-PP/DS מול Resources של הקווים, עם sequence-dependent setup (מעבר-טעם/CIP). התרכיז, הסוכר וה-CO2 (ROH) נשארים classic MRP — אין צורך ב-finite scheduling עבורם.",
      navHe: [
        "Production Planning for Process Industries ► Advanced Planning ► Basic Settings ► Activate Advanced Planning",
        "Logistics – General ► Material Master ► ... ► Advanced Planning view (MM02 → Advanced Planning)",
        "Production ► MRP ► Master Data ► Define MRP Type (PP/DS-relevant)",
      ],
      tables: ["MARC", "T437S", "/SAPAPO/MATKEY", "/SAPAPO/MATLWH"],
      tcodes: ["MM02", "MD04", "/SAPAPO/RRP3", "/SAPAPO/MAT1"],
      fiori: ["F1422", "F3331"],
      configHe: [
        "Activate Advanced Planning: הפעלת embedded PP/DS ברמת-client (תנאי-סף).",
        "Advanced Planning view באב-החומר: דגל Advanced Planning + Planning Procedure + PP/DS Heuristic + PP/DS Horizon.",
        "קריטריוני-בחירה ברורים: bottleneck / finite / sequencing / pegging / optimization — אחרת classic MRP.",
      ],
      flow: [
        { he: "זיהוי חומר קריטי (צוואר-בקבוק)", note: "קיבולת/תזמון" },
        { he: "סימון Advanced Planning", code: "MM02", note: "תצוגת Advanced Planning" },
        { he: "הגדרת Planning Procedure + Heuristic", code: "MAT1" },
        { he: "תכנון ב-PP/DS (finite)", code: "/SAPAPO/RRP3" },
        { he: "שאר החומרים → classic MRP", code: "MRP Live" },
      ],
      masterDataHe: [
        "MARC — דגל Advanced Planning + Planning Procedure + PP/DS Horizon ברמת-מוצר/מפעל.",
        "Resources (לא Work Center) ו-PDS/PPM (לא Routing ישיר) הם נתוני-האב של PP/DS.",
      ],
      mistakesHe: [
        "סימון 'הכל' כ-Advanced Planning — מורכבות מיותרת ותחזוקה כבדה ללא ערך.",
        "סימון FERT כ-PP/DS אך השארת רכיביו ללא תכנון נכון — שרשרת חסרה.",
        "שכחת PP/DS Horizon — החומר 'נכנס' אך לא מתוכנן בפועל בטווח הנכון.",
      ],
      troubleshootHe: [
        "חומר לא מתוכנן ב-PP/DS ➔ בדוק דגל Advanced Planning + PP/DS Horizon + Planning Procedure.",
        "תכנון אינו מודע-קיבולת ➔ ה-Heuristic או ה-Resource אינם finite/מוגדרים.",
        "החומר מתוכנן פעמיים ➔ הוגדר גם classic וגם advanced בצורה לא-עקבית.",
      ],
      bestPracticeHe: [
        "החל PP/DS רק על bottlenecks ומוצרים רגישי-תזמון — שמור את ה-portfolio רזה.",
        "תעד קריטריון-בחירה אחיד וגזור ממנו את רשימת-חומרי-ה-PP/DS.",
        "ודא ש-MRP Live מכסה גם classic וגם advanced בריצה אחת.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל המהותי בין classic MRP ל-PP/DS?", aHe: "classic MRP מתכנן בקיבולת-אינסופית (infinite); PP/DS מתכנן מודע-קיבולת (finite), עם Pegging מפורש, sequencing ואופטימיזציה." },
        { qHe: "כיצד חומר 'נכנס' ל-PP/DS?", aHe: "דרך דגל Advanced Planning באב-החומר (תצוגת Advanced Planning ב-MARC) + Planning Procedure ו-PP/DS Horizon; ב-S/4HANA embedded ללא CIF." },
        { qHe: "מתי לא להשתמש ב-PP/DS?", aHe: "לחומרים ללא מגבלת-קיבולת קריטית או דרישת-תזמון-מדויק — שם classic MRP זול ומספיק." },
      ],
      takeawaysHe: [
        "PP/DS = תכנון מודע-קיבולת (finite) + Pegging + sequencing + אופטימיזציה.",
        "סמן Advanced Planning רק לחומרים קריטיים (bottleneck/timing).",
        "MRP Live מתכנן classic ו-advanced בריצה אחת.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הגדרות-בסיס בתכנון (5.2)", href: "/library/ppds/chapter-05/#sub-5.2" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2",
      titleHe: "פונקציות-בסיס בתכנון PP/DS",
      titleEn: "Basic Functions in PP/DS Planning",
      execHe:
        "פונקציות-הבסיס של PP/DS הן אבני-הבניין של כל הרצת-תכנון: Pegging (קישור אספקה↔דרישה), אופק-תכנון וגדר-זמן-תכנון, חישוב-דרישות-נטו, חישוב-כמות-רכש, מלאי-יעד ומלאי-ביטחון, ומקור-אספקה. כל היוריסטיקה משלבת אותן בסדר ובהגדרה שונים — לכן הבנתן היא תנאי להבנת כל מה שבא אחריו.",
      beginnerHe:
        "לפני שלומדים 'מתכונים' (heuristics) צריך להכיר את ה'מרכיבים': כיצד SAP מקשר כל אספקה לדרישה שהיא מכסה (Pegging), עד כמה קדימה הוא מתכנן (אופק), כמה באמת חסר אחרי קיזוז מלאי (נטו), כמה להזמין בכל פעם (lot size), כמה לשמור כריזרבה (מלאי-ביטחון), ומאיפה להביא (מקור). שש אלה חוזרות בכל תכנון.",
      consultantHe:
        "ב-PP/DS הפונקציות פועלות על LiveCache בזמן-אמת. Pegging הוא דינמי (Dynamic Pegging) אלא אם נקבע Fixed Pegging; אופק-התכנון (PP/DS Horizon) תוחם את אזור-הזמן-החופשי, וגדר-הזמן (Planning Time Fence) מקפיא שינויים בטווח-הקרוב. חישוב-נטו מתחשב ב-Pegging ובמלאי-הזמין; חישוב-כמות-רכש לפי lot-sizing procedure (PP/DS-specific); מלאי-יעד ושיטות מלאי-ביטחון (כולל time-based) ב-product master; מקור-אספקה דרך Source Determination על-בסיס PDS/PPM, quota arrangements ו-priorities. כל heuristic (SAP_PP_002 וכו') מפעילה תת-קבוצה מהן בפרמטרים שונים.",
      purposeHe:
        "להגדיר את ההתנהגות-הבסיסית שכל היוריסטיקה תירש: מה מקושר למה, באיזה טווח מתכננים, כמה חסר, כמה מזמינים, כמה שומרים ומאיפה מביאים. שליטה בפונקציות = שליטה בתוצאה.",
      processExampleHe:
        "הרצת-תכנון לחומר: ה-net requirements calculation מזהה חוסר בטווח האופק; ה-lot-sizing יוצר receipt בכמות-רכש מתאימה; ה-Pegging מקשר אותו לדרישה; ה-Source Determination בוחר PDS/קו; מלאי-הביטחון נשמר כ-buffer תחתון. כל זה בתוך ה-PP/DS Horizon ומחוץ ל-Planning Time Fence.",
      cbcHe:
        "ב-CBC: דרישה ל-Coca-Cola 1.5L מקזזת מול מלאי (net), נוצרת הזמנה-מתוכננת בכמות-מינימום-batch של הקו, ה-Pegging מקשר אותה להזמנת-הלקוח, וה-Source Determination בוחר את קו-המילוי המתאים. מלאי-הביטחון על המשקה המוגמר מגן מפני תנודות-ביקוש בקיץ.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Basic Settings",
        "Production Planning for Process Industries ► PP/DS ► Maintain Global Parameters and Defaults",
        "Production Planning for Process Industries ► PP/DS ► Heuristics ► Maintain Heuristics",
      ],
      tables: ["/SAPAPO/MATKEY", "/SAPAPO/ORDKEY", "/SAPAPO/PEGKEY", "MARC"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1", "/SAPAPO/CDPSC0"],
      fiori: ["F3331", "F2101"],
      configHe: [
        "Global Parameters and Defaults: ברירות-מחדל ל-Pegging, lot-sizing, אופק.",
        "Planning Procedure במוצר: קובע אילו פונקציות מופעלות אוטומטית באירוע-תכנון.",
        "Lot-Sizing Procedure ו-Safety Stock method ב-product master (Advanced Planning).",
      ],
      flow: [
        { he: "חישוב דרישות-נטו", note: "דרישה − מלאי − אספקות" },
        { he: "חישוב כמות-רכש", note: "lot-sizing" },
        { he: "Pegging אספקה↔דרישה" },
        { he: "Source Determination", note: "PDS/PPM/quota" },
        { he: "החלת מלאי-ביטחון/יעד" },
      ],
      masterDataHe: [
        "Product master (Advanced Planning): Planning Procedure, Lot-Sizing, Safety Stock, PP/DS Horizon, Planning Time Fence.",
        "PDS/PPM + Resources + Quota arrangements = בסיס Source Determination.",
      ],
      mistakesHe: [
        "ערבוב בין Dynamic ל-Fixed Pegging ללא הבנה — תוצאות-תכנון בלתי-צפויות.",
        "אופק-תכנון קצר מדי — דרישות עתידיות לא מתוכננות.",
        "מלאי-ביטחון כפול (classic + time-based) — עודף-מלאי.",
      ],
      troubleshootHe: [
        "אספקה לא מקושרת לדרישה ➔ בדוק Pegging ו-Pegging intervals.",
        "דרישה לא מתוכננת ➔ מחוץ ל-PP/DS Horizon או בתוך Planning Time Fence.",
        "כמות-רכש שגויה ➔ lot-sizing procedure / מינימום-batch שגויים.",
      ],
      bestPracticeHe: [
        "הבן את שש פונקציות-הבסיס לפני בחירת heuristic.",
        "כייל אופק וגדר-זמן ליחס נכון בין יציבות לגמישות.",
        "בחר שיטת מלאי-ביטחון אחת ועקבית למוצר.",
      ],
      interviewHe: [
        { qHe: "מהן פונקציות-הבסיס של PP/DS?", aHe: "Pegging, אופק-תכנון + Planning Time Fence, חישוב-נטו, חישוב-כמות-רכש, מלאי-יעד/ביטחון, ו-Source Determination." },
        { qHe: "מה היחס בין הפונקציות ל-heuristics?", aHe: "כל heuristic מפעילה תת-קבוצה מהפונקציות בסדר ובפרמטרים שונים; הפונקציות הן אבני-הבניין." },
      ],
      takeawaysHe: [
        "שש פונקציות-בסיס מרכיבות כל הרצת-PP/DS.",
        "הן פועלות על LiveCache בזמן-אמת.",
        "כל heuristic = שילוב שונה של אותן פונקציות.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · היוריסטיקות תכנון (5.3)", href: "/library/ppds/chapter-05/#sub-5.3" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
      children: [
        {
          id: "5.2.1",
          titleHe: "Pegging (קישור אספקה–דרישה)",
          titleEn: "Pegging",
          execHe:
            "Pegging הוא הקשר המפורש בין אלמנט-אספקה (הזמנה-מתוכננת, מלאי) לאלמנט-דרישה שהוא מכסה. הוא לב ה-PP/DS: מאפשר ניתוח-השפעה (מה יקרה אם איחור), rescheduling חכם, ו-fixed pegging להבטחת-הקצאה.",
          beginnerHe:
            "Pegging הוא 'חוט' המחבר כל אספקה לדרישה שהיא נועדה למלא. כך SAP יודע: אם ההזמנה-המתוכננת הזו תתעכב — איזו הזמנת-לקוח תיפגע. בלי Pegging התכנון 'עיוור' לקשרים.",
          consultantHe:
            "שני סוגים: Dynamic Pegging — נקבע מחדש בכל הרצה לפי תאריך/כמות בתוך Pegging intervals; Fixed Pegging — קשר קבוע ששורד הרצות (נוצר/נמחק דרך service heuristics). Pegging מנוהל ב-LiveCache ומוצג ב-/SAPAPO/RRP3 (product view) ובתצוגת-Pegging. פרמטרים: Pegging strategy, alert על under/over-coverage, ו-use of safety stock in pegging.",
          purposeHe:
            "לתת נראות מלאה של 'מה-מכסה-מה' לצורך rescheduling, ניתוח-השפעה והבטחת-הקצאה (ATP/allocation) למוצרים/לקוחות קריטיים.",
          processExampleHe:
            "הזמנת-לקוח ל-1,000 יח' זוכה ל-Pegging מהזמנה-מתוכננת ל-1,000. אם ההזמנה-המתוכננת מתעכבת, מערכת-ה-Alerts מציגה under-coverage על הזמנת-הלקוח — והמתכנן יודע מיד מה לתקן.",
          cbcHe:
            "ב-CBC הזמנת-רשת-קמעונאית ל-Sprite מקבלת Fixed Pegging מ-batch ייצור ספציפי כדי להבטיח אספקה לקמפיין-מבצע — כך התכנון לא 'יגנוב' את ה-batch ללקוח אחר.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Maintain Global Settings for Pegging",
            "Product master ► Advanced Planning ► Pegging (use of safety stock, intervals)",
          ],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/ORDKEY", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/PEG1", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "Global Pegging Settings: maximum earliness/lateness, use of safety stock in pegging.",
            "Pegging strategy במוצר: סדר עדיפויות לקישור (FIFO/priority).",
            "Alerts ל-under/over-coverage דרך Alert Monitor.",
          ],
          flow: [
            { he: "זיהוי דרישה ואספקה", note: "באותו pegging area" },
            { he: "התאמה דינמית", code: "Dynamic", note: "לפי תאריך/כמות" },
            { he: "או קיבוע ידני", code: "Fixed", note: "service heuristic" },
            { he: "Alert על חוסר-כיסוי", note: "Alert Monitor" },
          ],
          masterDataHe: [
            "Product master: Pegging strategy, intervals, use of safety stock.",
          ],
          mistakesHe: [
            "Fixed Pegging מיותר — מקבע אספקות ומונע אופטימיזציה.",
            "Pegging intervals רחבים מדי — קישורים לא-הגיוניים בזמן.",
          ],
          troubleshootHe: [
            "אספקה לא מקושרת ➔ pegging interval או pegging area שגויים.",
            "Fixed Pegging 'תקוע' ➔ הסר דרך Delete Fixed Pegging (service heuristic).",
          ],
          bestPracticeHe: [
            "השאר Dynamic Pegging כברירת-מחדל; Fixed רק לצורך-עסקי מובהק.",
            "נטר under-coverage דרך Alert Monitor.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל Dynamic מול Fixed Pegging?", aHe: "Dynamic נקבע מחדש בכל הרצה לפי זמן/כמות; Fixed קבוע ושורד הרצות, להבטחת-הקצאה." },
            { qHe: "היכן רואים Pegging?", aHe: "ב-product view /SAPAPO/RRP3 ובתצוגת-Pegging הייעודית, על-בסיס LiveCache." },
          ],
          takeawaysHe: [
            "Pegging = החוט בין אספקה לדרישה.",
            "Dynamic (ברירת-מחדל) מול Fixed (הקצאה מובטחת).",
            "בסיס ל-rescheduling וניתוח-השפעה.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · יצירת Fixed Pegging (5.4.4)", href: "/library/ppds/chapter-05/#sub-5.4.4" },
            { labelHe: "PP/DS · מחיקת Fixed Pegging (5.4.5)", href: "/library/ppds/chapter-05/#sub-5.4.5" },
          ],
        },
        {
          id: "5.2.2",
          titleHe: "אופק-תכנון וגדר-זמן-תכנון",
          titleEn: "Planning Horizon and Planning Time Fence",
          execHe:
            "אופק-התכנון (PP/DS Horizon) קובע עד כמה קדימה PP/DS מתכנן; גדר-הזמן (Planning Time Fence) מקפיאה את הטווח-הקרוב מפני שינויים אוטומטיים, כדי לייצב את הביצוע. יחד הם מאזנים בין יציבות-לטווח-קצר לגמישות-לטווח-ארוך.",
          beginnerHe:
            "האופק = 'עד כמה רחוק אני מתכנן'. גדר-הזמן = 'אזור מוקפא קרוב' שבו לא נוגעים בהזמנות כדי לא לזעזע את הרצפה. מה שבתוך הגדר — יציב; מה שמעבר — פתוח לתכנון מחדש.",
          consultantHe:
            "PP/DS Horizon מוגדר ב-product master (Advanced Planning) בימים; מחוצה לו ה-classic MRP מתכנן (אזור-מעבר). Planning Time Fence (PTF) מקפיא יצירה/שינוי/מחיקה אוטומטיים של receipts; בתוכו רק שינויים ידניים או firmed orders. ה-firming יכול להיות time-based (PTF) או manual. שילוב נכון מונע nervousness בתכנון.",
          purposeHe:
            "לייצב את הביצוע הקרוב (אין שינויי-רגע-אחרון) תוך שמירה על גמישות-תכנון בטווח-הרחוק; למנוע 'רעידות' (planning nervousness) שמשבשות את הרצפה.",
          processExampleHe:
            "PTF של 5 ימים: הזמנות-מתוכננות ב-3 הימים הקרובים firmed — הרצת-התכנון לא תזיז אותן גם אם הביקוש השתנה; מעבר ל-5 ימים התכנון חופשי להזיז/לבטל.",
          cbcHe:
            "ב-CBC ה-PTF על קווי-המילוי = שבוע: לוח-הייצור לשבוע הקרוב קפוא (חומרי-גלם כבר נמשכו), והתכנון משנה רק את השבועות הבאים — כך הרצפה יציבה.",
          navHe: [
            "Product master ► Advanced Planning ► PP/DS Horizon",
            "Product master ► Advanced Planning ► Planning Time Fence / Firming",
          ],
          tables: ["MARC", "/SAPAPO/MATLWH"],
          tcodes: ["/SAPAPO/MAT1", "MM02", "/SAPAPO/RRP3"],
          fiori: ["F1422"],
          configHe: [
            "PP/DS Horizon (ימים) ב-product master — תוחם את אזור-ה-PP/DS.",
            "Planning Time Fence + Firming type (time-based/manual) ב-product master.",
          ],
          flow: [
            { he: "הגדרת PP/DS Horizon", code: "/SAPAPO/MAT1" },
            { he: "הגדרת PTF", note: "אזור מוקפא" },
            { he: "Firming בתוך PTF", note: "הזמנות לא-זזות" },
            { he: "תכנון חופשי מעבר ל-PTF" },
          ],
          masterDataHe: [
            "Product master (Advanced Planning): PP/DS Horizon, Planning Time Fence, Firming.",
          ],
          mistakesHe: [
            "אופק קצר מדי — דרישות עתידיות לא מתוכננות ב-PP/DS.",
            "PTF ארוך מדי — אי-יכולת להגיב לשינויי-ביקוש.",
            "PTF קצר מדי — nervousness ושינויי-רגע-אחרון.",
          ],
          troubleshootHe: [
            "דרישה מחוץ-לאופק לא מתוכננת ➔ הארך PP/DS Horizon או הסתמך על classic באזור-המעבר.",
            "הזמנות לא זזות בתכנון ➔ הן firmed בתוך ה-PTF.",
          ],
          bestPracticeHe: [
            "כייל PTF לפי lead-time בפועל ויציבות-הביקוש.",
            "ודא ש-PP/DS Horizon ≥ הטווח שבו נדרש finite scheduling.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-PP/DS Horizon?", aHe: "לתחום עד כמה קדימה PP/DS מתכנן; מחוצה לו classic MRP מטפל." },
            { qHe: "מה עושה Planning Time Fence?", aHe: "מקפיא (firms) את הטווח-הקרוב מפני שינויים אוטומטיים, לייצוב-הביצוע." },
          ],
          takeawaysHe: [
            "אופק = כמה רחוק מתכננים; PTF = אזור מוקפא קרוב.",
            "PTF מונע planning nervousness.",
            "מאזנים יציבות מול גמישות.",
          ],
        },
        {
          id: "5.2.3",
          titleHe: "חישוב דרישות-נטו",
          titleEn: "Net Requirements Calculation",
          execHe:
            "חישוב-דרישות-נטו קובע כמה באמת חסר: דרישות פחות מלאי-זמין פחות אספקות-קיימות, בהתחשב במלאי-ביטחון וב-Pegging. זהו הטריגר ליצירת אספקה חדשה — בלעדיו אין הזמנות-מתוכננות.",
          beginnerHe:
            "נטו = 'כמה חסר באמת'. לוקחים את הדרישות, מורידים את מה שכבר יש במלאי ומה שכבר מוזמן, ומה שנשאר — זה מה שצריך לייצר/לרכוש. אם יש מספיק — לא נוצרת אספקה.",
          consultantHe:
            "ב-PP/DS החישוב מתבצע על-בסיס ה-Pegging וה-stock/receipt elements ב-LiveCache. מלאי-הביטחון מנוכה מהזמין (לפי שיטת-מלאי-הביטחון), ו-firmed receipts בתוך ה-PTF נחשבים. התוצאה היא net requirement שמוזן ל-lot-sizing. שונה מ-classic בכך שהוא מודע-Pegging ו-time-continuous.",
          purposeHe:
            "למנוע ייצור/רכש מיותר (אם יש מלאי) ולהבטיח כיסוי-חוסר במדויק — בסיס לכל יצירת-אספקה ב-PP/DS.",
          processExampleHe:
            "דרישה 1,000; מלאי-זמין 300; מלאי-ביטחון 100. נטו = 1,000 − (300 − 100) = 800 — נוצרת אספקה ל-800 (לפני עיגול-lot).",
          cbcHe:
            "ב-CBC דרישה ל-5,000 ארגזי Coca-Cola, מלאי 1,200, מלאי-ביטחון 500 → נטו 4,300; ה-lot-sizing יעגל למינימום-batch של הקו.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics (net requirements step)",
            "Product master ► Advanced Planning ► Safety Stock",
          ],
          tables: ["/SAPAPO/MATKEY", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "שיטת-מלאי-הביטחון קובעת כמה ממלאי-הזמין מנוכה לפני חישוב-נטו.",
            "Heuristic-step של net requirements בתוך ה-heuristic הראשי.",
          ],
          flow: [
            { he: "סכימת דרישות בטווח" },
            { he: "ניכוי מלאי-זמין" },
            { he: "ניכוי אספקות/firmed receipts" },
            { he: "התחשבות במלאי-ביטחון" },
            { he: "נטו → lot-sizing" },
          ],
          masterDataHe: [
            "Product master: Safety Stock, available stock; Pegging area.",
          ],
          mistakesHe: [
            "התעלמות ממלאי-ביטחון בחישוב — under-coverage.",
            "ספירת firmed receipts פעמיים — under-supply.",
          ],
          troubleshootHe: [
            "אספקה לא נוצרת למרות חוסר ➔ מלאי-ביטחון/מלאי-זמין מכסים בטעות.",
            "אספקה גדולה מהצפוי ➔ מלאי-ביטחון נוכה פעמיים.",
          ],
          bestPracticeHe: [
            "ודא שיטת-מלאי-ביטחון אחת ועקבית.",
            "בדוק net בתצוגת /SAPAPO/RRP3 לפני lot-sizing.",
          ],
          interviewHe: [
            { qHe: "מהו חישוב-דרישות-נטו?", aHe: "דרישות − מלאי-זמין − אספקות, בהתחשב במלאי-ביטחון ו-Pegging; התוצאה מזינה את ה-lot-sizing." },
          ],
          takeawaysHe: [
            "נטו = כמה חסר באמת.",
            "מודע-Pegging ו-time-continuous ב-PP/DS.",
            "טריגר ליצירת-אספקה.",
          ],
        },
        {
          id: "5.2.4",
          titleHe: "חישוב כמות-הרכש",
          titleEn: "Procurement Quantity Calculation",
          execHe:
            "חישוב-כמות-הרכש (lot-sizing) ממיר את ה-net requirement לכמות-אספקה בפועל לפי lot-sizing procedure: lot-for-lot, fixed, periodic, או min/max ועיגולים. כאן נקבע גודל ההזמנה-המתוכננת.",
          beginnerHe:
            "אחרי שיודעים כמה חסר, צריך להחליט בכמה כמות להזמין: בדיוק כמה שחסר (lot-for-lot)? כמות-קבועה? לפי תקופה (יומי/שבועי)? עם מינימום/מקסימום ועיגול? זה ה-lot-sizing.",
          consultantHe:
            "ב-PP/DS ה-lot-sizing procedure מוגדר ב-product master וכולל: lot-for-lot, fixed lot, by period (daily/weekly), reorder-point, וכן minimum/maximum/rounding value ו-rounding profile. PP/DS תומך גם ב-procedures מתקדמים יותר וב-target stock level. ה-Optimizer יכול לעקוף lot-sizing פשוט לטובת אופטימיזציית-עלות.",
          purposeHe:
            "לאזן בין עלויות-החזקה (lots קטנים) לעלויות-setup/הזמנה (lots גדולים), ולכבד אילוצי-מינימום/מקסימום/אריזה.",
          processExampleHe:
            "נטו 800; minimum lot 1,000; rounding 100 → אספקה 1,000. נטו 2,350; periodic weekly → אספקה אחת ל-2,350 לשבוע.",
          cbcHe:
            "ב-CBC מינימום-batch של קו-מילוי = 1,000 ארגזים, rounding לפי משטח (pallet) = 48 → כל הזמנה-מתוכננת מעוגלת למשטחים שלמים מעל המינימום.",
          navHe: [
            "Product master ► Advanced Planning ► Lot Size",
            "Production ► MRP ► Lot-Size Calculation ► Rounding Profiles",
          ],
          tables: ["MARC", "/SAPAPO/MATLWH"],
          tcodes: ["/SAPAPO/MAT1", "MM02", "OWD1"],
          fiori: ["F1422"],
          configHe: [
            "Lot-Sizing Procedure ב-product master: L4L / fixed / periodic / reorder-point.",
            "Minimum / Maximum lot, Rounding value, Rounding Profile.",
          ],
          flow: [
            { he: "קלט: net requirement" },
            { he: "החלת lot-sizing procedure" },
            { he: "אכיפת min/max" },
            { he: "עיגול (rounding profile)" },
            { he: "כמות-אספקה סופית" },
          ],
          masterDataHe: [
            "Product master: Lot-Sizing Procedure, Min/Max, Rounding value/profile.",
          ],
          mistakesHe: [
            "מינימום-lot גבוה מדי — עודף-מלאי כרוני.",
            "ללא rounding — כמויות לא-מעשיות (לא משטחים שלמים).",
          ],
          troubleshootHe: [
            "כמות-הזמנה לא-הגיונית ➔ procedure / min/max / rounding שגויים.",
            "lots קטנים ורבים מדי ➔ עבור מ-L4L ל-periodic.",
          ],
          bestPracticeHe: [
            "התאם lot-sizing ל-setup-cost מול holding-cost בפועל.",
            "השתמש ב-rounding profile ליחידות-אריזה מעשיות.",
          ],
          interviewHe: [
            { qHe: "מהן שיטות-ה-lot-sizing העיקריות?", aHe: "Lot-for-lot, fixed lot, periodic (יומי/שבועי), reorder-point — עם min/max ועיגול." },
          ],
          takeawaysHe: [
            "lot-sizing ממיר נטו לכמות-אספקה בפועל.",
            "מאזן setup מול holding.",
            "min/max/rounding אוכפים מעשיות.",
          ],
        },
        {
          id: "5.2.5",
          titleHe: "מלאי-יעד ושיטות מלאי-ביטחון",
          titleEn: "Target Stock Level and Safety Stock Methods",
          execHe:
            "מלאי-היעד ושיטות-מלאי-הביטחון מגדירים את ה-buffer מול אי-ודאות בביקוש ובאספקה. PP/DS תומך במלאי-ביטחון קבוע, ב-time-based safety stock וב-target days' supply — והבחירה משפיעה ישירות על שירות מול עלות-החזקה.",
          beginnerHe:
            "מלאי-ביטחון = ריזרבה למקרה שהביקוש קופץ או האספקה מתעכבת. אפשר להגדיר אותו ככמות-קבועה, כמות-משתנה-בזמן, או כ'מלאי לכך-וכך-ימים'. יותר ביטחון = שירות טוב יותר אבל מלאי יקר יותר.",
          consultantHe:
            "שיטות: SB (safety stock קבוע), time-based safety stock (פרופיל לאורך-זמן), ו-target days' supply / target stock level (מלאי-יעד דינמי כפונקציית-ביקוש). מוגדר ב-product master (Advanced Planning). PP/DS יכול לתכנן עד ל-target stock level (לא רק לכיסוי-נטו), מה שמייצר build-ahead מבוקר. שילוב עם service level ו-MRP heuristic.",
          purposeHe:
            "להגן על רמת-השירות מול תנודתיות, ולאפשר build-ahead מבוקר עד מלאי-יעד — תוך שמירה על עלות-החזקה סבירה.",
          processExampleHe:
            "Target days' supply = 5: התכנון בונה מלאי עד כיסוי 5 ימי-ביקוש קדימה, גם אם אין דרישה מיידית — מחליק עומסים.",
          cbcHe:
            "ב-CBC בקיץ מעלים את target days' supply על משקאות-שיא (Coca-Cola, Sprite) כדי לספוג קפיצות-ביקוש; בחורף מורידים כדי לא להחזיק עודף.",
          navHe: [
            "Product master ► Advanced Planning ► Safety Stock / Target Stock",
            "Production Planning for Process Industries ► PP/DS ► Safety Stock Planning",
          ],
          tables: ["MARC", "/SAPAPO/MATLWH"],
          tcodes: ["/SAPAPO/MAT1", "MM02"],
          fiori: ["F1422"],
          configHe: [
            "Safety Stock method ב-product master: SB קבוע / time-based / target days' supply.",
            "Target Stock Level — תכנון עד-ליעד (build-ahead מבוקר).",
          ],
          flow: [
            { he: "בחירת שיטת-מלאי-ביטחון" },
            { he: "הגדרת ערך/פרופיל/ימי-כיסוי" },
            { he: "ניכוי/תכנון-עד-יעד בחישוב-נטו" },
            { he: "buffer מוגן ברצפה" },
          ],
          masterDataHe: [
            "Product master: Safety Stock (SB/time-based), Target Days' Supply, Target Stock Level.",
          ],
          mistakesHe: [
            "מלאי-ביטחון אחיד לכל המוצרים — עודף בחלקם, מחסור באחרים.",
            "שילוב time-based + קבוע ללא כוונה — buffer כפול.",
          ],
          troubleshootHe: [
            "עודף-מלאי כרוני ➔ target days' supply / safety stock גבוהים מדי.",
            "מחסור חוזר ➔ buffer נמוך מדי מול תנודתיות.",
          ],
          bestPracticeHe: [
            "גזר מלאי-ביטחון מ-service level וסטיית-ביקוש בפועל.",
            "השתמש ב-time-based לעונתיות (קיץ/חורף).",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין safety stock קבוע ל-time-based?", aHe: "קבוע = ערך אחיד; time-based = פרופיל המשתנה לאורך-זמן (למשל עונתי)." },
            { qHe: "מהו target stock level?", aHe: "מלאי-יעד שאליו התכנון בונה (build-ahead), לא רק כיסוי-נטו מיידי." },
          ],
          takeawaysHe: [
            "מלאי-ביטחון מאזן שירות מול עלות.",
            "שיטות: קבוע / time-based / target days' supply.",
            "target stock level מאפשר build-ahead מבוקר.",
          ],
        },
        {
          id: "5.2.6",
          titleHe: "קביעת מקור-אספקה",
          titleEn: "Source Determination",
          execHe:
            "Source Determination בוחר מאיפה תגיע האספקה: איזה PDS/PPM (ייצור-עצמי), איזה ספק (רכש), או העברה (stock transfer), לפי priorities ו-quota arrangements. זו ההחלטה 'מאיפה' שמשלימה את 'כמה' ו'מתי'.",
          beginnerHe:
            "אחרי שיודעים כמה ומתי, צריך להחליט מאיפה: לייצר באיזה קו? לקנות מאיזה ספק? להעביר מאיזה מפעל? מערכת-המקור בוחרת לפי עדיפויות ומכסות (quota) שהוגדרו.",
          consultantHe:
            "PP/DS בוחר source על-בסיס PDS (Production Data Structure) או PPM, transportation lanes (לרכש/העברה), priorities ו-quota arrangements. ה-Quota Heuristic (5.3.6) מחלקת לפי מכסות. בחירת-מקור יכולה להיות אוטומטית בהרצה או ידנית ב-/SAPAPO/RRP3. ה-Optimizer שוקל גם עלויות-מקור. PDS נוצר מ-Production Version (CIF/migration).",
          purposeHe:
            "להבטיח שכל אספקה משויכת למקור בר-ביצוע ואופטימלי (עלות/קיבולת/מרחק), תוך כיבוד הסכמי-מכסה ועדיפויות.",
          processExampleHe:
            "מוצר ניתן לייצור בשני קווים (PDS_A עדיפות 1, PDS_B עדיפות 2). אם קו A מלא — ה-Source Determination/Quota מפנה ל-B; אחרת A מועדף.",
          cbcHe:
            "ב-CBC משקה ניתן למילוי בקו-1 או קו-2; quota arrangement מחלק 70/30, וה-Source Determination בוחר את הקו לכל הזמנה-מתוכננת לפי המכסה והקיבולת.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Source Determination",
            "Master Data ► Production Data Structure (PDS) / Quota Arrangements",
          ],
          tables: ["/SAPAPO/PPM", "/SAPAPO/PDS", "MARC", "TQUOT"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/SCC_TL1", "MEQ1"],
          fiori: ["F3331"],
          configHe: [
            "PDS/PPM כמקור-ייצור; transportation lanes לרכש/העברה.",
            "Priorities + Quota arrangements לחלוקה בין מקורות.",
            "Source Determination אוטומטי בהרצה או ידני ב-RRP3.",
          ],
          flow: [
            { he: "זיהוי מקורות-אפשריים", note: "PDS/PPM/lane" },
            { he: "החלת priorities" },
            { he: "החלת quota arrangement" },
            { he: "בחירת מקור לאספקה" },
          ],
          masterDataHe: [
            "PDS/PPM, Production Versions, Quota arrangements, Transportation lanes.",
          ],
          mistakesHe: [
            "PDS חסר/לא-מסונכרן ➔ אין מקור-ייצור והאספקה נכשלת.",
            "quota arrangement לא-עקבי ➔ חלוקה לא-צפויה בין קווים.",
          ],
          troubleshootHe: [
            "אספקה ללא מקור ➔ חסר PDS/PPM פעיל או lane.",
            "חלוקה שגויה בין מקורות ➔ priorities/quota שגויים.",
          ],
          bestPracticeHe: [
            "ודא PDS פעיל ומסונכרן לכל חומר-PP/DS.",
            "נהל quota arrangements במפורש ל-multi-line.",
          ],
          interviewHe: [
            { qHe: "כיצד PP/DS בוחר מקור-אספקה?", aHe: "לפי PDS/PPM (ייצור) או lanes (רכש/העברה), priorities ו-quota arrangements." },
            { qHe: "מהו PDS?", aHe: "Production Data Structure — מבנה-הייצור (BOM+Routing) ל-PP/DS, נגזר מ-Production Version." },
          ],
          takeawaysHe: [
            "Source Determination = ההחלטה 'מאיפה'.",
            "PDS/PPM + priorities + quota.",
            "ה-Optimizer שוקל גם עלות-מקור.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · Quota Heuristic (5.3.6)", href: "/library/ppds/chapter-05/#sub-5.3.6" },
          ],
        },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3",
      titleHe: "מינוף היוריסטיקות תכנון",
      titleEn: "Leveraging Planning Heuristics",
      execHe:
        "Heuristics הן 'מתכונים' מובנים המגדירים אילו פונקציות-תכנון מורצות, על אילו אובייקטים ובאיזה סדר. SAP מספק heuristics סטנדרטיות (SAP_PP_002 לתכנון-lots סטנדרטי, SAP_MRP_001 ל-MRP) שניתן לשייך למוצר או להריץ ידנית. הן מנגנון-הליבה של תכנון-PP/DS.",
      beginnerHe:
        "Heuristic = מתכון-תכנון מוכן. במקום להגדיר כל פעם מה לעשות, בוחרים heuristic שכבר יודעת: 'חשב נטו, צור lots, peg, קבע מקור'. ל-SAP יש heuristics מוכנות (כמו SAP_PP_002) ואפשר גם להתאים משלך.",
      consultantHe:
        "Heuristics מוגדרות ב-/SAPAPO/RRPCUST1 ומשויכות למוצר דרך Planning Procedure או נבחרות בהרצה (interactive/background). כל heuristic מורכבת מ-algorithm (function module) + settings. סוגים: product heuristics (פועלות על מוצר), service heuristics (5.4, פועלות על קשרים/סדר), flow control. דוגמאות: SAP_PP_002 (Planning of Standard Lots), SAP_MRP_001, SAP_PP_003 (reorder point), SAP_PP_C001 (co-products). ניתן לקבץ ל-heuristic profiles ו-planning sequences.",
      purposeHe:
        "לתת למתכנן ספריית-אלגוריתמים מוכנה לכל תרחיש-תכנון, עקבית וניתנת-לשיוך — במקום קוד אד-הוק; ולשלוט במדויק מה רץ על מה.",
      processExampleHe:
        "מתכנן מריץ SAP_PP_002 על מוצר: ה-heuristic מחשבת נטו, יוצרת הזמנות-מתוכננות לפי lot-sizing, מבצעת Pegging וקובעת מקור — הכל בצעד אחד מתוך /SAPAPO/RRP3.",
      cbcHe:
        "ב-CBC המשקאות המוגמרים משויכים ל-SAP_PP_002 (תכנון-lots סטנדרטי) דרך ה-Planning Procedure; חומרים מנוהלי-reorder-point (חלקי-CIP) משויכים ל-SAP_PP_003.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Heuristics ► Maintain Heuristics",
        "Production Planning for Process Industries ► PP/DS ► Heuristics ► Define Profiles",
      ],
      tables: ["/SAPAPO/HEUR", "/SAPAPO/MATKEY", "MARC"],
      tcodes: ["/SAPAPO/RRPCUST1", "/SAPAPO/RRP3", "/SAPAPO/CDPSC0"],
      fiori: ["F3331", "F2101"],
      configHe: [
        "Maintain Heuristics (/SAPAPO/RRPCUST1): algorithm + settings לכל heuristic.",
        "שיוך למוצר דרך Planning Procedure (product master).",
        "Heuristic profiles ו-planning sequences לקיבוץ.",
      ],
      flow: [
        { he: "בחירת heuristic", code: "SAP_PP_002" },
        { he: "בחירת אובייקטים", note: "מוצר/מפעל" },
        { he: "הרצה", code: "/SAPAPO/RRP3", note: "interactive/background" },
        { he: "תוצאה: הזמנות-מתוכננות + Pegging" },
      ],
      masterDataHe: [
        "Planning Procedure (product master) קובע heuristic ברירת-מחדל לאירוע-תכנון.",
      ],
      mistakesHe: [
        "שימוש ב-heuristic לא-מתאימה לסוג-החומר — תוצאות שגויות.",
        "התאמת heuristic מותאמת כשהסטנדרטית מספיקה.",
      ],
      troubleshootHe: [
        "heuristic לא רצה על המוצר ➔ Planning Procedure/שיוך שגוי.",
        "תוצאה לא-צפויה ➔ settings של ה-heuristic או סדר-הצעדים.",
      ],
      bestPracticeHe: [
        "העדף heuristics סטנדרטיות (SAP_PP_002/SAP_MRP_001).",
        "שייך heuristic נכונה לכל סוג-חומר דרך Planning Procedure.",
      ],
      interviewHe: [
        { qHe: "מהי heuristic ב-PP/DS?", aHe: "אלגוריתם-תכנון מובנה (function module + settings) הקובע אילו פונקציות רצות, על מה ובאיזה סדר." },
        { qHe: "מהו SAP_PP_002?", aHe: "ה-heuristic הסטנדרטית ל-Planning of Standard Lots — חישוב-נטו, יצירת lots, Pegging, מקור." },
      ],
      takeawaysHe: [
        "Heuristics = מתכוני-תכנון מוכנים.",
        "SAP_PP_002 / SAP_MRP_001 הן הסטנדרטיות.",
        "משויכות דרך Planning Procedure או נבחרות בהרצה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · היוריסטיקות שירות (5.4)", href: "/library/ppds/chapter-05/#sub-5.4" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
      children: [
        {
          id: "5.3.1",
          titleHe: "תכנון lots סטנדרטיים",
          titleEn: "Planning of Standard Lots",
          execHe:
            "SAP_PP_002 — ה-heuristic הנפוצה ביותר: מבצעת חישוב-דרישות-נטו, יצירת-אספקה לפי lot-sizing, Pegging וקביעת-מקור עבור מוצר יחיד. זו ברירת-המחדל לתכנון רוב חומרי-ה-PP/DS.",
          beginnerHe:
            "ה'מתכון הרגיל': לוקח מוצר, מחשב כמה חסר, יוצר הזמנות-מתוכננות, מקשר אותן לדרישות וקובע מאיפה לייצר. רוב המוצרים מתוכננים כך.",
          consultantHe:
            "SAP_PP_002 (algorithm Planning of Standard Lots) פועלת על מוצר/מפעל. צעדים: net requirements → lot-sizing → create receipts → scheduling (forward/backward) → Pegging → source. נשלטת דרך settings (planning mode, scheduling) וה-product master (lot-size, horizon). זו ה-heuristic ש-Planning Procedure ברירת-מחדל מפעיל.",
          purposeHe:
            "לתת תכנון-מוצר מקצה-לקצה בצעד אחד עבור המקרה-הסטנדרטי, בלי הגדרות מיוחדות.",
          processExampleHe:
            "מתכנן בוחר מוצר ב-/SAPAPO/RRP3 ומריץ SAP_PP_002: נוצרות הזמנות-מתוכננות מתוזמנות וממוקרות-Pegging לכיסוי כל הדרישות בטווח-האופק.",
          cbcHe:
            "ב-CBC כל משקה מוגמר מתוכנן ב-SAP_PP_002: ההזמנות-המתוכננות מתוזמנות מול קו-המילוי וממוקרות להזמנות-הלקוחות.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► SAP_PP_002",
            "Product master ► Advanced Planning ► Planning Procedure",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "settings ל-SAP_PP_002: planning mode, scheduling direction, treat firmed orders.",
          ],
          flow: [
            { he: "נטו", note: "net requirements" },
            { he: "lot-sizing → receipts" },
            { he: "scheduling" },
            { he: "Pegging + source" },
          ],
          masterDataHe: ["Product master: lot-size, horizon, Planning Procedure → SAP_PP_002."],
          mistakesHe: [
            "ציפייה ל-finite scheduling מ-SAP_PP_002 ללא הגדרת-משאב מתאימה.",
            "הרצה על מוצר שדורש heuristic מיוחדת (co-products) — שגוי.",
          ],
          troubleshootHe: [
            "אין הזמנות-מתוכננות ➔ אין net (מלאי מכסה) או horizon קצר.",
            "תזמון שגוי ➔ scheduling direction / settings.",
          ],
          bestPracticeHe: [
            "השתמש כברירת-מחדל לרוב החומרים.",
            "השאר finite scheduling ל-DS/Optimizer לפי הצורך.",
          ],
          interviewHe: [
            { qHe: "מה עושה SAP_PP_002?", aHe: "Planning of Standard Lots — נטו, lot-sizing, scheduling, Pegging ומקור למוצר יחיד." },
          ],
          takeawaysHe: [
            "SAP_PP_002 = ה-heuristic הסטנדרטית.",
            "תכנון-מוצר מקצה-לקצה בצעד אחד.",
            "ברירת-המחדל לרוב החומרים.",
          ],
        },
        {
          id: "5.3.2",
          titleHe: "תכנון נקודת-הזמנה-מחדש (Reorder Point)",
          titleEn: "Reorder Point Planning",
          execHe:
            "תכנון reorder-point יוצר אספקה כשהמלאי-הזמין יורד מתחת לנקודת-הזמנה מוגדרת — שיטה פשוטה לחומרים בעלי ביקוש יציב, ללא צורך בחישוב-דרישות מלא.",
          beginnerHe:
            "כמו 'מים בקבוק שמתמלא מאליו': כשהמלאי יורד מתחת לקו אדום (reorder point) — מזמינים אוטומטית כמות קבועה. פשוט ומהיר, מתאים לפריטים שתמיד נצרכים בקצב דומה.",
          consultantHe:
            "ה-heuristic (SAP_PP_003) משווה available stock ל-reorder point; כשמתחת — יוצרת receipt בכמות lot-size. ניתן manual reorder point או automatic (מחושב מ-forecast + service level). מתאים ל-C-items ולחומרי-עזר. ב-PP/DS פחות נפוץ מ-MRP heuristic אך נתמך.",
          purposeHe:
            "לתכנן פריטים בעלי ביקוש-רציף בעלות-תכנון נמוכה, בלי דרישות-תלויות מפורטות.",
          processExampleHe:
            "Reorder point 500, lot 2,000: כשמלאי יורד ל-480 — נוצרת אספקה ל-2,000.",
          cbcHe:
            "ב-CBC חומרי-עזר (חומרי-ניקוי CIP, סיכה) מנוהלים reorder-point — נצרכים ברציפות, לא דורשים תכנון-דרישות מפורט.",
          navHe: [
            "Product master ► Advanced Planning ► MRP Type (reorder point) + Reorder Point",
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► SAP_PP_003",
          ],
          tables: ["MARC", "/SAPAPO/MATLWH"],
          tcodes: ["/SAPAPO/MAT1", "MM02", "/SAPAPO/RRP3"],
          fiori: ["F1422"],
          configHe: [
            "Reorder Point + lot-size ב-product master; MRP Type מסוג reorder-point.",
            "אוטומטי: חישוב reorder point מ-forecast + service level.",
          ],
          flow: [
            { he: "מעקב מלאי-זמין" },
            { he: "ירידה מתחת ל-reorder point" },
            { he: "יצירת receipt בכמות lot" },
          ],
          masterDataHe: ["Product master: Reorder Point, lot-size, MRP Type."],
          mistakesHe: [
            "reorder-point לחומר בעל ביקוש-תנודתי — מחסור/עודף.",
            "reorder point ידני שלא עודכן מול שינוי-ביקוש.",
          ],
          troubleshootHe: [
            "אספקה לא נוצרת ➔ מלאי לא ירד מתחת ל-reorder point.",
            "הזמנות תכופות מדי ➔ reorder point/lot שגויים.",
          ],
          bestPracticeHe: [
            "הגבל ל-C-items וחומרי-עזר בעלי ביקוש-יציב.",
            "שקול automatic reorder point לעדכון-עצמי.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-reorder point planning?", aHe: "לחומרים בעלי ביקוש-רציף ויציב (C-items/עזר), כשתכנון-דרישות מלא מיותר." },
          ],
          takeawaysHe: [
            "מלאי < reorder point → אספקה אוטומטית.",
            "פשוט, מתאים ל-C-items.",
            "SAP_PP_003 / MRP Type reorder-point.",
          ],
        },
        {
          id: "5.3.3",
          titleHe: "תכנון lots סטנדרטיים בשלושה אופקים",
          titleEn: "Planning of Standard Lots in Three Horizons",
          execHe:
            "וריאנט של תכנון-lots המחלק את ציר-הזמן לשלושה אופקים עם התנהגות-תכנון שונה בכל אחד — למשל פירוט גבוה בקרוב, גס יותר ברחוק — לאיזון בין דיוק לעומס-חישוב ויציבות.",
          beginnerHe:
            "במקום להתייחס לכל הזמן באותו אופן, מחלקים לשלושה אזורים: קרוב (מדויק/מוקפא), בינוני, ורחוק (גס/גמיש). כל אזור מתוכנן אחרת — קרוב יציב, רחוק פתוח-לשינוי.",
          consultantHe:
            "ה-heuristic מגדירה שלושה horizons (למשל PTF, detailed, rough) עם lot-sizing/scheduling שונה בכל. בקרוב — finite ומפורט; ברחוק — period lot-sizing גס. מקטין nervousness ועומס-חישוב תוך שמירת-דיוק היכן שחשוב. נשלט דרך settings של ה-heuristic.",
          purposeHe:
            "לאזן בין דיוק-תכנון (קרוב) ליציבות וביצועים (רחוק); להימנע מפירוט-יתר בטווח שעוד ישתנה.",
          processExampleHe:
            "אופק 1 (0–5 ימים): finite, lot-for-lot; אופק 2 (5–20): periodic שבועי; אופק 3 (20+): periodic חודשי גס.",
          cbcHe:
            "ב-CBC קווי-המילוי מתוכננים מפורט-finite לשבוע הקרוב, שבועי לחודש, וחודשי-גס לרבעון — מדויק היכן שמייצרים, גמיש היכן שלא.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Planning in Three Horizons",
          ],
          tables: ["/SAPAPO/HEUR", "MARC"],
          tcodes: ["/SAPAPO/RRPCUST1", "/SAPAPO/RRP3"],
          fiori: ["F3331"],
          configHe: [
            "הגדרת שלושה horizons + lot-sizing/scheduling שונה בכל אופק ב-settings של ה-heuristic.",
          ],
          flow: [
            { he: "אופק קרוב — מדויק/finite" },
            { he: "אופק בינוני — periodic" },
            { he: "אופק רחוק — גס/גמיש" },
          ],
          masterDataHe: ["Product master: horizons + lot-sizing per zone."],
          mistakesHe: [
            "גבולות-אופקים שגויים — חפיפה או פערים בכיסוי.",
            "פירוט-יתר ברחוק — עומס-חישוב מיותר.",
          ],
          troubleshootHe: [
            "תכנון לא-עקבי בין אופקים ➔ גבולות/settings שגויים.",
          ],
          bestPracticeHe: [
            "כייל גבולות-אופקים ל-lead-time וליציבות-ביקוש.",
            "השאר רחוק גס; דייק רק בקרוב.",
          ],
          interviewHe: [
            { qHe: "מה היתרון בתכנון בשלושה אופקים?", aHe: "דיוק היכן שצריך (קרוב) ויציבות/ביצועים היכן שלא (רחוק), עם פחות nervousness." },
          ],
          takeawaysHe: [
            "שלושה אזורי-זמן, התנהגות שונה בכל.",
            "קרוב מדויק, רחוק גס.",
            "מאזן דיוק מול ביצועים.",
          ],
        },
        {
          id: "5.3.4",
          titleHe: "MRP Heuristic",
          titleEn: "MRP Heuristic",
          execHe:
            "SAP_MRP_001 — ה-heuristic המבצעת תכנון-דרישות-חומרים קלאסי בתוך PP/DS: חישוב-נטו ויצירת-אספקה ללא finite scheduling, מקבילה ל-MRP אך על נתוני-PP/DS וב-LiveCache.",
          beginnerHe:
            "זו ה-heuristic שמתנהגת כמו MRP רגיל בתוך PP/DS: מחשבת כמה חסר ויוצרת הזמנות, בלי לדאוג לקיבולת-הקו. שימושית כשרוצים תכנון-כמויות מהיר בלי תזמון-מדויק.",
          consultantHe:
            "SAP_MRP_001 מבצעת net requirements + lot-sizing + Pegging ללא finite scheduling (infinite). מהירה, מתאימה לתכנון-כמויות או לחומרים שאינם bottleneck בתוך scope-ה-PP/DS. לרוב משולבת עם heuristic נפרדת ל-detailed scheduling. ב-MRP Live זו ה-heuristic שמתכננת חומרי-PP/DS שאינם דורשים תזמון-מדויק.",
          purposeHe:
            "לבצע תכנון-כמויות מהיר (infinite) בתוך עולם-ה-PP/DS, ולהפריד את שלב-הכמויות משלב-התזמון-המפורט.",
          processExampleHe:
            "SAP_MRP_001 רצה על קבוצת-מוצרים ויוצרת הזמנות-מתוכננות לכל החוסר; אחר-כך heuristic של detailed scheduling משבצת אותן על המשאבים.",
          cbcHe:
            "ב-CBC רכיבי-ביניים (תערובות) מתוכננים ב-SAP_MRP_001 לכמויות, בעוד המשקאות-המוגמרים על הקווים מקבלים detailed scheduling נפרד.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► SAP_MRP_001",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "settings ל-SAP_MRP_001: net requirements + lot-sizing, ללא finite scheduling.",
          ],
          flow: [
            { he: "נטו" },
            { he: "lot-sizing → receipts" },
            { he: "Pegging (infinite)" },
            { he: "detailed scheduling בנפרד" },
          ],
          masterDataHe: ["Product master: lot-size, Planning Procedure → SAP_MRP_001."],
          mistakesHe: [
            "ציפייה ל-finite scheduling מ-SAP_MRP_001 (היא infinite).",
            "שכחת שלב detailed scheduling אחר-כך.",
          ],
          troubleshootHe: [
            "הזמנות חורגות מקיבולת ➔ זו heuristic infinite; הוסף DS/Optimizer.",
          ],
          bestPracticeHe: [
            "השתמש לתכנון-כמויות מהיר; השלם בתזמון-מפורט.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין SAP_MRP_001 ל-SAP_PP_002?", aHe: "שתיהן מתכננות כמויות; SAP_PP_002 כולל scheduling מלא של ה-receipts, ו-SAP_MRP_001 מתמקד ב-net/lot-sizing דמוי-MRP (infinite)." },
          ],
          takeawaysHe: [
            "SAP_MRP_001 = MRP בתוך PP/DS (infinite).",
            "תכנון-כמויות מהיר.",
            "משלימים בתזמון-מפורט.",
          ],
        },
        {
          id: "5.3.5",
          titleHe: "Demand Propagation Heuristic",
          titleEn: "Demand Propagation Heuristic",
          execHe:
            "Demand propagation מפיצה דרישות לאורך ה-BOM/PDS מהמוצר-הסופי כלפי מטה לרכיבים, בלי לבצע lot-sizing מלא — מעדכנת את תמונת-הדרישות-התלויות במהירות לפני תכנון מפורט.",
          beginnerHe:
            "כשמשנים דרישה למוצר-סופי, הרכיבים שמתחתיו צריכים 'לדעת'. ה-heuristic הזו 'מזרימה' את הדרישה כלפי מטה בעץ-המוצר, כדי שכל הרמות יראו את הצורך המעודכן.",
          consultantHe:
            "ה-heuristic מבצעת BOM/PDS explosion ויוצרת/מעדכנת dependent requirements ללאת ליצור receipts או לתזמן. שימושית לסנכרון מהיר של low-level codes לפני הרצת תכנון-lots/scheduling, ולתרחישי what-if. מהירה כי מדלגת על lot-sizing ו-scheduling.",
          purposeHe:
            "לעדכן במהירות את הדרישות-התלויות בכל רמות-ה-BOM אחרי שינוי-ביקוש, כהכנה לתכנון-מפורט.",
          processExampleHe:
            "שינוי דרישה ל-FERT מופץ דרך ה-PDS: התרכיז, הסוכר וה-CO2 מקבלים dependent requirements מעודכנות — אחר-כך heuristic אחרת יוצרת אספקה.",
          cbcHe:
            "ב-CBC קפיצת-ביקוש ל-Coca-Cola מופצת מיד כלפי-מטה לתרכיז ולסוכר, כך שתכנון-הרכיבים יראה את הצורך עוד באותה הרצה.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Demand Propagation",
          ],
          tables: ["/SAPAPO/PDS", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "settings: explosion + dependent requirements בלבד, ללא lot-sizing/scheduling.",
          ],
          flow: [
            { he: "שינוי דרישה למוצר-עליון" },
            { he: "explosion דרך PDS" },
            { he: "עדכון dependent requirements" },
            { he: "תכנון-מפורט בהמשך" },
          ],
          masterDataHe: ["PDS/BOM להפצת-הדרישות."],
          mistakesHe: [
            "ציפייה לאספקות מ-demand propagation (היא לא יוצרת receipts).",
          ],
          troubleshootHe: [
            "רכיבים לא רואים דרישה ➔ PDS לא תקין או explosion נכשל.",
          ],
          bestPracticeHe: [
            "הרץ לפני תכנון-lots בתרחישי-שינוי גדולים.",
          ],
          interviewHe: [
            { qHe: "מה עושה demand propagation heuristic?", aHe: "מפיצה דרישות כלפי-מטה ב-BOM/PDS ומעדכנת dependent requirements, ללא lot-sizing/scheduling." },
          ],
          takeawaysHe: [
            "מזרימה דרישות כלפי מטה בעץ-המוצר.",
            "לא יוצרת אספקה — רק dependent requirements.",
            "הכנה מהירה לתכנון-מפורט.",
          ],
        },
        {
          id: "5.3.6",
          titleHe: "Quota Heuristic",
          titleEn: "Quota Heuristic",
          execHe:
            "Quota heuristic מחלקת אספקות בין מקורות (קווים/ספקים/מפעלים) לפי quota arrangements מוגדרים — מבטיחה ניצול-מאוזן של מקורות-מרובים לפי אחוזים שנקבעו.",
          beginnerHe:
            "כשיש כמה מקורות לאותו מוצר (שני קווים, שני ספקים), ה-quota קובע כמה אחוז ילך לכל אחד — למשל 70%/30%. ה-heuristic מיישמת את החלוקה הזו על האספקות.",
          consultantHe:
            "ה-heuristic קוראת quota arrangements (allocation %) ומחלקת receipts בהתאם, עם מעקב quota-base quantity מצטבר לאיזון לאורך-זמן. עובדת יחד עם Source Determination (5.2.6). שימושית ל-multi-line/dual-sourcing ולאיזון-עומסים אסטרטגי. ניתן לשלב עם priorities.",
          purposeHe:
            "להבטיח חלוקת-עומס/רכש מאוזנת בין מקורות-מרובים לפי מדיניות (capacity balancing, dual sourcing, risk).",
          processExampleHe:
            "Quota 70/30 בין קו-1 לקו-2: מתוך 10 הזמנות-מתוכננות, 7 מנותבות לקו-1 ו-3 לקו-2, עם איזון מצטבר.",
          cbcHe:
            "ב-CBC חלוקת מילוי Coca-Cola 70/30 בין שני קווים מנוהלת ב-Quota heuristic, לאיזון בלאי-קווים ולגיבוי-אספקה.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Quota Heuristic",
            "Master Data ► Quota Arrangements (MEQ1)",
          ],
          tables: ["TQUOT", "/SAPAPO/PDS", "/SAPAPO/HEUR"],
          tcodes: ["MEQ1", "/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "Quota arrangement (MEQ1): allocation % לכל מקור.",
            "Quota heuristic settings: שימוש ב-quota-base quantity לאיזון.",
          ],
          flow: [
            { he: "זיהוי מקורות + quota %" },
            { he: "חלוקת receipts לפי אחוזים" },
            { he: "עדכון quota-base מצטבר" },
          ],
          masterDataHe: ["Quota arrangements + PDS/PPM למקורות."],
          mistakesHe: [
            "quota שלא מסתכם ל-100% — חלוקה שגויה.",
            "התעלמות מקיבולת בפועל — quota מנותב לקו מלא.",
          ],
          troubleshootHe: [
            "חלוקה לא תואמת quota ➔ allocation % או quota-base שגויים.",
          ],
          bestPracticeHe: [
            "ודא quota מסתכם ל-100% ומעודכן מול קיבולת.",
            "שלב עם priorities ל-fallback.",
          ],
          interviewHe: [
            { qHe: "מה עושה quota heuristic?", aHe: "מחלקת אספקות בין מקורות-מרובים לפי quota arrangements (אחוזים), עם איזון מצטבר." },
          ],
          takeawaysHe: [
            "חלוקת-אספקה לפי אחוזים בין מקורות.",
            "ל-multi-line/dual-sourcing.",
            "עובדת עם Source Determination.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · קביעת מקור-אספקה (5.2.6)", href: "/library/ppds/chapter-05/#sub-5.2.6" },
          ],
        },
        {
          id: "5.3.7",
          titleHe: "תכנון lots סטנדרטיים למוצרי-לוואי",
          titleEn: "Planning of Standard Lots for Co-Products",
          execHe:
            "heuristic ייעודית (SAP_PP_C001) לתכנון מוצרים עם co-products — כאשר תהליך-ייצור אחד מניב מספר מוצרים בו-זמנית. היא מתאמת את הדרישות והאספקות בין המוצר-הראשי למוצרי-הלוואי.",
          beginnerHe:
            "לפעמים מ-batch ייצור אחד יוצאים כמה מוצרים יחד (למשל תהליך כימי שמניב מוצר-עיקרי ותוצר-לוואי). ה-heuristic הזו יודעת לתכנן את כולם יחד, כי הם נוצרים מאותה הזמנה.",
          consultantHe:
            "SAP_PP_C001 מטפלת ב-co-products: ב-PDS מוגדרים co-products עם apportionment (חלוקת-עלות/כמות). ה-heuristic מתכננת את המוצר-הראשי ומפיצה את אספקת-הלוואי בהתאם ל-output המשותף. דורשת PDS עם co-product items (negative/positive) והגדרת apportionment structure. שונה מתכנון רגיל כי דרישה למוצר-לוואי משפיעה על תכנון-הראשי ולהיפך.",
          purposeHe:
            "לתכנן נכון תהליכים רב-תפוקתיים, שבהם אי-אפשר לתכנן מוצר אחד בלי השני — נפוץ ב-process industry.",
          processExampleHe:
            "תהליך מניב מוצר-ראשי + co-product: דרישה למוצר-הראשי יוצרת הזמנה שמניבה גם את הלוואי; ה-heuristic מקזזת את הלוואי מול דרישותיו-שלו.",
          cbcHe:
            "ב-CBC הפקת-סירופ עשויה להניב co-product (שאריות-סוכר לשימוש-חוזר); SAP_PP_C001 מתאמת את שניהם מאותה הזמנת-ייצור.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► SAP_PP_C001",
            "Master Data ► PDS ► Co-Products / Apportionment",
          ],
          tables: ["/SAPAPO/PDS", "/SAPAPO/HEUR", "MARC"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1", "C223"],
          fiori: ["F3331"],
          configHe: [
            "PDS עם co-product items + apportionment structure.",
            "SAP_PP_C001 settings לתיאום ראשי↔לוואי.",
          ],
          flow: [
            { he: "דרישה למוצר-ראשי/לוואי" },
            { he: "תכנון הזמנה משותפת" },
            { he: "הפצת output לכל המוצרים" },
            { he: "Pegging מתואם" },
          ],
          masterDataHe: ["PDS: co-product items + apportionment; Material flagged co-product."],
          mistakesHe: [
            "שימוש ב-SAP_PP_002 למוצר עם co-products — תכנון שגוי.",
            "apportionment לא-מוגדר — הפצת-עלות/כמות שגויה.",
          ],
          troubleshootHe: [
            "מוצר-לוואי לא מתוכנן עם הראשי ➔ PDS חסר co-product item או heuristic שגויה.",
          ],
          bestPracticeHe: [
            "השתמש ב-SAP_PP_C001 לכל מוצר עם co-products.",
            "הגדר apportionment במדויק ל-CO.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-SAP_PP_C001?", aHe: "כשהזמנת-ייצור אחת מניבה מספר מוצרים (co-products) שצריך לתכנן ולקזז יחד." },
          ],
          takeawaysHe: [
            "SAP_PP_C001 = תכנון co-products.",
            "הזמנה אחת → מספר מוצרים.",
            "דורש PDS עם apportionment.",
          ],
        },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4",
      titleHe: "מינוף היוריסטיקות שירות",
      titleEn: "Leveraging Service Heuristics",
      execHe:
        "Service heuristics אינן יוצרות אספקה חדשה — הן 'מטפלות' באובייקטים קיימים: מתזמנות-מחדש (rescheduling), משנות עדיפויות, יוצרות/מוחקות Fixed Pegging, ממספרות שלבים. הן הכלים שבהם המתכנן מסדר ומתקן את התוכנית אחרי שה-product heuristics יצרו אותה.",
      beginnerHe:
        "אחרי שיש תוכנית, צריך לעדן אותה: לדחוף הזמנות אחורה/קדימה (rescheduling), לשנות מי קודם (priorities), לקבע הקצאות (fixed pegging) או לפרק אותן, ולמספר את שלבי-הייצור. ה-service heuristics עושות בדיוק את העבודה הזו — בלי לייצר הזמנות חדשות.",
      consultantHe:
        "Service heuristics פועלות על קשרים, סדר ותזמון של הזמנות קיימות, בדרך-כלל ב-Detailed Scheduling (DS) או ב-product view. דוגמאות: bottom-up/top-down rescheduling, change order priorities, create/delete fixed pegging, stage numbering. הן נבחרות ב-/SAPAPO/RRP3 או ב-DS Planning Board ומופעלות על selection. בניגוד ל-product heuristics — אינן עוברות net/lot-sizing.",
      purposeHe:
        "לתת למתכן ארגז-כלים לתיקון-תוכנית: יישור-תאריכים מול Pegging, קביעת-עדיפויות, הבטחת-הקצאות ומיספור-שלבים — לאחר שהתוכנית כבר נוצרה.",
      processExampleHe:
        "אחרי הרצת-תכנון נוצר פער: רכיב מגיע מאוחר מהמכלול. המתכנן מריץ bottom-up rescheduling — ההזמנות-העליונות נדחפות להתאים לרכיב; או top-down — הרכיבים נמשכים להתאים למכלול.",
      cbcHe:
        "ב-CBC כשהזמנת-תרכיז מתעכבת, מתכנן-הקו מריץ bottom-up rescheduling כדי לדחוף את מילוי-המשקה להתאים, ומשנה priorities כדי שמשקה-מבצע יתוזמן ראשון.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Heuristics ► Service Heuristics",
        "Detailed Scheduling ► Planning Board (/SAPAPO/CDPS0)",
      ],
      tables: ["/SAPAPO/ORDKEY", "/SAPAPO/PEGKEY", "/SAPAPO/HEUR"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0", "/SAPAPO/RRPCUST1"],
      fiori: ["F3331"],
      configHe: [
        "Maintain service heuristics ב-/SAPAPO/RRPCUST1 (rescheduling/priorities/pegging/stage).",
        "הפעלה על selection מתוך product view או DS Planning Board.",
      ],
      flow: [
        { he: "תוכנית קיימת (מ-product heuristics)" },
        { he: "בחירת service heuristic", note: "rescheduling/priority/pegging" },
        { he: "החלה על selection" },
        { he: "תוכנית מעודנת — ללא receipts חדשים" },
      ],
      masterDataHe: [
        "פועלות על הזמנות/קשרים קיימים; אין תלות-master-data ליצירת-אספקה.",
      ],
      mistakesHe: [
        "ציפייה שservice heuristic תיצור אספקה — היא רק מסדרת קיימת.",
        "הרצת rescheduling על selection רחב מדי — שינויים בלתי-צפויים.",
      ],
      troubleshootHe: [
        "אין אספקה חדשה אחרי service heuristic ➔ זו התנהגות תקינה; הרץ product heuristic.",
        "תאריכים לא משתנים ➔ הזמנות firmed או מחוץ ל-selection.",
      ],
      bestPracticeHe: [
        "הרץ service heuristics על selection ממוקד.",
        "הבן את הכיוון (bottom-up מול top-down) לפני הרצה.",
      ],
      interviewHe: [
        { qHe: "במה service heuristics שונות מ-product heuristics?", aHe: "service heuristics מסדרות/מתזמנות-מחדש הזמנות קיימות (rescheduling/priorities/pegging/stage); product heuristics יוצרות אספקה (net/lot-sizing)." },
      ],
      takeawaysHe: [
        "Service heuristics מטפלות בקיים — לא יוצרות אספקה.",
        "rescheduling, priorities, fixed pegging, stage numbering.",
        "ארגז-הכלים לתיקון-תוכנית.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · Pegging (5.2.1)", href: "/library/ppds/chapter-05/#sub-5.2.1" },
        { labelHe: "PP/DS · היוריסטיקות תכנון (5.3)", href: "/library/ppds/chapter-05/#sub-5.3" },
      ],
      children: [
        {
          id: "5.4.1",
          titleHe: "תזמון-מחדש מלמטה-למעלה",
          titleEn: "Bottom-Up Rescheduling",
          execHe:
            "Bottom-up rescheduling מיישר את ההזמנות לאורך ה-Pegging מהרמה-הנמוכה (רכיבים) כלפי-מעלה (מכלולים): תאריכי-הרכיבים קובעים, וההזמנות-העליונות נדחפות להתאים — מבטיח שמכלול לא יתוזמן לפני שרכיביו זמינים.",
          beginnerHe:
            "מלמטה-למעלה = הרכיבים מובילים. אם רכיב מגיע ביום ה-10, אי-אפשר להרכיב את המוצר לפני ה-10 — אז המוצר נדחף ל-10 ומעלה. מיישר את הזמן 'מהקרקע למעלה'.",
          consultantHe:
            "ה-heuristic נעה לאורך ה-Pegging relationships מלמטה-למעלה ודוחפת receipts עליונים ל-availability של הרכיבים (forward). שימושית כשרכיב התעכב. נשלטת בכיוון ובטיפול ב-firmed orders. מנוגדת ל-top-down. מורצת ב-DS/product view על selection.",
          purposeHe:
            "להבטיח feasibility זמנית: מכלול לא מתחיל לפני שרכיביו מוכנים — מונע התחלות-שווא ומחסור-רכיבים ברצפה.",
          processExampleHe:
            "רכיב נדחה מ-5 ל-10. bottom-up דוחף את המכלול שמעליו (וכל מה שמעליו) ל-10 ואילך, כך שכל הרמות עקביות.",
          cbcHe:
            "ב-CBC אם אספקת-תרכיז נדחית, bottom-up rescheduling דוחף את מילוי-המשקה התלוי בו, כך שלא נתזמן מילוי ללא תרכיז.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Bottom-Up Rescheduling",
          ],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: כיוון (forward), טיפול ב-firmed, scope לאורך Pegging.",
          ],
          flow: [
            { he: "זיהוי תאריכי-רכיבים" },
            { he: "דחיפת מכלולים להתאים", note: "כלפי-מעלה" },
            { he: "עקביות בכל הרמות" },
          ],
          masterDataHe: ["Pegging relationships בין הרמות."],
          mistakesHe: [
            "הרצה ללא הבנת-כיוון — דחיפה לא-רצויה של תאריכי-מסירה.",
          ],
          troubleshootHe: [
            "מכלול עדיין לפני רכיב ➔ הרצת bottom-up על ה-selection הנכון.",
          ],
          bestPracticeHe: [
            "הרץ אחרי שינוי-זמינות-רכיבים.",
            "בדוק השפעה על תאריכי-מסירה אחרי ההרצה.",
          ],
          interviewHe: [
            { qHe: "מה עושה bottom-up rescheduling?", aHe: "מיישר תאריכים לאורך Pegging מהרכיבים כלפי-מעלה — דוחף מכלולים להתאים לזמינות-רכיביהם." },
          ],
          takeawaysHe: [
            "רכיבים מובילים, מכלולים נדחפים.",
            "מבטיח feasibility זמנית.",
            "הרץ אחרי עיכוב-רכיב.",
          ],
        },
        {
          id: "5.4.2",
          titleHe: "תזמון-מחדש מלמעלה-למטה",
          titleEn: "Top-Down Rescheduling",
          execHe:
            "Top-down rescheduling מיישר מהרמה-הגבוהה (מכלול/דרישה) כלפי-מטה: תאריך-המכלול קובע, והרכיבים נמשכים להתאים — מבטיח שרכיבים זמינים בדיוק-בזמן (JIT) למכלול, בלי מלאי-ביניים מיותר.",
          beginnerHe:
            "מלמעלה-למטה = המכלול מוביל. אם המוצר צריך להיות מוכן ב-20, הרכיבים נמשכים להגיע ממש לפני כן. מיישר את הזמן 'מהפסגה למטה' — בדיוק-בזמן.",
          consultantHe:
            "ה-heuristic נעה לאורך ה-Pegging מלמעלה-למטה ומתזמנת רכיבים backward מתאריך-המכלול (just-in-time). מנוגדת ל-bottom-up. שימושית להידוק-תוכנית ולהקטנת-מלאי-ביניים, בהנחה שהרכיבים בני-השגה בזמן. נשלטת בכיוון (backward) וב-firmed handling.",
          purposeHe:
            "ליישר את הרכיבים JIT לדרישת-המכלול — להקטין מלאי-ביניים ולהדק את שרשרת-הזמן כלפי תאריך-המסירה.",
          processExampleHe:
            "מכלול נדרש ל-20. top-down מתזמן את כל הרכיבים backward כך שיגיעו בדיוק לפני ההרכבה — בלי להקדים מיותר.",
          cbcHe:
            "ב-CBC top-down מותח את הזמנות-התרכיז/אריזה כך שיגיעו ממש לפני חלון-המילוי המתוכנן, להקטנת מלאי-ביניים ברצפה.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Top-Down Rescheduling",
          ],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: כיוון (backward/JIT), טיפול ב-firmed, scope.",
          ],
          flow: [
            { he: "תאריך-מכלול נתון" },
            { he: "משיכת רכיבים backward", note: "JIT" },
            { he: "מלאי-ביניים מינימלי" },
          ],
          masterDataHe: ["Pegging relationships; lead-times של רכיבים."],
          mistakesHe: [
            "top-down כשרכיבים לא בני-השגה בזמן — מחסור.",
          ],
          troubleshootHe: [
            "רכיב מתוזמן לעבר ➔ lead-time לא מאפשר JIT; שקול bottom-up.",
          ],
          bestPracticeHe: [
            "השתמש כשרכיבים זמינים-וגמישים, להקטנת-מלאי.",
            "אחרת העדף bottom-up.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל bottom-up מול top-down rescheduling?", aHe: "bottom-up: רכיבים מובילים ומכלולים נדחפים; top-down: מכלול מוביל ורכיבים נמשכים JIT." },
          ],
          takeawaysHe: [
            "מכלול מוביל, רכיבים נמשכים JIT.",
            "מקטין מלאי-ביניים.",
            "הניגוד ל-bottom-up.",
          ],
        },
        {
          id: "5.4.3",
          titleHe: "שינוי עדיפויות-הזמנה",
          titleEn: "Change Order Priorities",
          execHe:
            "service heuristic לשינוי priorities של הזמנות — קובעת מי מתוכנן/מתוזמן ראשון כשהמשאב מוגבל. הזמנות בעדיפות-גבוהה מקבלות קיבולת ותזמון מועדפים בהרצות finite ובאופטימייזר.",
          beginnerHe:
            "כשהקו מלא, מישהו צריך להיות ראשון. ה-heuristic הזו מסמנת אילו הזמנות חשובות יותר (עדיפות-גבוהה) — והן יתוזמנו לפני האחרות.",
          consultantHe:
            "ה-heuristic מעדכנת order priority (1=הגבוה ביותר) על selection. ה-priority משפיע על sequencing ב-DS, על dispatching finite ועל ה-Optimizer (priority-weighted delay cost). שימושי ל-VIP-customers, מבצעים, או הזמנות-דחופות. עובד יחד עם strategies של ה-DS.",
          purposeHe:
            "לתרגם חשיבות-עסקית (לקוח/מבצע/דחיפות) להחלטת-תזמון בקיבולת-מוגבלת — מי מקבל את המשאב קודם.",
          processExampleHe:
            "הזמנת-VIP מקבלת priority 1; בהרצת finite היא משובצת ראשונה על הקו, ושאר ההזמנות מסביבה.",
          cbcHe:
            "ב-CBC הזמנת-משקה לקמפיין-טלוויזיה מקבלת priority גבוה — כך הקו משבץ אותה לפני הזמנות-שגרה, להבטחת-זמינות למבצע.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Change Order Priorities",
          ],
          tables: ["/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: ערך-priority חדש ל-selection; השפעה על DS/Optimizer.",
          ],
          flow: [
            { he: "בחירת הזמנות" },
            { he: "הקצאת priority", note: "1=הגבוה" },
            { he: "תזמון מועדף בקיבולת-מוגבלת" },
          ],
          masterDataHe: ["order priority על ההזמנה."],
          mistakesHe: [
            "ריבוי הזמנות בעדיפות-1 — ה-priority מאבד משמעות.",
          ],
          troubleshootHe: [
            "הזמנה חשובה לא משובצת ראשונה ➔ priority לא עודכן או strategy מתעלם.",
          ],
          bestPracticeHe: [
            "שמור על מדרג-עדיפויות מבחין ומועט.",
            "תאם priorities עם מדיניות-שירות-לקוח.",
          ],
          interviewHe: [
            { qHe: "כיצד order priority משפיע על התכנון?", aHe: "הוא קובע סדר-תזמון בקיבולת-מוגבלת ומשפיע על delay-cost ב-Optimizer; 1 = הגבוה ביותר." },
          ],
          takeawaysHe: [
            "priority קובע מי קודם בקיבולת-מוגבלת.",
            "מתרגם חשיבות-עסקית לתזמון.",
            "משפיע על DS ו-Optimizer.",
          ],
        },
        {
          id: "5.4.4",
          titleHe: "יצירת Fixed Pegging",
          titleEn: "Create Fixed Pegging",
          execHe:
            "service heuristic ליצירת Fixed Pegging — קושרת אספקה ספציפית לדרישה ספציפית בקשר-קבוע ששורד הרצות-תכנון, להבטחת-הקצאה ללקוח/מוצר קריטי.",
          beginnerHe:
            "כשרוצים 'לשמור' אספקה מסוימת לדרישה מסוימת כך שהתכנון לא ינתק אותם — יוצרים Fixed Pegging. הקשר הופך קבוע: ה-batch הזה שייך להזמנה הזו, נקודה.",
          consultantHe:
            "ה-heuristic ממירה dynamic peg ל-fixed peg על selection, או יוצרת קשר חדש. ה-fixed peg שורד הרצות-תכנון (לא נקבע-מחדש), ומבטיח שאספקה לא תוקצה-מחדש. שימושי ל-allocation/ATP, batch-to-order, ולקוחות-VIP. ההיפוך מבוצע דרך Delete Fixed Pegging (5.4.5).",
          purposeHe:
            "להבטיח שאספקה מסוימת תישאר מוקצית לדרישה מסוימת לאורך-זמן — הקצאה ודאית בלי 'גניבה' ע\"י התכנון.",
          processExampleHe:
            "מתכנן יוצר fixed peg בין batch מסוים להזמנת-לקוח אסטרטגית; הרצות-התכנון הבאות לא מנתקות אותם.",
          cbcHe:
            "ב-CBC fixed peg בין batch-ייצור ספציפי להזמנת-רשת-קמעונאית מבטיח שה-batch לא יוקצה ללקוח אחר עד אספקה.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Create Fixed Pegging",
          ],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/PEG1"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: יצירת fixed peg על selection (supply↔demand).",
          ],
          flow: [
            { he: "בחירת אספקה+דרישה" },
            { he: "יצירת fixed peg" },
            { he: "קשר שורד הרצות" },
          ],
          masterDataHe: ["Pegging relationship (fixed) ב-LiveCache."],
          mistakesHe: [
            "fixed pegging גורף — מקבע יותר מדי ומונע אופטימיזציה.",
          ],
          troubleshootHe: [
            "אספקה מוקצית-מחדש למרות הצורך ➔ לא נוצר fixed peg; הרץ Create Fixed Pegging.",
          ],
          bestPracticeHe: [
            "השתמש רק להקצאות קריטיות.",
            "תעד ונקה fixed pegs מיותרים.",
          ],
          interviewHe: [
            { qHe: "מתי יוצרים Fixed Pegging?", aHe: "כשצריך להבטיח שאספקה מסוימת תישאר מוקצית לדרישה מסוימת לאורך הרצות — allocation/VIP/batch-to-order." },
          ],
          takeawaysHe: [
            "Fixed peg = קשר קבוע ששורד הרצות.",
            "מבטיח הקצאה ודאית.",
            "השתמש בחיסכון.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · Pegging (5.2.1)", href: "/library/ppds/chapter-05/#sub-5.2.1" },
            { labelHe: "PP/DS · מחיקת Fixed Pegging (5.4.5)", href: "/library/ppds/chapter-05/#sub-5.4.5" },
          ],
        },
        {
          id: "5.4.5",
          titleHe: "מחיקת Fixed Pegging",
          titleEn: "Delete Fixed Pegging",
          execHe:
            "service heuristic למחיקת Fixed Pegging — משחררת קשרים-קבועים ומחזירה את ההקצאה ל-Dynamic Pegging, כדי לאפשר לתכנון לבצע אופטימיזציה מחדש.",
          beginnerHe:
            "כשקשר-קבוע (fixed peg) כבר לא נחוץ — מוחקים אותו, וה-batch חוזר להיות זמין לכל דרישה לפי התכנון הדינמי. משחרר את מה שקובע.",
          consultantHe:
            "ה-heuristic מסירה fixed pegs על selection ומחזירה ל-dynamic. שימושית כשהקצאה התיישנה, הלקוח ביטל, או fixed pegging 'תקע' את התכנון. לרוב מורצת לפני re-planning כדי לשחרר אילוצים. ההפך מ-Create Fixed Pegging (5.4.4).",
          purposeHe:
            "לשחרר אילוצי-הקצאה שהתיישנו ולהחזיר גמישות-תכנון — מונע 'נעילת'-אספקות מיותרת.",
          processExampleHe:
            "לקוח ביטל הזמנה שה-batch קובע אליה; המתכנן מריץ Delete Fixed Pegging, וה-batch משוחרר לדרישות אחרות.",
          cbcHe:
            "ב-CBC לאחר סיום-מבצע, fixed pegs של ה-batches המוקצים נמחקים כדי שהמלאי הנותר ישרת ביקוש-שגרה.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Delete Fixed Pegging",
          ],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/PEG1"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: מחיקת fixed pegs על selection → חזרה ל-dynamic.",
          ],
          flow: [
            { he: "בחירת fixed pegs" },
            { he: "מחיקה" },
            { he: "חזרה ל-Dynamic Pegging" },
          ],
          masterDataHe: ["Pegging relationships ב-LiveCache."],
          mistakesHe: [
            "מחיקה גורפת — אובדן הקצאות-קריטיות נדרשות.",
          ],
          troubleshootHe: [
            "תכנון לא מבצע אופטימיזציה ➔ fixed pegs תקועים; הרץ Delete Fixed Pegging.",
          ],
          bestPracticeHe: [
            "הרץ לפני re-planning גדול לשחרור-אילוצים.",
            "בחר selection מדויק כדי לא למחוק הקצאות-בתוקף.",
          ],
          interviewHe: [
            { qHe: "מתי מוחקים Fixed Pegging?", aHe: "כשהקצאה התיישנה/בוטלה או כשהיא 'תוקעת' תכנון — לשחרור גמישות וחזרה ל-dynamic." },
          ],
          takeawaysHe: [
            "מחזיר fixed → dynamic.",
            "משחרר אילוצי-הקצאה ישנים.",
            "ההפך מ-Create Fixed Pegging.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · יצירת Fixed Pegging (5.4.4)", href: "/library/ppds/chapter-05/#sub-5.4.4" },
          ],
        },
        {
          id: "5.4.6",
          titleHe: "מיספור שלבים",
          titleEn: "Stage Numbering",
          execHe:
            "Stage numbering (low-level coding ל-PP/DS) ממספר את שלבי-הייצור/רמות-ה-BOM כדי לקבוע סדר-תכנון נכון — שכל רמה מתוכננת אחרי הרמות שמעליה, למניעת תכנון-כפול ולעקביות.",
          beginnerHe:
            "כדי לתכנן עץ-מוצר נכון, צריך לדעת מה לתכנן קודם: קודם המוצר-הסופי, אחר-כך הרמה שמתחתיו, וכן הלאה. מיספור-השלבים נותן לכל רמה מספר, וה-תכנון רץ לפי הסדר.",
          consultantHe:
            "ה-heuristic מחשבת stage/level numbers על-בסיס ה-PDS/BOM (דומה ל-low-level code ב-MRP). ה-planning sequence מעבד מוצרים לפי ה-stage number — מהגבוה (מוגמר) לנמוך (גלם) — כך שדרישות-תלויות זמינות לפני תכנון-הרמה-מתחת. קריטי ב-multi-level planning ובהרצות-רקע. עדכון אחרי שינוי-מבני.",
          purposeHe:
            "להבטיח סדר-תכנון נכון ב-multi-level: כל רמה אחרי הרמות שמעליה — למניעת תכנון-חוזר ועקביות-דרישות.",
          processExampleHe:
            "מוצר 3-רמות: stage 0 (FERT), 1 (HALB), 2 (ROH). ה-planning sequence מתכנן 0→1→2, כך שדרישות-הביניים מוכנות בכל שלב.",
          cbcHe:
            "ב-CBC: משקה (stage 0) → תערובת-בסיס (stage 1) → תרכיז/סוכר (stage 2); ה-stage numbering מבטיח שהמשקה מתוכנן לפני שמתכננים את רכיביו.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Heuristics ► Stage Numbering / Low-Level Code",
          ],
          tables: ["/SAPAPO/PDS", "/SAPAPO/MATKEY", "MARC"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRPCUST1"],
          fiori: ["F3331"],
          configHe: [
            "heuristic settings: חישוב stage/level numbers מ-PDS; שימוש ב-planning sequence.",
          ],
          flow: [
            { he: "ניתוח PDS/BOM" },
            { he: "הקצאת stage number לכל רמה" },
            { he: "תכנון לפי סדר", note: "גבוה→נמוך" },
          ],
          masterDataHe: ["PDS/BOM structure; low-level code ל-PP/DS."],
          mistakesHe: [
            "stage numbers לא-מעודכנים אחרי שינוי-מבני — סדר-תכנון שגוי.",
          ],
          troubleshootHe: [
            "רכיב מתוכנן לפני המכלול ➔ הרץ Stage Numbering לעדכון.",
          ],
          bestPracticeHe: [
            "הרץ Stage Numbering אחרי שינויי-PDS/BOM.",
            "שלב ב-planning sequence ל-multi-level.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד stage numbering?", aHe: "לקבוע סדר-תכנון נכון ב-multi-level — כל רמה אחרי הרמות שמעליה (דומה ל-low-level code)." },
          ],
          takeawaysHe: [
            "ממספר רמות לסדר-תכנון נכון.",
            "מוגמר→גלם.",
            "עדכן אחרי שינוי-מבני.",
          ],
        },
        {
          id: "5.4.7",
          titleHe: "ייצור חוזר (Repetitive Manufacturing)",
          titleEn: "Repetitive Manufacturing",
          execHe:
            "ב-Repetitive Manufacturing התכנון מבוסס-קצב (rate-based) ולא הזמנות-בדידות: PP/DS מתכנן run schedule quantities על קווים יציבים בעלי ייצור-המוני-רציף, עם דיווח-backflush מפושט.",
          beginnerHe:
            "כשמייצרים אותו מוצר בקצב קבוע על קו ייעודי (כמו קו-מילוי שרץ כל היום), לא צריך הזמנה נפרדת לכל batch. מתכננים 'כמה ליום/לשעה' (קצב), וזה ה-repetitive manufacturing.",
          consultantHe:
            "PP/DS תומך ב-REM דרך planned orders מסוג run-schedule, מתוזמנים על production line resource, עם REM profile ו-backflush. ה-heuristics מתכננות קצב מול הקו (finite), והדיווח מפושט (MFBF). מתאים ל-high-volume/low-variance. שונה מ-discrete בכך שאין הזמנת-ייצור פר-batch.",
          purposeHe:
            "לתכנן ולתפעל ייצור-המוני-רציף ביעילות — קצב במקום הזמנות-בדידות, עם דיווח ובקרה מפושטים.",
          processExampleHe:
            "קו מתוכנן ל-10,000 יח'/יום run-schedule; ה-backflush מנכה רכיבים אוטומטית לפי הכמות-המיוצרת — בלי הזמנה פר-batch.",
          cbcHe:
            "ב-CBC קו-מילוי Coca-Cola הרץ ברציפות מתוכנן ב-REM: run-schedule יומי על ה-line resource ו-backflush של תרכיז/בקבוקים/פקקים — מתאים מאוד לקווי-מילוי high-volume.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Repetitive Manufacturing",
            "Production ► Repetitive Manufacturing ► Control (REM Profile)",
          ],
          tables: ["/SAPAPO/ORDKEY", "MARC", "T399X"],
          tcodes: ["MF50", "MFBF", "/SAPAPO/RRP3"],
          fiori: ["F3331"],
          configHe: [
            "REM Profile (backflush, reporting points, GR/GI auto).",
            "Material flagged REM-relevant + production line resource.",
          ],
          flow: [
            { he: "run-schedule quantities", note: "קצב" },
            { he: "תזמון על line resource", code: "MF50" },
            { he: "ייצור רציף + backflush", code: "MFBF" },
          ],
          masterDataHe: [
            "Material: REM indicator + REM profile; production line (resource).",
          ],
          mistakesHe: [
            "REM לקו בעל variance גבוה — קשה לנהל בקצב.",
            "REM profile שגוי — backflush/דיווח לא נכונים.",
          ],
          troubleshootHe: [
            "backflush נכשל ➔ REM profile / מלאי-רכיבים (COGI errors).",
            "קצב לא מתוזמן ➔ line resource/finite settings.",
          ],
          bestPracticeHe: [
            "הגבל REM ל-high-volume/low-variance.",
            "כייל REM profile ל-backflush ולנקודות-דיווח נכונות.",
          ],
          interviewHe: [
            { qHe: "מתי מתאים Repetitive Manufacturing?", aHe: "לייצור-המוני-רציף בעל variance נמוך על קו ייעודי — תכנון מבוסס-קצב במקום הזמנות-בדידות." },
            { qHe: "מה ההבדל מ-discrete?", aHe: "ב-REM אין הזמנת-ייצור פר-batch; מתכננים run-schedule ומדווחים ב-backflush מפושט." },
          ],
          takeawaysHe: [
            "REM = תכנון מבוסס-קצב.",
            "ללא הזמנה פר-batch; backflush מפושט.",
            "מתאים לקווי-מילוי high-volume.",
          ],
          relatedHe: [
            { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
          ],
        },
      ],
    },
    // ============================================================ 5.5
    {
      id: "5.5",
      titleHe: "היוריסטיקות להזמנות-מתוכננות לא-פעילות",
      titleEn: "Heuristics for Inactive Planned Orders",
      execHe:
        "הזמנות-מתוכננות לא-פעילות (inactive planned orders) הן תוצרי-תכנון בגרסת-תכנון נפרדת (simulation/planning version) שאינן משפיעות על הביצוע. heuristics ייעודיות מטפלות בהן — לתכנון-תרחישים (what-if), השוואת-חלופות, והעברה-מבוקרת לגרסה-הפעילה.",
      beginnerHe:
        "לפעמים רוצים 'לשחק' עם תכנון בלי לגעת בייצור האמיתי. ההזמנות הלא-פעילות הן 'טיוטה' בגרסה נפרדת — מתכננים, בודקים תרחישים, ורק כשמרוצים מעבירים לגרסה-הפעילה.",
      consultantHe:
        "ב-PP/DS גרסת-התכנון הפעילה (000/active) מול planning versions ל-simulation. הזמנות בגרסה לא-פעילה אינן ב-Pegging הפעיל ואינן משפיעות על ATP/ביצוע. heuristics ייעודיות מתכננות, משוות ומעבירות (copy/transfer) בין גרסאות. שימושי ל-scenario planning, capacity what-if, ובדיקת-heuristic לפני הפעלה. נשלט דרך version management ו-/SAPAPO/RRP3 בגרסה הרלוונטית.",
      purposeHe:
        "לאפשר תכנון-תרחישים והשוואת-חלופות בסביבה מבודדת, בלי לזעזע את הביצוע — ולהעביר רק את התרחיש-הנבחר לגרסה-הפעילה.",
      processExampleHe:
        "מתכנן בודק תרחיש 'קו נוסף' בגרסה לא-פעילה: מריץ heuristics, רואה את ההשפעה על העומס, ואם משתלם — מעביר את התוכנית לגרסה-הפעילה.",
      cbcHe:
        "ב-CBC לפני קמפיין-קיץ, מתכנן בונה תרחיש-ביקוש-מוגבר בגרסה לא-פעילה, בודק עומס-קווים, ורק לאחר אישור מעביר לגרסה-הפעילה — בלי לסכן את התכנון השוטף.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Planning Version Management",
        "Production Planning for Process Industries ► PP/DS ► Heuristics ► Inactive Planned Orders",
      ],
      tables: ["/SAPAPO/ORDKEY", "/SAPAPO/MATKEY", "/SAPAPO/VERSND"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/MVM", "/SAPAPO/RRPCUST1"],
      fiori: ["F3331"],
      configHe: [
        "Planning Version Management: הגדרת גרסאות-סימולציה מול הפעילה.",
        "heuristic settings לטיפול ב-inactive orders: plan/compare/transfer.",
      ],
      flow: [
        { he: "יצירת גרסה לא-פעילה" },
        { he: "תכנון תרחיש (heuristics)" },
        { he: "השוואת-חלופות" },
        { he: "העברה לגרסה-הפעילה", note: "transfer/copy" },
      ],
      masterDataHe: [
        "Planning version (active vs. simulation); הזמנות לא-פעילות מבודדות מ-Pegging הפעיל.",
      ],
      mistakesHe: [
        "בלבול בין גרסה-פעילה ללא-פעילה — תכנון 'הולך לאיבוד' או משפיע בטעות.",
        "העברה לגרסה-פעילה ללא בדיקת-עקביות.",
      ],
      troubleshootHe: [
        "תכנון לא משפיע על הביצוע ➔ הוא בגרסה לא-פעילה (התנהגות תקינה).",
        "הזמנות-סימולציה הופיעו בפעיל ➔ הועברו בטעות; בטל/תקן גרסה.",
      ],
      bestPracticeHe: [
        "השתמש בגרסאות לא-פעילות ל-what-if והשוואת-heuristics.",
        "העבר לגרסה-הפעילה רק אחרי בדיקת-עקביות ואישור.",
      ],
      interviewHe: [
        { qHe: "מהן הזמנות-מתוכננות לא-פעילות?", aHe: "הזמנות בגרסת-תכנון נפרדת (simulation) שאינן ב-Pegging הפעיל ואינן משפיעות על הביצוע — לתכנון-תרחישים." },
        { qHe: "מתי משתמשים בהן?", aHe: "ל-scenario/what-if, השוואת-חלופות ובדיקת-heuristic לפני העברה לגרסה-הפעילה." },
      ],
      takeawaysHe: [
        "הזמנות לא-פעילות = טיוטה בגרסה מבודדת.",
        "ל-what-if והשוואת-חלופות.",
        "העבר לפעיל רק אחרי בדיקה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הרצת-תכנון (5.6)", href: "/library/ppds/chapter-05/#sub-5.6" },
      ],
    },
    // ============================================================ 5.6
    {
      id: "5.6",
      titleHe: "הפעלת הרצת-תכנון ב-PP/DS",
      titleEn: "Triggering a PP/DS Planning Run",
      execHe:
        "הרצת-תכנון היא הפעלת ה-heuristics בפועל על קבוצת-חומרים. אפשר להריץ אינטראקטיבית (מתכנן, מיידי, ויזואלי) או ברקע (background job, היקף-רחב, מתוזמן), וחומרי-PP/DS משולבים ב-MRP Live (One MRP Run) עם classic. בחירת-המצב משפיעה על היקף, ביצועים ושליטה.",
      beginnerHe:
        "אחרי שיש heuristics — צריך 'להריץ' אותן. אפשר אינטראקטיבי (יושבים מול המסך ורואים מיד), או ברקע (job לילי על אלפי חומרים). וב-S/4HANA יש MRP Live שמתכנן הכל בבת-אחת — classic ו-PP/DS יחד.",
      consultantHe:
        "מצבי-הרצה: (1) interactive ב-/SAPAPO/RRP3 — heuristic על מוצר/selection, מיידי; (2) background — production planning run מתוזמן על scope רחב; (3) interactive production planning — סשן-תכנון ויזואלי; (4) MRP Live (MD01N) — מתכנן classic+advanced בריצה אחת, כל אחד במנועו. בחירה לפי היקף, תדירות וצורך-בשליטה. ה-Planning Procedure וה-heuristic נקבעים מראש.",
      purposeHe:
        "להפעיל את התכנון בהיקף ובתדירות המתאימים: אינטראקטיבי לתיקונים נקודתיים, רקע ל-mass planning, ו-MRP Live לתכנון-משולב יומי.",
      processExampleHe:
        "job לילי מריץ production planning run על כל חומרי-ה-PP/DS; בבוקר המתכנן פותח /SAPAPO/RRP3 לתיקונים אינטראקטיביים נקודתיים על חריגים.",
      cbcHe:
        "ב-CBC MRP Live רץ כל לילה ומתכנן את כל המשקאות (PP/DS) והרכיבים (classic) בריצה אחת; ביום מתכנן-הקו מבצע התאמות אינטראקטיביות ב-product view על הזמנות-חריגות.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Production Planning Run",
        "Logistics ► MRP ► MRP Live (MD01N)",
      ],
      tables: ["/SAPAPO/ORDKEY", "/SAPAPO/MATKEY", "MDVM"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPSB0", "MD01N", "/SAPAPO/CDPS0"],
      fiori: ["F3331", "F1339"],
      configHe: [
        "Production Planning Run: הגדרת propagation range / heuristic / package size.",
        "MRP Live (MD01N): scope של חומרי classic+advanced בריצה אחת.",
        "interactive: /SAPAPO/RRP3 על מוצר/selection.",
      ],
      flow: [
        { he: "בחירת מצב-הרצה", note: "interactive/background/MRP Live" },
        { he: "הגדרת scope + heuristic" },
        { he: "הרצה" },
        { he: "תוצאות + ניטור", code: "log" },
      ],
      masterDataHe: [
        "Planning Procedure + heuristic ברמת-מוצר; propagation range ל-background.",
      ],
      mistakesHe: [
        "background על scope ענק ללא package size — ביצועים גרועים.",
        "ערבוב interactive ו-background על אותם חומרים בו-זמנית.",
      ],
      troubleshootHe: [
        "חומר לא מתוכנן בהרצה ➔ מחוץ ל-propagation range/scope.",
        "הרצה איטית ➔ package size / scope לא-מותאמים.",
      ],
      bestPracticeHe: [
        "background ל-mass; interactive לחריגים.",
        "כייל propagation range ו-package size לביצועים.",
      ],
      interviewHe: [
        { qHe: "אילו מצבי-הרצה קיימים ב-PP/DS?", aHe: "interactive (RRP3), background (production planning run), interactive production planning, ו-MRP Live (classic+advanced בריצה אחת)." },
        { qHe: "מהו One MRP Run?", aHe: "MRP Live שמתכנן חומרי classic ו-PP/DS בריצה אחת, כל אחד במנועו." },
      ],
      takeawaysHe: [
        "interactive / background / MRP Live.",
        "MRP Live = One MRP Run (classic+advanced).",
        "בחר מצב לפי היקף ושליטה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ניטור והערכת-הרצות (5.7)", href: "/library/ppds/chapter-05/#sub-5.7" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
      children: [
        {
          id: "5.6.1",
          titleHe: "הרצת-תכנון אינטראקטיבית",
          titleEn: "Production Planning Run in Interactive Mode",
          execHe:
            "הרצה אינטראקטיבית מאפשרת למתכנן להפעיל heuristic על מוצר או selection ב-/SAPAPO/RRP3 ולראות את התוצאה מיד — אידיאלי לתיקונים נקודתיים, חקירת-בעיות ובדיקת-תרחישים מהירה.",
          beginnerHe:
            "יושבים מול ה-product view, בוחרים מוצר, לוחצים 'תכנן' — ורואים מיד את ההזמנות-המתוכננות שנוצרו. מתאים לטיפול-מהיר בבעיה ספציפית.",
          consultantHe:
            "ב-/SAPAPO/RRP3 (product view) המתכנן מריץ heuristic על מוצר/selection ורואה תוצאה מיידית ב-LiveCache: הזמנות, Pegging, alerts. ניתן להריץ heuristics שונות, לבצע manual changes, ו-firming. שימושי לחריגים שה-background השאיר. שינויים מיידיים בגרסה-הפעילה (זהירות).",
          purposeHe:
            "לתת שליטה-ידנית מיידית על תכנון-מוצר בודד — לתיקון חריגים ולבדיקה-מהירה, מבלי להמתין ל-job.",
          processExampleHe:
            "alert על under-coverage; המתכנן פותח /SAPAPO/RRP3, מריץ SAP_PP_002 על המוצר, רואה הזמנה-מתוכננת חדשה שסוגרת את הפער — מיד.",
          cbcHe:
            "ב-CBC מתכנן-קו מטפל ב-alert על מחסור-משקה: פותח את ה-product view, מתכנן מחדש את המשקה, ומשבץ ידנית על הקו — תוך דקות.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Interactive Planning (/SAPAPO/RRP3)",
          ],
          tables: ["/SAPAPO/ORDKEY", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/RRP3"],
          fiori: ["F3331"],
          configHe: [
            "בחירת heuristic בתצוגת ה-product view; הצגת alerts ו-Pegging.",
          ],
          flow: [
            { he: "פתיחת product view", code: "/SAPAPO/RRP3" },
            { he: "בחירת מוצר + heuristic" },
            { he: "הרצה + תוצאה מיידית" },
            { he: "התאמות ידניות + firming" },
          ],
          masterDataHe: ["Planning Procedure/heuristic של המוצר."],
          mistakesHe: [
            "שינויים אינטראקטיביים בגרסה-פעילה ללא תיעוד — קושי-תחקור.",
          ],
          troubleshootHe: [
            "heuristic לא נראית ➔ לא משויכת/לא מורשית; בחר ידנית.",
          ],
          bestPracticeHe: [
            "השתמש לחריגים נקודתיים, לא ל-mass.",
            "תעד שינויים-ידניים משמעותיים.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים בהרצה אינטראקטיבית?", aHe: "לתיקון חריגים נקודתיים ובדיקה-מהירה ב-/SAPAPO/RRP3 עם תוצאה מיידית." },
          ],
          takeawaysHe: [
            "RRP3 = תכנון מיידי על מוצר/selection.",
            "לחריגים ולבדיקה-מהירה.",
            "תוצאה מיידית ב-LiveCache.",
          ],
        },
        {
          id: "5.6.2",
          titleHe: "הרצת-תכנון ברקע",
          titleEn: "Production Planning Run in the Background",
          execHe:
            "הרצת-רקע (background production planning run) מפעילה heuristics על scope רחב כ-job מתוזמן — לתכנון-המוני שגרתי (לילי/תקופתי) של כל חומרי-ה-PP/DS, עם package size לניהול-ביצועים.",
          beginnerHe:
            "במקום לתכנן מוצר-מוצר, מגדירים job שרץ על אלפי חומרים בבת-אחת, בדרך-כלל בלילה. כשמגיעים בבוקר — הכל כבר מתוכנן.",
          consultantHe:
            "ה-background run מוגדר עם propagation range (scope), planning sequence/heuristics, parallel processing ו-package size. מתוזמן דרך job scheduling. מטפל ב-mass; משאיר חריגים לטיפול-אינטראקטיבי. ביצועים תלויים ב-parallelization ו-package size. תוצאות נכתבות ל-application log (5.7.3).",
          purposeHe:
            "לתכנן ביעילות ובאופן-שגרתי את כלל חומרי-ה-PP/DS בהיקף-רחב, ללא התערבות-ידנית, בחלון-זמן מבוקר.",
          processExampleHe:
            "job לילי עם propagation range של כל חומרי-המפעל, parallel 4, package 200: מתכנן את כל החומרים עד הבוקר ומפיק log לבדיקה.",
          cbcHe:
            "ב-CBC ה-production planning run הלילי מתכנן את כל המשקאות וה-HALB מול הקווים; חריגים (alerts) מטופלים אינטראקטיבית בבוקר.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Production Planning Run (Background)",
          ],
          tables: ["/SAPAPO/ORDKEY", "MDVM", "TBTCO"],
          tcodes: ["/SAPAPO/CDPSB0", "/SAPAPO/RRP_HEUR_AUTO_PLAN"],
          fiori: ["F1339"],
          configHe: [
            "Propagation range (scope) + planning sequence/heuristics.",
            "Parallel processing + package size; job scheduling.",
          ],
          flow: [
            { he: "הגדרת scope + heuristics" },
            { he: "הגדרת parallel/package" },
            { he: "תזמון job" },
            { he: "הרצה → application log" },
          ],
          masterDataHe: ["Propagation range; Planning Procedure/heuristic per material."],
          mistakesHe: [
            "scope ענק ללא parallelization — חריגה מחלון-הזמן.",
            "package size לא-מותאם — ביצועים גרועים.",
          ],
          troubleshootHe: [
            "job איטי ➔ הגדל parallelization / כייל package size.",
            "חומרים לא תוכננו ➔ מחוץ ל-propagation range.",
          ],
          bestPracticeHe: [
            "כייל parallel + package לחלון-הזמן.",
            "בדוק log אחרי כל הרצה.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים בהרצת-רקע?", aHe: "לתכנון-המוני שגרתי (לילי) על scope רחב, עם parallelization ו-package size לביצועים." },
          ],
          takeawaysHe: [
            "background = mass planning מתוזמן.",
            "parallel + package לביצועים.",
            "תוצאות ב-application log.",
          ],
        },
        {
          id: "5.6.3",
          titleHe: "תכנון-ייצור אינטראקטיבי",
          titleEn: "Interactive Production Planning",
          execHe:
            "תכנון-ייצור אינטראקטיבי הוא סביבת-עבודה ויזואלית (DS Planning Board / product view) שבה המתכנן רואה עומסי-משאבים, גרר-ושחרר הזמנות, מריץ heuristics ובוחן השפעות בזמן-אמת — לתכנון-מפורט ידני.",
          beginnerHe:
            "מסך גרפי שבו רואים את הקווים, את ההזמנות עליהם, וגוררים אותן לסדר/לזמן הרצוי. כמו לוח-תכנון חזותי שמראה מיד אם יש התנגשות-קיבולת.",
          consultantHe:
            "ה-Detailed Scheduling Planning Board (/SAPAPO/CDPS0) ו-product view מספקים תכנון-ויזואלי: Gantt של resources, dispatch/deallocate, finite scheduling ידני, הרצת heuristics/strategies, ו-alerts. שונה מ-interactive run (5.6.1) בכך שהדגש על detailed scheduling ויזואלי על-פני המשאבים. שינויים מיידיים ב-LiveCache.",
          purposeHe:
            "לתת למתכן שליטה-ויזואלית מלאה על שיבוץ-ההזמנות על-פני המשאבים — לתזמון-מפורט, פתרון-התנגשויות ובחינת-תרחישים.",
          processExampleHe:
            "ב-DS Planning Board המתכנן רואה שני קווים בעומס-יתר; הוא גורר הזמנות בין הקווים ומריץ heuristic ליישור, עד שהעומס מאוזן — ויזואלית.",
          cbcHe:
            "ב-CBC מתכנן-הקו פותח את ה-Planning Board, רואה את רצף-הטעמים על קו-המילוי, וגורר הזמנות למזער מעברי-טעם (CIP) — ויזואלית, בזמן-אמת.",
          navHe: [
            "Production Planning for Process Industries ► Detailed Scheduling ► Planning Board (/SAPAPO/CDPS0)",
          ],
          tables: ["/SAPAPO/ORDKEY", "/SAPAPO/RESKEY"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/RRP3"],
          fiori: ["F3331"],
          configHe: [
            "DS Planning Board profiles (work area, strategy, time profile).",
            "DS strategies ל-dispatch/finite scheduling ידני.",
          ],
          flow: [
            { he: "פתיחת Planning Board", code: "/SAPAPO/CDPS0" },
            { he: "צפייה בעומסי-משאבים" },
            { he: "גרירה/שיבוץ + heuristics" },
            { he: "פתרון-התנגשויות בזמן-אמת" },
          ],
          masterDataHe: ["Resources + PDS; DS profiles."],
          mistakesHe: [
            "שינויים-ויזואליים ללא בדיקת-feasibility — התנגשויות נסתרות.",
          ],
          troubleshootHe: [
            "הזמנה לא ניתנת-לשיבוץ ➔ קיבולת-משאב מלאה או firmed.",
          ],
          bestPracticeHe: [
            "השתמש ל-detailed scheduling וסידור-רצף.",
            "שלב heuristics עם התאמה-ידנית.",
          ],
          interviewHe: [
            { qHe: "מהו ה-DS Planning Board?", aHe: "סביבת-תכנון ויזואלית (Gantt) לשיבוץ-הזמנות על משאבים, dispatch, finite scheduling ידני והרצת-strategies." },
          ],
          takeawaysHe: [
            "תכנון-ויזואלי על-פני המשאבים.",
            "גרירה, dispatch, heuristics בזמן-אמת.",
            "לתזמון-מפורט ופתרון-התנגשויות.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · שינוי עדיפויות (5.4.3)", href: "/library/ppds/chapter-05/#sub-5.4.3" },
          ],
        },
        {
          id: "5.6.4",
          titleHe: "תכנון חומרי-PP/DS ב-MRP Live (הרצת-MRP אחת)",
          titleEn: "Planning PP/DS Materials in MRP Live (One MRP Run)",
          execHe:
            "MRP Live (MD01N) מתכנן חומרי classic ו-PP/DS בריצה אחת (One MRP Run): כל חומר מנותב למנוע הנכון — classic-MRP על HANA או PP/DS — בלי שתי הרצות נפרדות. זהו המודל המומלץ ב-S/4HANA.",
          beginnerHe:
            "במקום להריץ פעם MRP רגיל ופעם PP/DS, MRP Live מריץ הכל יחד: כל חומר הולך אוטומטית למנוע המתאים לו. הרצה אחת, תכנון מלא.",
          consultantHe:
            "MRP Live (MD01N) רץ על HANA; חומרי-classic מתוכננים ב-HANA-optimized MRP, וחומרי-PP/DS מנותבים אוטומטית ל-PP/DS heuristics (לפי דגל Advanced Planning). ה-scope מוגדר לפי material/plant/MRP controller. שומר על עקביות שרשרת (FERT ב-PP/DS, רכיבים classic) בריצה אחת. החריגים/finite-scheduling עדיין בתחום ה-PP/DS DS. ה-log מוערך דרך MRP Live monitor (5.7.2).",
          purposeHe:
            "לתכנן את כל ה-portfolio (classic + advanced) בריצה אחת עקבית ומהירה על HANA — בלי לתאם ידנית שתי הרצות.",
          processExampleHe:
            "MD01N על מפעל: FERT (PP/DS) מתוכנן finite מול הקווים, רכיביו (classic) מתוכננים ב-HANA-MRP — הכל בריצה אחת, עם דרישות-תלויות עקביות.",
          cbcHe:
            "ב-CBC MD01N הלילי מתכנן את המשקאות (PP/DS) מול הקווים ואת התרכיז/סוכר/אריזה (classic) — בריצה אחת, כך שדרישות-הרכיבים נגזרות מיד מתכנון-המשקאות.",
          navHe: [
            "Logistics ► MRP ► MRP Live (MD01N)",
            "Production Planning for Process Industries ► PP/DS ► Integration with MRP Live",
          ],
          tables: ["MARC", "/SAPAPO/ORDKEY", "MDVM"],
          tcodes: ["MD01N", "/SAPAPO/RRP3", "MD04"],
          fiori: ["F1339", "F2101"],
          configHe: [
            "MRP Live scope: material/plant/MRP controller/product group.",
            "ניתוב אוטומטי לפי דגל Advanced Planning (classic vs PP/DS).",
          ],
          flow: [
            { he: "הפעלת MD01N על scope" },
            { he: "ניתוב כל חומר למנוע", note: "classic/PP/DS" },
            { he: "תכנון בריצה אחת" },
            { he: "הערכת log", code: "5.7.2" },
          ],
          masterDataHe: [
            "דגל Advanced Planning קובע ניתוב; Planning Procedure/heuristic ל-PP/DS.",
          ],
          mistakesHe: [
            "חומר-PP/DS ללא Planning Procedure — לא מתוכנן נכון ב-MRP Live.",
            "ציפייה ל-finite scheduling מלא מ-MRP Live — ה-DS המפורט נשאר ב-PP/DS.",
          ],
          troubleshootHe: [
            "חומר-PP/DS תוכנן כ-classic ➔ דגל Advanced Planning חסר.",
            "תוצאות-MRP-Live חסרות ➔ scope/MRP controller שגוי.",
          ],
          bestPracticeHe: [
            "השתמש ב-MRP Live כמודל-התכנון העיקרי ב-S/4HANA.",
            "ודא דגלי Advanced Planning ו-Planning Procedure נכונים.",
          ],
          interviewHe: [
            { qHe: "מהו One MRP Run?", aHe: "MRP Live (MD01N) שמתכנן classic ו-PP/DS בריצה אחת, מנתב כל חומר למנוע הנכון." },
            { qHe: "כיצד MRP Live יודע לאיזה מנוע לנתב?", aHe: "לפי דגל Advanced Planning באב-החומר — מסומן → PP/DS, אחרת classic-MRP על HANA." },
          ],
          takeawaysHe: [
            "MRP Live = classic + PP/DS בריצה אחת.",
            "ניתוב לפי דגל Advanced Planning.",
            "המודל המומלץ ב-S/4HANA.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · הערכת MRP Live (5.7.2)", href: "/library/ppds/chapter-05/#sub-5.7.2" },
            { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
          ],
        },
      ],
    },
    // ============================================================ 5.7
    {
      id: "5.7",
      titleHe: "ניטור והערכת הרצות-התכנון",
      titleEn: "Monitoring and Evaluating the Planning Runs",
      execHe:
        "אחרי כל הרצה צריך לוודא שהיא הצליחה ומה היא יצרה. PP/DS מספק שכבת-ניטור: PP/DS planning log, הערכת MRP Live, הערכת background run, ו-MRP Fiori apps. ניטור-שיטתי הוא ההבדל בין תכנון אמין לתכנון 'עיוור'.",
      beginnerHe:
        "הרצה לא מסתיימת בלחיצת-כפתור — צריך לבדוק: עברה בהצלחה? היו שגיאות? מה נוצר? לכך יש log-ים וכלי-הערכה (כולל אפליקציות Fiori) שמראים בדיוק מה קרה.",
      consultantHe:
        "כלי-הניטור: (1) PP/DS planning log — הודעות ברמת-מוצר/heuristic; (2) MRP Live monitor — סטטיסטיקות ושגיאות ההרצה המשולבת; (3) background run log (application log) — תוצאות ה-mass run; (4) MRP Fiori apps (Monitor Material Coverage, Manage Material Coverage, MRP master data issues) — ניטור-תוצאות יומיומי. שילובם נותן תמונת-בקרה מלאה ו-exception-based planning.",
      purposeHe:
        "להבטיח שהתכנון רץ נכון, לזהות שגיאות/חריגים מוקדם, ולנהל לפי-חריגים (exception-based) במקום לבדוק כל חומר.",
      processExampleHe:
        "אחרי ה-job הלילי, ה-planner פותח את ה-MRP monitor ב-Fiori, מסנן ל-uncovered requirements, ומטפל רק ב-50 החומרים החריגים מתוך אלפים.",
      cbcHe:
        "ב-CBC בכל בוקר מתכנן-הקו בודק את ה-log של ה-production planning run ואת Monitor Material Coverage, ומטפל רק במשקאות עם under-coverage — לא בכל ה-portfolio.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Planning Log",
        "Logistics ► MRP ► Monitoring (MRP Live / Fiori apps)",
      ],
      tables: ["/SAPAPO/APPLOG", "BALHDR", "MDVM"],
      tcodes: ["/SAPAPO/RRP3", "MD06", "/SAPAPO/C5", "SLG1"],
      fiori: ["F2101", "F0247", "F1339"],
      configHe: [
        "הפעלת PP/DS planning log + רמת-פירוט.",
        "MRP Fiori apps: Monitor/Manage Material Coverage, MRP master data issues.",
      ],
      flow: [
        { he: "הרצה (interactive/background/MRP Live)" },
        { he: "בדיקת log/monitor" },
        { he: "סינון חריגים", note: "exception-based" },
        { he: "טיפול ממוקד" },
      ],
      masterDataHe: [
        "Exception messages/alerts מוגדרים ברמת-מוצר/heuristic.",
      ],
      mistakesHe: [
        "דילוג על בדיקת-log — שגיאות 'שקטות' מצטברות.",
        "בדיקת כל חומר במקום ניהול-לפי-חריגים.",
      ],
      troubleshootHe: [
        "תוצאות חסרות ➔ בדוק log לשגיאות/scope.",
        "alerts לא מופיעים ➔ alert profile/monitor לא מוגדר.",
      ],
      bestPracticeHe: [
        "נהל exception-based דרך Fiori apps.",
        "בדוק log אחרי כל הרצה גדולה.",
      ],
      interviewHe: [
        { qHe: "אילו כלי-ניטור יש להרצות-PP/DS?", aHe: "PP/DS planning log, MRP Live monitor, background run application log, ו-MRP Fiori apps (Material Coverage)." },
        { qHe: "מהו exception-based planning?", aHe: "ניהול רק החומרים החריגים (alerts/uncovered) במקום בדיקת כל ה-portfolio." },
      ],
      takeawaysHe: [
        "ניטור הוא חלק מההרצה, לא תוספת.",
        "log + MRP Live monitor + Fiori apps.",
        "נהל לפי-חריגים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הרצת-תכנון (5.6)", href: "/library/ppds/chapter-05/#sub-5.6" },
      ],
      children: [
        {
          id: "5.7.1",
          titleHe: "יומן-התכנון של PP/DS",
          titleEn: "PP/DS Planning Log",
          execHe:
            "ה-PP/DS planning log מתעד את הודעות-ההרצה ברמת-מוצר ו-heuristic: מה תוכנן, אילו אזהרות/שגיאות עלו, ומדוע חומר לא תוכנן. זהו כלי-החקירה הראשון אחרי כל הרצה.",
          beginnerHe:
            "ה-log הוא 'יומן' של מה שקרה בהרצה: לכל מוצר רשום אם הצליח, ואם לא — למה. כשמשהו לא עובד כמצופה, פותחים אותו קודם.",
          consultantHe:
            "ה-log נכתב לפי הגדרת-רמת-פירוט (errors/warnings/info). מציג הודעות per heuristic step per product: net, lot-sizing, scheduling, pegging, source. נגיש מתוך /SAPAPO/RRP3 ומה-background run. שימושי לאיתור 'למה חומר לא תוכנן' או 'למה התזמון נכשל'. ניתן לסנן לפי חומר/חומרה.",
          purposeHe:
            "לתת שקיפות מלאה לפעולת-ה-heuristics — לאתר ולפתור שגיאות-תכנון במהירות.",
          processExampleHe:
            "חומר לא קיבל הזמנה-מתוכננת; ה-log מראה 'no valid source found' — המתכנן מבין שחסר PDS פעיל ומתקן.",
          cbcHe:
            "ב-CBC ה-log חושף שמשקה לא תוכנן בגלל 'PDS not found' אחרי שינוי-קו; המתכנן מסנכרן PDS ומריץ שוב.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Planning Log",
          ],
          tables: ["/SAPAPO/APPLOG", "BALHDR"],
          tcodes: ["/SAPAPO/RRP3", "SLG1"],
          fiori: ["F2101"],
          configHe: [
            "הגדרת רמת-פירוט ה-log (errors/warnings/info).",
          ],
          flow: [
            { he: "הרצת heuristic" },
            { he: "כתיבת log per step/product" },
            { he: "סינון errors/warnings" },
            { he: "תיקון שורש-הבעיה" },
          ],
          masterDataHe: ["log-level settings; per-product messages."],
          mistakesHe: [
            "log-level נמוך מדי — שגיאות לא נרשמות.",
            "התעלמות מ-warnings שמובילים לבעיות עתידיות.",
          ],
          troubleshootHe: [
            "חומר לא תוכנן ➔ קרא ב-log את ה-message (no source/PDS/horizon).",
          ],
          bestPracticeHe: [
            "קבע log-level שמלכוד שגיאות בלי הצפה.",
            "טפל ב-warnings מוקדם.",
          ],
          interviewHe: [
            { qHe: "מה מציג ה-PP/DS planning log?", aHe: "הודעות per heuristic step per product — מה תוכנן, אזהרות/שגיאות, וסיבות לאי-תכנון." },
          ],
          takeawaysHe: [
            "log = יומן-ההרצה per product/step.",
            "כלי-החקירה הראשון.",
            "כייל log-level נכון.",
          ],
        },
        {
          id: "5.7.2",
          titleHe: "הערכת ביצוע ה-MRP Live",
          titleEn: "Evaluate the MRP Live Execution",
          execHe:
            "הערכת MRP Live בוחנת את תוצאות ההרצה המשולבת (classic+PP/DS): סטטיסטיקות-ביצוע, חומרים שתוכננו, שגיאות-ניתוב, וזמני-ריצה — לאימות שה-One MRP Run הצליח לכל ה-portfolio.",
          beginnerHe:
            "אחרי ש-MRP Live רץ, בודקים: כמה חומרים תוכננו? היו שגיאות? כמה זמן זה לקח? כך יודעים שהתכנון המשולב הצליח.",
          consultantHe:
            "ה-MRP Live evaluation (MD06/monitor + MRP Live statistics) מציג: מספר-חומרים per engine (classic/PP/DS), runtime, errors (למשל חומר-PP/DS ללא Planning Procedure), ו-exception messages. שימושי לזיהוי בעיות-ניתוב ו-bottlenecks-ביצועים. משלים את ה-PP/DS log לחומרי-advanced.",
          purposeHe:
            "לאמת שההרצה המשולבת כיסתה את כל החומרים נכון (כל אחד במנועו) ולזהות בעיות-ניתוב/ביצועים.",
          processExampleHe:
            "הערכה מראה ש-200 חומרים 'נפלו' ל-classic למרות שהם PP/DS — בדיקה מגלה דגל Advanced Planning חסר; תיקון והרצה-מחדש.",
          cbcHe:
            "ב-CBC ההערכה מאשרת שכל המשקאות תוכננו ב-PP/DS וכל הרכיבים ב-classic; חריג שבו משקה תוכנן classic מצביע על דגל-חסר.",
          navHe: [
            "Logistics ► MRP ► MRP Live ► Evaluation / Statistics",
          ],
          tables: ["MDVM", "MARC", "/SAPAPO/ORDKEY"],
          tcodes: ["MD01N", "MD06", "MD04"],
          fiori: ["F1339", "F0247"],
          configHe: [
            "MRP Live statistics/monitor; exception messages per engine.",
          ],
          flow: [
            { he: "סיום MD01N" },
            { he: "הערכת סטטיסטיקות per engine" },
            { he: "זיהוי שגיאות-ניתוב" },
            { he: "תיקון + הרצה-מחדש" },
          ],
          masterDataHe: ["דגל Advanced Planning + Planning Procedure (ניתוב)."],
          mistakesHe: [
            "אי-בדיקת ניתוב — חומרי-PP/DS מתוכננים classic בשקט.",
          ],
          troubleshootHe: [
            "חומר במנוע השגוי ➔ דגל Advanced Planning/Planning Procedure.",
            "runtime ארוך ➔ scope/parallelization.",
          ],
          bestPracticeHe: [
            "בדוק ניתוב per engine אחרי כל הרצה.",
            "נטר runtime למגמות.",
          ],
          interviewHe: [
            { qHe: "מה בודקים בהערכת MRP Live?", aHe: "מספר-חומרים per engine, runtime, שגיאות-ניתוב ו-exceptions — שה-One MRP Run כיסה הכל נכון." },
          ],
          takeawaysHe: [
            "מאמת את ההרצה המשולבת.",
            "מזהה בעיות-ניתוב classic/PP/DS.",
            "משלים את ה-PP/DS log.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · PP/DS ב-MRP Live (5.6.4)", href: "/library/ppds/chapter-05/#sub-5.6.4" },
          ],
        },
        {
          id: "5.7.3",
          titleHe: "הערכת הרצת-הרקע של PP/DS",
          titleEn: "Evaluate the PP/DS Background Planning Run",
          execHe:
            "הערכת ה-background run בוחנת את תוצאות ה-mass planning: ה-application log, מספר-החומרים שתוכננו, שגיאות per package, וזמני-ריצה — לאימות שה-job הלילי כיסה את כל ה-scope.",
          beginnerHe:
            "אחרי ה-job הלילי בודקים את ה-log שלו: עברו כל החומרים? היו packages שנכשלו? כמה זמן? כך יודעים שההרצה הגדולה הצליחה.",
          consultantHe:
            "ה-background run כותב application log (SLG1 / PP/DS log) per package: errors, warnings, runtime, materials planned. שימושי לזהות packages-שנכשלו, scope-חסר ו-performance bottlenecks. משלים ב-job log (SM37). תיקון: re-plan ה-scope החסר אינטראקטיבית או הרצה-מחדש.",
          purposeHe:
            "לאמת שה-background run כיסה את כל ה-propagation range ולזהות packages/חומרים שנכשלו.",
          processExampleHe:
            "ה-log מראה ש-package 3 נכשל ב-timeout; המתכנן מקטין package size ומריץ-מחדש את ה-scope החסר.",
          cbcHe:
            "ב-CBC הערכת ה-job הלילי חושפת ש-package של קו-2 לא הושלם; המתכנן מריץ-מחדש את חומרי-הקו אינטראקטיבית בבוקר.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Background Run ► Application Log",
          ],
          tables: ["/SAPAPO/APPLOG", "BALHDR", "TBTCO"],
          tcodes: ["/SAPAPO/CDPSB0", "SLG1", "SM37"],
          fiori: ["F1339"],
          configHe: [
            "application log per package; job log (SM37) משלים.",
          ],
          flow: [
            { he: "סיום background job" },
            { he: "קריאת application log per package" },
            { he: "זיהוי packages שנכשלו" },
            { he: "re-plan scope חסר" },
          ],
          masterDataHe: ["propagation range; package definition."],
          mistakesHe: [
            "אי-בדיקת log — packages שנכשלו לא מטופלים.",
          ],
          troubleshootHe: [
            "package נכשל ➔ timeout/נעילה; הקטן package size והרץ-מחדש.",
            "scope חסר ➔ propagation range לא כיסה.",
          ],
          bestPracticeHe: [
            "בדוק application + job log אחרי כל job.",
            "כייל package size למניעת timeouts.",
          ],
          interviewHe: [
            { qHe: "כיצד מעריכים background planning run?", aHe: "דרך ה-application log (per package) ו-job log — מספר-חומרים, errors, runtime ו-packages שנכשלו." },
          ],
          takeawaysHe: [
            "application log per package.",
            "מזהה packages שנכשלו.",
            "כייל package size.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · הרצת-תכנון ברקע (5.6.2)", href: "/library/ppds/chapter-05/#sub-5.6.2" },
          ],
        },
        {
          id: "5.7.4",
          titleHe: "ניטור תוצאות-תכנון מאפליקציות MRP ב-SAP Fiori",
          titleEn: "Monitor Planning Results from MRP SAP Fiori Apps",
          execHe:
            "אפליקציות ה-MRP ב-SAP Fiori (Monitor/Manage Material Coverage, Manage Material Shortages, MRP master data issues) נותנות למתכן ממשק-עבודה מודרני, exception-based, לניטור-תוצאות ולפעולה — מהרצף 'בעיה→החלטה→פעולה' באותו מסך.",
          beginnerHe:
            "במקום מסכי-SAP ישנים, יש אפליקציות Fiori נוחות שמראות בדיוק היכן יש מחסור/עודף, ומאפשרות לתקן ישירות — לראות בעיה, להחליט ולפעול במקום אחד.",
          consultantHe:
            "האפליקציות המרכזיות: Monitor Material Coverage (F0247) — uncovered requirements; Manage Material Coverage — פתרון solution cards; Manage Material Shortages — שיתוף-פעולה; MRP master data issues — בעיות-נתוני-אב. הן עובדות על תוצאות classic+PP/DS, מציגות KPIs ו-solution proposals, ומאפשרות פעולה ישירה (firm/reschedule). ה-exception-based UX הוא לב תכנון-S/4HANA.",
          purposeHe:
            "לתת למתכן ממשק יומיומי יעיל לניהול-לפי-חריגים: לזהות מחסורים, לקבל הצעות-פתרון, ולפעול — בלי לנווט בין מסכים.",
          processExampleHe:
            "Monitor Material Coverage מציג 30 חומרים ב-uncovered; המתכנן נכנס ל-Manage Material Coverage, בוחר solution card (להקדים אספקה), ומאשר — הפער נסגר.",
          cbcHe:
            "ב-CBC מתכנן-המשקאות פותח בבוקר את Monitor Material Coverage, רואה מחסור-קיץ ב-Sprite, ומ-Manage Material Coverage מקדים הזמנה-מתוכננת בלחיצה.",
          navHe: [
            "SAP Fiori Launchpad ► Manufacturing ► MRP ► Monitor/Manage Material Coverage",
          ],
          tables: ["MDVM", "MARC", "/SAPAPO/ORDKEY"],
          tcodes: ["MD04", "MD06"],
          fiori: ["F0247", "F1339", "F2101", "F0251"],
          configHe: [
            "הקצאת MRP Fiori apps ל-business role; הגדרת MRP areas/controllers.",
          ],
          flow: [
            { he: "Monitor Material Coverage", note: "זיהוי uncovered" },
            { he: "Manage Material Coverage", note: "solution cards" },
            { he: "פעולה ישירה", note: "firm/reschedule" },
            { he: "סגירת הפער" },
          ],
          masterDataHe: ["MRP controller/area; exception thresholds."],
          mistakesHe: [
            "אי-הקצאת ה-apps לתפקיד — המתכנן חוזר למסכים ישנים.",
            "התעלמות מ-solution proposals.",
          ],
          troubleshootHe: [
            "אפליקציה ריקה ➔ MRP controller/area/role שגויים.",
            "חומר לא מופיע ➔ מחוץ ל-scope/area.",
          ],
          bestPracticeHe: [
            "אמץ exception-based UX של Fiori כברירת-מחדל.",
            "הקצה MRP areas/controllers נכון לכל מתכנן.",
          ],
          interviewHe: [
            { qHe: "אילו MRP Fiori apps משמשות לניטור-תוצאות?", aHe: "Monitor/Manage Material Coverage, Manage Material Shortages ו-MRP master data issues — exception-based עם solution proposals." },
          ],
          takeawaysHe: [
            "Fiori apps = ניטור-תוצאות מודרני.",
            "exception-based + solution cards.",
            "בעיה→החלטה→פעולה במסך אחד.",
          ],
          relatedHe: [
            { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
          ],
        },
      ],
    },
    // ============================================================ 5.8
    {
      id: "5.8",
      titleHe: "מינוף ה-Production Planning Optimizer",
      titleEn: "Leveraging the Production Planning Optimizer",
      execHe:
        "ה-Production Planning Optimizer הוא מנוע-אופטימיזציה מתמטי שמוצא תוכנית-ייצור מיטבית מול יעדים מתחרים (מינימום-עלות, עמידה-בתאריכים, מיעוט-setup) ואילוצי-קיבולת — מעבר ליכולת ה-heuristics. הוא הכלי הכבד-ביותר בארגז-ה-PP/DS.",
      beginnerHe:
        "Heuristics עובדות לפי 'כלל-אצבע'; ה-Optimizer פותר בעיית-מתמטיקה: בהינתן כל האילוצים והעלויות, מהי התוכנית הזולה/הטובה ביותר? הוא שוקל הכל יחד ומחזיר פתרון אופטימלי — אבל דורש הגדרה זהירה.",
      consultantHe:
        "ה-Optimizer (PP/DS optimizer) הוא solver מבוסס cost-functions: minimize total cost = setup + delay + storage + mode/resource costs, בכפוף ל-finite capacity, sequence-dependent setup ו-pegging. דורש master data (setup matrices/groups, costs ב-resource/product) ו-optimization profile (יעדים, משקלים, runtime, horizon). מורץ אינטראקטיבית או ברקע על scope. שונה מ-heuristics בכך שהוא גלובלי-אופטימלי (בקירוב) ולא צעד-אחר-צעד.",
      purposeHe:
        "למצוא תוכנית-ייצור מיטבית מול trade-offs מורכבים (עלות מול שירות מול setup) שאי-אפשר לפתור ידנית או ב-heuristic — במיוחד בקווים עם sequence-dependent setup.",
      processExampleHe:
        "קו עם זמני-מעבר תלויי-רצף; ה-Optimizer מסדר את ההזמנות למזער-setup תוך עמידה-בתאריכים, ומחזיר רצף-ייצור אופטימלי שה-heuristic לא הייתה מוצאת.",
      cbcHe:
        "ב-CBC ה-Optimizer מסדר את רצף-המשקאות על קו-המילוי למזער מעברי-טעם (CIP יקר): מקבץ טעמים-דומים, עובר מבהיר-לכהה, ומאזן מול תאריכי-מסירה — חיסכון משמעותי בזמן-ניקוי.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Optimization ► Maintain Optimization Profiles",
        "Production Planning for Process Industries ► PP/DS ► Optimization ► Setup Matrix / Groups",
      ],
      tables: ["/SAPAPO/OPTPROF", "/SAPAPO/SETUPMAT", "/SAPAPO/RESKEY"],
      tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/CDPS0", "/SAPAPO/COPT00"],
      fiori: ["F3331"],
      configHe: [
        "Optimization profile: יעדים, משקלים (setup/delay/storage), runtime, horizon.",
        "Setup matrix/groups + costs ב-resource/product.",
      ],
      flow: [
        { he: "הגדרת master data", note: "setup matrix/costs" },
        { he: "הגדרת optimization profile" },
        { he: "הרצת Optimizer", note: "interactive/background" },
        { he: "ניתוח תוצאות + אימוץ" },
      ],
      masterDataHe: [
        "Setup matrices/groups, mode/resource/storage costs, product delay costs/priority.",
      ],
      mistakesHe: [
        "הרצת Optimizer ללא master data מלא (setup/costs) — תוצאה חסרת-משמעות.",
        "runtime/horizon לא-מותאמים — פתרון לא-מתכנס או איטי.",
      ],
      troubleshootHe: [
        "תוצאות-Optimizer לא-הגיוניות ➔ setup matrix/costs/weights שגויים.",
        "Optimizer לא מתכנס ➔ runtime קצר/horizon רחב מדי.",
      ],
      bestPracticeHe: [
        "השקע ב-master data (setup/costs) לפני אופטימיזציה.",
        "כייל משקלים בהדרגה והשווה לתוצאת-heuristic.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Optimizer ל-heuristic?", aHe: "heuristic = כלל-אצבע צעד-אחר-צעד; Optimizer = solver מתמטי שממזער cost-function גלובלית (setup+delay+storage) מול אילוצים." },
        { qHe: "מתי הכי משתלם ה-Optimizer?", aHe: "בקווים עם sequence-dependent setup ו-trade-offs מורכבים שבהם רצף-ייצור משפיע מהותית על עלות." },
      ],
      takeawaysHe: [
        "Optimizer = solver מתמטי לתוכנית-מיטבית.",
        "ממזער setup+delay+storage מול קיבולת.",
        "דורש master data + profile מדויקים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · היוריסטיקות תכנון (5.3)", href: "/library/ppds/chapter-05/#sub-5.3" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
      children: [
        {
          id: "5.8.1",
          titleHe: "הגדרות נתוני-אב ל-Production Planning Optimizer",
          titleEn: "Master Data Settings for Production Planning Optimizer",
          execHe:
            "ה-Optimizer ניזון מנתוני-אב ייעודיים: setup matrices/groups (זמני/עלויות-מעבר תלויי-רצף), costs (setup/delay/storage/mode) ברמת-resource/product, ו-resource calendars. ללא נתונים אלה אין מה לאופטם.",
          beginnerHe:
            "כדי שה-Optimizer ידע 'כמה עולה' כל החלטה, צריך להזין לו מחירים: כמה עולה מעבר בין מוצרים (setup), כמה עולה איחור (delay), כמה עולה אחסון (storage). בלי המספרים האלה הוא לא יכול לבחור.",
          consultantHe:
            "נתוני-האב: (1) Setup matrix + setup groups/keys על ה-resource — זמני/עלויות-מעבר sequence-dependent; (2) costs — delay cost ו-priority ברמת-product, storage cost, mode/resource cost; (3) resource definitions (finite, calendars, modes). מוזנים דרך resource/product master ו-/SAPAPO/CDPSC5. דיוקם קובע ישירות את איכות-הפתרון.",
          purposeHe:
            "לספק ל-Optimizer את 'מפת-העלויות והאילוצים' שעליה הוא מבסס את ההחלטה — בלעדיה הפתרון חסר-משמעות.",
          processExampleHe:
            "setup matrix מגדיר 20 דק' מעבר מטעם-בהיר לכהה ו-90 דק' להפך; ה-Optimizer ישתמש בכך לסדר טעמים מבהיר-לכהה ולמזער-ניקוי.",
          cbcHe:
            "ב-CBC ה-setup matrix של קו-המילוי מקודד זמני-CIP בין טעמים (לימון→קולה יקר, מים→לימון זול); ה-Optimizer מסתמך עליו לרצף-מיטבי.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Optimization ► Setup Matrix / Setup Groups",
            "Resource master ► Setup / Costs",
          ],
          tables: ["/SAPAPO/SETUPMAT", "/SAPAPO/RESKEY", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/RES01", "/SAPAPO/MAT1"],
          fiori: ["F3331"],
          configHe: [
            "Setup matrix + setup groups/keys על ה-resource (sequence-dependent).",
            "Delay/storage/mode costs ו-priority ברמת-product/resource.",
          ],
          flow: [
            { he: "הגדרת setup groups/keys" },
            { he: "מילוי setup matrix", note: "זמן/עלות מעבר" },
            { he: "הזנת delay/storage/mode costs" },
            { he: "מוכן ל-Optimizer" },
          ],
          masterDataHe: [
            "Setup matrices/groups, delay cost+priority (product), storage/mode costs, resource calendars.",
          ],
          mistakesHe: [
            "setup matrix חלקי — מעברים לא-מתומחרים מקבלים 0 ומעוותים פתרון.",
            "costs לא-מאוזנים (delay≫storage) — תוכנית מוטה.",
          ],
          troubleshootHe: [
            "Optimizer מתעלם מ-setup ➔ matrix/groups לא מוקצים ל-resource.",
            "פתרון מוטה לכיוון אחד ➔ משקלי-עלות לא-מאוזנים.",
          ],
          bestPracticeHe: [
            "מלא setup matrix במלואו (כולל מעברים נדירים).",
            "כייל יחסי-עלויות מול המציאות העסקית.",
          ],
          interviewHe: [
            { qHe: "אילו נתוני-אב דרושים ל-Optimizer?", aHe: "Setup matrix/groups (sequence-dependent), delay/storage/mode costs, priorities ו-resource definitions." },
            { qHe: "מהי setup matrix?", aHe: "טבלת זמני/עלויות-מעבר בין מוצרים/setup-groups על resource — בסיס לאופטימיזציית-רצף." },
          ],
          takeawaysHe: [
            "Optimizer ניזון מ-setup matrix + costs.",
            "דיוק-הנתונים = איכות-הפתרון.",
            "מלא matrix במלואו.",
          ],
        },
        {
          id: "5.8.2",
          titleHe: "פרופילים ל-Production Planning Optimizer",
          titleEn: "Profiles for Production Planning Optimizer",
          execHe:
            "ה-optimization profile מגדיר 'מה לאופטם': אילו יעדים (setup/delay/storage), משקלם היחסי, אופק-האופטימיזציה, runtime מקסימלי, ואילו resources/orders בתחום. הוא ה'מוח-המכוון' של ה-Optimizer.",
          beginnerHe:
            "ה-profile אומר ל-Optimizer מה חשוב לנו יותר: לחסוך setup? לעמוד בתאריכים? להקטין מלאי? ובכמה זמן-ריצה. משנים את המשקלים — ומקבלים תוכנית בדגש אחר.",
          consultantHe:
            "ה-optimization profile (/SAPAPO/CDPSC5) כולל: objective weights (setup, delay/lateness, storage, mode), optimization horizon, max runtime, finite/infinite per resource, ו-scope (resources/orders). שונה מ-DS strategy. ניתן לתחזק profiles מרובים לתרחישים (cost-focus מול service-focus). מאופס בהרצה.",
          purposeHe:
            "לתרגם את מדיניות-התכנון (עלות מול שירות) להגדרה מתמטית מכוונת — ולאפשר תרחישים שונים דרך profiles נפרדים.",
          processExampleHe:
            "profile A (cost-focus): משקל-setup גבוה; profile B (service-focus): משקל-delay גבוה. הרצת שניהם מאפשרת להשוות תוכנית-זולה מול תוכנית-עומדת-בזמן.",
          cbcHe:
            "ב-CBC בשגרה רץ profile cost-focus (מיעוט-CIP); לפני קמפיין רץ profile service-focus (עמידה-בתאריכי-מבצע גם במחיר setup).",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Optimization ► Maintain Optimization Profiles",
          ],
          tables: ["/SAPAPO/OPTPROF", "/SAPAPO/RESKEY"],
          tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/COPT00"],
          fiori: ["F3331"],
          configHe: [
            "Objective weights (setup/delay/storage/mode); horizon; max runtime.",
            "Finite/infinite per resource; scope (resources/orders).",
          ],
          flow: [
            { he: "הגדרת יעדים + משקלים" },
            { he: "הגדרת horizon + runtime" },
            { he: "בחירת scope (resources)" },
            { he: "שמירת profile לתרחיש" },
          ],
          masterDataHe: ["profile מפנה ל-resources/costs; אין master-data חדש בעצמו."],
          mistakesHe: [
            "runtime קצר מדי — פתרון לא-מתכנס.",
            "horizon רחב מדי — ריצה כבדה ללא ערך.",
          ],
          troubleshootHe: [
            "פתרון חלש ➔ הארך runtime או צמצם horizon/scope.",
            "תוצאה לא תואמת-מדיניות ➔ כייל משקלי-יעדים.",
          ],
          bestPracticeHe: [
            "תחזק profiles נפרדים לתרחישים (cost/service).",
            "כייל runtime/horizon לאיזון איכות-מול-ביצועים.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר optimization profile?", aHe: "יעדים ומשקלים (setup/delay/storage), horizon, max runtime ו-scope של ה-Optimizer." },
          ],
          takeawaysHe: [
            "profile = המוח-המכוון של ה-Optimizer.",
            "משקלי-יעדים + horizon + runtime.",
            "profiles מרובים לתרחישים.",
          ],
        },
        {
          id: "5.8.3",
          titleHe: "הרצת ה-Production Planning Optimizer",
          titleEn: "Executing the Production Planning Optimizer",
          execHe:
            "הרצת ה-Optimizer מפעילה את ה-solver על scope מוגדר לפי profile — אינטראקטיבית (מתוך DS Planning Board) או ברקע (job). התוצאה היא תוכנית-מוצעת שניתן לאמץ או לדחות.",
          beginnerHe:
            "מפעילים את ה-Optimizer: בוחרים profile ו-scope, לוחצים 'אופטם', ומחכים שה-solver יסיים. בסוף מקבלים תוכנית-מוצעת — מאשרים אם טובה.",
          consultantHe:
            "ההרצה מתבצעת מ-DS Planning Board (interactive) או כ-background job. ה-solver רץ עד max runtime או עד התכנסות, ומחזיר schedule מוצע ב-LiveCache (לרוב בגרסה/לבדיקה). ניתן לאמץ (commit) או לבטל. ניטור דרך optimization log. שיקולי-ביצועים: scope, runtime, מורכבות. ניתן להריץ בגרסה לא-פעילה לבדיקה (5.5).",
          purposeHe:
            "להפיק תוכנית-מיטבית בפועל ולשלוט בתהליך-האימוץ — להריץ, לבחון, ולהחליט אם לאמץ.",
          processExampleHe:
            "המתכנן מריץ Optimizer על קו ל-7 ימים; אחרי 5 דקות מתקבל רצף-מוצע עם 30% פחות setup; הוא בוחן ומאמץ.",
          cbcHe:
            "ב-CBC הרצת-Optimizer על קו-מילוי לשבוע מחזירה רצף-טעמים שחוסך שתי CIP-מלאות; המתכנן מאמץ אחרי בדיקה ויזואלית ב-Planning Board.",
          navHe: [
            "Production Planning for Process Industries ► Detailed Scheduling ► Planning Board ► Optimize",
            "Production Planning for Process Industries ► PP/DS ► Optimization ► Background Execution",
          ],
          tables: ["/SAPAPO/OPTPROF", "/SAPAPO/ORDKEY", "/SAPAPO/APPLOG"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/COPT00", "/SAPAPO/CDPSB0"],
          fiori: ["F3331"],
          configHe: [
            "בחירת profile + scope; interactive (board) או background (job).",
            "אימוץ/ביטול התוצאה; optimization log.",
          ],
          flow: [
            { he: "בחירת profile + scope" },
            { he: "הרצת solver", note: "עד runtime/התכנסות" },
            { he: "תוכנית-מוצעת" },
            { he: "אימוץ או ביטול" },
          ],
          masterDataHe: ["setup/costs + profile (מ-5.8.1/5.8.2)."],
          mistakesHe: [
            "אימוץ אוטומטי ללא בדיקה — שינויים לא-רצויים בגרסה-הפעילה.",
            "scope רחב מדי בהרצה אינטראקטיבית — המתנה ארוכה.",
          ],
          troubleshootHe: [
            "אין שיפור ➔ master data/profile חלשים או scope קטן מדי.",
            "ריצה ארוכה ➔ הקטן scope/horizon או הרץ ברקע.",
          ],
          bestPracticeHe: [
            "הרץ ברקע ל-scope גדול; אינטראקטיבי לבדיקה.",
            "בחן תוצאה לפני אימוץ; שקול גרסה לא-פעילה.",
          ],
          interviewHe: [
            { qHe: "כיצד מריצים את ה-Optimizer?", aHe: "מ-DS Planning Board (interactive) או כ-background job, עם profile ו-scope; התוצאה מאומצת או מבוטלת." },
          ],
          takeawaysHe: [
            "interactive (board) או background.",
            "רץ עד runtime/התכנסות.",
            "בחן לפני אימוץ.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · הזמנות לא-פעילות (5.5)", href: "/library/ppds/chapter-05/#sub-5.5" },
          ],
        },
        {
          id: "5.8.4",
          titleHe: "ניתוח תוצאות ה-Production Planning Optimizer",
          titleEn: "Analyzing Production Planning Optimizer Results",
          execHe:
            "ניתוח-התוצאות בוחן את התוכנית-המוצעת מול ה-baseline: ירידת-setup, עמידה-בתאריכים, ניצול-קיבולת, וה-objective value. כך מחליטים אם הפתרון משתלם ואם להריץ-שוב עם profile מכוון אחרת.",
          beginnerHe:
            "אחרי שה-Optimizer מחזיר תוכנית, בודקים: באמת חסכנו setup? עמדנו בתאריכים? הקו מנוצל טוב? משווים ל'לפני' ומחליטים אם זה שווה.",
          consultantHe:
            "הניתוח משתמש ב-optimization log, ב-objective value (total cost), וב-KPIs: setup time/cost, total lateness/delay, capacity utilization, storage. השוואה ל-baseline (heuristic/קודם) דרך DS Planning Board ו-alerts. אם לא-מספק — כיול-משקלים ב-profile והרצה-חוזרת. גם בדיקת-feasibility (אין violations). זהו לולאת-שיפור (analyze→tune→re-run).",
          purposeHe:
            "לכמת את ערך-האופטימיזציה ולכוון אותה: לאמץ רק פתרון משתלם, ולשפר ע\"י כיול-profile איטרטיבי.",
          processExampleHe:
            "ניתוח מראה −30% setup אך +2 הזמנות-מאחרות; המתכנן מעלה משקל-delay ב-profile ומריץ-שוב — מקבל איזון טוב יותר.",
          cbcHe:
            "ב-CBC הניתוח מאשר חיסכון של 2 CIP אך מאחר משקה-מבצע; המתכנן מעלה את priority/delay-weight של המבצע ומריץ-שוב — חיסכון ללא-איחור-המבצע.",
          navHe: [
            "Production Planning for Process Industries ► PP/DS ► Optimization ► Optimization Log / Results",
            "Detailed Scheduling ► Planning Board ► Evaluate",
          ],
          tables: ["/SAPAPO/APPLOG", "/SAPAPO/ORDKEY", "/SAPAPO/RESKEY"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/COPT00", "/SAPAPO/CDPSB0"],
          fiori: ["F3331"],
          configHe: [
            "Optimization log + objective value; KPIs (setup/delay/utilization).",
            "השוואה ל-baseline; כיול-profile איטרטיבי.",
          ],
          flow: [
            { he: "קריאת optimization log + objective" },
            { he: "השוואת KPIs ל-baseline" },
            { he: "בדיקת feasibility/violations" },
            { he: "אימוץ או כיול+הרצה-חוזרת" },
          ],
          masterDataHe: ["profile weights (לכיול); costs (לפרשנות-תוצאה)."],
          mistakesHe: [
            "מדידת setup בלבד תוך התעלמות מ-lateness — תמונה חלקית.",
            "אימוץ פתרון עם violations.",
          ],
          troubleshootHe: [
            "שיפור-setup על-חשבון-תאריכים ➔ העלה delay weight.",
            "objective גבוה/violations ➔ master data/profile/feasibility.",
          ],
          bestPracticeHe: [
            "השווה תמיד ל-baseline (heuristic/קודם).",
            "נהל לולאת analyze→tune→re-run עד איזון.",
          ],
          interviewHe: [
            { qHe: "כיצד מנתחים תוצאות-Optimizer?", aHe: "דרך objective value ו-KPIs (setup/lateness/utilization) מול baseline, בדיקת-feasibility, וכיול-profile חוזר אם צריך." },
          ],
          takeawaysHe: [
            "כמת מול baseline (setup/lateness/utilization).",
            "בדוק feasibility לפני אימוץ.",
            "לולאת analyze→tune→re-run.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · פרופילי-אופטימיזציה (5.8.2)", href: "/library/ppds/chapter-05/#sub-5.8.2" },
          ],
        },
      ],
    },
    // ============================================================ 5.9
    {
      id: "5.9",
      titleHe: "תכנון ב-PP/DS עם SAP Integrated Business Planning",
      titleEn: "Planning in PP/DS with SAP Integrated Business Planning",
      execHe:
        "PP/DS מטפל בתכנון-תפעולי קצר-טווח (finite, detailed), בעוד SAP IBP מטפל בתכנון-טקטי/אסטרטגי (S&OP, demand, supply לטווח-בינוני-ארוך). האינטגרציה ביניהם מורידה את תוכנית-ה-IBP לביצוע-מפורט ב-PP/DS ומחזירה משוב-קיבולת — מחברת את ה'כמה כולל' ל'מתי בדיוק'.",
      beginnerHe:
        "IBP הוא התכנון 'מלמעלה' (חודשים/שנה: כמה נמכור, כמה נייצר); PP/DS הוא התכנון 'מלמטה' (ימים/שבועות: על איזה קו ומתי בדיוק). האינטגרציה מחברת אותם: התוכנית-הכוללת מ-IBP יורדת לפירוט ב-PP/DS, וה-PP/DS מדווח חזרה אם זה ישים מבחינת-קיבולת.",
      consultantHe:
        "האינטגרציה מבוססת על SAP Cloud Integration for data services / RTI (real-time integration) בין IBP (cloud) ל-S/4HANA embedded PP/DS. זרימה: IBP מייצר supply plan (S&OP, projected stock, production quantities per period) → מועבר ל-PP/DS כ-demand/planned independent requirements או stock targets → PP/DS מתכנן finite ומחזיר feasibility/capacity feedback. ה-master data מיושר (products, resources, locations). שונה מ-PP/DS bottom-up בכך שהוא mid-term aggregate top-down. תרחישים: aggregate-to-detailed, capacity reconciliation.",
      purposeHe:
        "ליישר תכנון-עסקי-כולל (IBP) עם ביצוע-מפורט (PP/DS): שהתוכנית-הטקטית תהיה בת-ביצוע, ושמגבלות-הרצפה ישתקפו חזרה בתכנון-העליון.",
      processExampleHe:
        "IBP קובע 100K יח'/חודש למוצר; הכמות יורדת ל-PP/DS כ-PIRs; PP/DS מתכנן finite על הקווים ומגלה שרק 90K ישימים — ה-feedback חוזר ל-IBP לתיאום-מחדש.",
      cbcHe:
        "ב-CBC IBP מתכנן ביקוש-קיץ למשקאות ברמת-חודש/אזור; הכמויות יורדות ל-PP/DS שמתכנן את קווי-המילוי finite; אם קו מגיע לתקרת-קיבולת — ה-feedback חוזר ל-IBP להזיז נפח לחודש/מפעל אחר.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS ► Integration ► SAP IBP Integration",
        "SAP IBP ► Application Jobs / RTI ► S/4HANA Integration",
      ],
      tables: ["/SAPAPO/MATKEY", "/SAPAPO/ORDKEY", "PBIM"],
      tcodes: ["/SAPAPO/RRP3", "MD61", "/SAPAPO/CDPS0"],
      fiori: ["F3331", "F0247"],
      configHe: [
        "RTI / Cloud Integration בין IBP ל-S/4HANA (CPI-DS).",
        "מיפוי master data (products/resources/locations) ו-key figures → PIRs/stock targets.",
      ],
      flow: [
        { he: "IBP supply plan", note: "S&OP/mid-term" },
        { he: "העברה ל-PP/DS", code: "RTI", note: "PIRs/targets" },
        { he: "תכנון finite ב-PP/DS" },
        { he: "capacity feedback ל-IBP" },
      ],
      masterDataHe: [
        "מיפוי-מיושר: products, resources, locations, planning levels בין IBP ל-PP/DS.",
        "Planned Independent Requirements (PBIM/PIRs) כממשק-הביקוש.",
      ],
      mistakesHe: [
        "master data לא-מיושר בין IBP ל-PP/DS — העברות נכשלות/מעוותות.",
        "התעלמות מ-capacity feedback — תוכנית-IBP לא-ישימה נשארת.",
      ],
      troubleshootHe: [
        "כמויות-IBP לא מגיעות ל-PP/DS ➔ RTI/mapping שגוי.",
        "PP/DS לא ישים מול IBP ➔ קיבולת חסרה; החזר feedback ל-IBP.",
      ],
      bestPracticeHe: [
        "יישר master data ומחזורי-תכנון בין IBP ל-PP/DS.",
        "סגור את לולאת ה-feedback (capacity) ל-IBP.",
      ],
      interviewHe: [
        { qHe: "מה היחס בין IBP ל-PP/DS?", aHe: "IBP = תכנון טקטי/אסטרטגי (mid/long-term, aggregate); PP/DS = ביצוע-מפורט (short-term, finite). IBP יורד ל-PP/DS, ו-PP/DS מחזיר feasibility." },
        { qHe: "כיצד מתחברים?", aHe: "דרך RTI / Cloud Integration: supply plan מ-IBP → PIRs/targets ב-PP/DS → capacity feedback חזרה." },
      ],
      takeawaysHe: [
        "IBP = top-down טקטי; PP/DS = bottom-up מפורט.",
        "IBP יורד ל-PP/DS (PIRs); feedback חוזר.",
        "אינטגרציה דרך RTI/CPI.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מתי להשתמש ב-PP/DS (5.1)", href: "/library/ppds/chapter-05/#sub-5.1" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
    },
    // ============================================================ 5.10
    {
      id: "5.10",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את תכנון-הייצור ב-PP/DS מקצה-לקצה: מתי להשתמש בו (5.1), פונקציות-הבסיס (5.2: Pegging, אופק, נטו, lot-sizing, מלאי-ביטחון, מקור), עולם ה-heuristics (5.3) וה-service heuristics (5.4), הזמנות לא-פעילות (5.5), הרצת-תכנון על מצביה (5.6: interactive/background/MRP Live), ניטור והערכה (5.7), ה-Optimizer (5.8) ואינטגרציית-IBP (5.9). יחד הם מרכיבים תמונת-תכנון מלאה: מהאסטרטגיה ועד הרצף על הקו.",
      beginnerHe:
        "סיכמנו את כל מסע-התכנון: החלטנו אילו חומרים מתוכננים ב-PP/DS, הבנו את אבני-הבניין (Pegging, נטו, lot-size, מקור), בחרנו 'מתכונים' (heuristics) וכלי-תיקון (service heuristics), הרצנו תכנון (אינטראקטיבי/רקע/MRP Live), ניטרנו תוצאות, אופטמנו רצף (Optimizer), והתחברנו לתכנון-העסקי-הכולל (IBP).",
      consultantHe:
        "המודל המנצח ב-S/4HANA: סמן Advanced Planning רק ל-bottlenecks; השתמש ב-SAP_PP_002/SAP_MRP_001 כברירת-מחדל; הרץ MRP Live (One MRP Run) לתכנון-משולב יומי; נהל exception-based דרך MRP Fiori apps; הפעל את ה-Optimizer היכן ש-sequence-dependent setup מצדיק; וסגור את הלולאה הטקטית מול IBP. כל אלה נשענים על master data מדויק (PDS, resources, setup matrices, costs) ועל ניטור-log שיטתי.",
      purposeHe:
        "לקבע את התמונה-הכוללת ואת רצף-ההחלטות הנכון, כך שהלומד יוכל לתכנן ייצור-PP/DS מקצה-לקצה ולדעת מתי כל כלי משרת אותו.",
      processExampleHe:
        "מסע-יום של מתכן: MRP Live לילי מתכנן הכל → בוקר ב-MRP Fiori apps לטיפול-חריגים → Optimizer על קו-מפתח לרצף-מיטבי → התאמות ב-DS Planning Board → feedback ל-IBP על תקרת-קיבולת.",
      cbcHe:
        "ב-CBC המודל המלא: IBP מתכנן נפחי-קיץ → MRP Live מתכנן משקאות (PP/DS) ורכיבים (classic) → Optimizer ממזער CIP על קווי-המילוי → מתכנן-הקו מטפל בחריגים ב-Fiori → ה-feedback מיישר נפחים בין מפעלים.",
      navHe: [
        "Production Planning for Process Industries ► PP/DS (כלל-הפרק)",
        "SAP Help ► PP/DS in SAP S/4HANA ► Production Planning",
      ],
      tables: ["MARC", "/SAPAPO/ORDKEY", "/SAPAPO/PEGKEY", "/SAPAPO/OPTPROF"],
      tcodes: ["/SAPAPO/RRP3", "MD01N", "/SAPAPO/CDPS0", "/SAPAPO/CDPSC5"],
      fiori: ["F3331", "F0247", "F1339"],
      configHe: [
        "אסטרטגיית-בחירה ל-Advanced Planning; Planning Procedures/heuristics.",
        "MRP Live scope; MRP Fiori roles; optimization profiles ו-setup master data.",
      ],
      flow: [
        { he: "IBP (טקטי)", code: "5.9" },
        { he: "MRP Live (One Run)", code: "5.6.4" },
        { he: "heuristics + service heuristics", code: "5.3/5.4" },
        { he: "Optimizer", code: "5.8" },
        { he: "ניטור Fiori", code: "5.7" },
      ],
      masterDataHe: [
        "PDS/PPM, resources, setup matrices, costs, Planning Procedures — הבסיס לכל הפרק.",
      ],
      mistakesHe: [
        "over-engineering: הכל ב-PP/DS/Optimizer ללא צורך.",
        "דילוג על ניטור — שגיאות-תכנון 'שקטות'.",
        "master data חלקי — heuristics/Optimizer מחזירים תוצאות חסרות-משמעות.",
      ],
      troubleshootHe: [
        "תכנון לא-עקבי מקצה-לקצה ➔ חזור לשרשרת: דגלים→heuristic→MRP Live→ניטור.",
        "ערך-מועט מ-Optimizer ➔ בדוק master data (setup/costs) לפני profiles.",
      ],
      bestPracticeHe: [
        "PP/DS ל-bottlenecks; classic לשאר; MRP Live לאיחוד.",
        "exception-based דרך Fiori; Optimizer היכן ש-setup מצדיק; IBP לסגירת-הלולאה.",
        "השקע ב-master data — הוא קובע את איכות-כל-הכלים.",
      ],
      interviewHe: [
        { qHe: "מהו רצף-ההחלטות הנכון בתכנון-PP/DS?", aHe: "בחר חומרי-PP/DS (bottlenecks) → הגדר Planning Procedure/heuristic → הרץ MRP Live → נהל חריגים ב-Fiori → אופטם רצף (Optimizer) → סגור לולאה מול IBP." },
        { qHe: "מהי הטעות הנפוצה ביותר במימוש-PP/DS?", aHe: "over-engineering (הכל ב-PP/DS) ו-master data חלקי — שניהם הופכים את הכלים החזקים לחסרי-ערך." },
      ],
      takeawaysHe: [
        "PP/DS = תכנון מודע-קיבולת לחומרים-קריטיים; classic לשאר.",
        "MRP Live מאחד; Fiori מנהל-חריגים; Optimizer מאפטם-רצף; IBP סוגר-לולאה.",
        "master data מדויק הוא הבסיס לכל הכלים.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מתי להשתמש ב-PP/DS (5.1)", href: "/library/ppds/chapter-05/#sub-5.1" },
        { labelHe: "PP/DS · ה-Optimizer (5.8)", href: "/library/ppds/chapter-05/#sub-5.8" },
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-13/" },
      ],
    },
  ],
};
