// ===== EWM Digital Textbook — Chapter 4 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order, nested); SAP identifiers verbatim EN.
// CBC = Coca-Cola bottling: outbound beverage shipping to retailers via TM.
import type { TextbookChapter } from "./types";

export const CH4: TextbookChapter = {
  n: 4,
  titleHe: "שילוב עם ניהול תחבורה (TM)",
  titleEn: "Transportation Management Integration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה על שילוב SAP EWM עם ניהול-תחבורה (Transportation Management, TM). הפרק עוקב אחר התפתחות שלושת מודלי-השילוב: ה-Shipment הקלאסי של ERP, שילוב Freight Order מול TM, וה-Advanced Shipping & Receiving (ASR) המודרני המבוסס על Transportation Unit (TU) משותף. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את שילוב EWM↔TM ללא הספר המקורי. כל זרימת-תהליך מודגמת על מקרה CBC: מפעל-בקבוק המשנע משקאות מוגמרים מהמחסן אל קמעונאים דרך תכנון-תחבורה ב-TM.",
  subchapters: [
    // ============================================================ 4.1
    {
      id: "4.1",
      titleHe: "סקירת מערכות ניהול תחבורה",
      titleEn: "Overview of Transportation Management Systems",
      execHe:
        "ניהול-תחבורה (Transportation Management, TM) הוא המודול המתכנן, מבצע ומסדיר את הובלת-הסחורה — בחירת מוביל, איחוד משלוחים ל-Freight Order, אופטימיזציית-מסלול וחישוב עלות-הובלה. EWM אחראי על מה שקורה בתוך המחסן (Picking, Packing, Staging), ו-TM אחראי על מה שקורה מחוץ לו (התכנון והביצוע של ההובלה). השילוב ביניהם הוא מה שהופך משלוח שתוכנן ב-TM לפעילות-מחסן ב-EWM ולהיפך.",
      beginnerHe:
        "תחשוב על שני עובדים: אחד אחראי על המחסן (EWM) — הוא יודע איפה כל פריט, אורז אותו ומכין אותו ליד הרציף. השני אחראי על המשאיות (TM) — הוא מחליט איזו משאית באה, מתי, אילו הזמנות נכנסות אליה ובאיזה מסלול. כדי שהסחורה תצא נכון, שניהם חייבים לדבר. TM אומר \"תכין לי את ההזמנות האלה למשאית שמגיעה ב-08:00\", ו-EWM מבצע את ההכנה במחסן.",
      consultantHe:
        "ב-S/4HANA קיים embedded TM — TM רץ באותו מערכת כמו EWM ו-SD, כך שאין צורך ב-PI/IDoc בין מערכות; השילוב הוא דרך טבלאות-קישור וקריאות-API פנימיות. ארכיטקטונית, TM עובד על Freight Unit (FU) — יחידת-התכנון, ועל Freight Order (FO) — מסמך-ההובלה למוביל. EWM עובד על Outbound/Inbound Delivery ועל Warehouse Task. נקודת-החיבור היא ה-Transportation Unit (TU) ב-ASR, או הקישור Delivery↔Freight Order במודל ה-Freight Order, או ה-Shipment הקלאסי. בחירת המודל תלויה בגרסה, ב-Decentralized מול embedded, ובמורכבות התכנון.",
      purposeHe:
        "המטרה: להפריד אחריות בין תכנון-הובלה (TM) לביצוע-מחסן (EWM), תוך שמירה על סנכרון מלא של כמויות, תאריכים, רציפים ומובילים. ההפרדה מאפשרת אופטימיזציית-הובלה (איחוד עומסים, בחירת מוביל זול) בלי לפגוע בדיוק תהליכי-המחסן.",
      processExampleHe:
        "הזמנת-לקוח נוצרת ב-SD ➔ נוצר Outbound Delivery ב-EWM ➔ TM קולט את הדרישה כ-Freight Unit ➔ מתכנן מאחד מספר FU ל-Freight Order עם מוביל ומסלול ➔ TM מבקש מ-EWM להכין את הסחורה ➔ EWM מבצע Picking/Packing/Staging ➔ הסחורה נטענת, ה-FO מבוצע, וה-Goods Issue מדווח.",
      cbcHe:
        "ב-CBC המחסן מחזיק משטחי משקאות מוגמרים. TM מתכנן את חלוקת-המשקאות לרשתות-הקמעונאות: מאחד הזמנות של כמה סניפים לאותה משאית-חלוקה, בוחר מוביל לפי אזור, וקובע חלון-זמן לרציף. EWM מקבל את הבקשה ומכין את המשטחים ליד הרציף בדיוק לפי סדר-הפריקה בנקודות-החלוקה.",
      navHe: [
        "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► Logistics Integration ► Activate Embedded TM",
        "SAP Customizing Implementation Guide ► Transportation Management ► Basic Functions ► General Settings",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management",
      ],
      tables: ["/SCMTMS/D_TORROT", "/SCWM/TUNIT", "LIKP", "VTTK"],
      tcodes: ["/SCWM/MON", "/SCMTMS/TOR", "VT01N", "/SCWM/PRDO"],
      fiori: ["F0868", "F2090", "F1701"],
      configHe: [
        "Activate Embedded TM: הפעלת TM באותו מערכת S/4HANA כדי לבטל צורך באינטגרציית-PI חיצונית.",
        "בחירת מודל-שילוב: Shipment (קלאסי), Freight Order Integration, או Advanced Shipping & Receiving (ASR) — לפי גרסה ומורכבות.",
        "הגדרת Control Keys בין EWM ל-TM הקובעים אילו מסמכים מסונכרנים ומתי.",
      ],
      flow: [
        { he: "דרישת-הובלה (Delivery)", code: "LIKP" },
        { he: "תכנון ב-TM", code: "Freight Unit/Order" },
        { he: "ביצוע-מחסן ב-EWM", code: "/SCWM/MON", note: "Pick/Pack/Stage" },
        { he: "טעינה וביצוע-הובלה", code: "Freight Order" },
        { he: "Goods Issue", code: "PGI" },
      ],
      masterDataHe: [
        "Business Partner = מוביל (Carrier) ולקוח (Ship-to); נדרש לתכנון ב-TM ולקביעת-מסלול.",
        "Means of Transport + Transportation Lane = רשת-המסלולים ב-TM.",
        "Warehouse + Staging Area/Door (EWM) = נקודות-החיבור הפיזיות לרציף.",
      ],
      mistakesHe: [
        "ערבוב מושגים: \"Shipment\" (ERP) מול \"Freight Order\" (TM) — אלה מודלים שונים, לא שמות-נרדפים.",
        "הנחה ש-embedded TM אינו דורש קונפיגורציה — נדרשת הפעלה והגדרת-שילוב מפורשת.",
        "תכנון ב-TM ללא תיאום עם קיבולת-המחסן ב-EWM ➔ עומסי-רציף שאי-אפשר לבצע.",
      ],
      troubleshootHe: [
        "דרישה לא מגיעה ל-TM ➔ embedded TM לא הופעל או Logistics Integration לא הוגדר.",
        "המחסן לא מקבל בקשת-הכנה מ-TM ➔ מודל-השילוב (ASR/FO) לא מוגדר נכון בין הרכיבים.",
        "אי-התאמת כמויות בין Delivery ל-Freight Order ➔ סנכרון Delivery↔TM נכשל.",
      ],
      bestPracticeHe: [
        "בחר מודל-שילוב אחד (העדף ASR בגרסאות חדשות) והימנע מערבוב מודלים באותו תהליך.",
        "ב-S/4HANA העדף embedded TM לפני TM מבוזר — פחות תקורת-אינטגרציה.",
        "מפה במפורש את נקודות-החיבור (TU/FO/Shipment) לפני המימוש.",
      ],
      interviewHe: [
        { qHe: "מה ההפרדה התפקודית בין EWM ל-TM?", aHe: "EWM מנהל את הפעילות בתוך המחסן (Picking/Packing/Staging); TM מתכנן ומבצע את ההובלה מחוץ למחסן (מוביל, מסלול, איחוד-עומס, עלות-הובלה)." },
        { qHe: "מהו embedded TM?", aHe: "TM הרץ באותה מערכת S/4HANA כמו EWM ו-SD, מבטל את הצורך באינטגרציית-מערכות חיצונית (PI/IDoc) ומאפשר קריאות-API פנימיות." },
        { qHe: "אילו שלושה מודלי-שילוב קיימים בין EWM ל-TM?", aHe: "Shipment קלאסי (ERP), Freight Order Integration, ו-Advanced Shipping & Receiving (ASR) המבוסס Transportation Unit." },
      ],
      takeawaysHe: [
        "EWM = בתוך המחסן; TM = מחוץ למחסן; השילוב מסנכרן ביניהם.",
        "embedded TM ב-S/4HANA מבטל את תקורת-האינטגרציה החיצונית.",
        "שלושה מודלים: Shipment, Freight Order, ASR — בחר אחד.",
      ],
      relatedHe: [
        { labelHe: "EWM · משלוח יוצא (Outbound)", href: "/library/wm/chapter-03/" },
        { labelHe: "EWM · Advanced Shipping & Receiving (4.4)", href: "/library/wm/chapter-04/#sub-4.4" },
      ],
    },
    // ============================================================ 4.2
    {
      id: "4.2",
      titleHe: "משלוח וקליטה בתהליכי קליטה-נכנסת והפצה-יוצאת",
      titleEn: "Shipping and Receiving in Inbound and Outbound Processes",
      execHe:
        "תהליכי המשלוח (Shipping, ביציאה) והקליטה (Receiving, בכניסה) הם הגשר הפיזי בין המחסן לתחבורה. בכניסה: רכב מגיע, נרשם בשער, נפרק, והסחורה נקלטת למלאי. ביציאה: סחורה נאספת, נארזת, מועברת לרציף-טעינה, נטענת ומדווחת כ-Goods Issue. בכל קצה, מסמך-ההובלה (Shipment/Freight Order/TU) מתאם בין הרכב לבין פעילות-המחסן.",
      beginnerHe:
        "כל מחסן הוא דו-כיווני: דברים נכנסים ודברים יוצאים. כשמשהו נכנס — מקבלים אותו, בודקים ומאחסנים (Receiving). כשמשהו יוצא — מוציאים אותו מהמדף, אורזים ושולחים (Shipping). שני התהליכים האלה צריכים לדעת איזה רכב מגיע או יוצא, ומתי — וכאן נכנסת התחבורה.",
      consultantHe:
        "ב-EWM, ה-Inbound Process מתחיל מ-Inbound Delivery (Notification) ומסתיים ב-Goods Receipt; ה-Outbound Process מתחיל מ-Outbound Delivery Order ומסתיים ב-Goods Issue. בשני הקצוות ה-Door, ה-Staging Area וה-Yard Management מארגנים את הרציפים והחצר. נקודת-החיבור לתחבורה היא הרגע שבו רכב/TU מקושר ל-Delivery — בין דרך Shipment, FO או ASR. ה-Activity Areas וה-Storage Process קובעים את רצף ה-Warehouse Tasks בכל כיוון.",
      purposeHe:
        "המטרה: לחבר את הזרימה הפיזית של רכבים ושל מטענים אל זרימת-המסמכים, כך שכל פריקה/טעינה תקושר למסמך-הובלה ולתאריך-מתוכנן, ויאפשרו דיווח-סטטוס מדויק לאורך כל המסע.",
      processExampleHe:
        "Outbound: הזמנה ➔ Outbound Delivery Order ➔ Picking ל-Staging Area ➔ הקצאת Door ➔ הגעת-רכב ➔ Loading ➔ Goods Issue. Inbound: הודעת-משלוח ➔ Inbound Delivery ➔ הגעת-רכב לרציף ➔ Unloading ➔ Goods Receipt ➔ Putaway למלאי.",
      cbcHe:
        "ב-CBC הצד היוצא דומיננטי: עשרות משאיות-חלוקה ביום מקבלות משטחי-משקאות. הצד הנכנס מטפל בקליטת-חומרי-גלם (תרכיז, אריזות) וברכבי-החזרה של מארזים ריקים (Empties). כל רכב מקושר ל-TU/FO כדי לתאם רציף וחלון-זמן.",
      navHe: [
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving",
      ],
      tables: ["/SCWM/ORDIM_O", "/SCWM/ORDIM_C", "/SCDL/DB_PROCH_O", "/SCWM/DOOR"],
      tcodes: ["/SCWM/PRDI", "/SCWM/PRDO", "/SCWM/MON", "/SCWM/TODLV_TO"],
      fiori: ["F2090", "F2091", "F0868"],
      configHe: [
        "Door & Staging Area Determination: קביעת רציף ואזור-המתנה לפי Route/Carrier/Direction.",
        "Warehouse Process Type: קובע את רצף ה-Warehouse Tasks ל-Inbound ול-Outbound בנפרד.",
        "Shipping & Receiving activity: הגדרת פעילויות הטעינה/פריקה וקישורן למסמך-הובלה.",
      ],
      flow: [
        { he: "מסמך-Delivery", code: "PRDI/PRDO", note: "נכנס/יוצא" },
        { he: "קביעת Door + Staging", code: "/SCWM/DOOR" },
        { he: "Warehouse Tasks", code: "Pick/Putaway" },
        { he: "Loading/Unloading", code: "TU" },
        { he: "GR / GI", code: "PGR/PGI" },
      ],
      masterDataHe: [
        "Door, Staging Area, Activity Area = נתוני-אב פיזיים של המחסן הקובעים את נקודות-החיבור לרכב.",
        "Route + Carrier = קובעים את קביעת-הרציף האוטומטית.",
      ],
      mistakesHe: [
        "ערבוב הגדרות Inbound ו-Outbound באותו Warehouse Process Type.",
        "אי-הגדרת Door Determination ➔ הקצאת-רציף ידנית וצווארי-בקבוק.",
        "דיווח Goods Issue לפני סיום Loading ➔ אי-התאמת מלאי לרכב.",
      ],
      troubleshootHe: [
        "Warehouse Task לא נוצר ל-Delivery ➔ Warehouse Process Type שגוי או חסר.",
        "רכב לא מקושר ל-Delivery ➔ Shipment/FO/TU לא הוקצה בקליטה/יציאה.",
        "Goods Issue נכשל ➔ Picking לא הושלם או הסחורה לא ב-Staging Area.",
      ],
      bestPracticeHe: [
        "הגדר Door Determination אוטומטי לפי Route כדי לאזן עומסי-רציף.",
        "הפרד Warehouse Process Types ברורים לכל כיוון ולכל סוג-תנועה.",
        "דווח GI רק אחרי אישור-טעינה מלא של ה-TU/FO.",
      ],
      interviewHe: [
        { qHe: "מהם שני הקצוות של תהליך-המחסן?", aHe: "Inbound (קליטה: Inbound Delivery → Goods Receipt → Putaway) ו-Outbound (יציאה: Outbound Delivery Order → Picking → Loading → Goods Issue)." },
        { qHe: "מה תפקיד ה-Door וה-Staging Area?", aHe: "ה-Door הוא רציף-הטעינה/פריקה הפיזי, וה-Staging Area הוא אזור-ההמתנה שבו ממתינה הסחורה לפני טעינה או אחרי פריקה — שניהם נקודות-החיבור לרכב." },
        { qHe: "מתי מדווחים Goods Issue?", aHe: "רק לאחר השלמת ה-Loading של ה-TU/FO, כדי לשמור על התאמת-מלאי בין המחסן לרכב." },
      ],
      takeawaysHe: [
        "המחסן דו-כיווני: Receiving נכנס, Shipping יוצא.",
        "Door + Staging Area = נקודות-החיבור הפיזיות לתחבורה.",
        "כל פריקה/טעינה מקושרת למסמך-הובלה ולתאריך-מתוכנן.",
      ],
      relatedHe: [
        { labelHe: "EWM · משלוח יוצא (Outbound)", href: "/library/wm/chapter-03/" },
        { labelHe: "EWM · ניהול חצר (Yard Management)", href: "/library/wm/chapter-05/" },
      ],
    },
    // ============================================================ 4.3
    {
      id: "4.3",
      titleHe: "שילוב Freight Order",
      titleEn: "Freight Order Integration",
      execHe:
        "שילוב Freight Order הוא המודל שבו TM מתכנן Freight Order (FO) — מסמך-ההובלה למוביל — וה-FO מתקשר ישירות ל-Delivery של EWM. בניגוד ל-Shipment הקלאסי של ERP, ה-FO הוא אובייקט TM מלא הנושא מוביל, מסלול, תמחור-הובלה ושלבי-ביצוע. השילוב מבטיח שכל Delivery במחסן מקושר ל-FO המתאים, וכל סטטוס-ביצוע (טעינה, יציאה) מסונכרן בין השניים.",
      beginnerHe:
        "Freight Order הוא \"תעודת-המשאית\" של TM: היא אומרת איזה מוביל נוסע, באיזה מסלול, ואילו הזמנות נמצאות עליו. במודל הזה, ה\"תעודה\" הזו מחוברת ישירות לרשימות-ההכנה של המחסן, כך שהמחסן יודע בדיוק איזו סחורה להכין לכל משאית.",
      consultantHe:
        "ה-FO נוצר ב-TM מתוך Freight Units (FU) שאוחדו בתכנון. הקישור ל-EWM הוא דרך ה-Delivery: ה-Outbound Delivery מקושר ל-FO, ושינויי-סטטוס זורמים דו-כיוונית. ב-embedded TM הקישור הוא טבלאי/API פנימי; ב-decentralized הוא דרך הודעות. ה-FO נושא Stages (שלבי-מסע), Capacity Documents ו-Execution Status. שים לב: מודל זה קודם ל-ASR ואינו משתמש ב-Transportation Unit כאובייקט-ביצוע משותף — הקישור הוא Delivery↔FO ולא TU.",
      purposeHe:
        "המטרה: לחבר את תכנון-ההובלה המתקדם של TM (איחוד, תמחור, מסלול) ישירות לביצוע-המחסן, בלי המגבלות של ה-Shipment הקלאסי, תוך שמירת מסמך-מוביל אחד אחראי לכל מסע.",
      processExampleHe:
        "Deliveries זורמות ל-TM כ-Freight Units ➔ מתכנן מאחד ל-Freight Order עם מוביל ומסלול ➔ ה-FO מקושר ל-Deliveries ב-EWM ➔ EWM מבצע Picking/Packing ➔ הטעינה מדווחת ➔ סטטוס-הביצוע ב-FO מתעדכן ➔ Goods Issue.",
      cbcHe:
        "ב-CBC כל משאית-חלוקה יומית מיוצגת כ-Freight Order: מוביל אזורי, מסלול דרך מספר סניפי-רשת, ועליו ה-Deliveries של אותם סניפים. המחסן מכין את המשטחים לפי ה-FO; סטטוס-הטעינה מסונכרן ל-TM לצורך מעקב-חלוקה.",
      navHe: [
        "SAP Customizing Implementation Guide ► Transportation Management ► Freight Order Management ► Freight Order ► Define Freight Order Types",
        "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► ERP Logistics Integration ► Delivery-Based Transportation Requirement",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management ► Map Freight Order to Delivery",
      ],
      tables: ["/SCMTMS/D_TORROT", "/SCMTMS/D_TORITM", "LIKP", "/SCWM/ORDIM_O"],
      tcodes: ["/SCMTMS/TOR", "/SCWM/PRDO", "/SCWM/MON", "/SCMTMS/FU"],
      fiori: ["F0868", "F0866", "F2090"],
      configHe: [
        "Freight Order Type: קובע מספור, Stages מותרים, תמחור-הובלה ושיטת-ביצוע.",
        "Delivery-Based Transportation Requirement: הגדרת זרימת ה-Delivery כ-Freight Unit ל-TM.",
        "Mapping FO↔Delivery: קישור ה-Freight Order ל-Outbound Delivery של EWM וסנכרון-הסטטוס.",
      ],
      flow: [
        { he: "Delivery → Freight Unit", code: "/SCMTMS/FU" },
        { he: "תכנון ל-Freight Order", code: "/SCMTMS/TOR" },
        { he: "קישור FO ↔ Delivery", code: "EWM" },
        { he: "ביצוע-מחסן", code: "/SCWM/MON" },
        { he: "סנכרון-סטטוס + GI", code: "PGI" },
      ],
      masterDataHe: [
        "Carrier (Business Partner) = המוביל הנושא את ה-Freight Order.",
        "Transportation Lane + Means of Transport = בסיס לתכנון ה-FO.",
      ],
      mistakesHe: [
        "ערבוב מודל Freight Order עם ASR (TU) באותו תהליך ➔ קישור-כפול ובלבול-סטטוס.",
        "Freight Order Type ללא Stages תקין ➔ אי-אפשר לתכנן מסלול.",
        "אי-הגדרת mapping FO↔Delivery ➔ המחסן לא יודע אילו Deliveries שייכות ל-FO.",
      ],
      troubleshootHe: [
        "Delivery לא מופיע ב-FO ➔ Delivery-Based Transportation Requirement לא הופעל.",
        "סטטוס-טעינה לא חוזר ל-TM ➔ סנכרון-סטטוס FO↔EWM לא מוגדר.",
        "FO לא נוצר ➔ אין Freight Units או Freight Order Type חסר.",
      ],
      bestPracticeHe: [
        "השתמש ב-Freight Order Type ייעודי לכל סוג-הובלה (חלוקה/אספקה/החזרות).",
        "אם אתה בגרסה התומכת — שקול מעבר ל-ASR שמאחד את ה-TU כאובייקט-ביצוע.",
        "ודא סנכרון-סטטוס דו-כיווני לפני go-live.",
      ],
      interviewHe: [
        { qHe: "מהו Freight Order ובמה הוא נבדל מ-Shipment?", aHe: "FO הוא מסמך-ההובלה של TM הנושא מוביל, מסלול, תמחור ושלבי-מסע; Shipment הוא מסמך-ההובלה הקלאסי של ERP, פשוט יותר וללא יכולות-התכנון של TM." },
        { qHe: "כיצד FO מתחבר ל-EWM במודל זה?", aHe: "דרך קישור Delivery↔Freight Order; ה-Outbound Delivery מקושר ל-FO וסטטוסי-הביצוע מסונכרנים — לא דרך Transportation Unit." },
        { qHe: "מהו Freight Unit?", aHe: "יחידת-התכנון הבסיסית של TM הנגזרת מ-Delivery; FUs מאוחדים ל-Freight Order בתהליך-התכנון." },
      ],
      takeawaysHe: [
        "Freight Order = מסמך-המוביל של TM, עשיר מ-Shipment.",
        "הקישור ל-EWM הוא Delivery↔FO (לא TU).",
        "מודל זה קודם ל-ASR; ASR מאחד את ה-TU כאובייקט משותף.",
      ],
      relatedHe: [
        { labelHe: "EWM · Advanced Shipping & Receiving (4.4)", href: "/library/wm/chapter-04/#sub-4.4" },
        { labelHe: "EWM · שילוב Shipment (4.5)", href: "/library/wm/chapter-04/#sub-4.5" },
      ],
      children: [
        {
          id: "4.3.1",
          titleHe: "תהליך קליטה-נכנסת",
          titleEn: "Inbound Process",
          execHe:
            "בתהליך הקליטה-הנכנסת תחת שילוב Freight Order, ה-FO מתכנן את הגעת-הרכב למחסן עם המטען. ה-Inbound Delivery של EWM מקושר ל-FO, וכך המחסן יודע מראש מה מגיע, מתי ובאיזה רכב, ומתאם רציף ופריקה בהתאם.",
          beginnerHe:
            "כאן הסחורה נכנסת. ה-Freight Order אומר \"משאית עם תרכיז מגיעה ב-10:00\". המחסן רואה את ה-FO, מכין רציף פנוי, וכשהמשאית מגיעה — פורק, בודק ומאחסן.",
          consultantHe:
            "ה-FO ב-TM מקושר ל-Inbound Delivery ב-EWM דרך mapping. בהגעת-הרכב מבוצע Check-In, ה-Door מוקצה, ה-Unloading מתבצע כ-Warehouse Tasks, וה-Goods Receipt מדווח. סטטוס-הביצוע (Arrived/Unloaded/Completed) מסונכרן בחזרה ל-FO. ה-Putaway נגזר מ-Warehouse Process Type של ה-Inbound Delivery.",
          purposeHe:
            "לתאם מראש את הגעת-המטען הנכנס עם קיבולת-המחסן, ולספק ל-TM נראות על סטטוס-הפריקה והקליטה בזמן-אמת.",
          processExampleHe:
            "FO נכנס מתוכנן ➔ קישור ל-Inbound Delivery ➔ הגעת-רכב + Check-In ➔ הקצאת Door ➔ Unloading (Warehouse Tasks) ➔ Goods Receipt ➔ Putaway ➔ סטטוס מסונכרן ל-FO.",
          cbcHe:
            "ב-CBC משאית-תרכיז של ספק מגיעה תחת FO נכנס; המחסן מכין רציף-קליטה ייעודי לחומרי-גלם, פורק, מבצע GR ומאחסן בקירור. החזרת-מארזים-ריקים (Empties) מטופלת באותו מודל.",
          navHe: [
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery ► Define Document Types",
            "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► ERP Logistics Integration ► Inbound Delivery",
          ],
          tables: ["/SCWM/ORDIM_I", "/SCDL/DB_PROCH_I", "/SCMTMS/D_TORROT"],
          tcodes: ["/SCWM/PRDI", "/SCWM/MON", "/SCWM/TODLV_TO"],
          fiori: ["F2091", "F0868"],
          configHe: [
            "Inbound Delivery Document Type מקושר ל-Freight Order Type המתאים.",
            "Warehouse Process Type ל-Putaway של המטען הנכנס.",
            "סנכרון-סטטוס Unloading/GR בחזרה ל-FO.",
          ],
          flow: [
            { he: "FO נכנס", code: "/SCMTMS/TOR" },
            { he: "Inbound Delivery", code: "/SCWM/PRDI" },
            { he: "Check-In + Door", code: "Yard" },
            { he: "Unloading + GR", code: "PGR" },
            { he: "Putaway", code: "WT" },
          ],
          masterDataHe: [
            "Supplier/Carrier (Business Partner) = מקור-המטען הנכנס.",
            "Inbound Staging Area + Door = נקודת-הפריקה.",
          ],
          mistakesHe: [
            "Inbound Delivery לא מקושר ל-FO ➔ אין נראות-הגעה במחסן.",
            "Warehouse Process Type ל-Putaway שגוי ➔ אחסון שגוי.",
          ],
          troubleshootHe: [
            "GR לא מתאפשר ➔ Unloading Warehouse Tasks לא הושלמו.",
            "סטטוס לא חוזר ל-FO ➔ mapping סנכרון נכנס לא מוגדר.",
          ],
          bestPracticeHe: [
            "הקצה רציפי-קליטה ייעודיים לסוגי-מטען (גלם/החזרות).",
            "סנכרן סטטוס-פריקה ל-TM כדי לשחרר את הרכב מהר.",
          ],
          interviewHe: [
            { qHe: "כיצד FO נכנס מתחבר לקליטה ב-EWM?", aHe: "דרך קישור ל-Inbound Delivery; בהגעה מבוצעים Check-In, Unloading, GR ו-Putaway, וסטטוסי-הביצוע מסונכרנים בחזרה ל-FO." },
            { qHe: "מה גוזר את ה-Putaway?", aHe: "ה-Warehouse Process Type של ה-Inbound Delivery קובע את רצף ה-Warehouse Tasks לאחסון." },
          ],
          takeawaysHe: [
            "FO נכנס מתאם הגעת-מטען עם קיבולת-המחסן.",
            "Inbound Delivery↔FO נותן נראות-הגעה ב-EWM.",
            "סטטוס Unloading/GR מסונכרן ל-TM.",
          ],
        },
        {
          id: "4.3.2",
          titleHe: "תהליך הפצה-יוצאת",
          titleEn: "Outbound Process",
          execHe:
            "בתהליך ההפצה-היוצאת תחת שילוב Freight Order, ה-FO מאחד Deliveries יוצאות ומתכנן את משאית-המשלוח. ה-Outbound Delivery של EWM מקושר ל-FO; המחסן מבצע Picking/Packing/Staging, הסחורה נטענת, וסטטוס-הביצוע חוזר ל-FO עד ל-Goods Issue.",
          beginnerHe:
            "כאן הסחורה יוצאת. ה-Freight Order אומר \"משאית יוצאת ל-3 סניפים, עם ההזמנות האלה\". המחסן מכין את כל ההזמנות ליד הרציף, טוען לפי סדר-הפריקה, וכשהמשאית יוצאת — מדווח GI.",
          consultantHe:
            "ה-FO מאחד Freight Units (מ-Deliveries) ב-TM. ה-Outbound Delivery Order ב-EWM מקושר ל-FO; Picking ל-Staging Area, Packing ל-Handling Units, הקצאת Door, ו-Loading. סטטוס-הטעינה מסונכרן ל-FO, וה-Goods Issue מדווח עם השלמתו. סדר-הטעינה לרוב הפוך לסדר-הפריקה (Last-In-First-Out לפי נקודות-החלוקה).",
          purposeHe:
            "לאחד הזמנות לעומס-משאית יעיל תחת מסמך-מוביל אחד, ולסנכרן את ביצוע-המחסן עם תכנון-ההובלה עד לדיווח-היציאה.",
          processExampleHe:
            "Deliveries → Freight Units → Freight Order (מוביל+מסלול) ➔ קישור ל-Outbound Delivery Orders ➔ Picking/Packing/Staging ➔ הקצאת Door ➔ Loading לפי סדר-פריקה ➔ סטטוס ל-FO ➔ Goods Issue.",
          cbcHe:
            "ב-CBC משאית-חלוקה יומית = FO המאחד הזמנות של מספר סניפי-רשת; המחסן טוען את המשטחים בסדר הפוך לרצף-הפריקה בנקודות-החלוקה, ומסנכרן את סטטוס-הטעינה ל-TM למעקב-חלוקה בזמן-אמת.",
          navHe: [
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery ► Define Document Types",
            "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► ERP Logistics Integration ► Outbound Delivery",
          ],
          tables: ["/SCWM/ORDIM_O", "/SCDL/DB_PROCH_O", "/SCMTMS/D_TORROT"],
          tcodes: ["/SCWM/PRDO", "/SCWM/MON", "/SCWM/TODLV_TO"],
          fiori: ["F2090", "F0868"],
          configHe: [
            "Outbound Delivery Order Document Type מקושר ל-Freight Order Type.",
            "Warehouse Process Type ל-Picking + Staging.",
            "סנכרון-סטטוס Loading/GI בחזרה ל-FO.",
          ],
          flow: [
            { he: "Deliveries → FUs", code: "/SCMTMS/FU" },
            { he: "Freight Order", code: "/SCMTMS/TOR" },
            { he: "Picking/Packing", code: "/SCWM/MON" },
            { he: "Staging + Loading", code: "Door" },
            { he: "סטטוס ל-FO + GI", code: "PGI" },
          ],
          masterDataHe: [
            "Carrier (Business Partner) + Route = בסיס לאיחוד ה-FO.",
            "Outbound Staging Area + Door = נקודת-הטעינה.",
          ],
          mistakesHe: [
            "Outbound Delivery לא מקושר ל-FO ➔ המחסן לא יודע אילו הזמנות לאחד למשאית.",
            "טעינה בסדר שגוי ➔ פריקה לא-יעילה בנקודות-החלוקה.",
            "GI לפני סיום Loading ➔ אי-התאמת מלאי.",
          ],
          troubleshootHe: [
            "FO לא מאחד Deliveries ➔ Freight Units לא נוצרו או mapping חסר.",
            "סטטוס-טעינה לא חוזר ל-TM ➔ סנכרון יוצא לא מוגדר.",
            "GI נכשל ➔ Picking/Staging לא הושלם.",
          ],
          bestPracticeHe: [
            "תכנן סדר-טעינה לפי רצף-החלוקה ההפוך.",
            "אחד הזמנות לעומס-משאית מלא לחיסכון בעלות-הובלה.",
            "דווח GI רק אחרי אישור-טעינה מלא.",
          ],
          interviewHe: [
            { qHe: "כיצד FO יוצא מתחבר ל-EWM?", aHe: "דרך קישור Outbound Delivery Order↔FO; המחסן מבצע Picking/Packing/Staging/Loading וסטטוסי-הביצוע מסונכרנים ל-FO עד ל-GI." },
            { qHe: "מדוע סדר-הטעינה הפוך לסדר-הפריקה?", aHe: "כדי שהסחורה לנקודת-הפריקה הראשונה תהיה אחרונה שנטענה ולכן זמינה ראשונה (Last-In-First-Out לפי המסלול)." },
          ],
          takeawaysHe: [
            "FO יוצא מאחד Deliveries לעומס-משאית.",
            "הקישור הוא Outbound Delivery Order↔FO.",
            "סדר-הטעינה הפוך לרצף-החלוקה; GI אחרי Loading.",
          ],
        },
      ],
    },
    // ============================================================ 4.4
    {
      id: "4.4",
      titleHe: "Advanced Shipping & Receiving (ASR)",
      titleEn: "Advanced Shipping and Receiving",
      execHe:
        "Advanced Shipping & Receiving (ASR) הוא מודל-השילוב המודרני שבו EWM ו-TM חולקים אובייקט-ביצוע אחד: ה-Transportation Unit (TU). ה-TU מייצג את יחידת-ההובלה הפיזית (משאית/קרון/קונטיינר), והוא משותף לשני המודולים — TM מתכנן עליו את ההובלה, EWM מבצע עליו טעינה/פריקה. ASR מבטל את הצורך בקישורי-Delivery כפולים ומספק תהליך אחיד, מסונכרן ומדויק יותר מ-Freight Order או Shipment.",
      beginnerHe:
        "ASR הוא הדור החדש. במקום ש-TM וה-EWM יחזיקו כל אחד \"תעודה\" משלו ויתאמו ביניהם, יש להם עכשיו \"תעודה\" אחת משותפת — ה-Transportation Unit. זו בעצם המשאית עצמה במערכת. TM אומר מה נכנס למשאית ולאן היא נוסעת; EWM טוען/פורק אותה. שניהם מסתכלים על אותו אובייקט.",
      consultantHe:
        "ב-ASR ה-Transportation Unit (TU) הוא אובייקט משותף הנוצר מ-Freight Order ב-TM ומשמש כ-Vehicle ב-EWM. ה-TU נושא Loading/Unloading status, Door assignment ו-Handling Units. הקישור הוא TU↔Freight Order↔Delivery. ASR זמין ב-embedded TM (S/4HANA) ומחייב הפעלת Logistics Integration ספציפית. ה-TU מאפשר תהליכי Loading/Unloading ב-EWM שמדווחים אוטומטית כסטטוס-ביצוע ב-TM, ומתאם Door/Yard. זהו ה-best practice לתהליכי-תחבורה חדשים.",
      purposeHe:
        "המטרה: אובייקט-ביצוע יחיד (TU) המשותף ל-EWM ול-TM, המבטל סנכרון-כפול, מפשט את הקישור ומספק נראות-בזמן-אמת אחידה על טעינה, פריקה וסטטוס-הובלה.",
      processExampleHe:
        "FO נוצר ב-TM ➔ ה-TU נגזר ומשותף ל-EWM ➔ EWM מקצה Door ל-TU ➔ Picking/Staging ➔ Loading של ה-TU (Handling Units) ➔ סטטוס-הטעינה מתעדכן אוטומטית ב-TM ➔ Departure ➔ Goods Issue.",
      cbcHe:
        "ב-CBC כל משאית-חלוקה מיוצגת כ-Transportation Unit אחד המשותף ל-TM ול-EWM. TM מתכנן את עומס-המשאית ומסלולה; EWM טוען את המשטחים אל ה-TU; ברגע סיום-הטעינה הסטטוס מתעדכן מיידית ב-TM, ומנהל-החלוקה רואה את המשאית מוכנה ליציאה בזמן-אמת.",
      navHe: [
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management ► Advanced Shipping and Receiving ► Activate ASR",
        "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► Logistics Integration ► Define Transportation Unit Settings",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Cross-Process Settings ► Shipping and Receiving ► Define Control Parameters",
      ],
      tables: ["/SCWM/TUNIT", "/SCWM/TU_SR_ACT", "/SCMTMS/D_TORROT", "/SCWM/DOOR"],
      tcodes: ["/SCWM/TU", "/SCWM/MON", "/SCMTMS/TOR", "/SCWM/PRDO"],
      fiori: ["F0868", "F2090", "F1701"],
      configHe: [
        "Activate Advanced Shipping & Receiving: הפעלת ASR לקליטת ה-TU כאובייקט משותף בין EWM ל-TM.",
        "Transportation Unit Settings: הגדרת סוגי-TU, סטטוסי-Loading/Unloading וקישור ל-Freight Order.",
        "Control Parameters for Shipping & Receiving: קביעת התנהגות הטעינה/פריקה, Door וסנכרון-הסטטוס.",
      ],
      flow: [
        { he: "Freight Order", code: "/SCMTMS/TOR" },
        { he: "Transportation Unit", code: "/SCWM/TU", note: "אובייקט משותף" },
        { he: "Door + Picking/Staging", code: "/SCWM/MON" },
        { he: "Loading/Unloading של TU", code: "HU" },
        { he: "סטטוס אוטומטי ל-TM + GI", code: "PGI" },
      ],
      masterDataHe: [
        "Transportation Unit Type = סוג יחידת-ההובלה (משאית/גרור/קונטיינר).",
        "Means of Transport + Carrier = מקושרים ל-TU דרך ה-Freight Order.",
        "Door + Staging Area = נקודות-החיבור הפיזיות של ה-TU.",
      ],
      mistakesHe: [
        "אי-הפעלת ASR בעוד מצפים להתנהגות TU ➔ נופלים חזרה למודל Freight Order/Shipment.",
        "ערבוב ASR עם מודל-FO ישן באותו תהליך ➔ קישור-כפול וסטטוס סותר.",
        "אי-הגדרת Transportation Unit Type ➔ TU לא נוצר.",
      ],
      troubleshootHe: [
        "TU לא נוצר מ-FO ➔ ASR לא הופעל או Transportation Unit Settings חסרים.",
        "סטטוס-טעינה לא מתעדכן ב-TM ➔ Control Parameters לסנכרון לא מוגדרים.",
        "Door לא מוקצה ל-TU ➔ Door Determination לא מוגדר ל-ASR.",
      ],
      bestPracticeHe: [
        "בתהליכי-תחבורה חדשים ב-S/4HANA העדף ASR על Freight Order/Shipment.",
        "אל תערבב ASR עם מודלים ישנים באותו warehouse process.",
        "נצל את עדכון-הסטטוס האוטומטי של ה-TU לנראות-חלוקה בזמן-אמת.",
      ],
      interviewHe: [
        { qHe: "מהו ASR ומה החידוש המרכזי בו?", aHe: "Advanced Shipping & Receiving — מודל שבו EWM ו-TM חולקים אובייקט-ביצוע יחיד, ה-Transportation Unit (TU), המבטל סנכרון-כפול ומספק תהליך אחיד ומדויק." },
        { qHe: "מהו Transportation Unit ולמה הוא משמש בשני המודולים?", aHe: "ה-TU מייצג את יחידת-ההובלה הפיזית (משאית/קונטיינר); TM מתכנן עליו הובלה ו-EWM מבצע עליו טעינה/פריקה — אותו אובייקט משותף." },
        { qHe: "מתי בוחרים ASR על פני Freight Order?", aHe: "בגרסאות S/4HANA עם embedded TM, בתהליכי-תחבורה חדשים — ASR הוא ה-best practice בזכות אובייקט-הביצוע המשותף ועדכון-הסטטוס האוטומטי." },
      ],
      takeawaysHe: [
        "ASR = אובייקט-ביצוע אחד משותף (Transportation Unit) ל-EWM ול-TM.",
        "מבטל סנכרון-כפול של Deliveries; הקישור הוא TU↔FO↔Delivery.",
        "ה-best practice לתהליכי-תחבורה חדשים ב-S/4HANA.",
      ],
      relatedHe: [
        { labelHe: "EWM · שילוב Freight Order (4.3)", href: "/library/wm/chapter-04/#sub-4.3" },
        { labelHe: "EWM · שילוב Shipment (4.5)", href: "/library/wm/chapter-04/#sub-4.5" },
      ],
      children: [
        {
          id: "4.4.1",
          titleHe: "תהליך קליטה-נכנסת",
          titleEn: "Inbound Process",
          execHe:
            "בתהליך הקליטה-הנכנסת תחת ASR, ה-Transportation Unit מייצג את הרכב הנכנס המשותף ל-TM ול-EWM. ה-TU מגיע למחסן, מוקצה ל-Door, נפרק כ-Handling Units, וה-Goods Receipt מדווח — וכל זאת תוך עדכון-סטטוס אוטומטי חזרה ל-TM.",
          beginnerHe:
            "סחורה נכנסת בתוך \"משאית משותפת\" (TU). TM יודע שהמשאית בדרך; EWM מקצה לה רציף, פורק את ה-Handling Units, ומאשר קליטה. ברגע שהפריקה נגמרת, TM רואה זאת מיד.",
          consultantHe:
            "ה-TU הנכנס נגזר מ-Freight Order נכנס ב-TM. בהגעתו: Check-In ב-Yard, הקצאת Door, Unloading של ה-Handling Units כ-Warehouse Tasks, Goods Receipt ו-Putaway. סטטוסי ה-TU (Arrived/Unloading Started/Unloaded) מתעדכנים אוטומטית ב-TM. ה-Inbound Delivery נגזר מתוך תוכן ה-TU.",
          purposeHe:
            "לתאם את הגעת-הרכב הנכנס עם פריקה ו-Putaway, תוך נראות-בזמן-אמת ל-TM על מצב-הפריקה, באמצעות אובייקט-TU יחיד.",
          processExampleHe:
            "FO נכנס ➔ TU נגזר ומשותף ל-EWM ➔ Check-In + Door ➔ Unloading של HUs (Warehouse Tasks) ➔ Goods Receipt ➔ Putaway ➔ סטטוס TU מתעדכן אוטומטית ב-TM.",
          cbcHe:
            "ב-CBC משאית-תרכיז נכנסת = TU משותף; EWM מקצה רציף-קליטה, פורק את ה-HUs לקירור, מבצע GR, וה-TM רואה את הפריקה מסתיימת בזמן-אמת לשחרור-הרכב. רכבי-Empties נקלטים באותו זרם.",
          navHe: [
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management ► Advanced Shipping and Receiving ► Inbound TU Settings",
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery",
          ],
          tables: ["/SCWM/TUNIT", "/SCWM/ORDIM_I", "/SCWM/DOOR"],
          tcodes: ["/SCWM/TU", "/SCWM/PRDI", "/SCWM/MON"],
          fiori: ["F0868", "F2091"],
          configHe: [
            "Inbound TU Settings: הגדרת התנהגות פריקה וסנכרון-סטטוס נכנס.",
            "Door Determination ל-TU נכנס.",
            "Warehouse Process Type ל-Putaway של תוכן ה-TU.",
          ],
          flow: [
            { he: "FO נכנס → TU", code: "/SCWM/TU" },
            { he: "Check-In + Door", code: "Yard" },
            { he: "Unloading של HUs", code: "WT" },
            { he: "GR + Putaway", code: "PGR" },
            { he: "סטטוס TU ל-TM", code: "אוטומטי" },
          ],
          masterDataHe: [
            "Transportation Unit Type (נכנס) + Carrier.",
            "Inbound Door + Staging Area.",
          ],
          mistakesHe: [
            "TU נכנס ללא Door Determination ➔ הקצאה ידנית ועיכוב.",
            "Warehouse Process Type שגוי ל-Putaway ➔ אחסון שגוי.",
          ],
          troubleshootHe: [
            "TU נכנס לא מתעדכן ב-TM ➔ Inbound TU Settings לסנכרון חסרים.",
            "Unloading לא מתבצע ➔ Handling Units לא מקושרים ל-TU.",
          ],
          bestPracticeHe: [
            "הגדר Door Determination ל-TU נכנס לפי סוג-מטען.",
            "נצל עדכון-סטטוס אוטומטי לשחרור-רכב מהיר.",
          ],
          interviewHe: [
            { qHe: "כיצד TU נכנס מתפקד ב-ASR?", aHe: "ה-TU נגזר מ-FO נכנס, מוקצה ל-Door, נפרק כ-Handling Units, וה-GR/Putaway מדווחים — בעוד סטטוסי-הפריקה מתעדכנים אוטומטית ב-TM." },
            { qHe: "מה היתרון מול מודל Freight Order נכנס?", aHe: "אובייקט-TU יחיד משותף מבטל את הקישור-הכפול ומספק עדכון-סטטוס אוטומטי דו-כיווני ללא mapping נפרד." },
          ],
          takeawaysHe: [
            "TU נכנס = רכב משותף ל-TM ול-EWM בקליטה.",
            "פריקה כ-HUs → GR → Putaway, עם סטטוס אוטומטי ל-TM.",
            "מבטל קישור-כפול לעומת מודל-FO.",
          ],
        },
        {
          id: "4.4.2",
          titleHe: "תהליך הפצה-יוצאת",
          titleEn: "Outbound Process",
          execHe:
            "בתהליך ההפצה-היוצאת תחת ASR, ה-Transportation Unit מייצג את משאית-המשלוח המשותפת. EWM מקצה Door ל-TU, מבצע Picking/Staging, וטוען את ה-Handling Units אל ה-TU; סטטוס-הטעינה מתעדכן אוטומטית ב-TM, וה-Departure מוביל ל-Goods Issue.",
          beginnerHe:
            "סחורה יוצאת ב\"משאית משותפת\" (TU). TM מתכנן מה נכנס למשאית; EWM מכין ליד הרציף וטוען את ה-Handling Units. כשהטעינה נגמרת, TM רואה את זה מיד והמשאית יוצאת.",
          consultantHe:
            "ה-TU היוצא נגזר מ-Freight Order יוצא. EWM מקצה Door, מבצע Picking ל-Staging Area, Packing ל-Handling Units, ו-Loading של ה-HUs אל ה-TU. סטטוסי ה-TU (Loading Started/Loaded/Departed) מתעדכנים אוטומטית ב-TM, וה-Goods Issue מדווח עם ה-Departure. סדר-הטעינה לרוב נגזר מרצף-הפריקה ההפוך במסלול.",
          purposeHe:
            "לטעון את עומס-המשאית היוצאת תחת אובייקט-TU יחיד, עם עדכון-סטטוס אוטומטי ל-TM ודיווח-יציאה מדויק — ללא סנכרון-כפול.",
          processExampleHe:
            "FO יוצא ➔ TU נגזר ומשותף ל-EWM ➔ הקצאת Door ➔ Picking/Packing/Staging ➔ Loading של HUs אל TU ➔ סטטוס Loaded/Departed אוטומטי ל-TM ➔ Goods Issue.",
          cbcHe:
            "ב-CBC משאית-חלוקה = TU יוצא משותף; EWM טוען את משטחי-המשקאות אל ה-TU בסדר הפוך לרצף-הפריקה בסניפים; ברגע סיום-הטעינה הסטטוס מתעדכן מיידית ב-TM ומנהל-החלוקה משחרר את המשאית לדרך.",
          navHe: [
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management ► Advanced Shipping and Receiving ► Outbound TU Settings",
            "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery",
          ],
          tables: ["/SCWM/TUNIT", "/SCWM/ORDIM_O", "/SCWM/DOOR"],
          tcodes: ["/SCWM/TU", "/SCWM/PRDO", "/SCWM/MON"],
          fiori: ["F0868", "F2090"],
          configHe: [
            "Outbound TU Settings: התנהגות טעינה וסנכרון-סטטוס יוצא.",
            "Door Determination ל-TU יוצא לפי Route/Carrier.",
            "Warehouse Process Type ל-Picking + Staging.",
          ],
          flow: [
            { he: "FO יוצא → TU", code: "/SCWM/TU" },
            { he: "Door + Picking/Staging", code: "/SCWM/MON" },
            { he: "Loading של HUs אל TU", code: "HU" },
            { he: "סטטוס Loaded/Departed", code: "אוטומטי" },
            { he: "Goods Issue", code: "PGI" },
          ],
          masterDataHe: [
            "Transportation Unit Type (יוצא) + Carrier + Route.",
            "Outbound Door + Staging Area.",
          ],
          mistakesHe: [
            "טעינה בסדר שגוי ➔ פריקה לא-יעילה בנקודות-החלוקה.",
            "GI לפני סיום-טעינת ה-TU ➔ אי-התאמת מלאי.",
            "ערבוב TU של ASR עם Delivery↔FO ישן ➔ סטטוס סותר.",
          ],
          troubleshootHe: [
            "סטטוס Loaded לא מתעדכן ב-TM ➔ Outbound TU Settings לסנכרון חסרים.",
            "HUs לא נטענים אל TU ➔ Packing/Staging לא הושלם.",
            "Door לא מוקצה ל-TU ➔ Door Determination ל-ASR לא מוגדר.",
          ],
          bestPracticeHe: [
            "תכנן סדר-טעינה לפי רצף-החלוקה ההפוך.",
            "נצל עדכון-סטטוס אוטומטי לנראות-יציאה בזמן-אמת.",
            "דווח GI רק אחרי Loaded/Departed של ה-TU.",
          ],
          interviewHe: [
            { qHe: "כיצד TU יוצא מתפקד ב-ASR?", aHe: "ה-TU נגזר מ-FO יוצא; EWM מקצה Door, מבצע Picking/Packing/Staging וטוען HUs אל ה-TU, בעוד סטטוסי הטעינה מתעדכנים אוטומטית ב-TM עד ל-GI." },
            { qHe: "מה ההבדל מ-Outbound תחת Freight Order?", aHe: "ב-ASR אין קישור Delivery↔FO נפרד — ה-TU המשותף הוא אובייקט-הביצוע, והסטטוס מתעדכן אוטומטית ללא mapping כפול." },
          ],
          takeawaysHe: [
            "TU יוצא = משאית-משלוח משותפת ל-TM ול-EWM.",
            "Loading של HUs אל TU; סטטוס Loaded/Departed אוטומטי ל-TM.",
            "GI אחרי טעינה; סדר-טעינה הפוך לרצף-החלוקה.",
          ],
        },
      ],
    },
    // ============================================================ 4.5
    {
      id: "4.5",
      titleHe: "שילוב Shipment",
      titleEn: "Shipment Integration",
      execHe:
        "שילוב Shipment הוא המודל הקלאסי שבו תכנון-התחבורה מבוסס על מסמך-ה-Shipment של ERP (VT01N), ולא על Freight Order או TU. ה-Shipment מאחד Deliveries לרכב, נושא Route ו-Carrier בסיסיים, ומקושר ל-EWM לצורך ביצוע-המחסן. זהו המודל הוותיק ביותר, פשוט יותר אך מוגבל ביכולות-התכנון לעומת TM, ועדיין נפוץ בנופים שלא עברו ל-TM מלא.",
      beginnerHe:
        "לפני ש-TM היה קיים במלואו, ERP ניהל הובלה דרך \"Shipment\" — מסמך פשוט שאומר \"המשאית הזו נושאת את ההזמנות האלה במסלול הזה\". זה עובד, אבל בלי האופטימיזציה והתמחור המתקדם של TM. עדיין בשימוש כשאין צורך בכלים-מתקדמים.",
      consultantHe:
        "ה-Shipment (טבלאות VTTK/VTTP) הוא מסמך-הובלה של LE-TRA ב-ERP. הוא מאחד Deliveries, נושא Shipment Type, Route, ו-Carrier, ומקושר ל-EWM דרך ה-Delivery. בניגוד ל-TM, אין לו Freight Units, אין תמחור-הובלה מתקדם ואין אופטימיזציית-מסלול אוטומטית. השילוב הוא הדרך ה\"מסורתית\": ERP מתכנן Shipment, EWM מבצע. בנופים מודרניים ה-Shipment מוחלף ב-Freight Order או ASR. חשוב להבדיל: Transportation Planning in ERP (Shipment) מול Transportation Planning in EWM/TM (FO/TU).",
      purposeHe:
        "לספק מנגנון-תכנון-הובלה בסיסי בתוך ERP, ללא תלות ב-TM, לארגונים שדרישות-ההובלה שלהם פשוטות (איחוד-בסיסי, מסלול קבוע) ואינם זקוקים לאופטימיזציה ולתמחור של TM.",
      processExampleHe:
        "Deliveries נוצרות ➔ Shipment נוצר ב-VT01N ומאחד אותן ➔ Route ו-Carrier משויכים ➔ ה-Shipment מקושר ל-Deliveries של EWM ➔ המחסן מבצע Picking/Loading ➔ Goods Issue.",
      cbcHe:
        "ב-CBC ארגון/אזור שלא עבר ל-TM מלא עשוי עדיין להשתמש ב-Shipment: משאית-חלוקה = Shipment המאחד הזמנות סניפים, עם Route קבוע ו-Carrier אזורי; המחסן מבצע את ההכנה והטעינה כרגיל.",
      navHe: [
        "SAP Customizing Implementation Guide ► Logistics Execution ► Transportation ► Shipments ► Define Shipment Types",
        "SAP Customizing Implementation Guide ► Logistics Execution ► Transportation ► Basic Transportation Functions ► Routes",
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► ERP Integration ► Shipment",
      ],
      tables: ["VTTK", "VTTP", "VTSP", "LIKP"],
      tcodes: ["VT01N", "VT02N", "VT03N", "/SCWM/PRDO"],
      fiori: ["F1701", "F2090"],
      configHe: [
        "Shipment Type (LE-TRA): קובע מספור, מצב-תכנון (פרטני/קבוצתי) ושלבי-עיבוד.",
        "Routes: הגדרת מסלולים קבועים ומקטעיהם לשיוך ל-Shipment.",
        "ERP↔EWM Shipment Integration: קישור ה-Shipment ל-Deliveries של EWM לביצוע-מחסן.",
      ],
      flow: [
        { he: "Deliveries", code: "LIKP" },
        { he: "Shipment (איחוד)", code: "VT01N" },
        { he: "Route + Carrier", code: "VTTK" },
        { he: "ביצוע-מחסן", code: "/SCWM/PRDO" },
        { he: "Goods Issue", code: "PGI" },
      ],
      masterDataHe: [
        "Route + Itinerary = מסלול ה-Shipment.",
        "Carrier (Vendor/Business Partner) = המוביל.",
      ],
      mistakesHe: [
        "ניסיון לצפות מ-Shipment ליכולות-TM (תמחור/אופטימיזציה) שאינן קיימות בו.",
        "ערבוב Shipment עם Freight Order/ASR באותו נוף ➔ בלבול-מודלים.",
        "Route לא מוגדר ➔ אי-אפשר לתכנן Shipment תקין.",
      ],
      troubleshootHe: [
        "Shipment לא מקושר ל-Delivery ב-EWM ➔ ERP↔EWM Shipment Integration חסר.",
        "Deliveries לא מתאחדות ל-Shipment ➔ Route/Shipment Type לא תואמים.",
        "GI נכשל ➔ ביצוע-מחסן (Picking/Loading) לא הושלם.",
      ],
      bestPracticeHe: [
        "השתמש ב-Shipment רק כשדרישות-ההובלה פשוטות וללא צורך ב-TM.",
        "בנופים חדשים העדף Freight Order או ASR.",
        "הגדר Routes ברורים לאיחוד-Shipment עקבי.",
      ],
      interviewHe: [
        { qHe: "מהו Shipment ובמה הוא מוגבל לעומת TM?", aHe: "Shipment הוא מסמך-ההובלה הקלאסי של ERP (LE-TRA); הוא מאחד Deliveries עם Route ו-Carrier בסיסיים, אך חסר Freight Units, תמחור-הובלה ואופטימיזציית-מסלול של TM." },
        { qHe: "מתי עדיין משתמשים ב-Shipment?", aHe: "בנופים שלא עברו ל-TM מלא ובדרישות-הובלה פשוטות — איחוד-בסיסי על מסלול קבוע ללא צורך באופטימיזציה ותמחור." },
        { qHe: "כיצד Shipment מתחבר ל-EWM?", aHe: "דרך קישור ה-Shipment ל-Deliveries של EWM (ERP↔EWM Shipment Integration); המחסן מבצע Picking/Loading ומדווח GI." },
      ],
      takeawaysHe: [
        "Shipment = מודל-התחבורה הקלאסי של ERP (LE-TRA).",
        "פשוט מ-TM — ללא Freight Units, תמחור ואופטימיזציה.",
        "מוחלף ב-Freight Order/ASR בנופים מודרניים.",
      ],
      relatedHe: [
        { labelHe: "EWM · שילוב Freight Order (4.3)", href: "/library/wm/chapter-04/#sub-4.3" },
        { labelHe: "EWM · Advanced Shipping & Receiving (4.4)", href: "/library/wm/chapter-04/#sub-4.4" },
      ],
      children: [
        {
          id: "4.5.1",
          titleHe: "תכנון תחבורה במערכת ERP",
          titleEn: "Transportation Planning in an ERP System",
          execHe:
            "תכנון-התחבורה ב-ERP מבוסס על מסמך-ה-Shipment של LE-TRA. המתכנן מאחד Deliveries ל-Shipment ידנית או דרך Collective Processing (VT04), משייך Route ו-Carrier, ומשחרר לביצוע. זהו תכנון פשוט, ידני-למחצה, בתוך ERP — ללא מנוע-אופטימיזציה.",
          beginnerHe:
            "כאן מתכננים את ההובלה בתוך ERP עצמו: לוקחים כמה הזמנות, מאחדים אותן למשאית (Shipment), בוחרים מסלול ומוביל. הכל ידני יחסית — בלי שמחשב \"מחליט\" את המסלול האופטימלי.",
          consultantHe:
            "ב-LE-TRA המתכנן עובד ב-VT01N (פרטני) או VT04 (Collective Processing) לאיחוד Deliveries ל-Shipment לפי Route, Selection Variant ו-Shipment Type. ה-Shipment עובר Planning → Check-In → Loading Start/End → Shipment Completion → Shipment Start. אין Freight Units ואין VSR-Optimizer; האיחוד מבוסס על קריטריונים פשוטים (Route/Ship-to/תאריך).",
          purposeHe:
            "לאפשר תכנון-הובלה בסיסי בתוך ERP ללא TM — לארגונים בעלי דרישות פשוטות שמעדיפים תהליך-תכנון ידני-מובנה על מסלולים קבועים.",
          processExampleHe:
            "המתכנן מריץ VT04 ➔ המערכת מציעה Deliveries לאיחוד לפי Route ➔ נוצר Shipment ➔ שיוך Carrier ➔ שלבי-ביצוע (Check-In/Loading/Completion) ➔ קישור ל-EWM לביצוע.",
          cbcHe:
            "ב-CBC ללא TM: רכז-לוגיסטיקה מריץ VT04 בבוקר, מאחד את הזמנות-הסניפים למשאיות לפי אזור-מסלול, משייך מוביל אזורי, ומשחרר את ה-Shipments למחסן להכנה.",
          navHe: [
            "SAP Customizing Implementation Guide ► Logistics Execution ► Transportation ► Shipments ► Define Shipment Types",
            "SAP Customizing Implementation Guide ► Logistics Execution ► Transportation ► Shipments ► Maintain Selection Variants for Collective Processing",
          ],
          tables: ["VTTK", "VTTP", "TVTK"],
          tcodes: ["VT01N", "VT04", "VT02N"],
          fiori: ["F1701"],
          configHe: [
            "Shipment Type + מצב-תכנון (פרטני/קבוצתי).",
            "Selection Variants ל-Collective Processing (VT04).",
            "Route Determination לשיוך-מסלול אוטומטי.",
          ],
          flow: [
            { he: "בחירת Deliveries", code: "VT04" },
            { he: "יצירת Shipment", code: "VT01N" },
            { he: "Route + Carrier", code: "VTTK" },
            { he: "שלבי-ביצוע", code: "Check-In/Load" },
            { he: "קישור ל-EWM", code: "/SCWM/PRDO" },
          ],
          masterDataHe: [
            "Route + Selection Variant = בסיס-האיחוד.",
            "Carrier (Vendor) = המוביל ב-Shipment.",
          ],
          mistakesHe: [
            "ציפייה לאופטימיזציה אוטומטית — אין VSR ב-ERP-Shipment.",
            "Selection Variant שגוי ב-VT04 ➔ Deliveries לא נאספות.",
          ],
          troubleshootHe: [
            "VT04 לא מציע Deliveries ➔ Selection Variant/Route לא תואמים.",
            "Shipment לא מתקדם בשלבים ➔ סטטוס-ביצוע (Check-In/Loading) לא דווח.",
          ],
          bestPracticeHe: [
            "השתמש ב-Collective Processing (VT04) לאיחוד עקבי לפי Route.",
            "הגדר Selection Variants לפי אזור/מסלול לחיסכון בעבודה ידנית.",
          ],
          interviewHe: [
            { qHe: "באילו T-Codes מתכננים Shipment ב-ERP?", aHe: "VT01N לתכנון פרטני ו-VT04 ל-Collective Processing לאיחוד אוטומטי-למחצה של Deliveries לפי Route." },
            { qHe: "מה חסר בתכנון-ERP לעומת TM?", aHe: "אין Freight Units, אין מנוע-אופטימיזציה (VSR) ואין תמחור-הובלה מתקדם — האיחוד מבוסס קריטריונים פשוטים." },
          ],
          takeawaysHe: [
            "תכנון-ERP = Shipment דרך VT01N/VT04.",
            "ידני-למחצה, ללא אופטימיזציה אוטומטית.",
            "מתאים לדרישות-הובלה פשוטות.",
          ],
        },
        {
          id: "4.5.2",
          titleHe: "תכנון תחבורה ב-SAP EWM",
          titleEn: "Transportation Planning in SAP EWM",
          execHe:
            "תכנון-התחבורה \"ב-SAP EWM\" מתייחס לשילוב שבו התכנון מתבצע ב-TM (embedded או מבוזר) ומוזן לביצוע ב-EWM דרך Freight Order או Transportation Unit — לא ב-ERP-Shipment. כאן נכנסות יכולות-התכנון המתקדמות: Freight Units, אופטימיזציה ותמחור, שמתורגמות לפעילות-מחסן ב-EWM.",
          beginnerHe:
            "כאן התכנון \"חכם\" יותר: TM (שעובד צמוד ל-EWM) מתכנן את ההובלה עם כלים מתקדמים — מאחד אוטומטית, בוחר מסלול-אופטימלי ומחשב עלות — ואז מעביר ל-EWM לבצע. זה ההפך מתכנון-ERP הידני.",
          consultantHe:
            "כאן ה-Transportation Planning מתבצע ב-TM: Deliveries הופכות ל-Freight Units, מתוכננות ל-Freight Order (ידנית, או דרך VSR-Optimizer/Transportation Cockpit), והביצוע ב-EWM הוא דרך FO-Integration או ASR (TU). זהו ההמשך הטבעי של 4.3/4.4. ה-Transportation Cockpit (/SCMTMS/TSPC) הוא כלי-התכנון; embedded TM מבטל את תקורת-האינטגרציה אל EWM.",
          purposeHe:
            "להביא את יכולות-התכנון המתקדמות של TM (איחוד אוטומטי, אופטימיזציה, תמחור) אל תוך ביצוע-המחסן של EWM — במקום תכנון-ERP פשוט.",
          processExampleHe:
            "Deliveries → Freight Units ב-TM ➔ תכנון ב-Transportation Cockpit (אופטימיזציה/איחוד) ➔ Freight Order/TU ➔ ביצוע ב-EWM (Picking/Loading) ➔ סטטוס מסונכרן ➔ GI.",
          cbcHe:
            "ב-CBC עם TM: ה-Transportation Cockpit מאחד אוטומטית עשרות הזמנות-סניפים למשאיות-חלוקה אופטימליות לפי אזור וקיבולת, ומעביר כ-TU ל-EWM לטעינה — שיפור משמעותי על תכנון-ה-Shipment הידני.",
          navHe: [
            "SAP Customizing Implementation Guide ► Transportation Management ► Planning ► General Settings ► Define Planning Profile Settings",
            "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► Logistics Integration ► EWM Integration",
          ],
          tables: ["/SCMTMS/D_TORROT", "/SCMTMS/D_FRTRO", "/SCWM/TUNIT"],
          tcodes: ["/SCMTMS/TSPC", "/SCMTMS/TOR", "/SCWM/TU"],
          fiori: ["F0868", "F0866"],
          configHe: [
            "Planning Profile Settings: הגדרת פרופיל-התכנון, אופק-זמן וקריטריוני-איחוד.",
            "EWM Integration: קישור פלט-התכנון (FO/TU) לביצוע-מחסן.",
            "Optimizer/Manual Planning ב-Transportation Cockpit.",
          ],
          flow: [
            { he: "Deliveries → Freight Units", code: "/SCMTMS/FU" },
            { he: "תכנון ב-Cockpit", code: "/SCMTMS/TSPC", note: "אופטימיזציה" },
            { he: "Freight Order / TU", code: "/SCMTMS/TOR" },
            { he: "ביצוע ב-EWM", code: "/SCWM/MON" },
            { he: "סטטוס + GI", code: "PGI" },
          ],
          masterDataHe: [
            "Transportation Lane + Means of Transport + Carrier = רשת-התכנון.",
            "Planning Profile = פרמטרי-האיחוד והאופטימיזציה.",
          ],
          mistakesHe: [
            "בלבול בין \"תכנון ב-EWM\" לבין ביצוע — התכנון בפועל מתבצע ב-TM, EWM מבצע.",
            "Planning Profile שגוי ➔ איחוד/אופטימיזציה לא תקינים.",
          ],
          troubleshootHe: [
            "Freight Units לא מתוכננות ל-FO ➔ Planning Profile/Transportation Lane חסרים.",
            "פלט-התכנון לא מגיע ל-EWM ➔ EWM Integration לא מוגדר.",
          ],
          bestPracticeHe: [
            "השתמש ב-Transportation Cockpit ובאופטימיזציה במקום איחוד-ידני.",
            "ב-S/4HANA העדף embedded TM להזרמה ישירה ל-EWM (FO/TU).",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין תכנון-תחבורה ב-ERP לבין תכנון דרך TM/EWM?", aHe: "ERP-Shipment הוא תכנון פשוט וידני-למחצה; דרך TM יש Freight Units, Transportation Cockpit, אופטימיזציה ותמחור, שמוזנים לביצוע ב-EWM כ-FO/TU." },
            { qHe: "היכן מתבצע התכנון בפועל במודל זה?", aHe: "ב-TM (Transportation Cockpit /SCMTMS/TSPC); EWM מבצע את פלט-התכנון (Picking/Loading) — לכן \"תכנון ב-EWM\" מתייחס לזרימת-התכנון אל EWM, לא לתכנון בתוכו." },
          ],
          takeawaysHe: [
            "התכנון מתבצע ב-TM (Transportation Cockpit), הביצוע ב-EWM.",
            "Freight Units + אופטימיזציה + תמחור — מעבר ל-ERP-Shipment.",
            "embedded TM מזרים FO/TU ישירות לביצוע-מחסן.",
          ],
          relatedHe: [
            { labelHe: "EWM · שילוב Freight Order (4.3)", href: "/library/wm/chapter-04/#sub-4.3" },
            { labelHe: "EWM · Advanced Shipping & Receiving (4.4)", href: "/library/wm/chapter-04/#sub-4.4" },
          ],
        },
      ],
    },
    // ============================================================ 4.6
    {
      id: "4.6",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את שילוב EWM↔TM דרך שלושה מודלים: ה-Shipment הקלאסי של ERP (LE-TRA), שילוב ה-Freight Order של TM, וה-Advanced Shipping & Receiving (ASR) המודרני המבוסס Transportation Unit משותף. הקו המנחה: EWM מבצע בתוך המחסן, TM מתכנן מחוץ לו, ובחירת-המודל קובעת כיצד הם מסונכרנים — מהקישור הפשוט של Shipment ועד לאובייקט-הביצוע המשותף של ASR.",
      beginnerHe:
        "סיכום בקצרה: יש שלוש דרכים לחבר מחסן (EWM) להובלה (TM). הישנה (Shipment) פשוטה. האמצעית (Freight Order) חזקה יותר. החדשה (ASR) הכי טובה — משאית אחת משותפת לשתי המערכות. בכל המקרים, EWM מכין ומטעין, ו-TM מתכנן ומנהל את ההובלה.",
      consultantHe:
        "מבחינה ארכיטקטונית: Shipment (VTTK/VTTP) הוא LE-TRA ללא יכולות-TM; Freight Order (/SCMTMS/D_TORROT) מביא Freight Units, תמחור ואופטימיזציה עם קישור Delivery↔FO; ASR מוסיף את ה-Transportation Unit (/SCWM/TUNIT) כאובייקט-ביצוע משותף עם עדכון-סטטוס אוטומטי. ב-S/4HANA embedded TM מבטל את תקורת-האינטגרציה. ההמלצה לנופים חדשים: ASR. ה-Inbound וה-Outbound נבדלים בכיוון אך חולקים את אותם עקרונות: קישור-מסמך, Door/Staging, Warehouse Tasks וסנכרון-סטטוס.",
      purposeHe:
        "לקבע מסגרת-החלטה: איזה מודל-שילוב לבחור לפי גרסה, מורכבות-תכנון ונוף-מערכות, ולהבין את נקודות-החיבור המשותפות לכל המודלים.",
      processExampleHe:
        "החלטת-מימוש טיפוסית: נוף S/4HANA חדש עם embedded TM ➔ בחר ASR ➔ תכנן ב-Transportation Cockpit ל-Freight Orders ➔ TU משותף מזרים ל-EWM ➔ ביצוע-מחסן עם סטטוס-אוטומטי ➔ GI. נוף ישן/פשוט ➔ Shipment.",
      cbcHe:
        "ב-CBC המסקנה: לחלוקת-משקאות יומית בהיקף גבוה עם איחוד-מורכב, ASR הוא הבחירה — TU משותף לכל משאית-חלוקה, אופטימיזציית-מסלול ב-TM, ונראות-חלוקה בזמן-אמת. אזורים פשוטים יכולים להישאר על Shipment עד למיגרציה.",
      navHe: [
        "SAP Customizing Implementation Guide ► Extended Warehouse Management ► Interfaces ► Transportation Management",
        "SAP Customizing Implementation Guide ► Transportation Management ► Integration ► Logistics Integration",
      ],
      tables: ["VTTK", "/SCMTMS/D_TORROT", "/SCWM/TUNIT"],
      tcodes: ["VT01N", "/SCMTMS/TOR", "/SCWM/TU"],
      fiori: ["F1701", "F0868", "F2090"],
      configHe: [
        "החלטת-מודל: Shipment (פשוט) / Freight Order (מתקדם) / ASR (משותף, מומלץ).",
        "הפעלת embedded TM ו-Logistics Integration לפי המודל הנבחר.",
        "הגדרת נקודות-החיבור המשותפות: Door, Staging, סנכרון-סטטוס.",
      ],
      flow: [
        { he: "בחר מודל-שילוב", code: "Shipment/FO/ASR" },
        { he: "הפעל Integration", code: "embedded TM" },
        { he: "תכנן ב-TM", code: "FU/FO/TU" },
        { he: "בצע ב-EWM", code: "/SCWM/MON" },
        { he: "סנכרן + GI", code: "PGI" },
      ],
      masterDataHe: [
        "Carrier + Route + Means of Transport = משותפים לכל המודלים.",
        "Door + Staging Area = נקודות-החיבור הפיזיות בכל מודל.",
      ],
      mistakesHe: [
        "ערבוב מודלים (Shipment + FO + ASR) באותו תהליך.",
        "בחירת מודל-שילוב ללא התאמה לגרסה ולמורכבות-התכנון.",
        "הזנחת נקודות-החיבור המשותפות (Door/Staging/סנכרון) שחוצות את כל המודלים.",
      ],
      troubleshootHe: [
        "סנכרון-סטטוס נכשל בכל מודל ➔ בדוק Logistics Integration ו-Control Parameters.",
        "ביצוע-מחסן לא מקושר לתכנון ➔ מודל-השילוב לא מוגדר במלואו.",
      ],
      bestPracticeHe: [
        "בנופים חדשים ב-S/4HANA — בחר ASR כברירת-מחדל.",
        "תעד מפורשות איזה מודל פעיל לאיזה תהליך, והימנע מערבוב.",
        "אחד את נקודות-החיבור (Door/Staging/סטטוס) על פני כל המודלים.",
      ],
      interviewHe: [
        { qHe: "סכם את שלושת מודלי-השילוב EWM↔TM ואת ההמלצה.", aHe: "Shipment (ERP, פשוט) / Freight Order (TM, מתקדם, קישור Delivery↔FO) / ASR (TM, Transportation Unit משותף). לנופים חדשים ב-S/4HANA מומלץ ASR בזכות אובייקט-הביצוע המשותף ועדכון-הסטטוס האוטומטי." },
        { qHe: "מה משותף לכל המודלים בקצה-המחסן?", aHe: "קישור-מסמך לתחבורה, קביעת Door ו-Staging Area, Warehouse Tasks לטעינה/פריקה, וסנכרון-סטטוס בין EWM ל-TM." },
      ],
      takeawaysHe: [
        "שלושה מודלים: Shipment, Freight Order, ASR — בסדר היסטורי ועולה ביכולת.",
        "EWM מבצע בתוך המחסן; TM מתכנן מחוץ לו.",
        "ASR (Transportation Unit משותף) = ההמלצה לנופי-S/4HANA חדשים.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת TM (4.1)", href: "/library/wm/chapter-04/#sub-4.1" },
        { labelHe: "EWM · Advanced Shipping & Receiving (4.4)", href: "/library/wm/chapter-04/#sub-4.4" },
      ],
    },
  ],
};
