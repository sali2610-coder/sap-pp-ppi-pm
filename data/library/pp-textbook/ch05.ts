// ===== PP Digital Textbook — Chapter 5 (Repetitive Manufacturing Configuration) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; corrupted/scrambled parent labels from the PDF TOC
// extraction were corrected to match their coherent children (e.g. 5.3 "Automatic GR"
// whose children describe the Planning Table → corrected to "Planning Table").
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "הגדרת ייצור חוזר (REM)",
  titleEn: "Repetitive Manufacturing Configuration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לקונפיגורציה של ייצור חוזר (Repetitive Manufacturing, REM) ב-SAP S/4HANA — שיטת-הייצור המתאימה לתפוקה רציפה של מוצרים זהים על קווי-ייצור, ללא ניהול פק\"ע בודדות. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, השפעת נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הציר המרכזי: REM Profile, קו-ייצור ו-Rate Routing, טבלת-התכנון (Planning Table), Backflush, Product Cost Collector והגדרות אב-החומר ל-REM. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1", titleHe: "פרופיל ייצור חוזר (REM Profile)", titleEn: "Repetitive Manufacturing Profile",
      execHe:
        "ה-REM Profile הוא רשומת-הקונפיגורציה המרכזית של ייצור-חוזר: הוא קובע כיצד מתבצע הדיווח (Backflush), אילו תנועות-מלאי אוטומטיות נוצרות, כיצד מצטמצמות הזמנות-מתוכננות, וכיצד מטופלות שגיאות. פרופיל אחד מוגדר ב-Customizing ומוקצה לאב-החומר (MARC-SFEPR), ומשם הוא שולט בכל התנהגות-הביצוע של אותו חומר.",
      beginnerHe:
        "בייצור-חוזר אין פק\"ע בודדת לכל מנה — מייצרים את אותו מוצר שוב ושוב על קו. ה-REM Profile הוא ה'הגדרות-העל' של איך לדווח על הייצור הזה: מתי להוריד חומרי-גלם מהמלאי, מתי לקבל מוצר-מוגמר, ומה לעשות כשמשהו משתבש. מגדירים אותו פעם אחת ומחברים לחומר.",
      consultantHe:
        "ה-REM Profile מוגדר ב-OSPT (טבלה T437) ומוקצה דרך MARC-SFEPR בתצוגת MRP 4 / Work Scheduling. הוא מאגד החלטות: סוג-ייצור (REM ל-FERT מול sub-assembly), שימוש ב-Reporting Points (אבני-דרך), Activity Posting, Separated Backflush, Process Control, Firming, Stock/Batch Determination, Reduction Period, יצירת הזמנות-מתוכננות בביטולי-GR, Online vs. Postprocessing (COGI). שגיאת-קונפיגורציה כאן מתפשטת לכל דיווחי-הקו.",
      purposeHe:
        "לרכז את כל החלטות-הביצוע של REM במקום אחד שניתן לתחזק ולשכפל בין חומרים. כך מבטיחים אחידות בין קווים, מפשטים תחזוקה, ומונעים הגדרות-נקודתיות סותרות באב-החומר.",
      processExampleHe:
        "מתכנן מדווח ב-MFBF על 5,000 יח' שיצאו מהקו; ה-REM Profile קובע ש-Backflush מוריד אוטומטית את כל רכיבי-ה-BOM (תנועה 261), מקבל את המוצר-המוגמר (תנועה 131), ומזכה את ה-Activity. אם רכיב חסר-מלאי — לפי ה-Process Control הרשומה נשמרת ל-Postprocessing (COGI) במקום לחסום.",
      cbcHe:
        "ב-CBC כל קו-מילוי משויך ל-REM Profile אחיד: Backflush מלא של תרכיז/סוכר/CO2/אריזה, GR אוטומטי של המשקה המוגמר מנוהל-אצווה, ו-Postprocessing ל-COGI כשאצווה אינה זמינה — כדי שהקו לא ייעצר על תקלת-מלאי נקודתית.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► Define Repetitive Manufacturing Profiles (OSPT)",
        "Production ► Repetitive Manufacturing ► Control Data ► Make Settings for Backflushing",
        "Logistics – General ► Material Master ► … ► assign REM Profile in MRP 4 (MFBF prerequisite)",
      ],
      tables: ["T437", "MARC", "PLAF", "SAFK"],
      tcodes: ["OSPT", "MM02", "MFBF", "MF50", "COGI"],
      fiori: ["F2336", "F1422"],
      configHe: [
        "OSPT: הגדרת REM Profile עם כל אינדיקטורי-הביצוע — Production Type, Reporting Points, Auto goods movements, Activity posting, Separated backflush.",
        "Process Control: התנהגות בשגיאה — Online correction מול שמירה ל-Postprocessing (COGI).",
        "Reduction: צמצום כמות הזמנה-מתוכננת בדיווח + Reduction Period.",
        "Movement Types: סוגי-תנועה ל-GR/GI (131/261 ברירת-מחדל).",
      ],
      flow: [
        { he: "הגדרת פרופיל", code: "OSPT", note: "T437" },
        { he: "קביעת Backflush + תנועות", code: "131/261" },
        { he: "Process Control", code: "COGI", note: "Online/Postproc" },
        { he: "הקצאה לחומר", code: "MARC-SFEPR" },
        { he: "דיווח-ייצור", code: "MFBF" },
      ],
      masterDataHe: [
        "MARC-SFEPR = הקצאת REM Profile · MARC-SAUFT = REM Indicator (MRP 4).",
        "Production Version (MKAL) חובה ל-REM — קושרת BOM + Rate Routing + Cost Collector.",
        "Product Cost Collector (KKF6N) חובה לאיסוף-עלויות; ללא REM Profile תקין לא ייפתח נכון.",
      ],
      mistakesHe: [
        "הגדרת פרופיל אחד גנרי לכל החומרים — מתעלם מהבדלי קווים ותנועות.",
        "סימון Reporting Points בלי לסמן פעולות כ-Reporting Points ב-Rate Routing — ה-RP לא פעיל.",
        "השארת Process Control על 'Online' בלבד בקו עמוס — כל שגיאת-רכיב עוצרת את הדיווח.",
        "שכחת הקצאת הפרופיל ב-MARC-SFEPR — MFBF דורש פרופיל ונכשל.",
      ],
      troubleshootHe: [
        "MFBF נכשל 'No REM Profile' ➔ הקצה REM Profile ב-MRP 4 (MARC-SFEPR).",
        "Backflush לא מוריד רכיבים ➔ הפרופיל ללא Auto goods movements, או אין Production Version פעילה.",
        "שגיאות-דיווח מצטברות ➔ Process Control שולח ל-COGI; נקה את ה-Error Log.",
        "כמות הזמנה-מתוכננת לא מצטמצמת ➔ Reduction לא מסומן או Reduction Period לא מוגדר.",
      ],
      bestPracticeHe: [
        "הגדר פרופילים בודדים-ומובחנים לפי טיפוס-קו, לא אחד גורף.",
        "הפעל Postprocessing (COGI) בקווים-עמוסים כדי לא לעצור דיווח על תקלת-מלאי.",
        "תאם את סוגי-התנועה והתנועות-האוטומטיות עם ה-MM/FI לפני העלייה לאוויר.",
        "תעד את משמעות כל פרופיל ושכפל בעקביות בין חומרים דומים.",
      ],
      interviewHe: [
        { qHe: "מהו REM Profile והיכן מקצים אותו?", aHe: "רשומת-קונפיגורציה (OSPT/T437) שקובעת את התנהגות-הביצוע של ייצור-חוזר; מוקצית לאב-החומר בשדה MARC-SFEPR בתצוגת MRP 4." },
        { qHe: "מה ההבדל בין REM לבין ייצור-בדיד מבחינת מסמכי-ההזמנה?", aHe: "ב-REM אין פק\"ע בודדת; מייצרים מול הזמנות-מתוכננות (run schedule) ו-Product Cost Collector, ומדווחים ב-Backflush — לעומת פק\"ע נפרדת לכל מנה בבדיד." },
        { qHe: "מדוע Production Version חובה ב-REM?", aHe: "היא קושרת במפורש BOM + Rate Routing + קו-ייצור, ומשמשת לתכנון, לדיווח ולאיסוף-עלויות ב-Cost Collector." },
      ],
      takeawaysHe: [
        "REM Profile = רשומת-העל של התנהגות-הביצוע בייצור-חוזר (OSPT/T437).",
        "מוקצה דרך MARC-SFEPR ושולט ב-Backflush, תנועות, Process Control ו-Reduction.",
        "Production Version + Product Cost Collector הם תנאי-סף לעבודה תקינה.",
        "הגדר פרופילים מובחנים לפי קו, והפעל COGI כדי לא לעצור דיווח.",
      ],
      relatedHe: [
        { labelHe: "PP · אב חומר לייצור (3.1)", href: "/library/pp/chapter-03/#sub-3.1" },
        { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
      children: [
        {
          id: "5.1.1", titleHe: "סוג ייצור חוזר", titleEn: "Repetitive Manufacturing Production Type",
          execHe: "Production Type בפרופיל קובע אם החומר מיוצר ב-REM כמוצר-סופי (FERT) או כ-sub-assembly, והאם משתמשים ב-make-to-stock או make-to-order REM. הבחירה משפיעה על מקור-הדרישה ועל אופן-הדיווח.",
          beginnerHe: "ההגדרה אומרת 'מה הקו מייצר' — מוצר-מוגמר שנכנס למלאי, או מכלול-ביניים שנצרך בהמשך. זה קובע מאיפה מגיעה הדרישה ולאן הולך התוצר.",
          consultantHe: "בפרופיל מסמנים Production Type: REM להרכבה-סופית (Make-to-Stock), REM למכלולים, או REM ייעודי-לקוח (Sales-order REM). הבחירה משולבת עם Strategy Group באב-החומר ועם REM Indicator (MARC-SAUFT) הקובע גרסת-Backflush.",
          purposeHe: "להתאים את מנגנון-הדיווח לטיפוס-המוצר — מוצר-מלאי, מכלול, או ייצור-לפי-הזמנה — כדי שהמלאי והעלויות יזרמו ליעד הנכון.",
          processExampleHe: "FERT-REM לייצור-למלאי: דיווח ב-MFBF מקבל מוצר-מוגמר למלאי-חופשי. במכלול-REM, ה-GR נכנס כ-HALB הנצרך ברמה-מעל.",
          cbcHe: "ב-CBC המשקה המוגמר = FERT-REM Make-to-Stock; תערובת-בסיס כ-sub-assembly REM כשהיא מאוחסנת, או פאנטום כשלא.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define REM Profiles ► Production Type (OSPT)"],
          tables: ["T437", "MARC"],
          tcodes: ["OSPT", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OSPT קבע Production Type לפרופיל; תאם עם REM Indicator (MARC-SAUFT) ו-Strategy Group."],
          mistakesHe: ["בחירת Production Type שאינו תואם ל-Strategy Group ➔ דרישה שלא נצרכת.", "REM למכלול שאינו מאוחסן — עדיף פאנטום."],
          troubleshootHe: ["GR נכנס ליעד שגוי ➔ Production Type לא תואם לטיפוס-החומר/אסטרטגיה."],
          bestPracticeHe: ["התאם Production Type ל-Strategy Group ול-REM Indicator כמכלול אחד."],
          interviewHe: [{ qHe: "מה קובע Production Type בפרופיל REM?", aHe: "האם החומר מיוצר כמוצר-סופי או מכלול, ובאיזה מצב (Make-to-Stock/Make-to-Order REM) — קובע מקור-דרישה ויעד-תוצר." }],
          takeawaysHe: ["Production Type = טיפוס-המוצר ב-REM.", "תואם ל-Strategy Group ו-REM Indicator."],
        },
        {
          id: "5.1.2", titleHe: "נקודות דיווח", titleEn: "Reporting Points",
          execHe: "Reporting Points (אבני-דרך) הן פעולות נבחרות ב-Rate Routing שבהן מדווחים התקדמות-ביניים — מאפשרות Backflush חלקי לאורך הקו במקום דיווח-סיום-בלבד, ושיקוף WIP מדויק.",
          beginnerHe: "במקום לדווח רק כשהמוצר מוכן, אפשר להציב 'תחנות-ביקורת' בקו — בכל תחנה מדווחים כמה עברו, וכך רואים בזמן-אמת איפה החומר נמצא.",
          consultantHe: "מפעילים Reporting Points בפרופיל ומסמנים פעולות מתאימות ב-Rate Routing כ-RP. הדיווח ב-RP (MF41/MFBF) צורך את רכיבי-הפעולות עד אותה נקודה ומעדכן WIP. ב-S/4HANA נתמך גם RP-confirmation ל-Kanban. ללא סימון פעולות אין RP בפועל.",
          purposeHe: "לקבל נראות-התקדמות ו-WIP מדויק בקווים-ארוכים, ולפצל Backflush לשלבים במקום דיווח-בודד בסוף.",
          processExampleHe: "קו עם RP אחרי הערבול: דיווח ב-RP צורך תרכיז+סוכר ומראה WIP בערבול; דיווח-סיום בסוף-הקו צורך אריזה ומקבל מוצר-מוגמר.",
          cbcHe: "ב-CBC RP בסוף-ערבול וב-סוף-מילוי מאפשרים לעקוב אחר כמות-בתהליך בכל שלב, חשוב לאצוות-משקה גדולות.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define REM Profiles ► Reporting Points (OSPT)"],
          tables: ["T437", "PLPO", "AFRU"],
          tcodes: ["OSPT", "MF41", "MFBF"],
          fiori: ["F2336"],
          configHe: ["הפעל Reporting Points בפרופיל; סמן פעולות נבחרות ב-Rate Routing כ-RP (Milestone-like)."],
          mistakesHe: ["הפעלת RP בפרופיל בלי לסמן פעולות ➔ אין דיווח-ביניים בפועל.", "ריבוי RP מיותר ➔ עומס-דיווח."],
          troubleshootHe: ["דיווח-ביניים לא אפשרי ➔ אין פעולה מסומנת כ-RP ב-Rate Routing."],
          bestPracticeHe: ["הצב RP במעט נקודות-מפתח בלבד (סוף-תהליך-משמעותי).", "התאם בין רכיבי-הפעולה ל-RP לדיוק-WIP."],
          interviewHe: [{ qHe: "מה תפקיד Reporting Points ב-REM?", aHe: "לאפשר Backflush חלקי ודיווח-התקדמות באבני-דרך לאורך הקו, ולשקף WIP מדויק." }],
          takeawaysHe: ["RP = אבני-דרך לדיווח-ביניים.", "דורש הפעלה בפרופיל + סימון פעולות.", "מדייק WIP בקווים-ארוכים."],
        },
        {
          id: "5.1.3", titleHe: "תנועות סחורה אוטומטיות", titleEn: "Automatic Goods Movements",
          execHe: "ההגדרה קובעת אילו תנועות-מלאי מתבצעות אוטומטית בדיווח: GR של המוצר-המוגמר (131) ו-GI של הרכיבים (261/Backflush). זהו הלב של אוטומציית-ה-REM — דיווח-אחד יוצר את כל תנועות-המלאי.",
          beginnerHe: "כשמדווחים ייצור, SAP יכול אוטומטית גם לקבל את המוצר-המוגמר למלאי וגם להוריד את חומרי-הגלם — בלי תנועות-ידניות נפרדות. ההגדרה מפעילה את האוטומציה הזו.",
          consultantHe: "בפרופיל מסמנים Automatic GR ו-Backflush של רכיבים. תנועת-GR ברירת-מחדל 131 (REM receipt), צריכת-רכיבים 261. ב-S/4HANA התנועות נרשמות מול ה-Product Cost Collector. אפשר להפריד GR מ-GI (ראה Separated Backflush).",
          purposeHe: "לחסל תנועות-מלאי ידניות בייצור-המוני — דיווח-כמות בודד מנפיק את כל ה-GR/GI אוטומטית, מפחית מאמץ ושגיאות.",
          processExampleHe: "MFBF על 10,000 בקבוקים: 131 מקבל 10,000 מוצר-מוגמר; 261 מוריד אוטומטית את כל הרכיבים לפי ה-BOM × הכמות.",
          cbcHe: "ב-CBC דיווח-קו יחיד יוצר 131 למשקה-המוגמר ו-261 לתרכיז/סוכר/CO2/אריזה — אין נגיעה ידנית במלאי בקו רגיל.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define REM Profiles ► Automatic Goods Movements (OSPT)"],
          tables: ["T437", "T156", "MSEG"],
          tcodes: ["OSPT", "MFBF"],
          fiori: ["F1422"],
          configHe: ["סמן Automatic GR ו-Backflush בפרופיל; ודא תנועות 131 (GR) ו-261 (GI) פעילות; תאם Movement Types."],
          mistakesHe: ["כיבוי Auto-GR בטעות ➔ מלאי-מוצר לא מתעדכן בדיווח.", "אי-התאמת Movement Types ➔ שגיאת-רישום ב-MM/FI."],
          troubleshootHe: ["מלאי לא משתנה אחרי MFBF ➔ Auto goods movements לא מסומן בפרופיל.", "GI לא מתבצע ➔ Backflush כבוי או רכיב לא Backflush-relevant."],
          bestPracticeHe: ["הפעל Auto-GR ו-Backflush יחד בייצור-המוני סטנדרטי.", "תאם Movement Types עם MM/FI מראש."],
          interviewHe: [{ qHe: "אילו תנועות יוצרת אוטומציית-REM?", aHe: "GR של מוצר-מוגמר (131) ו-GI/Backflush של רכיבים (261), כולן מדיווח-כמות בודד." }],
          takeawaysHe: ["דיווח אחד = GR(131) + GI(261) אוטומטיים.", "הלב של אוטומציית-REM.", "תאם Movement Types עם MM/FI."],
        },
        {
          id: "5.1.4", titleHe: "נקודות דיווח: אישורים וקנבן", titleEn: "Reporting Points: Confirmations and Kanban",
          execHe: "ההגדרה מאפשרת לקשר אישורי-Reporting-Point למחזורי-Kanban: השלמת-Kanban (סטטוס 'Full') יכולה להפעיל RP-confirmation אוטומטי, ולחבר משיכה (pull) לדיווח-ייצור.",
          beginnerHe: "כשעובדים עם Kanban (כרטיסי-משיכה), מילוי מכל יכול לדווח אוטומטית שהושלמה כמות-ייצור — מחבר את אות-ה-Kanban לדיווח ב-REM בלי הזנה כפולה.",
          consultantHe: "ב-REM-Kanban משלבים Control Cycle עם RP-confirmation: שינוי-סטטוס Kanban ל-FULL מפעיל Backflush ב-RP המתאים. נשען על Production Supply Area ועל הפרופיל המסמן RP. רלוונטי לרצפת-ייצור pull-driven.",
          purposeHe: "לאחד את אות-ה-Kanban עם דיווח-הייצור — להימנע מדיווח-כפול ולחבר משיכה לרישום-מלאי אוטומטי.",
          processExampleHe: "מכל-Kanban מתרוקן ומדווח 'Empty'; לאחר מילוי, מעבר ל-'Full' מפעיל RP-confirmation שמבצע Backflush לרכיבים שנצרכו.",
          cbcHe: "ב-CBC אספקת-רכיבים לקו (פקקים/תוויות) מנוהלת ב-Kanban; מעבר-מכל ל-FULL מדווח אוטומטית RP בקו-המילוי.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► RP Confirmation for Kanban (OSPT)"],
          tables: ["T437", "PKHD", "PKPS"],
          tcodes: ["OSPT", "PK01", "PKBC"],
          fiori: ["F2336"],
          configHe: ["שלב RP-confirmation עם Control Cycle (PK01); קשר סטטוס-Kanban ל-Backflush ב-RP."],
          mistakesHe: ["RP-Kanban ללא Production Supply Area תקין ➔ אות לא מתורגם לדיווח.", "דיווח כפול ידני + Kanban ➔ צריכה כפולה."],
          troubleshootHe: ["סטטוס Kanban לא מפעיל דיווח ➔ קישור RP-confirmation/Control Cycle חסר."],
          bestPracticeHe: ["הימנע מדיווח-ידני מקביל ל-Kanban-driven RP.", "ודא Production Supply Area ו-Control Cycle תקינים."],
          interviewHe: [{ qHe: "כיצד Kanban מתחבר ל-Reporting Points ב-REM?", aHe: "שינוי-סטטוס Kanban ל-FULL מפעיל RP-confirmation אוטומטי שמבצע Backflush — מאחד pull-signal עם דיווח-ייצור." }],
          takeawaysHe: ["Kanban-FULL יכול להפעיל RP-confirmation.", "מחבר משיכה לדיווח אוטומטי.", "דורש Control Cycle ו-PSA."],
          relatedHe: [{ labelHe: "PP · Kanban", href: "/library/pp/chapter-09/" }],
        },
        {
          id: "5.1.5", titleHe: "רישום פעילויות (Activity Posting)", titleEn: "Activity Posting",
          execHe: "Activity Posting קובע אם בדיווח-Backflush נרשמות גם כמויות-Activity (זמן-מכונה/עבודה) מול ה-Product Cost Collector — כך עלות-העבודה זורמת לעלות-המוצר אוטומטית.",
          beginnerHe: "מעבר להורדת-חומרים, הדיווח יכול גם לרשום כמה 'זמן-עבודה' נצרך, כדי שעלות-המכונה והאדם ייכנסו לעלות-המוצר. ההגדרה מפעילה זאת.",
          consultantHe: "בפרופיל מסמנים Activity Backflush; הכמויות נגזרות מ-Standard Values ב-Rate Routing × תעריפי-Activity (KP26) ונרשמות מול ה-Cost Collector (KKF6N). אפשר Activity backflush בנפרד מ-Backflush-החומרים (Separated). ללא רישום-Activity העלויות סוטות ל-WIP/Variance.",
          purposeHe: "לזרום עלות-עבודה ועלות-מכונה לעלות-המוצר באופן אוטומטי וצמוד-לכמות, במקום הקצאה ידנית/תקופתית.",
          processExampleHe: "דיווח 5,000 יח': Activity 'זמן-מכונה' לפי Rate Routing נרשם מול ה-Cost Collector ומזכה את ה-Cost Center של הקו.",
          cbcHe: "ב-CBC זמן-מילוי וזמן-תפעול בקו נרשמים כ-Activity מול ה-Cost Collector של המשקה — כך עלות-הקו נכנסת לעלות-המשקה.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Activity Posting (OSPT)"],
          tables: ["T437", "AFRU", "COSP"],
          tcodes: ["OSPT", "MFBF", "KP26"],
          fiori: ["F1422"],
          configHe: ["סמן Activity Backflush בפרופיל; ודא Standard Values ב-Rate Routing ותעריפי-Activity (KP26)."],
          mistakesHe: ["Activity Backflush כבוי ➔ עלות-עבודה לא נרשמת, סטיות גדולות.", "תעריף KP26 חסר ➔ Activity בשווי אפס."],
          troubleshootHe: ["עלות-עבודה לא נכנסת לעלות-מוצר ➔ Activity Backflush כבוי או תעריף KP26 חסר."],
          bestPracticeHe: ["הפעל Activity Backflush בכל קו בעל עלות-המרה משמעותית.", "ודא תעריפי-Activity מעודכנים."],
          interviewHe: [{ qHe: "מה רושם Activity Posting ב-REM?", aHe: "כמויות-Activity (זמן-מכונה/עבודה) מול ה-Product Cost Collector, לפי Standard Values × תעריף KP26." }],
          takeawaysHe: ["Activity Posting = עלות-המרה אוטומטית.", "נגזר מ-Rate Routing × KP26.", "נרשם מול ה-Cost Collector."],
        },
        {
          id: "5.1.6", titleHe: "Backflush מופרד", titleEn: "Separated Backflush",
          execHe: "Separated Backflush מפצל את הדיווח: ניתן לבצע GR של המוצר-המוגמר בנפרד מ-GI של הרכיבים ומרישום-ה-Activity — מאפשר תזמון וטיפול-שגיאות שונה לכל רכיב-דיווח.",
          beginnerHe: "במקום שדיווח-אחד יעשה הכל בבת-אחת, אפשר 'לפצל': לקבל את המוצר עכשיו, ולהוריד את החומרים/לרשום עבודה בנפרד או מאוחר יותר. שימושי כשחלק מהמידע עוד לא מוכן.",
          consultantHe: "מסמנים Separated Backflush בפרופיל; ה-GR, ה-component-GI וה-Activity מתבצעים כצעדים נפרדים (אפשר ב-batch — MF45/MF42). מועיל כשרכיבים חסרים אך רוצים לזכות-מוצר, או כשרישום-Activity מתאחר. דורש משמעת ב-Postprocessing (COGI).",
          purposeHe: "לנתק תלות בין רכיבי-הדיווח — לזכות-מוצר גם כשצריכת-רכיב או Activity טרם נסגרו, ולטפל בכל אחד במסלולו.",
          processExampleHe: "GR למוצר מבוצע בסוף-משמרת; ה-component-backflush רץ ב-batch לילי (MF42), וה-Activity נרשם בנפרד — כל אחד עם error-log משלו.",
          cbcHe: "ב-CBC בעת מחסור-אצווה זמני: מזכים את המשקה-המוגמר (GR) ומשאירים את צריכת-הרכיב ל-Postprocessing מאוחר, כדי שהקו לא ייעצר.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Separated Backflush (OSPT)"],
          tables: ["T437", "AFRU", "AFFW"],
          tcodes: ["OSPT", "MF42", "MF45", "COGI"],
          fiori: ["F1422"],
          configHe: ["סמן Separated Backflush בפרופיל; הגדר ריצות-batch ל-component-GI ו-Activity (MF42)."],
          mistakesHe: ["פיצול ללא תהליך-Postprocessing מסודר ➔ צריכות 'נשכחות' ב-COGI/AFFW.", "GR ללא GI לאורך-זמן ➔ עיוות-עלות ו-WIP."],
          troubleshootHe: ["צריכת-רכיב לא נרשמה אחרי GR ➔ Separated Backflush פעיל וה-GI עוד ב-COGI/AFFW."],
          bestPracticeHe: ["השתמש בפיצול רק עם תהליך-Postprocessing יומי מבוקר.", "נטר את AFFW/COGI כדי לסגור צריכות-פתוחות."],
          interviewHe: [{ qHe: "מהו Separated Backflush?", aHe: "פיצול הדיווח כך ש-GR של המוצר מתבצע בנפרד מ-GI של הרכיבים ומרישום-ה-Activity, כל אחד במסלולו." }],
          takeawaysHe: ["מפצל GR מ-GI ומ-Activity.", "מאפשר זיכוי-מוצר ללא תלות-רכיב.", "דורש Postprocessing מבוקר (COGI/AFFW)."],
        },
        {
          id: "5.1.7", titleHe: "בקרת תהליך (Process Control)", titleEn: "Process Control",
          execHe: "Process Control קובע את התנהגות-המערכת בשגיאת-Backflush: תיקון מקוון (Online) שעוצר ודורש פתרון מיידי, מול שמירת-השגיאה ל-Postprocessing (COGI/MF47) שמאפשרת לדיווח להמשיך.",
          beginnerHe: "מה קורה כשחסר רכיב או יש בעיה בדיווח? אפשר לעצור ולתקן מיד, או לרשום את הבעיה ב'מגירת-תיקונים' (COGI) ולהמשיך לדווח. ההגדרה בוחרת את ההתנהגות.",
          consultantHe: "בפרופיל קובעים Process Control לכל סוג-תנועה: 1=Online correction (חוסם), 2=Postprocessing (שומר ל-AFFW/COGI). בקווים-עמוסים מעדיפים Postprocessing כדי לא לעצור; אך זה דורש ניטור-COGI יומי. ההחלטה הזו היא לב-ה-throughput של הקו.",
          purposeHe: "לאזן בין דיוק-מיידי לבין רציפות-הקו — לא לעצור ייצור-המוני על תקלת-מלאי נקודתית, אך לוודא שהשגיאות נסגרות.",
          processExampleHe: "רכיב חסר-מלאי בדיווח: Online ➔ הדיווח נחסם עד תיקון; Postprocessing ➔ הדיווח עובר, השגיאה נשמרת ב-COGI לטיפול מאוחר.",
          cbcHe: "ב-CBC קווי-המילוי מוגדרים Postprocessing — מחסור-אצווה זמני לא עוצר את הקו; צוות-המלאי סוגר COGI מדי-משמרת.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Process Control (OSPT)"],
          tables: ["T437", "AFFW"],
          tcodes: ["OSPT", "COGI", "MF47"],
          fiori: ["F1422"],
          configHe: ["קבע Process Control לכל תנועה: Online (חוסם) או Postprocessing (שומר ל-AFFW); נטר ב-COGI/MF47."],
          mistakesHe: ["Online בקו-עמוס ➔ כל תקלת-רכיב עוצרת דיווח.", "Postprocessing ללא ניטור-COGI ➔ צריכות-פתוחות מצטברות."],
          troubleshootHe: ["דיווח נחסם על שגיאת-רכיב ➔ Process Control = Online; שקול Postprocessing.", "צריכות-פתוחות מצטברות ➔ אין ניטור-COGI/MF47 שוטף."],
          bestPracticeHe: ["Postprocessing לקווים-רציפים + ניטור-COGI יומי.", "Online היכן שדיוק-מיידי קריטי ונפח נמוך."],
          interviewHe: [
            { qHe: "מה ההבדל Online מול Postprocessing ב-Process Control?", aHe: "Online חוסם את הדיווח עד תיקון-מיידי; Postprocessing מאפשר לדיווח להמשיך ושומר את השגיאה ב-AFFW/COGI לטיפול מאוחר." },
            { qHe: "כיצד מטפלים בשגיאות-Backflush שנשמרו?", aHe: "ב-COGI (או MF47) — בודקים, מתקנים מלאי/הקצאה, ומבצעים reprocess לסגירת ה-AFFW." },
          ],
          takeawaysHe: ["Process Control = התנהגות בשגיאת-Backflush.", "Online חוסם; Postprocessing ממשיך ושומר ל-COGI.", "Postprocessing דורש ניטור-COGI יומי."],
          relatedHe: [{ labelHe: "אובייקט · AFFW", href: "/library/pp/object/AFFW/" }],
        },
        {
          id: "5.1.8", titleHe: "קיבוע הזמנות מתוכננות", titleEn: "Firming Planned Orders",
          execHe: "ההגדרה קובעת אם הזמנות-מתוכננות של REM מקובעות (Firmed) כדי שהרצת-MRP הבאה לא תשנה אותן — חיוני לייצוב לוח-הייצור על הקו לאחר אישורו.",
          beginnerHe: "אחרי שמתכנן קבע מה הקו יייצר השבוע, לא רוצים ש-MRP 'ימחק ויבנה מחדש' את התוכנית. קיבוע 'נועל' את ההזמנות-המתוכננות כך שיישארו יציבות.",
          consultantHe: "Firming ב-REM נשען על Planning Time Fence (MARC-FXHOR) ועל סימון-קיבוע ידני בטבלת-התכנון (MF50). הזמנות מקובעות אינן זזות/נמחקות ב-MRP, אך נכנסות ל-Reduction בדיווח. שילוב נכון עם PTF מונע 'ריצוד-תוכנית' (nervousness).",
          purposeHe: "לייצב את לוח-הקו לטווח-קצר — לאפשר תכנון-משמרות, אספקת-רכיבים ו-Kanban בלי שינויים אוטומטיים תכופים.",
          processExampleHe: "תוכנית-קו לשבוע מקובעת ב-MF50; הרצת-MRP לילית אינה משנה את הכמויות בתוך ה-PTF, ורק מוסיפה דרישות מעבר לו.",
          cbcHe: "ב-CBC לוח-המילוי השבועי מקובע לאחר אישור-תכנון, כדי שאספקת-תרכיז וזמני-הקו יישארו יציבים מול תנודות-ביקוש קצרות.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Firming (OSPT)"],
          tables: ["T437", "PLAF", "MARC"],
          tcodes: ["OSPT", "MF50", "MD04"],
          fiori: ["F1422"],
          configHe: ["הגדר Firming בפרופיל; הסתמך על Planning Time Fence (MARC-FXHOR) וקיבוע-ידני ב-MF50."],
          mistakesHe: ["העדר Firming/PTF ➔ MRP משנה את לוח-הקו בכל ריצה (nervousness).", "קיבוע-יתר ➔ חוסם תגובה לביקוש אמיתי."],
          troubleshootHe: ["לוח-הקו 'קופץ' בכל הרצת-MRP ➔ אין Firming/PTF.", "MRP לא מעדכן דרישות חדשות ➔ קיבוע-יתר מעבר ל-PTF."],
          bestPracticeHe: ["שלב Firming עם Planning Time Fence התואם את אופק-היציבות.", "קבע PTF לפי זמן-אספקת-רכיבים ותכנון-משמרות."],
          interviewHe: [{ qHe: "מדוע מקבעים הזמנות-מתוכננות ב-REM?", aHe: "כדי שהרצת-MRP לא תשנה לוח-קו מאושר; מייצב תכנון-משמרות ואספקת-רכיבים בתוך ה-Planning Time Fence." }],
          takeawaysHe: ["Firming = נעילת לוח-הקו לטווח-קצר.", "נשען על Planning Time Fence (FXHOR).", "מונע ריצוד-תוכנית."],
        },
        {
          id: "5.1.9", titleHe: "קביעת מלאי אוטומטית", titleEn: "Automatic Stock Determination",
          execHe: "Automatic Stock Determination קובע מאיזה מלאי/Storage Location נצרכים הרכיבים ב-Backflush — לפי Stock Determination Rule/Group — בלי בחירה ידנית בכל דיווח.",
          beginnerHe: "כשמורידים חומרי-גלם בדיווח, SAP צריך לדעת מאיזה מחסן/סוג-מלאי למשוך. ההגדרה בוחרת זאת אוטומטית לפי כללים, כדי שלא תצטרך לבחור ידנית.",
          consultantHe: "מסתמך על Stock Determination Group (MARC) + Rule (OPK9-area) שקובעים סדר-עדיפויות בין Storage Locations וסוגי-מלאי (own/consignment). ב-REM ה-Backflush משתמש בכלל למשיכת-רכיבים אוטומטית; קריטי כשרכיב מאוחסן במספר מקומות או בקונסיגנציה.",
          purposeHe: "לאוטמט את מקור-המשיכה של רכיבים בדיווח-המוני — סדר-קבוע בין מחסנים/מלאים, מניעת בחירה-ידנית ושגיאות.",
          processExampleHe: "רכיב קיים גם במלאי-עצמי וגם בקונסיגנציה; כלל-הקביעה מושך קודם קונסיגנציה ואז עצמי — ה-Backflush בוחר אוטומטית.",
          cbcHe: "ב-CBC רכיבי-אריזה מאוחסנים בכמה Storage Locations ליד הקו; כלל-קביעת-מלאי מושך אוטומטית מהמיקום הקרוב/המועדף בדיווח.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Stock Determination (OSPT)"],
          tables: ["T437", "MARC", "T434G"],
          tcodes: ["OSPT", "OPK9", "MFBF"],
          fiori: ["F1422"],
          configHe: ["הגדר Stock Determination Group (MARC) ו-Rule; שייך סדר-עדיפויות בין Storage Locations/סוגי-מלאי."],
          mistakesHe: ["Group/Rule חסר ➔ Backflush נכשל או דורש בחירה-ידנית.", "סדר-עדיפויות שגוי ➔ משיכה ממלאי לא-נכון."],
          troubleshootHe: ["Backflush דורש בחירת-מלאי ידנית ➔ Stock Determination Group/Rule לא מוגדר.", "משיכה ממקור שגוי ➔ סדר-עדיפויות בכלל שגוי."],
          bestPracticeHe: ["הגדר כללים ברורים לרכיבי-קונסיגנציה ומלאי-עצמי.", "תאם Stock Determination עם פריסת-Storage Locations ליד הקו."],
          interviewHe: [{ qHe: "מה קובעת קביעת-מלאי אוטומטית ב-REM?", aHe: "מאיזה Storage Location/סוג-מלאי נמשכים רכיבים ב-Backflush, לפי Stock Determination Group + Rule, ללא בחירה ידנית." }],
          takeawaysHe: ["בוחר מקור-משיכת-רכיבים אוטומטית.", "מבוסס Group (MARC) + Rule.", "קריטי לקונסיגנציה/ריבוי-מחסנים."],
        },
        {
          id: "5.1.10", titleHe: "נוהל קביעת אצווה", titleEn: "Batch Determination Procedure",
          execHe: "ההגדרה מפעילה קביעת-אצווה אוטומטית ב-Backflush — בחירת אצוות-רכיב לצריכה (ולעיתים אצוות-מוצר ל-GR) לפי Batch Search Procedure, בלי הזנה ידנית.",
          beginnerHe: "כשרכיבים מנוהלים באצוות, צריך לבחור איזו אצווה לצרוך. ההגדרה גורמת ל-SAP לבחור אוטומטית לפי כללים (FIFO/תוקף), כדי שדיווח-המוני לא יעצור על בחירת-אצווה.",
          consultantHe: "נשען על Batch Search Procedure (CL/COB1) המשויך ל-REM; ב-Backflush המערכת מציעה/בוחרת אצוות-רכיב לפי Sort Rule (FEFO/תוקף). ב-S/4HANA אינטגרציה הדוקה עם Batch Management; חשוב לקווי-מזון/תרופות. ללא נוהל — בחירה ידנית בכל דיווח.",
          purposeHe: "לאוטמט בחירת-אצוות בדיווח-המוני לפי כללי-מלאי (FEFO/תוקף), לעמוד ברגולציה ולמנוע עצירת-קו על בחירה-ידנית.",
          processExampleHe: "Backflush של תרכיז מנוהל-אצווה: ה-Batch Search Procedure בוחר אוטומטית את האצווה עם התוקף-הקצר-ביותר (FEFO).",
          cbcHe: "ב-CBC כל רכיבי-המשקה מנוהלי-אצווה; קביעת-אצווה אוטומטית FEFO מבטיחה צריכת-תרכיז לפי תוקף ועקיבות מלאה (traceability).",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Batch Determination (OSPT)"],
          tables: ["T437", "CUVTAB", "MCH1"],
          tcodes: ["OSPT", "COB1", "MFBF"],
          fiori: ["F1422"],
          configHe: ["שייך Batch Search Procedure ל-REM; הגדר Sort Rule (FEFO/תוקף) לבחירה אוטומטית בדיווח."],
          mistakesHe: ["העדר Batch Search Procedure ➔ בחירה-ידנית עוצרת דיווח-המוני.", "Sort Rule שגוי ➔ צריכת-אצווה לא לפי תוקף."],
          troubleshootHe: ["Backflush דורש בחירת-אצווה ידנית ➔ אין Batch Search Procedure ל-REM.", "צריכת-אצווה שגויה ➔ Sort Rule (FEFO) לא מוגדר נכון."],
          bestPracticeHe: ["הגדר FEFO לרכיבים פגי-תוקף.", "תאם את נוהל-האצווה עם תהליכי ה-QM ועקיבות-המזון."],
          interviewHe: [{ qHe: "מדוע צריך נוהל קביעת-אצווה ב-REM?", aHe: "כדי לבחור אצוות-רכיב אוטומטית ב-Backflush לפי כללי FEFO/תוקף — מניעת עצירת-קו על בחירה-ידנית ועמידה ברגולציה." }],
          takeawaysHe: ["קביעת-אצווה אוטומטית ב-Backflush.", "נשען על Batch Search Procedure + Sort Rule.", "FEFO קריטי למזון/תרופות."],
          relatedHe: [{ labelHe: "PP · ניהול אצוות", href: "/library/pp/chapter-10/" }],
        },
        {
          id: "5.1.11", titleHe: "צמצום כמויות הזמנה מתוכננת", titleEn: "Reduction in Planned Order Quantities",
          execHe: "Reduction קובע שדיווח-Backflush מצמצם אוטומטית את כמות ההזמנה-המתוכננת המתאימה — כך שהביקוש שכבר יוצר אינו נספר פעמיים בתכנון.",
          beginnerHe: "אחרי שדיווחת על ייצור, צריך 'למחוק' את הכמות שכבר יוצרה מהתוכנית, כדי ש-MRP לא יתכנן אותה שוב. ה-Reduction עושה זאת אוטומטית בכל דיווח.",
          consultantHe: "ב-REM הדיווח (MFBF) מצמצם את ה-Planned Order/Run Schedule Quantity לפי הכמות-המדווחת, בתוך Reduction Period מוגדר. בלי Reduction נוצרת ספירה-כפולה בתכנון. מצב ה-firming משפיע: הזמנות-מקובעות מצטמצמות אך אינן נמחקות ע\"י MRP.",
          purposeHe: "למנוע ספירה-כפולה — לסנכרן את התוכנית למציאות-הייצור כך שדרישה-שדווחה לא תתוכנן מחדש.",
          processExampleHe: "הזמנה-מתוכננת ל-10,000; דיווח 4,000 ב-MFBF מצמצם אוטומטית את ההזמנה ל-6,000 הנותרים — אין יצירת-דרישה כפולה.",
          cbcHe: "ב-CBC דיווח-קו יומי מצמצם את לוח-המילוי השבועי; הכמות-שיוצרה יורדת מהתוכנית, וה-MRP מתכנן רק את היתרה.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Reduction (OSPT)"],
          tables: ["T437", "PLAF"],
          tcodes: ["OSPT", "MFBF", "MD04"],
          fiori: ["F1422"],
          configHe: ["הפעל Reduction בפרופיל; ודא Reduction Period מתאים (ראה 5.1.12)."],
          mistakesHe: ["Reduction כבוי ➔ ספירה-כפולה והזמנות-יתר.", "Reduction Period קצר/ארוך מדי ➔ צמצום שגוי של ההזמנה הלא-נכונה."],
          troubleshootHe: ["הזמנות-מתוכננות לא יורדות אחרי דיווח ➔ Reduction כבוי או Reduction Period לא מכסה את ההזמנה."],
          bestPracticeHe: ["הפעל Reduction תמיד ב-REM אמיתי.", "כייל את Reduction Period לפי קצב-הדיווח."],
          interviewHe: [{ qHe: "מה מבצע Reduction ב-REM?", aHe: "מצמצם אוטומטית את כמות ההזמנה-המתוכננת בדיווח-Backflush, כדי שדרישה-שיוצרה לא תיספר ולא תתוכנן פעמיים." }],
          takeawaysHe: ["Reduction מסנכרן תוכנית למציאות.", "מונע ספירה-כפולה.", "עובד בתוך Reduction Period."],
        },
        {
          id: "5.1.12", titleHe: "תקופת צמצום (Reduction Period)", titleEn: "Reduction Period",
          execHe: "Reduction Period מגדיר את חלון-הזמן (בימים) שבתוכו דיווח-Backflush מחפש הזמנה-מתוכננת לצמצום — נקודת-המפתח שקובעת איזו הזמנה 'תיסגר' בדיווח.",
          beginnerHe: "כשמדווחים, SAP מחפש איזו הזמנה-מתוכננת לצמצם. ה-Reduction Period הוא 'כמה ימים אחורה/קדימה' לחפש. הגדרה לא-נכונה תצמצם את ההזמנה הלא-נכונה.",
          consultantHe: "ה-Period מגדיר טווח-ימים סביב תאריך-הדיווח לבחירת ההזמנה-המתוכננת לצמצום (לרוב backward ואז forward). חשוב כשיש הזמנות יומיות מרובות; period רחב מדי 'יבלע' הזמנות-עתידיות, צר מדי ישאיר הזמנות-עבר פתוחות. נקבע ברמת-הפרופיל.",
          purposeHe: "לכוון את Reduction להזמנה-הנכונה — לאזן בין סגירת-הזמנות-עבר לבין אי-בליעת הזמנות-עתיד.",
          processExampleHe: "Reduction Period של 5 ימים: דיווח היום סוגר הזמנות מתוכננות מהיומיים-האחרונים ומהיומיים-הבאים, אך לא הזמנה לשבוע הבא.",
          cbcHe: "ב-CBC עם לוח-מילוי יומי, Reduction Period קצר (1–2 ימים) מבטיח שהדיווח סוגר את הזמנת-היום ולא בולע הזמנות-מחר.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Reduction Period (OSPT)"],
          tables: ["T437", "PLAF"],
          tcodes: ["OSPT", "MFBF"],
          fiori: ["F1422"],
          configHe: ["הגדר Reduction Period (ימים) בפרופיל; כייל לפי תדירות-הזמנות וקצב-הדיווח."],
          mistakesHe: ["Period רחב מדי ➔ דיווח בולע הזמנות-עתידיות.", "Period צר מדי ➔ הזמנות-עבר נשארות פתוחות."],
          troubleshootHe: ["דיווח סוגר הזמנה לא-נכונה ➔ Reduction Period רחב/צר מדי.", "הזמנות-עבר נשארות ➔ Period קצר מדי."],
          bestPracticeHe: ["כייל Period לתדירות-ההזמנות (יומי ➔ 1–2 ימים).", "בחן את ההתנהגות מול MD04 לאחר דיווח."],
          interviewHe: [{ qHe: "מה משפיע Reduction Period?", aHe: "את חלון-הזמן שבו הדיווח מחפש הזמנה-מתוכננת לצמצום — קובע איזו הזמנה תיסגר; רחב מדי בולע עתיד, צר מדי משאיר עבר." }],
          takeawaysHe: ["Reduction Period = חלון-החיפוש לצמצום.", "מכוון את הסגירה להזמנה-הנכונה.", "כייל לתדירות-ההזמנות."],
        },
        {
          id: "5.1.13", titleHe: "יצירת הזמנות חדשות בביטול קבלת טובין", titleEn: "Creating New Planned Orders on Goods Receipts Reversals",
          execHe: "ההגדרה קובעת אם ביטול-GR (היפוך-דיווח) מחזיר אוטומטית הזמנה-מתוכננת לתוכנית — כדי שהביקוש שבוטל ייכנס מחדש לתכנון במקום 'להיעלם'.",
          beginnerHe: "אם דיווחת בטעות וביטלת, הכמות-שצומצמה צריכה לחזור לתוכנית. ההגדרה גורמת לכך ש-SAP יוצר מחדש את ההזמנה-המתוכננת אוטומטית עם הביטול.",
          consultantHe: "בעת היפוך-דיווח (reversal), אם מסומן, המערכת יוצרת מחדש הזמנה-מתוכננת בגובה הכמות-המבוטלת (היפוך ה-Reduction). בלי זה הדרישה אובדת והתכנון לא-מאוזן עד הרצת-MRP הבאה. רלוונטי לתיקוני-דיווח שגרתיים בקו.",
          purposeHe: "לשמור על איזון-תכנון בתיקוני-דיווח — להבטיח שכמות-שבוטלה חוזרת כדרישה במקום ליצור חוסר.",
          processExampleHe: "דיווח 4,000 צומצם מהזמנה; היפוך-הדיווח יוצר מחדש 4,000 כהזמנה-מתוכננת, וה-MD04 חוזר למצב שלפני הדיווח השגוי.",
          cbcHe: "ב-CBC ביטול-דיווח עקב כשל-קו (מילוי פגום) מחזיר אוטומטית את כמות-המילוי לתוכנית, כך שהקו יתזמן אותה מחדש.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Reversal Behavior (OSPT)"],
          tables: ["T437", "PLAF", "AFRU"],
          tcodes: ["OSPT", "MF41", "MFBF"],
          fiori: ["F1422"],
          configHe: ["הפעל 'Create planned order on GR reversal' בפרופיל; ודא היפוך-ה-Reduction מתבצע יחד."],
          mistakesHe: ["כיבוי ➔ ביטול-דיווח יוצר חוסר-תכנון לא-צפוי.", "ציפייה ליצירה-אוטומטית בלי הסימון."],
          troubleshootHe: ["דרישה 'נעלמה' אחרי ביטול-דיווח ➔ הסימון כבוי; הרץ MRP או הפעל את ההגדרה."],
          bestPracticeHe: ["הפעל היכן שתיקוני-דיווח שגרתיים.", "בדוק MD04 לאחר ביטול לוודא חזרת-דרישה."],
          interviewHe: [{ qHe: "מה קורה ב-REM בביטול-GR אם ההגדרה פעילה?", aHe: "המערכת יוצרת מחדש הזמנה-מתוכננת בגובה הכמות-המבוטלת (היפוך-Reduction), כדי לשמור על איזון-התכנון." }],
          takeawaysHe: ["ביטול-GR יכול ליצור הזמנה-מתוכננת מחדש.", "היפוך אוטומטי של ה-Reduction.", "שומר איזון-תכנון בתיקונים."],
        },
        {
          id: "5.1.14", titleHe: "תיקון שגיאות מקוון", titleEn: "Online Error Correction",
          execHe: "Online Error Correction קובע שדיווח-Backflush שנכשל מוצג מיד לתיקון-מקוון — המשתמש פותר את השגיאה בו-במקום במקום שהיא תישמר ל-Postprocessing.",
          beginnerHe: "כשדיווח נתקל בבעיה (חסר מלאי/אצווה), במצב-מקוון SAP מציג מסך-תיקון מיד ומבקש לפתור עכשיו, ולא 'דוחה' את הבעיה ל-COGI.",
          consultantHe: "זוהי קצה ה-Online ב-Process Control: השגיאה מוצגת ב-dialog לתיקון-מיידי (בחירת-אצווה/מלאי, הקצאה). מתאים לסביבות נפח-נמוך/דיוק-גבוה. בקווים-עמוסים הוא חוסם-throughput, ולכן רבים מעדיפים Postprocessing במקום.",
          purposeHe: "להבטיח דיוק-מיידי — לא לאפשר דיווח שגוי 'לעבור', אלא לחייב פתרון-בזמן-אמת.",
          processExampleHe: "MFBF נתקל בחוסר-אצווה ➔ נפתח dialog-תיקון; המשתמש בוחר אצווה חלופית והדיווח מושלם מיד, ללא רישום ב-COGI.",
          cbcHe: "ב-CBC משתמשים ב-Online Correction בעיקר בייצור-פיילוט/אצוות-מיוחדות נמוכות-נפח, שם דיוק-מיידי חשוב יותר מ-throughput.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Online Correction (OSPT)"],
          tables: ["T437", "AFFW"],
          tcodes: ["OSPT", "MFBF", "COGI"],
          fiori: ["F1422"],
          configHe: ["קבע Process Control = Online correction עבור התנועות; השגיאה תוצג ב-dialog לתיקון-מיידי."],
          mistakesHe: ["Online בקו-עמוס ➔ חסימת-throughput וזמני-המתנה.", "ערבוב Online/Postprocessing לא-עקבי בין תנועות."],
          troubleshootHe: ["דיווח נעצר עם מסך-תיקון בכל שגיאה ➔ Online correction פעיל; שקול Postprocessing לקווים-עמוסים."],
          bestPracticeHe: ["השתמש ב-Online בנפח-נמוך/דיוק-גבוה בלבד.", "בקווים-רציפים העדף Postprocessing."],
          interviewHe: [{ qHe: "מתי מתאים Online Error Correction?", aHe: "בסביבות נפח-נמוך/דיוק-גבוה, שם עדיף לעצור ולתקן מיד; בקווים-עמוסים הוא חוסם-throughput ועדיף Postprocessing." }],
          takeawaysHe: ["Online = תיקון-מיידי בדיווח.", "מבטיח דיוק אך חוסם throughput.", "מנוגד ל-Postprocessing (COGI)."],
        },
        {
          id: "5.1.15", titleHe: "תחזוקת יומן שגיאות לעיבוד חוזר", titleEn: "Error Log Maintenance for Reprocessing",
          execHe: "כשמשתמשים ב-Postprocessing, שגיאות-Backflush נשמרות ב-Error Log (AFFW) ומטופלות ב-COGI/MF47: בדיקה, תיקון ו-reprocess. תחזוקת-היומן היא תהליך-שגרה קריטי לבריאות-המלאי.",
          beginnerHe: "כל שגיאת-דיווח שלא נעצרה מיד נשמרת ב'יומן-שגיאות'. מישהו צריך לפתוח את היומן (COGI), לתקן את הסיבה (למשל להזמין מלאי), ולהריץ מחדש — אחרת הצריכות נשארות פתוחות.",
          consultantHe: "ה-Error Log (AFFW) מצטבר מ-Postprocessing; COGI/MF47 מאפשרים סינון, תיקון-המוני ו-reprocess. צריכות-פתוחות מעוותות מלאי ו-WIP/Variance. דרושה אחריות-תפעולית יומית (owner) ומדדי-גיל לרשומות-פתוחות. ב-S/4HANA קיימים Fiori monitors מקבילים.",
          purposeHe: "להבטיח שכל צריכה/תנועה שנדחתה ל-Postprocessing נסגרת בזמן — כדי לשמור על דיוק-מלאי, WIP ועלות.",
          processExampleHe: "COGI מציג 12 רשומות חסרות-מלאי; צוות-המלאי מבצע קבלת-טובין לרכיב, ואז reprocess ב-COGI סוגר את כל ה-12 בבת-אחת.",
          cbcHe: "ב-CBC ניהול-COGI יומי מובנה במשמרת: כל רשומות ה-Backflush הפתוחות נסגרות לפני סוף-משמרת, כדי שמלאי-הרכיבים יהיה מדויק לתכנון-הלילה.",
          navHe: ["Production ► Repetitive Manufacturing ► Goods Movements ► Postprocessing of Error Records (COGI/MF47)"],
          tables: ["AFFW", "T437"],
          tcodes: ["COGI", "MF47", "COGL"],
          fiori: ["F1422"],
          configHe: ["ודא Process Control = Postprocessing; הגדר אחריות-תפעולית ל-COGI יומי וניטור-גיל לרשומות."],
          mistakesHe: ["אי-טיפול ב-COGI ➔ צריכות-פתוחות מצטברות ומעוותות מלאי.", "Reprocess בלי לתקן את שורש-הבעיה ➔ השגיאה חוזרת."],
          troubleshootHe: ["מלאי-רכיב לא יורד אף שדווח ➔ הצריכה תקועה ב-AFFW/COGI; תקן ובצע reprocess.", "ערכי-WIP מנופחים ➔ צריכות פתוחות רבות ב-COGI."],
          bestPracticeHe: ["קבע owner ושגרת-COGI יומית.", "נטר גיל-רשומות; אל תאפשר הצטברות."],
          interviewHe: [
            { qHe: "מהו AFFW והיכן מטפלים בו?", aHe: "טבלת ה-Error Log של Backflush; מטפלים בה ב-COGI/MF47 — בדיקה, תיקון שורש-בעיה ו-reprocess." },
            { qHe: "מדוע ניטור-COGI קריטי?", aHe: "צריכות-פתוחות מעוותות מלאי, WIP ועלות; ניטור יומי מבטיח דיוק לתכנון ולחשבונאות." },
          ],
          takeawaysHe: ["Postprocessing נשמר ב-AFFW; נסגר ב-COGI/MF47.", "ניטור יומי מחויב לבריאות-מלאי.", "תקן שורש-בעיה לפני reprocess."],
          relatedHe: [{ labelHe: "אובייקט · AFFW", href: "/library/pp/object/AFFW/" }],
        },
        {
          id: "5.1.16", titleHe: "סוגי תנועה לרישומי מלאי", titleEn: "Movement Types for Stock Postings",
          execHe: "ההגדרה קובעת אילו Movement Types משמשים את ה-REM לרישומי-מלאי: GR למוצר (131/132 לביטול), GI/Backflush לרכיבים (261/262), ותנועות נוספות. תיאום נכון עם MM/FI חיוני.",
          beginnerHe: "כל תנועת-מלאי ב-SAP נושאת 'קוד-תנועה' שמסביר מה קרה. ב-REM, ההגדרה קובעת אילו קודים משמשים לקבלת-מוצר ולהורדת-רכיבים — וכל קוד מקושר לחשבונאות מסוימת.",
          consultantHe: "ברירת-מחדל: 131 (REM GR), 132 (reversal), 261 (component GI), 262 (reversal). ה-Movement Types מקושרים ל-Account Determination (OBYC) דרך Value/Transaction keys. שינוי או הוספת תנועה דורש תיאום מלא עם FI כדי לא לשבור רישום-עלות. נשלט ב-T156 וברמת-הפרופיל.",
          purposeHe: "להבטיח שכל תנועת-REM נרשמת בקוד-תנועה הנכון, מקושר לחשבונאות הנכונה — בסיס לדיוק-מלאי ולעלות-מוצר.",
          processExampleHe: "MFBF: 131 מזכה מלאי-מוצר ומחייב חשבון-מלאי-מוגמר; 261 מזכה מלאי-רכיב ומחייב את ה-Cost Collector — הכל לפי OBYC.",
          cbcHe: "ב-CBC קווי-המילוי משתמשים ב-131/261 הסטנדרטיים; כל שינוי-תנועה עובר אישור-FI כדי לשמר את מבנה-העלות של המשקה.",
          navHe: [
            "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Movement Types (OSPT)",
            "Materials Management ► Inventory Management ► Movement Types ► Define (OMJJ)",
          ],
          tables: ["T156", "T437", "MSEG"],
          tcodes: ["OSPT", "OMJJ", "MFBF"],
          fiori: ["F1422"],
          configHe: ["ודא Movement Types ל-GR(131)/GI(261) ולהיפוכיהם; תאם Account Determination (OBYC) עם FI."],
          mistakesHe: ["שינוי Movement Type ללא תיאום-FI ➔ שגיאת account determination.", "שימוש בקוד שגוי ➔ רישום-עלות/מלאי לא-נכון."],
          troubleshootHe: ["שגיאת 'Account determination' ב-MFBF ➔ OBYC לא מוגדר ל-Movement Type/Valuation Class.", "מלאי נרשם בחשבון שגוי ➔ Movement Type/Account Determination שגוי."],
          bestPracticeHe: ["היצמד ל-131/261 הסטנדרטיים אלא אם יש צורך מובהק.", "כל שינוי-תנועה עובר אישור MM+FI."],
          interviewHe: [{ qHe: "אילו Movement Types משמשים REM?", aHe: "131/132 ל-GR של המוצר ו-261/262 ל-GI/Backflush של רכיבים, מקושרים ל-Account Determination (OBYC)." }],
          takeawaysHe: ["131=GR, 261=GI הם ברירת-המחדל ב-REM.", "מקושרים ל-OBYC/FI.", "שינוי דורש תיאום MM+FI."],
        },
        {
          id: "5.1.17", titleHe: "מתן שם לפרופיל ייצור חוזר", titleEn: "Naming the Repetitive Manufacturing Profile",
          execHe: "מתן-שם ומפתח לפרופיל הוא הצעד שהופך את אוסף-ההגדרות לרשומה ניתנת-להקצאה. מוסכמת-שמות עקבית (לפי קו/תהליך) מקלה על תחזוקה והקצאה נכונה לחומרים.",
          beginnerHe: "אחרי שהגדרת את כל ההתנהגויות, נותנים לפרופיל מזהה ושם. שם ברור (למשל 'FILL01 — קו מילוי') מבטיח שתקצה את הפרופיל הנכון לחומר הנכון.",
          consultantHe: "מפתח-הפרופיל (4 תווים) נשמר ב-T437 ומוקצה ב-MARC-SFEPR. מוסכמת-שמות לפי טיפוס-קו/תהליך מונעת הקצאות-שגויות בנוף של עשרות חומרים. תעד את משמעות כל פרופיל במסמך-עיצוב.",
          purposeHe: "להפוך את הקונפיגורציה לישות מזוהה ובת-הקצאה, ולמנוע בלבול בין פרופילים בעת תחזוקה והרחבת-חומרים.",
          processExampleHe: "פרופיל 'FL01' מתואר 'קו-מילוי סטנדרטי, Postprocessing, Auto-GR' — קל לזהות ולהקצות לכל FERT-משקה.",
          cbcHe: "ב-CBC מוסכמת-שמות לפי בית-מלאכה/קו (למשל 'PETx', 'CANx') מקלה על הקצאת-פרופיל נכונה לעשרות SKU של משקאות.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define REM Profiles ► Profile Key & Description (OSPT)"],
          tables: ["T437", "MARC"],
          tcodes: ["OSPT", "MM02"],
          fiori: ["F1422"],
          configHe: ["הענק מפתח (4 תווים) ותיאור-ברור לפרופיל לפי מוסכמת-שמות אחידה; תעד משמעות."],
          mistakesHe: ["שמות גנריים/מבלבלים ➔ הקצאה שגויה לחומרים.", "ריבוי פרופילים כמעט-זהים ללא תיעוד."],
          troubleshootHe: ["חומר עם התנהגות-דיווח לא-צפויה ➔ הוקצה פרופיל שגוי (בדוק MARC-SFEPR)."],
          bestPracticeHe: ["מוסכמת-שמות לפי קו/תהליך.", "תעד כל פרופיל במסמך-עיצוב ושמור מינימום-פרופילים."],
          interviewHe: [{ qHe: "מדוע חשובה מוסכמת-שמות לפרופילי-REM?", aHe: "כדי למנוע הקצאת-פרופיל שגויה (MARC-SFEPR) בנוף של עשרות חומרים — שם ברור משקף קו/תהליך והתנהגות-דיווח." }],
          takeawaysHe: ["שם+מפתח הופכים את הפרופיל לבר-הקצאה.", "מוסכמת-שמות מונעת הקצאות-שגויות.", "תעד ושמור מינימום-פרופילים."],
        },
        {
          id: "5.1.18", titleHe: "סיכום הגדרות פרופיל הייצור החוזר", titleEn: "Summary of Repetitive Manufacturing Profile Settings",
          execHe: "סיכום ה-REM Profile: רשומה אחת ב-T437 המאגדת Production Type, Reporting Points, תנועות-אוטומטיות, Activity/Separated Backflush, Process Control, Firming, Stock/Batch Determination, Reduction ו-Movement Types — ומוקצית לחומר ב-MARC-SFEPR.",
          beginnerHe: "זהו 'ריכוז-כל-ההגדרות': הפרופיל אומר איך מדווחים, מה יורד מהמלאי, איך מתמודדים עם שגיאות, ואיך התוכנית מתעדכנת. מגדירים פעם אחת ומחברים לחומרים.",
          consultantHe: "צ'ק-ליסט-יישום: (1) Production Type+REM Indicator; (2) Auto goods movements + Movement Types; (3) Activity/Separated Backflush מול ה-Cost Collector; (4) Process Control (Online/Postprocessing)+COGI; (5) Firming+PTF; (6) Stock/Batch Determination; (7) Reduction+Period; (8) שם+הקצאה (SFEPR). שגיאה בכל אחד מתפשטת לכל דיווחי-הקו.",
          purposeHe: "לספק מבט-על אינטגרטיבי לפני הקצאה — לוודא שכל ההחלטות עקביות זו עם זו ועם נתוני-האב/החשבונאות.",
          processExampleHe: "לפני העלאת-קו לאוויר: עוברים על צ'ק-ליסט-הפרופיל, מבצעים דיווח-בדיקה ב-MFBF, מאמתים GR/GI/Activity ב-MD04/COOIS ו-COGI נקי.",
          cbcHe: "ב-CBC כל קו-מילוי חדש עובר אימות-פרופיל מקצה-לקצה (Backflush+Activity+COGI) לפני ייצור-מסחרי, כחלק מ-cutover.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define REM Profiles (OSPT) — review all tabs"],
          tables: ["T437", "MARC", "AFFW", "PLAF"],
          tcodes: ["OSPT", "MFBF", "COGI", "MD04"],
          fiori: ["F1422"],
          configHe: ["עבור על כל לשוניות-הפרופיל; ודא עקביות פנימית ותאימות ל-Production Version, Cost Collector ו-FI."],
          mistakesHe: ["הגדרת-לשונית בודדת בלי לבדוק את השפעתה על כל המכלול.", "העלאת-קו ללא דיווח-בדיקה מקצה-לקצה."],
          troubleshootHe: ["התנהגות-דיווח לא-עקבית ➔ סתירה בין לשוניות-הפרופיל; עבור על הצ'ק-ליסט.", "כשל מקצה-לקצה ➔ חוסר תאימות ל-Cost Collector/Production Version."],
          bestPracticeHe: ["נהל צ'ק-ליסט-פרופיל לכל קו.", "בצע דיווח-בדיקה מלא לפני go-live ואמת COGI נקי."],
          interviewHe: [{ qHe: "מה כולל REM Profile מלא?", aHe: "Production Type, Reporting Points, תנועות-אוטומטיות, Activity/Separated Backflush, Process Control, Firming, Stock/Batch Determination, Reduction+Period ו-Movement Types — מוקצה ב-MARC-SFEPR." }],
          takeawaysHe: ["הפרופיל מאגד את כל החלטות-הביצוע של REM.", "צ'ק-ליסט אינטגרטיבי לפני הקצאה.", "אמת מקצה-לקצה (MFBF/COGI/MD04) לפני go-live."],
          relatedHe: [{ labelHe: "PP · אב חומר לייצור (3.1)", href: "/library/pp/chapter-03/#sub-3.1" }],
        },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2", titleHe: "נקודות דיווח (Reporting Points)", titleEn: "Reporting Points",
      execHe:
        "Reporting Points בייצור-חוזר הן פעולות-מפתח ב-Rate Routing שבהן מדווחים התקדמות-ביניים ומבצעים Backflush חלקי. הן מספקות נראות-WIP לאורך הקו ומאפשרות לפצל את הדיווח לשלבים במקום דיווח-סיום-בלבד.",
      beginnerHe:
        "במקום לדווח רק על מוצר-גמור, מציבים 'תחנות-ביקורת' לאורך הקו. בכל תחנה (Reporting Point) מדווחים כמה יחידות עברו, וכך יודעים בכל רגע איפה החומר נמצא וכמה כבר נצרך.",
      consultantHe:
        "RP מוגדרות ברמת-הפרופיל (5.1.2) ומסומנות כפעולות ב-Rate Routing; הדיווח (MF41) צורך את רכיבי-הפעולות עד אותה נקודה ומעדכן WIP-by-RP. ה-RP מאוחסנות מול ה-Run Schedule/Cost Collector. מתאים לקווים-ארוכים עם שלבים-משמעותיים; שימוש-יתר מוסיף עומס-דיווח.",
      purposeHe:
        "לקבל נראות-התקדמות ו-WIP מדויק לאורך-קו ארוך, ולאפשר זיהוי-צווארי-בקבוק ודיווח-חלקי תקין.",
      processExampleHe:
        "קו עם שלושה RP — סוף-ערבול, סוף-מילוי, סוף-אריזה. דיווח בכל RP צורך את רכיבי-השלב ומראה כמה יחידות 'תקועות' בין שלבים.",
      cbcHe:
        "ב-CBC RP בסוף-ערבול וב-סוף-מילוי מאפשרים מעקב-WIP לאצוות-משקה גדולות, וזיהוי מהיר של עיכוב בין הערבול למילוי.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Activate Reporting Points (OSPT)",
        "Production ► Basic Data ► Routing ► Rate Routing ► mark operations as Reporting Points (CA21/CA22)",
      ],
      tables: ["PLPO", "AFRU", "T437"],
      tcodes: ["CA21", "CA22", "MF41", "MFBF"],
      fiori: ["F2336"],
      configHe: [
        "הפעל Reporting Points בפרופיל (5.1.2).",
        "סמן פעולות-מפתח ב-Rate Routing כ-RP (Milestone-like).",
        "ודא הקצאת-רכיבים לפעולות כך שצריכת-RP מדויקת.",
      ],
      flow: [
        { he: "הפעלת RP בפרופיל", code: "OSPT" },
        { he: "סימון פעולות-RP", code: "CA22" },
        { he: "דיווח ב-RP", code: "MF41" },
        { he: "עדכון WIP", code: "MD04" },
      ],
      masterDataHe: [
        "Rate Routing (סוג R) — פעולות מסומנות RP · PLPO נושאת את סימון-ה-RP.",
        "Component Allocation לפעולות קובעת אילו רכיבים נצרכים בכל RP.",
      ],
      mistakesHe: [
        "הפעלת RP בפרופיל בלי סימון-פעולות ב-Rate Routing.",
        "ריבוי RP מיותר ➔ עומס-דיווח על הרצפה.",
        "הקצאת-רכיבים שגויה לפעולות ➔ צריכת-RP לא-מדויקת.",
      ],
      troubleshootHe: [
        "דיווח-ביניים לא אפשרי ➔ אין פעולה מסומנת RP ב-Rate Routing.",
        "WIP לא מתעדכן בין RP ➔ רכיבים לא מוקצים לפעולות הנכונות.",
      ],
      bestPracticeHe: [
        "הצב RP במעט נקודות-מפתח בלבד.",
        "התאם הקצאת-רכיבים ל-RP לדיוק-WIP.",
        "השתמש ב-RP בקווים-ארוכים בלבד; בקו-קצר דיווח-סיום מספיק.",
      ],
      interviewHe: [
        { qHe: "מה מאפשרות Reporting Points ב-REM?", aHe: "Backflush חלקי ודיווח-התקדמות באבני-דרך לאורך הקו, עם שיקוף WIP-by-RP מדויק." },
        { qHe: "מה צריך כדי ש-RP יפעלו?", aHe: "הפעלה בפרופיל (5.1.2) + סימון פעולות כ-RP ב-Rate Routing + הקצאת-רכיבים לפעולות." },
      ],
      takeawaysHe: [
        "RP = אבני-דרך לדיווח-ביניים ו-Backflush חלקי.",
        "דורשות הפעלה בפרופיל + סימון פעולות ב-Rate Routing.",
        "מדייקות WIP בקווים-ארוכים; הימנע משימוש-יתר.",
      ],
      relatedHe: [
        { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
        { labelHe: "אובייקט · PLPO", href: "/library/pp/object/PLPO/" },
      ],
    },
    // ============================================================ 5.3 (parent label corrected: source "Automatic GR" → "Planning Table", matching children 5.3.1/5.3.2)
    {
      id: "5.3", titleHe: "טבלת התכנון (Planning Table)", titleEn: "Planning Table",
      execHe:
        "טבלת-התכנון (MF50) היא לוח-העבודה המרכזי של REM: היא מציגה הזמנות-מתוכננות לפי תקופה וקו-ייצור, ומאפשרת לתכנן, לפזר ולקבע כמויות-ייצור על הקווים בצורה ויזואלית. זהו ה'מצביא' שבו המתכנן מאזן ביקוש מול קיבולת-קו.",
      beginnerHe:
        "Planning Table היא טבלה גדולה: בשורות — חומרים/קווים, בעמודות — תקופות (ימים/שבועות). בכל תא רואים ומזינים כמה לייצר. כך המתכנן 'מצייר' את לוח-הייצור ומפזר עומס בין קווים ותקופות.",
      consultantHe:
        "MF50 מציגה Run Schedule Quantities לפי Production Line (Work Center) ותקופה, עם בדיקת-קיבולת מובנית. ניתן להזין/לפזר כמויות, לקבע (firm), ולהפיק הזמנות-מתוכננות-REM. ההצגה נשלטת ע\"י Entry Parameters (5.3.1) ו-Row Selection (5.3.2). נתמכת אינטגרציה לקיבולת ול-MRP.",
      purposeHe:
        "לתת למתכנן-הקו כלי ויזואלי לאיזון-עומס בין קווים ותקופות — תכנון-קצב (rate-based) במקום ניהול-פק\"ע בודדות.",
      processExampleHe:
        "מתכנן פותח MF50 לשבוע, רואה 50,000 דרישה מול קיבולת-קו 40,000/יום, מפזר את הכמות על שלושה ימים, מקבע, ומפיק הזמנות-מתוכננות לדיווח.",
      cbcHe:
        "ב-CBC מתכנן-המילוי משתמש ב-MF50 לפיזור ביקוש-המשקאות בין קווי-PET ו-CAN לאורך-השבוע, תוך איזון מול קיבולת-קו וזמינות-תרכיז.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Planning ► Planning Table (MF50)",
        "Logistics ► Production ► Repetitive Manufacturing ► Planning ► Change Planning Table",
      ],
      tables: ["PLAF", "CRHD", "T437"],
      tcodes: ["MF50", "MF51", "MF52", "MD04"],
      fiori: ["F2336", "F1422"],
      configHe: [
        "Entry Parameters (5.3.1): טווח-תקופות, קו/מפעל, אופק-תכנון להצגה.",
        "Row Selection (5.3.2): אילו שורות-מידע (קיבולת/מלאי/דרישה) מוצגות.",
        "אינטגרציה לקיבולת — הצגת עומס מול זמינות לקו.",
      ],
      flow: [
        { he: "פרמטרי-כניסה", code: "MF50", note: "תקופה+קו" },
        { he: "תצוגת דרישה מול קיבולת" },
        { he: "פיזור+קיבוע כמויות", code: "firm" },
        { he: "הפקת הזמנות-מתוכננות", code: "PLAF" },
        { he: "דיווח-ייצור", code: "MFBF" },
      ],
      masterDataHe: [
        "Production Line = Work Center (CRHD) עם קיבולת · Run Schedule Header.",
        "Production Version מקשרת חומר↔קו↔Rate Routing להצגה ב-MF50.",
      ],
      mistakesHe: [
        "תכנון ב-MF50 ללא בדיקת-קיבולת ➔ עומס לא-ריאלי על הקו.",
        "אי-קיבוע אחרי תכנון ➔ MRP משנה את הלוח בריצה הבאה.",
        "Entry Parameters רחבים מדי ➔ טבלה עמוסה וקשה-לקריאה.",
      ],
      troubleshootHe: [
        "חומר/קו לא מוצג ב-MF50 ➔ Production Version או REM Indicator חסרים.",
        "כמויות 'קופצות' אחרי MRP ➔ לא בוצע קיבוע ב-MF50.",
        "טבלה ריקה ➔ Entry Parameters לא תואמים תקופה/קו.",
      ],
      bestPracticeHe: [
        "תכנן עם בדיקת-קיבולת פעילה לאיזון ריאלי.",
        "קבע (firm) מיד לאחר אישור-לוח.",
        "צמצם Entry Parameters לתקופה/קווים הרלוונטיים בלבד.",
      ],
      interviewHe: [
        { qHe: "מה תפקיד Planning Table (MF50) ב-REM?", aHe: "כלי ויזואלי לתכנון, פיזור וקיבוע כמויות-ייצור על קווים ותקופות, עם בדיקת-קיבולת והפקת הזמנות-מתוכננות-REM." },
        { qHe: "מדוע חומר עשוי לא להופיע ב-MF50?", aHe: "חסר REM Indicator (MARC-SAUFT) או Production Version המקשרת חומר↔קו↔Rate Routing." },
      ],
      takeawaysHe: [
        "MF50 = לוח-העבודה הוויזואלי של REM (rate-based planning).",
        "מאזן ביקוש מול קיבולת-קו לאורך-תקופות.",
        "תצוגה נשלטת ע\"י Entry Parameters ו-Row Selection.",
      ],
      relatedHe: [
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · PLAF", href: "/library/pp/object/PLAF/" },
      ],
      children: [
        {
          id: "5.3.1", titleHe: "פרמטרי כניסה לטבלת התכנון", titleEn: "Entry Parameters for a Planning Table",
          execHe: "Entry Parameters הם מסך-הבחירה הראשוני של MF50: מפעל, קו/מרכז-עבודה, טווח-תקופות, אופק-תכנון ופילטרי-חומר — הם קובעים מה יוצג בטבלת-התכנון.",
          beginnerHe: "לפני שטבלת-התכנון נפתחת, ממלאים 'פרמטרי-כניסה' — איזה מפעל, אילו קווים, מאיזה תאריך עד מתי. אלה מסננים מה יופיע, כדי שהטבלה לא תהיה עמוסה מדי.",
          consultantHe: "במסך-ההתחלה של MF50 מזינים Plant, Production Line/MRP Controller, Period (ימים/שבועות) ואופק. הבחירה משפיעה על ביצועים ועל קריאוּת. ניתן לשמור variants. בחירה רחבה-מדי מאטה ומעמיסה; צרה-מדי מסתירה דרישות.",
          purposeHe: "למקד את טבלת-התכנון בקווים ובתקופות הרלוונטיים — לאזן בין כיסוי לקריאוּת וביצועים.",
          processExampleHe: "מתכנן מזין מפעל 1000, קו FILL01, אופק שבועיים ביחידות-ימים — MF50 נפתחת ממוקדת רק לקו ולתקופה הרצויים.",
          cbcHe: "ב-CBC מתכנן-המילוי שומר variant לכל אזור-קווים (PET/CAN) כדי לפתוח את MF50 ממוקד בשנייה.",
          navHe: ["Production ► Repetitive Manufacturing ► Planning ► Planning Table ► Entry/Selection screen (MF50)"],
          tables: ["PLAF", "CRHD"],
          tcodes: ["MF50"],
          fiori: ["F1422"],
          configHe: ["במסך-הכניסה הגדר Plant, Production Line, Period ואופק; שמור variant לשימוש-חוזר."],
          mistakesHe: ["טווח-תקופות רחב מדי ➔ ביצועים איטיים וטבלה עמוסה.", "אי-שמירת variants ➔ הזנה-חוזרת בכל פתיחה."],
          troubleshootHe: ["טבלה ריקה/חלקית ➔ Entry Parameters לא תואמים מפעל/קו/תקופה.", "MF50 איטית ➔ טווח רחב מדי; צמצם."],
          bestPracticeHe: ["שמור variants לפי קו/אזור.", "בחר אופק תואם לאופק-התכנון של הקו."],
          interviewHe: [{ qHe: "מה קובעים Entry Parameters ב-MF50?", aHe: "מפעל, קו/מרכז, טווח-תקופות ואופק — מה יוצג בטבלת-התכנון, ובכך גם הקריאוּת והביצועים." }],
          takeawaysHe: ["Entry Parameters = מסנן-הכניסה של MF50.", "מאזנים כיסוי מול ביצועים.", "שמור variants לשימוש-חוזר."],
        },
        {
          id: "5.3.2", titleHe: "תחזוקת בחירת שורות", titleEn: "Maintaining Row Selection",
          execHe: "Row Selection קובע אילו שורות-מידע מוצגות בטבלת-התכנון לכל חומר/קו — דרישה, הזמנות-מתוכננות, מלאי, קיבולת, range-of-coverage — להתאמת-התצוגה לצרכי-המתכנן.",
          beginnerHe: "בטבלת-התכנון אפשר להציג שורות-מידע שונות (כמה דרוש, כמה מתוכנן, כמה במלאי). Row Selection בוחר אילו שורות יופיעו, כדי שהמתכנן יראה בדיוק את מה שחשוב לו.",
          consultantHe: "מגדירים Row Selection (תצוגה/layout) הקובע את שורות-המידע ב-MF50: Requirements, Planned orders/RSH, Stock, Available capacity, Range of coverage. ניתן לשמור כ-layout. תצוגה עמוסה מסיחה; תצוגה ממוקדת מאיצה החלטות.",
          purposeHe: "להתאים את שורות-המידע בטבלה לתפקיד-המתכנן — להציג את הדרוש-להחלטה ולהסתיר רעש.",
          processExampleHe: "מתכנן-קיבולת מציג שורות דרישה+קיבולת+range-of-coverage ומסתיר פירוט-מלאי, לקבלת-החלטות-פיזור מהירה.",
          cbcHe: "ב-CBC מתכנן-המילוי מציג שורות דרישה, הזמנות-מתוכננות וקיבולת-קו, לאיזון-עומס מהיר בין קווי-המשקאות.",
          navHe: ["Production ► Repetitive Manufacturing ► Planning ► Planning Table ► Row Selection / Layout (MF50)"],
          tables: ["PLAF", "CRHD"],
          tcodes: ["MF50"],
          fiori: ["F1422"],
          configHe: ["הגדר Row Selection/Layout עם שורות-המידע הרצויות; שמור כ-layout לשימוש-חוזר."],
          mistakesHe: ["הצגת כל השורות ➔ עומס-מידע ורעש.", "הסתרת שורת-קיבולת ➔ תכנון ללא איזון-עומס."],
          troubleshootHe: ["מידע חיוני חסר בטבלה ➔ Row Selection מסתיר את השורה; הוסף ל-layout.", "טבלה עמוסה ➔ צמצם שורות ב-Row Selection."],
          bestPracticeHe: ["שמור layout ממוקד לתפקיד.", "הצג תמיד שורת-קיבולת בתכנון-קו."],
          interviewHe: [{ qHe: "מה מאפשר Row Selection ב-MF50?", aHe: "לבחור אילו שורות-מידע (דרישה/הזמנות/מלאי/קיבולת/range-of-coverage) מוצגות בטבלת-התכנון, ולשמור כ-layout." }],
          takeawaysHe: ["Row Selection = אילו שורות-מידע מוצגות.", "מתאים תצוגה לתפקיד-המתכנן.", "שמור layout ממוקד."],
        },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4", titleHe: "אישור RP עבור קנבן", titleEn: "RP Confirmation for Kanban",
      execHe:
        "RP Confirmation for Kanban מחבר את אות-ה-Kanban לדיווח-Reporting-Point ב-REM: השלמת-מכל (סטטוס FULL) מפעילה Backflush ב-RP המתאים — איחוד של משיכה (pull) עם דיווח-ייצור ורישום-מלאי אוטומטי.",
      beginnerHe:
        "כשעובדים עם Kanban, מילוי מכל מסמן 'מלא'. ההגדרה הזו גורמת לכך שאות ה'מלא' מדווח אוטומטית כייצור ב-Reporting-Point — בלי הזנה כפולה של אותו מידע.",
      consultantHe:
        "נשען על Control Cycle (PK01) + Production Supply Area + RP מסומנת בפרופיל/Rate Routing. מעבר-סטטוס Kanban ל-FULL מפעיל RP-confirmation שמבצע Backflush לרכיבים. רלוונטי לרצפת-ייצור pull-driven; דורש תיאום בין מודול-Kanban ל-REM.",
      purposeHe:
        "לאחד pull-signal עם דיווח-ייצור — להימנע מדיווח-כפול ולסנכרן צריכת-רכיבים עם המשיכה בפועל.",
      processExampleHe:
        "מכל-רכיב מתרוקן (EMPTY) ומופעלת אספקה; לאחר מילוי, מעבר ל-FULL מפעיל RP-confirmation המבצע Backflush לרכיבי-הפעולה.",
      cbcHe:
        "ב-CBC אספקת פקקים/תוויות לקו מנוהלת ב-Kanban; מעבר-מכל ל-FULL מדווח אוטומטית RP בקו-המילוי, ללא הזנה ידנית של הצוות.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► RP Confirmation for Kanban (OSPT)",
        "Production ► Kanban ► Control Cycle ► Create/Maintain (PK01)",
      ],
      tables: ["PKHD", "PKPS", "T437"],
      tcodes: ["OSPT", "PK01", "PKBC", "MF41"],
      fiori: ["F2336"],
      configHe: [
        "סמן RP-confirmation בפרופיל-REM.",
        "הגדר Control Cycle (PK01) + Production Supply Area לרכיב.",
        "קשר מעבר-סטטוס Kanban (FULL) ל-Backflush ב-RP.",
      ],
      flow: [
        { he: "מכל EMPTY", code: "PKBC", note: "אות-אספקה" },
        { he: "אספקה+מילוי" },
        { he: "מעבר ל-FULL" },
        { he: "RP-confirmation אוטומטי", code: "MF41" },
        { he: "Backflush רכיבים", code: "261" },
      ],
      masterDataHe: [
        "Control Cycle (PKHD) + Production Supply Area לכל רכיב-Kanban.",
        "RP מסומנת ב-Rate Routing/פרופיל כיעד-הדיווח.",
      ],
      mistakesHe: [
        "RP-Kanban ללא Production Supply Area תקין ➔ אות לא מתורגם לדיווח.",
        "דיווח-ידני מקביל ל-Kanban-driven ➔ צריכה כפולה.",
        "Control Cycle לא תואם RP ➔ Backflush לא מופעל.",
      ],
      troubleshootHe: [
        "סטטוס FULL לא מפעיל דיווח ➔ קישור RP-confirmation/Control Cycle חסר.",
        "צריכה כפולה ➔ דיווח-ידני בנוסף ל-Kanban-driven RP.",
      ],
      bestPracticeHe: [
        "הימנע מדיווח-ידני מקביל ל-Kanban-driven RP.",
        "ודא Production Supply Area ו-Control Cycle תקינים.",
        "תאם בין מודול-Kanban לפרופיל-REM מראש.",
      ],
      interviewHe: [
        { qHe: "כיצד Kanban מתחבר ל-Reporting Points ב-REM?", aHe: "מעבר-סטטוס מכל ל-FULL מפעיל RP-confirmation אוטומטי המבצע Backflush — איחוד pull-signal עם דיווח-ייצור." },
        { qHe: "מה נדרש כדי ש-RP-confirmation מ-Kanban יפעל?", aHe: "סימון RP-confirmation בפרופיל, Control Cycle (PK01) ו-Production Supply Area, ו-RP מסומנת ב-Rate Routing." },
      ],
      takeawaysHe: [
        "Kanban-FULL מפעיל RP-confirmation אוטומטי.",
        "מאחד משיכה (pull) עם דיווח-ייצור.",
        "דורש Control Cycle + PSA + RP מסומנת.",
      ],
      relatedHe: [
        { labelHe: "PP · Kanban", href: "/library/pp/chapter-09/" },
        { labelHe: "PP · נקודות דיווח (5.2)", href: "/library/pp/chapter-05/#sub-5.2" },
      ],
    },
    // ============================================================ 5.5
    {
      id: "5.5", titleHe: "Backflush של פעילויות", titleEn: "Activities Backflush",
      execHe:
        "Activities Backflush הוא רישום אוטומטי של כמויות-Activity (זמן-מכונה/עבודה/הכנה) בדיווח-REM, מול ה-Product Cost Collector — כך שעלות-ההמרה זורמת לעלות-המוצר באופן צמוד-לכמות.",
      beginnerHe:
        "כשמדווחים על ייצור, מעבר להורדת-חומרים, המערכת רושמת גם כמה זמן-עבודה ומכונה נצרך. כך עלות-הקו (לא רק עלות-החומר) נכנסת לעלות-המוצר — אוטומטית.",
      consultantHe:
        "Activities Backflush נגזר מ-Standard Values ב-Rate Routing × תעריפי-Activity (KP26), ונרשם מול ה-Cost Collector (KKF6N). אפשר לבצעו יחד עם Backflush-החומרים או בנפרד (Separated). ללא רישום-Activity, עלות-ההמרה אינה נצברת והניתוח מסתמך על Variance/WIP בלבד.",
      purposeHe:
        "לזרום עלות-עבודה ועלות-מכונה לעלות-המוצר אוטומטית וצמוד-לכמות, במקום הקצאה ידנית/תקופתית — בסיס לתמחיר-אמת ולניתוח-סטיות.",
      processExampleHe:
        "דיווח 8,000 יח': Activities 'זמן-מכונה' ו'זמן-עבודה' לפי Rate Routing נרשמים מול ה-Cost Collector, מזכים את ה-Cost Center של הקו לפי תעריף-KP26.",
      cbcHe:
        "ב-CBC זמן-מילוי וזמן-תפעול בקו נרשמים כ-Activities מול ה-Cost Collector של המשקה — כך עלות-הקו נכללת בעלות-המשקה, ולא רק עלות-הרכיבים.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Activity Backflush (OSPT)",
        "Controlling ► Cost Center Accounting ► Planning ► Activity Output/Prices (KP26)",
      ],
      tables: ["AFRU", "COSP", "T437"],
      tcodes: ["OSPT", "MFBF", "KP26", "KKF6N"],
      fiori: ["F1422"],
      configHe: [
        "סמן Activity Backflush בפרופיל.",
        "ודא Standard Values ב-Rate Routing לכל Activity Type.",
        "תחזק תעריפי-Activity (KP26) ל-Cost Center של הקו.",
      ],
      flow: [
        { he: "Standard Values ב-Rate Routing", code: "CA22" },
        { he: "תעריפי-Activity", code: "KP26" },
        { he: "דיווח-REM", code: "MFBF" },
        { he: "רישום מול Cost Collector", code: "KKF6N" },
      ],
      masterDataHe: [
        "Standard Values ב-Rate Routing (Setup/Machine/Labor) × Activity Types.",
        "Product Cost Collector (KKF6N) — יעד-רישום ה-Activities ב-REM.",
      ],
      mistakesHe: [
        "Activity Backflush כבוי ➔ עלות-המרה לא נצברת, סטיות גדולות.",
        "תעריף KP26 חסר ➔ Activity בשווי אפס.",
        "Standard Values חסרים ב-Rate Routing ➔ אין כמות-Activity לרישום.",
      ],
      troubleshootHe: [
        "עלות-עבודה לא נכנסת לעלות-מוצר ➔ Activity Backflush כבוי או KP26 חסר.",
        "Activity בשווי אפס ➔ תעריף-KP26 לא תוחזק לתקופה.",
      ],
      bestPracticeHe: [
        "הפעל Activity Backflush בכל קו בעל עלות-המרה משמעותית.",
        "תחזק תעריפי-KP26 לפני כל תקופה.",
        "תאם Activity Types בין PP ל-CO.",
      ],
      interviewHe: [
        { qHe: "מה רושם Activities Backflush?", aHe: "כמויות-Activity (זמן-מכונה/עבודה) מול ה-Product Cost Collector, לפי Standard Values × תעריף KP26 — עלות-המרה אוטומטית." },
        { qHe: "מה נדרש כדי שעלות-Activity לא תהיה אפס?", aHe: "Standard Values ב-Rate Routing + תעריף-Activity מתוחזק ב-KP26 לתקופה הרלוונטית." },
      ],
      takeawaysHe: [
        "Activities Backflush = עלות-המרה אוטומטית ב-REM.",
        "נגזר מ-Rate Routing × KP26, נרשם מול Cost Collector.",
        "ללא תעריף-KP26 ה-Activity שווה אפס.",
      ],
      relatedHe: [
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "PP · רישום פעילויות (5.1.5)", href: "/library/pp/chapter-05/#sub-5.1.5" },
      ],
    },
    // ============================================================ 5.6
    {
      id: "5.6", titleHe: "GR ו-GI אוטומטיים", titleEn: "Automatic GR and GI",
      execHe:
        "Automatic GR and GI הוא ליבת אוטומציית-ה-REM: דיווח-כמות בודד (MFBF) יוצר אוטומטית גם קבלת-טובין של המוצר-המוגמר (GR, 131) וגם הוצאת-טובין/Backflush של הרכיבים (GI, 261) — ללא תנועות-מלאי ידניות.",
      beginnerHe:
        "במקום שלוש פעולות נפרדות (לקבל מוצר, להוריד חומר א', להוריד חומר ב'), דיווח-אחד עושה הכל: SAP מקבל את המוצר למלאי ומוריד את כל הרכיבים אוטומטית לפי המתכון (BOM).",
      consultantHe:
        "מסומן בפרופיל (5.1.3): Auto-GR יוצר 131 מול ה-Cost Collector, ו-Backflush יוצר 261 לכל רכיב לפי BOM × כמות, עם Stock/Batch Determination. כשל-רכיב מטופל לפי Process Control (Online/COGI). ניתן להפריד GR מ-GI (Separated Backflush) לטיפול-שגיאות נפרד.",
      purposeHe:
        "לחסל תנועות-מלאי ידניות בייצור-המוני — דיווח-כמות בודד מנפיק את כל ה-GR/GI אוטומטית, מפחית מאמץ, זמן ושגיאות.",
      processExampleHe:
        "MFBF על 12,000 יח': 131 מקבל 12,000 מוצר-מוגמר למלאי; 261 מוריד אוטומטית את כל רכיבי-ה-BOM × 12,000, עם בחירת-אצווה FEFO אוטומטית.",
      cbcHe:
        "ב-CBC דיווח-קו יחיד יוצר 131 למשקה-המוגמר (מנוהל-אצווה) ו-261 לתרכיז/סוכר/CO2/אריזה — הקו עובד ללא נגיעה-ידנית במלאי בתפעול רגיל.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Automatic Goods Movements (OSPT)",
        "Production ► Repetitive Manufacturing ► Backflushing ► Backflush (MFBF)",
      ],
      tables: ["T156", "MSEG", "T437"],
      tcodes: ["OSPT", "MFBF", "MIGO", "COGI"],
      fiori: ["F1422"],
      configHe: [
        "סמן Automatic GR ו-Backflush בפרופיל.",
        "ודא Movement Types 131 (GR) ו-261 (GI) פעילים ומקושרים ל-OBYC.",
        "הגדר Process Control לטיפול-שגיאות (COGI).",
      ],
      flow: [
        { he: "דיווח-כמות", code: "MFBF" },
        { he: "GR מוצר אוטומטי", code: "131" },
        { he: "Backflush רכיבים", code: "261" },
        { he: "רישום מול Cost Collector", code: "KKF6N" },
        { he: "שגיאות ➔ COGI", code: "COGI" },
      ],
      masterDataHe: [
        "BOM (פיצוץ לכמות-הרכיבים) + Production Version פעילה.",
        "Stock/Batch Determination לבחירת מקור-משיכה ואצווה.",
      ],
      mistakesHe: [
        "כיבוי Auto-GR/Backflush בטעות ➔ מלאי לא מתעדכן בדיווח.",
        "אי-התאמת Movement Types ל-OBYC ➔ שגיאת account determination.",
        "BOM/Production Version לא-פעילים ➔ GI לא מתבצע.",
      ],
      troubleshootHe: [
        "מלאי לא משתנה אחרי MFBF ➔ Auto goods movements כבוי בפרופיל.",
        "GI לא מתבצע ➔ אין Production Version פעילה או רכיב לא Backflush-relevant.",
        "שגיאת 'Account determination' ➔ OBYC חסר ל-Movement Type/Valuation Class.",
      ],
      bestPracticeHe: [
        "הפעל Auto-GR ו-Backflush יחד בייצור-המוני סטנדרטי.",
        "תאם Movement Types ו-OBYC עם MM/FI מראש.",
        "השתמש ב-Separated Backflush היכן שטיפול-שגיאות נפרד נדרש.",
      ],
      interviewHe: [
        { qHe: "מה יוצר דיווח MFBF במצב Auto GR/GI?", aHe: "GR של המוצר-המוגמר (131) ו-GI/Backflush של כל הרכיבים (261) לפי BOM × כמות — תנועות-מלאי אוטומטיות מדיווח בודד." },
        { qHe: "כיצד מטפלים בכשל-רכיב בדיווח-אוטומטי?", aHe: "לפי Process Control — Online (חוסם ומתקן מיד) או Postprocessing (שומר ל-COGI וממשיך)." },
      ],
      takeawaysHe: [
        "דיווח בודד = GR(131) + GI(261) אוטומטיים.",
        "ליבת אוטומציית-ה-REM; ללא תנועות-ידניות.",
        "כשל-רכיב מטופל ב-COGI לפי Process Control.",
      ],
      relatedHe: [
        { labelHe: "PP · תנועות סחורה אוטומטיות (5.1.3)", href: "/library/pp/chapter-05/#sub-5.1.3" },
        { labelHe: "אובייקט · MSEG", href: "/library/pp/object/MSEG/" },
      ],
    },
    // ============================================================ 5.7
    {
      id: "5.7", titleHe: "בקרת תהליך ב-Backflushing", titleEn: "Process Control in Backflushing",
      execHe:
        "Process Control in Backflushing קובע את התנהגות-המערכת בכשל-Backflush: תיקון-מקוון (Online) שחוסם ודורש פתרון-מיידי, מול שמירת-השגיאה ל-Postprocessing (AFFW/COGI) שמאפשרת לדיווח להמשיך. זו ההחלטה הקובעת את רציפות-הקו מול דיוק-מיידי.",
      beginnerHe:
        "מה קורה כשדיווח נתקל בבעיה (חסר רכיב/אצווה)? אפשר לעצור ולתקן מיד, או לרשום את הבעיה ב'מגירת-תיקונים' (COGI) ולהמשיך לדווח. ההגדרה בוחרת — וזה משפיע אם הקו נעצר או ממשיך.",
      consultantHe:
        "נקבע ברמת-הפרופיל לכל סוג-תנועה: Online (חוסם, dialog-תיקון) או Postprocessing (שומר ל-AFFW, ממשיך). בקווים-עמוסים Postprocessing מונע עצירת-throughput אך מחייב ניטור-COGI יומי; Online מתאים לנפח-נמוך/דיוק-גבוה. זו החלטה תפעולית-אסטרטגית, לא רק טכנית.",
      purposeHe:
        "לאזן בין רציפות-קו לבין דיוק-מיידי — לא לעצור ייצור-המוני על תקלת-מלאי נקודתית, אך להבטיח שהשגיאות נסגרות בזמן.",
      processExampleHe:
        "רכיב חסר-מלאי בדיווח: Online ➔ הדיווח נחסם עד תיקון; Postprocessing ➔ הדיווח עובר, השגיאה נשמרת ב-COGI לטיפול ב-reprocess מאוחר.",
      cbcHe:
        "ב-CBC קווי-המילוי מוגדרים Postprocessing — מחסור-אצווה זמני אינו עוצר את הקו; צוות-המלאי סוגר COGI מדי-משמרת לשמירת-דיוק.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Process Control (OSPT)",
        "Production ► Repetitive Manufacturing ► Goods Movements ► Postprocess Errors (COGI/MF47)",
      ],
      tables: ["AFFW", "T437"],
      tcodes: ["OSPT", "COGI", "MF47"],
      fiori: ["F1422"],
      configHe: [
        "קבע Process Control לכל תנועה: Online (חוסם) או Postprocessing (שומר ל-AFFW).",
        "הגדר שגרת-COGI/MF47 וניטור-גיל לרשומות-פתוחות.",
      ],
      flow: [
        { he: "דיווח-Backflush", code: "MFBF" },
        { he: "שגיאה?", note: "חסר מלאי/אצווה" },
        { he: "Online ➔ תיקון-מיידי", code: "dialog" },
        { he: "Postprocessing ➔ AFFW", code: "COGI" },
        { he: "Reprocess", code: "MF47" },
      ],
      masterDataHe: [
        "אין נתון-אב ייעודי; ההחלטה ברמת-הפרופיל (T437).",
        "AFFW = יומן-השגיאות הנצבר מ-Postprocessing.",
      ],
      mistakesHe: [
        "Online בקו-עמוס ➔ כל תקלת-רכיב עוצרת דיווח.",
        "Postprocessing ללא ניטור-COGI ➔ צריכות-פתוחות מצטברות.",
        "ערבוב Online/Postprocessing לא-עקבי בין תנועות.",
      ],
      troubleshootHe: [
        "דיווח נחסם על שגיאת-רכיב ➔ Process Control = Online; שקול Postprocessing.",
        "צריכות-פתוחות מצטברות ➔ אין ניטור-COGI/MF47 שוטף.",
      ],
      bestPracticeHe: [
        "Postprocessing לקווים-רציפים + ניטור-COGI יומי עם owner.",
        "Online היכן שדיוק-מיידי קריטי ונפח נמוך.",
        "שמור עקביות-הגדרה בין תנועות.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Online ל-Postprocessing ב-Backflushing?", aHe: "Online חוסם את הדיווח עד תיקון-מיידי; Postprocessing מאפשר לדיווח להמשיך ושומר את השגיאה ב-AFFW/COGI לטיפול מאוחר." },
        { qHe: "מהי ההשלכה התפעולית של Postprocessing?", aHe: "רציפות-קו גבוהה, אך חובה ניטור-COGI יומי כדי שצריכות-פתוחות לא יעוותו מלאי, WIP ועלות." },
      ],
      takeawaysHe: [
        "Process Control = התנהגות בכשל-Backflush.",
        "Online חוסם ומדייק; Postprocessing ממשיך ושומר ל-COGI.",
        "Postprocessing דורש ניטור-COGI יומי.",
      ],
      relatedHe: [
        { labelHe: "PP · בקרת תהליך (5.1.7)", href: "/library/pp/chapter-05/#sub-5.1.7" },
        { labelHe: "אובייקט · AFFW", href: "/library/pp/object/AFFW/" },
      ],
    },
    // ============================================================ 5.8
    {
      id: "5.8", titleHe: "קיבוע הזמנות מתוכננות ב-REM", titleEn: "Firming Planned Orders in REM",
      execHe:
        "Firming Planned Orders in REM נועל הזמנות-מתוכננות של הקו כך שהרצת-MRP הבאה לא תשנה או תמחק אותן — חיוני לייצוב לוח-הייצור (run schedule) לאחר אישורו, ולתכנון-משמרות ואספקת-רכיבים יציבים.",
      beginnerHe:
        "אחרי שהמתכנן קבע מה הקו יייצר השבוע, לא רוצים ש-MRP 'יבנה מחדש' את התוכנית בכל ריצה. קיבוע 'נועל' את ההזמנות-המתוכננות כך שיישארו יציבות עד שינוי-מכוון.",
      consultantHe:
        "Firming ב-REM נשען על Planning Time Fence (MARC-FXHOR) ועל קיבוע-ידני בטבלת-התכנון (MF50). הזמנות-מקובעות אינן זזות/נמחקות ב-MRP, אך נכנסות ל-Reduction בדיווח. שילוב נכון עם PTF מונע 'ריצוד-תוכנית' (nervousness) ומאזן יציבות מול תגובתיות.",
      purposeHe:
        "לייצב את לוח-הקו לטווח-קצר — לאפשר תכנון-משמרות, אספקת-רכיבים ו-Kanban בלי שינויים אוטומטיים תכופים, תוך שמירה על תגובה לדרישה מעבר ל-PTF.",
      processExampleHe:
        "לוח-קו שבועי מקובע ב-MF50; הרצת-MRP לילית אינה משנה כמויות בתוך ה-PTF, ומוסיפה דרישות חדשות רק מעבר לאופק-הקיבוע.",
      cbcHe:
        "ב-CBC לוח-המילוי השבועי מקובע לאחר אישור-תכנון, כדי שאספקת-תרכיז וזמני-קו יישארו יציבים מול תנודות-ביקוש קצרות-טווח.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Firming (OSPT)",
        "Production ► MRP ► Planning ► Planning Time Fence in MRP 1 (MARC-FXHOR)",
      ],
      tables: ["PLAF", "MARC", "T437"],
      tcodes: ["OSPT", "MF50", "MD04", "MM02"],
      fiori: ["F1422", "F2336"],
      configHe: [
        "הגדר Firming בפרופיל; הסתמך על Planning Time Fence (MARC-FXHOR).",
        "אפשר קיבוע-ידני ב-MF50 ללוח-הקו המאושר.",
        "כייל PTF לפי זמן-אספקת-רכיבים ותכנון-משמרות.",
      ],
      flow: [
        { he: "אישור לוח-קו", code: "MF50" },
        { he: "קיבוע (firm)", code: "FXHOR" },
        { he: "הרצת-MRP", code: "MD01" },
        { he: "לוח יציב בתוך PTF", code: "MD04" },
      ],
      masterDataHe: [
        "MARC-FXHOR = Planning Time Fence · אופק-הקיבוע.",
        "PLAF = הזמנות-מתוכננות עם אינדיקטור-קיבוע.",
      ],
      mistakesHe: [
        "העדר Firming/PTF ➔ MRP משנה לוח-קו בכל ריצה (nervousness).",
        "קיבוע-יתר מעבר ל-PTF ➔ חוסם תגובה לביקוש אמיתי.",
        "PTF שאינו תואם זמן-אספקת-רכיבים.",
      ],
      troubleshootHe: [
        "לוח-הקו 'קופץ' בכל הרצת-MRP ➔ אין Firming/PTF.",
        "MRP לא מעדכן דרישות חדשות ➔ קיבוע-יתר/PTF ארוך מדי.",
      ],
      bestPracticeHe: [
        "שלב Firming עם Planning Time Fence התואם את אופק-היציבות.",
        "כייל PTF לפי זמן-אספקת-רכיבים ותכנון-משמרות.",
        "קבע מי מורשה לבטל-קיבוע ומתי.",
      ],
      interviewHe: [
        { qHe: "מדוע מקבעים הזמנות-מתוכננות ב-REM?", aHe: "כדי שהרצת-MRP לא תשנה לוח-קו מאושר; מייצב תכנון-משמרות ואספקת-רכיבים בתוך ה-Planning Time Fence." },
        { qHe: "מה תפקיד Planning Time Fence בקיבוע?", aHe: "MARC-FXHOR מגדיר את אופק-הזמן שבו ההזמנות מקובעות אוטומטית מפני שינויי-MRP." },
      ],
      takeawaysHe: [
        "Firming = נעילת לוח-הקו לטווח-קצר.",
        "נשען על Planning Time Fence (FXHOR) + קיבוע-ידני ב-MF50.",
        "מונע ריצוד-תוכנית; אזן מול תגובתיות מעבר ל-PTF.",
      ],
      relatedHe: [
        { labelHe: "PP · קיבוע הזמנות (5.1.8)", href: "/library/pp/chapter-05/#sub-5.1.8" },
        { labelHe: "PP · טבלת התכנון (5.3)", href: "/library/pp/chapter-05/#sub-5.3" },
      ],
    },
    // ============================================================ 5.9
    {
      id: "5.9", titleHe: "קביעת מלאי (Stock Determination)", titleEn: "Stock Determination",
      execHe:
        "Stock Determination קובע מאיזה מלאי/Storage Location וסוג-מלאי נצרכים הרכיבים ב-Backflush — לפי Stock Determination Group + Rule — אוטומטית, בלי בחירה-ידנית בכל דיווח. קריטי כשרכיב מאוחסן בכמה מקומות או בקונסיגנציה.",
      beginnerHe:
        "כשמורידים חומרי-גלם בדיווח, SAP צריך לדעת מאיזה מחסן וסוג-מלאי למשוך. קביעת-מלאי בוחרת זאת אוטומטית לפי כללים, כדי שלא תצטרך לבחור ידנית בכל דיווח.",
      consultantHe:
        "מבוסס Stock Determination Group (MARC) + Rule (OPK9-area) הקובעים סדר-עדיפויות בין Storage Locations וסוגי-מלאי (own/consignment/project). ב-REM ה-Backflush משתמש בכלל למשיכה-אוטומטית; משולב עם Batch Determination לבחירת-אצווה. ללא הגדרה — בחירה-ידנית או כשל-דיווח.",
      purposeHe:
        "לאוטמט את מקור-המשיכה של רכיבים בדיווח-המוני — סדר-קבוע בין מחסנים/מלאים, מניעת בחירה-ידנית, התאמה לקונסיגנציה ומניעת שגיאות.",
      processExampleHe:
        "רכיב קיים גם במלאי-עצמי וגם בקונסיגנציה; כלל-הקביעה מושך קודם קונסיגנציה ואז עצמי — ה-Backflush בוחר אוטומטית לפי הכלל.",
      cbcHe:
        "ב-CBC רכיבי-אריזה מאוחסנים בכמה Storage Locations ליד הקו; כלל-קביעת-מלאי מושך אוטומטית מהמיקום המועדף/הקרוב בכל דיווח.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Stock Determination (OSPT)",
        "Materials Management ► … ► Stock Determination ► Define Strategies (OPK9-area)",
      ],
      tables: ["T434G", "MARC", "T437"],
      tcodes: ["OSPT", "OPK9", "MFBF"],
      fiori: ["F1422"],
      configHe: [
        "הגדר Stock Determination Group (MARC) ו-Rule.",
        "קבע סדר-עדיפויות בין Storage Locations/סוגי-מלאי.",
        "שלב עם Batch Determination לבחירת-אצווה.",
      ],
      flow: [
        { he: "דיווח-Backflush", code: "MFBF" },
        { he: "זיהוי רכיב + Group", code: "MARC" },
        { he: "הפעלת Rule", code: "OPK9" },
        { he: "משיכה מ-StorLoc/סוג-מלאי", code: "261" },
      ],
      masterDataHe: [
        "MARC = Stock Determination Group לרכיב.",
        "Stock Determination Rule + סדר-עדיפויות StorLoc/סוג-מלאי.",
      ],
      mistakesHe: [
        "Group/Rule חסר ➔ Backflush נכשל או דורש בחירה-ידנית.",
        "סדר-עדיפויות שגוי ➔ משיכה ממלאי לא-נכון.",
        "אי-שילוב עם Batch Determination ➔ בחירת-אצווה ידנית.",
      ],
      troubleshootHe: [
        "Backflush דורש בחירת-מלאי ידנית ➔ Stock Determination Group/Rule לא מוגדר.",
        "משיכה ממקור שגוי ➔ סדר-עדיפויות בכלל שגוי.",
      ],
      bestPracticeHe: [
        "הגדר כללים ברורים לרכיבי-קונסיגנציה ומלאי-עצמי.",
        "תאם Stock Determination עם פריסת-Storage Locations ליד הקו.",
        "שלב עם Batch Determination לבחירה מלאה-אוטומטית.",
      ],
      interviewHe: [
        { qHe: "מה קובעת Stock Determination ב-REM?", aHe: "מאיזה Storage Location/סוג-מלאי נמשכים רכיבים ב-Backflush, לפי Group (MARC) + Rule, ללא בחירה-ידנית." },
        { qHe: "מתי קביעת-מלאי קריטית במיוחד?", aHe: "כשרכיב מאוחסן בכמה מקומות או בקונסיגנציה — הכלל קובע אוטומטית את מקור-המשיכה." },
      ],
      takeawaysHe: [
        "בוחר מקור-משיכת-רכיבים אוטומטית ב-Backflush.",
        "מבוסס Group (MARC) + Rule (OPK9).",
        "קריטי לקונסיגנציה/ריבוי-מחסנים; שלב עם Batch Determination.",
      ],
      relatedHe: [
        { labelHe: "PP · קביעת מלאי אוטומטית (5.1.9)", href: "/library/pp/chapter-05/#sub-5.1.9" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
    },
    // ============================================================ 5.10
    {
      id: "5.10", titleHe: "צמצום כמויות הזמנה מתוכננת", titleEn: "Reduction in Planned Order Quantities",
      execHe:
        "Reduction in Planned Order Quantities קובע שדיווח-Backflush מצמצם אוטומטית את כמות ההזמנה-המתוכננת המתאימה, בתוך Reduction Period — כדי שדרישה שכבר יוצרה לא תיספר ולא תתוכנן פעמיים. זהו המנגנון המסנכרן את התוכנית למציאות-הייצור.",
      beginnerHe:
        "אחרי שדיווחת על ייצור, צריך 'להוריד' את הכמות-שיוצרה מהתוכנית, כדי ש-MRP לא יתכנן אותה שוב. ה-Reduction עושה זאת אוטומטית — וה-Reduction Period קובע באיזו הזמנה לגעת.",
      consultantHe:
        "הדיווח (MFBF) מצמצם את ה-Planned Order/Run Schedule Quantity לפי הכמות-המדווחת, בתוך Reduction Period (חלון-ימים סביב תאריך-הדיווח, backward ואז forward). בלי Reduction נוצרת ספירה-כפולה; Period רחב מדי בולע הזמנות-עתיד, צר מדי משאיר עבר. הזמנות-מקובעות מצטמצמות אך אינן נמחקות ע\"י MRP.",
      purposeHe:
        "למנוע ספירה-כפולה — לסנכרן את התוכנית למציאות כך שדרישה-שדווחה לא תתוכנן מחדש, ולכוון את הצמצום להזמנה-הנכונה.",
      processExampleHe:
        "הזמנה-מתוכננת ל-10,000; דיווח 4,000 ב-MFBF מצמצם אוטומטית את ההזמנה ל-6,000 הנותרים, בתוך Reduction Period של 2 ימים — אין יצירת-דרישה כפולה.",
      cbcHe:
        "ב-CBC דיווח-קו יומי מצמצם את לוח-המילוי השבועי; Reduction Period קצר (1–2 ימים) מבטיח שהדיווח סוגר את הזמנת-היום ואינו בולע הזמנת-מחר.",
      navHe: [
        "Production ► Repetitive Manufacturing ► Control Data ► REM Profiles ► Reduction & Reduction Period (OSPT)",
        "Production ► Repetitive Manufacturing ► Backflushing ► Backflush (MFBF)",
      ],
      tables: ["PLAF", "T437"],
      tcodes: ["OSPT", "MFBF", "MD04"],
      fiori: ["F1422"],
      configHe: [
        "הפעל Reduction בפרופיל.",
        "הגדר Reduction Period (ימים) תואם לתדירות-ההזמנות וקצב-הדיווח.",
        "ודא התנהגות backward/forward בבחירת-ההזמנה.",
      ],
      flow: [
        { he: "הזמנה-מתוכננת", code: "PLAF" },
        { he: "דיווח-Backflush", code: "MFBF" },
        { he: "חיפוש בתוך Period", code: "backward/forward" },
        { he: "צמצום כמות-הזמנה", code: "MD04" },
      ],
      masterDataHe: [
        "PLAF = הזמנה-מתוכננת/Run Schedule הנתונה לצמצום.",
        "Reduction Period (ברמת-הפרופיל T437) — חלון-החיפוש.",
      ],
      mistakesHe: [
        "Reduction כבוי ➔ ספירה-כפולה והזמנות-יתר.",
        "Reduction Period רחב מדי ➔ דיווח בולע הזמנות-עתידיות.",
        "Reduction Period צר מדי ➔ הזמנות-עבר נשארות פתוחות.",
      ],
      troubleshootHe: [
        "הזמנות-מתוכננות לא יורדות אחרי דיווח ➔ Reduction כבוי או Period לא מכסה את ההזמנה.",
        "דיווח סוגר הזמנה לא-נכונה ➔ Reduction Period רחב/צר מדי.",
      ],
      bestPracticeHe: [
        "הפעל Reduction תמיד ב-REM אמיתי.",
        "כייל את Reduction Period לתדירות-ההזמנות (יומי ➔ 1–2 ימים).",
        "בחן את ההתנהגות מול MD04 לאחר דיווח.",
      ],
      interviewHe: [
        { qHe: "מה מבצע Reduction ב-REM, וכיצד Reduction Period משפיע?", aHe: "Reduction מצמצם אוטומטית את כמות ההזמנה-המתוכננת בדיווח; Reduction Period קובע את חלון-הזמן לבחירת ההזמנה — רחב מדי בולע עתיד, צר מדי משאיר עבר." },
        { qHe: "מדוע Reduction חיוני ב-REM?", aHe: "בלעדיו דרישה שכבר יוצרה תיספר ותתוכנן שוב (ספירה-כפולה), ותיווצרנה הזמנות-יתר." },
      ],
      takeawaysHe: [
        "Reduction מסנכרן את התוכנית למציאות-הייצור.",
        "מונע ספירה-כפולה והזמנות-יתר.",
        "Reduction Period מכוון את הצמצום להזמנה-הנכונה.",
      ],
      relatedHe: [
        { labelHe: "PP · צמצום כמויות (5.1.11)", href: "/library/pp/chapter-05/#sub-5.1.11" },
        { labelHe: "PP · תקופת צמצום (5.1.12)", href: "/library/pp/chapter-05/#sub-5.1.12" },
        { labelHe: "אובייקט · PLAF", href: "/library/pp/object/PLAF/" },
      ],
    },
  ],
};
