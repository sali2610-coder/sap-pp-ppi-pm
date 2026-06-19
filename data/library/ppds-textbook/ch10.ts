// ===== PP/DS Digital Textbook — Chapter 10 (administering PP/DS) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved: 10.5 (3 children), 10.6 (2 children).
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
// CBC context = Coca-Cola bottling PP/DS administration (CIF queues, liveCache).
import type { TextbookChapter } from "./types";

export const CH10: TextbookChapter = {
  n: 10,
  titleHe: "ניהול PP/DS ב-SAP S/4HANA",
  titleEn: "Administering PP/DS with SAP S/4HANA",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול התפעולי (Administration) של PP/DS המוטמע (Embedded PP/DS) ב-SAP S/4HANA. בניגוד לפרקי-התכנון, כאן הדגש הוא על תחזוקת-המנגנון עצמו: ניטור תורי ה-Core Interface (CIF) ב-/SAPAPO/CQ, טיפול בשגיאות-העברה ב-Postprocessing /SAPAPO/CPP1, השוואה והשלמה בין S/4 ל-liveCache באמצעות CCR (/SAPAPO/CCR), ניהול יומן-היישום, וטיפול ב-liveCache עצמו דרך /SAPAPO/OM13. כל תת-פרק ותת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: להפעיל ולתחזק PP/DS באופן יציב ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 10.1
    {
      id: "10.1", titleHe: "ניטור תור ה-Core Interface", titleEn: "Core Interface Queue Monitoring",
      execHe:
        "ה-Core Interface (CIF) הוא צינור-ההעברה שמסנכרן נתוני-אב ונתוני-תנועה בין רכיב ה-ERP של S/4HANA לבין מנוע-התכנון PP/DS וה-liveCache. ניטור התורים (qRFC queues) הוא משימת-הניהול היומיומית הקריטית ביותר: תור תקוע (SYSFAIL) פירושו שהתכנון עובד על תמונת-נתונים ישנה. ניטור יזום ב-/SAPAPO/CQ, SMQ1 (Outbound) ו-SMQ2 (Inbound) מבטיח שזרימת-הנתונים רציפה.",
      beginnerHe:
        "דמיין מסוע שמעביר עדכונים מהמחסן (ERP) לחדר-התכנון (PP/DS). כל עדכון נארז ל'חבילה' (qRFC queue entry) ונע על המסוע. אם חבילה אחת נתקעת, כל החבילות שמאחוריה נעצרות — בדיוק כמו פקק. ניטור-התור הוא לבדוק את המסוע פעם ביום ולוודא ששום חבילה לא תקועה. תור 'יוצא' (Outbound) יושב בצד-השולח; תור 'נכנס' (Inbound) בצד-המקבל.",
      consultantHe:
        "ה-CIF משתמש ב-qRFC עם שמות-תור (Queue Names) שמתחילים לרוב ב-CF*. ב-Embedded PP/DS גם ה-ERP וגם ה-APO יושבים על אותה מערכת S/4, ולכן חלק מהתעבורה היא internal RFC, אך עדיין מנוהלת כתורים. /SAPAPO/CQ (CIF Queue Manager) הוא נקודת-המבט המאוחדת; SMQ1/SMQ2 הם כלי-ה-qRFC הגנריים. סטטוס בעייתי נפוץ: SYSFAIL (שגיאת-עיבוד עוצרת את התור), CPICERR (תקלת-תקשורת/חיבור), RETRY, ו-NOSEND/READY. שים לב להגדרת ה-Inbound Queue Scheduler (QIN Scheduler) וה-Outbound (QOUT Scheduler) — אם ה-Scheduler לא רשום (registered) או deactivated, התורים נערמים ולא מעובדים אף שאין שגיאה.",
      purposeHe:
        "להבטיח ש-PP/DS מתכנן על נתונים עדכניים. כל החלטת-תכנון (Pegging, Scheduling, Heuristics) טובה רק כמו הנתונים שמאחוריה. ניטור-תור מונע את התרחיש הגרוע: תכנון שמתעלם מהזמנת-מכירה חדשה או משינוי-מלאי כי העדכון תקוע בתור.",
      processExampleHe:
        "מתכנן מדווח שהזמנת-מכירה חדשה לא מופיעה ב-Product View (/SAPAPO/RRP3). הצוות פותח /SAPAPO/CQ, מסנן לפי המודל הפעיל, ומזהה רשומת-תור בסטטוס SYSFAIL עם שם-תור CFSLS*. לחיצה על השגיאה חושפת חריגה ב-target system; אחרי תיקון שורש-הבעיה מבצעים Activate/Execute LUW והתור משוחרר — ההזמנה זורמת ל-PP/DS.",
      cbcHe:
        "ב-CBC כל הזמנת-מילוי-משקה, שינוי-מלאי-תרכיז ועדכון-קיבולת-קו-מילוי זורמים דרך ה-CIF אל PP/DS. בדיקת-בוקר קבועה של /SAPAPO/CQ לפני ריצת-ה-Heuristics היומית מוודאת שלוח-המילוי מתוכנן על תמונת-מלאי ודרישות מעודכנת; תור CFPLO* תקוע פירושו תכנון על מתכון/קיבולת ישנים.",
      navHe: [
        "Easy Access ► /SAPAPO/CQ — CIF Queue Manager",
        "Easy Access ► SMQ1 — qRFC Monitor (Outbound Queue)",
        "Easy Access ► SMQ2 — qRFC Monitor (Inbound Queue)",
        "SPRO ► Integration with Other SAP Components ► Advanced Planning and Optimization ► Basic Settings for the Data Transfer ► Change Transfer ► Change Transfer for Transaction Data ► Activate Online Transfer Using BTE",
      ],
      tables: ["TRFCQOUT", "TRFCQIN", "ARFCSSTATE", "ARFCRSTATE", "CIF_IMODEL"],
      tcodes: ["/SAPAPO/CQ", "SMQ1", "SMQ2", "SMQR", "SMQS", "/SAPAPO/C2"],
      fiori: ["F1599", "F2272"],
      configHe: [
        "QIN Scheduler (SMQR): רישום והפעלת מתזמן התור-הנכנס; ללא רישום התורים נערמים בסטטוס READY ולא מעובדים.",
        "QOUT Scheduler (SMQS): הגדרת destination והפעלת מתזמן התור-היוצא; קובע מקביליות (Max. Conn.).",
        "Integration Model (/SAPAPO/C2 / CFM1-CFM3): מגדיר אילו אובייקטים מועברים; תור מתייחס למודל פעיל בלבד.",
        "CIF error handling: הגדרת אופן-הטיפול בשגיאות (Postprocessing) דרך /SAPAPO/CP — נדרש ל-10.2.",
      ],
      flow: [
        { he: "שינוי ב-S/4 (הזמנה/מלאי)", code: "ERP", note: "BTE/Change pointer" },
        { he: "רשומת qRFC נוצרת", code: "Outbound", note: "שם-תור CF*" },
        { he: "ניטור התור", code: "/SAPAPO/CQ", note: "סטטוס: READY/SYSFAIL" },
        { he: "עיבוד ב-target", code: "Inbound", note: "SMQ2" },
        { he: "עדכון liveCache/PP-DS", code: "RRP3", note: "תמונה מעודכנת" },
      ],
      masterDataHe: [
        "Integration Model הוא 'נתון-אב' של ה-CIF: רק אובייקטים שבמודל-פעיל מסונכרנים.",
        "שמות-תור (CFMAT* חומר, CFSLS* הזמנת-מכירה, CFPLO* הזמנה-מתוכננת, CFSTK* מלאי) מסייעים לאבחן מהר את סוג-האובייקט התקוע.",
      ],
      mistakesHe: [
        "ניטור רק SMQ1 ושכחת SMQ2 — שגיאות-Inbound נשארות נסתרות.",
        "QIN/QOUT Scheduler לא-רשום או deactivated — התורים מלאים אך 'ירוקים' לכאורה.",
        "מחיקת רשומת-תור תקועה במקום ניתוח — אובדן עדכון ויצירת חוסר-עקביות מול liveCache.",
        "התעלמות מ-CPICERR כ'זמני' — לרוב מצביע על תקלת-RFC destination קבועה.",
      ],
      troubleshootHe: [
        "תור בסטטוס SYSFAIL ➔ לחץ להצגת הודעת-השגיאה; תקן את שורש-הבעיה ואז Activate Queue (אל תמחק).",
        "התור נערם ב-READY ולא מעובד ➔ בדוק QIN Scheduler ב-SMQR (Registered/Active) ו-QOUT ב-SMQS.",
        "CPICERR חוזר ➔ בדוק RFC destination (SM59) ואת זמינות מערכת-היעד.",
        "אובייקט לא מסונכרן כלל ➔ ודא שהוא נכלל ב-Integration Model פעיל (/SAPAPO/C3).",
      ],
      bestPracticeHe: [
        "הרץ בדיקת-/SAPAPO/CQ קבועה (job יומי או alert) לפני ריצות-תכנון אצווה.",
        "אל תמחק רשומות-תור — תקן ושחרר, או העבר ל-Postprocessing מבוקר (10.2).",
        "הקצה שמות-תור הגיוניים (CFM2 queue settings) להפרדת-עומס וניתוח מהיר.",
        "הגדר alert/CCMS ל-SYSFAIL כדי לזהות פקקים לפני שהמתכננים מרגישים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SMQ1 ל-SMQ2?", aHe: "SMQ1 = qRFC Outbound (צד-השולח, התור היוצא); SMQ2 = qRFC Inbound (צד-המקבל, התור הנכנס). שניהם חייבים להיבדק; שגיאה יכולה להיתקע בכל אחד מהם." },
        { qHe: "מה המשמעות של סטטוס SYSFAIL בתור CIF?", aHe: "שגיאת-עיבוד עצרה את התור; כל הרשומות שמאחוריה ממתינות. יש לנתח את ההודעה, לתקן את השורש, ואז להפעיל מחדש את התור — לא למחוק." },
        { qHe: "מדוע תור עשוי להיערם בסטטוס READY בלי שגיאה?", aHe: "ה-QIN/QOUT Scheduler (SMQR/SMQS) אינו רשום או deactivated, ולכן אף אחד לא 'דוחף' את הרשומות לעיבוד." },
      ],
      takeawaysHe: [
        "CIF = צינור-הסנכרון בין S/4 ל-PP/DS/liveCache; ניטורו הוא משימת-ניהול יומית.",
        "/SAPAPO/CQ הוא המבט המאוחד; SMQ1/SMQ2 הם כלי ה-qRFC הגנריים.",
        "SYSFAIL=שגיאת-עיבוד, CPICERR=תקלת-תקשורת, READY נערם=בעיית-Scheduler.",
        "תקן ושחרר תורים — לעולם אל תמחק רשומה תקועה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · עיבוד-המשך CIF (10.2)", href: "/library/ppds/chapter-10/#sub-10.2" },
        { labelHe: "PP/DS · השוואה והשלמה CCR (10.3)", href: "/library/ppds/chapter-10/#sub-10.3" },
        { labelHe: "אובייקט · TRFCQOUT", href: "/library/ppds/object/TRFCQOUT/" },
      ],
    },
    // ============================================================ 10.2
    {
      id: "10.2", titleHe: "עיבוד-המשך של ה-Core Interface", titleEn: "Core Interface Postprocessing",
      execHe:
        "Postprocessing הוא מנגנון-הגיבוי של ה-CIF לטיפול ברשומות שנכשלו בהעברה. במקום שתור יישאר תקוע ויחסום את כל מה שמאחוריו, ניתן להגדיר שרשומה-שגויה תוסט ל'תיבת-טיפול' (Postprocessing records). שם, אדמין מנתח, מתקן ומבצע מחדש (reprocess) באופן יזום ומבוקר דרך /SAPAPO/CPP1. זה מפריד בין 'התור זורם' ל'יש שגיאות שצריך לטפל בהן'.",
      beginnerHe:
        "אם חבילה במסוע פגומה, יש שתי גישות: לעצור את כל המסוע (תור-תקוע), או להוציא את החבילה-הפגומה לשולחן-תיקונים בצד ולתת לשאר להמשיך לזרום. Postprocessing הוא שולחן-התיקונים: השגיאות נאספות שם, ואדמין מטפל בהן בנחת בלי לעצור את כל הזרימה.",
      consultantHe:
        "הטיפול נקבע ב-CIF error handling settings: 'Treat Error Without Stopping the Queue' מפנה רשומות-שגויות ל-Postprocessing במקום להשאיר את התור ב-SYSFAIL. /SAPAPO/CPP1 (וגם /SAPAPO/CPP — Postprocessing) מציג את הרשומות, מאפשר לנתח (Display log), לתקן את שורש-הבעיה ב-S/4, ולבצע Reprocess. שים לב: Postprocessing פותר את חסימת-התור אך לא את חוסר-העקביות — עד שהרשומה תעובד-מחדש בהצלחה, ה-liveCache לא מעודכן. ניהול-תקין דורש מעקב-יומי על תיבת ה-Postprocessing, אחרת רשומות מצטברות שם בשקט.",
      purposeHe:
        "לשמור על זרימת-CIF רציפה תוך בידוד שגיאות לטיפול-יזום. במערכת-ייצור עמוסה, תור-תקוע אחד יכול לעכב מאות עדכונים תקינים; Postprocessing מונע 'נזק-משני' של רשומה אחת על כל השאר.",
      processExampleHe:
        "עדכון-חומר נכשל כי שדה-חובה חסר ב-target. במקום SYSFAIL, הרשומה מוסטת ל-Postprocessing. האדמין פותח /SAPAPO/CPP1, רואה את ההודעה, מתקן את נתון-האב ב-S/4, ולוחץ Reprocess — הרשומה עוברת והתור מעולם לא נחסם.",
      cbcHe:
        "ב-CBC עונת-שיא: אלפי עדכוני-מילוי זורמים דרך CIF. הגדרת Postprocessing מבטיחה שעדכון-מתכון-בעייתי בודד לא יעצור את כל לוח-המילוי. צוות-PP/DS סורק את /SAPAPO/CPP1 בכל בוקר ומטפל ברשומות שנפלו במהלך-הלילה לפני הריצה היומית.",
      navHe: [
        "Easy Access ► /SAPAPO/CPP1 — Postprocessing of CIF Records",
        "Easy Access ► /SAPAPO/CPP — Postprocessing (overview)",
        "SPRO ► Integration with Other SAP Components ► APO ► Basic Settings for Data Transfer ► Settings for Transfer ► Configure Error Handling for the Inbound Queue",
      ],
      tables: ["CIF_POST", "CIF_APPLOG", "/SAPAPO/POSTPROC"],
      tcodes: ["/SAPAPO/CPP1", "/SAPAPO/CPP", "/SAPAPO/C4", "SMQ2"],
      fiori: ["F2272"],
      configHe: [
        "Error Handling Mode: בחר בין עצירת-תור (default) לבין 'Process Without Stopping Queue' שמפנה ל-Postprocessing.",
        "Postprocessing activation: הפעל את שמירת רשומות-השגויות כך שיופיעו ב-/SAPAPO/CPP1.",
        "Application Log linkage: כל רשומת-Postprocessing מקושרת ליומן (10.4) להצגת פרטי-השגיאה.",
        "Authorization: הרשאת ביצוע Reprocess מוגבלת לצוות-PP/DS, לא למתכנן-עסקי.",
      ],
      flow: [
        { he: "רשומת-CIF נכשלת", code: "Inbound", note: "שגיאת-עיבוד" },
        { he: "הסטה ל-Postprocessing", code: "Error handling", note: "התור ממשיך לזרום" },
        { he: "ניתוח ב-/SAPAPO/CPP1", code: "Display log", note: "מקושר ליומן" },
        { he: "תיקון שורש-הבעיה", code: "S/4", note: "נתון-אב/הגדרה" },
        { he: "ביצוע-מחדש", code: "Reprocess", note: "עדכון liveCache" },
      ],
      masterDataHe: [
        "כל רשומת-Postprocessing נושאת את סוג-האובייקט, מפתחו והודעת-השגיאה — מסייעת לזהות אם הבעיה בנתון-אב או בהגדרה.",
        "רשומה שלא עובדה-מחדש = פער-עקביות פוטנציאלי מול liveCache שיתגלה ב-CCR (10.3).",
      ],
      mistakesHe: [
        "הפעלת Postprocessing בלי מעקב-יומי — רשומות מצטברות בשקט וה-liveCache סוטה.",
        "ביצוע Reprocess בלי לתקן את שורש-הבעיה — הרשומה נכשלת שוב מיד.",
        "הנחה ש'התור ירוק = הכול תקין' בעוד עשרות רשומות יושבות ב-Postprocessing.",
        "מתן הרשאת-Reprocess רחבה מדי — תיקונים לא-מבוקרים.",
      ],
      troubleshootHe: [
        "רשומות מצטברות ב-/SAPAPO/CPP1 ➔ קבע job/בדיקה יומית ותהליך-טיפול ברור.",
        "Reprocess נכשל שוב ➔ פתח את היומן (10.4), תקן את נתון-האב/הגדרה ב-S/4, ואז בצע מחדש.",
        "אובייקט מעודכן ב-S/4 אך לא ב-PP/DS ➔ ייתכן שהוא יושב כרשומת-Postprocessing שלא עובדה.",
        "פערים שמתגלים ב-CCR ➔ בדוק אם מקורם ברשומות-Postprocessing פתוחות.",
      ],
      bestPracticeHe: [
        "הפעל Postprocessing למערכות-ייצור עמוסות כדי למנוע חסימות-תור.",
        "קבע בדיקה-יומית מתועדת של /SAPAPO/CPP1 כחלק מ-runbook התפעול.",
        "תמיד תקן את השורש לפני Reprocess — אחרת זו לולאה.",
        "שלב Postprocessing עם CCR: רשומות פתוחות מסבירות רבים מהפערים שה-CCR מוצא.",
      ],
      interviewHe: [
        { qHe: "מה היתרון של Postprocessing על-פני תור-תקוע?", aHe: "הוא מבודד את הרשומה-השגויה לטיפול-יזום ומאפשר לשאר התור להמשיך לזרום, ובכך מונע 'נזק-משני' של שגיאה אחת על מאות עדכונים תקינים." },
        { qHe: "האם Postprocessing פותר את חוסר-העקביות מול liveCache?", aHe: "לא מיידית. הוא משחרר את התור, אך עד שהרשומה תעובד-מחדש בהצלחה ה-liveCache נשאר לא-מעודכן — לכן נדרש מעקב יומי." },
        { qHe: "באיזו טרנזקציה מטפלים ברשומות-Postprocessing?", aHe: "/SAPAPO/CPP1 (וגם /SAPAPO/CPP) — שם מנתחים, מתקנים את השורש ומבצעים Reprocess." },
      ],
      takeawaysHe: [
        "Postprocessing = שולחן-תיקונים לרשומות-CIF שנכשלו, בלי לעצור את התור.",
        "/SAPAPO/CPP1 מציג, מנתח ומבצע-מחדש את הרשומות.",
        "חובה מעקב-יומי — אחרת רשומות מצטברות וה-liveCache סוטה בשקט.",
        "תמיד תקן את השורש לפני Reprocess.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ניטור תור CIF (10.1)", href: "/library/ppds/chapter-10/#sub-10.1" },
        { labelHe: "PP/DS · ניהול יומן-יישום (10.4)", href: "/library/ppds/chapter-10/#sub-10.4" },
        { labelHe: "אובייקט · CIF_POST", href: "/library/ppds/object/CIF_POST/" },
      ],
    },
    // ============================================================ 10.3
    {
      id: "10.3", titleHe: "השוואה והשלמה של ה-Core Interface", titleEn: "Core Interface Comparison and Reconciliation",
      execHe:
        "ה-CCR (Core Interface Comparison and Reconciliation, /SAPAPO/CCR) הוא הכלי שמשווה את נתוני-התנועה ב-S/4HANA מול אלו ב-PP/DS/liveCache, מזהה פערים, ומתקן אותם. גם עם CIF מושלם, פערים נוצרים (תורים שנמחקו, רשומות-Postprocessing פתוחות, תקלות). CCR הוא רשת-הביטחון: הוא נותן 'דוח-הבדלים' ומאפשר השלמה (reconciliation) ידנית או אוטומטית.",
      beginnerHe:
        "אחרי שהמסוע עבד שבוע, איך יודעים שכל החבילות הגיעו? עושים ספירת-מלאי-משווה: מסתכלים מה יש בצד-השולח ומה בצד-המקבל, ומחפשים הבדלים. CCR הוא ספירת-המלאי-המשווה הזו עבור הזמנות, דרישות ומלאי — הוא מוצא מה קיים בצד אחד וחסר/שונה בשני, ומתקן.",
      consultantHe:
        "CCR (/SAPAPO/CCR) בודק התאמה ברמת-האובייקט (הזמנות-מתוכננות, פק\"ע, הזמנות-רכש, מלאי, הזמנות-מכירה) בין ה-DB של S/4 ל-liveCache. תוצאת-הבדיקה מסומנת בצבעים; ניתן להריץ בו השלמה (Send/Resend מ-ERP, או מחיקה מ-liveCache) לפי כיוון-האמת. חשוב: CCR צריך לרוץ כאשר אין תעבורת-CIF פעילה (אחרת 'פערים' זמניים שהם בעצם רשומות-בתנועה). הרצה אוטומטית מתבצעת כ-batch (תוכנית /SAPAPO/CIF_DELTAREPORT3 או דרך job). פערי-CCR קבועים מצביעים על בעיית-תהליך (מחיקת-תורים, Postprocessing מוזנח) ולא רק תקלה נקודתית.",
      purposeHe:
        "להבטיח עקביות-נתונים (data consistency) בין שני העולמות. תכנון על נתונים לא-עקביים מסוכן יותר מתכנון על נתונים-ישנים, כי הוא יוצר החלטות שגויות שנראות תקינות.",
      processExampleHe:
        "אחרי תחזוקת-מערכת בסוף-שבוע, צוות-Basis הריץ /SAPAPO/CCR למודל-הייצור. הדוח חשף 12 הזמנות-מתוכננות שקיימות ב-S/4 אך חסרות ב-liveCache (כנראה תורים שנמחקו בעבר). הצוות סימן אותן ובחר 'Resend from ERP'; ההשלמה יצרה אותן מחדש ב-liveCache והעקביות שוחזרה.",
      cbcHe:
        "ב-CBC מריצים CCR אוטומטי בלילה לכל מודלי-המילוי, אחרי שתעבורת-ה-CIF שוככת. דוח-הבדלים נסקר בבוקר; פער בהזמנות-מילוי או במלאי-תרכיז מתוקן לפני ריצת-התכנון, כדי שלוח-המילוי לא יתבסס על תמונה לא-עקבית.",
      navHe: [
        "Easy Access ► /SAPAPO/CCR — CIF Comparison/Reconciliation of Transaction Data",
        "Easy Access ► SE38 ► /SAPAPO/CIF_DELTAREPORT3 — Reconciliation report (batch)",
        "SPRO ► Integration with Other SAP Components ► APO ► Basic Settings for Data Transfer ► Comparison/Reconciliation of Transaction Data",
      ],
      tables: ["CIF_DELTA", "/SAPAPO/ORDKEY", "/SAPAPO/ORDMAP", "/SAPAPO/MATKEY"],
      tcodes: ["/SAPAPO/CCR", "/SAPAPO/C5", "/SAPAPO/OM17", "SM37"],
      fiori: ["F2272"],
      configHe: [
        "Comparison scope: בחר אובייקטים להשוואה (הזמנות-מתוכננות, פק\"ע, מלאי, הזמנות-מכירה) ואת המודל/הקריטריונים.",
        "Reconciliation direction: קבע את 'מקור-האמת' — בדרך-כלל S/4 (Resend from ERP) ל-liveCache.",
        "Batch run: תזמן /SAPAPO/CIF_DELTAREPORT3 כ-job בחלון-זמן ללא תעבורת-CIF.",
        "/SAPAPO/OM17 (liveCache consistency check) משלים את CCR ברמת ה-liveCache-internal.",
      ],
      flow: [
        { he: "השקטת תעבורת-CIF", code: "Quiet window", note: "למנוע פערי-תנועה זמניים" },
        { he: "השוואת S/4 מול liveCache", code: "/SAPAPO/CCR" },
        { he: "דוח-הבדלים מסומן-צבעים", code: "Delta report" },
        { he: "בחירת כיוון-השלמה", code: "Resend/Delete", note: "מקור-האמת" },
        { he: "השלמה ועקביות", code: "Reconcile" },
      ],
      masterDataHe: [
        "CCR משווה נתוני-תנועה; פערים חוזרים באותם סוגי-אובייקטים מצביעים על בעיה במודל-האינטגרציה או בתהליך-התפעול.",
        "/SAPAPO/OM17 בודק עקביות פנימית של liveCache עצמו (משלים את CCR שמשווה מול ה-DB).",
      ],
      mistakesHe: [
        "הרצת CCR בזמן תעבורת-CIF פעילה — 'פערים' מדומים שהם רשומות-בתנועה.",
        "תיקון אוטומטי בכיוון-שגוי — מחיקת נתון-תקין מ-liveCache במקום שליחתו-מחדש.",
        "התעלמות מפערים-חוזרים כ'רעש' במקום לחקור את שורשם (מחיקת-תורים/Postprocessing).",
        "אי-תזמון CCR כ-job — הסתמכות על הרצה-ידנית שנשכחת.",
      ],
      troubleshootHe: [
        "פערים רבים אחרי שחזור/Refresh של המערכת ➔ הרץ CCR והשלם 'Resend from ERP'.",
        "פערים חוזרים שבוע אחר שבוע ➔ חקור מחיקת-תורים או רשומות-Postprocessing פתוחות (10.2).",
        "CCR מדווח פערים אך ידנית הכול נראה תקין ➔ ייתכן שרץ בזמן תעבורה; הרץ בחלון-שקט.",
        "פער שלא נסגר בהשלמה ➔ הרץ /SAPAPO/OM17 לבדיקת-עקביות liveCache-internal.",
      ],
      bestPracticeHe: [
        "תזמן CCR אוטומטי קבוע (לילי/שבועי) בחלון ללא תעבורת-CIF.",
        "הגדר את S/4 כמקור-אמת ברירת-מחדל להשלמה, אלא אם יש סיבה הפוכה.",
        "שלב CCR עם OM17: CCR מול ה-DB, OM17 בתוך liveCache.",
        "חקור פערים-חוזרים כבעיית-תהליך, לא כתקלה נקודתית.",
      ],
      interviewHe: [
        { qHe: "מה משווה CCR ומדוע הוא נחוץ אם ה-CIF עובד?", aHe: "CCR משווה נתוני-תנועה בין ה-DB של S/4 ל-liveCache. גם עם CIF תקין נוצרים פערים (תורים שנמחקו, Postprocessing מוזנח, תקלות), ו-CCR הוא רשת-הביטחון שמזהה ומתקן אותם." },
        { qHe: "מדוע חשוב להריץ CCR בחלון ללא תעבורת-CIF?", aHe: "כי רשומות שנמצאות כרגע בתנועה ייראו כ'פערים' מדומים. השקטת התעבורה מבטיחה שהפערים שמדווחים הם אמיתיים." },
        { qHe: "מה ההבדל בין CCR ל-/SAPAPO/OM17?", aHe: "CCR משווה S/4-DB מול liveCache; OM17 בודק עקביות פנימית בתוך liveCache עצמו. הם משלימים זה את זה." },
      ],
      takeawaysHe: [
        "CCR = רשת-הביטחון לעקביות נתוני-תנועה בין S/4 ל-liveCache.",
        "הרץ בחלון-שקט; תקן בכיוון מקור-האמת (לרוב Resend from ERP).",
        "פערים-חוזרים = בעיית-תהליך (מחיקת-תורים/Postprocessing), לא רעש.",
        "CCR מול ה-DB, OM17 בתוך liveCache — שלב את שניהם.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · עיבוד-המשך CIF (10.2)", href: "/library/ppds/chapter-10/#sub-10.2" },
        { labelHe: "PP/DS · תחזוקת liveCache (10.5)", href: "/library/ppds/chapter-10/#sub-10.5" },
        { labelHe: "אובייקט · CIF_DELTA", href: "/library/ppds/object/CIF_DELTA/" },
      ],
    },
    // ============================================================ 10.4
    {
      id: "10.4", titleHe: "ניהול יומן-היישום של ה-Core Interface", titleEn: "Core Interface Application Log Management",
      execHe:
        "יומן-היישום (Application Log) מתעד כל אירוע-CIF — הצלחות, אזהרות ושגיאות — עם פירוט מלא. הוא כלי-האבחון המרכזי: כשרשומה נכשלת, היומן מסביר למה. ניהול-תקין כולל הפעלת-רישום ברמה הנכונה, סקירה שוטפת, ומחיקה-מבוקרת של יומנים-ישנים (housekeeping) כדי שלא יציפו את ה-DB. /SAPAPO/C3 ו-SLG1 הם נקודות-המבט.",
      beginnerHe:
        "כל פעם שחבילה עוברת במסוע, נכתבת שורה ב'יומן-המשלוחים': מה נשלח, האם הצליח, ואם לא — למה. כשמשהו משתבש, פותחים את היומן וקוראים את הסיבה המדויקת. אבל יומן שגדל לנצח תופס מקום, אז צריך גם למחוק רשומות-ישנות מדי פעם.",
      consultantHe:
        "ה-CIF כותב ל-Application Log (אובייקט CIF / תת-אובייקטים). רמת-הרישום נקבעת בהגדרות (ניתן לרשום רק שגיאות, או גם הצלחות לצורך-debug). /SAPAPO/C3 מציג את יומני-ה-CIF ממוקדים; SLG1 הוא ה-Application Log הגנרי. רישום מלא ('log successful transfers too') יקר ב-DB ומומלץ רק זמנית לאבחון. Housekeeping: SLG2 (Application Log: Delete) מוחק יומנים שפג-תוקפם לפי Expiry Date — חיוני, אחרת טבלאות BALHDR/BALDAT תופחות. רשומות-Postprocessing (10.2) מקושרות ליומן, כך שניתן לעבור מהשגיאה לפרטים בקליק.",
      purposeHe:
        "לספק שקיפות-מלאה לדיבוג-CIF ולשמור על בריאות-ה-DB. בלי יומן אי-אפשר לאבחן שגיאות; עם יומן שלא מנוקה ה-DB תופח ומאט.",
      processExampleHe:
        "רשומת-Postprocessing נכשלה ב-Reprocess. האדמין לוחץ 'Display Log', /SAPAPO/C3 נפתח על אותה רשומה ומציג: 'Material X: MRP type missing in target plant'. הסיבה ברורה, התיקון ממוקד, וה-Reprocess הבא מצליח. במקביל, job שבועי של SLG2 מוחק יומני-CIF בני יותר מ-30 יום.",
      cbcHe:
        "ב-CBC רמת-הרישום הרגילה היא 'שגיאות בלבד' כדי לא להעמיס; בעת חקירת-תקלה מעלים זמנית ל'מלא' למספר-שעות. job-housekeeping שבועי (SLG2) מוחק יומני-CIF ישנים כדי לשמור על ביצועי-DB בשרת-המילוי.",
      navHe: [
        "Easy Access ► /SAPAPO/C3 — Display CIF Application Log",
        "Easy Access ► SLG1 — Application Log: Display Logs",
        "Easy Access ► SLG2 — Application Log: Delete Logs",
        "SPRO ► Integration with Other SAP Components ► APO ► Basic Settings for Data Transfer ► Set Up CIF Application Log",
      ],
      tables: ["BALHDR", "BALDAT", "BALOBJ", "BALOBJT", "CIF_APPLOG"],
      tcodes: ["/SAPAPO/C3", "SLG1", "SLG2", "SLG0"],
      fiori: ["F2272"],
      configHe: [
        "Log level (CIF settings): קבע אם לרשום רק שגיאות/אזהרות, או גם העברות-מוצלחות (debug — יקר).",
        "Expiry Date: כל רשומת-יומן מקבלת תאריך-תפוגה הקובע מתי SLG2 רשאית למחוק.",
        "SLG2 housekeeping: תזמן job למחיקת יומנים שפגו (לפי אובייקט CIF) — שומר על BALHDR/BALDAT רזים.",
        "Object/subobject (SLG0): אובייקט-היומן של CIF מוגדר מראש; אין צורך ליצור חדש.",
      ],
      flow: [
        { he: "אירוע-CIF (העברה)", code: "Transfer", note: "הצלחה/שגיאה" },
        { he: "כתיבה ל-Application Log", code: "BAL_LOG", note: "לפי רמת-רישום" },
        { he: "סקירה ואבחון", code: "/SAPAPO/C3", note: "או SLG1" },
        { he: "קישור מ-Postprocessing", code: "CPP1", note: "Display log" },
        { he: "מחיקה-מבוקרת", code: "SLG2", note: "לפי Expiry" },
      ],
      masterDataHe: [
        "אובייקט-היומן של CIF מוגדר מראש ב-SLG0; רישום מתבצע אוטומטית כשה-CIF מופעל.",
        "כל רשומת-Postprocessing מצביעה לרשומת-יומן — גשר מהשגיאה לפרטיה.",
      ],
      mistakesHe: [
        "השארת רמת-רישום 'מלא' באופן-קבוע — תפיחת-DB וירידה-בביצועים.",
        "אי-תזמון SLG2 — טבלאות BALHDR/BALDAT תופחות עד שמאטות את המערכת.",
        "מחיקת יומנים אגרסיבית מדי — אובדן ראיות לדיבוג שגיאות פתוחות.",
        "ניתוח שגיאה בלי לפתוח את היומן — ניחושים במקום סיבה-מדויקת.",
      ],
      troubleshootHe: [
        "שגיאת-CIF לא-ברורה ➔ פתח /SAPAPO/C3 / SLG1 וקרא את הודעת-היומן המלאה.",
        "ה-DB תופח ➔ ודא שרץ job SLG2 וש-Expiry Dates נקבעים לרשומות-CIF.",
        "אין רשומות-יומן כלל לשגיאה ➔ רמת-הרישום נמוכה מדי; העלה זמנית ל-debug.",
        "מ-Postprocessing אין מעבר ליומן ➔ ודא קישור-יומן פעיל בהגדרות-CIF.",
      ],
      bestPracticeHe: [
        "רמת-רישום ברירת-מחדל: שגיאות/אזהרות; 'מלא' רק זמנית לאבחון.",
        "תזמן SLG2 כ-job קבוע עם מדיניות-שמירה ברורה (למשל 30 יום).",
        "השתמש בקישור Postprocessing→Log למעבר-מהיר מהשגיאה לסיבה.",
        "אל תמחק יומנים של שגיאות-פתוחות שעדיין בטיפול.",
      ],
      interviewHe: [
        { qHe: "מהו תפקיד יומן-היישום ב-CIF?", aHe: "לתעד כל אירוע-העברה (הצלחה/אזהרה/שגיאה) עם פירוט מלא, כדי לאפשר אבחון מדויק של שגיאות-CIF." },
        { qHe: "מדוע חשוב לא להשאיר רמת-רישום 'מלא' תמיד?", aHe: "רישום העברות-מוצלחות יקר ב-DB; הוא מתאים רק זמנית לדיבוג. בקבוע הוא מנפח את BALHDR/BALDAT ומאט את המערכת." },
        { qHe: "איזו טרנזקציה מנקה יומנים-ישנים?", aHe: "SLG2 (Application Log: Delete) — מוחקת רשומות שפג תוקפן לפי Expiry Date; יש לתזמן אותה כ-job." },
      ],
      takeawaysHe: [
        "Application Log = כלי-האבחון המרכזי של ה-CIF.",
        "/SAPAPO/C3 ממוקד-CIF; SLG1 גנרי; SLG2 מוחק.",
        "רמת-רישום 'מלא' רק זמנית — אחרת ה-DB תופח.",
        "תזמן SLG2 housekeeping ושמור קישור מ-Postprocessing ליומן.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · עיבוד-המשך CIF (10.2)", href: "/library/ppds/chapter-10/#sub-10.2" },
        { labelHe: "PP/DS · ג'ובים לתחזוקה (10.7)", href: "/library/ppds/chapter-10/#sub-10.7" },
        { labelHe: "אובייקט · BALHDR", href: "/library/ppds/object/BALHDR/" },
      ],
    },
    // ============================================================ 10.5
    {
      id: "10.5", titleHe: "תחזוקה והשלמת-נתונים של SAP liveCache", titleEn: "SAP liveCache Housekeeping and Reconciliation",
      execHe:
        "liveCache הוא מנוע-הזיכרון של PP/DS — בו חיים אובייקטי-התכנון (הזמנות, Pegging, רשתות-Order). מאחר שזהו זיכרון-עבודה מהיר ולא מאגר-אמת קבוע, הוא דורש תחזוקה: ניקוי אובייקטים-מיותמים (housekeeping), השלמת-עקביות מול ה-DB (reconciliation), וניטור-בריאות. /SAPAPO/OM13 הוא לוח-המחוונים המרכזי, ו-/SAPAPO/OM17 בודק-עקביות. הזנחת liveCache = תכנון על נתונים פגומים.",
      beginnerHe:
        "liveCache הוא 'שולחן-העבודה' המהיר של מנוע-התכנון — שם הוא משחק עם כל ההזמנות והקשרים ביניהן. מכיוון ששולחן-העבודה מתמלא עם הזמן בפתקים-ישנים ובלגן, צריך לסדר אותו (housekeeping) ולוודא שמה שעליו תואם ל'תיק-הרשמי' (ה-DB) — זו ההשלמה (reconciliation).",
      consultantHe:
        "liveCache הוא MaxDB-based in-memory engine המאחסן את אובייקטי-ה-SCM/PP-DS (orders, pegging, time-series). הוא נשען על תיקוף מול טבלאות-ה-DB של S/4 (/SAPAPO/ORDKEY, /SAPAPO/ORDMAP). תחזוקה כוללת: (1) Housekeeping — סילוק אובייקטים-מיותמים וגרסאות-תכנון ישנות; (2) Reconciliation — /SAPAPO/OM17 ו-CCR להשלמת-פערים; (3) Monitoring — /SAPAPO/OM13 (liveCache: Monitoring) למצב, גודל, וגרסאות. תקלת-liveCache (down/inconsistent) משביתה את כל ה-PP/DS, ולכן זהו רכיב-קריטיות-עליונה ב-Basis. תת-הסעיפים מפרטים Housekeeping (10.5.1), Reconciliation (10.5.2) וסקירת-טרנזקציות (10.5.3).",
      purposeHe:
        "לשמור על liveCache עקבי, רזה ובריא, כך שמנוע-התכנון יפעל מהר ונכון. liveCache מנופח או לא-עקבי גורם לתכנון-איטי ולהחלטות-שגויות.",
      processExampleHe:
        "אחרי שבועות-עבודה, /SAPAPO/OM13 מראה שגודל-ה-liveCache גדל וזמני-התגובה עלו. הצוות מריץ job-housekeeping שמסלק גרסאות-תכנון ישנות ואובייקטים-מיותמים, ואז /SAPAPO/OM17 להשלמת-עקביות. הביצועים חוזרים לקדמותם.",
      cbcHe:
        "ב-CBC liveCache מחזיק את כל לוח-המילוי החי: הזמנות-מילוי, Pegging תרכיז→משקה, ועומסי-קווים. תחזוקה שבועית (housekeeping + OM17) מבטיחה שריצת-ה-Heuristics היומית מהירה ועובדת על רשת-Order עקבית.",
      navHe: [
        "Easy Access ► /SAPAPO/OM13 — liveCache: Monitoring",
        "Easy Access ► /SAPAPO/OM17 — liveCache Consistency Check",
        "SPRO ► Advanced Planning ► Basic Settings ► liveCache/LCA Routines",
      ],
      tables: ["/SAPAPO/ORDKEY", "/SAPAPO/ORDMAP", "/SAPAPO/TS_LCKEY", "/SAPAPO/MATKEY"],
      tcodes: ["/SAPAPO/OM13", "/SAPAPO/OM17", "/SAPAPO/OM02", "/SAPAPO/OM03"],
      fiori: ["F2272"],
      configHe: [
        "liveCache connection (/SAPAPO/OM13): ניטור מצב-החיבור, גודל ה-data/log volumes, וגרסת-ה-liveCache.",
        "Consistency check schedule: תזמון /SAPAPO/OM17 כ-job לבדיקה-והשלמה תקופתית.",
        "Housekeeping jobs: תוכניות-ניקוי (deletion of obsolete orders / planning versions) ב-batch.",
        "Backup/recovery (Basis): מדיניות-גיבוי ל-liveCache כרכיב-קריטי.",
      ],
      flow: [
        { he: "ניטור בריאות-liveCache", code: "/SAPAPO/OM13", note: "מצב/גודל" },
        { he: "Housekeeping", code: "Job", note: "סילוק מיותמים (10.5.1)" },
        { he: "השלמת-עקביות", code: "/SAPAPO/OM17", note: "מול ה-DB (10.5.2)" },
        { he: "אימות מול S/4", code: "/SAPAPO/CCR", note: "rec' חוצה" },
        { he: "liveCache רזה ועקבי", code: "OK" },
      ],
      masterDataHe: [
        "אובייקטי-liveCache (orders/pegging/time-series) מתוקפים מול /SAPAPO/ORDKEY ו-/SAPAPO/ORDMAP ב-DB.",
        "גרסאות-תכנון (Planning Versions) ישנות הן מקור-עיקרי לניפוח — הן יעד-מרכזי ל-housekeeping.",
      ],
      mistakesHe: [
        "התייחסות ל-liveCache כ'מאגר-אמת' — הוא זיכרון-עבודה הדורש תיקוף מול ה-DB.",
        "אי-תזמון housekeeping — liveCache תופח ומאט את כל התכנון.",
        "הרצת OM17 בלי גיבוי/הבנה — תיקון אגרסיבי עלול למחוק נתון-תקין.",
        "התעלמות מ-/SAPAPO/OM13 עד לקריסה במקום ניטור-מונע.",
      ],
      troubleshootHe: [
        "תכנון-איטי ➔ בדוק גודל-liveCache ב-/SAPAPO/OM13 והרץ housekeeping.",
        "תוצאות-תכנון לא-עקביות ➔ הרץ /SAPAPO/OM17 ואז CCR (10.3).",
        "liveCache down ➔ אירוע-Basis קריטי; PP/DS מושבת עד שחזור.",
        "אובייקטים-מיותמים מצטברים ➔ ודא ש-jobs-הניקוי רצים בפועל (SM37).",
      ],
      bestPracticeHe: [
        "נטר את /SAPAPO/OM13 באופן-שוטף — מניעה עדיפה על קריסה.",
        "תזמן housekeeping ו-OM17 קבוע בחלון-תחזוקה.",
        "תאם עם Basis מדיניות-גיבוי ושחזור ל-liveCache כרכיב-קריטי.",
        "שלב reconciliation פנימי (OM17) עם חוצה-מערכת (CCR).",
      ],
      interviewHe: [
        { qHe: "מהו liveCache ומדוע הוא דורש תחזוקה?", aHe: "מנוע-זיכרון מהיר שמחזיק את אובייקטי-התכנון של PP/DS. מכיוון שזהו זיכרון-עבודה ולא מאגר-אמת קבוע, הוא מתנפח ויכול לסטות מה-DB, ולכן דורש housekeeping ו-reconciliation." },
        { qHe: "מה קורה ל-PP/DS אם ה-liveCache נופל?", aHe: "כל ה-PP/DS מושבת — לא ניתן לתכנן, לתזמן או לראות אובייקטים — עד שה-liveCache משוחזר. לכן הוא רכיב-קריטיות-עליונה." },
        { qHe: "אילו שתי טרנזקציות מרכזיות לניהול liveCache?", aHe: "/SAPAPO/OM13 לניטור-בריאות, ו-/SAPAPO/OM17 לבדיקת-והשלמת-עקביות." },
      ],
      takeawaysHe: [
        "liveCache = מנוע-הזיכרון של PP/DS; זיכרון-עבודה, לא מאגר-אמת.",
        "תחזוקה = Housekeeping (10.5.1) + Reconciliation (10.5.2) + Monitoring.",
        "/SAPAPO/OM13 לניטור, /SAPAPO/OM17 לעקביות.",
        "liveCache down = PP/DS מושבת — רכיב-קריטיות-עליונה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · השוואה והשלמה CCR (10.3)", href: "/library/ppds/chapter-10/#sub-10.3" },
        { labelHe: "PP/DS · ג'ובים לתחזוקה (10.7)", href: "/library/ppds/chapter-10/#sub-10.7" },
        { labelHe: "אובייקט · /SAPAPO/ORDKEY", href: "/library/ppds/object/SAPAPO_ORDKEY/" },
      ],
      children: [
        {
          id: "10.5.1", titleHe: "תחזוקה (Housekeeping)", titleEn: "Housekeeping",
          execHe: "Housekeeping הוא הניקוי-השוטף של liveCache: סילוק אובייקטי-תכנון מיותמים, גרסאות-תכנון ישנות, וזמני-סדרה (time-series) שאינם בשימוש. ניקוי-קבוע שומר על liveCache רזה ומהיר ומונע ניפוח שמאט את כל מנוע-התכנון.",
          beginnerHe: "כמו פינוי-פתקים-ישנים משולחן-העבודה: ככל שהשולחן צפוף יותר, איטי יותר למצוא ולעבוד. Housekeeping מפנה את מה שכבר לא צריך כדי שהמנוע יישאר מהיר.",
          consultantHe: "מבוצע דרך תוכניות-מחיקה ב-batch: מחיקת הזמנות-מתוכננות מיותמות, ניקוי גרסאות-תכנון לא-פעילות (/SAPAPO/OM02 ניהול-גרסאות), ו-time-series שאינם משויכים. רבים מהאובייקטים-המיותמים נוצרים מתורי-CIF שנמחקו או מהמרות-הזמנה לא-מושלמות. Housekeeping צריך לרוץ בחלון-תחזוקה, אחרי גיבוי, ובתיאום עם CCR/OM17 לזיהוי מה באמת מיותם.",
          purposeHe: "למנוע ניפוח-liveCache ולשמר ביצועי-תכנון. אובייקטים-מיותמים אינם רק בזבוז-זיכרון — הם יכולים להופיע בתוצאות-תכנון ולעוות החלטות.",
          processExampleHe: "job שבועי מזהה 3,000 הזמנות-מתוכננות מיותמות (ללא רשומת-DB מקבילה) ומוחק אותן מ-liveCache; גודל-ה-liveCache יורד וזמן-ריצת-ה-Heuristics מתקצר.",
          cbcHe: "ב-CBC job-housekeeping לילי מנקה הזמנות-מילוי שהושלמו וגרסאות-סימולציה ישנות, כדי שלוח-המילוי החי יישאר רזה לקראת ריצת-הבוקר.",
          navHe: ["Easy Access ► /SAPAPO/OM13 — liveCache Monitoring (size before/after)", "SPRO ► Advanced Planning ► Basic Settings ► Maintain Planning Versions / Deletion Reports"],
          tables: ["/SAPAPO/ORDKEY", "/SAPAPO/TS_LCKEY", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/OM02", "/SAPAPO/OM13", "SM37", "SE38"],
          fiori: ["F2272"],
          configHe: ["תזמן תוכניות-מחיקה ל-orders מיותמים ו-time-series לא-משויכים.", "נהל גרסאות-תכנון (/SAPAPO/OM02): מחק/אפס גרסאות-סימולציה ישנות.", "הרץ תמיד אחרי גיבוי ובתיאום עם OM17."],
          mistakesHe: ["מחיקה ללא גיבוי קודם — סיכון לאובדן נתון-תקין.", "אי-הרצת housekeeping — ניפוח מתמשך."],
          troubleshootHe: ["liveCache תופח למרות housekeeping ➔ בדוק שה-jobs רצים בפועל (SM37) ושטווח-המחיקה נכון.", "אובייקטים-מיותמים חוזרים ➔ שורש ב-CIF (תורים-נמחקים)/Postprocessing."],
          bestPracticeHe: ["תזמן housekeeping קבוע בחלון-תחזוקה אחרי גיבוי.", "נקה גרסאות-סימולציה ישנות באופן-שיטתי.", "תאם עם OM17/CCR לזיהוי מיותמים אמיתיים."],
          interviewHe: [
            { qHe: "מה מסלק Housekeeping ב-liveCache?", aHe: "אובייקטי-תכנון מיותמים, גרסאות-תכנון ישנות וזמני-סדרה לא-משויכים — כדי לשמור על liveCache רזה ומהיר." },
            { qHe: "מהיכן נוצרים רבים מהאובייקטים-המיותמים?", aHe: "מתורי-CIF שנמחקו, מהמרות-הזמנה לא-מושלמות ומגרסאות-סימולציה נטושות." },
          ],
          takeawaysHe: ["Housekeeping שומר על liveCache רזה ומהיר.", "מחק מיותמים וגרסאות ישנות — אחרי גיבוי.", "שורש המיותמים לרוב ב-CIF/Postprocessing."],
          relatedHe: [{ labelHe: "PP/DS · השלמת-נתונים (10.5.2)", href: "/library/ppds/chapter-10/#sub-10.5.2" }],
        },
        {
          id: "10.5.2", titleHe: "השלמת-נתונים (Data Reconciliation)", titleEn: "Data Reconciliation",
          execHe: "Reconciliation של liveCache מוודא שאובייקטיו תואמים לטבלאות-ה-DB של S/4. /SAPAPO/OM17 בודק עקביות פנימית בין liveCache ל-DB-anchors ומשלים פערים; CCR (10.3) משלים זאת ברמת-החוצה-מערכת. יחד הם מבטיחים שמנוע-התכנון רואה תמונה אמיתית.",
          beginnerHe: "אחרי שסידרנו את שולחן-העבודה, צריך לוודא שהוא תואם ל'תיק-הרשמי'. Reconciliation משווה את שני אלה ומתקן כל הבדל — כך שהמנוע לא יעבוד על פתק שכבר לא קיים בתיק, או יפספס פתק שכן קיים.",
          consultantHe: "/SAPAPO/OM17 (liveCache Consistency Check) משווה אובייקטי-liveCache מול ה-anchor-tables (/SAPAPO/ORDKEY, /SAPAPO/ORDMAP) ומזהה: אובייקטים ב-liveCache ללא DB-key (orphan), או DB-keys ללא אובייקט-liveCache (missing). ניתן לתקן בבחירת-כיוון. זהו reconciliation פנימי-ל-APO; CCR (10.3) הוא חוצה-מערכת מול נתוני-ה-ERP. הרץ בחלון-שקט ואחרי גיבוי, כי תיקון מוחק/יוצר אובייקטים.",
          purposeHe: "להבטיח עקביות בין liveCache ל-DB, כך שכל אובייקט-תכנון אמיתי ומתוקף. חוסר-עקביות יוצר 'הזמנות-רפאים' או חוסרים שמעוותים תכנון.",
          processExampleHe: "/SAPAPO/OM17 מוצא 40 orphan-orders ב-liveCache ללא רשומת-DB. הצוות בוחר למחוק אותם (אחרי אימות), וה-liveCache חוזר לעקביות מלאה מול ה-DB.",
          cbcHe: "ב-CBC הרצת /SAPAPO/OM17 שבועית מוודאת שאחרי ניקוי-ה-housekeeping לא נותרו orphan-orders של מילוי — כדי שלוח-המילוי החי יהיה עקבי לחלוטין.",
          navHe: ["Easy Access ► /SAPAPO/OM17 — liveCache Consistency Check", "SPRO ► Advanced Planning ► Basic Settings ► liveCache Consistency / Reconciliation"],
          tables: ["/SAPAPO/ORDKEY", "/SAPAPO/ORDMAP", "/SAPAPO/TS_LCKEY"],
          tcodes: ["/SAPAPO/OM17", "/SAPAPO/CCR", "SM37"],
          fiori: ["F2272"],
          configHe: ["תזמן /SAPAPO/OM17 כ-job בחלון-שקט אחרי housekeeping.", "קבע כיוון-תיקון (מחיקת-orphan / השלמת-missing) במודע.", "שלב עם CCR לכיסוי חוצה-מערכת."],
          mistakesHe: ["הרצת OM17 בזמן תעבורה — פערים מדומים.", "תיקון-אוטומטי אגרסיבי ללא גיבוי — אובדן נתון-תקין."],
          troubleshootHe: ["orphan-orders ב-liveCache ➔ אמת ואז מחק דרך OM17.", "פער שנשאר אחרי OM17 ➔ ייתכן שמקורו ב-ERP; הרץ CCR (10.3)."],
          bestPracticeHe: ["הרץ OM17 בחלון-שקט אחרי housekeeping ואחרי גיבוי.", "שלב OM17 (פנימי) עם CCR (חוצה-מערכת).", "תעד כל תיקון לצורך-מעקב."],
          interviewHe: [
            { qHe: "מה ההבדל בין /SAPAPO/OM17 ל-CCR?", aHe: "OM17 בודק עקביות פנימית בין liveCache ל-anchor-tables של ה-DB; CCR משווה חוצה-מערכת מול נתוני-ה-ERP. הם משלימים." },
            { qHe: "מהו orphan-order ב-liveCache?", aHe: "אובייקט הקיים ב-liveCache ללא רשומת-DB מקבילה — 'הזמנת-רפאים' שיש לאמת ולמחוק כדי לשחזר עקביות." },
          ],
          takeawaysHe: ["Reconciliation = התאמת liveCache ל-DB.", "OM17 פנימי, CCR חוצה-מערכת — שלב את שניהם.", "הרץ בחלון-שקט אחרי גיבוי."],
          relatedHe: [{ labelHe: "PP/DS · השוואה והשלמה CCR (10.3)", href: "/library/ppds/chapter-10/#sub-10.3" }],
        },
        {
          id: "10.5.3", titleHe: "סקירת טרנזקציות liveCache", titleEn: "Overview of SAP liveCache Transactions",
          execHe: "ריכוז הטרנזקציות המרכזיות לניהול liveCache: /SAPAPO/OM13 (ניטור), /SAPAPO/OM17 (עקביות), /SAPAPO/OM02 (גרסאות-תכנון), LC10 (ניהול-liveCache ברמת-Basis). הכרת ה'מפה' הזו מקצרת זמן-תגובה בתקלה.",
          beginnerHe: "כמו לוח-בקרה עם כפתורים: כל טרנזקציה היא כפתור לפעולה אחרת — לראות מצב, לבדוק-עקביות, לנהל-גרסאות, להפעיל-מחדש. כדאי לדעת איזה כפתור לכל מצב.",
          consultantHe: "המפה: /SAPAPO/OM13 = liveCache Monitoring (מצב/גודל/גרסה); /SAPAPO/OM17 = Consistency Check & reconcile; /SAPAPO/OM02 = ניהול Planning Versions; /SAPAPO/OM03 = liveCache anchor info; LC10 = liveCache Assistant (Basis: start/stop/state/log volumes); DB50/DBACOCKPIT לניטור MaxDB. בתקלה: התחל ב-OM13, אם liveCache down עבור ל-LC10 (Basis), ולעקביות הרץ OM17.",
          purposeHe: "לתת לאדמין 'ארגז-כלים' מסודר לכל תרחיש-liveCache, מניטור-שגרתי ועד שחזור-חירום.",
          processExampleHe: "התראה על liveCache: האדמין פותח /SAPAPO/OM13 ➔ מצב 'inactive' ➔ עובר ל-LC10, מפעיל-מחדש את ה-liveCache, ואז מריץ /SAPAPO/OM17 לעקביות לפני שחרור-המערכת למתכננים.",
          cbcHe: "ב-CBC ה-runbook התפעולי מפרט בדיוק: ניטור-בוקר ב-OM13, עקביות-שבועית ב-OM17, ושחזור-חירום ב-LC10 — כדי שכל תורן-משמרת ידע איזה כפתור ללחוץ.",
          navHe: ["Easy Access ► /SAPAPO/OM13 — liveCache Monitoring", "Easy Access ► LC10 — liveCache Assistant", "Easy Access ► /SAPAPO/OM02 — Planning Version Management"],
          tables: ["/SAPAPO/ORDKEY", "/SAPAPO/ORDMAP", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/OM13", "/SAPAPO/OM17", "/SAPAPO/OM02", "/SAPAPO/OM03", "LC10", "DB50"],
          fiori: ["F2272"],
          configHe: ["תעד runbook עם הטרנזקציה לכל תרחיש (ניטור/עקביות/גרסאות/שחזור).", "הגבל LC10 (start/stop) לצוות-Basis בלבד.", "קשר DB50/DBACOCKPIT לניטור-MaxDB מתחת ל-liveCache."],
          mistakesHe: ["ניסיון start/stop ב-LC10 בלי הרשאת/הבנת-Basis.", "בלבול בין OM13 (ניטור) ל-OM17 (תיקון)."],
          troubleshootHe: ["liveCache 'inactive' ב-OM13 ➔ LC10 להפעלה-מחדש (Basis).", "ספק לגבי איזו טרנזקציה ➔ עיין ב-runbook התפעולי."],
          bestPracticeHe: ["החזק runbook מעודכן הממפה טרנזקציה→תרחיש.", "הפרד הרשאות: ניטור לכולם, start/stop ל-Basis.", "התחל אבחון תמיד ב-/SAPAPO/OM13."],
          interviewHe: [
            { qHe: "באיזו טרנזקציה מתחילים אבחון-liveCache?", aHe: "/SAPAPO/OM13 (Monitoring) — מצב, גודל וגרסה; משם מחליטים אם נדרש OM17 (עקביות) או LC10 (שחזור)." },
            { qHe: "מה תפקיד LC10?", aHe: "liveCache Assistant ברמת-Basis — הפעלה/עצירה, מצב, ו-log volumes; מוגבל לצוות-Basis." },
          ],
          takeawaysHe: ["OM13=ניטור, OM17=עקביות, OM02=גרסאות, LC10=Basis-שחזור.", "התחל ב-OM13, עבור ל-LC10 אם down.", "runbook ממפה טרנזקציה לכל תרחיש."],
          relatedHe: [{ labelHe: "PP/DS · תחזוקת liveCache (10.5)", href: "/library/ppds/chapter-10/#sub-10.5" }],
        },
      ],
    },
    // ============================================================ 10.6
    {
      id: "10.6", titleHe: "ניהול נתוני-האב של PP/DS", titleEn: "Administration of PP/DS Master Data",
      execHe:
        "נתוני-האב של PP/DS (Pegging Areas, Resources, PDS) הם הבסיס שעליו פועל מנוע-התכנון. ניהולם השוטף — תיקוף, עדכון והשלמת-עקביות מול ה-CIF — מבטיח שהתכנון מבוסס על קיבולת, מסלולים ולוגיקת-Pegging נכונים. תת-הסעיפים מתמקדים ב-Pegging Areas (10.6.1) וב-Resources (10.6.2), שני נתוני-האב הקריטיים לתחזוקה תפעולית.",
      beginnerHe:
        "לפני שמתכננים, צריך שהבסיס יהיה נכון: היכן מנהלים מלאי-ודרישות (Pegging Area), ועל אילו מכונות/קווים מתכננים (Resources). ניהול נתוני-האב הוא לוודא שהבסיס הזה תמיד תקין ומעודכן.",
      consultantHe:
        "נתוני-האב של PP/DS מועברים מ-S/4 דרך ה-CIF: מרכזי-עבודה הופכים ל-Resources, מאסטר-ייצור (BOM+Routing/Version) הופך ל-PDS (Production Data Structure), והמיקום+חומר מגדירים Pegging Area. הניהול-התפעולי כולל: ודאות שה-CIF העביר אותם נכון, תיקון-עקביות (CCR/OM17), וטיפול בשינויים. שגיאה בנתון-אב מתורגמת ישירות לתכנון-שגוי. שני נתוני-האב הדורשים תשומת-לב-תפעולית מתמשכת הם Pegging Areas (לוגיקת-שיוך היצע-לביקוש) ו-Resources (קיבולת).",
      purposeHe:
        "להבטיח שמנוע-התכנון פועל על תשתית-נתונים נכונה: קיבולת אמיתית, מסלולים מעודכנים, ולוגיקת-Pegging תקינה. נתון-אב פגום מייצר תוכנית פגומה שנראית תקינה.",
      processExampleHe:
        "קו-מילוי חדש נוסף ב-S/4 כמרכז-עבודה. ה-CIF אמור להעבירו כ-Resource ל-PP/DS. האדמין מוודא ב-/SAPAPO/RES01 שה-Resource נוצר עם הקיבולת הנכונה, ושה-PDS המעודכן מקשר אותו — אחרת התכנון יתעלם מהקו.",
      cbcHe:
        "ב-CBC כל שינוי בקווי-המילוי (קיבולת, משמרות) או במתכונים חייב לזרום נכון מ-S/4 ל-PP/DS דרך ה-CIF. ניהול נתוני-האב מוודא שה-Resources וה-PDS משקפים את המפעל האמיתי, כך שלוח-המילוי ריאלי.",
      navHe: [
        "Easy Access ► /SAPAPO/RES01 — Resource Maintenance",
        "Easy Access ► /SAPAPO/CURTO_SIMU — PDS (Production Data Structure) Display",
        "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) ► Global Settings ► Maintain Pegging-Relevant Settings",
      ],
      tables: ["/SAPAPO/RESHEAD", "/SAPAPO/RESNTAB", "/SAPAPO/MATKEY", "/SAPAPO/PEGKEY"],
      tcodes: ["/SAPAPO/RES01", "/SAPAPO/CURTO_SIMU", "/SAPAPO/CCR", "/SAPAPO/OM17"],
      fiori: ["F2272"],
      configHe: [
        "Resource transfer (CIF): ודא שמרכזי-עבודה רלוונטיים נכללים ב-Integration Model ומועברים כ-Resources.",
        "PDS generation: ה-Production Version ב-S/4 יוצר PDS ב-PP/DS; שינויי-BOM/Routing מחייבים ריענון-PDS.",
        "Pegging settings: הגדרות-Pegging גלובליות + ברמת-Product קובעות שיוך-היצע-לביקוש.",
        "Consistency: הרץ CCR/OM17 אחרי שינויי נתוני-אב משמעותיים.",
      ],
      flow: [
        { he: "נתון-אב ב-S/4", code: "Work center/Version", note: "מקור-האמת" },
        { he: "העברה דרך CIF", code: "Integration Model", note: "כ-Resource/PDS" },
        { he: "תיקוף ב-PP/DS", code: "/SAPAPO/RES01", note: "קיבולת/מסלול" },
        { he: "Pegging Area", code: "Product+Location", note: "שיוך היצע-ביקוש" },
        { he: "תכנון על בסיס-תקין", code: "RRP3/Heuristic" },
      ],
      masterDataHe: [
        "Resources = השתקפות-PP/DS של מרכזי-עבודה (/SAPAPO/RESHEAD); PDS = השתקפות BOM+Routing.",
        "Pegging Area = שילוב Product+Location (לרוב) שבו מתבצע שיוך-Pegging.",
      ],
      mistakesHe: [
        "שינוי מרכז-עבודה/Version ב-S/4 בלי ריענון-PDS ב-PP/DS — תכנון על מסלול-ישן.",
        "מרכז-עבודה לא ב-Integration Model — ה-Resource לא נוצר וה-קו 'נעלם' מהתכנון.",
        "הזנחת בדיקות-עקביות אחרי שינויי נתוני-אב.",
        "ערבוב הגדרות-Pegging גלובליות עם ברמת-Product בלי הבנת-הקדימות.",
      ],
      troubleshootHe: [
        "קו לא מתוכנן ב-PP/DS ➔ בדוק שה-Resource קיים (/SAPAPO/RES01) ושמרכז-העבודה ב-Integration Model.",
        "תכנון על מסלול-ישן ➔ רענן PDS אחרי שינוי-Version ב-S/4.",
        "שיוך-Pegging לא-צפוי ➔ בדוק הגדרות-Pegging גלובליות מול ברמת-Product.",
        "אי-עקביות אחרי שינוי ➔ הרץ CCR/OM17.",
      ],
      bestPracticeHe: [
        "כלול תמיד מרכזי-עבודה רלוונטיים ב-Integration Model.",
        "רענן PDS כחלק מתהליך כל שינוי-BOM/Routing/Version.",
        "הרץ בדיקת-עקביות אחרי שינויי נתוני-אב משמעותיים.",
        "תעד את הגדרות-ה-Pegging ואת קדימות גלובלי-מול-Product.",
      ],
      interviewHe: [
        { qHe: "כיצד הופך מרכז-עבודה ל-Resource ב-PP/DS?", aHe: "דרך ה-CIF: אם מרכז-העבודה נכלל ב-Integration Model פעיל, הוא מועבר ונוצר כ-Resource (/SAPAPO/RESHEAD) עם הקיבולת המתאימה." },
        { qHe: "מה דורש שינוי-Version/BOM/Routing ב-S/4 מצד PP/DS?", aHe: "ריענון/יצירה-מחדש של ה-PDS, אחרת PP/DS מתכנן על מסלול ומבנה ישנים." },
        { qHe: "מהם שני נתוני-האב הקריטיים לתחזוקה תפעולית?", aHe: "Pegging Areas (לוגיקת-שיוך היצע-לביקוש) ו-Resources (קיבולת)." },
      ],
      takeawaysHe: [
        "נתוני-אב של PP/DS = Resources + PDS + Pegging Areas, מוזנים מ-S/4 דרך CIF.",
        "שינוי ב-S/4 מחייב העברת-CIF נכונה וריענון-PDS.",
        "נתון-אב פגום = תוכנית פגומה שנראית תקינה.",
        "תיקוף-עקביות (CCR/OM17) הוא חלק מהתחזוקה.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ניטור תור CIF (10.1)", href: "/library/ppds/chapter-10/#sub-10.1" },
        { labelHe: "PP/DS · תחזוקת liveCache (10.5)", href: "/library/ppds/chapter-10/#sub-10.5" },
        { labelHe: "אובייקט · /SAPAPO/RESHEAD", href: "/library/ppds/object/SAPAPO_RESHEAD/" },
      ],
      children: [
        {
          id: "10.6.1", titleHe: "אזורי-Pegging", titleEn: "Pegging Areas",
          execHe: "Pegging Area הוא היחידה שבה PP/DS משייך היצע (הזמנות/מלאי) לביקוש (דרישות). לרוב הוא מוגדר כשילוב Product+Location. ניהול-תקין מבטיח שלוגיקת-ה-Pegging (Fixed/Dynamic) משקפת את כוונת-התכנון, כי Pegging שגוי מעוות תאריכים והתראות.",
          beginnerHe: "Pegging הוא 'מי משרת את מי': איזו הזמנת-ייצור מספקת איזו דרישת-מכירה. אזור-ה-Pegging הוא הגבול שבתוכו נעשה השיוך הזה — בדרך-כלל מוצר במחסן מסוים.",
          consultantHe: "Pegging Area נגזר מ-Product+Location (ולעיתים account assignment). הוא נושא הגדרות: Dynamic Pegging (שיוך אוטומטי לפי תאריך/כמות) מול Fixed Pegging (קישור-קשיח ידני), Pegging strategy, ו-alert-thresholds. ה-Pegging הוא הבסיס ל-alerts ב-Alert Monitor ולחישובי-זמינות. ניהול-תפעולי: ודא שהגדרות-Pegging ברמת-Product נכונות ושאין fixed-pegging תקוע שמונע אופטימיזציה.",
          purposeHe: "להגדיר נכון את שיוך-ההיצע-לביקוש, שממנו נגזרים תאריכי-זמינות, התראות-מחסור, ולוגיקת-ה-rescheduling.",
          processExampleHe: "דרישת-מכירה למשקה מקבלת Pegging דינמי להזמנת-מילוי קרובה. אם המילוי מתעכב, ה-Pegging מפעיל alert ב-Alert Monitor שמתריע על סיכון-אספקה.",
          cbcHe: "ב-CBC כל Product+מחסן-מילוי הוא Pegging Area; שיוך-דינמי מאפשר ל-PP/DS לקשר אוטומטית הזמנות-מילוי לדרישות-לקוח ולהתריע על פערים בעונת-שיא.",
          navHe: ["SPRO ► Advanced Planning ► PP/DS ► Global Settings ► Maintain Pegging-Relevant Settings", "Easy Access ► /SAPAPO/RRP3 — Product View (Pegging tab)"],
          tables: ["/SAPAPO/PEGKEY", "/SAPAPO/MATKEY", "/SAPAPO/ORDMAP"],
          tcodes: ["/SAPAPO/RRP3", "/SAPAPO/MAT1", "/SAPAPO/AMON1"],
          fiori: ["F2272"],
          configHe: ["הגדר Dynamic vs Fixed Pegging ברמת-Product/גלובלי.", "קבע Pegging strategy ו-alert thresholds.", "ודא שאין fixed-pegging מיותם שחוסם אופטימיזציה."],
          mistakesHe: ["fixed-pegging ידני שנשכח — מונע מ-PP/DS לבצע rescheduling.", "סף-alert לא-מכויל — רעש או החמצת-התראות."],
          troubleshootHe: ["alerts שגויים/חסרים ➔ בדוק הגדרות-Pegging וספי-alert.", "rescheduling לא מתבצע ➔ ייתכן fixed-pegging תקוע."],
          bestPracticeHe: ["העדף Dynamic Pegging אלא אם נדרש קישור-קשיח.", "כייל ספי-alert למניעת-רעש.", "סקור fixed-pegging תקוע מעת-לעת."],
          interviewHe: [
            { qHe: "מהו Pegging Area?", aHe: "היחידה שבה PP/DS משייך היצע לביקוש, לרוב Product+Location; הוא הבסיס לתאריכי-זמינות ולהתראות." },
            { qHe: "מה ההבדל בין Dynamic ל-Fixed Pegging?", aHe: "Dynamic = שיוך-אוטומטי לפי תאריך/כמות שה-PP/DS מתחזק; Fixed = קישור-קשיח ידני שאינו משתנה אוטומטית ועלול לחסום rescheduling." },
          ],
          takeawaysHe: ["Pegging Area = גבול שיוך-היצע-לביקוש (Product+Location).", "Dynamic מול Fixed — Dynamic ברירת-המחדל הגמישה.", "Pegging הוא הבסיס ל-alerts ולתאריכים."],
          relatedHe: [{ labelHe: "PP/DS · ניהול נתוני-אב (10.6)", href: "/library/ppds/chapter-10/#sub-10.6" }],
        },
        {
          id: "10.6.2", titleHe: "משאבים (Resources)", titleEn: "Resources",
          execHe: "Resources הם השתקפות-PP/DS של מרכזי-העבודה — הם נושאים את הקיבולת, לוח-המשמרות ולוגיקת-התזמון שעליהם מתבצע התכנון המפורט. ניהול-תקין מוודא שהקיבולת ב-PP/DS תואמת את המפעל האמיתי, אחרת התזמון לא-ריאלי.",
          beginnerHe: "Resource הוא 'המכונה כפי שהמתכנן רואה אותה' — כמה היא יכולה לייצר, מתי היא עובדת (משמרות), וכמה זמן כל פעולה לוקחת. אם זה לא תואם למציאות, התוכנית לא מציאותית.",
          consultantHe: "Resources (/SAPAPO/RES01) מגיעים מ-CIF ממרכזי-עבודה. סוגים: Single/Multi-activity, Bucket, Production, Transportation. הם נושאים Available Capacity, Shift sequences, ו-finite/infinite flag. תזמון-מפורט (DS) נשען על קיבולת-סופית (finite). ניהול-תפעולי: ודא סנכרון-CIF של שינויי-קיבולת/משמרות, בדוק finite-flag למשאבי-צוואר-בקבוק, ותחזק לוחות-משמרות מעודכנים. אי-התאמה בין S/4 ל-Resource = תזמון על קיבולת-שגויה.",
          purposeHe: "לספק למנוע-התזמון תמונת-קיבולת אמיתית, כך שתאריכי-הפק\"ע והעומסים ריאליים וניתנים-לביצוע.",
          processExampleHe: "קו-מילוי עובר משתי-משמרות לשלוש. השינוי נעשה ב-S/4 ומועבר דרך CIF ל-Resource; PP/DS מזהה את הקיבולת-הנוספת ומתזמן עליה הזמנות-מילוי נוספות.",
          cbcHe: "ב-CBC כל קו-מילוי = Resource עם קיבולת-סופית ולוח-משמרות עונתי. עדכון-משמרות לעונת-שיא חייב לזרום דרך CIF, אחרת PP/DS מתזמן על קיבולת-חורף נמוכה.",
          navHe: ["Easy Access ► /SAPAPO/RES01 — Resource Maintenance", "SPRO ► Advanced Planning ► PP/DS ► Resources ► Specify Resource Settings"],
          tables: ["/SAPAPO/RESHEAD", "/SAPAPO/RESNTAB", "/SAPAPO/RESCAP"],
          tcodes: ["/SAPAPO/RES01", "/SAPAPO/CDPSC0", "/SAPAPO/CCR"],
          fiori: ["F2272"],
          configHe: ["ודא העברת מרכזי-עבודה כ-Resources דרך Integration Model.", "קבע finite/infinite — סופי למשאבי-צוואר-בקבוק.", "תחזק Available Capacity ו-Shift sequences מעודכנים."],
          mistakesHe: ["שינוי-קיבולת ב-S/4 בלי סנכרון-CIF ל-Resource.", "infinite-flag למשאב-צוואר-בקבוק ➔ עומס-יתר לא-ריאלי."],
          troubleshootHe: ["תזמון על קיבולת-שגויה ➔ ודא סנכרון-CIF של הקיבולת/המשמרות.", "עומס-יתר לא-ריאלי ➔ בדוק finite-flag של ה-Resource."],
          bestPracticeHe: ["סנכרן כל שינוי-קיבולת/משמרת דרך CIF.", "הגדר finite למשאבי-צוואר-בקבוק לתזמון-ריאלי.", "הרץ CCR/OM17 אחרי שינויי-Resource."],
          interviewHe: [
            { qHe: "מהו Resource ב-PP/DS וממה הוא נגזר?", aHe: "ההשתקפות של מרכז-עבודה ב-PP/DS, נושא קיבולת ולוח-משמרות; נגזר מ-S/4 דרך ה-CIF." },
            { qHe: "מדוע finite-flag חשוב למשאב-צוואר-בקבוק?", aHe: "תזמון-מפורט עם קיבולת-סופית מונע עומס-יתר לא-ריאלי ומפיק תאריכים ברי-ביצוע; infinite יתעלם ממגבלת-הקיבולת." },
          ],
          takeawaysHe: ["Resource = השתקפות-PP/DS של מרכז-עבודה (קיבולת+משמרות).", "finite למשאבי-צוואר-בקבוק; סנכרן שינויים דרך CIF.", "אי-התאמה ל-S/4 = תזמון על קיבולת-שגויה."],
          relatedHe: [{ labelHe: "PP/DS · ניהול נתוני-אב (10.6)", href: "/library/ppds/chapter-10/#sub-10.6" }],
        },
      ],
    },
    // ============================================================ 10.7
    {
      id: "10.7", titleHe: "ג'ובים לתחזוקה ולבדיקת-עקביות", titleEn: "Housekeeping and Consistency Check Jobs",
      execHe:
        "ניהול-PP/DS יציב נשען על אוטומציה: סדרת batch jobs מתוזמנים שמבצעים את התחזוקה ובדיקות-העקביות באופן-קבוע — CIF reconciliation (CCR), liveCache consistency (OM17), housekeeping של liveCache ושל ה-Application Log (SLG2). ארגון נכון של לוח-ה-jobs מבטיח שהמערכת מתחזקת את עצמה במקום להסתמך על זיכרון-אנושי.",
      beginnerHe:
        "במקום לזכור לעשות ניקוי ובדיקה כל בוקר ידנית, מגדירים 'שעון-מעורר' אוטומטי (job) שמבצע אותם בלילה. לוח-ה-jobs הוא רשימת-המשימות-האוטומטית ששומרת על המערכת בריאה בלי שאף-אחד צריך לזכור.",
      consultantHe:
        "ה-jobs המרכזיים: (1) /SAPAPO/CIF_DELTAREPORT3 — CCR reconciliation, בחלון-שקט; (2) /SAPAPO/OM17 — liveCache consistency; (3) תוכניות-housekeeping ל-liveCache (orders/versions מיותמים); (4) SLG2 — מחיקת Application Logs ישנים; (5) ניקוי tRFC/qRFC ישנים. תזמון ב-SM36/SM37 עם תלויות ורצף-נכון: השקטת-CIF ➔ CCR ➔ OM17 ➔ housekeeping ➔ ניקוי-יומנים. ניטור-כשלים דרך job-log ו-alert. רצף-שגוי (למשל housekeeping לפני reconciliation) עלול למחוק נתון שעדיין נדרש להשוואה.",
      purposeHe:
        "להפוך את התחזוקה לאוטומטית, עקבית וניתנת-לניטור — כך שיציבות-ה-PP/DS אינה תלויה בזיכרון או בנוכחות של אדמין מסוים.",
      processExampleHe:
        "שרשרת-jobs לילית: בשעה 01:00 משקיטים CIF, ב-01:15 רץ CCR, ב-01:45 OM17, ב-02:15 housekeeping של liveCache, וב-03:00 SLG2. בבוקר האדמין סוקר את ה-job-logs ב-SM37 ומטפל רק בחריגים.",
      cbcHe:
        "ב-CBC לוח-ה-jobs מתועד ב-runbook: שרשרת-תחזוקה לילית לכל מודלי-המילוי, כך שריצת-ה-Heuristics של הבוקר תמיד פוגשת liveCache רזה, עקבי ומסונכרן — קריטי בעונת-שיא.",
      navHe: [
        "Easy Access ► SM36 — Define Background Job",
        "Easy Access ► SM37 — Job Overview / Monitoring",
        "SPRO ► Advanced Planning ► Basic Settings ► Schedule Consistency/Housekeeping Reports",
      ],
      tables: ["TBTCO", "TBTCP", "BALHDR", "/SAPAPO/ORDKEY"],
      tcodes: ["SM36", "SM37", "/SAPAPO/CCR", "/SAPAPO/OM17", "SLG2"],
      fiori: ["F1599", "F2272"],
      configHe: [
        "תזמן /SAPAPO/CIF_DELTAREPORT3 (CCR) בחלון-שקט ללא תעבורת-CIF.",
        "תזמן /SAPAPO/OM17 אחרי ה-CCR; אחר-כך housekeeping של liveCache.",
        "תזמן SLG2 וניקוי tRFC/qRFC ישנים בסוף-השרשרת.",
        "הגדר תלויות-job (successors) ו-alert על-כשל ב-SM37.",
      ],
      flow: [
        { he: "השקטת CIF", code: "01:00", note: "חלון-שקט" },
        { he: "CCR reconciliation", code: "DELTAREPORT3", note: "01:15" },
        { he: "liveCache consistency", code: "/SAPAPO/OM17", note: "01:45" },
        { he: "Housekeeping liveCache", code: "Job", note: "02:15" },
        { he: "ניקוי יומנים/RFC", code: "SLG2", note: "03:00" },
      ],
      masterDataHe: [
        "רצף-ה-jobs הוא 'נתון-אב תפעולי' — סדר-שגוי (housekeeping לפני reconciliation) מסכן נתונים.",
        "TBTCO/TBTCP מתעדים את הגדרות-ה-jobs והרצותיהם — מקור לניטור ולתחקור.",
      ],
      mistakesHe: [
        "הרצת CCR/OM17 בלי השקטת-CIF — פערים מדומים ותיקונים שגויים.",
        "housekeeping לפני reconciliation — מחיקת נתון שעדיין נדרש להשוואה.",
        "אי-ניטור job-logs — כשל-שקט שמצטבר עד תקלה.",
        "תזמון-jobs חופף לריצות-תכנון — תחרות-משאבים.",
      ],
      troubleshootHe: [
        "job-תחזוקה נכשל ➔ בדוק job-log ב-SM37 וטפל בשורש לפני ההרצה הבאה.",
        "פערי-CCR מדומים ➔ ודא שה-CIF הושקט לפני ה-job.",
        "נתון נמחק בטעות ➔ בדוק שרצף-ה-jobs נכון (reconciliation לפני housekeeping).",
        "תחרות-משאבים בלילה ➔ פזר את חלונות-ה-jobs מריצות-התכנון.",
      ],
      bestPracticeHe: [
        "בנה שרשרת-jobs עם רצף-נכון: השקטה ➔ CCR ➔ OM17 ➔ housekeeping ➔ ניקוי-יומנים.",
        "הגדר alert על-כשל וסקור job-logs כל בוקר.",
        "תעד את לוח-ה-jobs ב-runbook עם זמנים ותלויות.",
        "הימנע מחפיפה בין jobs-תחזוקה לריצות-תכנון.",
      ],
      interviewHe: [
        { qHe: "מהו הרצף-הנכון של jobs-התחזוקה ומדוע?", aHe: "השקטת-CIF ➔ CCR ➔ OM17 ➔ housekeeping ➔ ניקוי-יומנים. ה-reconciliation חייב לקדום ל-housekeeping, אחרת ניקוי עלול למחוק נתון שעדיין נדרש להשוואה." },
        { qHe: "מדוע יש לתזמן CCR/OM17 בחלון-שקט?", aHe: "כדי שרשומות-בתנועה לא ייראו כפערים מדומים; השקטת-CIF מבטיחה שהפערים שמתגלים אמיתיים." },
        { qHe: "כיצד מנטרים את הצלחת jobs-התחזוקה?", aHe: "דרך SM37 (job-logs) ו-alert על-כשל; סקירה יומית מבטיחה שכשל-שקט לא מצטבר." },
      ],
      takeawaysHe: [
        "אוטומציה = יציבות: שרשרת-jobs מתחזקת את PP/DS במקום זיכרון-אנושי.",
        "רצף קריטי: השקטה ➔ CCR ➔ OM17 ➔ housekeeping ➔ ניקוי-יומנים.",
        "תזמן בחלון-שקט; אל תחפוף עם ריצות-תכנון.",
        "נטר job-logs ב-SM37 והגדר alert על-כשל.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · השוואה והשלמה CCR (10.3)", href: "/library/ppds/chapter-10/#sub-10.3" },
        { labelHe: "PP/DS · תחזוקת liveCache (10.5)", href: "/library/ppds/chapter-10/#sub-10.5" },
        { labelHe: "אובייקט · TBTCO", href: "/library/ppds/object/TBTCO/" },
      ],
    },
    // ============================================================ 10.8
    {
      id: "10.8", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה כיסה את ניהול-ה-PP/DS התפעולי ב-S/4HANA: שלמות-ה-CIF (ניטור-תורים, Postprocessing, CCR, יומן-יישום), בריאות-ה-liveCache (housekeeping, reconciliation, טרנזקציות-ניהול), תחזוקת-נתוני-האב (Pegging Areas, Resources), ואוטומציית-התחזוקה דרך batch jobs. המסר המרכזי: PP/DS מתכנן טוב רק כמו עקביות-הנתונים ובריאות-המנוע שמתחתיו.",
      beginnerHe:
        "סיכמנו איך 'לשמור על המכונה משומנת': לוודא שהמסוע (CIF) זורם, שהשולחן (liveCache) מסודר ועקבי, שהבסיס (נתוני-אב) נכון, ושכל זה קורה אוטומטית בלילה (jobs). כשהתשתית בריאה — התכנון אמין.",
      consultantHe:
        "ניהול-PP/DS הוא משמעת תפעולית סביב שלושה צירים: (1) Integration integrity — /SAPAPO/CQ, /SAPAPO/CPP1, /SAPAPO/CCR, /SAPAPO/C3+SLG2; (2) Engine health — /SAPAPO/OM13, /SAPAPO/OM17, LC10, housekeeping; (3) Master-data fidelity — Resources/PDS/Pegging מסונכרנים. כל אלה מאוגדים בשרשרת-jobs מתוזמנת (10.7) עם רצף-נכון וניטור. אדמין שמטמיע runbook המכסה את שלושת הצירים מבטיח PP/DS יציב, מהיר ועקבי לאורך-זמן.",
      purposeHe:
        "לקבע את עקרונות-העל של ניהול-PP/DS כתשתית ליציבות-תכנון, ולתת לאדמין מפת-דרכים תפעולית מאוחדת.",
      processExampleHe:
        "אדמין-PP/DS חדש בונה runbook: בדיקת-בוקר (/SAPAPO/CQ, /SAPAPO/CPP1, OM13), שרשרת-jobs לילית (CCR➔OM17➔housekeeping➔SLG2), ותגובת-חירום (LC10 ל-liveCache). תוך-שבועות המערכת יציבה והמתכננים סומכים על הנתונים.",
      cbcHe:
        "ב-CBC ה-runbook הזה הוא ההבדל בין עונת-שיא חלקה לכאוטית: CIF זורם, liveCache עקבי, קווי-המילוי משתקפים נכון, והכול מתוחזק אוטומטית — כך שלוח-המילוי תמיד אמין.",
      navHe: [
        "Easy Access ► /SAPAPO/CQ · /SAPAPO/CPP1 · /SAPAPO/CCR — שלמות-CIF",
        "Easy Access ► /SAPAPO/OM13 · /SAPAPO/OM17 · LC10 — בריאות-liveCache",
        "Easy Access ► SM37 — ניטור שרשרת-jobs התחזוקה",
      ],
      tables: ["TRFCQIN", "CIF_DELTA", "/SAPAPO/ORDKEY", "/SAPAPO/RESHEAD"],
      tcodes: ["/SAPAPO/CQ", "/SAPAPO/CPP1", "/SAPAPO/CCR", "/SAPAPO/OM13", "/SAPAPO/OM17", "SM37"],
      fiori: ["F2272"],
      configHe: [
        "אגד את שלושת-הצירים (integration / engine / master-data) ל-runbook אחד מתועד.",
        "ודא ששרשרת-ה-jobs (10.7) מכסה reconciliation, consistency ו-housekeeping ברצף-נכון.",
        "הגדר ניטור ו-alert לכל ציר (SYSFAIL, liveCache state, job-fail).",
        "הפרד הרשאות: מתכנן, אדמין-PP/DS, ו-Basis (LC10).",
      ],
      flow: [
        { he: "שלמות-CIF", code: "CQ/CPP1/CCR", note: "ציר 1" },
        { he: "בריאות-liveCache", code: "OM13/OM17/LC10", note: "ציר 2" },
        { he: "נאמנות-נתוני-אב", code: "RES01/PDS/Pegging", note: "ציר 3" },
        { he: "אוטומציה", code: "SM36/SM37", note: "שרשרת-jobs" },
        { he: "PP/DS יציב ועקבי", code: "OK" },
      ],
      masterDataHe: [
        "שלושת-הצירים תלויים זה-בזה: CIF פגום ➔ liveCache סוטה ➔ נתוני-אב לא-מסונכרנים.",
        "runbook מתועד הוא 'נתון-האב' של התפעול — הוא מבטיח המשכיות בלי תלות באדם בודד.",
      ],
      mistakesHe: [
        "טיפול בציר אחד תוך הזנחת האחרים — שלמות-CIF בלי בריאות-liveCache עדיין מסוכנת.",
        "תחזוקה ידנית-בלבד בלי אוטומציה — תלות בזיכרון-אנושי.",
        "היעדר runbook — ידע כלוא אצל אדמין יחיד.",
        "ערבוב-הרשאות בין מתכנן, אדמין ו-Basis.",
      ],
      troubleshootHe: [
        "תכנון לא-אמין ➔ עבור על שלושת-הצירים: CIF (CQ), liveCache (OM13/OM17), נתוני-אב (CCR).",
        "תקלה חוזרת ➔ ודא ששרשרת-ה-jobs רצה ברצף-נכון ומנוטרת.",
        "ידע תלוי-אדם ➔ תעד runbook מלא.",
        "liveCache down ➔ LC10 (Basis), ואז OM17 לפני שחרור.",
      ],
      bestPracticeHe: [
        "החזק runbook אחד המכסה integration, engine ו-master-data.",
        "אוטמט את התחזוקה (10.7) ונטר אותה יומית.",
        "הפרד הרשאות לפי תפקיד.",
        "התייחס לשלושת-הצירים כמערכת אחת — הם תלויים זה-בזה.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת-צירי ניהול-ה-PP/DS?", aHe: "שלמות-אינטגרציה (CIF: CQ/CPP1/CCR/log), בריאות-מנוע (liveCache: OM13/OM17/LC10/housekeeping), ונאמנות-נתוני-אב (Resources/PDS/Pegging). שלושתם תלויים זה-בזה." },
        { qHe: "מהו המסר המרכזי של ניהול-PP/DS?", aHe: "PP/DS מתכנן טוב רק כמו עקביות-הנתונים ובריאות-המנוע שמתחתיו — לכן התחזוקה התפעולית אינה משנית אלא תנאי-לאמינות." },
        { qHe: "מדוע runbook ואוטומציה חיוניים?", aHe: "הם הופכים את היציבות מתלוית-אדם לתהליך-מובנה, ומבטיחים המשכיות וביצועים גם בעומס-שיא." },
      ],
      takeawaysHe: [
        "PP/DS תקין = CIF זורם + liveCache בריא + נתוני-אב מסונכרנים.",
        "שלושת-הצירים תלויים זה-בזה — נהל אותם כמערכת אחת.",
        "אוטמט תחזוקה (jobs) ונטר יומית; אל תסתמך על זיכרון.",
        "runbook + הפרדת-הרשאות = יציבות בלתי-תלויה באדם בודד.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ניטור תור CIF (10.1)", href: "/library/ppds/chapter-10/#sub-10.1" },
        { labelHe: "PP/DS · ג'ובים לתחזוקה (10.7)", href: "/library/ppds/chapter-10/#sub-10.7" },
        { labelHe: "PP/DS · תחזוקת liveCache (10.5)", href: "/library/ppds/chapter-10/#sub-10.5" },
      ],
    },
  ],
};
