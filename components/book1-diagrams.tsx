"use client";

// High-end CSS/glass infographics for Book #1 chapters — bilingual (HE/EN via
// the global toggle), responsive, no external diagram lib (offline-safe).

import { ArrowLeft, Building2, Boxes, Factory, MapPin, Network, Users, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function Node({
  en,
  he,
  sub,
  icon: Icon,
  accent,
}: {
  en: string;
  he: string;
  sub?: string;
  icon: typeof Building2;
  accent?: boolean;
}) {
  const { lang } = useI18n();
  return (
    <div
      className={`glass flex min-w-[8.5rem] items-center gap-2 rounded-xl px-3 py-2 ${
        accent ? "ring-1 ring-brand/40" : ""
      }`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
          accent ? "bg-gradient-to-br from-brand to-brand-dark text-brand-foreground" : "bg-muted text-brand"
        }`}
      >
        <Icon className="size-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-bold">{lang === "he" ? he : en}</span>
        {sub && <span className="tech block text-[10px] text-muted-foreground">{sub}</span>}
      </span>
    </div>
  );
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass mb-4 rounded-2xl border-white/20 p-4 backdrop-blur-md">
      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand">
        <Network className="size-3.5" />
        {title}
      </p>
      {children}
    </div>
  );
}

// Down-connector
const Down = () => <span className="my-1 h-4 w-px bg-border" aria-hidden />;

// Chapter 2 — Org hierarchy tree
export function OrgHierarchyDiagram() {
  const { lang } = useI18n();
  return (
    <Frame title={lang === "he" ? "מבנה ארגוני · נתיב הנתונים" : "Organizational structure · data path"}>
      <div className="flex flex-col items-center gap-0">
        <Node en="Controlling Area" he="תחום בקרה" sub="OX06" icon={Building2} />
        <Down />
        <Node en="Company Code" he="קוד חברה" sub="V_T001" icon={Building2} />
        <Down />
        <Node en="Plant" he="מפעל" sub="V_T001W" icon={Factory} />
        <Down />
        <Node en="Maintenance Planning Plant" he="מפעל תכנון אחזקה" icon={Factory} accent />
        <Down />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Node en="Planner Groups" he="קבוצות מתכננים" icon={Users} />
          <Node en="Work Centers" he="מרכזי עבודה" sub="OIZA" icon={Wrench} />
        </div>
      </div>
    </Frame>
  );
}

// Chapter 5 — Work order cycle horizontal flow
export function WorkOrderFlowDiagram() {
  const { lang } = useI18n();
  const steps = [
    { en: "Notification", he: "הודעה", sub: "IW21" },
    { en: "Order", he: "פקודה", sub: "IW31" },
    { en: "Release", he: "שחרור", sub: "REL" },
    { en: "Completion", he: "דיווח/השלמה", sub: "IW41" },
    { en: "Settlement", he: "התחשבנות", sub: "TECO/SETT" },
  ];
  return (
    <Frame title={lang === "he" ? "מחזור פקודת העבודה" : "Work order cycle"}>
      <div className="flex flex-wrap items-stretch gap-2">
        {steps.map((s, i) => (
          <div key={s.en} className="flex items-center gap-2">
            <div className="glass flex min-w-[7rem] flex-col rounded-xl px-3 py-2">
              <span className="text-xs font-bold">{lang === "he" ? s.he : s.en}</span>
              <span className="tech text-[10px] text-brand">{s.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowLeft className="size-4 shrink-0 text-brand ltr:rotate-180" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Chapter 4 — Functional Location vs Equipment relationship
export function FuncLocEquipDiagram() {
  const { lang } = useI18n();
  return (
    <Frame title={lang === "he" ? "מיקום פונקציונלי מול ציוד" : "Functional Location vs Equipment"}>
      <div className="flex flex-col items-center gap-0">
        <Node en="Functional Location" he="מיקום פונקציונלי" sub="IFLOT / IFLOS" icon={MapPin} accent />
        <Down />
        <p className="mb-1 text-[10px] text-muted-foreground">
          {lang === "he" ? "התקנה / פירוק (Install/Dismantle)" : "Install / Dismantle"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Node en="Equipment" he="ציוד" sub="EQUI / EQKT" icon={Boxes} />
          <Node en="Equipment" he="ציוד" sub="EQUZ (usage)" icon={Boxes} />
        </div>
        <Down />
        <Node en="Object Number (status)" he="מפתח אובייקט לסטטוס" sub="OBJNR → JEST" icon={Network} />
      </div>
    </Frame>
  );
}

// Map a chapter number → its diagram
export function ChapterDiagram({ n }: { n: number }) {
  if (n === 2) return <OrgHierarchyDiagram />;
  if (n === 4) return <FuncLocEquipDiagram />;
  if (n === 5) return <WorkOrderFlowDiagram />;
  return null;
}
