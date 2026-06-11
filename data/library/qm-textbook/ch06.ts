// ===== QM Digital Textbook — Chapter 6 (Integrating with SAP S/4HANA Sales) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly: 6.1, 6.2, 6.3 (6.3.1–6.3.4), 6.4.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH6: TextbookChapter = {
  n: 6,
  titleHe: "שילוב עם מכירות (SD)",
  titleEn: "Integrating with SAP S/4HANA Sales",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב בין ניהול-האיכות (QM) למכירות ולוגיסטיקה-יוצאת (SD) ב-SAP S/4HANA. הנושא המרכזי הוא בקרת-איכות במשלוח-ללקוח: כיצד מסמך-משלוח (Delivery) מעורר בדיקת-איכות, כיצד סוג-הבדיקה 10 (משלוח עם הזמנת-מכירה) ו-11 (החזרה) קובעים מתי וכיצד נוצרת מנת-בדיקה (Inspection Lot, טבלת QALS), כיצד החלטת-שימוש (UD) משחררת או חוסמת את הסחורה, וכיצד תעודת-איכות (Quality Certificate, QC01) מתלווה לסחורה. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הקשר העסקי לאורך הפרק: CBC — מפעל-המילוי של קוקה-קולה — שולח משקאות מוגמרים ללקוחות-קמעונאות (רשתות, מפיצים), וה-QM שומר שלא תצא סחורה פגומה או פגת-תוקף, ומפיק תעודת-איכות לכל משלוח.",
  subchapters: [
    // ============================================================ 6.1
    {
      id: "6.1", titleHe: "יסודות הקונפיגורציה", titleEn: "Configuration Basics",
      execHe:
        "השילוב QM↔SD נשען על שלושה אבני-יסוד קונפיגורטיביים: הפעלת ה-QM בתצוגת המכירות של אב-החומר (Inspection Setup), הקצאת סוגי-בדיקה רלוונטיים-למשלוח (10 למשלוח עם הזמנת-מכירה, 11 להחזרה), והגדרת בקרת-איכות במכירות (QM in Sales/Quality control) הקובעת אם המשלוח נחסם עד החלטת-שימוש. ללא הגדרות אלה לא תיווצר מנת-בדיקה במשלוח, ובקרת-האיכות בשרשרת היוצאת אינה קיימת.",
      beginnerHe:
        "לפני שאפשר 'לבדוק איכות במשלוח', צריך להגיד למערכת שלושה דברים: (1) שהחומר הזה דורש בדיקה במכירות — מסמנים זאת בתצוגת ה-QM של אב-החומר; (2) איזה סוג-בדיקה להפעיל — סוג 10 כשמשלוח יוצא מול הזמנת-מכירה, סוג 11 כשמתקבלת החזרה; (3) האם לחסום את הסחורה עד שמישהו יאשר אותה. שלוש ההחלטות האלה הן 'יסודות הקונפיגורציה' של הפרק.",
      consultantHe:
        "ההפעלה נעשית ב-Inspection Setup של תצוגת QM באב-החומר (טבלת QMAT לכל צירוף Material+Plant+Inspection Type). סוג-בדיקה 10 הוא Delivery inspection (מעורר ע\"י Outbound Delivery של הזמנת-מכירה), סוג 11 הוא Return delivery inspection. ה-QM control key בתצוגת-המכירות (QM in Procurement הוא מקביל ברכש; כאן מדובר ב-QM in Sales) קובע רמת-בקרה ואם נדרשת תעודת-איכות. ב-SPRO מקצים את סוגי-הבדיקה ל-Inspection Lot Origin: Origin 10 (Delivery to customer) ו-Origin 11 (Returns). שים לב: ב-S/4HANA ה-Inspection Lot Origin נשאר זהה ל-ECC, אך מומלץ לעבוד עם Quality Management Fiori apps (QA32 כ-classic עדיין נתמך).",
      purposeHe:
        "המטרה: להבטיח שכל יחידת-סחורה היוצאת ללקוח עברה את שער-האיכות המוגדר, ולמנוע משלוח של מוצר פגום, פג-תוקף או שאינו עומד במפרט-לקוח. בנוסף, הקונפיגורציה קובעת אם המערכת חוסמת אוטומטית את ה-Goods Issue עד שניתנת החלטת-שימוש חיובית.",
      processExampleHe:
        "ארגון מסמן באב-החומר Inspection Type 10 פעיל. מרגע זה, כל Outbound Delivery (VL01N) שמכיל את החומר מייצר אוטומטית מנת-בדיקה (QALS) מסוג 10. בודק-איכות רושם תוצאות ב-QE51N, נותן החלטת-שימוש (QA11), ורק אז ה-Goods Issue משוחרר. אם ההחלטה דחייה — המשלוח נחסם.",
      cbcHe:
        "ב-CBC: כל FERT (משקה מוגמר) מנוהל-אצווה מקבל בתצוגת-QM סוג-בדיקה 10 פעיל. כך כל משלוח לרשת-קמעונאות מייצר מנת-בדיקה היוצקת בדיקות-שחרור (תוקף-אצווה, שלמות-אריזה, סימון). סוג 11 מופעל לטיפול בהחזרות-לקוח (מוצר שחזר מהרשת).",
      navHe: [
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery ► Define Inspection Control (assign Inspection Type 10/11 to origin)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types",
        "Quality Management ► QM in Logistics ► QM in Sales and Distribution ► Define Control Keys for QM in Sales",
        "Logistics – General ► Material Master ► (QM view) Inspection Setup (MM01/MM02 → QM view)",
      ],
      tables: ["QMAT", "TQ07", "TQ07T", "QALS", "MARC"],
      tcodes: ["MM01", "MM02", "QA08", "OQB7", "SPRO"],
      fiori: ["F2230", "F3070"],
      configHe: [
        "Inspection Setup באב-החומר (תצוגת QM): הפעל Inspection Type 10 (Delivery) ו/או 11 (Return); קבע אינדיקטורים — Post to inspection stock, Automatic UD, 100%-inspection.",
        "Inspection Type ↔ Origin (TQ07): סוג 10 משויך ל-Origin 10 (Delivery to customer), סוג 11 ל-Origin 11 (Returns).",
        "QM in Sales — Control Key: קובע אם נדרשת תעודת-איכות במשלוח ורמת-הבקרה.",
        "Block before UD: אם מסומן — ה-Goods Issue נחסם עד החלטת-שימוש חיובית.",
      ],
      flow: [
        { he: "הפעלת QM באב-החומר", code: "MM02", note: "תצוגת QM / Inspection Setup" },
        { he: "הקצאת סוג-בדיקה 10/11", code: "QMAT", note: "Delivery / Return" },
        { he: "הגדרת בקרת-מכירות", code: "SPRO", note: "QM in Sales / Control Key" },
        { he: "מוכן ליצירת מנת-בדיקה", code: "QALS" },
      ],
      masterDataHe: [
        "QMAT = Inspection Setup פר Material+Plant+Inspection Type (10/11) — לב ההפעלה.",
        "MARC-QMPUR / QM control key בתצוגת-המכירות קובעים רמת-בקרה ותעודה.",
        "TQ07 = הגדרות Inspection Type; QALS = מנת-הבדיקה הנוצרת בפועל.",
      ],
      mistakesHe: [
        "סימון תצוגת-QM ללא הפעלת Inspection Type 10 ➔ אין מנת-בדיקה במשלוח.",
        "הפעלת Block-before-UD בלי תהליך-תוצאות מסודר ➔ משלוחים נתקעים חסומים.",
        "ערבוב בין סוג 10 (משלוח) ל-11 (החזרה) ➔ מנות-בדיקה מסוג שגוי.",
        "אי-הגדרת Control Key לתעודה ➔ לקוחות לא מקבלים Quality Certificate.",
      ],
      troubleshootHe: [
        "לא נוצרת מנת-בדיקה ב-VL01N ➔ בדוק Inspection Type 10 פעיל ב-QMAT למפעל הנכון.",
        "Goods Issue לא נחסם למרות UD שלילי ➔ אינדיקטור Block-before-UD לא מסומן.",
        "מנת-בדיקה מסוג שגוי ➔ Origin/Inspection Type לא משויך נכון (TQ07).",
        "אין תעודת-איכות במשלוח ➔ QM in Sales Control Key ללא דרישת-תעודה.",
      ],
      bestPracticeHe: [
        "הפעל סוג 10 רק לחומרים שבאמת דורשים שער-איכות יוצא — לא 'הכל'.",
        "תאם Block-before-UD מול יכולת-התגובה של מעבדת-ה-QA כדי לא לחסום מכירות.",
        "תקנן Control Keys מעטים ל-QM in Sales; תעד מי דורש תעודה.",
        "השתמש ב-QA08 (mass replacement) להחלת הגדרות-בדיקה אחידות על קבוצת-חומרים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Inspection Type 10 ל-11?", aHe: "10 = בדיקת-משלוח-ללקוח מול הזמנת-מכירה (Origin 10); 11 = בדיקת-החזרה (Returns, Origin 11). שניהם מופעלים ב-Inspection Setup של אב-החומר." },
        { qHe: "מה מפעיל את שילוב QM↔SD באב-החומר?", aHe: "הפעלת Inspection Type 10/11 ב-Inspection Setup של תצוגת ה-QM (טבלת QMAT), פר Material+Plant." },
        { qHe: "כיצד חוסמים Goods Issue עד לבדיקה?", aHe: "באמצעות אינדיקטור Block-before-UD; ה-GI נשאר חסום עד החלטת-שימוש חיובית." },
      ],
      takeawaysHe: [
        "שלושה יסודות: הפעלת QM באב-החומר, הקצאת סוג-בדיקה 10/11, בקרת QM in Sales.",
        "QMAT הוא הטבלה שבה חיים הגדרות-הבדיקה פר חומר+מפעל+סוג.",
        "סוג 10 = משלוח, סוג 11 = החזרה.",
        "Block-before-UD שולט אם המכירה ממתינה לאיכות.",
      ],
      relatedHe: [
        { labelHe: "QM · תהליכים עסקיים (6.3)", href: "/library/qm/chapter-06/#sub-6.3" },
        { labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" },
        { labelHe: "אובייקט · QMAT", href: "/library/qm/object/QMAT/" },
      ],
    },
    // ============================================================ 6.2
    {
      id: "6.2", titleHe: "נתוני אב", titleEn: "Master Data",
      execHe:
        "השילוב QM↔SD נשען על שלוש שכבות נתוני-אב: אב-החומר עם תצוגת-QM (Inspection Setup), אב-הלקוח (Business Partner / Customer) שעשוי לשאת דרישת תעודת-איכות ופרופיל-תעודה, ותכנית-הבדיקה (Inspection Plan, סוג Q) המגדירה מה בודקים במשלוח. נתוני-האב הם 'הדלק' של התהליך — בלעדיהם המסמכים הלוגיסטיים לא יודעים מה לבדוק או למי להפיק תעודה.",
      beginnerHe:
        "כדי שבדיקת-משלוח תעבוד צריך נתונים שמורים מראש: בחומר — האם וכיצד בודקים אותו; בלקוח — האם הוא דורש תעודת-איכות ובאיזה פורמט; ובתכנית-הבדיקה — רשימת המאפיינים שבודקים (תוקף, שלמות-אריזה, סימון). כל אלה מוגדרים פעם אחת ונשלפים אוטומטית בכל משלוח.",
      consultantHe:
        "אב-החומר: QMAT (Inspection Setup). אב-הלקוח: ב-S/4HANA הלקוח הוא Business Partner; הדרישה לתעודת-איכות יושבת ב-Customer/Material Info ובפרופיל-תעודה (Certificate Profile, QC01-family). תכנית-הבדיקה היא Inspection Plan סוג Q (PLKO/PLPO/PLMK עם MAPL לשיוך-לחומר) — אותו מבנה-נתונים כמו Routing אך לעולם-ה-QM. שיוך ה-Inspection Plan למנת-הבדיקה נעשה אוטומטית בעת יצירת ה-Lot לפי Material+Plant+Usage. שים לב: Master Inspection Characteristics (MIC, QS21) ו-Sampling Procedure (QDV1) הם נתוני-אב משותפים שמוזנים לתוך התכנית.",
      purposeHe:
        "לספק למנת-הבדיקה את שלושת המרכיבים: מה לבדוק (Inspection Plan + MIC), כמה דגימות (Sampling), ולמי להפיק תעודה (Customer + Certificate Profile). כך הבדיקה אחידה, חוזרת ומתועדת לכל משלוח.",
      processExampleHe:
        "בעת יצירת Outbound Delivery, המערכת מאתרת Inspection Plan סוג Q המשויך לחומר+מפעל, מעתיקה את מאפייניו (MIC) למנת-הבדיקה, קובעת גודל-מדגם לפי Sampling Procedure, ובסיום — אם הלקוח דורש — מפיקה תעודת-איכות לפי Certificate Profile.",
      cbcHe:
        "ב-CBC: כל FERT נושא Inspection Plan סוג Q עם MICs — תוקף-אצווה, רמת-מילוי, שלמות-פקק, קריאות-תווית/ברקוד. רשתות-קמעונאות גדולות מוגדרות כ-Customers הדורשים Quality Certificate; פרופיל-התעודה כולל את תוצאות-ה-MIC הרלוונטיות.",
      navHe: [
        "Logistics – General ► Material Master ► (QM view) Inspection Setup",
        "Quality Management ► Quality Planning ► Inspection Planning ► Inspection Plan (sets up task list type Q)",
        "Quality Management ► QM in Logistics ► QM in Sales and Distribution ► Quality Certificates ► Define Certificate Profiles",
        "Logistics – General ► Business Partner ► Customer (certificate requirement on customer/material info)",
      ],
      tables: ["QMAT", "PLKO", "PLPO", "PLMK", "MAPL", "QPMK", "KNA1"],
      tcodes: ["QP01", "QP02", "QS21", "QDV1", "QC01", "VD03"],
      fiori: ["F2230", "F3070", "F3071"],
      configHe: [
        "Inspection Plan (QP01) סוג Q: כותרת PLKO + פעולות PLPO + מאפיינים PLMK; שיוך-לחומר ב-MAPL.",
        "Master Inspection Characteristic (QS21): MIC לשימוש-חוזר בין תכניות (QPMK).",
        "Sampling Procedure (QDV1): קביעת גודל-מדגם ושיטת-הערכה.",
        "Certificate Profile: רשימת מאפיינים המודפסים בתעודת-האיכות; שיוך ללקוח/חומר.",
      ],
      flow: [
        { he: "Inspection Plan סוג Q", code: "QP01", note: "PLKO/PLPO/PLMK" },
        { he: "מאפייני-בדיקה (MIC)", code: "QS21", note: "QPMK" },
        { he: "שיטת-דגימה", code: "QDV1" },
        { he: "פרופיל-תעודה ללקוח", code: "QC01", note: "Certificate Profile" },
        { he: "שיוך-לחומר", code: "MAPL" },
      ],
      masterDataHe: [
        "QMAT = Inspection Setup · MAPL = שיוך Inspection Plan↔חומר/מפעל.",
        "PLMK = מאפייני-בדיקה בתכנית · QPMK = Master Inspection Characteristics.",
        "KNA1 / Business Partner = אב-הלקוח; דרישת-תעודה מוגדרת ברמת Customer/Material.",
      ],
      mistakesHe: [
        "Inspection Plan ללא MAPL לחומר ➔ מנת-הבדיקה נוצרת ריקה (ללא מאפיינים).",
        "MIC מקומי במקום Master MIC ➔ כפילות-תחזוקה בין תכניות.",
        "פרופיל-תעודה לא משויך ללקוח ➔ אין תעודת-איכות במשלוח.",
        "Sampling Procedure שגוי ➔ גודל-מדגם לא-ריאלי (יותר מדי / מעט מדי).",
      ],
      troubleshootHe: [
        "מנת-בדיקה ללא מאפיינים ➔ אין Inspection Plan סוג Q משויך (MAPL) או Usage לא-תואם.",
        "אין תעודת-איכות ➔ Certificate Profile חסר או לא משויך ללקוח/חומר.",
        "גודל-מדגם שגוי ➔ Sampling Procedure (QDV1) לא-מתאים.",
        "מאפיין לא מודפס בתעודה ➔ ה-MIC לא נכלל ב-Certificate Profile.",
      ],
      bestPracticeHe: [
        "בנה את הבדיקה מ-Master Inspection Characteristics (QS21) לשימוש-חוזר — לא MICs מקומיים.",
        "נהל Inspection Plans עם Change Number לשמירת-היסטוריה (רגולציית-מזון).",
        "הגדר Certificate Profile אחיד לקבוצות-לקוחות דומות.",
        "בדוק שכל FERT-משלוח נושא תכנית-בדיקה משויכת לפני go-live.",
      ],
      interviewHe: [
        { qHe: "איזה סוג task list משמש לבדיקת-איכות?", aHe: "Inspection Plan — task list type Q, באותו מבנה PLKO/PLPO/PLMK כמו Routing, עם שיוך-לחומר ב-MAPL." },
        { qHe: "מהו MIC ולמה הוא חשוב?", aHe: "Master Inspection Characteristic (QS21) — מאפיין-בדיקה לשימוש-חוזר (QPMK); מבטיח אחידות בין תכניות ומקל תחזוקה." },
        { qHe: "כיצד נקבע אם לקוח מקבל תעודת-איכות?", aHe: "דרך Certificate Profile המשויך ל-Customer/Material; הוא גם קובע אילו מאפיינים מודפסים." },
      ],
      takeawaysHe: [
        "שלוש שכבות: אב-חומר (QMAT), אב-לקוח (דרישת-תעודה), תכנית-בדיקה סוג Q.",
        "Inspection Plan מספק את ה'מה בודקים'; שיוך דרך MAPL.",
        "MIC ו-Sampling הם נתוני-אב משותפים בתוך התכנית.",
        "Certificate Profile מחבר תוצאות-בדיקה ללקוח.",
      ],
      relatedHe: [
        { labelHe: "QM · יסודות הקונפיגורציה (6.1)", href: "/library/qm/chapter-06/#sub-6.1" },
        { labelHe: "QM · תהליכים עסקיים (6.3)", href: "/library/qm/chapter-06/#sub-6.3" },
        { labelHe: "אובייקט · PLMK", href: "/library/qm/object/PLMK/" },
      ],
    },
    // ============================================================ 6.3
    {
      id: "6.3", titleHe: "תהליכים עסקיים", titleEn: "Business Processes",
      execHe:
        "תת-פרק זה מאחד את ארבעת תרחישי-המשלוח שבהם ה-QM משולב ב-SD: משלוח-ללקוח עם הזמנת-מכירה (6.3.1), משלוח-ללקוח ללא הזמנת-מכירה (6.3.2), הזמנת-החזרה (6.3.3), ומשלוח כללי (6.3.4). בכל אחד מהם הזרימה הלוגית זהה: מסמך-משלוח ➔ יצירת מנת-בדיקה (סוג 10 או 11) ➔ רישום-תוצאות ➔ החלטת-שימוש (UD) ➔ שחרור Goods Issue. ההבדל הוא נקודת-ההפעלה ומקור-המסמך.",
      beginnerHe:
        "יש ארבע דרכים שבהן סחורה יוצאת או חוזרת, ולכל אחת אותו 'מסלול-איכות': קודם נוצר מסמך-משלוח, ממנו צומחת מנת-בדיקה, בודקים, מחליטים (לקבל/לדחות), ורק אז משחררים את הסחורה. ההבדל בין התרחישים הוא רק מאיפה מתחילים — האם יש הזמנת-מכירה, האם זו החזרה, וכו'.",
      consultantHe:
        "כל ארבעת התרחישים יוצרים מנת-בדיקה (QALS) ממקור (Origin) מתאים: Origin 10 למשלוח-ללקוח, Origin 11 להחזרה. מסמך-המשלוח (LIKP כותרת / LIPS פריטים) הוא הטריגר; הזמנת-המכירה (VBAK/VBAP) קיימת ב-6.3.1 ו-6.3.3 אך לא ב-6.3.2/6.3.4. ה-UD (QA11) קובע את ה-stock posting ואת שחרור-ה-GI. הזרימה האוניברסלית: Delivery → Inspection Type 10/11 → Results (QE51N) → UD (QA11/QA32) → Goods Issue (VL02N).",
      purposeHe:
        "לספק שער-איכות עקבי לכל יציאת-סחורה וכל החזרה, ללא קשר למקור-המסמך, תוך שמירה על מסלול-זרימה אחיד שקל ללמד, לתפעל ולתחקר.",
      processExampleHe:
        "בכל ארבעת המקרים: נוצר Delivery, נוצרת אוטומטית מנת-בדיקה, בודק-איכות מזין תוצאות ב-QE51N ומנהל-איכות נותן UD ב-QA32. אם חיובי — GI ב-VL02N מוציא את הסחורה; אם שלילי — הסחורה נחסמת/מנותבת לטיפול.",
      cbcHe:
        "ב-CBC כל יציאת-משקה לרשת עוברת את המסלול האחיד; ההבדל הוא רק האם זו הזמנה רגילה (6.3.1), העברה-פנימית בין מחסנים ללא SO (6.3.2/6.3.4), או החזרה מהרשת (6.3.3, סוג 11).",
      navHe: [
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery",
        "Logistics Execution ► Shipping ► Deliveries ► Define Delivery Types",
        "Quality Management ► Quality Inspection ► Inspection Lot Completion ► Define Usage Decision",
      ],
      tables: ["LIKP", "LIPS", "VBAK", "VBAP", "QALS", "QAVE"],
      tcodes: ["VL01N", "VL02N", "QA32", "QA11", "QE51N"],
      fiori: ["F0608", "F2706", "F3070"],
      configHe: [
        "Inspection for Delivery: הקצאת Inspection Type 10/11 ל-Delivery Types רלוונטיים.",
        "Define Delivery Types: סוגי-משלוח (LF משלוח-יוצא, LR/LO החזרות) — קובעים אם נוצרת מנת-בדיקה.",
        "Usage Decision settings: קודי-UD, stock postings, חסימת/שחרור GI.",
      ],
      flow: [
        { he: "יצירת משלוח", code: "VL01N", note: "LIKP/LIPS" },
        { he: "מנת-בדיקה אוטומטית", code: "QALS", note: "Inspection Type 10/11" },
        { he: "רישום-תוצאות", code: "QE51N" },
        { he: "החלטת-שימוש (UD)", code: "QA32", note: "QAVE" },
        { he: "Goods Issue", code: "VL02N", note: "שחרור הסחורה" },
      ],
      masterDataHe: [
        "LIKP = כותרת-משלוח · LIPS = פריטי-משלוח · VBAK/VBAP = הזמנת-מכירה (ב-6.3.1/6.3.3).",
        "QALS = מנת-הבדיקה · QAVE = החלטת-השימוש (UD).",
      ],
      mistakesHe: [
        "ציפייה למנת-בדיקה ב-Delivery Type שלא הוקצה לו Inspection Type.",
        "מתן GI לפני UD למרות חסימה ➔ מעקף-בקרה.",
        "בלבול בין סוג 10 (יוצא) ל-11 (חוזר) בהגדרת ה-Delivery Type.",
      ],
      troubleshootHe: [
        "אין מנת-בדיקה למשלוח ➔ Delivery Type לא משויך ל-Inspection Type 10/11.",
        "GI לא משוחרר ➔ UD חסר או שלילי, או Block-before-UD פעיל.",
        "מנת-בדיקה מסוג שגוי ➔ Origin/Delivery Type לא הוגדר נכון.",
      ],
      bestPracticeHe: [
        "שמור מסלול-זרימה אחיד בכל ארבעת התרחישים — קל ללמד ולתחקר.",
        "השתמש ב-QA32 כ-worklist מרכזי לכל מנות-המשלוח.",
        "הגדר קודי-UD ברורים: שחרור / חסימה / החזרה.",
      ],
      interviewHe: [
        { qHe: "מהי הזרימה האחידה לכל תרחישי-המשלוח?", aHe: "Delivery ➔ מנת-בדיקה (Inspection Type 10/11) ➔ רישום-תוצאות (QE51N) ➔ UD (QA32/QA11) ➔ Goods Issue (VL02N)." },
        { qHe: "מה מבדיל בין ארבעת התרחישים?", aHe: "נקודת-ההפעלה ומקור-המסמך — קיום הזמנת-מכירה (VBAK), היות התרחיש החזרה (סוג 11), או משלוח-כללי ללא SO." },
      ],
      takeawaysHe: [
        "ארבעה תרחישים, מסלול-איכות אחד: Delivery→Inspection→UD→GI.",
        "QALS היא מנת-הבדיקה; QAVE היא ה-UD.",
        "Origin 10 ליציאה, Origin 11 לחזרה.",
        "ההבדל הוא רק במקור-המסמך.",
      ],
      relatedHe: [
        { labelHe: "QM · נתוני אב (6.2)", href: "/library/qm/chapter-06/#sub-6.2" },
        { labelHe: "QM · סיכום (6.4)", href: "/library/qm/chapter-06/#sub-6.4" },
        { labelHe: "אובייקט · LIKP", href: "/library/qm/object/LIKP/" },
      ],
      children: [
        // -------------------------------------------------- 6.3.1
        {
          id: "6.3.1", titleHe: "משלוח-ללקוח עם הזמנת-מכירה", titleEn: "Customer Delivery with Sales Order",
          execHe:
            "התרחיש הקלאסי: הזמנת-מכירה (VBAK/VBAP) ➔ Outbound Delivery (LIKP) ➔ מנת-בדיקה מסוג 10 ➔ UD ➔ Goods Issue. זהו ה-flow המלא של בקרת-איכות ביצוא-לקוח, שבו ההזמנה היא המקור הלוגיסטי וה-QM משמש שער לפני שחרור-הסחורה.",
          beginnerHe:
            "לקוח מזמין; פותחים משלוח מול ההזמנה; ברגע שנוצר המשלוח, המערכת פותחת מנת-בדיקה (סוג 10). בודקים את הסחורה, מאשרים (UD), ורק אז מוציאים אותה פיזית (Goods Issue). אם לא אישרנו — הסחורה לא יוצאת.",
          consultantHe:
            "ההזמנה (VBAK header, VBAP item) מובילה ל-Outbound Delivery (VL01N, טבלאות LIKP/LIPS). יצירת המשלוח מעוררת Inspection Lot מסוג 10 (Origin 10) ב-QALS. רישום-תוצאות ב-QE51N, UD ב-QA11/QA32 (QAVE). ה-Goods Issue ב-VL02N נחסם אם Block-before-UD פעיל עד UD חיובי. תעודת-איכות (QC01-family) מופקת בפלט-המשלוח אם הלקוח דורש.",
          purposeHe:
            "להבטיח שסחורה היוצאת מול הזמנה עברה בדיקת-שחרור, ולמנוע משלוח שאינו עומד במפרט-לקוח או פג-תוקף, תוך הצמדת תעודת-איכות.",
          processExampleHe:
            "VA01 הזמנת-מכירה ➔ VL01N משלוח-יוצא ➔ נוצרת מנת-בדיקה סוג 10 ➔ QE51N תוצאות ➔ QA32 UD חיובי ➔ VL02N Goods Issue (תנועת-מלאי 601) ➔ הדפסת Quality Certificate.",
          cbcHe:
            "ב-CBC רשת-קמעונאות מזמינה 5,000 ארגזי-משקה. נפתח משלוח, נוצרת מנת-בדיקה סוג 10 הבודקת תוקף-אצווה ושלמות-אריזה; UD חיובי משחרר את ה-GI ומפיק תעודת-איכות לרשת.",
          navHe: [
            "Sales and Distribution ► Sales ► Sales Documents ► (create order VA01)",
            "Logistics Execution ► Shipping ► Outbound Delivery ► Create (VL01N)",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery (Inspection Type 10)",
          ],
          tables: ["VBAK", "VBAP", "LIKP", "LIPS", "QALS", "QAVE"],
          tcodes: ["VA01", "VL01N", "VL02N", "QA32", "QA11", "QE51N", "QC01"],
          fiori: ["F0608", "F2706", "F3070"],
          configHe: [
            "Delivery Type LF משויך ל-Inspection Type 10.",
            "Block-before-UD: ה-GI חסום עד UD חיובי.",
            "Quality Certificate output type משויך ל-Delivery Type (אם הלקוח דורש תעודה).",
          ],
          flow: [
            { he: "הזמנת-מכירה", code: "VA01", note: "VBAK/VBAP" },
            { he: "משלוח-יוצא", code: "VL01N", note: "LIKP/LIPS" },
            { he: "מנת-בדיקה סוג 10", code: "QALS", note: "Origin 10" },
            { he: "רישום-תוצאות", code: "QE51N" },
            { he: "החלטת-שימוש (UD)", code: "QA32" },
            { he: "Goods Issue + תעודה", code: "VL02N", note: "601 + QC01" },
          ],
          masterDataHe: [
            "VBAK/VBAP = הזמנת-המכירה (המקור) · LIKP/LIPS = המשלוח.",
            "QALS = מנת-בדיקה סוג 10 · QAVE = ה-UD.",
          ],
          mistakesHe: [
            "מתן GI לפני UD ➔ סחורה שאינה מאושרת יוצאת ללקוח.",
            "Delivery Type ללא הקצאת Inspection Type 10 ➔ אין שער-איכות.",
            "אי-הפקת תעודה ➔ הלקוח דוחה את המשלוח בקבלה.",
          ],
          troubleshootHe: [
            "מנת-בדיקה לא נוצרה ➔ Inspection Type 10 לא פעיל ב-QMAT או Delivery Type לא משויך.",
            "GI חסום ➔ UD חסר/שלילי או Block-before-UD פעיל.",
            "תעודה לא הודפסה ➔ output type/Certificate Profile חסר.",
          ],
          bestPracticeHe: [
            "אכוף Block-before-UD למוצרים רגישי-תוקף.",
            "הצמד תעודת-איכות אוטומטית לפלט-המשלוח ללקוחות-מפתח.",
            "נהל מנות-המשלוח ב-QA32 כ-worklist יומי.",
          ],
          interviewHe: [
            { qHe: "מהו ה-flow המלא של משלוח-עם-SO?", aHe: "Sales Order (VA01) ➔ Delivery (VL01N) ➔ Inspection Lot סוג 10 ➔ Results (QE51N) ➔ UD (QA32) ➔ Goods Issue (VL02N)." },
            { qHe: "איזה Inspection Type נוצר ומאיזה Origin?", aHe: "סוג 10 מ-Origin 10 (Delivery to customer), מעורר ע\"י ה-Outbound Delivery." },
          ],
          takeawaysHe: [
            "SO ➔ Delivery ➔ Inspection 10 ➔ UD ➔ GI.",
            "ה-Delivery (LIKP) הוא הטריגר, לא ה-SO ישירות.",
            "Block-before-UD מונע GI לא-מאושר.",
          ],
          relatedHe: [
            { labelHe: "QM · משלוח ללא הזמנת-מכירה (6.3.2)", href: "/library/qm/chapter-06/#sub-6.3.2" },
            { labelHe: "אובייקט · VBAK", href: "/library/qm/object/VBAK/" },
          ],
        },
        // -------------------------------------------------- 6.3.2
        {
          id: "6.3.2", titleHe: "משלוח-ללקוח ללא הזמנת-מכירה", titleEn: "Customer Delivery without Sales Order",
          execHe:
            "משלוח שנוצר ישירות ללא הזמנת-מכירה קודמת (Delivery without reference) — למשל העברת-מלאי, משלוח-יזום או scenario לוגיסטי שאינו order-driven. גם כאן נוצרת מנת-בדיקה מסוג 10 (Origin 10) מעצם יצירת ה-Delivery, וה-flow זהה: Delivery ➔ Inspection ➔ UD ➔ GI, אך ללא VBAK.",
          beginnerHe:
            "לפעמים שולחים סחורה בלי שקדמה לה הזמנה רשמית — יוצרים משלוח 'מאפס'. ה-QM עדיין נכנס לפעולה: עצם יצירת המשלוח פותחת מנת-בדיקה, ושאר המסלול זהה. ההבדל היחיד — אין הזמנת-מכירה מאחורי המשלוח.",
          consultantHe:
            "המשלוח נוצר ב-VL01NO (Delivery without order reference) או דרך תהליך לוגיסטי ייעודי; LIKP/LIPS נוצרים אך VBAK ריק. מנת-הבדיקה (QALS) נוצרת מ-Origin 10 בדיוק כמו ב-6.3.1, כי הטריגר הוא ה-Delivery ולא ה-SO. ה-UD וה-GI זהים. נקודה ליועץ: כיוון שאין SO, בקרת-זמינות ותמחיר נשענים על הגדרות ה-Delivery עצמו.",
          purposeHe:
            "להחיל את אותו שער-איכות גם על תרחישי-משלוח שאינם order-driven, כך שאף יציאת-סחורה לא חומקת מבקרה רק משום שלא קדמה לה הזמנה.",
          processExampleHe:
            "VL01NO משלוח-ללא-הזמנה ➔ נוצרת מנת-בדיקה סוג 10 ➔ QE51N תוצאות ➔ QA32 UD ➔ VL02N Goods Issue. הכל זהה ל-6.3.1 פרט להיעדר VBAK.",
          cbcHe:
            "ב-CBC: העברת משקאות בין מרכז-הפצה לאזורי בלי הזמנת-לקוח רשמית — נוצר משלוח-ללא-הזמנה, מנת-בדיקה סוג 10 בודקת תוקף-אצווה לפני יציאת המלאי בין-האתרים.",
          navHe: [
            "Logistics Execution ► Shipping ► Outbound Delivery ► Create ► Without Order Reference (VL01NO)",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery (Inspection Type 10)",
          ],
          tables: ["LIKP", "LIPS", "QALS", "QAVE"],
          tcodes: ["VL01NO", "VL02N", "QA32", "QA11", "QE51N"],
          fiori: ["F0608", "F2706"],
          configHe: [
            "Delivery Type ללא-הפניה (order-independent) משויך ל-Inspection Type 10.",
            "הגדרות-Delivery קובעות בקרת-זמינות (אין SO).",
            "Block-before-UD זהה ל-6.3.1.",
          ],
          flow: [
            { he: "משלוח-ללא-הזמנה", code: "VL01NO", note: "LIKP/LIPS, ללא VBAK" },
            { he: "מנת-בדיקה סוג 10", code: "QALS", note: "Origin 10" },
            { he: "רישום-תוצאות", code: "QE51N" },
            { he: "החלטת-שימוש (UD)", code: "QA32" },
            { he: "Goods Issue", code: "VL02N", note: "601" },
          ],
          masterDataHe: [
            "LIKP/LIPS = המשלוח (ללא VBAK).",
            "QALS = מנת-בדיקה סוג 10 · QAVE = ה-UD.",
          ],
          mistakesHe: [
            "הנחה שגויה ש'בלי SO אין בדיקה' ➔ מעקף-בקרה.",
            "Delivery Type ללא-הפניה לא משויך ל-Inspection Type 10.",
          ],
          troubleshootHe: [
            "אין מנת-בדיקה ➔ Delivery Type ללא-הפניה לא הוקצה ל-Inspection Type 10.",
            "GI לא משוחרר ➔ UD חסר או Block-before-UD פעיל.",
          ],
          bestPracticeHe: [
            "ודא שגם Delivery Types ללא-הפניה מקבלים Inspection Type 10.",
            "תעד את תרחישי-המשלוח-ללא-הזמנה כדי שלא יחמקו מבקרה.",
          ],
          interviewHe: [
            { qHe: "מה הטריגר ליצירת מנת-בדיקה כשאין הזמנת-מכירה?", aHe: "ה-Outbound Delivery עצמו (LIKP) — לא ה-SO. לכן גם משלוח-ללא-הפניה מייצר Inspection Type 10." },
            { qHe: "מה ההבדל היחיד מ-6.3.1?", aHe: "היעדר VBAK; כל שאר המסלול (Inspection→UD→GI) זהה." },
          ],
          takeawaysHe: [
            "הטריגר הוא ה-Delivery, לא ה-SO.",
            "מנת-בדיקה סוג 10 נוצרת גם ללא VBAK.",
            "המסלול זהה ל-6.3.1.",
          ],
          relatedHe: [
            { labelHe: "QM · משלוח עם הזמנת-מכירה (6.3.1)", href: "/library/qm/chapter-06/#sub-6.3.1" },
            { labelHe: "אובייקט · LIPS", href: "/library/qm/object/LIPS/" },
          ],
        },
        // -------------------------------------------------- 6.3.3
        {
          id: "6.3.3", titleHe: "הזמנת-החזרה", titleEn: "Return Order",
          execHe:
            "החזרת-לקוח: הזמנת-החזרה (Returns order, VBAK עם סוג RE) ➔ Returns Delivery (LR) ➔ מנת-בדיקה מסוג 11 (Origin 11) ➔ UD ➔ קליטה-למלאי-בדיקה/דחייה. כאן ה-QM מחליט אם הסחורה שחזרה כשירה להחזרה-למלאי, לטיפול, או לגריטה.",
          beginnerHe:
            "כשלקוח מחזיר סחורה, פותחים הזמנת-החזרה ואז משלוח-החזרה. המערכת פותחת מנת-בדיקה מסוג 11 (סוג מיוחד להחזרות). בודקים את המוצר שחזר ומחליטים: להחזיר למלאי-תקין, לשים במלאי-חסום, או לגרוט. ה-UD קובע לאן הסחורה הולכת.",
          consultantHe:
            "הזמנת-ההחזרה (VBAK, doc type RE) מייצרת Returns Delivery (Delivery Type LR). יצירת ה-Returns Delivery מעוררת Inspection Lot מסוג 11 (Origin 11) ב-QALS. ה-UD (QA11/QA32) קובע את ה-stock posting: to unrestricted, to blocked, או scrap — דרך Inspection Stock postings. ה-Goods Receipt של ההחזרה (תנועת-מלאי 651/653 לפי קונפיגורציה) תלוי ב-UD. נקודה ליועץ: סוג 11 הוא ההבחנה הקריטית מ-10.",
          purposeHe:
            "לבדוק את כשירות הסחורה שחזרה ולנתב אותה נכון (מלאי-תקין/חסום/גריטה), כדי שמוצר פגום-שחזר לא ייכנס שוב למלאי-המכירה.",
          processExampleHe:
            "VA01 הזמנת-החזרה (RE) ➔ VL01N Returns Delivery (LR) ➔ מנת-בדיקה סוג 11 ➔ QE51N תוצאות ➔ QA32 UD: 'תקין' מנתב ל-unrestricted (653), 'פגום' מנתב ל-blocked/scrap.",
          cbcHe:
            "ב-CBC רשת מחזירה משקאות פגי-תוקף או פגומי-אריזה. נוצרת הזמנת-החזרה ומשלוח-החזרה; מנת-בדיקה סוג 11 בודקת תוקף ושלמות — מוצר פג-תוקף מנותב ל-scrap, מוצר תקין חוזר למלאי.",
          navHe: [
            "Sales and Distribution ► Sales ► Sales Documents ► Returns (order type RE)",
            "Logistics Execution ► Shipping ► Returns Delivery (Delivery Type LR)",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Returns (Inspection Type 11)",
          ],
          tables: ["VBAK", "VBAP", "LIKP", "LIPS", "QALS", "QAVE"],
          tcodes: ["VA01", "VL01N", "QA32", "QA11", "QE51N", "MIGO"],
          fiori: ["F0608", "F2706", "F3070"],
          configHe: [
            "Returns order type RE + Returns Delivery Type LR.",
            "Delivery Type LR משויך ל-Inspection Type 11 (Origin 11).",
            "UD stock postings: to unrestricted / to blocked / scrap — קובעים את ניתוב-ההחזרה.",
          ],
          flow: [
            { he: "הזמנת-החזרה", code: "VA01", note: "doc type RE / VBAK" },
            { he: "משלוח-החזרה", code: "VL01N", note: "Delivery Type LR" },
            { he: "מנת-בדיקה סוג 11", code: "QALS", note: "Origin 11" },
            { he: "רישום-תוצאות", code: "QE51N" },
            { he: "UD + ניתוב-מלאי", code: "QA32", note: "unrestricted / blocked / scrap" },
          ],
          masterDataHe: [
            "VBAK (doc type RE) = הזמנת-ההחזרה · LIKP/LIPS (LR) = משלוח-ההחזרה.",
            "QALS = מנת-בדיקה סוג 11 · QAVE = ה-UD הקובע ניתוב.",
          ],
          mistakesHe: [
            "שימוש בסוג 10 במקום 11 להחזרה ➔ מנת-בדיקה מסוג שגוי וניתוב-מלאי שגוי.",
            "החזרת מוצר-פגום ל-unrestricted ➔ סחורה פגומה חוזרת למכירה.",
            "Delivery Type LR ללא Inspection Type 11 ➔ אין בדיקת-החזרה.",
          ],
          troubleshootHe: [
            "מנת-בדיקה מסוג 10 בהחזרה ➔ Delivery Type LR משויך לסוג 10 בטעות.",
            "הסחורה לא נכנסה למלאי הנכון ➔ UD stock posting לא-מוגדר נכון.",
            "אין מנת-בדיקה להחזרה ➔ Inspection Type 11 לא פעיל ב-QMAT.",
          ],
          bestPracticeHe: [
            "הפרד בבירור Delivery Type LR ל-Inspection Type 11.",
            "הגדר קודי-UD ייעודיים להחזרה: 'תקין-למלאי' / 'פגום-לגריטה'.",
            "נתב מוצר-פג-תוקף ל-scrap אוטומטית דרך ה-UD.",
          ],
          interviewHe: [
            { qHe: "איזה Inspection Type משמש להחזרה ומאיזה Origin?", aHe: "סוג 11 מ-Origin 11 (Returns) — בניגוד לסוג 10 (Origin 10) של משלוח-יוצא." },
            { qHe: "כיצד ה-UD משפיע על סחורה שחזרה?", aHe: "ה-UD קובע את ה-stock posting — to unrestricted / blocked / scrap — כלומר לאן מנותבת הסחורה שחזרה." },
          ],
          takeawaysHe: [
            "החזרה = order RE ➔ Delivery LR ➔ Inspection 11 ➔ UD ➔ ניתוב-מלאי.",
            "סוג 11 (Origin 11) הוא ההבחנה הקריטית מ-10.",
            "ה-UD קובע unrestricted/blocked/scrap.",
          ],
          relatedHe: [
            { labelHe: "QM · משלוח עם הזמנת-מכירה (6.3.1)", href: "/library/qm/chapter-06/#sub-6.3.1" },
            { labelHe: "אובייקט · QAVE", href: "/library/qm/object/QAVE/" },
          ],
        },
        // -------------------------------------------------- 6.3.4
        {
          id: "6.3.4", titleHe: "משלוח כללי", titleEn: "General Delivery",
          execHe:
            "משלוח-כללי הוא תרחיש-המשלוח הגנרי שאינו נכנס לקטגוריות הקודמות — למשל משלוחי-דגימה, תרומות, או תנועות-לוגיסטיקה מיוחדות. גם כאן, אם ה-Delivery Type הוקצה ל-Inspection Type 10, נוצרת מנת-בדיקה וה-flow האחיד חל: Delivery ➔ Inspection ➔ UD ➔ GI. זהו ה'מקרה-הכללי' שמכליל את המנגנון.",
          beginnerHe:
            "מעבר לשלושת התרחישים הספציפיים, יש 'משלוח כללי' — כל משלוח אחר שיוצא. כל עוד הגדרנו שהסוג הזה דורש בדיקה, המסלול זהה: נוצר משלוח, מנת-בדיקה, בודקים, מאשרים, מוציאים. זהו הכלל-העל שכל היתר הם מקרים פרטיים שלו.",
          consultantHe:
            "כל Delivery (LIKP/LIPS) שסוגו הוקצה ל-Inspection Type 10 (Origin 10) מייצר Inspection Lot, ללא תלות בקיום SO או בהיותו החזרה. זהו המנגנון הגנרי שעליו נשענים 6.3.1–6.3.3 כמקרים פרטיים. ה-UD וה-GI זהים. ליועץ: זו נקודה-טובה להסביר ש-Inspection-for-Delivery הוא מנגנון-יחיד מבוסס-Origin, וההבדלים הם ב-Delivery Type ובמקור.",
          purposeHe:
            "לספק כיסוי-בקרה גורף לכל סוגי-המשלוח, כך שאף תרחיש-יציאה אינו 'יוצא-דופן' שחומק מ-QM — המנגנון אחיד וניתן להרחבה.",
          processExampleHe:
            "Delivery Type גנרי (משלוח-דגימה) הוקצה ל-Inspection Type 10 ➔ VL01N ➔ מנת-בדיקה ➔ QE51N ➔ QA32 UD ➔ VL02N GI. אותו מסלול בדיוק.",
          cbcHe:
            "ב-CBC משלוח-דגימות-משקה לתערוכה או לבדיקת-לקוח-חדש: Delivery גנרי הוקצה ל-Inspection Type 10, מנת-בדיקה מוודאת שגם הדגימות תקינות לפני שהן עוזבות את המפעל.",
          navHe: [
            "Logistics Execution ► Shipping ► Deliveries ► Define Delivery Types (assign generic types)",
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery (Inspection Type 10)",
          ],
          tables: ["LIKP", "LIPS", "QALS", "QAVE"],
          tcodes: ["VL01N", "VL02N", "QA32", "QA11", "QE51N"],
          fiori: ["F0608", "F2706"],
          configHe: [
            "Define Delivery Types: הקצה Delivery Types גנריים ל-Inspection Type 10.",
            "אותו Block-before-UD ו-UD postings כמו בשאר התרחישים.",
            "ניתן להרחיב לסוגי-משלוח נוספים ע\"י הקצאה ל-Origin 10.",
          ],
          flow: [
            { he: "משלוח-כללי", code: "VL01N", note: "Delivery Type גנרי" },
            { he: "מנת-בדיקה סוג 10", code: "QALS", note: "Origin 10" },
            { he: "רישום-תוצאות", code: "QE51N" },
            { he: "החלטת-שימוש (UD)", code: "QA32" },
            { he: "Goods Issue", code: "VL02N" },
          ],
          masterDataHe: [
            "LIKP/LIPS = המשלוח-הכללי.",
            "QALS = מנת-בדיקה סוג 10 · QAVE = ה-UD.",
          ],
          mistakesHe: [
            "הנחה ש'משלוח-כללי לא צריך בדיקה' ➔ סחורה לא-נבדקת יוצאת.",
            "אי-הקצאת Delivery Types גנריים ל-Inspection Type 10.",
          ],
          troubleshootHe: [
            "אין מנת-בדיקה למשלוח-כללי ➔ ה-Delivery Type לא הוקצה ל-Inspection Type 10.",
            "GI לא משוחרר ➔ UD חסר או Block-before-UD פעיל.",
          ],
          bestPracticeHe: [
            "החל את אותו מנגנון Inspection-for-Delivery על כל סוגי-המשלוח הרלוונטיים.",
            "הבן ש-6.3.1–6.3.3 הם מקרים פרטיים של אותו מנגנון גנרי.",
          ],
          interviewHe: [
            { qHe: "מהו היחס בין 'משלוח-כללי' לשאר התרחישים?", aHe: "הוא המנגנון הגנרי (Inspection-for-Delivery, Origin 10); 6.3.1–6.3.3 הם מקרים פרטיים הנבדלים במקור-המסמך ובסוג ה-Delivery." },
            { qHe: "מה תנאי-הסף ליצירת מנת-בדיקה במשלוח-כללי?", aHe: "ה-Delivery Type חייב להיות מוקצה ל-Inspection Type 10 (Origin 10) ו-Inspection Type 10 פעיל ב-QMAT לחומר." },
          ],
          takeawaysHe: [
            "משלוח-כללי = המנגנון הגנרי מבוסס-Origin 10.",
            "כל הקודמים הם מקרים פרטיים שלו.",
            "תנאי: Delivery Type מוקצה ל-Inspection Type 10.",
          ],
          relatedHe: [
            { labelHe: "QM · תהליכים עסקיים (6.3)", href: "/library/qm/chapter-06/#sub-6.3" },
            { labelHe: "אובייקט · QALS", href: "/library/qm/object/QALS/" },
          ],
        },
      ],
    },
    // ============================================================ 6.4
    {
      id: "6.4", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד ה-QM משתלב במכירות ובלוגיסטיקה-יוצאת של S/4HANA דרך מנגנון-יחיד: Inspection-for-Delivery. שלושת יסודות-הקונפיגורציה (הפעלת QM באב-החומר, סוגי-בדיקה 10/11, בקרת QM in Sales), נתוני-האב (אב-חומר, אב-לקוח, תכנית-בדיקה סוג Q), וארבעת התרחישים (משלוח-עם-SO, משלוח-ללא-SO, החזרה, משלוח-כללי) — כולם נשענים על אותה זרימה: Delivery ➔ מנת-בדיקה (10/11) ➔ UD ➔ Goods Issue, עם תעודת-איכות אופציונלית.",
      beginnerHe:
        "מה למדנו: לפני שסחורה יוצאת ללקוח (או חוזרת ממנו), ה-QM פותח מנת-בדיקה, מישהו בודק, מחליט, ורק אז הסחורה משוחררת. הגדרנו זאת באב-החומר, באב-הלקוח ובתכנית-הבדיקה, וראינו ארבעה תרחישים — אך כולם אותו מסלול. סוג 10 ליציאה, סוג 11 להחזרה.",
      consultantHe:
        "המסר ליועץ: Inspection-for-Delivery הוא מנגנון אחיד מבוסס-Origin (10 ל-Delivery to customer, 11 ל-Returns). הטריגר תמיד ה-Delivery (LIKP/LIPS), לא ה-SO. ה-UD (QAVE) שולט ב-stock postings ובשחרור-GI; Block-before-UD מונע יציאת-סחורה לא-מאושרת. תעודת-האיכות (QC01-family + Certificate Profile) מתלווה לפלט-המשלוח. נתוני-האב הקריטיים: QMAT (Inspection Setup), Inspection Plan סוג Q (PLKO/PLPO/PLMK + MAPL), ו-Certificate Profile.",
      purposeHe:
        "לקשור את כל חלקי-הפרק לתמונה אחת: בקרת-איכות יוצאת אמינה, אחידה וניתנת-לתחקור, שמונעת משלוח פגום ומספקת ראיית-איכות (תעודה) ללקוח.",
      processExampleHe:
        "תמונת-העל: VA01/VL01N ➔ QALS (10/11) ➔ QE51N ➔ QA32 UD ➔ VL02N GI ➔ QC01 תעודה. אותו מסלול בכל ארבעת התרחישים, עם הבדלים רק במקור-המסמך ובסוג-הבדיקה.",
      cbcHe:
        "ב-CBC: כל משקה שיוצא לרשת-קמעונאות עובר את שער-האיכות (סוג 10) עם תעודת-איכות; כל החזרה (סוג 11) נבדקת ומנותבת. כך CBC מבטיח שלא יוצא ולא חוזר למלאי מוצר פג-תוקף או פגום.",
      navHe: [
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Delivery",
        "Quality Management ► QM in Logistics ► QM in Sales and Distribution",
      ],
      tables: ["QALS", "QAVE", "LIKP", "LIPS", "VBAK", "QMAT"],
      tcodes: ["VL01N", "VL02N", "QA32", "QA11", "QE51N", "QC01"],
      fiori: ["F2706", "F3070", "F0608"],
      configHe: [
        "ודא: Inspection Type 10/11 פעיל ב-QMAT; Delivery Types משויכים ל-Origins הנכונים.",
        "ודא: Inspection Plan סוג Q משויך (MAPL) ו-Certificate Profile מוגדר ללקוחות-דורשים.",
        "ודא: Block-before-UD מתואם ליכולת-התגובה של ה-QA.",
      ],
      flow: [
        { he: "משלוח", code: "VL01N", note: "טריגר" },
        { he: "מנת-בדיקה 10/11", code: "QALS" },
        { he: "תוצאות + UD", code: "QA32", note: "QAVE" },
        { he: "Goods Issue", code: "VL02N" },
        { he: "תעודת-איכות", code: "QC01" },
      ],
      masterDataHe: [
        "QMAT = הפעלת-בדיקה · Inspection Plan סוג Q + MAPL = מה בודקים.",
        "Certificate Profile = למי ואיך מפיקים תעודה · QALS/QAVE = ביצוע-הבדיקה וה-UD.",
      ],
      mistakesHe: [
        "שכחת הפעלת Inspection Type באב-החומר — שורש רוב התקלות בפרק.",
        "בלבול 10↔11 בין יציאה להחזרה.",
        "אי-הצמדת תעודת-איכות ללקוחות-דורשים.",
      ],
      troubleshootHe: [
        "אין מנת-בדיקה ➔ QMAT/Inspection Type או הקצאת Delivery Type.",
        "GI נתקע ➔ UD חסר/שלילי או Block-before-UD.",
        "אין תעודה ➔ Certificate Profile/output type חסר.",
      ],
      bestPracticeHe: [
        "זכור: מנגנון אחד (Inspection-for-Delivery), ארבעה מקרים פרטיים.",
        "אכוף שער-איכות (Block-before-UD) למוצרים רגישי-תוקף.",
        "תקנן תכניות-בדיקה ו-Certificate Profiles לקבוצות-מוצר/לקוח.",
        "השתמש ב-QA32 כ-worklist מרכזי לכל מנות-המשלוח וההחזרה.",
      ],
      interviewHe: [
        { qHe: "מהו המכנה-המשותף לכל תרחישי הפרק?", aHe: "מנגנון Inspection-for-Delivery: ה-Delivery מעורר מנת-בדיקה (Origin 10/11), ואחריה UD ו-Goods Issue — זרימה אחידה." },
        { qHe: "מה ההבדל בין סוג 10 ל-11 במשפט אחד?", aHe: "10 = משלוח-ללקוח (Origin 10); 11 = החזרה (Origin 11)." },
        { qHe: "אילו שלושה נתוני-אב מניעים את התהליך?", aHe: "QMAT (Inspection Setup), Inspection Plan סוג Q (משויך ב-MAPL), ו-Certificate Profile ללקוח." },
      ],
      takeawaysHe: [
        "מנגנון אחד: Delivery ➔ Inspection (10/11) ➔ UD ➔ Goods Issue.",
        "הטריגר תמיד ה-Delivery (LIKP), לא ה-SO.",
        "סוג 10 ליציאה, סוג 11 להחזרה; QAVE שולט בניתוב.",
        "נתוני-אב: QMAT, Inspection Plan סוג Q, Certificate Profile.",
      ],
      relatedHe: [
        { labelHe: "QM · יסודות הקונפיגורציה (6.1)", href: "/library/qm/chapter-06/#sub-6.1" },
        { labelHe: "QM · תהליכים עסקיים (6.3)", href: "/library/qm/chapter-06/#sub-6.3" },
        { labelHe: "אובייקט · QAVE", href: "/library/qm/object/QAVE/" },
      ],
    },
  ],
};
