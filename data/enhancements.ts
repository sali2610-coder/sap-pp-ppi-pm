// Enhancement Center — authored reference on SAP enhancement techniques.
// Hand-written, ECC + S/4 + PM/PP examples. Not generated.

export interface Enhancement {
  slug: string;
  title: string;   // EN
  he: string;
  kind: "Exit" | "BAdI" | "Framework";
  def: string;     // what it is
  how: string;     // how to implement (tcodes/steps)
  ecc: string;
  s4: string;
  pmExample: string;
  ppExample: string;
  scenario: string;   // realistic business scenario
  tcodes: string[];
  note?: string;      // verification caveat
}

export const ENHANCEMENTS: Enhancement[] = [
  { slug: "user-exit", title: "User Exit", he: "User Exit", kind: "Exit",
    def: "נקודות הרחבה ותיקות — קוד לקוח ב-includes ייעודיים (PERFORM) שמסופקים ע\"י SAP.",
    how: "מאתרים את ה-Exit הרלוונטי (לרוב MV*/SAPMV* includes), נדרש Access Key לאובייקט, כותבים קוד ב-Z-include.",
    ecc: "נפוץ במיוחד ב-SD/PM/PP; דורש שינוי ישיר באובייקט SAP.", s4: "נתמך אך לא מומלץ — Clean Core מעדיף BAdI/Extension Point.",
    pmExample: "בדיקת שדה חובה בשמירת הזמנת אחזקה (IW31).", ppExample: "אימות לוגי בשחרור פקודת ייצור.",
    scenario: "הארגון דורשת שדה מותאם חובה בהזמנת אחזקה — User Exit חוסם שמירה אם ריק.", tcodes: ["SE38", "SE80"],
    note: "שמות Exit ספציפיים תלויי-גרסה — אמת ב-SMOD/SE38." },
  { slug: "customer-exit", title: "Customer Exit", he: "Customer Exit", kind: "Exit",
    def: "הרחבות מנוהלות דרך SMOD (הגדרה) ו-CMOD (פרויקט) — Function/Screen/Menu exits.",
    how: "מאתרים Enhancement ב-SMOD, יוצרים Project ב-CMOD, משייכים, ממשים את EXIT_* (כולל Z-include), מפעילים.",
    ecc: "מנגנון הרחבה סטנדרטי לפני BAdI.", s4: "נתמך; מועדף BAdI.",
    pmExample: "Function Exit להוספת ולידציה בנתוני ציוד.", ppExample: "Screen Exit להוספת שדה למסך מתכון אב.",
    scenario: "הוספת לשונית מותאמת לנתוני ציוד דרך Screen Exit מנוהל ב-CMOD.", tcodes: ["CMOD", "SMOD"] },
  { slug: "classic-badi", title: "Classic BAdI", he: "BAdI קלאסי", kind: "BAdI",
    def: "נקודת הרחבה מונחית-עצמים מהדור הקודם — מבוססת ממשק, ניתנת למימושים מרובים.",
    how: "SE18 לאיתור הגדרה, SE19 ליצירת מימוש, ממשים מתודות הממשק.",
    ecc: "מנגנון ההרחבה ה-OO המרכזי ב-ECC.", s4: "נתמך; מומר בהדרגה ל-New BAdI / Enhancement Spot.",
    pmExample: "BAdI WORKORDER_UPDATE להתערבות בשמירת הזמנת אחזקה.", ppExample: "BAdI בעיבוד פקודת תהליך.",
    scenario: "עדכון שדה סטטוס חיצוני בכל שמירה של הזמנת אחזקה דרך WORKORDER_UPDATE.", tcodes: ["SE18", "SE19"] },
  { slug: "new-badi", title: "New BAdI (Enhancement Spot)", he: "BAdI חדש", kind: "BAdI",
    def: "BAdI מבוסס Enhancement Spot — Filters, Multiple-use, ניהול ב-Enhancement Framework.",
    how: "מגדירים ב-Enhancement Spot (SE20/ADT), ממשים ב-BAdI implementation, תומך Filter values.",
    ecc: "זמין מ-NW7.0; פחות נפוץ.", s4: "הדרך המומלצת להרחבה (Clean Core) לצד Extension Points.",
    pmExample: "Filter-BAdI לפי סוג הזמנה (PM01/PM02).", ppExample: "BAdI עם Filter לפי סוג פקודת תהליך.",
    scenario: "לוגיקה שונה לכל סוג הזמנת אחזקה דרך Filter-enabled New BAdI.", tcodes: ["SE18", "SE19", "SE20"] },
  { slug: "implicit-enhancement", title: "Implicit Enhancement", he: "הרחבה משתמעת", kind: "Framework",
    def: "נקודות הרחבה אוטומטיות בתחילת/סוף כל subroutine/FM/method — ללא הכנה מצד SAP.",
    how: "ב-ADT/SE80 מציגים Enhancement Points, יוצרים Enhancement Implementation, מוסיפים קוד.",
    ecc: "Enhancement Framework (NW7.0+).", s4: "נתמך; להעדיף נקודות מפורשות/BAdI כשקיימות.",
    pmExample: "קוד נוסף בסוף FM של עיבוד הודעת תקלה.", ppExample: "לוגיקה בתחילת FM של חישוב כמויות.",
    scenario: "הוספת לוגירה בסוף FM סטנדרטי ללא BAdI זמין — Implicit enhancement.", tcodes: ["SE80", "SE19"],
    note: "Implicit enhancements שבירים בשדרוג — תעד היטב." },
  { slug: "explicit-enhancement", title: "Explicit Enhancement", he: "הרחבה מפורשת", kind: "Framework",
    def: "נקודות הרחבה ש-SAP הגדירה מראש בקוד (ENHANCEMENT-POINT / ENHANCEMENT-SECTION).",
    how: "מאתרים את ה-Point בקוד, יוצרים Enhancement Implementation, מוסיפים/מחליפים לוגיקה.",
    ecc: "Enhancement Framework.", s4: "נתמך ומועדף על Implicit.",
    pmExample: "ENHANCEMENT-POINT בעיבוד הזמנת אחזקה.", ppExample: "ENHANCEMENT-SECTION בחישוב עלות פקודה.",
    scenario: "החלפת בלוק חישוב ב-ENHANCEMENT-SECTION שסיפקה SAP.", tcodes: ["SE80", "SE19"] },
  { slug: "field-exit", title: "Field Exit", he: "Field Exit (Legacy)", kind: "Exit",
    def: "ולידציה ברמת שדה מסך (ישן מאוד) — כמעט לא בשימוש כיום.",
    how: "הוגדר דרך CMOD/Field Exit; הוחלף ע\"י screen logic/BAdI.",
    ecc: "Legacy; נדיר.", s4: "מיושן — אל תשתמש; העדף BAdI/validation.",
    pmExample: "ולידציה היסטורית על שדה במסך PM.", ppExample: "—",
    scenario: "קוד תחזוקה ישן בלבד; במיגרציה יש להמיר ל-BAdI.", tcodes: ["CMOD"],
    note: "מיושן — נכלל לשלמות היסטורית בלבד." },
  { slug: "bte", title: "Business Transaction Events (BTE)", he: "BTE", kind: "Framework",
    def: "מנגנון הרחבה מבוסס אירועים (בעיקר FI) — P/S interfaces.",
    how: "FIBF להגדרה; רושמים FM ל-event (Publish & Subscribe / Process).",
    ecc: "נפוץ ב-FI/לוגיסטיקה.", s4: "נתמך; לתרחישים חדשים העדף BAdI/Events.",
    pmExample: "—", ppExample: "אירוע בעיבוד מסמך חומר מפקודת ייצור.",
    scenario: "הפעלת לוגיקה חיצונית באירוע רישום מסמך — BTE.", tcodes: ["FIBF"],
    note: "רלוונטי בעיקר ל-FI; אמת לפי תחום." },
  { slug: "enhancement-spot", title: "Enhancement Spot", he: "Enhancement Spot", kind: "Framework",
    def: "מיכל (container) המגדיר נקודות הרחבה מפורשות ו-BAdIs חדשים תחת Enhancement Framework.",
    how: "SE20 ליצירת Spot; מכיל BAdI definitions / Enhancement Points; ממשים דרך SE19.",
    ecc: "זמין מ-NW7.0.", s4: "מרכזי להרחבה מסודרת (Clean Core) לצד Extension Points.",
    pmExample: "Enhancement Spot להזמנת אחזקה.", ppExample: "Enhancement Spot בעיבוד פקודת תהליך.",
    scenario: "ריכוז כל ה-BAdIs של תהליך אחזקה תחת Spot אחד מנוהל.", tcodes: ["SE20", "SE19"] },
  { slug: "vofm", title: "VOFM Routines", he: "שגרות VOFM", kind: "Exit",
    def: "שגרות התאמה ל-SD/לוגיסטיקה (תמחור, דרישות, העברת נתונים, נוסחאות).",
    how: "VOFM; שגרות Requirements/Data Transfer/Formulas; נדרש Access Key; משויכות ב-Customizing.",
    ecc: "נפוצות ב-SD/תמחור.", s4: "נתמכות; להעדיף BAdI/Extension כשאפשר.",
    pmExample: "—", ppExample: "שגרת דרישה לקביעת מקור/אספקה.",
    scenario: "התאמת לוגיקת תמחור/דרישה דרך VOFM קיים.", tcodes: ["VOFM"],
    note: "תחום SD/לוגיסטיקה — אמת רלוונטיות." },
  { slug: "substitution-validation", title: "Substitution & Validation", he: "החלפה ואימות (GGB0/GGB1)", kind: "Framework",
    def: "כללי אימות (Validation) והחלפת ערכים (Substitution) ב-FI/CO ללא קוד — מבוססי Boolean.",
    how: "GGB0 (Validation) / GGB1 (Substitution); הפעלה ב-OB28/OKC7; User Exit אופציונלי לנוסחה מורכבת.",
    ecc: "סטנדרטי ב-FI/CO.", s4: "נתמך; חלק מההחלפות מומרות ל-BAdI/BRF+.",
    pmExample: "אימות ייחוס חשבונאי בהזמנת אחזקה.", ppExample: "החלפת מרכז רווח בעלות פק\"ע.",
    scenario: "אכיפת מרכז עלות תקין ברישומי פקודה דרך Validation.", tcodes: ["GGB0", "GGB1", "OB28"],
    note: "תחום FI/CO." },
  { slug: "transaction-variant", title: "Transaction / Screen Variant", he: "וריאנט טרנזקציה/מסך", kind: "Framework",
    def: "התאמת מסך ללא קוד — הסתרה/חובה/ערך ברירת מחדל לשדות בטרנזקציה.",
    how: "SHD0 (Transaction Variant) / Screen Variant; שיוך לטרנזקציה או Variant Transaction.",
    ecc: "סטנדרטי.", s4: "נתמך ב-GUI; ב-Fiori התאמה דרך UI Adaptation.",
    pmExample: "הסתרת שדות לא-רלוונטיים במסך הזמנת אחזקה.", ppExample: "ערכי ברירת מחדל במסך פקודת תהליך.",
    scenario: "פישוט מסך IW31 לטכנאים ע\"י Transaction Variant.", tcodes: ["SHD0"] },
  { slug: "key-user-extensibility", title: "Key User / Developer Extensibility", he: "הרחבת Key-User (S/4)", kind: "Framework",
    def: "הרחבה ללא-קוד/מעט-קוד ב-S/4HANA — שדות מותאמים, לוגיקה, CDS ו-OData דרך כלי Fiori.",
    how: "Custom Fields & Logic (Fiori), Custom CDS Views, Custom Business Objects; Developer Extensibility = ABAP Cloud בתוך עננת ההרחבה.",
    ecc: "לא קיים (הרחבה קלאסית בלבד).", s4: "הדרך המומלצת ל-Clean Core — In-App + Side-by-Side (BTP).",
    pmExample: "הוספת שדה מותאם להזמנת אחזקה דרך Custom Fields.", ppExample: "לוגיקת ולידציה בפקודת תהליך דרך Custom Logic (BAdI חשוף).",
    scenario: "הארגון מוסיפה שדה+לוגיקה לפקודה ללא שינוי ליבה, נשמר בשדרוג.", tcodes: ["Fiori: Custom Fields and Logic"] },
];

export const enhancementBySlug = (s: string) => ENHANCEMENTS.find((e) => e.slug === s);
