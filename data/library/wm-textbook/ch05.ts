// ===== WM/EWM Digital Textbook — Chapter 5 (gold-standard learning chapter) =====
// Dock Appointment Scheduling (DAS). Every node is a complete LearningNode with
// 18 facets of authored Hebrew — enough to study the topic without the source book.
// Only three subchapters (5.1, 5.2 with 5.2.1/5.2.2, 5.3) — each authored DEEP.
// Transformative Hebrew; SAP identifiers verbatim EN. CBC = Coca-Cola bottling.
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "תזמון תורים לרציפים (Dock Appointment Scheduling)",
  titleEn: "Dock Appointment Scheduling",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-Dock Appointment Scheduling (DAS) ב-SAP EWM — המנגנון שמתזמן את הגעת המשאיות לרציפי המחסן ומסנכרן ביניהן לבין תהליכי הכניסה (Inbound) והיציאה (Outbound). שלושת תתי-הפרקים — סקירת DAS, תכנון התורים (כולל תהליך הכניסה ב-DAS והתכנון ב-EWM), וסיכום — הורחבו ליחידות-לימוד עצמאיות בנות 18 מקטעים כל אחת: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori ואפליקציות /SCWM/*, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט ב-DAS ללא הספר המקורי. הקשר CBC: מפעל מילוי משקאות של קוקה-קולה שבו משאיות-חומרי-גלם (תרכיז, סוכר, CO2, בקבוקים) נכנסות ומשאיות-משקאות-מוגמרים יוצאות — וכולן חולקות מספר מצומצם של רציפים שיש לתזמן בקפדנות.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1",
      titleHe: "סקירת תזמון תורים לרציפים (Overview of Dock Appointment Scheduling)",
      titleEn: "Overview of Dock Appointment Scheduling",
      execHe:
        "Dock Appointment Scheduling (DAS) הוא רכיב ב-SAP EWM המנהל את היומן של רציפי-הטעינה/הפריקה (Loading Points / Doors) במחסן. במקום שמשאיות יגיעו ללא תיאום ויצרו פקקים ברציפים, DAS מקצה לכל משאית 'תור' (Appointment) — חלון-זמן מוגדר אל מול רציף ונקודת-טעינה ספציפיים. כך המחסן מאזן את עומס-העבודה לאורך היום, מקצר זמני-המתנה של נהגים, ומסנכרן את הגעת הסחורה עם הזמינות של כוח-האדם והציוד.",
      beginnerHe:
        "דמיין מרפאה עם כמה חדרי-בדיקה: בלי תורים — כולם מגיעים ב-9:00 ויש תור ענק; עם תורים — כל מטופל מקבל שעה וחדר. DAS עושה בדיוק את זה למשאיות: כל משאית מקבלת 'תור' — שעה מסוימת מול 'דלת' (רציף) מסוימת. ה-Appointment הוא התור, ה-Door/Loading Point הוא החדר, וה-Checkpoint הוא הקבלה בכניסה שבה רושמים שהמשאית הגיעה. כך אין צפיפות ברציפים ואיש לא ממתין סתם.",
      consultantHe:
        "DAS הוא חלק מ-EWM ויושב על אובייקט ה-Transportation Unit (TU) / Vehicle. מבחינה מבנית הוא מנהל יומן (Calendar) פר Loading Point, כאשר כל Appointment משויך ל-Door, ל-Loading Point, לחלון-זמן ולעיתים ל-TU/Shipment. ה-Checkpoint משמש לרישום Check-in/Check-out פיזי של הרכב בכניסה/יציאה מאתר המחסן, ומקשר את ה-Yard Management ל-DAS. אובייקטי-מפתח: Warehouse Door (/SCWM/DOOR), Staging Area/Loading Point, ו-Transportation Unit. ה-DAS מסופק עם אפליקציות ייעודיות (Fiori/Web Dynpro) לתחזוקת היומן, ומשתלב עם ה-Inbound וה-Outbound Delivery כדי לקשר תור פיזי לתעודות הלוגיסטיות. שים לב: DAS אינו תחליף ל-Yard Management — הוא ה'תיאום-מראש', בעוד ה-Yard מנהל את התנועה בתוך החצר אחרי ההגעה.",
      purposeHe:
        "המטרה: להפוך את הגעת המשאיות מאירוע אקראי לאירוע מתוכנן. תיאום-מראש מאפשר לפרוס את עומס-הרציפים והפריקה לאורך המשמרת, להבטיח שכוח-אדם וציוד (מלגזות, פועלי-טעינה) זמינים בדיוק כשהמשאית מגיעה, לצמצם זמני-המתנה ועלויות-דמי-המתנה (Demurrage), ולספק לספקים ולמובילים שקיפות לגבי 'מתי מותר לי להגיע'.",
      processExampleHe:
        "מוביל מקבל הזמנת-איסוף ל-Outbound Delivery. דרך פורטל/אפליקציית DAS הוא מבקש תור: המערכת מציגה חלונות-זמן פנויים מול Loading Point מתאים לסוג-המשאית, והוא מאשר 14:00–15:00 מול Door 5. ביום ההגעה הנהג עובר ב-Checkpoint (Check-in) — נרשם שהגיע — ומופנה ל-Door 5 בשעה שנקבעה. הטעינה מתבצעת מול ה-Outbound Delivery, ובסיום הנהג עובר Check-out ב-Checkpoint ויוצא. היומן מתעדכן: ה-Appointment עבר ל-Completed.",
      cbcHe:
        "ב-CBC: בבוקר מגיעות משאיות חומרי-גלם — תרכיז (Batch-managed), סוכר בתפזורת, CO2 ובקבוקים — כל אחת מתוזמנת ל-Door פריקה לפי סוג-החומר (סוכר בתפזורת ל-Door עם מערכת-שאיבה; תרכיז ל-Door מקורה). אחר-הצהריים מתוזמנות משאיות-משקאות-מוגמרים ל-Doors טעינה. DAS מבטיח ששתי הזרימות לא מתנגשות על אותם רציפים, ושמשאית-הסוכר לא ממתינה כשמשאית-המשקאות תופסת את ה-Door שלה.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Basic Settings for Dock Appointment Scheduling",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► General Settings ► Define Loading Points",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Warehouse Door ► Define Warehouse Door",
      ],
      tables: ["/SCWM/DOOR", "/SCWM/TUNIT", "/SCDL/DB_PROCH_O", "/SCWM/WHGRP", "/SCWM/STAGE_AREA"],
      tcodes: ["/SCWM/DAS", "/SCWM/CICO", "/SCWM/DOOR", "/SCWM/TU", "/SCWM/YMOVE"],
      fiori: ["/SCWM/DAS", "F2786", "F2787"],
      configHe: [
        "Activate Dock Appointment Scheduling: הפעלת DAS ברמת ה-Warehouse Number כתנאי-סף לכל השאר.",
        "Define Loading Points: יחידות-הטעינה/פריקה שעבורן מנוהל היומן; כל Loading Point משויך ל-Doors.",
        "Define Warehouse Door (/SCWM/DOOR): הרציפים הפיזיים — קישור ל-Staging Area ולכיוון (Inbound/Outbound/Both).",
        "Define Checkpoints: נקודות Check-in/Check-out פיזיות באתר; קישור ל-Yard Management.",
        "Appointment Types & Durations: סוגי-תורים וברירות-מחדל למשך-חלון לפי סוג-משאית/סחורה.",
      ],
      flow: [
        { he: "בקשת תור", code: "DAS", note: "מוביל/ספק בוחר חלון פנוי" },
        { he: "הקצאת Door + Loading Point", code: "/SCWM/DOOR" },
        { he: "Check-in בכניסה", code: "/SCWM/CICO", note: "רישום הגעה" },
        { he: "פריקה/טעינה מול Delivery", code: "TU" },
        { he: "Check-out", code: "/SCWM/CICO", note: "סגירת התור" },
        { he: "Appointment = Completed", code: "DAS" },
      ],
      masterDataHe: [
        "Warehouse Door (/SCWM/DOOR) = הרציף; משויך ל-Staging Area, כיוון, ו-Loading Point.",
        "Loading Point = יחידת-תזמון שעבורה מנוהל היומן; מקבץ Doors דומים.",
        "Transportation Unit / Vehicle = הרכב הפיזי המשויך ל-Appointment ולתעודות.",
        "Checkpoint = נקודת Check-in/Check-out, מגשר ל-Yard Management.",
      ],
      mistakesHe: [
        "אי-הפעלת DAS ברמת ה-Warehouse — האפליקציות לא נטענות בכלל.",
        "Loading Points ללא Doors משויכים — אין יומן לתזמן עליו.",
        "ערבוב כיווני-Door (Inbound/Outbound) ללא בקרה — משאיות מתוזמנות לרציף לא-מתאים.",
        "הזנחת Checkpoint — אין רישום הגעה, ה-Yard וה-DAS לא מסונכרנים.",
      ],
      troubleshootHe: [
        "אין חלונות-זמן פנויים להצגה ➔ בדוק שה-Loading Point מוגדר, משויך ל-Doors ושעות-הפעילות (Calendar) מאוכלסות.",
        "Check-in נכשל ➔ Checkpoint לא מוגדר או לא מקושר ל-Warehouse/Yard.",
        "Appointment לא מתקשר ל-Delivery ➔ TU/Shipment לא משויך לתעודת המשלוח.",
        "אפליקציית DAS ריקה ➔ DAS לא מופעל ברמת ה-Warehouse Number.",
      ],
      bestPracticeHe: [
        "הפעל DAS והגדר Loading Points/Doors כשלב-בסיס לפני כל תרחיש Inbound/Outbound.",
        "הגדר Appointment Durations ריאליות לפי סוג-סחורה — חלון קצר מדי גורם לחפיפות.",
        "חבר Checkpoint ל-Yard Management כדי לקבל תמונת-אמת מהכניסה ועד הרציף.",
        "תקנן סוגי-תורים מעטים וברורים; פחות שונות = פחות התנגשויות-יומן.",
      ],
      interviewHe: [
        { qHe: "מהו Dock Appointment Scheduling וכיצד הוא שונה מ-Yard Management?", aHe: "DAS מתזמן מראש את הגעת המשאיות לרציפים (היומן והחלונות), בעוד Yard Management מנהל את תנועת הרכבים בתוך החצר לאחר ההגעה. DAS הוא ה'תיאום-מראש', ה-Yard הוא ה'ניהול-בשטח'." },
        { qHe: "מהם שלושת האובייקטים המרכזיים ב-DAS?", aHe: "Loading Point (יחידת-התזמון/היומן), Warehouse Door (הרציף הפיזי, /SCWM/DOOR), ו-Checkpoint (רישום Check-in/Check-out). ה-Appointment מקשר ביניהם לחלון-זמן." },
        { qHe: "מה תפקיד ה-Checkpoint?", aHe: "רישום פיזי של הגעת/עזיבת הרכב באתר (Check-in/Check-out), המגשר בין ה-DAS ל-Yard Management ומאמת שהמשאית אכן הגיעה בחלון שתוזמן." },
      ],
      takeawaysHe: [
        "DAS הופך הגעת-משאיות מאירוע אקראי לאירוע מתוכנן מול רציף וחלון-זמן.",
        "אובייקטי-ליבה: Loading Point (יומן), Warehouse Door (רציף), Checkpoint (Check-in/out).",
        "DAS ≠ Yard Management — תיאום-מראש מול ניהול-בחצר; הם משלימים.",
        "הפעלה ברמת Warehouse + Loading Points/Doors הם תנאי-סף לכל תרחיש.",
      ],
      relatedHe: [
        { labelHe: "EWM · תכנון תורים לרציפים (5.2)", href: "/library/wm/chapter-05/#sub-5.2" },
        { labelHe: "EWM · ניהול חצר (Yard Management)", href: "/library/wm/chapter-04/" },
        { labelHe: "אובייקט · /SCWM/DOOR", href: "/library/wm/object/SCWM_DOOR/" },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2",
      titleHe: "תכנון תורים לרציפים (Dock Appointment Planning)",
      titleEn: "Dock Appointment Planning",
      execHe:
        "תכנון התורים הוא הליבה התפעולית של DAS: כאן בונים, משבצים ומנהלים בפועל את ה-Appointments ביומן הרציפים. התכנון מאזן בין הביקוש (משאיות שצריכות להגיע) להיצע (רציפים, חלונות-זמן, כוח-אדם), מקשר כל תור לתעודת Inbound/Outbound Delivery ול-Transportation Unit, ומאפשר תזמון-מחדש (Rescheduling), ביטולים והתראות על חפיפות. תכנון טוב = רציפים מנוצלים במלואם בלי פקקים.",
      beginnerHe:
        "אם 5.1 הסביר 'מה זה תור', 5.2 מסביר 'איך מנהלים את לוח-התורים'. זה כמו מזכירה שמסתכלת על היומן, רואה אילו חלונות פנויים, משבצת כל משאית בחלון מתאים, ואם מתעכבים — מזיזה תור. בתכנון מחברים כל תור למשלוח (מה המשאית מביאה או לוקחת) ולרכב (איזו משאית), כך שברציף יודעים מראש מה מצפה להם.",
      consultantHe:
        "התכנון מתבצע באפליקציית ה-DAS Planning (תצוגת Gantt/יומן פר Loading Point). כל Appointment נושא: Loading Point, Door, חלון-זמן (Planned Start/End), Appointment Type, סטטוס (Requested/Confirmed/Checked-in/In Process/Completed/Cancelled), וקישור ל-TU ול-Delivery. המערכת אוכפת זמינות לפי שעות-הפעילות (Operating Times / Calendar) של ה-Loading Point ולפי Capacity (כמה תורים במקביל). תזמון-מחדש מזיז את החלון תוך בדיקת-חפיפות. אינטגרציה: ה-Inbound Delivery (ASN) או ה-Outbound Delivery מספקים את ההקשר הלוגיסטי, וה-TU מקשר את הפלנינג לביצוע ב-Yard וברציף. הרשאות וערוצי-בקשה (פורטל-ספק מול תכנון-פנימי) נשלטים בקונפיגורציה.",
      purposeHe:
        "להפוך את כוונת-ההגעה לשיבוץ-מחייב מול משאב פיזי. התכנון מבטיח ניצול-רציפים מיטבי, מונע התנגשויות, מאפשר תעדוף (משאית-קירור לפני אחרות), ונותן למחסן 'תחזית-עומס' לשעות הקרובות — בסיס לתכנון-כוח-אדם ולמשיכת-Resources.",
      processExampleHe:
        "מתכנן-המחסן פותח את יומן ה-Loading Point לבוקר מחר. הוא רואה שלושה תורי-Inbound מבוקשים. הוא מאשר תור A ל-08:00 מול Door 1, גורר את תור B ל-09:30 (כי 08:00 תפוס), ומשייך כל תור ל-Inbound Delivery וה-TU המתאימים. כשמשאית A מתעכבת, הוא מבצע Rescheduling ל-08:45 — המערכת בודקת שאין חפיפה מול Door 1 ומאשרת. בהגעה בפועל, ה-Check-in מקדם את הסטטוס ל-Checked-in.",
      cbcHe:
        "ב-CBC המתכנן משבץ בבוקר את משאיות חומרי-הגלם: תרכיז ל-08:00 (Door מקורה), סוכר-בתפזורת ל-08:30 (Door עם שאיבה), CO2 ל-09:00. כל תור קשור ל-Inbound Delivery (ASN של הספק) ול-TU. אחר-הצהריים נפתחים חלונות-Outbound למשאיות-המשקאות. כשמשאית-הסוכר מודיעה על איחור, התכנון מזיז אותה ל-10:00 בלי לפגוע בחלון ה-CO2, ומתריע אם אין Door פנוי.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Planning ► Define Operating Times for Loading Points",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Appointment ► Define Appointment Types",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Planning ► Define Capacity for Loading Points",
      ],
      tables: ["/SCWM/TUNIT", "/SCWM/DOOR", "/SCDL/DB_PROCH_I", "/SCDL/DB_PROCH_O", "/SCWM/STAGE_AREA"],
      tcodes: ["/SCWM/DAS", "/SCWM/TU", "/SCWM/CICO", "/SCWM/PRDI", "/SCWM/PRDO"],
      fiori: ["/SCWM/DAS", "F2786", "F2787"],
      configHe: [
        "Define Appointment Types: סוגי-תורים (Inbound/Outbound/Both), משך ברירת-מחדל, וערוצי-בקשה מותרים.",
        "Define Operating Times for Loading Points: שעות-הפעילות/Calendar שבהן ניתן לשבץ תורים.",
        "Define Capacity for Loading Points: כמה תורים/Doors פעילים במקביל — בסיס לבדיקת-חפיפה.",
        "Status & Reason Codes: סטטוסי-תור וקודי-סיבה לביטול/תזמון-מחדש.",
        "Authorization & Request Channels: מי רשאי לבקש/לאשר תור (פורטל-ספק מול תכנון-פנימי).",
      ],
      flow: [
        { he: "בקשת תור (Requested)", code: "DAS" },
        { he: "בדיקת זמינות מול Operating Times + Capacity", code: "Calendar" },
        { he: "שיבוץ + אישור (Confirmed)", code: "Door" },
        { he: "קישור ל-Delivery + TU", code: "TU" },
        { he: "תזמון-מחדש בעת איחור", code: "Reschedule", note: "בדיקת-חפיפה" },
        { he: "מעבר לביצוע (Checked-in)", code: "/SCWM/CICO" },
      ],
      masterDataHe: [
        "Loading Point + Operating Times = היומן שעליו משבצים; Capacity = כמה במקביל.",
        "Appointment = רשומת-התור (Loading Point, Door, חלון, סטטוס, Type).",
        "Transportation Unit / Vehicle = הרכב המשויך לתור ולתעודה.",
        "Inbound/Outbound Delivery = ההקשר הלוגיסטי (מה המשאית מביאה/לוקחת).",
      ],
      mistakesHe: [
        "שיבוץ תור מחוץ ל-Operating Times ➔ התראת-זמינות או כשל-אישור.",
        "אי-הגדרת Capacity ➔ שיבוץ-יתר וחפיפות ברציף.",
        "תור ללא קישור ל-Delivery/TU ➔ ברציף לא יודעים מה מצפה להם.",
        "תזמון-מחדש בלי בדיקת-חפיפה ➔ שתי משאיות מול אותו Door באותו זמן.",
      ],
      troubleshootHe: [
        "אי-אפשר לאשר תור ➔ מחוץ ל-Operating Times, Capacity מלא, או Door תפוס.",
        "חפיפת תורים ➔ Capacity לא מוגדר נכון או Rescheduling שעקף בדיקה.",
        "תור 'יתום' ללא הקשר ➔ חסר שיוך Inbound/Outbound Delivery או TU.",
        "פורטל-ספק לא מציג חלונות ➔ Request Channel/Authorization לא הוגדרו לסוג-התור.",
      ],
      bestPracticeHe: [
        "הגדר Operating Times ו-Capacity ריאליים לפני פתיחת בקשות-תור.",
        "אכוף קישור-חובה בין תור לבין Delivery ו-TU.",
        "השתמש ב-Reason Codes לביטול/תזמון-מחדש לצורך ניתוח-ביצועים.",
        "נטר ניצול-רציפים יומי וכוונן Capacity/Durations בהתאם.",
      ],
      interviewHe: [
        { qHe: "כיצד DAS מונע חפיפת שני תורים על אותו Door?", aHe: "דרך Operating Times + Capacity של ה-Loading Point: המערכת בודקת זמינות בעת שיבוץ ובעת תזמון-מחדש, וחוסמת/מתריעה כשהחלון תפוס או ה-Capacity מלא." },
        { qHe: "מהם הסטטוסים העיקריים של Appointment?", aHe: "Requested → Confirmed → Checked-in → In Process → Completed, עם Cancelled כמסלול-צד. הסטטוס מתקדם מתכנון לביצוע דרך ה-Checkpoint." },
        { qHe: "מדוע חשוב לקשר תור ל-Delivery ול-TU?", aHe: "הקישור נותן לרציף ולמחסן הקשר לוגיסטי — מה המשאית מביאה/לוקחת, אילו פריטים ואיזה רכב — ומאפשר סנכרון בין התכנון לבין הביצוע ב-Yard וברציף." },
      ],
      takeawaysHe: [
        "תכנון = שיבוץ בפועל של תורים ביומן הרציפים, מאוזן מול Operating Times ו-Capacity.",
        "כל תור מקושר ל-Delivery ול-TU ונושא סטטוס לאורך מחזור-החיים.",
        "Rescheduling חייב לעבור בדיקת-חפיפה כדי למנוע התנגשויות.",
        "ניצול-רציפים מיטבי תלוי בהגדרות-זמינות/Capacity ריאליות.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת DAS (5.1)", href: "/library/wm/chapter-05/#sub-5.1" },
        { labelHe: "EWM · תהליך כניסה ב-DAS (5.2.1)", href: "/library/wm/chapter-05/#sub-5.2.1" },
        { labelHe: "אובייקט · /SCWM/TUNIT", href: "/library/wm/object/SCWM_TUNIT/" },
      ],
      children: [
        {
          id: "5.2.1",
          titleHe: "תהליך הכניסה ב-SAP Dock Appointment Scheduling (Inbound Process in SAP Dock Appointment Scheduling)",
          titleEn: "Inbound Process in SAP Dock Appointment Scheduling",
          execHe:
            "תהליך הכניסה ב-DAS מתאר את המסע המלא של משאית-Inbound: מבקשת-תור, דרך אישור ושיבוץ מול Door פריקה, Check-in בכניסה, פריקה מול Inbound Delivery, ועד Check-out. זהו התסריט שבו DAS מסנכרן את הגעת הסחורה הנכנסת עם זמינות הרציף, כוח-האדם והמלאי-הצפוי (ASN).",
          beginnerHe:
            "Inbound = סחורה שנכנסת למחסן. התהליך: ספק מבקש תור לפריקה, מקבל שעה מול 'דלת'-פריקה, המשאית מגיעה ועוברת Check-in, פורקים את הסחורה ורושמים אותה מול ה-Inbound Delivery, ובסוף Check-out. DAS דואג שהמשאית לא תגיע לרציף תפוס ושיהיה מי שיפרוק אותה.",
          consultantHe:
            "ה-Inbound מתחיל לרוב מ-Inbound Delivery / ASN (Advanced Shipping Notification) של הספק, שמייצר ציפייה לסחורה. ה-Appointment משויך ל-Inbound Delivery ול-TU, מתוזמן מול Door בכיוון-Inbound ומול Staging Area לפריקה. בהגעה, Check-in ב-Checkpoint (/SCWM/CICO) מקדם את הסטטוס ומסמן את הרכב כ'באתר'; ה-Yard Management מנתב ל-Door. הפריקה מבוצעת מול ה-Inbound Delivery (Goods Receipt ב-EWM), ולעיתים כוללת Counting/Quality. בסיום — Check-out. הסנכרון בין ASN, Appointment ו-TU הוא קריטי: הוא מאפשר Putaway מתוכנן מראש ומונע 'הפתעות-רציף'.",
          purposeHe:
            "להבטיח שהסחורה הנכנסת מגיעה בחלון-זמן שבו הרציף, הצוות והמלאי-הצפוי מסונכרנים — כך שהפריקה וה-Goods Receipt מתבצעים מיד, בלי דמי-המתנה ובלי עומס-יתר נקודתי.",
          processExampleHe:
            "ספק שולח ASN ל-100 משטחי-חומר; נוצר Inbound Delivery. הספק מבקש תור-פריקה ב-DAS ומקבל 08:00 מול Door 2. ביום ההגעה הנהג עובר Check-in ב-Checkpoint; ה-Yard מנתב ל-Door 2; הצוות פורק ומבצע Goods Receipt מול ה-Inbound Delivery; המערכת יוצרת משימות-Putaway. בסיום הנהג עובר Check-out וה-Appointment עובר ל-Completed.",
          cbcHe:
            "ב-CBC משאית-תרכיז מגיעה עם ASN ל-Inbound Delivery של תרכיז Batch-managed. התור משובץ ל-08:00 מול Door מקורה ייעודי. ב-Check-in נרשמת ההגעה; הפריקה כוללת רישום-אצווה (Batch) ובדיקת-QA לפני שחרור ל-Putaway באזור-קירור. סנכרון ה-ASN עם התור מאפשר להכין מראש את אזור-הפריקה ואת בודק-ה-QA.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Appointment ► Define Appointment Types (Inbound)",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► Define Process for Inbound Delivery",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Door ► Assign Door to Staging Area",
          ],
          tables: ["/SCDL/DB_PROCH_I", "/SCWM/DOOR", "/SCWM/TUNIT", "/SCWM/STAGE_AREA"],
          tcodes: ["/SCWM/DAS", "/SCWM/PRDI", "/SCWM/CICO", "/SCWM/TU", "/SCWM/GR"],
          fiori: ["/SCWM/DAS", "F2786", "F0843"],
          configHe: [
            "Inbound Appointment Type: סוג-תור לכיוון-כניסה עם משך-ברירת-מחדל לפריקה.",
            "Assign Door to Staging Area: קישור Door-פריקה לאזור-ביניים שאליו פורקים.",
            "Inbound Delivery / ASN integration: קישור ה-Appointment ל-Inbound Delivery כהקשר.",
            "Checkpoint for Inbound: רישום Check-in/Check-out לרכבי-כניסה.",
          ],
          flow: [
            { he: "ASN / Inbound Delivery", code: "/SCWM/PRDI" },
            { he: "בקשת תור-Inbound", code: "DAS" },
            { he: "שיבוץ מול Door-פריקה", code: "/SCWM/DOOR" },
            { he: "Check-in", code: "/SCWM/CICO" },
            { he: "פריקה + Goods Receipt", code: "/SCWM/GR" },
            { he: "Putaway + Check-out", code: "TU" },
          ],
          masterDataHe: [
            "Inbound Delivery / ASN = ציפיית-הסחורה הנכנסת.",
            "Door (כיוון-Inbound) + Staging Area = יעד-הפריקה הפיזי.",
            "TU / Vehicle = הרכב המשויך לתור ול-Delivery.",
          ],
          mistakesHe: [
            "תור-Inbound ללא קישור ל-Inbound Delivery ➔ אין הקשר לפריקה ול-GR.",
            "Door ללא שיוך Staging Area ➔ לא ברור לאן לפרוק.",
            "Check-in מדולג ➔ ה-Yard וה-DAS לא יודעים שהמשאית הגיעה.",
          ],
          troubleshootHe: [
            "Goods Receipt לא מתאפשר ➔ Inbound Delivery לא קושר לתור או סטטוס-תור שגוי.",
            "המשאית 'תקועה' בכניסה ➔ Check-in לא בוצע או Checkpoint לא מקושר ל-Yard.",
            "אין יעד-פריקה ➔ Door לא משויך ל-Staging Area.",
          ],
          bestPracticeHe: [
            "חבר כל תור-Inbound ל-Inbound Delivery/ASN לתכנון-פריקה מראש.",
            "ודא שכל Door-פריקה משויך ל-Staging Area נכון.",
            "אכוף Check-in כשלב-חובה לפני הפניית הרכב ל-Door.",
          ],
          interviewHe: [
            { qHe: "מה מקשר את תהליך ה-Inbound ב-DAS ל-EWM?", aHe: "ה-Inbound Delivery / ASN — הוא ההקשר הלוגיסטי של התור, ומחבר את תזמון-הרציף ל-Goods Receipt ול-Putaway." },
            { qHe: "מה תפקיד ה-Check-in בתהליך הכניסה?", aHe: "הוא רושם פיזית שהמשאית הגיעה, מקדם את סטטוס-התור ל-Checked-in, ומאפשר ל-Yard לנתב אותה ל-Door הפריקה." },
          ],
          takeawaysHe: [
            "Inbound ב-DAS: ASN → בקשת-תור → Door-פריקה → Check-in → GR → Check-out.",
            "ה-Inbound Delivery הוא ההקשר שמחבר תזמון לפריקה ול-Putaway.",
            "Door חייב שיוך Staging Area; Check-in הוא שלב-חובה.",
          ],
          relatedHe: [
            { labelHe: "EWM · תכנון תורים (5.2)", href: "/library/wm/chapter-05/#sub-5.2" },
            { labelHe: "אובייקט · /SCWM/PRDI", href: "/library/wm/object/SCWM_PRDI/" },
          ],
        },
        {
          id: "5.2.2",
          titleHe: "תכנון תורים לרציפים ב-SAP EWM (Dock Appointment Planning in SAP EWM)",
          titleEn: "Dock Appointment Planning in SAP EWM",
          execHe:
            "תת-סעיף זה ממקד את התכנון בתוך ה-EWM עצמו: כיצד אפליקציות ה-DAS מובנות ב-EWM, אילו הגדרות-מערכת (Loading Points, Doors, Operating Times, Appointment Types) מזינות את הפלנינג, וכיצד הפלנינג משתלב עם ה-Warehouse Management ועם ה-Yard. זהו המבט ה'מערכתי' על אופן ניהול היומן בתוך EWM.",
          beginnerHe:
            "כאן לא מדברים על 'מה זה תור' אלא על 'איפה ואיך עושים את זה ב-EWM'. EWM מספק מסך-תכנון (יומן/Gantt) שבו רואים את כל הרציפים והתורים, ומאחורי הקלעים יש טבלאות-הגדרה שקובעות אילו רציפים קיימים, מתי הם פתוחים, וכמה משאיות אפשר באותו זמן.",
          consultantHe:
            "ה-DAS Planning ב-EWM נשען על שכבת-ההגדרות ב-SPRO (Loading Points, Warehouse Doors, Operating Times, Capacity, Appointment Types) ועל נתוני-האב של המחסן (/SCWM/DOOR, Staging Areas). אפליקציית-התכנון (Web Dynpro/Fiori, /SCWM/DAS) קוראת את הזמינות ומציגה Gantt פר Loading Point. הפלנינג מקושר ל-Transportation Unit וליישויות ה-Delivery (PRDI/PRDO), ומסונכרן עם ה-Yard Management דרך ה-Checkpoint. ב-S/4HANA EWM (Embedded או Decentralized) ה-DAS משולב באותה מערכת, מה שמפשט את האינטגרציה מול ה-Delivery וה-Yard. הרשאות, ערוצי-בקשה (פנימי מול פורטל-ספק) וקודי-סיבה מנוהלים אף הם בקונפיגורציה.",
          purposeHe:
            "להראות שהתכנון אינו אפליקציה מנותקת אלא שכבה המוטמעת ב-EWM: ההגדרות, נתוני-האב והאינטגרציה ל-Delivery/Yard הם שמאפשרים תכנון אמין. הבנת המבנה הזה היא תנאי למימוש ולתחזוקה נכונים.",
          processExampleHe:
            "מתכנן פותח את /SCWM/DAS ב-EWM ורואה Gantt של שלושה Loading Points. ה-Operating Times שהוגדרו ב-SPRO מגבילים שיבוץ ל-06:00–18:00; ה-Capacity מאפשר שני תורים במקביל פר Loading Point. הוא משבץ תורים, המערכת אוכפת את ההגדרות, וכל תור מתקשר ל-TU ול-Delivery. שינוי-הגדרה ב-SPRO (הרחבת שעות) משתקף מיד באפליקציה.",
          cbcHe:
            "ב-CBC ה-EWM של מפעל-המילוי מגדיר שלושה Loading Points: פריקת-חומרי-גלם, טעינת-משקאות, ורציף-קירור. ה-Operating Times לרציף-הקירור צרים יותר (לפי משמרת-QA). מסך-התכנון מציג את שלושתם, והמתכנן מאזן ביניהם — כשרציף-הקירור מלא, סחורה רגישה מתוזמנת מחדש, וה-Yard מנתב בהתאם ל-Check-in.",
          navHe: [
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► General Settings ► Define Loading Points",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Planning ► Define Operating Times for Loading Points",
            "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling ► Integration ► Assign Checkpoint to Warehouse Number",
          ],
          tables: ["/SCWM/DOOR", "/SCWM/TUNIT", "/SCWM/STAGE_AREA", "/SCDL/DB_PROCH_O"],
          tcodes: ["/SCWM/DAS", "/SCWM/DOOR", "/SCWM/TU", "/SCWM/CICO"],
          fiori: ["/SCWM/DAS", "F2786", "F2787"],
          configHe: [
            "Define Loading Points: יחידות-התזמון שעליהן בנוי ה-Gantt בתכנון.",
            "Define Operating Times for Loading Points: חלונות-הפעילות שאוכפים שיבוץ.",
            "Define Capacity: כמה תורים מקבילים פר Loading Point.",
            "Assign Checkpoint to Warehouse Number: אינטגרציה לתכנון מול Check-in/Yard.",
          ],
          flow: [
            { he: "הגדרות SPRO (Loading Points/Doors)", code: "SPRO" },
            { he: "Operating Times + Capacity", code: "Calendar" },
            { he: "תצוגת תכנון (Gantt)", code: "/SCWM/DAS" },
            { he: "שיבוץ + קישור ל-TU/Delivery", code: "TU" },
            { he: "סנכרון Checkpoint/Yard", code: "/SCWM/CICO" },
          ],
          masterDataHe: [
            "Loading Point + Operating Times + Capacity = שלד היומן בתכנון.",
            "/SCWM/DOOR + Staging Area = נתוני-האב הפיזיים שמאחורי התכנון.",
            "Checkpoint = נקודת-האינטגרציה לתכנון מול Yard.",
          ],
          mistakesHe: [
            "הגדרת Loading Points ב-SPRO בלי לשייך Doors ➔ Gantt ריק.",
            "Operating Times לא מאוכלסים ➔ אין חלונות לשיבוץ באפליקציה.",
            "Checkpoint לא משויך ל-Warehouse ➔ התכנון מנותק מה-Yard.",
          ],
          troubleshootHe: [
            "תצוגת-התכנון ריקה ➔ Loading Points/Doors או Operating Times חסרים.",
            "שינוי-הגדרה לא משתקף ➔ נשמר ב-Client/Transport שגוי או מטמון לא רוענן.",
            "תורים לא מסונכרנים ל-Yard ➔ Checkpoint לא משויך ל-Warehouse Number.",
          ],
          bestPracticeHe: [
            "בנה את שכבת-ההגדרות (Loading Points → Doors → Operating Times → Capacity) לפי הסדר.",
            "שייך Checkpoint ל-Warehouse כדי לחבר תכנון ל-Yard ול-Check-in.",
            "בדוק שהגדרות-SPRO משתקפות באפליקציה אחרי כל שינוי.",
          ],
          interviewHe: [
            { qHe: "על אילו הגדרות נשען מסך-התכנון של DAS ב-EWM?", aHe: "Loading Points, Warehouse Doors, Operating Times ו-Capacity מ-SPRO, בתוספת נתוני-האב (/SCWM/DOOR, Staging Areas) — אלה מזינים את ה-Gantt ואוכפים זמינות." },
            { qHe: "כיצד התכנון ב-EWM מסתנכרן עם ה-Yard Management?", aHe: "דרך ה-Checkpoint המשויך ל-Warehouse Number: ה-Check-in/Check-out מקדם את סטטוס-התור ומאפשר ל-Yard לנתב את הרכב ל-Door." },
          ],
          takeawaysHe: [
            "התכנון ב-EWM הוא שכבה מוטמעת הנשענת על הגדרות-SPRO ונתוני-אב.",
            "Loading Points + Operating Times + Capacity הם שלד ה-Gantt.",
            "Checkpoint המשויך ל-Warehouse מחבר את התכנון ל-Yard ול-Check-in.",
          ],
          relatedHe: [
            { labelHe: "EWM · תהליך כניסה ב-DAS (5.2.1)", href: "/library/wm/chapter-05/#sub-5.2.1" },
            { labelHe: "אובייקט · /SCWM/DOOR", href: "/library/wm/object/SCWM_DOOR/" },
          ],
        },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3",
      titleHe: "סיכום (Summary)",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את Dock Appointment Scheduling (DAS) ב-SAP EWM — מ'מה זה תור-רציף' ועד תכנון מלא וביצוע. DAS הופך את הגעת המשאיות מאירוע אקראי לתהליך מתוכנן ומסונכרן, החוסך זמן, עלות ופקקים, ומחבר בין הספקים/מובילים לבין הרציף, ה-Delivery וה-Yard.",
      beginnerHe:
        "בקצרה: DAS = יומן-תורים למשאיות מול רציפי-המחסן. למדנו מה זה תור (Appointment), רציף (Door), נקודת-טעינה (Loading Point) ונקודת-כניסה (Checkpoint); איך מתכננים ומשבצים תורים; ואיך נראה תהליך כניסה מלא. אם תזכור משפט אחד: 'כל משאית מקבלת שעה ורציף — ואיש לא ממתין סתם'.",
      consultantHe:
        "מבט-על למימוש: הפעל DAS ברמת ה-Warehouse, הגדר Loading Points ו-Warehouse Doors (/SCWM/DOOR) עם Staging Areas, קבע Operating Times ו-Capacity, הגדר Appointment Types וערוצי-בקשה, ושייך Checkpoint ל-Warehouse לאינטגרציה עם ה-Yard. בביצוע, ה-Appointment נע Requested→Confirmed→Checked-in→In Process→Completed, מקושר ל-TU ול-Inbound/Outbound Delivery. ב-S/4HANA EWM האינטגרציה מול ה-Delivery וה-Yard הדוקה. הסיכונים העיקריים: הגדרות-זמינות/Capacity לא-ריאליות, תורים ללא הקשר-Delivery, ו-Checkpoint לא-מקושר.",
      purposeHe:
        "לקבע את התמונה השלמה: DAS אינו רכיב מבודד אלא חוליה המחברת תיאום-מראש (תכנון) לביצוע (Yard + רציף + Delivery). מטרת-העל — ניצול-רציפים מיטבי, זמני-המתנה מינימליים ושקיפות לכל הצדדים.",
      processExampleHe:
        "מסע מלא: ספק/מוביל מבקש תור → המתכנן מאשר ומשבץ מול Door וחלון-זמן → קישור ל-Delivery ול-TU → ביום-ההגעה Check-in ב-Checkpoint → ניתוב ב-Yard ל-Door → פריקה/טעינה מול ה-Delivery → Check-out → Appointment=Completed. כל שלב נשען על ההגדרות שנסקרו בפרק.",
      cbcHe:
        "ב-CBC DAS מסנכרן את זרם-הבוקר של חומרי-הגלם (תרכיז, סוכר, CO2, בקבוקים) עם זרם-אחר-הצהריים של המשקאות-המוגמרים על מספר רציפים מצומצם — מונע התנגשויות, שומר על אזורי-קירור ו-QA זמינים, ומבטיח שמשאיות-הספקים ומשאיות-ההפצה לא מתחרות על אותו Door.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Dock Appointment Scheduling (כל ענפי ה-SPRO שנסקרו בפרק)",
      ],
      tables: ["/SCWM/DOOR", "/SCWM/TUNIT", "/SCDL/DB_PROCH_I", "/SCDL/DB_PROCH_O", "/SCWM/STAGE_AREA"],
      tcodes: ["/SCWM/DAS", "/SCWM/CICO", "/SCWM/DOOR", "/SCWM/TU"],
      fiori: ["/SCWM/DAS", "F2786", "F2787"],
      configHe: [
        "רצף-מימוש: Activate DAS → Loading Points → Warehouse Doors + Staging Areas → Operating Times → Capacity → Appointment Types → Checkpoints.",
        "אינטגרציה: שיוך Checkpoint ל-Warehouse Number וקישור Appointment ל-Inbound/Outbound Delivery ול-TU.",
      ],
      flow: [
        { he: "בקשת תור", code: "DAS" },
        { he: "שיבוץ + קישור Delivery/TU", code: "TU" },
        { he: "Check-in", code: "/SCWM/CICO" },
        { he: "פריקה/טעינה", code: "Door" },
        { he: "Check-out → Completed", code: "DAS" },
      ],
      masterDataHe: [
        "Loading Point + Warehouse Door + Staging Area = השלד הפיזי.",
        "Appointment + TU + Delivery = רשומת-התור וההקשר הלוגיסטי.",
        "Checkpoint = גשר לתכנון ול-Yard.",
      ],
      mistakesHe: [
        "התייחסות ל-DAS כרכיב-מבודד במקום כחוליה בין תכנון לביצוע.",
        "דילוג על שלב-אינטגרציה (Checkpoint/Delivery) — שובר את הסנכרון מקצה-לקצה.",
        "הגדרות-Capacity/Operating Times לא-ריאליות שמייצרות חפיפות או חלונות-ריקים.",
      ],
      troubleshootHe: [
        "תהליך-מקצה-לקצה נשבר ➔ אתר את החוליה החסרה: Activation, Loading Point, Door, Operating Times, Checkpoint או קישור-Delivery.",
        "ניצול-רציפים נמוך ➔ Capacity/Durations שמרניים מדי או חלונות-פעילות צרים.",
      ],
      bestPracticeHe: [
        "מַמֵּש לפי הרצף: הפעלה → נתוני-אב → זמני-פעילות → Capacity → אינטגרציה.",
        "אכוף קישור-חובה בין תור ל-Delivery ול-TU בכל התרחישים.",
        "נטר KPI: ניצול-רציפים, זמן-המתנה ועמידה-בחלון, וכוונן הגדרות בהתאם.",
      ],
      interviewHe: [
        { qHe: "סכם בשתי שורות מהו DAS ולמה הוא חשוב.", aHe: "DAS מתזמן מראש את הגעת המשאיות לרציפי-המחסן מול חלונות-זמן, רציפים ונקודות-טעינה, ומסנכרן זאת עם ה-Delivery וה-Yard. החשיבות: ניצול-רציפים מיטבי, זמני-המתנה מינימליים ושקיפות לכל הצדדים." },
        { qHe: "מהו רצף-המימוש המומלץ של DAS?", aHe: "הפעלה ברמת Warehouse → Loading Points → Warehouse Doors + Staging Areas → Operating Times → Capacity → Appointment Types → Checkpoints, ולבסוף קישור ל-Delivery/TU ול-Yard." },
      ],
      takeawaysHe: [
        "DAS = יומן-תורים מתוזמן למשאיות מול רציפים, חלונות-זמן ונקודות-טעינה.",
        "אובייקטי-ליבה: Appointment, Loading Point, Warehouse Door, Checkpoint, TU.",
        "התכנון מחבר תיאום-מראש לביצוע (Yard + רציף + Delivery).",
        "מַמֵּש לפי רצף, אכוף קישור-Delivery, ונטר ניצול-רציפים.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת DAS (5.1)", href: "/library/wm/chapter-05/#sub-5.1" },
        { labelHe: "EWM · תכנון תורים (5.2)", href: "/library/wm/chapter-05/#sub-5.2" },
        { labelHe: "EWM · ניהול חצר (Yard Management)", href: "/library/wm/chapter-04/" },
      ],
    },
  ],
};
