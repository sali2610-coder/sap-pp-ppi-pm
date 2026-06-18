// ===== WM/EWM Digital Textbook — Chapter 7 (gold-standard learning chapter) =====
// Yard Logistics. Every node is a complete LearningNode with 18 facets of
// authored Hebrew (beginner + consultant friendly). Hierarchy preserved exactly:
// 7.1 · 7.2 (→ 7.2.1, 7.2.2) · 7.3. SAP objects verbatim English.
import type { TextbookChapter } from "./types";

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "לוגיסטיקת חצר (Yard Logistics)",
  titleEn: "Yard Logistics",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-Yard Logistics (לוגיסטיקת חצר) במסגרת SAP EWM. החצר (yard) היא השטח שמחוץ לקירות המחסן — שערי-כניסה (gates), משקלי-גשר, חניות (parking spaces) ורציפי-העמסה (doors) — שבו נעים משאיות, נגררים (trailers) וקרונות. כל תת-פרק הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך check-in→move→check-out, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט בנושא ללא חומר חיצוני. ב-CBC מדובר בניהול חצר המשאיות והנגררים של מפעל-המשקאות של קוקה-קולה.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1",
      titleHe: "סקירת לוגיסטיקת החצר",
      titleEn: "Overview of Yard Logistics",
      execHe:
        "Yard Logistics ב-SAP EWM מנהל את כל תנועת כלי-הרכב והנגררים בשטח שמחוץ למחסן — מרגע ההגעה לשער ועד היציאה. הוא הופך את ה-yard ל'מחסן' לוגי משל עצמו, שבו ה'תאים' (storage bins) הם חניות (parking spaces) ורציפים (doors), וה'מלאי' הוא נגררים ומכולות. בלי ניהול-חצר מסודר נוצרים פקקי-משאיות בשער, רציפים פנויים שלא מנוצלים והמתנות ארוכות — כל אלה עלויות-המתנה (detention) וזמן-מחזור ארוך.",
      beginnerHe:
        "דמיין את החניון הגדול סביב המחסן. משאית מגיעה, נכנסת בשער, ממתינה בחניה, ואז מתבקשת לגשת לרציף-העמסה מסוים, ובסוף יוצאת. Yard Logistics הוא המערכת שעוקבת אחרי 'איפה כל משאית נמצאת עכשיו' ומכוונת אותה צעד-אחר-צעד. בדיוק כמו שבתוך המחסן יש bins למלאי — בחצר יש parking spaces לנגררים, ו-SAP יודע מי חונה איפה.",
      consultantHe:
        "ב-EWM ה-yard מודל כאזור-אחסון מיוחד: ה-yard מוגדר כ-Storage Type מסוג Yard, החניות והרציפים הם Storage Bins, וה-checkpoints (השערים) הם נקודות-כניסה/יציאה. שני אובייקטי-העל הם ה-Transportation Unit (TU) — הנגרר/הקרון הפיזי הנושא את הסחורה — וה-Vehicle, שיכול לשאת TU אחד או יותר. תנועות בחצר מתבצעות באמצעות Yard Movements שמתורגמות ל-Warehouse Tasks ייעודיים. מבחינה ארגונית ה-yard משויך ל-Warehouse Number ויכול להשתרע על מספר checkpoints. שים לב: SAP Yard Logistics (YL) הוא גם שם מוצר עצמאי מבוסס TM/EWM עם מרחב-שמות \\/SCWM\\/* ; בהקשר זה אנו מתמקדים ביכולת ה-yard המובנית של EWM.",
      purposeHe:
        "המטרה: לתת נראות (visibility) מלאה ובקרה על כל כלי-רכב בשטח-המפעל, לקצר זמני-המתנה, למנוע detention charges, ולסנכרן את הגעת-המשאיות עם זמינות-הרציפים ועם ה-Warehouse Tasks של ההעמסה/הפריקה. נראות זו גם תנאי לתכנון-עומסים (door scheduling) ולמדידת KPI כמו זמן-שהייה ממוצע בחצר.",
      processExampleHe:
        "משאית עם נגרר (TU) מגיעה לשער. בנקודת-הביקורת (checkpoint) מבוצע check-in: ה-TU נרשם ומשויך ל-yard, ונקבעת לו חניה (parking space). כשהרציף (door) מתפנה, נוצרת Yard Movement שמורה לנהג לגשת מהחניה לרציף; ההעמסה/הפריקה מתבצעת דרך ה-Warehouse Tasks הרגילים; ולבסוף check-out בשער מסיר את ה-TU מה-yard.",
      cbcHe:
        "ב-CBC: משאיות-חלוקה המביאות בקבוקים/פחיות ריקים נכנסות בשער המזרחי, נשקלות בגשר-המשקל, וממתינות בחניה עד שרציף-הפריקה מתפנה. נגררי המוצר-המוגמר (FERT) ממתינים בחניות נפרדות עד שקו-המילוי השלים אצווה והפלטות מוכנות להעמסה. ה-yard של ה-DC ממופה ב-EWM כ-Storage Type מסוג Yard עם עשרות parking spaces ו-doors צמודים לקווי-המילוי.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Activate Yard Management",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Checkpoint",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Storage Type (Storage Type Role = Yard)",
      ],
      tables: ["/SCWM/TUNIT", "/SCWM/VEH", "/SCWM/LAGP", "/SCWM/T300", "/SCWM/TYARD"],
      tcodes: ["/SCWM/TU", "/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/MON", "/SCWM/YM"],
      fiori: ["F2762", "W0001"],
      configHe: [
        "Activate Yard Management: הפעלת ניהול-החצר ל-Warehouse Number הרלוונטי — תנאי-סף לכל שאר ההגדרות.",
        "Define Checkpoint: שערי כניסה/יציאה; כל checkpoint משויך ל-yard ומגדיר אם הוא לכניסה, ליציאה או לשניהם.",
        "Define Storage Type (Role = Yard): ה-yard עצמו הוא Storage Type מיוחד; החניות והרציפים הם Storage Bins בתוכו.",
        "Define Parking Spaces & Doors: parking spaces כ-bins לחניית-נגררים; doors כרציפי-העמסה המקושרים ל-Staging Areas.",
      ],
      flow: [
        { he: "הגעה לשער", code: "Checkpoint", note: "זיהוי TU/Vehicle" },
        { he: "Check-in", code: "/SCWM/TU", note: "כניסה ל-yard" },
        { he: "שיבוץ חניה", code: "Parking Space", note: "bin בתוך ה-yard" },
        { he: "תנועת חצר לרציף", code: "Yard Movement", note: "Warehouse Task" },
        { he: "העמסה/פריקה", code: "Door", note: "Warehouse Tasks רגילים" },
        { he: "Check-out", code: "Checkpoint", note: "יציאה מ-yard" },
      ],
      masterDataHe: [
        "Transportation Unit (TU) = הנגרר/קרון הנושא סחורה; אובייקט-העל של ניהול-החצר (/SCWM/TUNIT).",
        "Vehicle = כלי-הרכב הנושא TU אחד או יותר (/SCWM/VEH).",
        "Parking Space / Door = Storage Bins מסוג yard (/SCWM/LAGP) בתוך Storage Type מסוג Yard.",
        "Checkpoint = נקודת כניסה/יציאה לחצר; מגדיר היכן מתבצעים check-in / check-out.",
      ],
      mistakesHe: [
        "אי-הפעלת Yard Management ל-Warehouse Number — אובייקטי-החצר פשוט לא זמינים.",
        "מיפוי החצר כ-Storage Type רגיל במקום Role = Yard — תנועות-חצר לא נתמכות.",
        "checkpoint יחיד לכניסה וגם ליציאה במפעל עם תנועה גבוהה — נוצר צוואר-בקבוק בשער.",
        "ערבוב parking spaces של ריקים ומלאים ללא הבחנה — קושי בתעדוף ההעמסה.",
      ],
      troubleshootHe: [
        "לא ניתן לבצע check-in ל-TU ➔ Yard Management לא מופעל ל-Warehouse Number או ה-checkpoint לא מוגדר לכניסה.",
        "ה-TU 'נעלם' אחרי check-in ➔ לא הוקצתה parking space; בדוק את שיבוץ ה-bin בתוך ה-yard.",
        "לא ניתן להעביר TU לרציף ➔ ה-door תפוס/חסום, או ה-Yard Movement לא יצר Warehouse Task.",
        "אין נראות ב-/SCWM/MON ➔ ה-yard לא משויך ל-Warehouse Number הנכון.",
      ],
      bestPracticeHe: [
        "הפרד checkpoints לכניסה וליציאה במפעלי תנועה-גבוהה כדי למנוע פקקים.",
        "מפה parking spaces בקבוצות לפי תכלית (ריקים / מלאים / המתנת-QA) לתעדוף ברור.",
        "השתמש ב-/SCWM/MON כ-cockpit נראות לחצר בזמן-אמת.",
        "סנכרן door scheduling עם זמינות ה-Warehouse Tasks כדי שהרציף לא יעמוד ריק.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין Transportation Unit ל-Vehicle ב-EWM?", aHe: "ה-TU הוא הנגרר/קרון הפיזי הנושא את הסחורה והוא אובייקט-העל של ניהול-החצר; ה-Vehicle הוא כלי-הרכב שיכול לשאת TU אחד או יותר. תנועות-החצר והעמסה/פריקה נסבות סביב ה-TU." },
        { qHe: "כיצד ה-yard מיוצג מבנית ב-EWM?", aHe: "כ-Storage Type מסוג Yard ששייך ל-Warehouse Number; החניות (parking spaces) והרציפים (doors) הם Storage Bins בתוכו, וה-checkpoints הם נקודות-הכניסה/יציאה." },
        { qHe: "מה שלושת השלבים המרכזיים בזרימת-החצר?", aHe: "Check-in בשער → Yard Movement (העברה לחניה ואז לרציף) → Check-out בשער. ביניהם מתבצעת ההעמסה/פריקה דרך Warehouse Tasks רגילים." },
      ],
      takeawaysHe: [
        "Yard Logistics הופך את שטח-החצר ל'מחסן לוגי': bins = parking spaces/doors, מלאי = TUs.",
        "אובייקטי-העל: Transportation Unit (TU) ו-Vehicle; checkpoints הם נקודות הכניסה/יציאה.",
        "המטרה: נראות, קיצור זמני-המתנה ומניעת detention.",
        "תנאי-סף: הפעלת Yard Management ל-Warehouse Number ומיפוי Storage Type מסוג Yard.",
      ],
      relatedHe: [
        { labelHe: "EWM · שימוש ב-Yard Logistics (7.2)", href: "/library/wm/chapter-07/#sub-7.2" },
        { labelHe: "EWM · אובייקט · /SCWM/TUNIT", href: "/library/wm/object/SCWM_TUNIT/" },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2",
      titleHe: "שימוש ב-SAP Yard Logistics",
      titleEn: "Using SAP Yard Logistics",
      execHe:
        "תת-פרק זה עוסק בהפעלה היומיומית של Yard Logistics: כיצד TU עובר check-in, מנותב בין parking space לבין door באמצעות Yard Tasks/Orders, וכיצד הוא עובר check-out. שני התהליכים העיקריים הם Inbound (פריקה) ו-Outbound (העמסה), ושניהם נשענים על אותו מנוע-תנועות אך בכיוונים הפוכים. שליטה בתהליכים אלה היא הליבה התפעולית של ניהול-החצר.",
      beginnerHe:
        "אחרי שהבנו מהו yard, עכשיו נלמד 'איך משתמשים בו בפועל'. כל פעולה בחצר — להזיז נגרר מחניה לרציף, או מהרציף החוצה — מתבצעת דרך 'משימת-חצר' (yard task) שהמערכת יוצרת ונותנת לנהג/לטרקטור-החצר. יש שני סיפורים מרכזיים: סחורה שנכנסת (Inbound) וסחורה שיוצאת (Outbound). שניהם משתמשים באותם כלים, רק בכיוון הפוך.",
      consultantHe:
        "התנועה הבסיסית היא Yard Movement שמתממשת כ-Warehouse Task בתוך/בין Storage Types מסוג yard ו-staging. ה-TU עובר שלושה מצבים עיקריים: At Checkpoint (אחרי check-in), In Parking Space, At Door. המעברים נשלטים על-ידי Yard Task/Order — בדומה ל-Warehouse Order שמקבץ Warehouse Tasks. ניתן לבצע תנועות ידנית ב-/SCWM/TU או אוטומטית דרך Wave / Process-Oriented Storage Control. ה-door determination יכול להישען על Staging Area and Door Determination (SADD). ניטור מרכזי ב-/SCWM/MON תחת צומת Transportation Unit / Yard.",
      purposeHe:
        "לספק זרימה תפעולית מבוקרת מהשער ועד הרציף ובחזרה — להבטיח שכל TU מנותב לחניה/רציף הנכונים בזמן הנכון, שהמהלכים מתועדים, ושההעמסה/הפריקה מסונכרנת עם ה-Warehouse Tasks. כך מצטמצמים זמני-מחזור ועלויות-המתנה.",
      processExampleHe:
        "TU מגיע ב-check-in ומשובץ ל-parking space P-01. ה-SADD מזהה שהפריקה צריכה להתבצע בדלת D-12 הצמודה ל-Staging Area של הקבלה. נוצר Yard Order עם Yard Task 'P-01 → D-12'; טרקטור-החצר מבצע ומאשר. בתום הפריקה (Warehouse Tasks 101) נוצר Yard Task 'D-12 → checkpoint יציאה' ובוצע check-out.",
      cbcHe:
        "ב-CBC: נגרר מלא בפחיות-ריקות עובר check-in, ממתין ב-P-Empty-03, ומנותב לדלת-הפריקה הסמוכה למחסן-החומרים. במקביל, נגרר ריק מנותב לדלת-ההעמסה הצמודה לקו-המילוי שסיים אצווה, נטען בפלטות FERT דרך Warehouse Tasks, ויוצא ב-check-out לעבר ה-DC האזורי.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving ► Define Control for Shipping and Receiving Activities",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Staging Area and Door Determination (SADD)",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Transportation Unit ► Define TU Activities and Status",
      ],
      tables: ["/SCWM/TUNIT", "/SCWM/TU_SR_ACT", "/SCWM/DOOR", "/SCWM/ORDIM_O", "/SCWM/WHO"],
      tcodes: ["/SCWM/TU", "/SCWM/MON", "/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/WO"],
      fiori: ["F2762", "F4022", "W0001"],
      configHe: [
        "Control for Shipping and Receiving Activities: מגדיר את פעולות ה-TU (check-in, check-out, move) וסטטוסים מותרים בכל מעבר.",
        "Staging Area and Door Determination (SADD): קובע אוטומטית לאיזו door / staging area ינותב ה-TU לפי קריטריונים (route, product, warehouse process).",
        "Yard Movement / Process-Oriented Storage Control: שולט אם תנועות-החצר מבוצעות ידנית או מופעלות אוטומטית בתהליך.",
        "Define Doors & Staging Areas: מקשר רציפים לאזורי-ביניים ול-Storage Types של קבלה/משלוח.",
      ],
      flow: [
        { he: "Check-in TU", code: "/SCWM/TU", note: "סטטוס At Checkpoint" },
        { he: "שיבוץ חניה", code: "Parking Space", note: "סטטוס In Parking Space" },
        { he: "Door determination", code: "SADD", note: "בחירת door אוטומטית" },
        { he: "Yard Task לרציף", code: "Yard Order", note: "P-xx → D-yy" },
        { he: "העמסה/פריקה", code: "Warehouse Tasks", note: "101 / 201" },
        { he: "Check-out TU", code: "/SCWM/TU", note: "הסרה מה-yard" },
      ],
      masterDataHe: [
        "Yard Task / Yard Order — מקבצים את תנועות-החצר; מקבילים ל-Warehouse Task / Warehouse Order.",
        "TU Status — At Checkpoint / In Parking Space / At Door — מתעד את מצב ה-TU בכל רגע.",
        "Door — רציף-העמסה/פריקה המקושר ל-Staging Area ול-Storage Type של קבלה/משלוח.",
      ],
      mistakesHe: [
        "ביצוע תנועות-חצר ידני בלבד בלי SADD — נטל-עבודה ידני וטעויות-ניתוב.",
        "אי-הגדרת סטטוסים מותרים ב-Control for S&R — מעברי-TU נחסמים או מתבצעים בלא-סדר.",
        "door determination שלא תואם ל-Warehouse Process Type — TU מגיע לרציף הלא-נכון.",
        "אי-סגירת Yard Task פתוח — ה-TU 'תקוע' במצב-ביניים ולא ניתן ל-check-out.",
      ],
      troubleshootHe: [
        "ה-TU לא מנותב לרציף ➔ SADD לא הוגדר או קריטריוני-הקביעה לא תואמים את ה-TU.",
        "Yard Task לא נוצר ➔ Process-Oriented Storage Control / הגדרת התנועה חסרים.",
        "לא ניתן ל-check-out ➔ קיים Yard Task פתוח או TU עדיין At Door.",
        "ה-TU נתקע In Parking Space ➔ אין door פנוי או אין Warehouse Tasks שמושכים אותו לרציף.",
      ],
      bestPracticeHe: [
        "הגדר SADD מלא כדי שניתוב לרציף יהיה אוטומטי ועקבי.",
        "שלב את תנועות-החצר ב-Process-Oriented Storage Control להפעלה אוטומטית.",
        "נטר את כל ה-TUs הפעילים ב-/SCWM/MON ובחן TUs תקועים מדי-יום.",
        "תאם door scheduling עם Wave Management כדי שהרציף לא יעמוד ריק.",
      ],
      interviewHe: [
        { qHe: "מהו Yard Task ובמה הוא דומה ל-Warehouse Task?", aHe: "Yard Task הוא הוראת-תנועה בחצר (למשל מ-parking space לדלת); הוא מקבץ תחת Yard Order בדיוק כפי ש-Warehouse Tasks מקובצים תחת Warehouse Order, ומבוצע ומאושר על-ידי טרקטור-החצר/נהג." },
        { qHe: "מה תפקיד ה-SADD בזרימת-החצר?", aHe: "Staging Area and Door Determination קובע אוטומטית לאיזו door ולאיזה staging area ינותב ה-TU, לפי קריטריונים כמו route, מוצר ו-Warehouse Process Type — מונע ניתוב-ידני שגוי." },
        { qHe: "אילו סטטוסים עובר TU מ-check-in ועד check-out?", aHe: "At Checkpoint → In Parking Space → At Door → (אחרי השלמת ה-Warehouse Tasks) חזרה ל-checkpoint ויציאה. כל מעבר נשלט על-ידי Control for Shipping and Receiving Activities." },
      ],
      takeawaysHe: [
        "כל תנועה בחצר מתבצעת דרך Yard Task המקובץ ב-Yard Order.",
        "SADD מנתב אוטומטית TU לרציף/אזור-ביניים הנכון.",
        "ה-TU עובר מצבים: At Checkpoint → In Parking Space → At Door.",
        "Inbound ו-Outbound חולקים מנוע-תנועות זהה בכיוונים הפוכים.",
      ],
      relatedHe: [
        { labelHe: "EWM · תהליך Inbound (7.2.1)", href: "/library/wm/chapter-07/#sub-7.2.1" },
        { labelHe: "EWM · תהליך Outbound (7.2.2)", href: "/library/wm/chapter-07/#sub-7.2.2" },
      ],
      children: [
        {
          id: "7.2.1",
          titleHe: "תהליך כניסה (Inbound Process)",
          titleEn: "Inbound Process",
          execHe:
            "תהליך ה-Inbound בחצר מלווה TU נכנס מרגע ההגעה לשער ועד שתכולתו נפרקת ונקלטת למחסן. הוא מסנכרן את הגעת-המשאית עם ה-Inbound Delivery וה-Warehouse Tasks של הקבלה, ומבטיח שהפריקה תתבצע בדלת הנכונה ובזמן הנכון.",
          beginnerHe:
            "Inbound = 'סחורה נכנסת'. משאית עם נגרר מלא מגיעה לשער, נרשמת (check-in), ממתינה בחניה, ואז מקבלת הוראה לגשת לדלת-פריקה. בדלת פורקים את הסחורה ומכניסים אותה למחסן. בסוף הנגרר (אולי ריק עכשיו) יוצא ב-check-out.",
          consultantHe:
            "ה-check-in (/SCWM/PRDI — Process Inbound TU, או /SCWM/TU) משייך את ה-TU ל-Inbound Delivery. ה-SADD קובע את ה-door ואת ה-Staging Area של הקבלה. בהגעה לדלת מתבצע unloading; נוצרים Putaway Warehouse Tasks (movement type 101 / קבלה) שמעבירים את הסחורה מ-staging ל-bins. ה-TU עובר At Door, ובסיום הפריקה Yard Task מחזיר אותו ל-checkpoint ל-check-out. ניתן לקשר GR ל-Inbound Delivery כך שדיווח-הפריקה יזין את ה-GR.",
          purposeHe:
            "להבטיח קבלת-סחורה מסודרת: TU מנותב לדלת הנכונה הצמודה ל-Staging Area של הקבלה, הפריקה מתועדת, וה-Inbound Delivery וה-GR מסונכרנים עם התנועה הפיזית בחצר.",
          processExampleHe:
            "נגרר עם חומרי-גלם מגיע, check-in ב-/SCWM/PRDI ומשויך ל-Inbound Delivery. SADD בוחר door D-04 הצמוד ל-Staging Area של הקבלה. Yard Task 'P-07 → D-04' מבוצע; בדלת מתבצע unloading ונוצרים Putaway Tasks ל-bins. עם סיום הפריקה — Yard Task 'D-04 → checkpoint' ו-check-out.",
          cbcHe:
            "ב-CBC: נגרר עם תרכיז/סוכר (ROH מנוהלי-אצווה) עובר check-in, נשקל בגשר-המשקל, ומנותב לדלת הצמודה למחסן-החומרים. הפריקה יוצרת Putaway Tasks עם batch ל-bins; ה-Inbound Delivery נסגר וה-GR מדווח. הנגרר הריק יוצא ב-check-out.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► Define Process Profiles",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Staging Area and Door Determination (SADD) ► Define Access for Storage Process",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving ► Define Checkpoint (Inbound)",
          ],
          tables: ["/SCWM/TUNIT", "/SCWM/DOOR", "/SCWM/ORDIM_O", "/SCWM/AQUA", "/SCDL/DB_PROCH_I"],
          tcodes: ["/SCWM/PRDI", "/SCWM/TU", "/SCWM/MON", "/SCWM/GR"],
          fiori: ["F2762", "F0510", "W0001"],
          configHe: [
            "Checkpoint (Inbound): הגדרת שער-הכניסה שבו מתבצע check-in ל-TU נכנס.",
            "SADD for Inbound: ניתוב ה-TU לדלת המקושרת ל-Staging Area של הקבלה לפי Warehouse Process Type.",
            "Inbound Delivery linkage: שיוך ה-TU ל-Inbound Delivery כך שהפריקה תזין את ה-GR.",
          ],
          flow: [
            { he: "הגעה לשער", code: "Checkpoint", note: "TU נכנס" },
            { he: "Check-in + שיוך Delivery", code: "/SCWM/PRDI" },
            { he: "המתנה בחניה", code: "Parking Space" },
            { he: "Door determination", code: "SADD", note: "דלת קבלה" },
            { he: "פריקה + Putaway", code: "Warehouse Tasks", note: "101" },
            { he: "Check-out נגרר ריק", code: "/SCWM/TU" },
          ],
          masterDataHe: [
            "Inbound Delivery — מסמך-הקבלה המקושר ל-TU; הפריקה מזינה את ה-GR.",
            "Staging Area (קבלה) — אזור-הביניים שאליו מקושרת דלת-הפריקה.",
            "Putaway Warehouse Task — מעביר את הסחורה מ-staging ל-bins הסופיים.",
          ],
          mistakesHe: [
            "אי-שיוך ה-TU ל-Inbound Delivery בעת check-in — הפריקה לא מזינה את ה-GR.",
            "SADD שמנתב לדלת שאינה צמודה ל-Staging Area של הקבלה — הליכה מיותרת ובלבול.",
            "ביצוע GR ב-ERP במנותק מהפריקה הפיזית — אי-התאמה בין מלאי-מערכת לפיזי.",
          ],
          troubleshootHe: [
            "ה-GR לא מתעדכן אחרי פריקה ➔ ה-TU לא שויך ל-Inbound Delivery ב-check-in.",
            "ה-TU מנותב לדלת שגויה ➔ קריטריוני SADD / Warehouse Process Type לקבלה שגויים.",
            "Putaway Tasks לא נוצרים ➔ Staging Area לא מקושר לדלת או חסר Storage Process.",
          ],
          bestPracticeHe: [
            "שייך כל TU נכנס ל-Inbound Delivery כבר ב-check-in.",
            "הגדר SADD כך שדלת-הפריקה תהיה הקרובה ביותר ל-bins היעד.",
            "תזמן הגעת-משאיות (appointment) מול זמינות-דלתות כדי לצמצם המתנה.",
          ],
          interviewHe: [
            { qHe: "כיצד מסונכרן ה-check-in עם ה-Inbound Delivery?", aHe: "בעת check-in (/SCWM/PRDI) משייכים את ה-TU ל-Inbound Delivery; כך הפריקה הפיזית בדלת מתועדת מול המסמך ומזינה את ה-GR." },
            { qHe: "מה קובע SADD בתהליך-הכניסה?", aHe: "את הדלת ואת ה-Staging Area של הקבלה שאליהם ינותב ה-TU, לפי Warehouse Process Type וקריטריונים נוספים — כדי שהפריקה תתבצע סמוך ל-bins היעד." },
          ],
          takeawaysHe: [
            "Inbound: check-in → חניה → דלת-קבלה → פריקה + Putaway → check-out.",
            "שיוך TU ל-Inbound Delivery הוא תנאי לדיווח-GR תקין.",
            "SADD מנתב את ה-TU לדלת הצמודה ל-Staging Area של הקבלה.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך Outbound (7.2.2)", href: "/library/wm/chapter-07/#sub-7.2.2" },
          ],
        },
        {
          id: "7.2.2",
          titleHe: "תהליך יציאה (Outbound Process)",
          titleEn: "Outbound Process",
          execHe:
            "תהליך ה-Outbound בחצר מלווה TU יוצא מרגע הגעת כלי-הרכב (לרוב ריק) ועד שהוא נטען בסחורה ויוצא בשער. הוא מסנכרן את ה-Outbound Delivery וה-Pick/Load Warehouse Tasks עם תנועת ה-TU לדלת-ההעמסה, ומבטיח שהמשלוח ייטען בזמן ויעזוב את החצר במהירות.",
          beginnerHe:
            "Outbound = 'סחורה יוצאת'. נגרר ריק מגיע, נרשם (check-in), ממתין בחניה, ומקבל הוראה לגשת לדלת-העמסה. בדלת טוענים עליו את הסחורה שכבר נאספה מהמדפים, ואז הוא יוצא מלא ב-check-out לעבר הלקוח.",
          consultantHe:
            "ה-check-in (/SCWM/PRDO — Process Outbound TU, או /SCWM/TU) משייך את ה-TU ל-Outbound Delivery. ה-SADD קובע את דלת-ההעמסה ואת ה-Staging Area של המשלוח. ה-Pick Warehouse Tasks (movement type 201 / ליקוט) מביאים את הסחורה ל-staging; ה-loading מאשר את ההעמסה ל-TU; ולבסוף Goods Issue. ה-TU עובר At Door, ובסיום ההעמסה Yard Task מחזיר אותו ל-checkpoint ל-check-out. ה-Wave Management לרוב מתזמן את הליקוט מול זמינות-הדלת.",
          purposeHe:
            "להבטיח משלוח-סחורה מסודר: ה-TU מנותב לדלת-ההעמסה הצמודה ל-Staging Area של המשלוח, ההעמסה מסונכרנת עם ה-Pick Tasks, וה-Outbound Delivery וה-GI מתעדכנים עם היציאה הפיזית מהחצר.",
          processExampleHe:
            "נגרר ריק מגיע, check-in ב-/SCWM/PRDO ומשויך ל-Outbound Delivery. SADD בוחר door D-21 הצמוד ל-Staging Area של המשלוח. Wave משחרר Pick Tasks שמביאים את הפלטות ל-staging. Yard Task 'P-12 → D-21' מבוצע; ההעמסה מאושרת ל-TU; מדווח Goods Issue; Yard Task 'D-21 → checkpoint' ו-check-out.",
          cbcHe:
            "ב-CBC: נגרר ריק עובר check-in ומנותב לדלת הצמודה לקו-המילוי שסיים אצווה. Wave משחרר Pick Tasks לפלטות FERT; ההעמסה מאושרת, Goods Issue מדווח, וה-TU המלא יוצא ב-check-out לעבר ה-DC האזורי או הלקוח הקמעונאי.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery ► Define Process Profiles",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► Staging Area and Door Determination (SADD)",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving ► Define Checkpoint (Outbound)",
          ],
          tables: ["/SCWM/TUNIT", "/SCWM/DOOR", "/SCWM/ORDIM_O", "/SCWM/WHO", "/SCDL/DB_PROCH_O"],
          tcodes: ["/SCWM/PRDO", "/SCWM/TU", "/SCWM/MON", "/SCWM/GI", "/SCWM/WAVE"],
          fiori: ["F2762", "F0509", "W0001"],
          configHe: [
            "Checkpoint (Outbound): הגדרת שער-היציאה שבו מתבצע check-out ל-TU מלא.",
            "SADD for Outbound: ניתוב ה-TU לדלת-ההעמסה המקושרת ל-Staging Area של המשלוח.",
            "Outbound Delivery linkage + Wave: שיוך ה-TU ל-Outbound Delivery ותזמון ה-Pick Tasks מול זמינות-הדלת.",
          ],
          flow: [
            { he: "הגעת נגרר ריק", code: "Checkpoint" },
            { he: "Check-in + שיוך Delivery", code: "/SCWM/PRDO" },
            { he: "ליקוט ל-staging", code: "Wave / Pick Tasks", note: "201" },
            { he: "Door determination", code: "SADD", note: "דלת העמסה" },
            { he: "העמסה + Goods Issue", code: "Loading", note: "GI" },
            { he: "Check-out נגרר מלא", code: "/SCWM/TU" },
          ],
          masterDataHe: [
            "Outbound Delivery — מסמך-המשלוח המקושר ל-TU; ההעמסה מזינה את ה-Goods Issue.",
            "Staging Area (משלוח) — אזור-הביניים שאליו מקושרת דלת-ההעמסה.",
            "Pick / Load Warehouse Task — מביא את הסחורה ל-staging ומאשר את ההעמסה ל-TU.",
          ],
          mistakesHe: [
            "ליקוט ל-staging הלא-נכון ביחס לדלת שנקבעה ב-SADD — הליכה מיותרת בהעמסה.",
            "check-out לפני דיווח Goods Issue — אי-התאמה בין מלאי-מערכת לפיזי.",
            "אי-תיאום Wave מול זמינות-הדלת — הסחורה מוכנה אך הדלת תפוסה (או להפך).",
          ],
          troubleshootHe: [
            "ה-GI לא מתעדכן אחרי העמסה ➔ ה-TU לא שויך ל-Outbound Delivery או ההעמסה לא אושרה.",
            "אין Pick Tasks לפני ההעמסה ➔ ה-Wave לא שוחרר או ה-Staging Area לא תואם לדלת.",
            "לא ניתן ל-check-out ➔ ה-TU עדיין At Door או קיים Yard Task פתוח.",
          ],
          bestPracticeHe: [
            "שייך כל TU יוצא ל-Outbound Delivery כבר ב-check-in.",
            "תזמן Wave כך שהליקוט יסתיים בדיוק כשהדלת מתפנה (just-in-time staging).",
            "ודא Goods Issue מדווח לפני check-out כדי לשמור התאמת-מלאי.",
          ],
          interviewHe: [
            { qHe: "כיצד מסונכרן ה-Outbound בחצר עם ה-Wave Management?", aHe: "ה-Wave משחרר את ה-Pick Tasks כך שהסחורה מגיעה ל-Staging Area בעת שה-TU מנותב לדלת-ההעמסה הצמודה; כך ההעמסה מתבצעת just-in-time והדלת לא עומדת ריקה." },
            { qHe: "מתי מדווח ה-Goods Issue ביחס ל-check-out?", aHe: "ה-GI מדווח עם השלמת ההעמסה ל-TU ולפני ה-check-out, כדי שמלאי-המערכת יישאר תואם למצב הפיזי בעת יציאת הנגרר מהחצר." },
          ],
          takeawaysHe: [
            "Outbound: check-in → ליקוט/Wave → דלת-העמסה → העמסה + GI → check-out.",
            "שיוך TU ל-Outbound Delivery הוא תנאי לדיווח-GI תקין.",
            "תיאום Wave מול זמינות-הדלת מאפשר העמסה just-in-time.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך Inbound (7.2.1)", href: "/library/wm/chapter-07/#sub-7.2.1" },
          ],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "Yard Logistics ב-EWM סוגר את הפער בין שער-המפעל לבין דלת-המחסן. הוא מנהל את ה-TUs וה-Vehicles לאורך זרימה אחידה — check-in → תנועת-חצר → check-out — ומסנכרן אותה עם תהליכי ה-Inbound וה-Outbound ועם ה-Warehouse Tasks. התוצאה: נראות מלאה, זמני-מחזור קצרים ועלויות-המתנה מופחתות.",
      beginnerHe:
        "סיכום בקצרה: למדנו מהו yard ואיך הוא ממופה כ'מחסן לוגי' (7.1), איך משתמשים בו בפועל דרך yard tasks ושני התהליכים Inbound ו-Outbound (7.2, 7.2.1, 7.2.2). הרעיון המרכזי שחוזר לאורך כל הפרק: כל משאית עוברת check-in, נעה בחצר בצורה מבוקרת, ועושה check-out — כשהכול מתועד ומסונכרן עם המחסן.",
      consultantHe:
        "מבחינת מימוש: הפעלת Yard Management ל-Warehouse Number, מיפוי Storage Type מסוג Yard עם parking spaces ו-doors כ-bins, הגדרת checkpoints, וקונפיגורציית SADD ו-Control for Shipping and Receiving Activities הם אבני-היסוד. ה-TU הוא אובייקט-העל; Yard Task/Order מניעים תנועות; /SCWM/MON מספק נראות. הבחנה חשובה: יכולת ה-yard המובנית של EWM מול מוצר SAP Yard Logistics (YL) העצמאי המבוסס TM — שניהם משתמשים במרחב-השמות \\/SCWM\\/* ובמושגי TU / checkpoint / parking space דומים.",
      purposeHe:
        "לקבע את התמונה הכוללת: ניהול-החצר אינו מודול נפרד אלא שכבת-נראות ובקרה המחברת תחבורה (TM) למחסן (EWM). מטרתו לוודא שכל כלי-רכב מנותב נכון, בזמן, ובלי המתנות מיותרות — וכך לשמר את מדדי-השירות ועלויות-הלוגיסטיקה.",
      processExampleHe:
        "מקצה-לקצה: TU מגיע → check-in → parking space → SADD בוחר door → Yard Task לרציף → פריקה/העמסה דרך Warehouse Tasks → GR/GI → Yard Task חזרה ל-checkpoint → check-out. אותה שלדה משרתת גם Inbound וגם Outbound.",
      cbcHe:
        "ב-CBC התמונה השלמה: עשרות נגררים נכנסים ויוצאים מדי-יום מ-DC המשקאות; ניהול-החצר ב-EWM מבטיח שריקים נפרקים סמוך למחסן-החומרים, שמלאים נטענים סמוך לקווי-המילוי, ושאף נגרר לא 'הולך-לאיבוד' בחצר — תוך שמירה על detention נמוך וזמן-מחזור קצר.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Activate Yard Management",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving ► Define Control for Shipping and Receiving Activities",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Monitoring ► Warehouse Management Monitor (/SCWM/MON)",
      ],
      tables: ["/SCWM/TUNIT", "/SCWM/VEH", "/SCWM/DOOR", "/SCWM/LAGP", "/SCWM/TYARD"],
      tcodes: ["/SCWM/TU", "/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/MON", "/SCWM/YM"],
      fiori: ["F2762", "W0001"],
      configHe: [
        "אבני-היסוד: Activate Yard Management → Storage Type (Role = Yard) → Checkpoints → SADD → Control for S&R.",
        "TU הוא אובייקט-העל; Yard Task/Order מניעים תנועות; /SCWM/MON מספק נראות.",
        "סנכרון עם Inbound / Outbound Delivery ו-Warehouse Tasks הוא המפתח לדיווח-GR/GI תקין.",
      ],
      flow: [
        { he: "הגעה + Check-in", code: "Checkpoint" },
        { he: "תנועת-חצר", code: "Yard Task", note: "P-xx ↔ D-yy" },
        { he: "פריקה/העמסה", code: "Warehouse Tasks", note: "GR / GI" },
        { he: "Check-out", code: "Checkpoint" },
      ],
      masterDataHe: [
        "TU / Vehicle — אובייקטי-העל של ניהול-החצר.",
        "Parking Space / Door — bins מסוג yard המייצגים את החצר הפיזית.",
        "Inbound / Outbound Delivery — מקשרים את תנועת-החצר לדיווחי GR/GI.",
      ],
      mistakesHe: [
        "התייחסות ל-Yard Logistics כמודול-איים מנותק במקום שכבה המחברת TM ל-EWM.",
        "הזנחת /SCWM/MON כ-cockpit נראות — TUs תקועים לא מזוהים בזמן.",
        "אי-סנכרון תנועת-החצר עם ה-Deliveries — דיווחי GR/GI לא תואמים את הפיזי.",
      ],
      troubleshootHe: [
        "זמני-המתנה ארוכים בחצר ➔ בדוק door scheduling, SADD ותיאום Wave.",
        "TU תקוע במצב-ביניים ➔ Yard Task פתוח או סטטוס לא-מאושר ב-Control for S&R.",
        "אי-התאמת מלאי ➔ GR/GI לא סונכרנו עם תנועת-החצר וה-Delivery.",
      ],
      bestPracticeHe: [
        "הטמע את ניהול-החצר כשכבה אחת רציפה מ-check-in ועד check-out.",
        "השען על SADD ו-Wave לאוטומציה; הימנע מניתוב-ידני.",
        "מדוד KPI: זמן-שהייה ממוצע בחצר, ניצול-דלתות ו-detention.",
        "נטר יומית ב-/SCWM/MON ופעל על TUs תקועים.",
      ],
      interviewHe: [
        { qHe: "מהן אבני-היסוד הקונפיגורטיביות של Yard Logistics ב-EWM?", aHe: "הפעלת Yard Management ל-Warehouse Number, Storage Type מסוג Yard עם parking spaces ו-doors כ-bins, checkpoints, SADD, ו-Control for Shipping and Receiving Activities." },
        { qHe: "כיצד Yard Logistics מחבר בין TM ל-EWM?", aHe: "הוא שכבת-נראות ובקרה: ה-TU המגיע מתכנון-התחבורה (TM) עובר check-in לחצר (EWM), מנותב לדלת, נפרק/נטען דרך Warehouse Tasks, ויוצא ב-check-out — כך שתי המערכות מסונכרנות סביב אותו TU." },
        { qHe: "מהי ההבחנה בין יכולת ה-yard של EWM למוצר SAP Yard Logistics (YL)?", aHe: "EWM כולל ניהול-חצר מובנה כחלק מהמחסן; SAP Yard Logistics (YL) הוא מוצר עצמאי מבוסס TM/EWM לניהול-חצר מורכב וגדול-היקף. שניהם חולקים מושגי TU, checkpoint ו-parking space ומרחב-שמות \\/SCWM\\/*." },
      ],
      takeawaysHe: [
        "Yard Logistics סוגר את הפער שער→דלת ומחבר TM ל-EWM.",
        "זרימה אחידה: check-in → yard task → check-out, ל-Inbound ול-Outbound כאחד.",
        "אבני-יסוד: Yard Management מופעל, Storage Type=Yard, checkpoints, SADD.",
        "נראות ב-/SCWM/MON + סנכרון עם Deliveries = GR/GI תקין וזמני-מחזור קצרים.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת Yard Logistics (7.1)", href: "/library/wm/chapter-07/#sub-7.1" },
        { labelHe: "EWM · שימוש ב-Yard Logistics (7.2)", href: "/library/wm/chapter-07/#sub-7.2" },
      ],
    },
  ],
};
