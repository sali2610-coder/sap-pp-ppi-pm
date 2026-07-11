"use client";

import { useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Monitor, LayoutGrid, ListChecks, AlertTriangle, Camera, Play, Route, MapPin, Lightbulb,
  ArrowLeft, ArrowDown, ChevronDown, Terminal, ShieldCheck, FlaskConical, GraduationCap, Wrench, CheckCircle2,
} from "lucide-react";
import { hasApp, type AppObject } from "@/lib/apps-intel";

const NV = "לא אומת עדיין"; // not yet verified — never invent

function Block({ id, icon, title, sub, accent, children }: { id: string; icon: React.ReactNode; title: string; sub?: string; accent: string; children: React.ReactNode }) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 rounded-3xl border border-hairline bg-surface p-5 shadow-[var(--elev-1)] sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent }}>{icon}</span>
        <div><h2 className="text-lg font-extrabold tracking-tight text-ink-1">{title}</h2>{sub && <p className="text-[11.5px] text-ink-3">{sub}</p>}</div>
      </div>
      {children}
    </motion.section>
  );
}

// screenshot placeholder — NO fake images. Describes what to capture + where + what to look at.
function ShotSlot({ icon, c, title, what, where, look }: { icon: React.ReactNode; c: string; title: string; what: string; where: string; look: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline">
      <div className="relative grid h-36 place-items-center border-b border-dashed border-hairline bg-surface-2/80" style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(148,163,184,0.06) 10px,rgba(148,163,184,0.06) 20px)" }}>
        <div className="flex flex-col items-center gap-1 text-ink-3">
          <Camera className="size-7" />
          <span className="text-[11px] font-bold">צילום מסך נדרש</span>
        </div>
        <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-lg text-white shadow-sm" style={{ background: c }}>{icon}</span>
      </div>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-right">
        <span className="text-[13px] font-extrabold text-ink-1">{title}</span>
        <ChevronDown className={`size-4 shrink-0 text-ink-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="space-y-2 border-t border-hairline px-3.5 py-3 text-[11.5px] leading-relaxed">
              <p><span className="font-bold text-ink-3">מה לצלם: </span><span className="text-ink-2">{what}</span></p>
              <p><span className="font-bold text-ink-3">היכן: </span><span className="tech text-ink-2" dir="ltr">{where}</span></p>
              <p><span className="font-bold text-ink-3">על מה להסתכל: </span><span className="text-ink-2">{look}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PathRow({ label, value, verified, mono }: { label: string; value: string; verified: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-2/50 px-3.5 py-2.5">
      <span className="text-[11px] font-bold text-ink-3">{label}</span>
      {verified
        ? <span className={`text-[13px] font-bold text-ink-1 ${mono ? "tech font-mono" : ""}`} dir={mono ? "ltr" : "rtl"}>{value}</span>
        : <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-bold text-amber-600">{NV}</span>}
    </div>
  );
}

// clickable only when an /apps route exists for that code
function StepChip({ code, role, accent }: { code: string; role: "prev" | "current" | "next" | "alt"; accent: string }) {
  const live = hasApp(code);
  const base = "tech inline-flex items-center gap-1 rounded-xl px-3 py-2 font-mono text-[13px] font-extrabold transition";
  const style = role === "current"
    ? { background: accent, color: "#fff" }
    : role === "alt" ? { background: "#f1f5f9", color: "#475569" } : { background: "#fff", color: "#334155" };
  const cls = role === "current" ? base + " shadow-md" : base + " border border-hairline shadow-sm" + (live ? " hover:border-brand/40 hover:text-brand" : " opacity-70");
  const content = <span className="flex items-center gap-1" dir="ltr">{role === "current" && <Terminal className="size-3.5" />}{code}</span>;
  return live && role !== "current"
    ? <Link href={`/apps/${encodeURIComponent(code)}/`} className={cls} style={style}>{content}</Link>
    : <span className={cls} style={style}>{content}</span>;
}

export function PracticalLayer({ o, accent }: { o: AppObject; accent: string }) {
  const reduce = useReducedMotion();
  const t = o.intel;
  const fiori = o.fiori[0];
  const hasErr = (t.commonErrors?.length || 0) > 0;

  // flow steps: real process if present, else the named navigation chain
  const flow = ((t.process || "").split(/[→>]/).map((s) => s.trim()).filter(Boolean));
  const flowSteps = flow.length >= 2 ? flow : [...(t.before || []).slice(-1), t.code, ...(t.after || []).slice(0, 3)].filter(Boolean);
  const currentIdx = Math.max(0, flowSteps.findIndex((s) => s.toUpperCase().includes(t.code)));

  const prev = (t.before || [])[0];
  const next = (t.after || [])[0];
  const alts = [...new Set([...(t.alternative || []), ...(t.similar || [])])].slice(0, 4);

  // consultant tips — all from verified fields, else omitted
  const tips: { icon: React.ReactNode; c: string; label: string; text: string }[] = [
    t.mistakes?.length ? { icon: <AlertTriangle className="size-4" />, c: "#dc2626", label: "טעות נפוצה", text: t.mistakes[0] } : null,
    t.commonErrors?.length ? { icon: <CheckCircle2 className="size-4" />, c: "#0891b2", label: "מה לבדוק קודם", text: `ודא מראש: ${t.commonErrors[0]}` } : null,
    t.authObjects?.length ? { icon: <ShieldCheck className="size-4" />, c: "#7c3aed", label: "הרשאות", text: `בכשל גישה — SU53 מיד, ואז ודא ${t.authObjects.join(", ")} בתפקיד (PFCG).` } : null,
    t.bestPractices?.length ? { icon: <FlaskConical className="size-4" />, c: "#be185d", label: "טיפ בדיקה (QA)", text: t.bestPractices[0] } : null,
    t.consultant ? { icon: <Wrench className="size-4" />, c: "#16a34a", label: "הערת יישום", text: t.consultant } : null,
    t.whenNot ? { icon: <GraduationCap className="size-4" />, c: "#d97706", label: "אזהרה למתחיל", text: t.whenNot } : null,
  ].filter(Boolean) as { icon: React.ReactNode; c: string; label: string; text: string }[];

  const keyFields = (t.tables || []).slice(0, 5);

  return (
    <>
      {/* 1 · Screens */}
      <Block id="screens" icon={<Monitor className="size-5" />} title="מסכים — מה רואים ב-SAP" sub="ללא צילומים מומצאים — מקומות שמורים עם הוראות צילום" accent={accent}>
        <div className="grid-adaptive">
          <ShotSlot icon={<Terminal className="size-3.5" />} c="#475569" title="מסך ראשי · SAP GUI"
            what={`מסך הפתיחה של ${t.code} ב-SAP GUI (Easy Access → קוד טרנזקציה)`}
            where={`${t.code} (SAP GUI)`}
            look={`שדות חובה, אזורי קלט עיקריים${keyFields.length ? `, נתונים מהטבלאות ${keyFields.join(", ")}` : ""}`} />
          {fiori
            ? <ShotSlot icon={<LayoutGrid className="size-3.5" />} c="#d97706" title="מסך אפליקציית Fiori"
                what={`אפליקציית ${fiori.app} מה-Launchpad`} where={`${fiori.app}${fiori.appId ? ` (${fiori.appId})` : ""}`}
                look="כותרת, Object Page / List Report, פעולות ראשיות, מצב נתונים" />
            : <ShotSlot icon={<LayoutGrid className="size-3.5" />} c="#d97706" title="מסך אפליקציית Fiori"
                what="אפליקציית Fiori מקבילה — אם קיימת" where={NV} look="לאמת קיום אפליקציית Fiori מקבילה ב-Fiori Apps Library" />}
          <ShotSlot icon={<ListChecks className="size-3.5" />} c="#0891b2" title="מסך שדות מפתח"
            what={`התקריב לשדות הקריטיים של ${t.code}`} where={`${t.code} → אזור הנתונים`}
            look={keyFields.length ? `שדות מהטבלאות: ${keyFields.join(", ")}` : "שדות החובה והמפתח של הטרנזקציה"} />
          {hasErr && <ShotSlot icon={<AlertTriangle className="size-3.5" />} c="#dc2626" title="מסך שגיאה / סטטוס"
            what="הודעת שגיאה/סטטוס אופיינית בתחתית/שורת ההודעות" where={`${t.code} (שורת הודעות)`}
            look={`למשל: ${t.commonErrors![0]}`} />}
        </div>
      </Block>

      {/* 2 · Flow preview (animated, no fake screenshots) */}
      {flowSteps.length >= 2 && (
        <Block id="flowprev" icon={<Play className="size-5" />} title="תצוגת זרימה" sub="הדמיה ויזואלית של מיקום האובייקט בתהליך" accent={accent}>
          <div className="flex flex-wrap items-center gap-2">
            {flowSteps.map((step, i) => {
              const isCur = i === currentIdx;
              return (
                <div key={i} className="flex items-center gap-2">
                  <motion.span
                    initial={false}
                    animate={reduce ? {} : isCur ? { scale: [1, 1.06, 1], boxShadow: [`0 0 0 0 ${accent}00`, `0 0 0 6px ${accent}22`, `0 0 0 0 ${accent}00`] } : {}}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className={`rounded-xl border-2 px-3 py-2 text-[12px] font-bold ${isCur ? "text-white" : "border-hairline bg-surface-2 text-ink-2"}`}
                    style={isCur ? { background: accent, borderColor: accent } : undefined}>
                    {step}
                  </motion.span>
                  {i < flowSteps.length - 1 && <ArrowLeft className="size-4 shrink-0 text-ink-3" />}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-ink-3">הנקודה הפעילה מסמנת היכן {t.code} נמצא בתהליך. GIF/הקלטה אמיתית יתווספו בהמשך — ללא צילומים מומצאים.</p>
        </Block>
      )}

      {/* 3 · Menu paths */}
      <Block id="paths" icon={<Route className="size-5" />} title="נתיבי גישה" sub="SAP GUI · T-Code · Fiori Launchpad" accent={accent}>
        <div className="grid gap-2 md:grid-cols-2">
          <PathRow label="נתיב תפריט SAP GUI" value={NV} verified={false} />
          <PathRow label="T-Code" value={t.code} verified mono />
          <PathRow label="אריח / אפליקציית Fiori" value={fiori ? `${fiori.app}${fiori.appId ? ` (${fiori.appId})` : ""}` : NV} verified={!!fiori} mono={!!fiori} />
          <PathRow label="Business Role" value={fiori?.role || NV} verified={!!fiori?.role} mono={!!fiori?.role} />
          <PathRow label="Business Catalog" value={fiori?.catalog || NV} verified={!!fiori?.catalog} mono={!!fiori?.catalog} />
          <PathRow label="OData Service" value={fiori?.odata || NV} verified={!!fiori?.odata} mono={!!fiori?.odata} />
        </div>
      </Block>

      {/* 4 · Where am I map */}
      <Block id="wheremap" icon={<MapPin className="size-5" />} title="איפה אני בתהליך?" sub="צעד קודם · נוכחי · הבא · חלופות — לחיץ" accent={accent}>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-ink-3">קודם</span>
            {prev ? <StepChip code={prev} role="prev" accent={accent} /> : <span className="rounded-xl border border-dashed border-hairline px-3 py-2 text-[11px] text-ink-3">—</span>}
          </div>
          <ArrowLeft className="mb-2 size-5 text-ink-3" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold" style={{ color: accent }}>אני כאן</span>
            <StepChip code={t.code} role="current" accent={accent} />
          </div>
          <ArrowLeft className="mb-2 size-5 text-ink-3" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-ink-3">הבא</span>
            {next ? <StepChip code={next} role="next" accent={accent} /> : <span className="rounded-xl border border-dashed border-hairline px-3 py-2 text-[11px] text-ink-3">—</span>}
          </div>
          {alts.length > 0 && (
            <div className="ms-auto flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold text-ink-3">חלופות</span>
              <div className="flex flex-wrap gap-1.5">{alts.map((a) => <StepChip key={a} code={a} role="alt" accent={accent} />)}</div>
            </div>
          )}
        </div>
      </Block>

      {/* 5 · Consultant tips */}
      {tips.length > 0 && (
        <Block id="tips" icon={<Lightbulb className="size-5" />} title="טיפים של יועץ SAP" sub="מתוך הידע המאומת — ללא המצאה" accent={accent}>
          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((tip, i) => (
              <div key={i} className="rounded-2xl border border-hairline bg-surface-2/50 p-4">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: tip.c }}>{tip.icon}{tip.label}</div>
                <p className="text-[12.5px] leading-relaxed text-ink-2">{tip.text}</p>
              </div>
            ))}
          </div>
        </Block>
      )}
    </>
  );
}
