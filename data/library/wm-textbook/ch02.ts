// ===== WM/EWM Digital Textbook — Chapter 2 (gold-standard learning chapter) =====
// Production Planning (PP) Integration with EWM.
// Every node (parent + nested) is a complete 18-facet LearningNode in authored
// Hebrew — beginner-friendly AND consultant-grade. SAP identifiers verbatim EN.
// Source hierarchy preserved exactly (ids + order); nothing invented or dropped.
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "שילוב עם תכנון ייצור (PP)",
  titleEn: "Production Planning Integration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב בין SAP Extended Warehouse Management (EWM) לבין תכנון-הייצור (PP). נבין כיצד EWM מזין את רצפת-הייצור בחומרי-גלם (Staging), כיצד הוא קולט את התוצרת המוגמרת בחזרה למחסן (Goods Receipt), וכיצד צריכת-החומר (Consumption) נרשמת מול הזמנות-הייצור. נבחין בין שתי שיטות-האינטגרציה המרכזיות — delivery-based production integration (מבוססת-אספקה, הפשוטה) לעומת advanced production integration (המתקדמת, מבוססת Production Material Request) — נכיר את אזור-אספקת-הייצור (Production Supply Area, PSA), את תהליכי הניקוי וההזנה-המחדש (replenishment), ולבסוף את האינטגרציה עם SAP Manufacturing Execution (SAP ME) ו-MFS. כל תת-פרק ותת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים: שלוש רמות-הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (מפעל-הבקבוק של קוקה-קולה ישראל המזין את קווי-המילוי ומקבל משקאות מוגמרים), ניווט/SPRO, טבלאות/T-Codes/Fiori, קונפיגורציה, תרשים-תהליך, טעויות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות. המטרה: ללמוד את הנושא במלואו ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1",
      titleHe: "סקירת שילוב הייצור",
      titleEn: "Overview of Production Integration",
      execHe:
        "שילוב הייצור (Production Integration) הוא הגשר שבין מנוע-המחסן EWM לבין תכנון-הייצור PP. המחסן הוא ספק-החומר של רצפת-הייצור: הוא מזין רכיבים לקווי-הייצור (Staging), והוא קולט את התוצרת המוגמרת בחזרה (Goods Receipt). EWM מנהל את התנועה הפיזית — bin, Handling Unit, מלגזה — בעוד PP מנהל את ההזמנה (Manufacturing/Process Order), הצריכה והדיווח. ללא שילוב תקין, החומר 'נעלם' בין שתי המערכות והמלאי אינו מתואם.",
      beginnerHe:
        "דמיין מפעל: יש מחסן ויש קו-ייצור. הקו צריך חומרי-גלם כדי לעבוד, ובסוף הוא מייצר מוצר מוגמר שצריך לחזור למחסן. EWM הוא 'מנהל-המחסן' שדואג להביא את החומר לקו בזמן (זה נקרא Staging), ולקלוט את המוצר המוגמר חזרה (Goods Receipt). PP הוא 'מנהל-הייצור' שיודע מה לייצר וכמה חומר צריך. שני המנהלים חייבים לדבר ביניהם — וזה בדיוק מה שהשילוב עושה.",
      consultantHe:
        "EWM תומך בשני מודלי-שילוב: (1) delivery-based production integration — PP יוצר Outbound Delivery להזנה ו-Inbound Delivery לקליטת-תוצרת, ו-EWM עובד מולן כמו מול כל אספקה רגילה; פשוט אך מוגבל. (2) advanced production integration — מבוסס Production Material Request (PMR) שזורם מ-PP ל-EWM דרך ה-Manufacturing Integration, ומאפשר staging ברמת-PSA, pick-parts/crate-parts/release-order-parts, וניקוי-bins. נקודת-המפתח: ה-Production Supply Area (PSA) ממפה את נקודת-הצריכה ברצפה ל-storage bin ב-EWM. אינטגרציית-הנתונים נשענת על CIF/qRFC, וב-embedded EWM על קריאות פנימיות. השווה למודול ה-PP בספרייה: /library/pp/chapter-06/.",
      purposeHe:
        "המטרה: להבטיח שהחומר הנכון יגיע לקו הנכון בזמן הנכון (just-in-time staging), שהצריכה תירשם מדויק מול ההזמנה, ושהתוצרת המוגמרת תיקלט מיד למלאי-זמין. שילוב טוב מקטין מלאי-רצפה, מונע עצירות-קו בגלל חוסר-חומר, ומשמר תאום-מלאי בין EWM, PP ו-MM-IM.",
      processExampleHe:
        "מחזור מלא: PP משחרר Manufacturing Order ➔ נוצרת דרישת-הזנה ל-EWM ➔ EWM מנתב Warehouse Task להעברת רכיבים מ-bin אחסון ל-PSA bin ברצפה ➔ הייצור צורך את החומר (Consumption, תנועה 261) ➔ בסיום, התוצרת המוגמרת נקלטת (Goods Receipt, תנועה 101) ל-bin קבלה ב-EWM ➔ EWM מבצע putaway ל-bin אחסון. המלאי מתואם לאורך כל השרשרת.",
      cbcHe:
        "ב-CBC (קוקה-קולה ישראל): קו-המילוי הוא תחנת-הצריכה. EWM מזין לקו תרכיז, סוכר, CO2, בקבוקים, פקקים ותוויות מה-bins של המחסן ל-PSA שליד הקו (Staging). הקו ממלא ומסמן בקבוקים, צורך את החומרים (Consumption), ובסוף משטחי-המשקה המוגמר נקלטים חזרה למחסן (Goods Receipt) עם batch ו-FEFO. נפח גבוה ⟵ advanced production integration כדי לתזמן staging just-in-time ולמנוע עומס-חומר ליד הקו.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Production Integration",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Manufacturing (PP) Integration ► Basic Settings",
        "SAP Easy Access ► Logistics ► SCM Extended Warehouse Management ► Extended Warehouse Management ► Work Scheduling",
      ],
      tables: ["/SCWM/PMR_HEAD", "/SCWM/PMR_ITEM", "/SCWM/ORDIM_O", "/SCWM/STAGING", "AFKO"],
      tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON", "CO02", "COR2", "MFBF"],
      fiori: ["F2148", "F0273", "W0001"],
      configHe: [
        "Manufacturing Integration: מפעילים את שילוב ה-PP ברמת ה-Warehouse Number ובוחרים delivery-based או advanced.",
        "Production Supply Area (PSA): מגדירים ב-PP (PK05) וממפים ל-Storage Type/Bin ב-EWM כנקודת-הצריכה הפיזית.",
        "Staging Area / Doors: קובעים את אזורי-המעבר בין המחסן לרצפה.",
        "Warehouse Process Types ל-staging, consumption ו-GR — לכל זרימה WPT ייעודי.",
      ],
      flow: [
        { he: "שחרור Manufacturing/Process Order", code: "CO02/COR2", note: "PP" },
        { he: "דרישת-הזנה ל-EWM", code: "PMR / Delivery" },
        { he: "Staging ל-PSA", code: "/SCWM/PSASTAGE" },
        { he: "צריכת-חומר", code: "261", note: "Consumption" },
        { he: "Goods Receipt לתוצרת", code: "101" },
        { he: "Putaway ל-bin אחסון", code: "/SCWM/LAGP" },
      ],
      masterDataHe: [
        "Production Supply Area (PSA) = מיפוי נקודת-צריכה ברצפה ל-storage bin · Control Cycle (LPK1) לקביעת אופן-ההזנה.",
        "Product Master (EWM view) + Manufacturing Order (AFKO/AUFK) + Reservation (RESB) הם המסמכים המקשרים.",
      ],
      mistakesHe: [
        "בחירת delivery-based כאשר נדרש staging מתקדם — מקבלים מודל-אינטגרציה שלא תומך ב-pick-parts/PSA bins.",
        "אי-מיפוי ה-PSA ל-storage bin — ה-staging אינו יודע לאן להוביל את החומר.",
        "ערבוב ניהול-מלאי ידני ב-MM-IM בזמן ש-EWM מנהל את ה-bins — אי-התאמות מלאי.",
        "התעלמות מ-Handling Unit ב-staging — חלק מהתהליכים ב-EWM מבוססי-HU.",
      ],
      troubleshootHe: [
        "החומר לא מוזן לקו ➔ בדוק PMR/Delivery נוצרה, PSA ממופה ל-bin, ו-WPT staging מוגדר.",
        "צריכה לא נרשמת מול ההזמנה ➔ Reservation/Control Cycle שגוי או תנועת-261 לא הופעלה.",
        "תוצרת מוגמרת לא נקלטת ➔ Inbound Delivery/GR לא זרמה, או WPT ל-GR חסר.",
        "מלאי לא מתואם בין EWM ל-ERP ➔ qRFC תקוע (SMQ1/SMQ2) או GR/GI לא סונכרן.",
      ],
      bestPracticeHe: [
        "בחר את מודל-האינטגרציה לפי מורכבות: delivery-based לתהליך פשוט, advanced לנפח/JIT.",
        "מפה כל PSA ל-bin ייעודי ברצפה והגדר Control Cycle ברור.",
        "נטר queues (SMQ1/SMQ2) באופן שוטף כדי לתפוס כשלי-סנכרון מוקדם.",
        "תאם WPT נפרדים ל-staging, consumption ו-GR לבקרה ולשקיפות.",
      ],
      interviewHe: [
        { qHe: "מהן שתי שיטות שילוב-הייצור ב-EWM?", aHe: "delivery-based production integration (מבוססת Outbound/Inbound Delivery, פשוטה) ו-advanced production integration (מבוססת Production Material Request, תומכת PSA, pick-parts וניקוי-bins)." },
        { qHe: "מהו Production Supply Area (PSA)?", aHe: "מיפוי של נקודת-הצריכה ברצפת-הייצור ל-storage bin ב-EWM — היעד שאליו מוזן החומר ב-staging." },
        { qHe: "אילו שלושה זרמים מרכיבים את שילוב-הייצור?", aHe: "Staging (הזנת חומר לקו), Consumption (צריכת החומר מול ההזמנה), ו-Goods Receipt (קליטת התוצרת המוגמרת)." },
      ],
      takeawaysHe: [
        "שילוב-הייצור מחבר את מנוע-המחסן EWM לתכנון-הייצור PP בשלושה זרמים: Staging → Consumption → Goods Receipt.",
        "שני מודלים: delivery-based (פשוט) ו-advanced (מבוסס PMR, מתקדם).",
        "ה-PSA הוא נקודת-המפתח: מיפוי נקודת-צריכה ברצפה ל-storage bin.",
        "תאום-מלאי בין EWM, PP ו-MM-IM הוא מבחן-ההצלחה של השילוב.",
      ],
      relatedHe: [
        { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
        { labelHe: "EWM · מבוא (1.1)", href: "/library/wm/chapter-01/#sub-1.1" },
        { labelHe: "אובייקט · /SCWM/PMR_HEAD", href: "/library/wm/object/PMR_HEAD/" },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2",
      titleHe: "שילוב ייצור מבוסס-אספקה",
      titleEn: "Delivery-Based Production Integration",
      execHe:
        "שילוב ייצור מבוסס-אספקה (delivery-based) הוא המודל הפשוט והוותיק: PP יוצר Outbound Delivery להזנת-חומר ו-Inbound Delivery לקליטת-תוצרת, ו-EWM עובד מולן בדיוק כמו מול כל אספקה לוגיסטית רגילה. אין צורך ב-Production Material Request, אין PSA bins ייעודיים — המחסן 'רואה' את הייצור כעוד לקוח/ספק. מתאים לתהליכי-ייצור פשוטים ולנפחים בינוניים.",
      beginnerHe:
        "במודל הזה, הייצור 'מתחפש' למשלוח רגיל. כשהקו צריך חומר, נוצר 'תעודת-משלוח' (Outbound Delivery) מהמחסן לקו — בדיוק כמו משלוח ללקוח. כשהקו מסיים, נוצרת 'תעודת-קבלה' (Inbound Delivery) של המוצר המוגמר — בדיוק כמו קבלה מספק. EWM לא צריך לדעת שמדובר בייצור; הוא פשוט מטפל באספקות כרגיל. זה הופך את ההגדרה לפשוטה מאוד.",
      consultantHe:
        "המודל נשען על Delivery-based goods movements: PP מפעיל את ה-staging דרך Outbound Delivery (תנועת-העברה ל-PSA/קו), ואת ה-GR דרך Inbound Delivery לתוצרת. EWM מקבל את האספקות דרך qRFC ומטפל בהן עם תהליכי-המחסן הסטנדרטיים (WT/WO). מגבלות: אין תמיכה מלאה ב-pick-parts/crate-parts ברמת-PSA, אין ניקוי-bins אוטומטי, והקשר להזמנת-הייצור פחות הדוק מאשר ב-advanced. עדיין דורש מיפוי בסיסי בין מיקום-הצריכה ל-storage location/bin.",
      purposeHe:
        "המטרה: לאפשר אינטגרציית-ייצור בסיסית בעלות-הגדרה נמוכה, תוך שימוש-חוזר בכל מנגנוני-האספקה הקיימים של EWM. מתאים כשהייצור אינו דורש staging מתוחכם או ניהול-PSA ברזולוציה גבוהה.",
      processExampleHe:
        "Manufacturing Order משוחרר ➔ PP יוצר Outbound Delivery לרכיבים ➔ EWM מבצע picking ו-staging ➔ הייצור צורך ➔ בסיום נוצרת Inbound Delivery לתוצרת ➔ EWM מבצע GR ו-putaway. כל תנועה היא אספקה רגילה ב-EWM.",
      cbcHe:
        "ב-CBC: קו-מילוי משני בנפח נמוך מנוהל במודל מבוסס-אספקה — Outbound Delivery מזינה בקבוקים ופקקים, Inbound Delivery קולטת את המשקה המוגמר. פשוט להגדרה, מספיק לקו שאינו דורש JIT.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Receipt Process ► Production Integration ► Delivery-Based Production Integration",
        "SAP Easy Access ► Logistics ► SCM Extended Warehouse Management ► Delivery Processing",
      ],
      tables: ["/SCWM/DLV_HEAD", "/SCWM/DLV_ITEM", "/SCWM/ORDIM_O", "LIPS", "AFKO"],
      tcodes: ["/SCWM/PRDO", "/SCWM/PRDI", "/SCWM/MON", "CO02"],
      fiori: ["F2148", "F0273"],
      configHe: [
        "Delivery-Based Integration: מפעילים ברמת ה-Warehouse Number; ה-staging וה-GR זורמים כ-Outbound/Inbound Delivery.",
        "Document Types & Item Types ל-deliveries של ייצור.",
        "Storage Location מיפוי בין מיקום-הצריכה לרצפה ל-EWM bin.",
        "WPT ל-picking/staging ול-putaway של תוצרת.",
      ],
      flow: [
        { he: "שחרור Manufacturing Order", code: "CO02", note: "PP" },
        { he: "יצירת Outbound Delivery", code: "/SCWM/PRDO", note: "הזנה" },
        { he: "Picking + Staging", code: "/SCWM/ORDIM_O" },
        { he: "צריכה ביצור", code: "261" },
        { he: "Inbound Delivery לתוצרת", code: "/SCWM/PRDI" },
        { he: "GR + Putaway", code: "101" },
      ],
      masterDataHe: [
        "Inbound/Outbound Delivery (EWM) = המסמכים המניעים · Product Master (EWM view).",
        "Manufacturing Order (AFKO) + Reservation (RESB) מקשרים לצד ה-PP.",
      ],
      mistakesHe: [
        "שימוש במודל מבוסס-אספקה כשנדרש staging ברמת-PSA — חוסר תמיכה ב-pick-parts.",
        "אי-מיפוי Storage Location בין הצריכה ל-EWM — האספקה אינה מנותבת.",
        "ציפייה לניקוי-bins אוטומטי — אינו חלק מהמודל הזה.",
      ],
      troubleshootHe: [
        "Outbound Delivery לא נוצרת ➔ הגדרת Integration / Document Type חסרה בצד PP.",
        "אספקה לא מגיעה ל-EWM ➔ qRFC תקוע (SMQ1) או mapping שגוי.",
        "GR לתוצרת נכשל ➔ Inbound Delivery / WPT putaway חסר.",
      ],
      bestPracticeHe: [
        "השתמש במודל מבוסס-אספקה רק לתהליכים פשוטים; עבור ל-advanced לנפח/JIT.",
        "נצל מחדש את תהליכי-האספקה הסטנדרטיים של EWM כדי לפשט תחזוקה.",
        "נטר queues לסנכרון אמין בין PP ל-EWM.",
      ],
      interviewHe: [
        { qHe: "מתי מתאים מודל מבוסס-אספקה?", aHe: "לתהליכי-ייצור פשוטים בנפח בינוני שאינם דורשים staging ברמת-PSA, pick-parts או ניקוי-bins אוטומטי." },
        { qHe: "אילו מסמכים מניעים את המודל?", aHe: "Outbound Delivery להזנת-חומר ו-Inbound Delivery לקליטת-תוצרת — EWM מטפל בהן כאספקות רגילות." },
      ],
      takeawaysHe: [
        "המודל מבוסס-אספקה מתייחס לייצור כאל אספקה רגילה (Outbound/Inbound Delivery).",
        "פשוט להגדרה, מתאים לתהליכים פשוטים ונפחים בינוניים.",
        "מוגבל: אין PSA bins, אין pick-parts מתקדם, אין ניקוי אוטומטי.",
      ],
      relatedHe: [
        { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
        { labelHe: "EWM · שילוב מתקדם (2.3)", href: "/library/wm/chapter-02/#sub-2.3" },
      ],
      children: [
        {
          id: "2.2.1",
          titleHe: "סקירה",
          titleEn: "Overview",
          execHe:
            "סקירת המודל מבוסס-האספקה מסבירה את עקרון-היסוד: כל תנועת-ייצור (הזנה או קליטה) מתורגמת ל-EWM Delivery. אין שכבת-PMR; ה-staging הוא Outbound Delivery וה-GR הוא Inbound Delivery, וה-EWM מפעיל עליהן את תהליכי-המחסן הרגילים.",
          beginnerHe:
            "בקצרה: הייצור מדבר עם המחסן בשפת ה'משלוחים'. כל פעם שצריך חומר — משלוח יוצא; כל פעם שמסתיים מוצר — קבלה נכנסת. אין שום דבר 'מיוחד-לייצור' מבחינת EWM; הוא רק מטפל באספקות.",
          consultantHe:
            "ה-Delivery הוא יחידת-העבודה. ה-staging הוא תנועת-העברה (transfer) הממומשת כ-Outbound Delivery לעבר מיקום-הצריכה; ה-consumption נרשם בצד PP כתנועת-261 כנגד ה-Reservation; ה-GR מתממש כ-Inbound Delivery עם putaway. הקישור להזמנה נשמר דרך הפניות-מסמך, אך ללא סנכרון-סטטוס עשיר כמו ב-advanced.",
          purposeHe:
            "להבהיר את גבולות-המודל ולוודא בחירה-מושכלת: מבוסס-אספקה למקרים פשוטים, advanced למורכבים.",
          processExampleHe:
            "Order משוחרר ➔ Outbound Delivery לרכיבים ➔ EWM picking/staging ➔ צריכה ➔ Inbound Delivery לתוצרת ➔ GR. כל שלב = אספקה.",
          cbcHe:
            "ב-CBC קו-מילוי קטן: כל אצווה מזינה רכיבים דרך Outbound Delivery וקולטת משקה מוגמר דרך Inbound Delivery — ללא PSA bin ייעודי.",
          navHe: [
            "SCM Extended Warehouse Management ► Goods Receipt Process ► Production Integration ► Delivery-Based ► Basic Settings",
          ],
          tables: ["/SCWM/DLV_HEAD", "AFKO", "RESB"],
          tcodes: ["/SCWM/PRDO", "/SCWM/PRDI", "CO02"],
          fiori: ["F2148"],
          configHe: [
            "הפעלת המודל ברמת Warehouse Number ובחירת Document/Item Types לאספקות-ייצור.",
            "מיפוי מיקום-צריכה ל-EWM storage location/bin.",
          ],
          mistakesHe: [
            "בלבול בין staging (Outbound) ל-GR (Inbound) — שני זרמים נפרדים.",
            "ציפייה לתמיכת-PSA במודל זה.",
          ],
          troubleshootHe: [
            "אספקה לא נוצרת ➔ הגדרת Integration / Document Type חסרה.",
            "סטטוס לא מסונכרן ➔ המודל אינו מספק סנכרון-עשיר; שקול advanced.",
          ],
          bestPracticeHe: [
            "בחר במודל זה רק כשהפשטות חשובה מהגמישות.",
            "תעד את גבולות-המודל לצוות-התפעול.",
          ],
          interviewHe: [
            { qHe: "מהו עקרון-היסוד של המודל מבוסס-אספקה?", aHe: "כל תנועת-ייצור מתורגמת ל-EWM Delivery — staging=Outbound, GR=Inbound — ו-EWM מטפל בה כאספקה רגילה." },
          ],
          takeawaysHe: [
            "staging = Outbound Delivery, GR = Inbound Delivery.",
            "אין שכבת-PMR ואין PSA bins.",
            "פשוט אך מוגבל.",
          ],
        },
        {
          id: "2.2.2",
          titleHe: "הזנה להזמנות ייצור",
          titleEn: "Staging for Manufacturing Orders",
          execHe:
            "Staging הוא תהליך הבאת חומרי-הגלם מ-bin האחסון אל נקודת-הצריכה ברצפת-הייצור. במודל מבוסס-אספקה, ה-staging מתממש כ-Outbound Delivery: PP יוזם, EWM מבצע picking ומעביר את הרכיבים לקו. זהו השלב הראשון בשרשרת Staging → Consumption → Goods Receipt.",
          beginnerHe:
            "Staging = 'הכנת החומר ליד הקו'. לפני שהקו יכול לעבוד, מישהו צריך להביא את הבקבוקים, הפקקים והתרכיז מהמדפים אל הקו. EWM שולח מלגזה (עם RF) למשוך את הרכיבים ולהניח אותם ליד נקודת-הצריכה. במודל הזה זה קורה דרך 'תעודת-משלוח' רגילה.",
          consultantHe:
            "ה-staging Outbound Delivery יוצרת Warehouse Tasks ל-picking מ-source bin ול-staging ב-destination (מיקום-הצריכה). אסטרטגיית-ה-picking נקבעת ב-WPT. ניתן לעבוד ב-2-step (pick ואז transfer) או 1-step. הכמות נגזרת מ-Reservation של ההזמנה. סנכרון-המלאי חוזר ל-PP/MM-IM עם תנועת-ההעברה.",
          purposeHe:
            "להבטיח שהחומר הנכון, בכמות הנכונה, יהיה זמין ליד הקו לפני תחילת-הייצור — ולמנוע עצירות-קו.",
          processExampleHe:
            "Order ל-1,000 יח' ➔ Reservation דורש רכיבים ➔ Outbound Delivery נוצרת ➔ EWM picking מ-bin אחסון ➔ העברה ל-staging area ליד הקו ➔ אישור ה-WT מעדכן מלאי.",
          cbcHe:
            "ב-CBC: לפני הרצת-מילוי, EWM מזין לקו תרכיז וסוכר (batch-managed) בכמות לפי ה-Reservation, ומניח אותם ב-staging area שליד הקו דרך Outbound Delivery.",
          navHe: [
            "SCM Extended Warehouse Management ► Goods Receipt Process ► Production Integration ► Delivery-Based ► Staging",
          ],
          tables: ["/SCWM/DLV_HEAD", "/SCWM/ORDIM_O", "RESB"],
          tcodes: ["/SCWM/PRDO", "/SCWM/MON", "CO02"],
          fiori: ["F2148", "W0001"],
          configHe: [
            "WPT ל-picking/staging המגדיר אסטרטגיה ו-2-step/1-step.",
            "מיפוי מיקום-צריכה (PP) ל-EWM staging area/bin.",
          ],
          flow: [
            { he: "Reservation להזמנה", code: "RESB", note: "PP" },
            { he: "Outbound Delivery להזנה", code: "/SCWM/PRDO" },
            { he: "Picking מ-bin אחסון", code: "/SCWM/ORDIM_O" },
            { he: "העברה ל-staging area", code: "WT", note: "ליד הקו" },
            { he: "אישור WT + עדכון מלאי", code: "/SCWM/LAGP" },
          ],
          mistakesHe: [
            "Staging מאוחר מדי ➔ עצירת-קו בגלל חוסר-חומר.",
            "Staging-יתר ➔ עומס-חומר ליד הקו וסיכון-בלבול.",
            "אי-תאום הכמות עם ה-Reservation ➔ פערי-מלאי.",
          ],
          troubleshootHe: [
            "חומר לא מוזן ➔ Outbound Delivery לא נוצרה או WPT staging חסר.",
            "Picking נכשל ➔ אין מלאי ב-source bin או אסטרטגיה שגויה.",
            "כמות שגויה ➔ Reservation/UoM לא תואם.",
          ],
          bestPracticeHe: [
            "תזמן staging קרוב לתחילת-הייצור כדי לצמצם מלאי-רצפה.",
            "השתמש ב-2-step כשנדרשת הפרדה בין picking ל-transfer.",
            "תאם כמות-staging מדויק עם ה-Reservation.",
          ],
          interviewHe: [
            { qHe: "מהו staging במודל מבוסס-אספקה?", aHe: "הבאת רכיבים מ-bin אחסון לנקודת-הצריכה ברצפה, ממומשת כ-Outbound Delivery עם Warehouse Tasks ל-picking ו-transfer." },
            { qHe: "מהיכן נגזרת כמות ה-staging?", aHe: "מה-Reservation (RESB) של הזמנת-הייצור." },
          ],
          takeawaysHe: [
            "Staging = הבאת חומר לקו לפני הייצור.",
            "ממומש כ-Outbound Delivery עם WT ל-picking ו-transfer.",
            "כמות נגזרת מ-Reservation; תזמן JIT למניעת עומס.",
          ],
        },
        {
          id: "2.2.3",
          titleHe: "צריכה להזמנות ייצור",
          titleEn: "Consumption for Manufacturing Orders",
          execHe:
            "Consumption (צריכה) היא רישום השימוש בפועל בחומרי-הגלם מול הזמנת-הייצור — תנועת-המלאי 261 שמורידה את הרכיבים מהמלאי ומשייכת את עלותם להזמנה. זהו השלב השני בשרשרת, אחרי ה-staging ולפני ה-GR.",
          beginnerHe:
            "Consumption = 'הקו אכל את החומר'. אחרי שהבאנו את הרכיבים לקו (staging), הקו משתמש בהם בפועל. ברגע הצריכה, SAP מוריד את הכמות מהמלאי ורושם 'החומר הזה נכנס לתוך המוצר הזה'. כך יודעים כמה באמת עלה לייצר.",
          consultantHe:
            "הצריכה נרשמת בצד PP (Goods Issue 261) כנגד ה-Reservation, ידנית (MIGO/MB1A) או אוטומטית דרך backflush בעת confirmation. במודל מבוסס-אספקה, ה-EWM מספק את החומר לנקודת-הצריכה אך הצריכה עצמה היא תנועת-MM-IM/PP; כשהמלאי מנוהל ב-EWM, הצריכה מסונכרנת בחזרה. backflush מבוסס על ה-BOM וה-Reservation.",
          purposeHe:
            "לתעד צריכת-חומר מדויקת לחישוב-עלות, לעדכון-מלאי ולסגירת-הזמנה נכונה.",
          processExampleHe:
            "הקו צורך 1,000 בקבוקים ➔ תנועת-261 מורידה מהמלאי כנגד ה-Reservation ➔ העלות נזקפת להזמנה ➔ confirmation עם backflush רושם צריכה אוטומטית.",
          cbcHe:
            "ב-CBC: בעת מילוי, הקו צורך תרכיז/סוכר/בקבוקים; ה-backflush ב-confirmation רושם תנועת-261 לפי ה-BOM, והעלות נזקפת לאצוות-המשקה.",
          navHe: [
            "SCM Extended Warehouse Management ► Goods Receipt Process ► Production Integration ► Delivery-Based ► Consumption",
            "Production ► Shop Floor Control ► Confirmations ► Define Confirmation Parameters",
          ],
          tables: ["RESB", "AUFM", "MSEG", "AFKO"],
          tcodes: ["MIGO", "MB1A", "CO11N", "COGI"],
          fiori: ["F2335", "F0273"],
          configHe: [
            "Backflush מוגדר באב-החומר (Backflush flag) / ב-Routing / בפרופיל-Confirmation.",
            "Goods Movement 261 כנגד Reservation; טיפול-שגיאות דרך COGI.",
          ],
          flow: [
            { he: "חומר זמין ליד הקו", code: "Staging" },
            { he: "צריכה בפועל", code: "261", note: "GI כנגד Reservation" },
            { he: "Confirmation + backflush", code: "CO11N" },
            { he: "זקיפת-עלות להזמנה", code: "AUFM" },
            { he: "טיפול בשגיאות-backflush", code: "COGI" },
          ],
          mistakesHe: [
            "backflush ללא מלאי זמין ➔ רשומות-שגיאה ב-COGI.",
            "צריכה ידנית כפולה בנוסף ל-backflush ➔ צריכת-יתר.",
            "BOM/Reservation שגוי ➔ צריכה לא-מדויקת.",
          ],
          troubleshootHe: [
            "צריכה לא נרשמת ➔ backflush לא מופעל או confirmation לא בוצע.",
            "שגיאות ב-COGI ➔ חוסר-מלאי בנקודת-הצריכה או batch לא נקבע.",
            "פערי-עלות ➔ צריכה לא תואמת ל-BOM/Reservation.",
          ],
          bestPracticeHe: [
            "הגדר backflush היכן שהצריכה צפויה וקבועה.",
            "נטר COGI יומית ונקה שגיאות מיד.",
            "ודא תאום BOM↔Reservation↔staging.",
          ],
          interviewHe: [
            { qHe: "מהי תנועת הצריכה בהזמנת-ייצור?", aHe: "תנועת-261 (Goods Issue) כנגד ה-Reservation, המורידה רכיבים מהמלאי וזוקפת עלות להזמנה." },
            { qHe: "מהו backflush ואיפה מטפלים בשגיאותיו?", aHe: "רישום-צריכה אוטומטי בעת confirmation לפי ה-BOM; שגיאות (חוסר-מלאי/batch) מטופלות ב-COGI." },
          ],
          takeawaysHe: [
            "Consumption = תנועת-261 מול ה-Reservation.",
            "ניתן ידני (MIGO) או אוטומטי (backflush ב-confirmation).",
            "שגיאות-backflush מנוקות ב-COGI.",
          ],
          relatedHe: [
            { labelHe: "PP · דיווח וצריכה", href: "/library/pp/chapter-06/" },
          ],
        },
        {
          id: "2.2.4",
          titleHe: "קבלת טובין להזמנות ייצור",
          titleEn: "Goods Receipt for Manufacturing Orders",
          execHe:
            "Goods Receipt (GR) הוא קליטת התוצרת המוגמרת מרצפת-הייצור בחזרה למחסן — תנועת-המלאי 101 שמגדילה את מלאי-המוצר-המוגמר וסוגרת את לולאת-הייצור. במודל מבוסס-אספקה, ה-GR מתממש כ-Inbound Delivery שעליה EWM מבצע putaway. זהו השלב השלישי והאחרון בשרשרת.",
          beginnerHe:
            "GR = 'המוצר המוגמר חוזר למחסן'. אחרי שהקו ייצר את המשקה, צריך להכניס אותו חזרה למלאי כדי שאפשר יהיה למכור אותו. EWM קולט את המשטחים, מוצא להם מקום במדף (putaway), והמלאי גדל. במודל הזה זה קורה דרך 'תעודת-קבלה' (Inbound Delivery).",
          consultantHe:
            "ה-GR מבוסס על תנועת-101 כנגד הזמנת-הייצור; ב-EWM נוצרת Inbound Delivery שעליה רצים putaway WTs לפי אסטרטגיית-Putaway. ניתן GR אוטומטי בעת confirmation (אם מוגדר ב-Production Scheduling Profile/Control Key). batch ו-best-before נקבעים בקליטה (חשוב ל-FEFO). הסנכרון חוזר ל-MM-IM/PP.",
          purposeHe:
            "להפוך תוצרת-ייצור למלאי-זמין-למכירה במהירות, לתעד תפוקה מול ההזמנה, ולשמר נראות-מלאי מדויקת.",
          processExampleHe:
            "הקו מסיים 1,000 יח' ➔ confirmation מפעיל GR אוטומטי (101) ➔ Inbound Delivery נוצרת ב-EWM ➔ putaway WT מנתב ל-bin אחסון ➔ אישור מעדכן מלאי-מוגמר.",
          cbcHe:
            "ב-CBC: משטחי-משקה מוגמר נקלטים עם batch ותאריך-תפוגה; EWM מבצע putaway לאזור-ה-FEFO, והמלאי-הזמין-למכירה גדל מיד.",
          navHe: [
            "SCM Extended Warehouse Management ► Goods Receipt Process ► Production Integration ► Delivery-Based ► Goods Receipt",
            "Production ► Shop Floor Control ► Operations ► Confirmation ► Define Automatic Goods Receipt",
          ],
          tables: ["/SCWM/DLV_HEAD", "/SCWM/ORDIM_O", "AUFM", "MSEG"],
          tcodes: ["/SCWM/PRDI", "MIGO", "CO11N", "MB31"],
          fiori: ["F2148", "F0273"],
          configHe: [
            "Automatic GR מוגדר ב-Production Scheduling Profile / Control Key של פעולת-הסיום.",
            "WPT ל-putaway + אסטרטגיית-Putaway (FEFO/אזור).",
            "קביעת batch ו-best-before בקליטה.",
          ],
          flow: [
            { he: "סיום-ייצור + confirmation", code: "CO11N" },
            { he: "GR אוטומטי", code: "101" },
            { he: "Inbound Delivery לתוצרת", code: "/SCWM/PRDI" },
            { he: "Putaway WT", code: "/SCWM/ORDIM_O", note: "FEFO" },
            { he: "עדכון מלאי-מוגמר", code: "/SCWM/LAGP" },
          ],
          mistakesHe: [
            "GR ללא קביעת-batch ➔ אובדן FEFO ועקיבות.",
            "GR ידני בנוסף לאוטומטי ➔ כפל-מלאי.",
            "אי-הגדרת WPT ל-putaway ➔ התוצרת תקועה ב-bin קבלה.",
          ],
          troubleshootHe: [
            "תוצרת לא נקלטת ➔ GR אוטומטי לא מוגדר או confirmation לא בוצע.",
            "Inbound Delivery לא זורמת ל-EWM ➔ qRFC תקוע.",
            "putaway נכשל ➔ אסטרטגיה/קיבולת-bin שגויה.",
          ],
          bestPracticeHe: [
            "הפעל GR אוטומטי בפעולת-הסיום לקיצור זמן-מחזור.",
            "קבע batch ו-best-before בקליטה לתמיכת-FEFO.",
            "הגדר putaway לאזור-תפוגה-מסודר.",
          ],
          interviewHe: [
            { qHe: "מהי תנועת ה-GR בהזמנת-ייצור?", aHe: "תנועת-101 כנגד ההזמנה, המגדילה מלאי-מוגמר; ב-EWM ממומשת כ-Inbound Delivery עם putaway." },
            { qHe: "כיצד מפעילים GR אוטומטי?", aHe: "דרך Production Scheduling Profile / Control Key של פעולת-הסיום — ה-confirmation מפעיל את ה-101." },
          ],
          takeawaysHe: [
            "GR = תנועת-101, קליטת תוצרת מוגמרת.",
            "ב-EWM ממומש כ-Inbound Delivery + putaway.",
            "קבע batch/best-before לתמיכת-FEFO.",
          ],
          relatedHe: [
            { labelHe: "EWM · קבלת-טובין", href: "/library/wm/chapter-01/#sub-1.1" },
          ],
        },
      ],
    },
    // ============================================================ 2.3
    {
      id: "2.3",
      titleHe: "שילוב ייצור מתקדם",
      titleEn: "Advanced Production Integration",
      execHe:
        "שילוב ייצור מתקדם (advanced production integration) הוא המודל העשיר, מבוסס Production Material Request (PMR), המאפשר staging ברזולוציה גבוהה ברמת Production Supply Area (PSA), הבחנה בין pick-parts/crate-parts/release-order-parts, ניקוי-bins אוטומטי ותהליכי-replenishment. הוא הסטנדרט לנפחים גבוהים ול-just-in-time. ה-PMR זורם מ-PP ל-EWM דרך ה-Manufacturing Integration ומחליף את מודל-האספקה.",
      beginnerHe:
        "כאן הייצור והמחסן מדברים בשפה 'מתוחכמת' במיוחד. במקום משלוחים רגילים, PP שולח ל-EWM 'בקשת-חומר-לייצור' (PMR) שיודעת בדיוק לאיזו נקודה ברצפה (PSA) צריך כל רכיב, מתי, ובאיזה אופן. EWM יכול להזין חלק מהחומר מראש (crate-parts), חלק רק כשצריך (pick-parts), ואפילו לנקות את התא הריק ולחדש אותו אוטומטית. זה המודל לקווים גדולים שעובדים בקצב גבוה.",
      consultantHe:
        "ה-advanced model מבוסס PMR (/SCWM/PMR_HEAD/PMR_ITEM) שמתקבל מ-PP. ה-staging מנותב ברמת-PSA לפי Control Cycle: pick-parts (לפי דרישה, /SCWM/PSASTAGE), crate-parts/release-order-parts (כמות-קבועה/לכל-הזמנה). תהליכי-ליבה: staging WTs, consumption (תנועת-261/EWM-managed), GR לתוצרת, ניקוי PSA bin (החזרת-עודפים), ויצירת-replenishment. ה-Control Cycle (LPK1/PK05 בצד PP, מיפוי PSA↔bin ב-EWM) הוא נתון-המפתח. embedded EWM מפשט את הסנכרון; decentralized דורש CIF/qRFC.",
      purposeHe:
        "לאפשר staging just-in-time מדויק, מינימום מלאי-רצפה, ניצול-מיטבי של נקודות-הצריכה וניהול אוטומטי של ניקוי וחידוש — קריטי לקווים מהירים ולמורכבות-רכיבים גבוהה.",
      processExampleHe:
        "Order משוחרר ➔ PMR זורם ל-EWM ➔ Control Cycle קובע לכל רכיב אם pick-part או crate-part ➔ staging WTs מנתבים ל-PSA bin ➔ הייצור צורך ➔ עודפים מנוקים מה-PSA bin ➔ replenishment מחדש אוטומטית ➔ GR לתוצרת עם putaway.",
      cbcHe:
        "ב-CBC: קו-מילוי ראשי בנפח גבוה עובד advanced — תרכיז כ-pick-part מוזן JIT לפי דרישה, בקבוקים/פקקים כ-crate-parts בכמות-קבועה ל-PSA. בסיום-משמרת ה-PSA bins מנוקים, replenishment מחדש לקראת המשמרת הבאה, ומשקה מוגמר נקלט ב-GR עם batch.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Cross-Process Settings ► Manufacturing (PP) Integration ► Advanced Production Integration",
        "SCM Extended Warehouse Management ► Master Data ► Production Supply Area ► Define PSA and Control Cycle",
      ],
      tables: ["/SCWM/PMR_HEAD", "/SCWM/PMR_ITEM", "/SCWM/STAGING", "/SCWM/ORDIM_O", "PVBE"],
      tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON", "/SCWM/PMR", "PK05", "LPK1"],
      fiori: ["F2148", "F0273", "W0001"],
      configHe: [
        "Advanced Integration: מפעילים ברמת Warehouse Number; ה-PMR מחליף את מודל-האספקה.",
        "Production Supply Area (PSA): מגדירים ב-PP (PK05) וממפים ל-Storage Type/Bin ב-EWM.",
        "Control Cycle (LPK1): קובע staging type — pick-part / crate-part / release-order-part — וכמויות.",
        "WPT נפרדים ל-staging, replenishment, consumption ו-GR.",
      ],
      flow: [
        { he: "שחרור Order", code: "CO02/COR2", note: "PP" },
        { he: "PMR זורם ל-EWM", code: "/SCWM/PMR_HEAD" },
        { he: "Control Cycle קובע staging type", code: "LPK1" },
        { he: "Staging ל-PSA bin", code: "/SCWM/PSASTAGE" },
        { he: "צריכה", code: "261" },
        { he: "ניקוי PSA + replenishment", code: "WT" },
        { he: "GR לתוצרת", code: "101" },
      ],
      masterDataHe: [
        "Production Supply Area (PVBE/PSA) = נקודת-צריכה · Control Cycle (PVBE) = staging type + כמות.",
        "PMR (/SCWM/PMR_HEAD/ITEM) = בקשת-החומר-לייצור המניעה את ה-staging ב-EWM.",
      ],
      mistakesHe: [
        "Control Cycle שגוי ➔ staging type לא-נכון (pick במקום crate או להפך).",
        "אי-מיפוי PSA ל-bin ➔ ה-staging לא מנותב.",
        "אי-הגדרת replenishment ➔ ה-PSA bin מתרוקן ועוצר את הקו.",
        "ערבוב advanced ו-delivery-based על אותו קו ➔ כפילות וסתירות.",
      ],
      troubleshootHe: [
        "PMR לא נוצר ➔ Manufacturing Integration / advanced לא מופעל בצד PP.",
        "staging לא מנותב ➔ Control Cycle/PSA-mapping חסר.",
        "PSA bin מתרוקן ➔ replenishment לא מוגדר או נכשל.",
        "מלאי לא מתואם ➔ qRFC תקוע (SMQ1) או CIF לא סונכרן (decentralized).",
      ],
      bestPracticeHe: [
        "השתמש ב-advanced לקווים בנפח גבוה ול-JIT.",
        "הגדר Control Cycle ברור לכל רכיב — pick לדרישה, crate לכמות-קבועה.",
        "הגדר replenishment אוטומטי כדי למנוע התרוקנות PSA.",
        "ב-decentralized נטר CIF/qRFC לסנכרון אמין.",
      ],
      interviewHe: [
        { qHe: "מה מבדיל advanced מ-delivery-based?", aHe: "advanced מבוסס Production Material Request (PMR), תומך staging ברמת-PSA, הבחנה בין pick/crate/release-order parts, ניקוי-bins ו-replenishment — בעוד delivery-based מבוסס Outbound/Inbound Delivery בלבד." },
        { qHe: "מהו Control Cycle בהקשר advanced?", aHe: "נתון-אב (PVBE) הקושר PSA לרכיב וקובע את staging type (pick/crate/release-order) ואת הכמויות." },
        { qHe: "מהו PMR?", aHe: "Production Material Request — בקשת-החומר-לייצור הזורמת מ-PP ל-EWM ומניעה את ה-staging המתקדם." },
      ],
      takeawaysHe: [
        "advanced production integration מבוסס PMR, לא על deliveries.",
        "תומך staging ברמת-PSA, pick/crate/release-order parts, ניקוי ו-replenishment.",
        "Control Cycle הוא נתון-המפתח לקביעת אופן-ההזנה.",
        "המודל המומלץ לנפח גבוה ול-just-in-time.",
      ],
      relatedHe: [
        { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
        { labelHe: "EWM · שילוב מבוסס-אספקה (2.2)", href: "/library/wm/chapter-02/#sub-2.2" },
        { labelHe: "אובייקט · /SCWM/PMR_HEAD", href: "/library/wm/object/PMR_HEAD/" },
      ],
      children: [
        {
          id: "2.3.1",
          titleHe: "הזנה להזמנות ייצור",
          titleEn: "Staging for Manufacturing Orders",
          execHe:
            "Staging במודל המתקדם מנותב ברמת Production Supply Area (PSA) לפי Control Cycle, ומבחין בין pick-parts (לפי דרישה), crate-parts (כמות-קבועה) ו-release-order-parts (לכל-הזמנה). ה-PMR מניע את ה-staging, וה-T-Code /SCWM/PSASTAGE מבצע אותו. זהו השלב הראשון בשרשרת המתקדמת.",
          beginnerHe:
            "כאן ה-staging 'חכם': לכל רכיב יש כלל איך להזין אותו. רכיב יקר (תרכיז) — רק כשצריך (pick-part). רכיב זול ונפוץ (בקבוקים) — מראש בכמות גדולה (crate-part). EWM יודע מה הכלל לכל רכיב דרך ה-Control Cycle, ומביא אותו ל-PSA bin המדויק ליד הקו.",
          consultantHe:
            "ה-staging מבוסס PMR ומנותב דרך /SCWM/PSASTAGE. Control Cycle (PVBE) קובע staging type: pick-part מייצר WT לפי הדרישה בהזמנה; crate-part מזין כמות-קבועה (Crate quantity) ללא תלות-הזמנה; release-order-part מזין את כל כמות-ההזמנה בבת-אחת. ה-WPT קובע source/destination. אפשר staging ידני (/SCWM/PSASTAGE) או אוטומטי בעת PMR.",
          purposeHe:
            "להזין כל רכיב באופן המיטבי לו — JIT ליקרים/מתכלים, batch לזולים — ולמזער מלאי-רצפה תוך מניעת עצירות.",
          processExampleHe:
            "PMR ל-Order ➔ Control Cycle מסווג: תרכיז=pick, בקבוקים=crate ➔ /SCWM/PSASTAGE יוצר WTs ➔ EWM מנתב לכל PSA bin ➔ אישור מעדכן מלאי.",
          cbcHe:
            "ב-CBC: תרכיז מוזן pick-part JIT לפני הרצה; בקבוקים/פקקים crate-parts בכמות-קבועה ל-PSA. כך אין עודף-תרכיז ליד הקו, ויש מלאי-אריזה זמין רציף.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► Advanced ► Staging ► Define Staging Control",
            "SCM Extended Warehouse Management ► Master Data ► Production Supply Area ► Control Cycle",
          ],
          tables: ["/SCWM/PMR_ITEM", "/SCWM/STAGING", "/SCWM/ORDIM_O", "PVBE"],
          tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON", "LPK1"],
          fiori: ["F2148", "W0001"],
          configHe: [
            "Control Cycle (LPK1/PVBE): staging type לכל רכיב — pick / crate / release-order — וכמויות.",
            "WPT ל-staging המגדיר source bin ו-PSA destination.",
            "אוטומטי בעת PMR או ידני דרך /SCWM/PSASTAGE.",
          ],
          flow: [
            { he: "PMR זורם ל-EWM", code: "/SCWM/PMR_ITEM" },
            { he: "Control Cycle מסווג רכיב", code: "LPK1" },
            { he: "Staging WT", code: "/SCWM/PSASTAGE" },
            { he: "ניתוב ל-PSA bin", code: "WT" },
            { he: "אישור + עדכון מלאי", code: "/SCWM/LAGP" },
          ],
          mistakesHe: [
            "סיווג רכיב יקר כ-crate ➔ עודף-מלאי-רצפה.",
            "סיווג רכיב נפוץ כ-pick ➔ ריבוי-WTs מיותר.",
            "כמות-crate שגויה ➔ עודף/חוסר ב-PSA bin.",
          ],
          troubleshootHe: [
            "staging לא נוצר ➔ Control Cycle/PSA-mapping חסר.",
            "staging type לא-נכון ➔ הגדרת Control Cycle שגויה.",
            "WT נכשל ➔ אין מלאי ב-source bin.",
          ],
          bestPracticeHe: [
            "pick-parts לרכיבים יקרים/מתכלים; crate-parts לזולים/נפוצים.",
            "כייל את כמות-ה-crate לקצב-הקו.",
            "השתמש ב-/SCWM/PSASTAGE לבקרת-staging ידנית בעת הצורך.",
          ],
          interviewHe: [
            { qHe: "אילו סוגי-staging קיימים ב-advanced?", aHe: "pick-part (לפי דרישה), crate-part (כמות-קבועה ללא תלות-הזמנה), ו-release-order-part (כל כמות-ההזמנה בבת-אחת)." },
            { qHe: "איזה T-Code מבצע staging מתקדם?", aHe: "/SCWM/PSASTAGE, המנותב לפי ה-Control Cycle של ה-PSA." },
          ],
          takeawaysHe: [
            "staging מתקדם מנותב ברמת-PSA לפי Control Cycle.",
            "pick / crate / release-order parts — אופן-הזנה לכל רכיב.",
            "/SCWM/PSASTAGE מבצע; PMR מניע.",
          ],
          relatedHe: [
            { labelHe: "EWM · ניקוי PSA bin (2.3.4)", href: "/library/wm/chapter-02/#sub-2.3.4" },
          ],
        },
        {
          id: "2.3.2",
          titleHe: "צריכה להזמנות ייצור",
          titleEn: "Consumption for Manufacturing Orders",
          execHe:
            "Consumption במודל המתקדם רושם את צריכת הרכיבים מה-PSA bin מול הזמנת-הייצור. כאשר המלאי מנוהל-EWM, הצריכה יכולה להתבצע EWM-managed (מ-PSA bin) ולהסתנכרן עם תנועת-261 בצד PP. backflush ב-confirmation הוא הדרך הנפוצה.",
          beginnerHe:
            "אחרי שהחומר ב-PSA bin ליד הקו, הקו צורך אותו. במודל המתקדם, EWM יודע בדיוק כמה נשאר ב-PSA bin, ובעת הצריכה מוריד את הכמות ומשייך אותה להזמנה. לרוב זה קורה אוטומטית בעת הדיווח (backflush).",
          consultantHe:
            "הצריכה נרשמת כ-261 כנגד ה-Reservation, לרוב backflush ב-confirmation. כשהמלאי ב-PSA mannaged ב-EWM, הצריכה מורידה מה-PSA bin ומסנכרנת ל-PP/MM-IM. שגיאות-backflush (חוסר ב-PSA bin, batch לא-נקבע) מטופלות ב-COGI. ה-PSA bin משקף את היתרה-בפועל ברצפה.",
          purposeHe:
            "לתעד צריכה מדויקת מול ה-PSA bin לחישוב-עלות, לעדכון-מלאי-רצפה ולהפעלת replenishment בזמן.",
          processExampleHe:
            "הקו צורך מ-PSA bin ➔ backflush ב-confirmation רושם 261 ➔ יתרת ה-PSA bin יורדת ➔ כשיורדת מתחת לסף ➔ replenishment מופעל.",
          cbcHe:
            "ב-CBC: בעת מילוי, הקו צורך תרכיז ובקבוקים מה-PSA bin; backflush רושם 261 לפי ה-BOM, ויתרת ה-PSA bin מתעדכנת בזמן-אמת.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► Advanced ► Consumption",
            "Production ► Shop Floor Control ► Confirmations ► Define Confirmation Parameters",
          ],
          tables: ["RESB", "AUFM", "MSEG", "/SCWM/STAGING"],
          tcodes: ["CO11N", "COGI", "MIGO", "/SCWM/MON"],
          fiori: ["F2335", "F0273"],
          configHe: [
            "Backflush מוגדר באב-החומר/Routing/פרופיל-Confirmation.",
            "צריכה EWM-managed מ-PSA bin; סנכרון תנועת-261 ל-PP.",
            "טיפול-שגיאות דרך COGI.",
          ],
          flow: [
            { he: "חומר ב-PSA bin", code: "Staging" },
            { he: "צריכה בפועל", code: "261", note: "מ-PSA bin" },
            { he: "Confirmation + backflush", code: "CO11N" },
            { he: "ירידת יתרת PSA bin", code: "/SCWM/STAGING" },
            { he: "שגיאות-backflush", code: "COGI" },
          ],
          mistakesHe: [
            "backflush ללא מלאי ב-PSA bin ➔ שגיאות COGI.",
            "צריכה ידנית כפולה ➔ צריכת-יתר.",
            "batch לא-נקבע ➔ כשל-backflush.",
          ],
          troubleshootHe: [
            "צריכה לא נרשמת ➔ backflush/confirmation לא בוצע.",
            "COGI מלא שגיאות ➔ חוסר ב-PSA bin או batch לא-נקבע.",
            "יתרת PSA לא יורדת ➔ צריכה לא סונכרנה ל-EWM.",
          ],
          bestPracticeHe: [
            "הגדר backflush לרכיבים בצריכה-קבועה.",
            "נטר COGI יומית ונקה מיד.",
            "ודא קביעת-batch אוטומטית ב-PSA לתמיכת-backflush.",
          ],
          interviewHe: [
            { qHe: "כיצד נרשמת צריכה במודל המתקדם?", aHe: "כתנועת-261 כנגד ה-Reservation, לרוב backflush ב-confirmation, מתוך ה-PSA bin המנוהל-EWM." },
            { qHe: "מה הקשר בין צריכה ל-replenishment?", aHe: "הצריכה מורידה את יתרת ה-PSA bin; כשהיא יורדת מתחת לסף, ה-replenishment מופעל לחידוש." },
          ],
          takeawaysHe: [
            "Consumption מתקדם מוריד מ-PSA bin ורושם 261.",
            "backflush ב-confirmation הוא הדרך הנפוצה.",
            "ירידת PSA bin מפעילה replenishment; שגיאות ב-COGI.",
          ],
        },
        {
          id: "2.3.3",
          titleHe: "קבלת טובין להזמנות ייצור",
          titleEn: "Goods Receipt for Manufacturing Orders",
          execHe:
            "Goods Receipt במודל המתקדם קולט את התוצרת המוגמרת ל-EWM עם putaway מלא, batch ו-best-before, בתיאום הדוק עם ה-PMR/הזמנה. תנועת-101 מגדילה מלאי-מוגמר, וה-EWM מנתב ל-bin אחסון לפי אסטרטגיה (כולל FEFO).",
          beginnerHe:
            "כמו במודל הפשוט, גם כאן המוצר המוגמר חוזר למחסן — אך בצורה הדוקה יותר: EWM יודע לקשר את הקליטה להזמנה, לקבוע batch ותאריך-תפוגה, ולמצוא למשטח את המקום הנכון לפי תוקף (FEFO). המלאי הזמין-למכירה גדל מיד.",
          consultantHe:
            "ה-GR מבוסס 101 כנגד ההזמנה, עם Inbound Delivery/HU ב-EWM ו-putaway WTs לפי אסטרטגיה. GR אוטומטי מוגדר בפעולת-הסיום. batch determination ו-best-before נקבעים בקליטה. ב-embedded הסנכרון פנימי; ב-decentralized דרך qRFC. ה-Handling Unit נשמר לעקיבות.",
          purposeHe:
            "להפוך תוצרת למלאי-זמין-למכירה במהירות, עם עקיבות-batch מלאה ו-putaway חכם תומך-FEFO.",
          processExampleHe:
            "סיום-ייצור ➔ confirmation מפעיל GR (101) ➔ Inbound Delivery/HU ב-EWM ➔ putaway WT לפי FEFO ➔ אישור מעדכן מלאי-מוגמר.",
          cbcHe:
            "ב-CBC: משטחי-משקה מוגמר נקלטים עם batch ותאריך-תפוגה; EWM מבצע putaway לאזור-FEFO, ומלאי-המכירה גדל מיד לקראת הזמנות-לקוח.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► Advanced ► Goods Receipt",
            "Production ► Shop Floor Control ► Operations ► Confirmation ► Define Automatic Goods Receipt",
          ],
          tables: ["/SCWM/DLV_HEAD", "/SCWM/HUHDR", "/SCWM/ORDIM_O", "AUFM"],
          tcodes: ["/SCWM/PRDI", "CO11N", "MIGO", "/SCWM/MON"],
          fiori: ["F2148", "F0273"],
          configHe: [
            "Automatic GR בפעולת-הסיום (Production Scheduling Profile/Control Key).",
            "WPT ל-putaway + אסטרטגיה (FEFO/אזור).",
            "batch determination ו-best-before בקליטה; HU management.",
          ],
          flow: [
            { he: "סיום + confirmation", code: "CO11N" },
            { he: "GR אוטומטי", code: "101" },
            { he: "Inbound Delivery / HU", code: "/SCWM/HUHDR" },
            { he: "Putaway WT (FEFO)", code: "/SCWM/ORDIM_O" },
            { he: "עדכון מלאי-מוגמר", code: "/SCWM/LAGP" },
          ],
          mistakesHe: [
            "GR ללא batch ➔ אובדן FEFO/עקיבות.",
            "GR ידני + אוטומטי ➔ כפל-מלאי.",
            "WPT putaway חסר ➔ תוצרת תקועה ב-bin קבלה.",
          ],
          troubleshootHe: [
            "תוצרת לא נקלטת ➔ GR אוטומטי/confirmation לא בוצע.",
            "Inbound Delivery לא זורמת ➔ qRFC תקוע (decentralized).",
            "putaway נכשל ➔ אסטרטגיה/קיבולת-bin שגויה.",
          ],
          bestPracticeHe: [
            "הפעל GR אוטומטי לקיצור זמן-מחזור.",
            "קבע batch/best-before לתמיכת-FEFO.",
            "נצל HU לעקיבות מלאה של המשטח.",
          ],
          interviewHe: [
            { qHe: "מה מייחד GR במודל המתקדם?", aHe: "קישור הדוק להזמנה/PMR, batch ו-best-before בקליטה, ו-putaway חכם תומך-FEFO עם Handling Unit לעקיבות." },
            { qHe: "כיצד מפעילים GR אוטומטי?", aHe: "בפעולת-הסיום דרך Production Scheduling Profile/Control Key — ה-confirmation מפעיל את ה-101." },
          ],
          takeawaysHe: [
            "GR מתקדם = 101 + Inbound Delivery/HU + putaway FEFO.",
            "batch/best-before בקליטה לעקיבות.",
            "GR אוטומטי בפעולת-הסיום מקצר מחזור.",
          ],
          relatedHe: [
            { labelHe: "EWM · קבלת-טובין (1.1)", href: "/library/wm/chapter-01/#sub-1.1" },
          ],
        },
        {
          id: "2.3.4",
          titleHe: "ניקוי תא אזור-אספקת-ייצור להזמנות ייצור",
          titleEn: "Clear Production Supply Area Bin for Manufacturing Orders",
          execHe:
            "ניקוי PSA bin (Clear Production Supply Area Bin) מחזיר את עודפי-החומר שנותרו ב-PSA bin בסיום-הזמנה/משמרת בחזרה ל-bin אחסון, ומאפס את נקודת-הצריכה. הוא מונע הצטברות-מלאי-רצפה ומשמר דיוק-מלאי. תהליך ייחודי למודל המתקדם.",
          beginnerHe:
            "בסוף הרצה או משמרת, לרוב נשאר קצת חומר ב-PSA bin שלא נוצל. ניקוי-ה-PSA מחזיר את העודף הזה למדף האחסון, כדי שה-PSA bin יהיה נקי לרכיב/הרצה הבאה ושהמלאי יהיה מדויק. בלי זה, ה-PSA bin היה מתמלא בשאריות ומבלבל.",
          consultantHe:
            "הניקוי יוצר WT להחזרת-יתרה מ-PSA bin אל source/storage bin. ניתן ידני (/SCWM/PSASTAGE → clear) או כחלק מ-post-processing של ה-PMR. חשוב לרכיבים batch-managed כדי לא להשאיר batch תקוע ברצפה. יש לתאם עם ה-replenishment כדי לא לחדש מיד אחרי ניקוי. משקף יתרת-PSA נכונה ל-MM-IM/EWM.",
          purposeHe:
            "לאפס את ה-PSA bin בין הרצות, למנוע הצטברות-שאריות ולשמר דיוק-מלאי ועקיבות-batch.",
          processExampleHe:
            "סיום-הזמנה ➔ נותרו 20 בקבוקים ב-PSA bin ➔ ניקוי יוצר WT להחזרתם ל-bin אחסון ➔ ה-PSA bin מתאפס ➔ המלאי מתואם.",
          cbcHe:
            "ב-CBC: בסיום-משמרת נשארות שאריות-תרכיז/אריזה ב-PSA bin; הניקוי מחזיר אותן למחסן עם ה-batch המקורי, וה-PSA bin נקי למשמרת הבאה.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► Advanced ► Clear Production Supply Area Bin",
          ],
          tables: ["/SCWM/STAGING", "/SCWM/ORDIM_O", "/SCWM/LAGP"],
          tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON"],
          fiori: ["F2148", "W0001"],
          configHe: [
            "WPT לניקוי (החזרת-יתרה מ-PSA ל-storage bin).",
            "הפעלה ידנית (/SCWM/PSASTAGE → clear) או כ-post-processing של PMR.",
            "תיאום עם replenishment כדי למנוע חידוש-מיותר אחרי ניקוי.",
          ],
          flow: [
            { he: "סיום-הזמנה/משמרת", code: "PMR" },
            { he: "זיהוי יתרה ב-PSA bin", code: "/SCWM/STAGING" },
            { he: "WT להחזרת-יתרה", code: "/SCWM/PSASTAGE", note: "clear" },
            { he: "החזרה ל-bin אחסון", code: "/SCWM/LAGP" },
            { he: "איפוס PSA bin + תאום-מלאי", code: "WT" },
          ],
          mistakesHe: [
            "אי-ניקוי ➔ הצטברות-שאריות ובלבול-batch ב-PSA.",
            "ניקוי לפני סיום-צריכה ➔ החזרת-חומר-נדרש.",
            "חוסר-תאום עם replenishment ➔ חידוש מיד אחרי ניקוי.",
          ],
          troubleshootHe: [
            "יתרה תקועה ב-PSA bin ➔ WT ניקוי לא הופעל או WPT חסר.",
            "batch לא חוזר נכון ➔ קביעת-batch בהחזרה שגויה.",
            "ניקוי-יתר ➔ הופעל בטרם-עת מול הצריכה.",
          ],
          bestPracticeHe: [
            "נקה PSA bin בסיום-משמרת/הזמנה באופן שיטתי.",
            "שמר על ה-batch המקורי בהחזרה לעקיבות.",
            "תאם ניקוי ↔ replenishment כדי למנוע תנועות-סרק.",
          ],
          interviewHe: [
            { qHe: "מהו ניקוי PSA bin ומדוע נחוץ?", aHe: "החזרת עודפי-חומר מ-PSA bin ל-bin אחסון בסיום-הזמנה/משמרת — מונע הצטברות-שאריות ושומר דיוק-מלאי ועקיבות-batch." },
            { qHe: "מתי לא לבצע ניקוי?", aHe: "כשהצריכה לא הסתיימה — ניקוי מוקדם יחזיר חומר שעדיין נדרש לקו." },
          ],
          takeawaysHe: [
            "ניקוי PSA bin מחזיר עודפים ל-bin אחסון ומאפס את הנקודה.",
            "ייחודי למודל המתקדם; חשוב לעקיבות-batch.",
            "תאם עם replenishment למניעת תנועות-סרק.",
          ],
        },
        {
          id: "2.3.5",
          titleHe: "יצירת תהליך חידוש-חלקים",
          titleEn: "Create Part Replenishment Process",
          execHe:
            "תהליך חידוש-חלקים (Part Replenishment) מחדש אוטומטית את מלאי ה-PSA bin כשהוא יורד מתחת לסף — מבטיח זמינות-חומר רציפה לקו ללא staging ידני חוזר. הוא משלים את ה-staging המתקדם ומונע עצירות-קו.",
          beginnerHe:
            "במקום שמישהו יביא חומר לקו כל פעם מחדש, EWM עושה זאת אוטומטית: כשה-PSA bin מתרוקן עד סף מסוים, נוצרת אוטומטית 'הזמנת-חידוש' שממלאת אותו מחדש מהמחסן. כך הקו אף פעם לא נשאר בלי חומר, ואין צורך בהתערבות ידנית כל הזמן.",
          consultantHe:
            "ה-replenishment מבוסס על min/max quantity ב-Control Cycle/PSA. כש-stock ב-PSA bin ≤ min, EWM יוצר replenishment WT למילוי עד max. סוגי-replenishment: planned, order-related, direct, automatic. ה-WPT קובע source. ניתן להריץ ב-batch job או event-driven. תאום הדוק עם consumption (יורד) וניקוי (מאפס) הוא קריטי.",
          purposeHe:
            "להבטיח זמינות-חומר רציפה בנקודת-הצריכה תוך מינימום-התערבות, ולמנוע עצירות-קו עקב התרוקנות-PSA.",
          processExampleHe:
            "PSA bin של בקבוקים יורד ל-min (200) ➔ replenishment WT נוצר אוטומטית ➔ EWM ממלא עד max (1,000) מ-bin אחסון ➔ הקו ממשיך רציף.",
          cbcHe:
            "ב-CBC: PSA bin של פקקים מוגדר min/max; כשיורד מתחת ל-min בזמן מילוי, replenishment אוטומטי מחדש אותו מהמחסן, והקו ממשיך בקצב מלא ללא עצירה.",
          navHe: [
            "SCM Extended Warehouse Management ► Internal Warehouse Processes ► Replenishment Control ► Define Replenishment",
            "SCM Extended Warehouse Management ► Master Data ► Production Supply Area ► Control Cycle (min/max)",
          ],
          tables: ["/SCWM/STAGING", "/SCWM/ORDIM_O", "PVBE", "/SCWM/LAGP"],
          tcodes: ["/SCWM/REPL", "/SCWM/PSASTAGE", "LPK1", "/SCWM/MON"],
          fiori: ["F2148", "W0001"],
          configHe: [
            "Control Cycle עם min/max quantity ל-PSA bin.",
            "Replenishment type: planned / order-related / direct / automatic.",
            "WPT ל-replenishment המגדיר source bin; הרצה ב-batch job או event-driven.",
          ],
          flow: [
            { he: "צריכה מורידה PSA bin", code: "261" },
            { he: "יתרה ≤ min", code: "Control Cycle" },
            { he: "יצירת replenishment WT", code: "/SCWM/REPL" },
            { he: "מילוי עד max מ-bin אחסון", code: "/SCWM/ORDIM_O" },
            { he: "PSA bin זמין רציף", code: "/SCWM/LAGP" },
          ],
          mistakesHe: [
            "min/max שגוי ➔ התרוקנות (min נמוך) או עומס (max גבוה).",
            "אי-הגדרת replenishment type ➔ אין חידוש אוטומטי.",
            "חוסר-תאום עם ניקוי ➔ חידוש מיד אחרי ניקוי-PSA.",
          ],
          troubleshootHe: [
            "PSA bin מתרוקן ➔ replenishment לא מוגדר/לא רץ.",
            "replenishment-יתר ➔ max גבוה מדי או trigger כפול.",
            "WT נכשל ➔ אין מלאי ב-source או WPT שגוי.",
          ],
          bestPracticeHe: [
            "כייל min/max לקצב-הצריכה האמיתי של הקו.",
            "בחר replenishment type לפי הצורך (automatic לקווים רציפים).",
            "תאם replenishment ↔ consumption ↔ ניקוי למניעת תנועות-סרק.",
          ],
          interviewHe: [
            { qHe: "מהו תהליך חידוש-חלקים?", aHe: "חידוש אוטומטי של מלאי PSA bin כשהוא יורד ל-min, עד max, באמצעות replenishment WT — מבטיח זמינות-חומר רציפה לקו." },
            { qHe: "אילו סוגי-replenishment קיימים?", aHe: "planned, order-related, direct ו-automatic — נבחרים לפי אופי-הקו והצריכה." },
          ],
          takeawaysHe: [
            "Replenishment מחדש PSA bin אוטומטית בין min ל-max.",
            "מונע עצירות-קו ומצמצם התערבות ידנית.",
            "תאם הדוק עם consumption וניקוי-PSA.",
          ],
          relatedHe: [
            { labelHe: "EWM · ניקוי PSA bin (2.3.4)", href: "/library/wm/chapter-02/#sub-2.3.4" },
            { labelHe: "EWM · הזנה מתקדמת (2.3.1)", href: "/library/wm/chapter-02/#sub-2.3.1" },
          ],
        },
      ],
    },
    // ============================================================ 2.4
    {
      id: "2.4",
      titleHe: "שילוב עם SAP Manufacturing Execution",
      titleEn: "SAP Manufacturing Execution Integration",
      execHe:
        "שילוב EWM עם SAP Manufacturing Execution (SAP ME) מחבר את מנוע-המחסן למערכת-ביצוע-הייצור ברצפה (MES). SAP ME מנהל את הביצוע הפרטני של ההזמנה ברמת-תחנה, ויכול להפעיל staging מ-EWM just-in-time (ME-triggered staging). השילוב מאפשר תיאום הדוק בין רצפת-הייצור ל-EWM ול-MFS (Material Flow System) לאוטומציה.",
      beginnerHe:
        "SAP ME הוא מערכת שמנהלת את הייצור 'בזמן-אמת על הרצפה' — איזו תחנה עובדת על מה, מתי, ובאיזה קצב. כשהיא רואה שתחנה עומדת לצרוך חומר, היא יכולה 'לבקש' מ-EWM להזין אותו בדיוק ברגע הנכון (ME-triggered staging). כך החומר מגיע לתחנה רגע לפני שצריך אותו — בלי מלאי-עודף ובלי עצירות.",
      consultantHe:
        "SAP ME (MES) משתלב עם EWM דרך ME-triggered staging: אירוע ב-ME (למשל כניסת-יחידה לתחנה) מפעיל staging WT ב-EWM ל-PSA bin הרלוונטי. האינטגרציה נשענת על ה-SAP MII/ME integration layer ועל ה-PMR/Control Cycle בצד EWM. ל-decentralized/automation מצטרף MFS (Material Flow System) המנהל מסועים/AS-RS דרך PLC telegrams. ב-S/4HANA חלק מהפונקציות עברו ל-SAP Digital Manufacturing.",
      purposeHe:
        "לסנכרן את ביצוע-הייצור ברצפה (MES) עם הזנת-החומר מ-EWM, להשיג JIT-staging ברמת-תחנה, ולחבר אוטומציה (MFS) לזרימת-חומר חלקה ומדויקת.",
      processExampleHe:
        "יחידה נכנסת לתחנה ב-SAP ME ➔ אירוע מפעיל ME-triggered staging ➔ EWM יוצר staging WT ל-PSA bin של התחנה ➔ MFS מנתב מסוע/מלגזה ➔ החומר מגיע רגע לפני הצריכה.",
      cbcHe:
        "ב-CBC: קו-מילוי אוטומטי עם תחנות; SAP ME עוקב אחר התקדמות-היחידה ומפעיל ME-triggered staging מ-EWM לכל תחנה, ו-MFS מנהל את המסועים שמובילים את חומרי-האריזה JIT.",
      navHe: [
        "SCM Extended Warehouse Management ► Cross-Process Settings ► Manufacturing (PP) Integration ► SAP ME Integration",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Material Flow System (MFS) ► Basic Settings",
      ],
      tables: ["/SCWM/PMR_HEAD", "/SCWM/STAGING", "/SCWM/TELEGRAM", "/SCWM/ORDIM_O"],
      tcodes: ["/SCWM/PSASTAGE", "/SCWM/MFS", "/SCWM/MON", "/SCWM/PMR"],
      fiori: ["F2148", "W0001"],
      configHe: [
        "SAP ME Integration: הגדרת ה-integration layer (SAP MII/ME) להפעלת staging מאירועי-ME.",
        "ME-triggered staging WPT ל-PSA bin של התחנה.",
        "MFS: PLC/Communication Points, Telegrams, ו-Resource להובלה אוטומטית.",
      ],
      flow: [
        { he: "יחידה נכנסת לתחנה ב-SAP ME", code: "ME event" },
        { he: "ME-triggered staging", code: "/SCWM/PSASTAGE" },
        { he: "Staging WT ל-PSA bin", code: "/SCWM/ORDIM_O" },
        { he: "MFS מנתב אוטומציה", code: "/SCWM/MFS", note: "telegram" },
        { he: "חומר מגיע JIT לתחנה", code: "WT" },
      ],
      masterDataHe: [
        "PMR + Control Cycle (PSA) מצד EWM · ME Routing/POD מצד SAP ME.",
        "MFS Communication Points/Telegrams לאוטומציה (מסועים/AS-RS).",
      ],
      mistakesHe: [
        "אי-הגדרת ה-integration layer ➔ אירועי-ME לא מפעילים staging.",
        "ME-triggered staging ללא PSA-mapping ➔ ה-WT לא מנותב.",
        "התעלמות מ-MFS בקו אוטומטי ➔ חוסר-סנכרון עם המסועים.",
      ],
      troubleshootHe: [
        "staging לא מופעל מ-ME ➔ integration layer/אירוע לא מוגדר.",
        "WT לא מנותב ➔ PSA/Control Cycle חסר.",
        "אוטומציה תקועה ➔ MFS telegram/Communication Point שגוי.",
      ],
      bestPracticeHe: [
        "הגדר ME-triggered staging לתחנות בקצב-גבוה ל-JIT אמיתי.",
        "תאם PMR/Control Cycle בצד EWM עם ה-Routing בצד ME.",
        "נטר MFS telegrams לזרימת-אוטומציה אמינה.",
      ],
      interviewHe: [
        { qHe: "מהו ME-triggered staging?", aHe: "הפעלת staging WT ב-EWM מתוך אירוע ב-SAP ME (כניסת-יחידה לתחנה), המביא חומר ל-PSA bin רגע לפני הצריכה — JIT ברמת-תחנה." },
        { qHe: "מהו תפקיד MFS בשילוב זה?", aHe: "Material Flow System מנהל אוטומציה (מסועים/AS-RS) דרך PLC telegrams, ומבצע בפועל את הובלת-החומר שהופעלה." },
      ],
      takeawaysHe: [
        "SAP ME (MES) מחבר ביצוע-ייצור ברצפה ל-EWM.",
        "ME-triggered staging = JIT-staging ברמת-תחנה מאירועי-ME.",
        "MFS מנהל אוטומציה (מסועים/AS-RS) דרך telegrams.",
      ],
      relatedHe: [
        { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
        { labelHe: "EWM · שילוב מתקדם (2.3)", href: "/library/wm/chapter-02/#sub-2.3" },
      ],
      children: [
        {
          id: "2.4.1",
          titleHe: "הזנה לייצור מופעלת-SAP ME",
          titleEn: "SAP ME Triggered Staging to Production",
          execHe:
            "ME-triggered staging הוא הזנת-חומר מ-EWM המופעלת אוטומטית מאירוע ב-SAP ME — למשל כניסת-יחידה לתחנה. במקום staging מתוזמן-מראש, ה-staging מתרחש בדיוק כשהתחנה עומדת לצרוך, ומשיג just-in-time אמיתי ברמת-התחנה.",
          beginnerHe:
            "כאן ה-staging 'מופעל לפי מה שקורה ברצפה'. ברגע ש-SAP ME רואה שיחידה הגיעה לתחנה ועומדת לצרוך חומר, היא 'לוחצת על הכפתור' ו-EWM מביא את החומר מיד. כך החומר מגיע ברגע המדויק — לא מוקדם (שלא יצטבר) ולא מאוחר (שלא יעצור את הקו).",
          consultantHe:
            "אירוע ב-ME (POD/station entry) קורא ל-EWM דרך ה-integration layer ויוצר staging WT ל-PSA bin של התחנה, מבוסס PMR/Control Cycle. ה-WPT קובע source/destination ואסטרטגיה. שילוב עם MFS מנתב אוטומציה. הדיוק תלוי בתזמון-האירוע ובמיפוי PSA נכון לכל תחנה.",
          purposeHe:
            "להשיג JIT-staging ברמת-תחנה — חומר מגיע רגע לפני הצריכה — ולמזער מלאי-תחנה ועצירות.",
          processExampleHe:
            "יחידה נכנסת לתחנה 3 ב-ME ➔ אירוע מפעיל ME-triggered staging ➔ EWM יוצר WT ל-PSA bin של תחנה 3 ➔ MFS מנתב מסוע ➔ החומר מגיע JIT.",
          cbcHe:
            "ב-CBC: בתחנת-תיוג בקו-המילוי, כניסת-משטח ב-ME מפעילה staging של גליל-תוויות מ-EWM ל-PSA של התחנה בדיוק לפני התיוג.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► SAP ME Integration ► Triggered Staging",
          ],
          tables: ["/SCWM/PMR_ITEM", "/SCWM/STAGING", "/SCWM/ORDIM_O"],
          tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON"],
          fiori: ["F2148", "W0001"],
          configHe: [
            "Integration layer (SAP MII/ME) להפעלת staging מאירוע-ME.",
            "ME-triggered staging WPT ל-PSA bin של התחנה.",
            "מיפוי PSA לכל תחנה ב-Control Cycle.",
          ],
          flow: [
            { he: "כניסת-יחידה לתחנה", code: "ME event" },
            { he: "קריאה ל-EWM", code: "integration layer" },
            { he: "Staging WT ל-PSA bin", code: "/SCWM/PSASTAGE" },
            { he: "חומר מגיע JIT", code: "WT" },
          ],
          mistakesHe: [
            "אי-מיפוי PSA לתחנה ➔ ה-WT לא מנותב.",
            "תזמון-אירוע שגוי ➔ staging מוקדם/מאוחר מדי.",
            "integration layer לא מוגדר ➔ אין הפעלה.",
          ],
          troubleshootHe: [
            "staging לא מופעל ➔ אירוע-ME/integration layer לא מוגדר.",
            "WT ל-PSA שגוי ➔ מיפוי-תחנה חסר.",
            "עיכוב ב-staging ➔ MFS/אוטומציה איטית או תקועה.",
          ],
          bestPracticeHe: [
            "מפה PSA ייחודי לכל תחנה ב-ME.",
            "כייל את נקודת-האירוע לזמן-ההובלה האמיתי.",
            "שלב MFS לקווים אוטומטיים.",
          ],
          interviewHe: [
            { qHe: "מהו ME-triggered staging?", aHe: "staging המופעל מאירוע ב-SAP ME (כניסת-יחידה לתחנה) היוצר WT ב-EWM ל-PSA bin של התחנה — JIT ברמת-תחנה." },
            { qHe: "במה הוא נבדל מ-staging רגיל?", aHe: "הוא event-driven מהרצפה (ME) במקום מתוזמן-מראש מה-PMR/הזמנה, ולכן מדויק יותר בזמן." },
          ],
          takeawaysHe: [
            "ME-triggered staging = event-driven מהרצפה.",
            "משיג JIT ברמת-תחנה; ממזער מלאי-תחנה.",
            "דורש מיפוי-PSA לכל תחנה ו-integration layer.",
          ],
        },
        {
          id: "2.4.2",
          titleHe: "שילוב SAP EWM עם SAP ME ו-SAP Manufacturing",
          titleEn: "Integrating SAP EWM to SAP ME and SAP Manufacturing",
          execHe:
            "שילוב EWM עם SAP ME ו-SAP Manufacturing הוא חיבור שלוש-השכבות: PP (תכנון/הזמנה), SAP ME (ביצוע ברצפה) ו-EWM (חומר ומחסן), הקשורים דרך ה-integration layer ו-PMR. הוא מאפשר זרימת-חומר וביצוע מסונכרנים מקצה-לקצה, ובסביבות-ענן מתחבר ל-SAP Digital Manufacturing.",
          beginnerHe:
            "כדי שהכול יעבוד חלק, שלוש מערכות צריכות לדבר: PP יודע מה לייצר, SAP ME מנהל את הביצוע על הרצפה, ו-EWM מספק את החומר. השילוב מחבר את שלושתן כך שכל אחת יודעת מה השנייה עושה — ההזמנה, הביצוע והחומר נעים יחד בלי 'חורים' באמצע.",
          consultantHe:
            "הארכיטקטורה: PP ↔ EWM דרך PMR/Manufacturing Integration; SAP ME ↔ EWM דרך ה-ME integration layer (SAP MII) ל-ME-triggered staging; PP ↔ ME דרך production order/POD download ו-confirmation upload. ב-S/4HANA + ענן, SAP Digital Manufacturing מחליף/משלים את SAP ME, וה-integration עובר ל-cloud connectors. נדרש תיאום master data (Routing/PSA/Control Cycle) בין השכבות, וניטור queues/telegrams.",
          purposeHe:
            "ליצור שרשרת ייצור-מחסן מסונכרנת מקצה-לקצה — תכנון, ביצוע וחומר — עם נראות-בזמן-אמת, JIT-staging ואוטומציה.",
          processExampleHe:
            "PP יוצר ומוריד הזמנה ל-ME ➔ ME מבצע ומפעיל ME-triggered staging מ-EWM ➔ EWM מזין JIT ➔ ME מדווח confirmation ל-PP ➔ EWM קולט GR לתוצרת. הלולאה סגורה בין שלוש השכבות.",
          cbcHe:
            "ב-CBC: PP מתכנן הרצת-מילוי, SAP ME מנהל את הביצוע על קו-המילוי האוטומטי ומפעיל staging מ-EWM לכל תחנה, ובסיום מדווח ל-PP ו-EWM קולט את המשקה המוגמר — הכול מסונכרן בזמן-אמת.",
          navHe: [
            "SCM Extended Warehouse Management ► Manufacturing (PP) Integration ► SAP ME / SAP Manufacturing Integration",
            "Integration ► SAP MII / SAP Digital Manufacturing ► Connectors",
          ],
          tables: ["/SCWM/PMR_HEAD", "/SCWM/STAGING", "AFKO", "AFRU"],
          tcodes: ["/SCWM/PSASTAGE", "/SCWM/MON", "CO02", "SMQ1"],
          fiori: ["F2148", "F0273"],
          configHe: [
            "PP↔EWM: Manufacturing Integration + PMR/Control Cycle.",
            "ME↔EWM: ME integration layer (SAP MII) ל-ME-triggered staging.",
            "PP↔ME: production order/POD download ו-confirmation upload; בענן — SAP Digital Manufacturing connectors.",
          ],
          flow: [
            { he: "PP יוצר ומוריד הזמנה ל-ME", code: "CO02" },
            { he: "ME מבצע + מפעיל staging", code: "ME event" },
            { he: "EWM מזין JIT", code: "/SCWM/PSASTAGE" },
            { he: "ME מדווח confirmation ל-PP", code: "AFRU" },
            { he: "EWM קולט GR לתוצרת", code: "101" },
          ],
          masterDataHe: [
            "Routing/PSA/Control Cycle חייבים להיות מתואמים בין PP, ME ו-EWM.",
            "PMR (EWM) + Production Order (PP) + POD (ME) הם המסמכים המקשרים.",
          ],
          mistakesHe: [
            "חוסר-תאום master data בין השכבות ➔ staging/confirmation נכשלים.",
            "התעלמות מ-connectors בענן (Digital Manufacturing) ➔ שילוב שבור.",
            "אי-ניטור queues/telegrams ➔ כשלי-סנכרון לא-מזוהים.",
          ],
          troubleshootHe: [
            "הזמנה לא יורדת ל-ME ➔ PP↔ME connector/download לא מוגדר.",
            "staging לא מופעל ➔ ME↔EWM integration layer חסר.",
            "confirmation לא חוזר ל-PP ➔ upload/queue תקוע (SMQ1).",
          ],
          bestPracticeHe: [
            "תאם master data (Routing/PSA/Control Cycle) בין שלוש השכבות לפני go-live.",
            "נטר queues (SMQ1/SMQ2) ו-MFS telegrams באופן שוטף.",
            "בסביבת-ענן, אמת את ה-Digital Manufacturing connectors.",
          ],
          interviewHe: [
            { qHe: "אילו שלוש שכבות מחובר השילוב המלא?", aHe: "PP (תכנון/הזמנה), SAP ME (ביצוע ברצפה) ו-EWM (חומר/מחסן), הקשורים דרך PMR ו-integration layer." },
            { qHe: "מה משתנה בסביבת-ענן?", aHe: "SAP Digital Manufacturing מחליף/משלים את SAP ME, וה-integration עובר ל-cloud connectors במקום SAP MII המקומי." },
          ],
          takeawaysHe: [
            "השילוב מחבר שלוש שכבות: PP, SAP ME ו-EWM.",
            "PP↔EWM דרך PMR; ME↔EWM דרך integration layer; PP↔ME דרך order/confirmation.",
            "בענן — SAP Digital Manufacturing ו-cloud connectors.",
          ],
          relatedHe: [
            { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
            { labelHe: "EWM · ME-triggered staging (2.4.1)", href: "/library/wm/chapter-02/#sub-2.4.1" },
          ],
        },
      ],
    },
    // ============================================================ 2.5
    {
      id: "2.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה מיפה את שילוב EWM עם תכנון-הייצור PP על-פני שלושת זרמיו — Staging, Consumption ו-Goods Receipt — ושני מודליו: delivery-based (פשוט, מבוסס Outbound/Inbound Delivery) ו-advanced (עשיר, מבוסס Production Material Request ו-Production Supply Area). הוסיף את ניקוי-ה-PSA ואת ה-replenishment האוטומטי, וחתם בשילוב עם SAP ME ו-MFS ל-just-in-time ברמת-תחנה ולאוטומציה.",
      beginnerHe:
        "בקצרה: למדנו איך המחסן (EWM) והייצור (PP) עובדים יחד. המחסן מביא חומר לקו (Staging), הקו צורך אותו (Consumption), והמוצר המוגמר חוזר למחסן (Goods Receipt). יש דרך פשוטה (משלוחים רגילים) ודרך מתקדמת (חכמה, עם PSA ו-replenishment אוטומטי). ולבסוף ראינו איך SAP ME יכול להפעיל את כל זה בזמן-אמת מהרצפה.",
      consultantHe:
        "סיכום-יועץ: בחירת-המודל היא ההחלטה-הראשונה — delivery-based לפשטות, advanced (PMR + PSA + Control Cycle) לנפח/JIT. ה-PSA וה-Control Cycle הם נתוני-המפתח שקובעים staging type (pick/crate/release-order), min/max ל-replenishment, ויעד-bin. ניקוי-PSA שומר דיוק ועקיבות-batch. שילוב SAP ME/MFS מוסיף JIT ברמת-תחנה ואוטומציה, וב-S/4HANA/ענן עובר ל-Digital Manufacturing. ניטור queues הוא תנאי-קיום לאמינות.",
      purposeHe:
        "לעגן את ההבנה השלמה של שילוב-הייצור, לאפשר בחירת-מודל מושכלת, ולספק מפת-דרכים לקונפיגורציה, פתרון-תקלות ואינטגרציה עם MES ואוטומציה.",
      processExampleHe:
        "מקצה-לקצה: שחרור-הזמנה ➔ staging (delivery/PMR) ל-PSA ➔ consumption (261/backflush) ➔ ניקוי-PSA ו-replenishment ➔ GR (101) לתוצרת ➔ putaway. SAP ME מפעיל JIT, MFS מנתב אוטומציה.",
      cbcHe:
        "ב-CBC: מפעל-הבקבוק מזין קווי-מילוי בתרכיז/אריזה (advanced + ME-triggered), צורך לפי backflush, מנקה ומחדש PSA בין משמרות, וקולט משקאות מוגמרים ב-GR עם batch ו-FEFO — שרשרת מסונכרנת מהמחסן עד מדף-הסופר.",
      navHe: [
        "SCM Extended Warehouse Management ► Cross-Process Settings ► Manufacturing (PP) Integration",
        "SAP Easy Access ► Logistics ► SCM Extended Warehouse Management ► Work Scheduling",
      ],
      tables: ["/SCWM/PMR_HEAD", "/SCWM/STAGING", "PVBE", "AFKO", "AUFM"],
      tcodes: ["/SCWM/PSASTAGE", "/SCWM/REPL", "/SCWM/MON", "CO11N"],
      fiori: ["F2148", "F0273", "W0001"],
      configHe: [
        "החלטת-מודל: delivery-based מול advanced ברמת Warehouse Number.",
        "PSA + Control Cycle: staging type, min/max, יעד-bin.",
        "WPT נפרדים ל-staging/consumption/GR/replenishment/clear.",
        "SAP ME integration layer ו-MFS לאוטומציה.",
      ],
      flow: [
        { he: "שחרור-הזמנה", code: "CO02/COR2" },
        { he: "Staging ל-PSA", code: "/SCWM/PSASTAGE" },
        { he: "Consumption", code: "261" },
        { he: "ניקוי + replenishment", code: "/SCWM/REPL" },
        { he: "GR לתוצרת", code: "101" },
      ],
      mistakesHe: [
        "בחירת-מודל שגויה למורכבות הקו.",
        "PSA/Control Cycle לא-מוגדר או שגוי.",
        "אי-ניטור queues — כשלי-סנכרון נסתרים.",
      ],
      troubleshootHe: [
        "כשל-שרשרת ➔ אתר את הזרם (Staging/Consumption/GR) ובדוק את ה-WPT/PSA שלו.",
        "סנכרון-מלאי ➔ SMQ1/SMQ2 + CIF (decentralized).",
        "אוטומציה ➔ MFS telegrams/Communication Points.",
      ],
      bestPracticeHe: [
        "התאם את המודל למורכבות ולנפח.",
        "תחזק PSA/Control Cycle בקפדנות — הם לב-השילוב.",
        "נטר queues ו-telegrams שוטף; תאם master data בין PP/ME/EWM.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת זרמי שילוב-הייצור?", aHe: "Staging (הזנה), Consumption (צריכה) ו-Goods Receipt (קליטת-תוצרת)." },
        { qHe: "כיצד בוחרים בין delivery-based ל-advanced?", aHe: "delivery-based לתהליכים פשוטים בנפח בינוני; advanced (PMR/PSA) לנפח גבוה, JIT, pick/crate parts, ניקוי ו-replenishment." },
        { qHe: "מה תפקיד ה-PSA ו-Control Cycle?", aHe: "ה-PSA ממפה נקודת-צריכה ל-bin; ה-Control Cycle קובע staging type, min/max ל-replenishment ויעד — לב הקונפיגורציה של advanced." },
      ],
      takeawaysHe: [
        "שילוב-הייצור = Staging → Consumption → Goods Receipt, בשני מודלים.",
        "advanced נשען על PMR + PSA + Control Cycle, עם ניקוי ו-replenishment.",
        "SAP ME/MFS מוסיפים JIT ברמת-תחנה ואוטומציה; בענן — Digital Manufacturing.",
        "ניטור queues ותיאום master data הם תנאי לאמינות-השילוב.",
      ],
      relatedHe: [
        { labelHe: "PP · שילוב ייצור (Chapter 6)", href: "/library/pp/chapter-06/" },
        { labelHe: "EWM · שילוב מבוסס-אספקה (2.2)", href: "/library/wm/chapter-02/#sub-2.2" },
        { labelHe: "EWM · שילוב מתקדם (2.3)", href: "/library/wm/chapter-02/#sub-2.3" },
      ],
    },
  ],
};
