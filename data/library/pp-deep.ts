// ===== PP Deep Learning Content — Chapters 3 & 4 (SAP-Press-grade benchmark) =====
// Transformative Hebrew learning content per subchapter: explanation, business
// scenario, configuration example, master-data example, troubleshooting, tips,
// consultant pitfalls, CBC notes. Copyright-safe: no verbatim source prose.
// SAP identifiers (T-Codes / tables / CDS / Fiori / programs) verbatim in English.

export interface DeepUnit {
  id: string;
  titleHe: string;
  titleEn: string;
  explanationHe: string;
  scenarioHe?: string;
  configHe?: string[];
  masterDataHe?: string[];
  cbcHe?: string;
  troubleshootHe?: string[];
  tipsHe?: string[];
  pitfallsHe?: string[];
}

export const PP_DEEP: Record<string, DeepUnit[]> = {
  "3": [
    {
      id: "3.1", titleHe: "אב חומר — תצוגות הרלוונטיות לייצור", titleEn: "Material Master for Production",
      explanationHe:
        "אב החומר (MARA כללי, MARC ברמת מפעל) הוא בסיס כל תכנון הייצור. לייצור בדיד נדרשות בעיקר התצוגות MRP 1–4, Work Scheduling ו-Accounting/Costing. ה-MRP Type (PD לתכנון דרישות, VB לנקודת הזמנה), Lot Size, Procurement Type (E ייצור פנימי / F רכש), In-house Production Time ו-Scheduling Margin Key קובעים כיצד ה-MRP מתכנן את החומר. תצוגת Work Scheduling מחזיקה את Production Scheduler ו-Production Scheduling Profile.",
      scenarioHe:
        "מוצר מוגמר המיוצר פנימית: MRP Type=PD, Procurement Type=E, Lot Size=EX (Lot-for-Lot), עם Production Version המקשרת BOM ו-Routing. רכיב נרכש: Procurement Type=F עם Planned Delivery Time.",
      configHe: [
        "MM01/MM02 (טרנזקציה) — תחזוקת אב חומר; בחר Industry Sector ו-Material Type (FERT מוגמר, HALB חצי-מוגמר, ROH חומר גלם).",
        "פריסת תצוגות אב החומר נשלטת ב-Customizing דרך OMS9 / OMSR (Field Selection) ו-OMT3* (Screen Sequence).",
        "שדות MRP קריטיים: MRP Type, MRP Controller, Lot Size, Reorder Point, Safety Stock, Procurement Type, Special Procurement.",
      ],
      masterDataHe: [
        "MARC-DISMM = MRP Type · MARC-DISLS = Lot Size · MARC-BESKZ = Procurement Type · MARC-SBDKZ.",
        "Production Scheduling Profile (MARC-SFCPF) בתצוגת Work Scheduling — מפעיל אוטומציות שחרור/דיווח.",
      ],
      tipsHe: [
        "הגדר Scheduling Margin Key (Floats) ב-OPJK — קריטי לחישוב תאריכי ההזמנה המתוכננת.",
        "השתמש ב-Mass Maintenance (MM17) להזנת פרמטרי MRP לחומרים רבים בבת-אחת.",
      ],
      pitfallsHe: [
        "חוסר Production Version או נתוני MRP חלקיים ➔ ה-MRP לא ייצר הזמנות / שגיאות בפיצוץ ה-BOM.",
        "MRP Type שגוי (VB במקום PD) משנה לחלוטין את לוגיקת התכנון — ודא עם תכנון הביקוש.",
      ],
      cbcHe: "ב-CBC חומרי הגלם (תרכיז, סוכר, CO2) הם ROH מנוהלי-אצווה; המוצר המוגמר FERT — לכולם נדרשים נתוני MRP מלאים ו-Production Version.",
    },
    {
      id: "3.2", titleHe: "עץ מוצר (BOM) — שימושים, סטטוס, קטגוריות פריט", titleEn: "Bill of Materials",
      explanationHe:
        "ה-BOM (כותרת STKO, פריטים STPO) מגדיר את רכיבי המוצר. בייצור בדיד משתמשים ב-Material BOM. ה-BOM Usage (1 ייצור, 5 ... ) קובע לאילו יישומים תקף; Item Category קובע התנהגות הרכיב: L מלאי (מפעיל Reservation), N לא-מלאי (מפעיל דרישת רכש), T טקסט, D מסמך, I אלמנט מבנה. BOM Status שולט אם משוחרר לייצור/תמחיר. בחירת BOM (Order of Priority) מאפשרת מספר חלופות (Alternatives).",
      scenarioHe:
        "מוצר עם רכיבי מלאי (item category L) + שירות חיצוני כ-non-stock (N) + הערת בטיחות כ-Text item (T). פיצוץ ה-BOM בפק\"ע מייצר Reservation לרכיבי L ודרישת רכש לרכיבי N.",
      configHe: [
        "CS01/CS02/CS03 — יצירה/שינוי/תצוגת Material BOM; CS20 שינוי המוני.",
        "Customizing: OS20 (BOM Usage), OS23 (Item Categories), OS27/OS28 (BOM Status), Allowed Material Types in BOM Header.",
        "Variable-Size Item — חישוב כמות לפי נוסחה (אורך×רוחב) עבור פריטים בגזרה.",
      ],
      masterDataHe: [
        "STKO (כותרת: Base Quantity, BOM Usage, Status) · STPO (פריט: Component, Quantity, Item Category, Item ID IDNRK).",
        "Component Scrap (%) ו-Operation Scrap משפיעים על כמות הדרישה.",
      ],
      troubleshootHe: [
        "רכיב לא מופיע בפק\"ע ➔ בדוק BOM Status (לא משוחרר), תוקף (Valid-From) וכמות בסיס.",
        "כמות רכיב שגויה ➔ בדוק Component Scrap מול Assembly Scrap (כפל פחת).",
      ],
      tipsHe: ["נהל גרסאות BOM עם Change Number (ECM, CC01) לתיעוד שינויים והיסטוריה."],
      pitfallsHe: ["שכחת Item Category נכונה (L מול N) גורמת להזמנות רכש מיותרות או חוסר Reservation."],
    },
    {
      id: "3.3", titleHe: "מרכז עבודה (Work Center) — קטגוריה, נוסחאות, מפתחות בקרה", titleEn: "Work Center",
      explanationHe:
        "מרכז העבודה (CRHD) מייצג מכונה/קו/תחנה ומספק קיבולת, תזמון ועלות. קטגוריית מרכז העבודה (Work Center Category) קובעת מסכים ויישום רשימת משימות. Standard Value Key מגדיר את ערכי הזמן (Setup/Machine/Labor); Formulas מתרגמים אותם לזמן תזמון, קיבולת ועלות. Control Key קובע אם הפעולה מתוזמנת/מתומחרת/מאושרת/חיצונית.",
      scenarioHe:
        "קו מילוי משקאות כמרכז עבודה עם Standard Value Key המחזיק Setup + Machine; נוסחת תזמון Machine = (Operation Qty / Base Qty) × Machine Time; שיוך Cost Center ו-Activity Types לתמחור.",
      configHe: [
        "CR01/CR02/CR03 — יצירת/שינוי/תצוגת מרכז עבודה.",
        "Customizing: OP40 (Work Center Category), OP19 (Standard Value Key), OP21/OP54 (Formulas), OPFA (Field Selection), OP00 (Control Keys), OP4A (Capacity).",
        "שיוך Cost Center ו-Activity Type (KP26 לתעריפים) בתצוגת Costing לחישוב עלות הפעולה.",
      ],
      masterDataHe: [
        "CRHD (כותרת מרכז עבודה) · CRCO (שיוך מרכז עלות) · KAKO (קיבולת).",
        "Capacity Category (001 מכונה, 002 כוח-אדם), Available Capacity, Utilization %.",
      ],
      troubleshootHe: [
        "תזמון פק\"ע שגוי ➔ בדוק נוסחאות (OP21) ו-Standard Values ברשימת המשימות.",
        "עלות פעולה אפס ➔ Activity Type ללא תעריף (KP26) או Control Key ללא 'Costing'.",
      ],
      tipsHe: ["למרכזי עבודה של אחזקה בלבד השתמש ב-Standard Value Key=SAP0 (ללא ערכי תקן)."],
      pitfallsHe: ["Control Key ללא 'Scheduling' גורם לפעולה שלא משתתפת בתזמון — תאריכי פק\"ע שגויים."],
    },
    {
      id: "3.4", titleHe: "מסלול ייצור (Routing)", titleEn: "Routing",
      explanationHe:
        "ה-Routing (כותרת PLKO, פעולות PLPO, שיוך לחומר MAPL) מגדיר את רצף הפעולות, מרכזי העבודה, זמני התקן והרכיבים המוקצים לכל פעולה. סוג רשימת משימות N לייצור בדיד. כל פעולה נושאת Control Key, Standard Values ו-Component Allocation.",
      scenarioHe:
        "Routing לקו ייצור: 0010 Setup, 0020 Machine (מילוי), 0030 בקרת איכות (Control Key עם Inspection), 0040 אריזה. רכיבים מ-BOM מוקצים לפעולה הרלוונטית.",
      configHe: [
        "CA01/CA02/CA03 — יצירת/שינוי/תצוגת Routing; CA85 החלפת מרכז עבודה המונית.",
        "שיוך רשימת משימות לחומר דרך MAPL (Material-Task List Assignment).",
        "Reference Operation Set (CA11) לפעולות חוזרות בין מוצרים.",
      ],
      masterDataHe: [
        "PLKO (כותרת) · PLPO (פעולות) · PLAS (בחירת פעולה) · MAPL (שיוך לחומר) · PLMZ (הקצאת רכיבים).",
      ],
      troubleshootHe: ["פק\"ע ללא פעולות ➔ Routing לא משויך (MAPL) או Lot Size/תוקף לא תואמים."],
      tipsHe: ["שלב Routing + BOM ל-Production Version אחת (C223) — חובה ב-S/4HANA."],
      pitfallsHe: ["שינוי Routing ללא Change Number מאבד היסטוריה ומשפיע על פק\"ע פתוחות."],
    },
    {
      id: "3.5", titleHe: "סוגי פק\"ע וטווחי מספרים", titleEn: "Order Types & Number Ranges",
      explanationHe:
        "סוג הפק\"ע (Order Type) הוא רכיב הבקרה המרכזי לעיבוד פק\"ע ייצור בדיד: קובע טווח מספרים, פרופיל תזמון, פרופיל זמינות, פרופיל קונפירמציה, פרופיל התחשבנות (Settlement) ופרופיל תקצוב. כל סוג משויך ל-Order Category 10 (PP Production Order).",
      configHe: [
        "OPJH — הגדרת Order Type (PP); CO82 — טווחי מספרים.",
        "OPL8 — Order Type–Dependent Parameters פר-מפעל (Planning, Implementation, Cost Accounting).",
        "OPKP — Production Scheduling Profile (אוטומציות).",
      ],
      masterDataHe: ["T399X / T003O — הגדרות סוג הזמנה; AUFK (כותרת פקודה), AFKO/AFPO (נתוני ייצור)."],
      tipsHe: ["הגדר 3–5 סוגי פק\"ע (ייצור רגיל, Rework, מוצר חצי-מוגמר) — לא יותר."],
      pitfallsHe: ["שיוך לא-מלא של Order Type ל-Plant ב-OPL8 ➔ לא ניתן ליצור פק\"ע באותו מפעל."],
    },
    {
      id: "3.6", titleHe: "בדיקת זמינות חומר וקיבולת", titleEn: "Availability Check",
      explanationHe:
        "בדיקת הזמינות הדינמית (ATP) בודקת אם החומר זמין בתאריך הדרישה. נשלטת על-ידי Checking Group (באב החומר, MARC) + Checking Rule (לפי סוג פק\"ע ומפעל) → Scope of Check (אילו מלאים וקבלות/הוצאות נכללים).",
      configHe: [
        "OVZ2 — Checking Group (בתפריט Production, לא PP); OPJK — Checking Control לפי Order Type; OPJJ — Scope of Check.",
        "Release material indicator: 1 המשתמש מחליט / 2 שחרור למרות חוסר / 3 ללא שחרור — מומלץ 1.",
      ],
      troubleshootHe: [
        "פק\"ע לא משוחררת ➔ Status MSPT (Material Shortage); נתח ב-MD04 ו-CO24 (Missing Parts).",
        "בדיקה לא מתחשבת ברכש צפוי ➔ הפעל With Purchase Orders ב-Scope of Check (OPJJ).",
      ],
      tipsHe: ["צור Checking Rule ייעודי לייצור כדי לבודד את לוגיקת ה-ATP מתחומים אחרים."],
      pitfallsHe: ["Scope of Check הכולל מלאי בלתי-מוגבל מסתיר חוסרים אמיתיים — בטל סוגי מלאי לא רלוונטיים."],
    },
    {
      id: "3.7", titleHe: "פרופיל תזמון ייצור (Production Scheduling Profile)", titleEn: "Production Scheduling Profile",
      explanationHe:
        "הפרופיל (OPKP, שדה MARC-SFCPF) מרכז אוטומציות לפק\"ע: שחרור אוטומטי ביצירה, יצירת מתכון בקרה אוטומטית, סגירה אוטומטית, סוג ה-Goods Receipt, ואופן ה-Confirmation. חוסך צעדים ידניים חוזרים.",
      configHe: [
        "OPKP — הגדרת הפרופיל; שייך לאב החומר (Work Scheduling view, שדה Production Scheduling Profile).",
        "אפשרויות: Automatic Release, Automatic GR, Automatic Settlement, Confirmation default.",
      ],
      tipsHe: ["הפעל שחרור אוטומטי רק היכן שבדיקת הזמינות אינה קריטית — אחרת חומר חסר לא ייעצר."],
      pitfallsHe: ["Automatic GR ללא בקרה גורם לרישומי מלאי שגויים אם הדיווח לא מדויק."],
    },
    {
      id: "3.8", titleHe: "גרסת ייצור (Production Version)", titleEn: "Production Version",
      explanationHe:
        "גרסת הייצור (MKAL) מקשרת BOM Alternative + Routing/Recipe Group לחומר ומפעל, עם תוקף וטווח כמויות (Lot Size From/To). ב-S/4HANA היא חובה — ה-MRP וההמרה לפק\"ע נשענים עליה.",
      configHe: [
        "C223 (טרנזקציה) — תחזוקת Production Versions; ניתן גם בתצוגת MRP4 של אב החומר.",
        "Consistency Check (C223) מאמת שה-BOM וה-Routing קיימים ותקפים.",
      ],
      masterDataHe: ["MKAL (Production Version: ALNAL=Routing group, STLAL=BOM alternative, ADATU/BDATU תוקף, BSTMI/BSTMA טווח כמות)."],
      troubleshootHe: ["MRP לא מוצא Production Version ➔ בדוק תוקף, טווח כמות ו-Consistency Check (אדום)."],
      tipsHe: ["שמור על Production Version אחת ברורה לכל חומר; ריבוי גרסאות מסבך את בחירת ה-MRP."],
      pitfallsHe: ["היעדר Production Version ב-S/4HANA = כשל קשיח ב-MRP/המרת הזמנה מתוכננת."],
      cbcHe: "ב-CBC כל מוצר מיוצר חייב Production Version תקפה — זה תנאי סף להרצת ה-MRP על קווי המילוי.",
    },
  ],
  "4": [
    {
      id: "4.1", titleHe: "נתוני אב בתעשיות תהליך", titleEn: "Master Data in Process Industries",
      explanationHe:
        "בייצור תהליכי נתוני האב הייחודיים: משאב (Resource — מקביל למרכז עבודה, CRHD), רשימת חומרים (BOM), מתכון ראשי (Master Recipe — PLKO מסוג Task List 2) וגרסת ייצור (MKAL — חובה). המתכון מחזיק שלבים (Phases), פעולות, רכיבים, אמצעי ייצור (PRT) ונתוני תהליך.",
      scenarioHe:
        "ייצור משקה: משאב 'קו מילוי', מתכון ראשי עם פאזות ערבול ➔ מילוי ➔ אריזה, רכיבים (תרכיז/סוכר/CO2) מוקצים לפאזות, וגרסת ייצור המקשרת מתכון ל-BOM.",
      configHe: [
        "CRC1 (Resource), C201/C202/C203 (Master Recipe), C223 (Production Version).",
        "סוג רשימת משימות 2 למתכון ראשי; שיוך לחומר דרך MAPL.",
      ],
      masterDataHe: ["PLKO/PLPO (מתכון/פעולות) · PLPH (Phases) · MAPL (שיוך) · MKAL (גרסה) · CRHD (משאב)."],
      cbcHe: "זהו לב ה-PP-PI ב-CBC: המתכון הראשי מגדיר את תהליך ייצור המשקה ומשמש בסיס למתכון הבקרה וה-PI Sheet.",
      pitfallsHe: ["מתכון ללא Phases/Control Key תהליכי לא יפיק Control Recipe."],
    },
    {
      id: "4.2", titleHe: "פרופיל המתכון הראשי (Master Recipe Profile)", titleEn: "Master Recipe Profile",
      explanationHe:
        "פרופיל המתכון (OPN1) קובע ערכי ברירת מחדל ביצירת מתכון ראשי — ובמיוחד את אופן ניהול התהליך: Process Instructions, XSTEPS, או XSTEPS OPTIONAL. הבחירה קובעת כיצד נכתבות הוראות התהליך וה-PI Sheets.",
      configHe: [
        "OPN1 — Define Master Recipe Profiles; נתיב IMG: Production Planning for Process Industries ► Master Data ► Master Recipe ► Settings for the Task List Type.",
        "שדה Process Instruction Maintenance: PI / XSteps / XSteps Optional.",
      ],
      troubleshootHe: ["לא ניתן להזין הוראות תהליך ➔ הפרופיל אינו מאפשר את הסוג שנבחר."],
      tipsHe: ["העדף XSteps (גמיש, מודרני) למימושים חדשים; מעבר מ-PI ל-XSteps הוא חד-כיווני."],
      pitfallsHe: ["XSTEPS OPTIONAL מאפשר שתי שיטות אך לא בו-זמנית — בחירה שגויה מקבעת את התהליך."],
    },
    {
      id: "4.3", titleHe: "שיוך רשימת משימות וסטטוס", titleEn: "Task List Assignment & Status",
      explanationHe:
        "סוג רשימת משימות 2 משמש למתכון ראשי. שיוך החומר נעשה דרך MAPL. סטטוס רשימת המשימות (Status 1 Creation ➔ 4 Released) קובע אם המתכון זמין לפק\"ע, לתמחיר ולבדיקת עקביות.",
      configHe: [
        "OP46 — Define Recipe Status; Assign Material Types ל-Task List Type 2.",
        "Status 4 מאפשר שימוש בייצור (RelInd), בעלות (Cstng) ובדיקת עקביות (Cons.chk).",
      ],
      troubleshootHe: ["מתכון לא נבחר בפק\"ע ➔ Status אינו 'משוחרר' (4) או שיוך החומר חסר."],
      tipsHe: ["בצע Consistency Check לפני שחרור — מאתר פערים במתכון מבעוד מועד."],
    },
    {
      id: "4.4", titleHe: "פרמטרים תלויי סוג-הזמנה", titleEn: "Order Type–Dependent Parameters",
      explanationHe:
        "פרמטרים תלויי סוג-הזמנה (פר-מפעל) קובעים לפק\"ע התהליכי: גישה לרשימות משימות, תזמון, בדיקת זמינות, תמחיר, רמת עלות, מסמכי שינוי ותנועות סחורה. נחלקים ללשוניות Master Data / Planning / Implementation / Cost Accounting.",
      configHe: [
        "COR4 — Order Type–Dependent Parameters (Process Order); OPJH/OIOA — Order Types.",
        "לשונית Master Data: Routing/Recipe selection; Planning: scheduling/availability; Implementation: Process Management; Cost Accounting: costing variants.",
      ],
      pitfallsHe: ["הגדרה חסרה ללשונית Implementation ➔ Process Management/Control Recipe לא יפעלו."],
    },
    {
      id: "4.5", titleHe: "ניהול תהליך — הודעות תהליך (Process Messages)", titleEn: "Process Messages",
      explanationHe:
        "הודעות תהליך (Process Messages) מעבירות נתוני ביצוע מהשטח (PI Sheet/מערכת בקרה) חזרה ל-SAP: דיווח כמות, צריכה, מדידות. מורכבות ממאפיין הודעה (Characteristic), קטגוריית הודעה (Category) ויעד (Destination — פק\"ע, מלאי, QM, או יעד חיצוני).",
      configHe: [
        "O10C (Process Message Characteristics), O04C/O05C (Categories), O12C (Destinations).",
        "CO53 (Control Recipe Monitor), CO54 (Process Message Monitor) לניטור.",
      ],
      masterDataHe: ["מאפייני הודעה מבוססי Characteristics (CT04) של מערכת הסיווג."],
      cbcHe: "ב-CBC הודעות התהליך הן נקודת האינטגרציה: ה-PI Sheet/מערכת הבקרה מחזיר דיווחי מילוי וצריכה ל-SAP, ומשם ל-Zetes/Daymax.",
      troubleshootHe: ["הודעת תהליך לא מעדכנת פק\"ע ➔ בדוק Destination ומיפוי המאפיין."],
    },
    {
      id: "4.6", titleHe: "הוראות תהליך ו-XSteps", titleEn: "Process Instructions & XSteps",
      explanationHe:
        "הוראות תהליך (Process Instructions) או XSteps מגדירות מה יוצג ב-PI Sheet ואילו נתונים נאספים. סוגי הוראה (Process Instruction Types) וקטגוריות מותאמות-אישית מאפשרות מבנה ייעודי. אשף (Wizard) מסייע בהגדרה. XSteps הם הדור המתקדם — מודולריים וניתנים לשימוש חוזר.",
      configHe: [
        "O09C (Process Instruction Categories), O13C (Characteristics); Wizard / Process Instruction Assistant ביצירת מתכון.",
        "Scope of Generation מצמצם את היקף תחזוקת ההוראות.",
      ],
      tipsHe: ["בנה ספריית XSteps לשימוש חוזר בין מתכונים — מצמצם תחזוקה משמעותית."],
      pitfallsHe: ["הוראות תהליך מורכבות מדי ➔ PI Sheets כבדים וקשים לתפעול בשטח."],
    },
    {
      id: "4.7", titleHe: "מתכון בקרה ויעד מתכון בקרה (Control Recipe)", titleEn: "Control Recipe & Destination",
      explanationHe:
        "מתכון הבקרה (Control Recipe) נוצר מפק\"ע התהליכי ומכיל את הוראות הביצוע לשטח. יעד מתכון הבקרה (Control Recipe Destination) קובע לאן הוא נשלח: PI Sheet ידני, מערכת בקרת תהליך (PCS) חיצונית, או XSteps. נשלח דרך CO53.",
      configHe: [
        "O25C/O27C — Control Recipe Destinations; Production Scheduling Profile מקשר יעד לסוג פק\"ע.",
        "CO53 שליחת מתכוני בקרה; CO55 עיבוד PI Sheet.",
      ],
      troubleshootHe: ["מתכון בקרה לא נוצר ➔ פרופיל תזמון ללא יעד, או מתכון ללא הוראות תהליך."],
      cbcHe: "ב-CBC יעד מתכון הבקרה מנתב את הוראות הייצור למערכת הבקרה/Zetes; LOIPRO מפיץ את הפק\"ע במקביל.",
    },
    {
      id: "4.8", titleHe: "פרופיל תזמון ייצור תהליכי", titleEn: "Process Production Scheduling Profile",
      explanationHe:
        "בדומה לייצור בדיד, הפרופיל מרכז אוטומציות לפק\"ע התהליכי: שחרור אוטומטי, יצירת ושליחת מתכון בקרה אוטומטית, סוג GR, וטיפול בהודעות תהליך. שדה Production Scheduling Profile באב החומר (Work Scheduling).",
      configHe: [
        "OPKP — Production Scheduling Profile; כולל Control Recipe Destination ו-Scope of Generation.",
        "אוטומציות שליחה/קבלה של מתכוני בקרה והודעות תהליך.",
      ],
      tipsHe: ["הפעל יצירת מתכון בקרה אוטומטית רק לאחר ולידציה מלאה של ההוראות וה-XSteps."],
      pitfallsHe: ["פרופיל ללא Control Recipe Destination ➔ הפק\"ע לא תפיק מתכון בקרה לשטח."],
    },
    {
      id: "4.9", titleHe: "סקירת ניהול התהליך (Process Management)", titleEn: "Process Management Overview",
      explanationHe:
        "Process Management הוא המנגנון המקשר בין הפק\"ע התהליכי לביצוע בשטח: מתכון בקרה ➔ PI Sheet/PCS ➔ הוראות תהליך ➔ הודעות תהליך חזרה ל-SAP (דיווח, צריכה, מדידות, אצוות). זהו ייחוד ה-PP-PI מול ייצור בדיד.",
      configHe: ["CO53 Control Recipe Monitor · CO55 PI Sheet · CO54 Process Message Monitor · CORK דיווח/סגירה."],
      cbcHe: "ב-CBC כל מחזור הייצור התהליכי עובר דרך Process Management — זו השכבה שמחברת את SAP למערכות הביצוע (Zetes/Daymax) ומבטיחה עקיבות אצווה.",
      troubleshootHe: ["פערי דיווח ➔ נטר ב-CO54 הודעות תהליך תקועות; ודא מיפוי Destination נכון."],
    },
  ],
};

export const PP_DEEP_STATS = Object.fromEntries(
  Object.entries(PP_DEEP).map(([ch, units]) => [
    ch,
    {
      units: units.length,
      fields: units.reduce(
        (s, u) =>
          s +
          [u.scenarioHe, u.cbcHe].filter(Boolean).length +
          (u.configHe?.length ?? 0) + (u.masterDataHe?.length ?? 0) +
          (u.troubleshootHe?.length ?? 0) + (u.tipsHe?.length ?? 0) + (u.pitfallsHe?.length ?? 0),
        0,
      ),
    },
  ]),
);
