// ===== PP/DS Digital Textbook — Chapter 1 (gold-standard learning chapter) =====
// Every node (parent + nested sub-heading) is a complete LearningNode with 18
// facets of authored Hebrew — beginner + consultant friendly — so the topic can
// be studied without the original book. Hierarchy + ids preserved exactly:
// 1.1 (1.1.1, 1.1.2) · 1.2 (1.2.1, 1.2.2, 1.2.3, 1.2.4) · 1.3.
// Transformative Hebrew; SAP identifiers verbatim EN (PP/DS, APO, liveCache, /SAPAPO/*).
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא ל-PP/DS ב-SAP S/4HANA",
  titleEn: "Introduction to PP/DS with SAP S/4HANA",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבוא ל-Production Planning and Detailed Scheduling (PP/DS) ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. נושאי הליבה: מהו תכנון-ייצור ותזמון-מפורט, כיצד PP/DS התפתח מ-SAP APO אל ה-embedded PP/DS ב-S/4HANA, אילו פישוטים מרכזיים בוצעו, וכיצד נראים מודלי הפריסה והארכיטקטורה. המטרה: להבין את PP/DS לעומק ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1",
      titleHe: "מהם תכנון-ייצור ותזמון-מפורט?",
      titleEn: "What Is Production Planning and Detailed Scheduling?",
      execHe:
        "Production Planning and Detailed Scheduling (PP/DS) הוא רכיב התכנון המתקדם (advanced planning) של SAP העונה על שתי שאלות-יסוד: מה לייצר ומתי (תכנון), וכן באיזה רצף ועל איזו מכונה (תזמון-מפורט). בעוד ש-MRP הקלאסי מתכנן בכמויות ובאופקי-זמן גסים, PP/DS מוסיף שכבת אופטימיזציה מודעת-קיבולת (finite, capacity-constrained) המייצרת תכנית בת-ביצוע בפועל ברצפת-הייצור. זהו המנוע שהופך תחזית-ביקוש לתכנית-ייצור ריאלית.",
      beginnerHe:
        "דמיין מטבח מסעדה עמוס. 'תכנון-ייצור' עונה על: אילו מנות נכין היום וכמה (לפי ההזמנות הצפויות). 'תזמון-מפורט' עונה על: באיזה סדר נכין אותן, על איזה כיריים, ומי הטבח — כך שהכל יֵצא בזמן בלי שהכיריים יתפוצצו מעומס. PP/DS עושה בדיוק זאת לרצפת-ייצור: קודם מחליט מה וכמה, ואז מסדר את הרצף המדויק על המכונות.",
      consultantHe:
        "PP/DS מבדיל בין שני אופקי-תכנון: planning (כיסוי-דרישות, lot-sizing, מקורות-אספקה) ו-detailed scheduling (רצף סדרתי על משאבים סופיים, setup-optimization, מזעור זמני-המתנה). הליבה רצה מול ה-liveCache — מסד-נתונים in-memory המחזיק את רשת-התכנון (orders, pegging, capacity) ומאפשר חישובי-תזמון מהירים. ב-S/4HANA זהו embedded PP/DS הרץ באותה מערכת, להבדיל מ-SAP APO החיצוני. אובייקטי-הליבה: Planned Order, PP/DS Order, resource, pegging (קישור היצע↔ביקוש), ו-PPM/PDS (Production Data Structure) כמקבילה ל-BOM+Routing בעולם ה-advanced planning.",
      purposeHe:
        "המטרה: לגשר על הפער בין תחזית/דרישה לבין יכולת-ייצור בפועל. תכנון לבדו (MRP) מתעלם מקיבולת סופית ומ-setup; תזמון-מפורט מוסיף את מימד הזמן-והמכונה. יחד הם מבטיחים שהתכנית ניתנת לביצוע, ממזערים מלאי-תהליך וזמני-החלפה, ומשפרים On-Time-Delivery.",
      processExampleHe:
        "יצרן מקבל תחזית ל-50,000 יח' לחודש. שלב התכנון יוצר Planned Orders לכיסוי הדרישה לפי lot-size ומקורות-אספקה. שלב התזמון-המפורט לוקח את אותן הזמנות, משבץ אותן על המשאבים הסופיים לפי קיבולת זמינה, ממזער החלפות (setup) ע\"י קיבוץ מוצרים דומים, וקובע לכל הזמנה תאריך-ושעת התחלה/סיום מדויקים — תכנית שאפשר למסור לרצפה.",
      cbcHe:
        "ב-CBC (Coca-Cola bottling) קווי-המילוי הם משאבים סופיים יקרים. PP/DS מתכנן אילו SKUs למלא וכמה (תכנון), ואז מסדר את רצף-המילוי על כל קו כדי למזער החלפות-טעם וגדלי-בקבוק (setup ארוך בין Coke ל-Sprite, או בין 0.5L ל-1.5L) — תזמון-מפורט שמקסם תפוקת-קו ומצמצם זמני-שטיפה.",
      navHe: [
        "SPRO ► Advanced Planning ► Basic Settings ► Activate Advanced Planning",
        "SAP Easy Access ► Logistics ► Advanced Planning ► Production Planning ► Interactive Production Planning",
      ],
      tables: ["RESB", "PLAF", "/SAPAPO/ORDMAP", "/SAPAPO/MATKEY"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0", "MD04"],
      fiori: ["F2101", "F0247"],
      configHe: [
        "הפעלת Advanced Planning ברמת-המערכת היא תנאי-סף; ללא הפעלה אין PP/DS ב-S/4HANA.",
        "הבחנה מושגית: planning horizon (אופק-תכנון) מול detailed scheduling horizon (אופק-תזמון, קצר וקרוב יותר).",
        "אופק התזמון-המפורט (PP/DS horizon) מוגדר ברמת-החומר/מפעל ומגדיר עד היכן קדימה מתבצע תזמון סופי.",
      ],
      flow: [
        { he: "דרישה / תחזית", code: "Demand", note: "מקור התכנון" },
        { he: "תכנון — מה וכמה", code: "Planned Order", note: "כיסוי-דרישות" },
        { he: "תזמון-מפורט — רצף ומכונה", code: "DS", note: "קיבולת סופית" },
        { he: "תכנית בת-ביצוע", code: "PP/DS Order", note: "תאריך+שעה+משאב" },
      ],
      masterDataHe: [
        "Product (Material) עם תצוגות Advanced Planning · Resource (משאב-תכנון, מקביל ל-Work Center).",
        "PDS / PPM — מבנה-נתוני-ייצור המאחד BOM + Routing לעולם ה-advanced planning.",
      ],
      mistakesHe: [
        "ערבוב בין 'תכנון' ל'תזמון' — תכנון קובע מה/כמה, תזמון קובע רצף/מכונה; אלה שלבים שונים.",
        "הנחה ש-PP/DS מחליף את MRP לחלוטין — לרוב הם מתקיימים יחד, כל אחד לאופק ולמטרה שלו.",
        "התעלמות מקיבולת סופית — שימוש בתכנון בלבד בלי תזמון מחזיר לבעיות העומס של MRP.",
      ],
      troubleshootHe: [
        "ההזמנה מתוכננת אך לא מתוזמנת על משאב ➔ ודא שהיא בתוך אופק התזמון-המפורט (PP/DS horizon).",
        "התכנית לא ריאלית מבחינת קיבולת ➔ נבדק שתזמון finite מופעל ולא רק תכנון אינסופי.",
        "מוצר לא נכלל ב-PP/DS ➔ חסרה תצוגת Advanced Planning או הפעלת Advanced Planning במערכת.",
      ],
      bestPracticeHe: [
        "הגדר אופק-תזמון-מפורט קצר וממוקד — תזמן finite רק את הקרוב, ותכנן infinite את הרחוק.",
        "תכנן (planning) ברמת-מוצר/קבוצה, ותזמן (scheduling) ברמת-משאב — הפרד תפקידים בבירור.",
        "מפה את אובייקטי-הליבה (Order, Resource, Pegging, PDS) לפני קונפיגורציה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Production Planning ל-Detailed Scheduling?", aHe: "Planning עונה על 'מה לייצר וכמה' ועל כיסוי-דרישות לאורך אופק רחב; Detailed Scheduling עונה על 'באיזה רצף ועל איזה משאב', עם קיבולת סופית, לאורך אופק קצר וקרוב." },
        { qHe: "מדוע PP/DS נחוץ אם קיים MRP?", aHe: "MRP מתכנן בכמויות וזמנים גסים ומתעלם מקיבולת סופית ומ-setup; PP/DS מוסיף אופטימיזציה מודעת-קיבולת ותזמון סדרתי על משאבים, ומייצר תכנית בת-ביצוע בפועל." },
        { qHe: "מהו תפקיד ה-liveCache ב-PP/DS?", aHe: "liveCache הוא מנגנון in-memory המחזיק את רשת-התכנון (orders, pegging, capacity) ומאפשר חישובי-תזמון מהירים — לב ביצועי-התכנון של PP/DS." },
      ],
      takeawaysHe: [
        "PP/DS = שתי שכבות: תכנון (מה/כמה) ותזמון-מפורט (רצף/מכונה).",
        "הערך המוסף על MRP הוא קיבולת סופית ואופטימיזציית-setup.",
        "התוצר הוא תכנית בת-ביצוע עם תאריך, שעה ומשאב לכל הזמנה.",
        "ה-liveCache הוא מנוע-הביצועים שמאחורי התזמון המהיר.",
      ],
      relatedHe: [
        { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-04/" },
        { labelHe: "PP/DS · ארכיטקטורה (1.2.4)", href: "/library/ppds/chapter-01/#sub-1.2.4" },
      ],
      children: [
        {
          id: "1.1.1",
          titleHe: "תכנון-ייצור (Production Planning)",
          titleEn: "Production Planning",
          execHe:
            "Production Planning קובע אילו מוצרים לייצר, באילו כמויות ובאילו תאריכים, כדי לכסות דרישה (הזמנות, תחזית, מלאי-בטחון). זהו השלב שמתרגם ביקוש לתכנית-אספקה: יצירת Planned Orders, בחירת מקור-אספקה (ייצור/רכש), וקביעת גודל-אצווה. זהו 'מה וכמה ומתי-בערך' של עולם הייצור.",
          beginnerHe:
            "תכנון-ייצור הוא רשימת-הקניות-וההכנות של המפעל: 'צריך להכין 1,000 בקבוקים עד יום שלישי, אז נתחיל ביום ראשון'. הוא מסתכל על מה הלקוחות יזמינו ומחליט מה ומתי לייצר כדי שיהיה מלאי בזמן — בלי להיכנס עדיין לשאלה על איזו מכונה בדיוק.",
          consultantHe:
            "ב-PP/DS התכנון מבוצע דרך Heuristics (אלגוריתמי-תכנון) הרצים על net requirements: זיהוי חוסר, lot-sizing, יצירת PP/DS Planned Orders, ו-source determination דרך PDS/Production Version. ה-pegging מקשר כל אספקה לדרישה שהיא מכסה. התכנון יכול להיות infinite (מתעלם מקיבולת) בשלב זה, ואז התזמון-המפורט מטפל בקיבולת. ה-Product Heuristic המוגדר ברמת-המוצר קובע איזו לוגיקת-תכנון מופעלת.",
          purposeHe:
            "להבטיח זמינות-מוצר במועד הנכון ובכמות הנכונה, תוך איזון בין רמות-מלאי לבין שירות-לקוח. תכנון טוב מצמצם חוסרים ועודפים כאחד.",
          processExampleHe:
            "Heuristic מזהה דרישה ל-1,000 יח' ב-15 בחודש ומלאי זמין 300. הוא יוצר Planned Order ל-700 יח', מחיל gross lot-size 500 (כך 1,000), קובע מקור-אספקה דרך PDS, וקושר ב-pegging את ההזמנה לדרישה. תאריך-ההתחלה נגזר מ-lead time.",
          cbcHe:
            "ב-CBC תכנון-הייצור קובע כמה בקבוקי-Coke 0.5L למלא השבוע לפי תחזית-מכירות וקידום-מבצע, ויוצר Planned Orders למילוי — לפני שהוחלט על איזה קו ובאיזה רצף.",
          navHe: [
            "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) ► Heuristics ► Maintain Heuristics",
            "SAP Easy Access ► Advanced Planning ► Production Planning ► Production Planning Run",
          ],
          tables: ["PLAF", "RESB", "/SAPAPO/ORDKEY"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPSB0", "MD04"],
          fiori: ["F2101", "F0247"],
          configHe: [
            "Maintain Heuristics — הגדרת אלגוריתמי-התכנון (Product/Service Heuristics) וקישורם למוצר.",
            "Product Heuristic ברמת-מוצר/מפעל קובע איזו לוגיקת-תכנון רצה בהרצת-התכנון.",
            "Planning Procedure במוצר קובע אם תכנון אוטומטי (immediately) או דרך הרצה (planning run).",
          ],
          flow: [
            { he: "ביקוש (דרישה/תחזית)", code: "Demand" },
            { he: "Heuristic — net requirements", code: "Heuristic" },
            { he: "Planned Order + Lot-size", code: "PLAF" },
            { he: "Pegging — היצע↔ביקוש", code: "Pegging" },
          ],
          masterDataHe: [
            "Product master (Advanced Planning views) · Product Heuristic · Lot-size method · Planning Procedure.",
            "PDS / Production Version — מקור-האספקה לייצור.",
          ],
          mistakesHe: [
            "Planning Procedure שגוי במוצר ➔ ההזמנות לא נוצרות אוטומטית ולא מתעדכנות.",
            "lot-size לא-מתאים ➔ אצוות גדולות/קטנות מדי ומלאי לא-יעיל.",
            "Product Heuristic לא משויך ➔ הרצת-התכנון מדלגת על המוצר.",
          ],
          troubleshootHe: [
            "אין Planned Orders לאחר הרצה ➔ בדוק Product Heuristic ו-Planning Procedure במוצר.",
            "ה-pegging לא מקשר נכון ➔ ודא תאריכים ו-pegging settings (use/availability dates).",
            "כמות לא צפויה ➔ בדוק lot-size method ומלאי-בטחון.",
          ],
          bestPracticeHe: [
            "התאם Product Heuristic לאופי-המוצר (make-to-stock מול make-to-order).",
            "תקנן מעט שיטות-lot-size לפשטות ולעקביות.",
            "הפעל תכנון-אוטומטי (immediately) רק היכן שצריך תגובה מהירה; אחרת השתמש בהרצות.",
          ],
          interviewHe: [
            { qHe: "מהו תפקיד Heuristic ב-PP/DS?", aHe: "Heuristic הוא אלגוריתם-התכנון שמזהה חוסרים, מחשב כמויות לפי lot-size, יוצר Planned Orders וקובע מקור-אספקה — לוגיקת ה'מה וכמה' של התכנון." },
            { qHe: "מהו pegging?", aHe: "הקישור הלוגי בין אלמנט-היצע (אספקה) לאלמנט-ביקוש (דרישה) שהוא מכסה; הוא מאפשר מעקב מלא היצע↔ביקוש ברשת-התכנון." },
          ],
          takeawaysHe: [
            "תכנון-ייצור = מה/כמה/מתי, דרך Heuristics ו-Planned Orders.",
            "ה-pegging מקשר כל אספקה לדרישה שהיא מכסה.",
            "Product Heuristic ו-Planning Procedure שולטים בהתנהגות-התכנון.",
          ],
          relatedHe: [{ labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-04/" }],
        },
        {
          id: "1.1.2",
          titleHe: "תזמון-מפורט (Detailed Scheduling)",
          titleEn: "Detailed Scheduling",
          execHe:
            "Detailed Scheduling לוקח את ההזמנות שתוכננו ומשבץ אותן על משאבים סופיים: קובע רצף, תאריך-ושעת התחלה/סיום, וממזער זמני-החלפה (setup) וזמני-המתנה. זהו השלב שהופך תכנית-כמותית לתכנית-זמנים בת-ביצוע ברצפה, תוך כיבוד מגבלות-הקיבולת בפועל.",
          beginnerHe:
            "אחרי שהחלטנו מה להכין, התזמון-המפורט מסדר את התור: 'קודם נמלא את כל ה-Coke כי הם על אותו טעם, ואז נעבור ל-Sprite אחרי שטיפה'. הוא מסדר את העבודות על המכונות לפי הזמן שיש, כך שכלום לא יתנגש ושההחלפות יהיו מינימליות.",
          consultantHe:
            "התזמון רץ על Resources (single/multi-activity, bucket) עם time-continuous capacity. אלגוריתמי DS heuristics ו-Optimizer (genetic/setup-based) מסדרים פעולות, מכבדים מגבלות-קודם-אחרי (relationships), ומבצעים setup-optimization דרך Setup Matrix (תלוי-מעבר בין מוצרים). תוצר: PP/DS Orders עם זמני-משאב מדויקים. ה-DS Planning Board (/SAPAPO/CDPS0) הוא ה-Gantt האינטראקטיבי לתזמון ידני ולאופטימיזציה. הכל מוחזק ב-liveCache.",
          purposeHe:
            "למקסם ניצולת-משאבים ולמזער זמני-החלפה והמתנה, תוך הבטחת עמידה-בזמנים. תזמון טוב = תפוקה גבוהה יותר מאותו ציוד והתחייבות-מסירה אמינה.",
          processExampleHe:
            "חמש הזמנות מתוכננות לאותו קו. ה-Optimizer מסדר אותן לפי Setup Matrix כך שמוצרים דומים רצים ברצף (מזעור setup), משבץ כל אחת בחלון-זמן פנוי על המשאב, וקובע התחלה 08:00 וסיום 11:30 להזמנה הראשונה — עם רצף שמקצר את סך-זמן-ההחלפות.",
          cbcHe:
            "ב-CBC ה-Setup Matrix מקודד שמעבר מ-Diet-Coke ל-Coke מצריך שטיפה קצרה, ומעבר מ-Coke ל-Sprite שטיפה ארוכה. התזמון-המפורט מסדר את רצף-המילוי על הקו כדי למזער שטיפות יקרות ולמקסם שעות-מילוי בפועל.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► Maintain Heuristics / Optimization",
            "SAP Easy Access ► Advanced Planning ► Production Planning ► Detailed Scheduling Planning Board",
          ],
          tables: ["/SAPAPO/RESAGG", "/SAPAPO/ORDOP", "/SAPAPO/SETUPMAT"],
          tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSB0", "/SAPAPO/RES01"],
          fiori: ["F2104", "F2336"],
          configHe: [
            "Detailed Scheduling Strategy — קובע מצב-תזמון (finite/infinite), כיוון (forward/backward) וטיפול-בהתנגשויות.",
            "Setup Matrix — זמני/עלויות-החלפה תלויי-מעבר בין מוצרים, בסיס ל-setup-optimization.",
            "DS Optimizer profile — משקלים (setup, lateness, makespan) לאופטימיזציה אוטומטית.",
          ],
          flow: [
            { he: "Planned/PP/DS Orders", code: "Orders" },
            { he: "שיבוץ על Resource (finite)", code: "Schedule" },
            { he: "Setup-optimization (רצף)", code: "Setup Matrix" },
            { he: "תכנית-זמנים (Gantt)", code: "CDPS0" },
          ],
          masterDataHe: [
            "Resource (single/multi/bucket) עם capacity profile · Setup Matrix · DS Strategy/Optimizer profile.",
            "Relationships (קודם-אחרי) בין פעולות-ההזמנה.",
          ],
          mistakesHe: [
            "תזמון infinite בלבד ➔ עומס-יתר על משאבים ותכנית לא-ריאלית.",
            "Setup Matrix חסר/שגוי ➔ רצף לא-יעיל והחלפות מיותרות.",
            "התעלמות מ-relationships ➔ פעולות מתוזמנות בסדר בלתי-אפשרי.",
          ],
          troubleshootHe: [
            "פעולה לא מתוזמנת על משאב ➔ קיבולת חסרה בחלון או מחוץ לאופק-התזמון.",
            "רצף לא ממזער החלפות ➔ Setup Matrix לא מתוחזק או Optimizer לא הופעל.",
            "התנגשויות-זמן על המשאב ➔ DS Strategy מוגדר infinite במקום finite.",
          ],
          bestPracticeHe: [
            "תחזק Setup Matrix מדויק — הוא הלב של אופטימיזציית-הרצף.",
            "הרץ DS Optimizer עם משקלים שתואמים את מטרת-העסק (מזעור-setup מול עמידה-בזמנים).",
            "השתמש ב-Planning Board לתיקונים ידניים נקודתיים אחרי האופטימיזציה האוטומטית.",
          ],
          interviewHe: [
            { qHe: "מהו Setup Matrix ולמה הוא חשוב?", aHe: "טבלה של זמני/עלויות-החלפה תלויי-מעבר בין מוצרים; היא מאפשרת לתזמון לסדר רצף שממזער החלפות יקרות ומגדיל ניצולת-משאב." },
            { qHe: "מה ההבדל בין תזמון finite ל-infinite?", aHe: "Finite מכבד את קיבולת-המשאב הסופית ולא מעמיס מעבר ליכולת; infinite מתעלם מקיבולת ועלול ליצור עומס-יתר ותכנית לא-ריאלית." },
          ],
          takeawaysHe: [
            "תזמון-מפורט = רצף + זמן + משאב, עם קיבולת סופית.",
            "Setup Matrix מניע את אופטימיזציית-הרצף.",
            "ה-DS Planning Board (CDPS0) הוא ה-Gantt לתזמון ידני ואוטומטי.",
          ],
          relatedHe: [{ labelHe: "PP/DS · תכנון-ייצור (1.1.1)", href: "/library/ppds/chapter-01/#sub-1.1.1" }],
        },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2",
      titleHe: "PP/DS עם SAP",
      titleEn: "PP/DS with SAP",
      execHe:
        "סעיף זה ממקם את PP/DS בתוך נוף-המוצרים של SAP: מהיכן הגיע (SAP Advanced Planning and Optimization — APO), מה השתנה במעבר אל embedded PP/DS ב-S/4HANA, כיצד הוא נפרס (deployment), וכיצד בנויה הארכיטקטורה שלו. ההבנה ההיסטורית-ארכיטקטונית קריטית: רוב ה-Customizing, ה-T-Codes (/SAPAPO/*) ואובייקטי-הליבה הגיעו ישירות מ-APO, וה-embedded model הוא הצורה האסטרטגית קדימה.",
      beginnerHe:
        "PP/DS לא נולד ב-S/4HANA. במקור הוא היה חלק ממוצר נפרד של SAP בשם APO, שרץ על שרת משלו ליד ה-ERP. ב-S/4HANA SAP 'הכניסו אותו פנימה' — אותה פונקציונליות, אבל עכשיו רצה בתוך אותה מערכת. סעיף זה מסביר את הסיפור הזה: מאיפה הוא בא, מה השתנה, ואיך הוא בנוי מבפנים.",
      consultantHe:
        "embedded PP/DS ב-S/4HANA הוא צאצא ישיר של SAP SCM/APO PP/DS. רוב ה-namespaces (/SAPAPO/*), הטרנזקציות, וה-Customizing tree נשמרו — מה שמקל מעבר על יודעי-APO. ההבדל המהותי: אין יותר Core Interface (CIF) בין שתי מערכות נפרדות עבור התרחיש ה-embedded; הנתונים יושבים באותו S/4HANA, וה-liveCache embedded. עדיין קיים מודל side-by-side (SAP APO/SCM נפרד) ללקוחות שלא מיגרו. הארכיטקטורה נשענת על HANA + liveCache, integration models למאסטר-דאטה, ו-PDS כמבנה-הייצור.",
      purposeHe:
        "להבין את ההקשר ההיסטורי והארכיטקטוני כדי לקבל החלטות-מימוש נכונות: לדעת אילו רכיבים להפעיל, כיצד מאסטר-דאטה זורם, ומדוע ה-Customizing נראה כפי שהוא נראה.",
      processExampleHe:
        "ארגון שעבר מ-APO side-by-side ל-S/4HANA embedded: במקום CIF המסנכרן חומרים ומשאבים בין SCM ל-ERP, המוצרים והמשאבים יושבים באותה מערכת. הגדרת Advanced Planning על חומר-קיים מפעילה אותו ל-PP/DS ישירות, בלי שכבת-אינטגרציה בין-מערכתית.",
      cbcHe:
        "ב-CBC ארגון בקבוקאי השוקל תכנון-מתקדם לקווי-המילוי צריך להחליט בין side-by-side APO לבין embedded PP/DS ב-S/4HANA. הבחירה משפיעה על האם נדרש CIF, על תחזוקת מערכת-נפרדת, ועל מודל-התפעול של צוות-התכנון.",
      navHe: [
        "SPRO ► Advanced Planning ► Basic Settings ► Activate Advanced Planning",
        "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS)",
      ],
      tables: ["/SAPAPO/MATKEY", "/SAPAPO/LOC", "/SAPAPO/RESHEAD"],
      tcodes: ["/SAPAPO/CP1", "CFM1", "CFM2"],
      fiori: ["F2101"],
      configHe: [
        "Activate Advanced Planning — תנאי-סף להפעלת embedded PP/DS ב-S/4HANA.",
        "Integration Models (CFM1/CFM2) — רלוונטיים בעיקר לתרחיש side-by-side עם SAP APO/SCM נפרד.",
        "ה-Customizing tree של PP/DS יושב תחת 'Advanced Planning' ושומר על מבנה-APO ההיסטורי.",
      ],
      flow: [
        { he: "SAP APO (side-by-side)", code: "Legacy", note: "מערכת נפרדת + CIF" },
        { he: "Embedded PP/DS", code: "S/4HANA", note: "אותה מערכת" },
        { he: "הפעלת Advanced Planning", code: "Activate" },
      ],
      masterDataHe: [
        "Product, Location, Resource, PDS — אובייקטי-הליבה המשותפים ל-APO ול-embedded PP/DS.",
        "ב-embedded הנתונים נטיביים ב-S/4HANA; ב-side-by-side הם מסונכרנים דרך CIF.",
      ],
      mistakesHe: [
        "הנחה ש-embedded PP/DS שונה מהותית מ-APO — רוב הפונקציונליות וה-Customizing זהים.",
        "ניסיון להגדיר CIF בתרחיש embedded טהור — מיותר כי הנתונים באותה מערכת.",
        "התעלמות מהצורך ב-Activate Advanced Planning — בלעדיה הרכיב כבוי.",
      ],
      troubleshootHe: [
        "טרנזקציות /SAPAPO/* לא זמינות ➔ Advanced Planning לא הופעל או רישוי חסר.",
        "מאסטר-דאטה לא זורם ב-side-by-side ➔ Integration Model לא פעיל/לא נוצר (CFM1/CFM2).",
        "בלבול בין מודלי-פריסה ➔ ודא איזה תרחיש מיושם (embedded מול side-by-side).",
      ],
      bestPracticeHe: [
        "ללקוחות S/4HANA חדשים — העדף embedded PP/DS על-פני side-by-side.",
        "נצל ידע-APO קיים: ה-Customizing וה-T-Codes זהים ברובם.",
        "החלט מודל-פריסה מוקדם — הוא משפיע על אינטגרציה, רישוי ותפעול.",
      ],
      interviewHe: [
        { qHe: "מה הקשר בין SAP APO ל-embedded PP/DS?", aHe: "embedded PP/DS הוא צאצא ישיר של APO PP/DS — אותה פונקציונליות, namespaces (/SAPAPO/*) ו-Customizing — אך רץ בתוך S/4HANA במקום במערכת SCM נפרדת." },
        { qHe: "מתי נדרש CIF?", aHe: "ב-side-by-side, כאשר SAP APO/SCM הוא מערכת נפרדת והמאסטר-דאטה צריך סנכרון מול ה-ERP; בתרחיש embedded טהור אין צורך ב-CIF לאותו S/4HANA." },
      ],
      takeawaysHe: [
        "PP/DS מקורו ב-SAP APO; ב-S/4HANA הוא embedded.",
        "namespaces (/SAPAPO/*), T-Codes ו-Customizing נשמרו מ-APO.",
        "embedded מבטל CIF לאותה מערכת; side-by-side עדיין דורש אותו.",
        "Activate Advanced Planning הוא תנאי-סף לכל מימוש.",
      ],
      relatedHe: [{ labelHe: "PP/DS · ארכיטקטורה (1.2.4)", href: "/library/ppds/chapter-01/#sub-1.2.4" }],
      children: [
        {
          id: "1.2.1",
          titleHe: "SAP Advanced Planning and Optimization",
          titleEn: "SAP Advanced Planning and Optimization",
          execHe:
            "SAP Advanced Planning and Optimization (APO) הוא חבילת-התכנון המתקדם ההיסטורית של SAP, חלק מ-SAP SCM. היא כללה רכיבים כמו Demand Planning (DP), Supply Network Planning (SNP), Production Planning/Detailed Scheduling (PP/DS) ו-Global Available-to-Promise (gATP). PP/DS שב-S/4HANA נגזר ישירות מרכיב ה-PP/DS של APO.",
          beginnerHe:
            "APO היה 'מרכז-התכנון המתקדם' של SAP — תוכנה נפרדת שעשתה תחזיות-ביקוש, תכנון-רשת-אספקה ותזמון-ייצור מפורט, מעבר למה שה-ERP הרגיל ידע. PP/DS היה אחד החלקים שלה — זה שעוסק בתזמון-הייצור. החלק הזה הוא שעבר אל S/4HANA.",
          consultantHe:
            "APO רץ על SAP SCM server עם liveCache נפרד, ותקשר עם R/3/ECC דרך Core Interface (CIF). רכיביו: DP (תחזית), SNP (תכנון בין-אתרי, deployment, TLB), PP/DS (תכנון+תזמון מפורט באתר), gATP (זמינות-להבטחה). ב-S/4HANA חלק מהפונקציות עברו ל-embedded (PP/DS), חלק ל-IBP (Integrated Business Planning, ענן — מחליף DP/SNP), ו-gATP הוחלף ב-aATP. כך APO מתפרק בין embedded PP/DS, IBP ו-aATP.",
          purposeHe:
            "לספק תכנון-מתקדם מודע-קיבולת ואופטימיזציה מעבר ל-MRP הקלאסי — בסיס היסטורי שהבנתו מסבירה את מבנה ומונחי ה-PP/DS של היום.",
          processExampleHe:
            "בארכיטקטורת-APO קלאסית: DP מייצר תחזית → SNP פורש לרשת-האספקה → CIF מעביר ל-ERP/חזרה → PP/DS מתזמן ייצור באתר → gATP מבטיח זמינות ללקוח. כל רכיב במערכת SCM הנפרדת.",
          cbcHe:
            "בארגון-בקבוקאי על APO: DP חוזה ביקוש למשקאות, SNP מחליט באיזה מפעל למלא ומאיפה לשנע, ו-PP/DS מתזמן את קווי-המילוי בכל מפעל — שרשרת-תכנון מלאה לפני עידן ה-embedded.",
          navHe: [
            "SAP SCM ► Advanced Planning and Optimization ► Production Planning and Detailed Scheduling",
            "SPRO ► Advanced Planning and Optimization (legacy SCM Customizing)",
          ],
          tables: ["/SAPAPO/MATKEY", "/SAPAPO/LOC", "/SAPAPO/SNPTAB"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/SDP94", "/SAPAPO/MAT1"],
          fiori: [],
          configHe: [
            "APO כלל רכיבים נפרדים: DP, SNP, PP/DS, gATP — כל אחד עם Customizing משלו תחת SCM.",
            "CIF (Core Interface) ניהל את אינטגרציית המאסטר-דאטה והתנועות מול ECC/R3.",
            "ב-S/4HANA: PP/DS → embedded; DP/SNP → IBP; gATP → aATP.",
          ],
          flow: [
            { he: "Demand Planning (DP)", code: "DP", note: "תחזית" },
            { he: "Supply Network Planning (SNP)", code: "SNP", note: "רשת-אספקה" },
            { he: "PP/DS", code: "PP/DS", note: "תזמון באתר" },
            { he: "Global ATP (gATP)", code: "gATP", note: "זמינות" },
          ],
          masterDataHe: [
            "Product, Location, Resource, PPM/PDS, Transportation Lane — אובייקטי-מאסטר של APO.",
            "מסונכרנים מ-ECC דרך CIF Integration Models.",
          ],
          mistakesHe: [
            "ערבוב בין כל רכיבי-APO ל-PP/DS בלבד — רק PP/DS עבר ל-embedded.",
            "הנחה ש-DP/SNP זמינים ב-embedded — הם עברו ל-IBP בענן.",
            "התעלמות מתלות-CIF בעולם ה-APO הקלאסי.",
          ],
          troubleshootHe: [
            "פונקציית-תכנון חסרה ב-S/4HANA ➔ ייתכן שהיא ב-IBP (DP/SNP) ולא ב-embedded PP/DS.",
            "מאסטר-דאטה לא בארכיטקטורת-APO ➔ Integration Model/CIF לא פעיל.",
            "בלבול-מונחים ➔ מפה אילו רכיבי-APO רלוונטיים לתרחיש.",
          ],
          bestPracticeHe: [
            "הבן אילו רכיבי-APO עברו לאן (embedded / IBP / aATP) לפני תכנון-מעבר.",
            "מנף את שכבת-המונחים המשותפת בין APO ל-embedded PP/DS.",
            "בתרחיש APO קלאסי — נהל CIF בקפדנות כעורק-החיים של המאסטר-דאטה.",
          ],
          interviewHe: [
            { qHe: "אילו רכיבים כלל SAP APO?", aHe: "Demand Planning (DP), Supply Network Planning (SNP), Production Planning/Detailed Scheduling (PP/DS) ו-Global ATP (gATP) — כחלק מ-SAP SCM." },
            { qHe: "לאן עברו רכיבי-APO ב-S/4HANA?", aHe: "PP/DS הפך ל-embedded PP/DS; DP ו-SNP עברו ל-IBP (ענן); gATP הוחלף ב-aATP." },
          ],
          takeawaysHe: [
            "APO הוא חבילת-התכנון-המתקדם ההיסטורית של SAP (חלק מ-SCM).",
            "רכיביו: DP, SNP, PP/DS, gATP.",
            "ב-S/4HANA: PP/DS→embedded, DP/SNP→IBP, gATP→aATP.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פישוטים ב-S/4HANA (1.2.2)", href: "/library/ppds/chapter-01/#sub-1.2.2" }],
        },
        {
          id: "1.2.2",
          titleHe: "פישוטים מרכזיים ב-PP/DS עבור SAP S/4HANA",
          titleEn: "Key Simplifications in PP/DS for SAP S/4HANA",
          execHe:
            "המעבר ל-embedded PP/DS ב-S/4HANA הביא פישוטים מהותיים: ביטול ה-CIF לתרחיש ה-embedded (נתונים באותה מערכת), liveCache משולב, שיתוף מאסטר-דאטה נטיבי, ופישוט מודל-האינטגרציה. התוצאה: פחות שכבות, פחות נקודות-כשל ועקביות-נתונים גבוהה יותר.",
          beginnerHe:
            "כש-PP/DS 'נכנס פנימה' ל-S/4HANA, הרבה דברים מסובכים נעלמו. בעבר היו שתי מערכות שצריך לסנכרן ביניהן (וזה נשבר הרבה); עכשיו הכל במקום אחד. פחות גשרים = פחות תקלות.",
          consultantHe:
            "פישוטים מרכזיים: (1) אין CIF בתרחיש embedded — אובייקטי-התכנון משתפים את אותו persistence; (2) liveCache embedded במערכת אחת; (3) integration עם DP/SNP עבר ל-IBP במקום SNP פנימי; (4) מודל-מאסטר-דאטה מאוחד (Product = Material, Resource ↔ Work Center). עם זאת חלק מה-Customizing וה-namespaces נשמרו לתאימות. חשוב להבין מה השתנה (אינטגרציה, persistence) מול מה שנשאר (heuristics, optimizer, planning board).",
          purposeHe:
            "להפחית מורכבות-תפעולית ועלות-תחזוקה, לשפר עקביות-נתונים, ולקרב את התכנון-המתקדם ל-real-time מול הביצוע.",
          processExampleHe:
            "בעבר: שינוי-חומר ב-ECC נשלח דרך CIF ל-APO, ולעיתים נכשל ויצר חוסר-עקביות. ב-embedded: אותו חומר קיים פעם-אחת ב-S/4HANA, וה-PP/DS עובד עליו ישירות — אין סנכרון, אין סחף-נתונים.",
          cbcHe:
            "ב-CBC הפישוט מבטל את התחזוקה של מערכת-APO נפרדת ושל ה-CIF; צוות-התכנון של קווי-המילוי עובד מול S/4HANA יחיד, ושינויי-מאסטר-דאטה (מתכון, קו) זמינים מיד לתכנון.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► Activate Advanced Planning",
            "SAP S/4HANA Simplification List ► Advanced Planning (PP/DS) item",
          ],
          tables: ["/SAPAPO/MATKEY", "MARC", "/SAPAPO/RESHEAD"],
          tcodes: ["/SAPAPO/CP1", "CFM1"],
          fiori: ["F2101"],
          configHe: [
            "ביטול CIF בתרחיש embedded — אובייקטים נטיביים ב-S/4HANA, ללא Integration Model בין-מערכתי.",
            "liveCache embedded — אין שרת-liveCache נפרד לתרחיש המוטמע.",
            "DP/SNP יוצאים מ-scope של embedded PP/DS — עוברים ל-IBP.",
            "מאסטר-דאטה מאוחד: Product↔Material, Resource↔Work Center באותה מערכת.",
          ],
          flow: [
            { he: "APO נפרד + CIF + liveCache נפרד", code: "Before" },
            { he: "Embedded — מערכת אחת", code: "After" },
            { he: "ללא CIF, liveCache משולב", code: "Simplify" },
          ],
          masterDataHe: [
            "Product = Material אחד ב-S/4HANA · Resource ↔ Work Center · PDS מתוך BOM+Routing.",
            "אין יותר עותקי-מאסטר נפרדים שצריך לסנכרן בתרחיש embedded.",
          ],
          mistakesHe: [
            "ניסיון לתחזק CIF בתרחיש embedded — מיותר ועלול לבלבל.",
            "ציפייה ל-SNP/DP בתוך embedded PP/DS — הם ב-IBP.",
            "התעלמות מ-Simplification List — מקור-האמת לשינויים בין ECC/APO ל-S/4HANA.",
          ],
          troubleshootHe: [
            "כפילות-מאסטר-דאטה לא-צפויה ➔ ודא שלא הוגדר CIF מיותר בתרחיש embedded.",
            "פונקציית-SNP חסרה ➔ עברה ל-IBP, אינה חלק מ-embedded PP/DS.",
            "חוסר-בהירות מה השתנה ➔ עיין ב-S/4HANA Simplification List לפריט PP/DS.",
          ],
          bestPracticeHe: [
            "עיין ב-Simplification List בתחילת כל פרויקט-מעבר.",
            "הסר תלויות-CIF מיותרות במעבר ל-embedded.",
            "תכנן אינטגרציה ל-IBP אם נדרש DP/SNP.",
          ],
          interviewHe: [
            { qHe: "מהו הפישוט המרכזי ב-embedded PP/DS?", aHe: "ביטול ה-CIF ושיתוף-נתונים נטיבי באותה מערכת S/4HANA, יחד עם liveCache משולב — פחות שכבות-אינטגרציה ועקביות-נתונים גבוהה יותר." },
            { qHe: "מה קרה ל-DP ו-SNP במעבר?", aHe: "הם יצאו מ-scope של embedded PP/DS ועברו ל-SAP IBP בענן; embedded PP/DS מתמקד בתכנון-ותזמון באתר." },
          ],
          takeawaysHe: [
            "embedded PP/DS מבטל CIF בתרחיש המוטמע ומשתף נתונים נטיבית.",
            "liveCache משולב במערכת אחת.",
            "DP/SNP עברו ל-IBP; ה-Simplification List הוא מקור-האמת.",
          ],
          relatedHe: [{ labelHe: "PP/DS · פריסה (1.2.3)", href: "/library/ppds/chapter-01/#sub-1.2.3" }],
        },
        {
          id: "1.2.3",
          titleHe: "פריסה (Deployment)",
          titleEn: "Deployment",
          execHe:
            "ל-PP/DS שני מודלי-פריסה עיקריים: embedded PP/DS — רץ בתוך S/4HANA כחלק מה-Advanced Planning; ו-side-by-side — SAP APO/SCM (או PP/DS על שרת נפרד) מול S/4HANA דרך CIF. הבחירה משפיעה על אינטגרציה, רישוי, תחזוקה ומפת-הדרכים העתידית.",
          beginnerHe:
            "יש שתי דרכים 'להתקין' PP/DS. הראשונה: בתוך S/4HANA עצמו (embedded) — הכל במקום אחד. השנייה: על מערכת נפרדת ליד (side-by-side) — כמו פעם עם APO, עם גשר (CIF) ביניהן. רוב המעברים החדשים בוחרים את האפשרות הראשונה.",
          consultantHe:
            "embedded PP/DS: מופעל דרך Activate Advanced Planning, חולק persistence ו-liveCache עם S/4HANA, ללא CIF לתרחיש המוטמע — המודל האסטרטגי המומלץ. side-by-side: SAP SCM/APO כשרת-תכנון נפרד, מחובר דרך CIF Integration Models — רלוונטי ללקוחות עם APO קיים שטרם מיגרו, או לסביבות-תכנון מבוזרות. שיקולי-בחירה: רישוי, מורכבות-נוף-מערכות, ביצועים, מפת-מוצר (IBP), והיקף-תכנון נדרש.",
          purposeHe:
            "לבחור את מודל-הפריסה התואם לנוף-המערכות, לרישוי ולאסטרטגיה — החלטה ארכיטקטונית מוקדמת המשפיעה על כל המימוש.",
          processExampleHe:
            "לקוח-APO ותיק במעבר ל-S/4HANA: שלב ראשון side-by-side (APO קיים + CIF) כדי לא לעצור פעילות, ובהמשך מיגרציה ל-embedded PP/DS — נטרול CIF והעברת התכנון פנימה.",
          cbcHe:
            "ב-CBC: ארגון רב-מפעלים עם APO ותיק עשוי להתחיל side-by-side לשמירת-רציפות, בעוד אתר-greenfield חדש ייפרס ישר כ-embedded PP/DS — בלי שרת-תכנון נפרד.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► Activate Advanced Planning",
            "SPRO ► Integration with SAP Components ► CIF (side-by-side)",
          ],
          tables: ["/SAPAPO/MATKEY", "/SAPAPO/LOC", "CIF_IMOD"],
          tcodes: ["/SAPAPO/CP1", "CFM1", "CFM2"],
          fiori: ["F2101"],
          configHe: [
            "embedded: Activate Advanced Planning + הגדרת מוצרים/משאבים נטיבית; אין CIF פנימי.",
            "side-by-side: הקמת SAP SCM/APO נפרד + CIF Integration Models (CFM1) לסנכרון.",
            "שיקולי-רישוי שונים בין שני המודלים — לאמת מול ה-product availability.",
          ],
          flow: [
            { he: "בחירת מודל-פריסה", code: "Decide" },
            { he: "Embedded (בתוך S/4HANA)", code: "Embedded", note: "ללא CIF" },
            { he: "Side-by-side (APO + CIF)", code: "Side", note: "מערכת נפרדת" },
          ],
          masterDataHe: [
            "embedded: Product/Resource נטיביים ב-S/4HANA.",
            "side-by-side: מאסטר-דאטה מסונכרן דרך CIF Integration Models מ-S/4HANA ל-SCM.",
          ],
          mistakesHe: [
            "בחירת side-by-side ללא צורך אמיתי — מוסיף מורכבות ועלות-תחזוקה.",
            "מעבר ל-embedded בלי לנטרל CIF ישן — חוסר-עקביות.",
            "התעלמות משיקולי-רישוי בבחירת-המודל.",
          ],
          troubleshootHe: [
            "טרנזקציות-תכנון לא פעילות ➔ Advanced Planning לא הופעל (embedded) או SCM לא מחובר (side-by-side).",
            "מאסטר-דאטה לא מסתנכרן ➔ CIF Integration Model חסר/לא-פעיל (side-by-side).",
            "כפילות/סחף-נתונים ➔ CIF פעיל בטעות בתרחיש embedded.",
          ],
          bestPracticeHe: [
            "ל-greenfield ולמרבית המעברים — בחר embedded PP/DS.",
            "השתמש ב-side-by-side רק כשיש נוף-מערכות או צורך-תכנון שמצדיק אותו.",
            "תכנן מסלול-מיגרציה מ-side-by-side ל-embedded מראש.",
          ],
          interviewHe: [
            { qHe: "מהם מודלי-הפריסה של PP/DS?", aHe: "embedded PP/DS בתוך S/4HANA (ללא CIF, liveCache משולב) ו-side-by-side עם SAP APO/SCM נפרד המחובר דרך CIF." },
            { qHe: "מתי תבחר side-by-side?", aHe: "כאשר קיים APO ותיק שטרם מוגר, כשנוף-המערכות או צורכי-התכנון המבוזרים מצדיקים מערכת-תכנון נפרדת, או כשלב-ביניים במיגרציה." },
          ],
          takeawaysHe: [
            "שני מודלים: embedded (בתוך S/4HANA) ו-side-by-side (APO+CIF).",
            "embedded הוא המודל האסטרטגי המומלץ למרבית המקרים.",
            "בחירת-המודל משפיעה על אינטגרציה, רישוי ותחזוקה.",
          ],
          relatedHe: [{ labelHe: "PP/DS · ארכיטקטורה (1.2.4)", href: "/library/ppds/chapter-01/#sub-1.2.4" }],
        },
        {
          id: "1.2.4",
          titleHe: "ארכיטקטורה",
          titleEn: "Architecture",
          execHe:
            "ארכיטקטורת embedded PP/DS נשענת על שלוש שכבות: HANA database (persistence), liveCache (רשת-התכנון in-memory: orders, pegging, capacity) ושכבת-האפליקציה (heuristics, optimizer, planning board). מאסטר-דאטה — Product, Location, Resource, PDS — משותף ל-S/4HANA, וה-PDS מאחד BOM+Routing לעולם-התכנון. זוהי הבנה הכרחית לכל מימוש ולפתרון-תקלות.",
          beginnerHe:
            "אפשר לדמיין שלוש קומות. בקומה התחתונה מאוחסנים הנתונים (HANA). באמצע יושב ה-liveCache — 'שולחן-העבודה' המהיר שבו PP/DS מסדר את כל ההזמנות, הקישורים והקיבולת בזיכרון. למעלה יושבים הכלים: האלגוריתמים, האופטימייזר ולוח-התכנון שהמתכנן רואה.",
          consultantHe:
            "liveCache הוא הרכיב הקריטי: מחזיק את order network, pegging arcs ו-resource capacity בזיכרון לחישובי-תזמון מהירים; אובדן-סנכרון בינו ל-DB דורש /SAPAPO/OM17 (consistency check). PDS (Production Data Structure) נוצר מ-BOM+Routing/Production Version ומשמש כמקור-אספקה לייצור (חלופה ל-PPM ההיסטורי). Resources מקבילים ל-Work Centers ונושאים capacity profile. שכבת-האפליקציה כוללת Heuristics, DS-Optimizer ו-Planning Board (/SAPAPO/CDPS0). ב-embedded הכל באותו stack מול S/4HANA — בלי CIF.",
          purposeHe:
            "להבין כיצד רכיבי-המערכת מתחברים — קריטי לתכנון-ביצועים, לפתרון בעיות-עקביות (liveCache↔DB), ולהחלטות-מימוש (PDS, resources, optimizer).",
          processExampleHe:
            "מתכנן פותח את ה-Planning Board: השכבה-האפליקטיבית קוראת את רשת-ההזמנות מ-liveCache (מהיר), מציגה Gantt, ומאפשרת תזמון-מחדש. שינוי נשמר ל-liveCache ומתמיד ל-HANA. אם נוצר חוסר-עקביות — מריצים /SAPAPO/OM17 ליישוב.",
          cbcHe:
            "ב-CBC ה-Resources הם קווי-המילוי, ה-PDS נגזר מ-BOM+Routing של כל משקה, וה-liveCache מחזיק את כל הזמנות-המילוי ל-Gantt של קווי-הייצור — מאפשר תזמון-מחדש מהיר בזמן שינוי-תחזית או תקלת-קו.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► liveCache / Consistency",
            "SAP Easy Access ► Advanced Planning ► Tools ► /SAPAPO/OM17 (Consistency Check)",
          ],
          tables: ["/SAPAPO/ORDMAP", "/SAPAPO/RESHEAD", "/SAPAPO/PEGKEY"],
          tcodes: ["/SAPAPO/OM17", "/SAPAPO/CURTO_SIMU", "/SAPAPO/CDPS0"],
          fiori: ["F2104", "F2336"],
          configHe: [
            "liveCache מנהל את order network, pegging ו-capacity בזיכרון — לב-הביצועים של PP/DS.",
            "PDS (Production Data Structure) נוצר מ-Production Version (BOM+Routing) כמקור-אספקה.",
            "Resources מקבילים ל-Work Centers ונושאים capacity profile לתזמון finite.",
            "/SAPAPO/OM17 — בדיקת-עקביות בין liveCache ל-DB; כלי-ליבה לפתרון-תקלות.",
          ],
          flow: [
            { he: "HANA DB (persistence)", code: "HANA" },
            { he: "liveCache (in-memory network)", code: "liveCache", note: "orders+pegging+capacity" },
            { he: "Application (Heuristics/Optimizer/Board)", code: "App" },
            { he: "מאסטר: Product/Resource/PDS", code: "Master" },
          ],
          masterDataHe: [
            "Product, Location, Resource, PDS — אובייקטי-הליבה הארכיטקטוניים.",
            "PDS = BOM + Routing/Production Version; Resource ↔ Work Center.",
          ],
          mistakesHe: [
            "התעלמות מעקביות liveCache↔DB ➔ נתוני-תכנון שגויים ללא הסבר נראה.",
            "שכחת יצירת/עדכון PDS אחרי שינוי BOM/Routing ➔ מקור-אספקה מיושן.",
            "הגדרת Resource ללא capacity profile תקין ➔ תזמון לא-ריאלי.",
          ],
          troubleshootHe: [
            "נתוני-תכנון לא-עקביים ➔ הרץ /SAPAPO/OM17 ליישוב liveCache↔DB.",
            "מקור-אספקה לא-מעודכן ➔ צור/עדכן PDS מ-Production Version.",
            "ביצועי-תזמון איטיים ➔ בדוק עומס liveCache והיקף אופק-התזמון.",
          ],
          bestPracticeHe: [
            "הרץ בדיקות-עקביות (/SAPAPO/OM17) באופן מתוזמן ולפני הרצות-תכנון גדולות.",
            "סנכרן PDS עם כל שינוי-מבנה (BOM/Routing/Production Version).",
            "תחזק capacity profiles מדויקים ל-Resources לתזמון-finite אמין.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-liveCache בארכיטקטורה?", aHe: "הוא מחזיק את רשת-התכנון (orders, pegging, capacity) בזיכרון לחישובי-תזמון מהירים; הוא לב-הביצועים, ויש לוודא את עקביותו מול ה-DB דרך /SAPAPO/OM17." },
            { qHe: "מהו PDS וכיצד נוצר?", aHe: "Production Data Structure — מקור-האספקה לייצור ב-PP/DS, נגזר מ-Production Version (BOM+Routing); הוא המקבילה המודרנית ל-PPM ההיסטורי." },
          ],
          takeawaysHe: [
            "שלוש שכבות: HANA (DB), liveCache (network in-memory), Application.",
            "liveCache מחזיק orders+pegging+capacity; עקביות נבדקת ב-/SAPAPO/OM17.",
            "PDS = BOM+Routing; Resource ↔ Work Center.",
            "ב-embedded הכל באותו stack מול S/4HANA, ללא CIF.",
          ],
          relatedHe: [{ labelHe: "PP/DS · תזמון-מפורט (1.1.2)", href: "/library/ppds/chapter-01/#sub-1.1.2" }],
        },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את PP/DS כשכבת-התכנון-המתקדם של SAP: שילוב של תכנון-ייצור (מה/כמה/מתי) ותזמון-מפורט (רצף/מכונה, קיבולת סופית). ראינו את מקורו ב-SAP APO, את המעבר ל-embedded PP/DS ב-S/4HANA על פישוטיו (ביטול CIF, liveCache משולב), את מודלי-הפריסה (embedded מול side-by-side), ואת הארכיטקטורה התלת-שכבתית (HANA, liveCache, application). אלה היסודות לכל מימוש PP/DS.",
      beginnerHe:
        "בקצרה: PP/DS עוזר למפעל קודם להחליט מה לייצר וכמה, ואז לסדר את העבודה על המכונות בצורה החכמה ביותר. הוא התחיל כחלק ממוצר נפרד (APO), ועכשיו רץ בתוך S/4HANA. הוא בנוי משלוש קומות — נתונים, זיכרון-עבודה מהיר (liveCache), וכלי-התכנון — ואפשר להתקין אותו בתוך המערכת או לידה.",
      consultantHe:
        "מבט-יועץ: embedded PP/DS משמר את namespaces (/SAPAPO/*), ה-Customizing tree ואובייקטי-הליבה של APO (Product, Location, Resource, PDS, Heuristics, Optimizer, Planning Board), אך מבטל את CIF בתרחיש המוטמע ומשלב את liveCache. הליבה התפעולית: Heuristics לתכנון, DS-Optimizer ו-Setup Matrix לתזמון, /SAPAPO/OM17 לעקביות, ו-PDS כמקור-אספקה. הבנת ההיסטוריה (APO→embedded), הפישוטים, הפריסה והארכיטקטורה היא הבסיס לעיצוב-נכון של פתרון.",
      purposeHe:
        "לגבש את התמונה הכוללת לפני צלילה לפרקי-המימוש: מאסטר-דאטה, heuristics, תזמון, אופטימיזציה ואינטגרציה — כך שכל נושא מתחבר למפת-העל של PP/DS.",
      processExampleHe:
        "מסע אופייני: ארגון מפעיל Advanced Planning, מגדיר Products ו-Resources, יוצר PDS מ-Production Versions, מריץ Heuristics לתכנון, מתזמן ב-Planning Board עם DS-Optimizer ו-Setup Matrix, ומנטר עקביות liveCache — מסוף-לסוף בתוך S/4HANA אחד.",
      cbcHe:
        "ב-CBC: הפרק הניח את היסוד להבנה כיצד PP/DS יתזמן את קווי-המילוי — ממיפוי הקווים כ-Resources, דרך PDS למשקאות, ועד אופטימיזציית-רצף שממזערת שטיפות והחלפות-טעם בקווי-הבקבוקאי.",
      navHe: [
        "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS)",
        "SAP Easy Access ► Advanced Planning ► Production Planning / Detailed Scheduling",
      ],
      tables: ["/SAPAPO/MATKEY", "/SAPAPO/RESHEAD", "/SAPAPO/ORDMAP"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/CDPS0", "/SAPAPO/OM17"],
      fiori: ["F2101", "F2104", "F2336"],
      configHe: [
        "Activate Advanced Planning הוא תנאי-הסף; ממנו נגזרים כל שאר ההגדרות.",
        "ה-Customizing מאורגן תחת 'Advanced Planning ► PP/DS' בשמירה על מבנה-APO.",
        "אובייקטי-הליבה למימוש: Product, Resource, PDS, Heuristics, DS-Optimizer, Setup Matrix.",
      ],
      flow: [
        { he: "תכנון (מה/כמה)", code: "Planning" },
        { he: "תזמון-מפורט (רצף/מכונה)", code: "DS" },
        { he: "embedded ב-S/4HANA", code: "Embedded" },
        { he: "ארכיטקטורה: HANA+liveCache+App", code: "Arch" },
      ],
      masterDataHe: [
        "Product, Location, Resource, PDS — אבני-היסוד החוזרות בכל הפרקים.",
        "Heuristics ו-Setup Matrix — נתוני-בקרה לתכנון ולתזמון.",
      ],
      mistakesHe: [
        "תפיסת PP/DS כ-MRP-משופר בלבד — הוא מוסיף תזמון מודע-קיבולת ואופטימיזציה.",
        "התעלמות מההקשר ההיסטורי-ארכיטקטוני — מקשה על Customizing ופתרון-תקלות.",
        "דילוג על Activate Advanced Planning — שורש-רבות מהתקלות הראשוניות.",
      ],
      troubleshootHe: [
        "הרכיב 'לא קיים' ➔ Advanced Planning לא הופעל או רישוי חסר.",
        "נתונים לא-עקביים ➔ /SAPAPO/OM17 (liveCache↔DB).",
        "בלבול מודל-פריסה/רכיבים ➔ חזור למפת embedded מול side-by-side ול-IBP.",
      ],
      bestPracticeHe: [
        "התחל כל מימוש בהבנת הארכיטקטורה ומודל-הפריסה.",
        "מנף ידע-APO קיים — הרציפות גבוהה.",
        "בנה מפת-מאסטר-דאטה (Product/Resource/PDS) לפני קונפיגורציה.",
      ],
      interviewHe: [
        { qHe: "במשפט אחד — מהו PP/DS?", aHe: "רכיב התכנון-המתקדם של SAP המשלב תכנון-ייצור (מה/כמה/מתי) עם תזמון-מפורט מודע-קיבולת (רצף/מכונה), embedded ב-S/4HANA ונגזר מ-APO." },
        { qHe: "מהם ארבעת אובייקטי-הליבה שיש להכיר?", aHe: "Product (מוצר-תכנון), Resource (משאב, מקביל ל-Work Center), PDS (מקור-אספקה מ-BOM+Routing), ו-Order/Pegging (רשת ההיצע-ביקוש) — כולם ב-liveCache." },
      ],
      takeawaysHe: [
        "PP/DS = תכנון + תזמון-מפורט מודע-קיבולת.",
        "מקורו ב-APO; ב-S/4HANA הוא embedded עם פישוטים (ללא CIF, liveCache משולב).",
        "שני מודלי-פריסה: embedded ו-side-by-side.",
        "ארכיטקטורה תלת-שכבתית: HANA, liveCache, application; אובייקטי-ליבה Product/Resource/PDS.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · מהו תכנון ותזמון (1.1)", href: "/library/ppds/chapter-01/#sub-1.1" },
        { labelHe: "PP/DS · ארכיטקטורה (1.2.4)", href: "/library/ppds/chapter-01/#sub-1.2.4" },
      ],
    },
  ],
};
