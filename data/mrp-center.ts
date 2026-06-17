// MRP / MPS Center — dedicated planning learning content. Hand-written from
// SAP PP knowledge. Tables/T-Codes are real SAP objects.

import type { EccS4 } from "@/components/ecc-s4-block";

export interface MrpSection {
  id: string;
  he: string;
  body: string;
  points: string[];
  tables?: string[];
  tcodes?: string[];
  eccS4?: EccS4;
}

export const MRP_SECTIONS: MrpSection[] = [
  { id: "fundamentals", he: "יסודות MRP", body: "MRP (Material Requirements Planning) מתרגם ביקוש להיצע: לכל חומר הוא מחשב דרישות נטו (ביקוש פחות מלאי וכניסות מתוכננות), מיישם שיטת אצווה (Lot-Sizing), ומתזמן לאחור/קדימה לפי זמני אספקה — ויוצר הזמנות מתוכננות (ייצור) או דרישות רכש (קנייה).", points: ["דרישות נטו = ביקוש − מלאי זמין − כניסות מתוכננות", "מקור דרישה: PIR, הזמנות לקוח, דרישות תלויות (BOM), מלאי בטחון", "תוצר: הזמנה מתוכננת (PLAF) / דרישת רכש (EBAN)", "MRP Type ב-MRP1 קובע שיטת תכנון (PD/VB/ND/M*)"], tables: ["MDKP", "MDTB", "PLAF", "MDVM"], tcodes: ["MD01N", "MD02", "MD04"] },
  { id: "live-vs-classic", he: "MRP Live מול MRP קלאסי", body: "MRP קלאסי (MD01) רץ על בסיס הנתונים המסורתי בעיבוד batch כבד. MRP Live (MD01N) ב-S/4HANA רץ עם push-down ל-HANA — מהיר פי כמה, ברמת חומר, ללא טבלאות ביניים. חלק מהתרחישים (subcontracting מורכב, חלק מהפרמטרים) עדיין נופלים ל-classic.", points: ["MD01 — batch קלאסי על DB", "MD01N — HANA push-down, ברמת חומר, מהיר", "Planning File (MDVM) קובע מה לתכנן (Net Change)", "חלק מ-User Exits של MRP לא נתמכים ב-Live → BAdI MD_*"], tables: ["MDKP", "PLAF", "MDVM"], tcodes: ["MD01", "MD01N"],
    eccS4: { unchanged: "תוצרי התכנון (הזמנות מתוכננות/PR) זהים.", changed: "מנוע MRP Live על HANA — מהיר, ברמת חומר.", replaced: "MD01 → MD01N.", deprecated: "MRP List (MD05) פחות מרכזי; פרמטרים/exits מסוימים לא נתמכים.", fiori: "Monitor Material Coverage / Manage Material Coverage", simplification: "MRP in S/4HANA (MRP Live).", migration: "QA: השווה MD01→MD01N (כיסוי+ביצועים); בדוק subcontracting ו-BAdIs." } },
  { id: "mps", he: "MPS — תכנון ייצור ראשי", body: "MPS (Master Production Scheduling) מתכנן בנפרד פריטים קריטיים (מוצרי גמר, צווארי בקבוק) עם בקרה הדוקה לפני MRP הכללית, כדי לייצב את התכנית. פריט מסומן MPS דרך MRP Type M0-M3, מתוכנן ב-MD41, ומקובע (Firming) להגנה מפני שינויים אוטומטיים.", points: ["MPS = תכנון נפרד+יציב לפריטים קריטיים", "MRP Type M0/M1/M2/M3 מסמן פריט MPS", "Planning Time Fence + Firming מגנים על התכנית", "לאחר ייצוב — MRP מפצץ רכיבים תלויים"], tables: ["MARC", "MDKP", "PLAF"], tcodes: ["MD41", "MD42", "MD43"] },
  { id: "pir-forecast", he: "PIR ותחזית", body: "PIR (Planned Independent Requirements) הן תחזית הביקוש שמזינה MRP בייצור-למלאי. ניתן להזין ידנית (MD61) או מתוצאת מודל תחזית (Forecast) בנתוני אב החומר. PIR נצרכות מול הזמנות לקוח בפועל לפי אסטרטגיית התכנון.", points: ["PIR = תחזית; גרסת דרישות 00 = פעילה", "Forecast model (MP30) מחשב תחזית מנתוני עבר", "צריכה (Consumption) מקזזת תחזית מול מכירות בפועל", "MD74/MD75 — ארגון מחדש של PIR ישנות"], tables: ["PBIM", "PBED", "PROP"], tcodes: ["MD61", "MD62", "MP30", "MP38"] },
  { id: "strategies", he: "אסטרטגיות תכנון", body: "אסטרטגיית התכנון (Strategy Group ב-MRP3) קובעת כיצד מתנהלים ביקוש והיצע — ייצור-למלאי (MTS) מול ייצור-להזמנה (MTO), שימוש בתחזית וצריכתה. הבחירה משפיעה על Requirements Type, על קיזוז התחזית, ועל מתי מתחיל הייצור.", points: ["ראה טבלת אסטרטגיות למטה (10/11/20/40/50/70)", "Strategy Group → Requirements Type (LSF/VSF/KSV/KEV)", "Consumption Mode/Periods קובעים קיזוז תחזית↔מכירות", "MTS = ייצור למלאי לפי תחזית; MTO = ייצור נגד הזמנה"], tables: ["MARC", "T459K", "T461"], tcodes: ["MM02", "OPPS"] },
  { id: "netchange", he: "Net Change מול Regenerative", body: "Net Change Planning (NETCH) מתכנן רק חומרים שהשתנו מאז הריצה האחרונה (לפי Planning File) — מהיר ויומיומי. Regenerative Planning (NEUPL) מתכנן מחדש את כל החומרים בהיקף — כבד, לתיקון/אתחול. Net Change בתוך אופק התכנון (NETPL) מגביל לאופק.", points: ["NETCH — רק מה שהשתנה (Planning File)", "NEUPL — תכנון מלא מחדש (regenerative)", "NETPL — Net change בתוך אופק התכנון", "Planning File (MDVM/DBVM) מסמן חומרים לתכנון"], tables: ["MDVM", "DBVM"], tcodes: ["MD01N", "MDAB", "MDRE"] },
  { id: "mrp-areas", he: "MRP Areas", body: "MRP Area מאפשר תכנון ברזולוציה דקה מהמפעל — לפי מחסן, אזור, או ספק משנה. חומר יכול להיתכנן בנפרד לכל MRP Area עם פרמטרים שונים, לשליטה מקומית בזמינות (למשל מחסן ייצור מול מחסן ראשי).", points: ["MRP Area = תכנון תת-מפעלי (מחסן/Subcontractor)", "חומר מוקצה ל-MRP Area בנתוני אב", "ב-S/4 MRP Area פעיל כברירת מחדל (לפחות אחד למפעל)", "שימושי להפרדת מלאי ייצור ממלאי מכירה"], tables: ["MDLV", "MDMA"], tcodes: ["MDLV", "MD01N"],
    eccS4: { unchanged: "מנגנון MRP Area קיים.", changed: "ב-S/4 MRP Areas מופעלים אוטומטית (חובה).", migration: "QA: ודא הקצאת חומרים ל-MRP Areas לאחר המרה." } },
  { id: "lot-safety", he: "Lot-Sizing, מלאי בטחון, נקודת הזמנה", body: "שיטת האצווה (Lot Size) קובעת כמה להזמין: Lot-for-Lot (EX), כמות קבועה (FX), תקופתית (שבועי/חודשי). מלאי בטחון (Safety Stock) מגן מפני תנודתיות. נקודת הזמנה (Reorder Point, VB) מפעילה הזמנה כשהמלאי יורד מתחת לסף — תכנון צריכה ללא MRP מלא.", points: ["Lot Size: EX (lot-for-lot), FX (קבוע), תקופתי", "Safety Stock — מאגר ביטחון מפני חוסר", "Reorder Point (MRP Type VB) — תכנון מבוסס-צריכה", "Safety Stock דינמי לפי טווח כיסוי אפשרי"], tables: ["MARC", "T438A"], tcodes: ["MM02", "MD04"] },
  { id: "prod-version", he: "תפקיד גרסת הייצור", body: "גרסת ייצור (Production Version) מקשרת BOM + מסלול/מתכון לשילוב ייצור תקף. ב-S/4 היא חובה לתרחישי MRP Live ו-PP-DS — בלי גרסה תקפה החומר לא נתכנן/לא ניתן ליצור פקודה. נקבעת ב-C223 או בנתוני אב.", points: ["גרסת ייצור = BOM + מסלול/מתכון תקפים", "חובה ב-S/4 ל-MRP Live / PP-DS", "בחירה לפי lot size / תאריך / עדיפות", "מנוהלת ב-C223 / Manage Production Versions"], tables: ["MKAL"], tcodes: ["C223", "MM02"],
    eccS4: { unchanged: "מודל MKAL זהה.", changed: "גרסת ייצור חובה לתרחישי MRP Live/PP-DS.", fiori: "Manage Production Versions", migration: "QA: ודא גרסה תקפה לכל חומר מיוצר — קריטי במיגרציה." } },
];

export interface PlanningStrategy { key: string; he: string; desc: string; reqType: string; consumption: string }
export const PLANNING_STRATEGIES: PlanningStrategy[] = [
  { key: "10", he: "ייצור-למלאי נטו (MTS)", desc: "תכנון לפי PIR בלבד; הזמנות לקוח לא יוצרות דרישה נוספת (נמשכות מהמלאי).", reqType: "LSF", consumption: "ללא צריכה — תכנון נטו לפי תחזית" },
  { key: "11", he: "ייצור-למלאי ברוטו", desc: "תכנון לפי PIR ברוטו ללא התחשבות במלאי — לייצור רציף/קצב קבוע.", reqType: "BSF", consumption: "ללא קיזוז מלאי" },
  { key: "20", he: "ייצור-להזמנה (MTO) טהור", desc: "ייצור רק נגד הזמנת לקוח; ללא תחזית. מלאי/עלות נשמרים לפי הזמנה.", reqType: "KE", consumption: "ללא תחזית" },
  { key: "40", he: "MTS עם תכנון סופי", desc: "תחזית (PIR) + הזמנות לקוח; הזמנות צורכות את התחזית. הנפוץ ביותר ל-MTS.", reqType: "VSF", consumption: "הזמנות לקוח צורכות PIR" },
  { key: "50", he: "תכנון ללא הרכבה סופית", desc: "תכנון רכיבים/הרכבות מראש לפי תחזית; ההרכבה הסופית רק נגד הזמנה.", reqType: "VSE", consumption: "הזמנה מפעילה הרכבה סופית" },
  { key: "70", he: "תכנון ברמת הרכבה", desc: "תכנון תחזית לרמת הרכבה/חצי-מוצר; שימושי ב-BOM רב-מפלסי.", reqType: "VSEB", consumption: "צריכה ברמת ההרכבה" },
];

export const MRP_TCODES = ["MD01N", "MD01", "MD02", "MD03", "MD04", "MD05", "MD06", "MD07", "MD41", "MD61", "MD62", "MD63"];
