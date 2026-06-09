"use client";

// Lightweight, dependency-free i18n: HE (rtl) <-> EN (ltr). Persists choice,
// flips <html dir/lang>, exposes a UI-string dictionary + a `pick(he,en)`
// helper for the bilingual data layer.

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "he" | "en";

type Dict = Record<string, { he: string; en: string }>;

const DICT: Dict = {
  "nav.home": { he: "ראשי", en: "Home" },
  "nav.pm": { he: "אחזקה (PM)", en: "Maintenance (PM)" },
  "nav.ppi": { he: "ייצור (PP-PI)", en: "Production (PP-PI)" },
  "nav.library": { he: "ספרייה", en: "Library" },
  "nav.chat": { he: "צ'אט AI", en: "AI Chat" },
  "search.placeholder": { he: "חיפוש טבלה, T-Code, BAPI…", en: "Search table, T-Code, BAPI…" },
  "search.hint": { he: "הקלד כדי לחפש בכל מסד הנתונים — 126 טבלאות, PM ו-PP-PI.", en: "Type to search the whole database — 126 tables, PM & PP-PI." },
  "search.empty": { he: "לא נמצאו תוצאות", en: "No results found" },
  "search.tables": { he: "טבלאות", en: "Tables" },
  "search.tcodes": { he: "טרנזקציות (T-Codes)", en: "T-Codes" },
  "search.bapis": { he: "ממשקים (Interfaces)", en: "Interfaces" },
  "search.library": { he: "ספרייה — Book 1", en: "Library — Book 1" },
  "search.nav": { he: "ניווט", en: "Navigate" },
  "search.open": { he: "פתח", en: "Open" },
  "tcode.viewTables": { he: "הצג טבלאות משויכות", en: "View Associated Tables" },
  "tcode.usedBy": { he: "טבלאות עיקריות", en: "Primary tables" },
  "hero.badge": { he: "CBC Israel · Project NEO", en: "CBC Israel · Project NEO" },
  "hero.tagline": {
    he: "מקור אמת יחיד למיגרציית SAP ECC ➔ S/4HANA — ניהול סטטוס מיגרציה ומילון נתונים טכני, במקום אחד, 100% Offline.",
    en: "Single source of truth for the SAP ECC ➔ S/4HANA migration — status tracking and a technical data dictionary, in one place, 100% offline.",
  },
  "hero.stat.tables": { he: "טבלאות", en: "tables" },
  "hero.stat.modules": { he: "2 מודולים · PM · PP-PI", en: "2 modules · PM · PP-PI" },
  "hero.stat.search": { he: "⌘K חיפוש מהיר", en: "⌘K quick search" },
  "hub.pm.title": { he: "SAP PM Hub", en: "SAP PM Hub" },
  "hub.pm.subtitle": { he: "אחזקת מפעל · Plant Maintenance", en: "Plant Maintenance" },
  "hub.pm.desc": { he: "ציוד, מיקומים פונקציונליים, הודעות ופקודות עבודה, אחזקה מונעת.", en: "Equipment, functional locations, notifications & work orders, preventive maintenance." },
  "hub.ppi.title": { he: "SAP PP-PI Hub", en: "SAP PP-PI Hub" },
  "hub.ppi.subtitle": { he: "תכנון ייצור תהליכי · Process Industries", en: "Process Industries Planning" },
  "hub.ppi.desc": { he: 'אב חומר, עצי מוצר, מתכוני ייצור, גרסאות ייצור, פק"ע וממשקי Zetes/Daymax.', en: "Material master, BOMs, master recipes, production versions, process orders & Zetes/Daymax interfaces." },
  "tab.cockpit": { he: "קוקפיט מיגרציה", en: "Migration Cockpit" },
  "tab.blueprint": { he: "Blueprint טכני", en: "Technical Blueprint" },
  "tab.guides": { he: "מדריכים וכלים", en: "Guides & Tools" },
  "hub.searchInModule": { he: "חיפוש בתוך המודול…", en: "Search within module…" },
  "hub.progress": { he: "התקדמות מיגרציה", en: "Migration progress" },
  "hub.tables": { he: "טבלאות", en: "tables" },
  "hub.savedLocal": { he: "סטטוס נשמר מקומית בדפדפן (localStorage)", en: "Status saved locally in the browser (localStorage)" },
  "sec.func": { he: "הסבר פונקציונלי", en: "Functional description" },
  "sec.mapping": { he: "Mapping · ECC → Fiori / S/4HANA", en: "Mapping · ECC → Fiori / S/4HANA" },
  "sec.dict": { he: "Data Dictionary", en: "Data Dictionary" },
  "sec.interface": { he: "Interface Layer · BAPIs / IDoc / Programs", en: "Interface Layer · BAPIs / IDoc / Programs" },
  "sec.sql": { he: "Developer SQL Snippet (JOIN)", en: "Developer SQL Snippet (JOIN)" },
  "sec.relations": { he: "Relations · קשרי מפתח (PK / FK)", en: "Relations · Key relationships (PK / FK)" },
  "rel.parent": { he: "אב ◄", en: "Parent ◄" },
  "rel.child": { he: "► ילד", en: "► Child" },
  "status.label": { he: "סטטוס מיגרציה:", en: "Migration status:" },
  "io.export": { he: "ייצוא סטטוס", en: "Export status" },
  "io.import": { he: "ייבוא סטטוס", en: "Import status" },
  "field.field": { he: "שדה (Field)", en: "Field" },
  "field.desc": { he: "תיאור", en: "Description" },
  "field.type": { he: "סוג", en: "Type" },
  "field.len": { he: "אורך", en: "Length" },
  "field.key": { he: "מפתח", en: "Key" },
  "ux.fontSize": { he: "גודל טקסט", en: "Text size" },
  "ux.note": { he: "מתאים לקריאה נוחה ברצפת הייצור. נשמר מקומית בדפדפן.", en: "For comfortable reading on the shop floor. Saved locally." },
  "footer.credit": {
    he: "הערת פיתוח: האתר נבנה עבור המפתח ב-Web Coding, סאלי חליף. (Project NEO - CBC Israel)",
    en: "Development note: built for the developer at Web Coding, Sali Halif. (Project NEO - CBC Israel)",
  },
  "footer.offline": { he: "100% Offline · Static Export", en: "100% Offline · Static Export" },
  "lang.switch": { he: "EN", en: "עב" },
};

// Topic / sheet titles arrive as Hebrew strings from the xlsx data layer.
// Map them to English so EN mode shows no Hebrew. Keyed by exact source title.
const TOPIC_EN: Record<string, string> = {
  "1. מבנה ארגוני ותשתית": "1. Organizational Structure & Infrastructure",
  "2. ציוד ונתוני מאסטר": "2. Equipment & Master Data",
  "3. עצי מוצר של אחזקה (BOM)": "3. Maintenance BOMs",
  "4. נקודות מדידה ומונים": "4. Measurement Points & Counters",
  "5. קטלוגים, קודים ופרופילים": "5. Catalogs, Codes & Profiles",
  "6. הודעות אחזקה (Notifications)": "6. Maintenance Notifications",
  '7. פקודות עבודה (פק"ע)': "7. Work Orders",
  "8. ניהול סטטוסים (Status Mgmt)": "8. Status Management",
  "9. אינטגרציית מלאי ורכש (PM-MM)": "9. Inventory & Procurement Integration (PM-MM)",
  "10. עלויות והתחשבנות (PM-CO)": "10. Costs & Settlement (PM-CO)",
  "11. אחזקה מונעת ותוכניות": "11. Preventive Maintenance & Plans",
  "12. היסטוריה וארכיון": "12. History & Archiving",
  "1. נתוני אב חומר ויחידות מידה (Material & UoM)": "1. Material Master & Units of Measure",
  "2. עץ מוצר (BOM)": "2. Bill of Materials (BOM)",
  "3. מתכון ייצור ופעולות (Master Recipe)": "3. Master Recipe & Operations",
  "4. גרסאות ייצור (Production Versions - חובה ב-S/4)": "4. Production Versions (mandatory in S/4)",
  "5. משאבים / מרכזי עבודה (Resources)": "5. Resources / Work Centers",
  '6. פק"ע ייצור ומתכון בקרה (Process Order)': "6. Process Orders & Control Recipe",
  "7. קונפיגורציה (Customizing)": "7. Configuration (Customizing)",
};

interface I18n {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof DICT | string) => string;
  pick: (he: string | undefined, en: string | undefined) => string;
  topic: (title: string) => string;
}

const Ctx = createContext<I18n | null>(null);
const KEY = "neo:lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved === "he" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "he" ? "en" : "he"), [lang, setLang]);

  const t = useCallback((key: string) => DICT[key]?.[lang] ?? key, [lang]);
  const pick = useCallback(
    (he: string | undefined, en: string | undefined) => (lang === "en" ? en || he || "" : he || en || ""),
    [lang],
  );
  const topic = useCallback((title: string) => (lang === "en" ? TOPIC_EN[title] ?? title : title), [lang]);

  return (
    <Ctx.Provider value={{ lang, dir: lang === "he" ? "rtl" : "ltr", setLang, toggle, t, pick, topic }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n(): I18n {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}
