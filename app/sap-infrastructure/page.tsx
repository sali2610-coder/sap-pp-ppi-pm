"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Layers, GitBranch, Boxes, Database, Search, Plug, Download,
  X, ArrowLeft, FileText, Image as ImageIcon, Shapes, Table2,
} from "lucide-react";

const BASE = "/sap-infrastructure";

type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
type Tbl = {
  name: string; mod: string; real: boolean; he: string; en: string; tcodes: string;
  fiori: string; s4: string; s4alt: string; pk: string[]; fields: Field[]; funcs: string[];
  cds: string[]; rel: Rel[]; degree: number; zone: string;
};
type Bp = {
  code: string; purpose: string; objects: string[]; docs: string[]; tables: string[];
  inputs: string[]; outputs: string[]; connects: string[];
};
type Data = {
  meta: { counts: Record<string, number> };
  palette: Record<string, string>;
  modules: { code: string; name: string; he: string; kind: string }[];
  blueprints: Bp[];
  valueStream: { he: string; en: string; mod: string | null; doc: string; ext?: boolean }[];
  processes: { id: string; name: string; he: string; mods: string[]; docs: string[]; color: string }[];
  documents: { id: string; he: string; mod: string; tables: string[] }[];
  tables: Tbl[];
  shared: { name: string; he: string; mods: string[]; span: number; degree: number | null }[];
  zones: { id: string; he: string; en: string; color: string }[];
  integrationFlows: { idoc: string; he: string; from: string; to: string; table: string }[];
  crossModule: { from: string; to: string; he: string }[];
};

const VIEWS = [
  { id: "overview", he: "סקירה", Icon: Layers },
  { id: "process", he: "תהליכים עסקיים", Icon: GitBranch },
  { id: "module", he: "מודולים", Icon: Boxes },
  { id: "technical", he: "טכני", Icon: Database },
  { id: "table", he: "טבלאות", Icon: Table2 },
  { id: "integration", he: "אינטגרציה", Icon: Plug },
  { id: "download", he: "מרכז הורדות", Icon: Download },
] as const;

export default function SapInfrastructurePage() {
  const [data, setData] = useState<Data | null>(null);
  const [view, setView] = useState<string>("overview");
  const [openTable, setOpenTable] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE}/dataset.json`).then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  const color = (m: string | null) => (data && m && data.palette[m]) || "#64748b";
  const tByName = useMemo(
    () => (data ? Object.fromEntries(data.tables.map((t) => [t.name, t])) : {}),
    [data]
  ) as Record<string, Tbl>;

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">
        טוען את מפת התשתית…
      </div>
    );
  }

  const c = data.meta.counts;

  return (
    <div className="space-y-6" dir="rtl">
      {/* HERO */}
      <header className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-l from-[#0f1d2e] to-[#0a131f] p-7 shadow-xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">תשתית SAP — בלוטפרינט ארכיטקטורה</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              איך מודולי SAP עובדים יחד, איך זורם המידע, איך מסמכים הופכים לרישומים פיננסיים — נוף ארגוני
              שמובן בשלוש דקות. ECC6 → S/4HANA · CBC Israel.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {[
              ["מודולים", c.modules], ["טבלאות", c.tables], ["מסמכים", c.documents],
              ["תהליכים", c.processes], ["ממשקים", c.interfaces],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center">
                <div className="text-2xl font-extrabold text-white">{v}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="flex flex-wrap gap-2">
        {VIEWS.map(({ id, he, Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${
              view === id
                ? "border-[#d62027] bg-[#d62027] text-white shadow-lg shadow-[#d62027]/30"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#d62027]/40 hover:text-slate-900"
            }`}
          >
            <Icon className="size-4" /> {he}
          </button>
        ))}
      </nav>

      {/* VIEWS */}
      <section className="min-h-[420px]">
        {view === "overview" && <Overview data={data} color={color} />}
        {view === "process" && <ProcessView data={data} color={color} onDoc={(tbl) => tbl && setOpenTable(tbl)} />}
        {view === "module" && <ModuleView data={data} color={color} onOpen={setOpenModule} />}
        {view === "technical" && <TechnicalView data={data} color={color} onTable={setOpenTable} />}
        {view === "table" && <TableView data={data} color={color} onTable={setOpenTable} />}
        {view === "integration" && <IntegrationView data={data} color={color} onTable={setOpenTable} />}
        {view === "download" && <DownloadView />}
      </section>

      {/* MODULE PANEL */}
      {openModule && (
        <ModulePanel
          data={data} color={color} code={openModule}
          onClose={() => setOpenModule(null)} onTable={(t) => { setOpenModule(null); setOpenTable(t); }}
        />
      )}
      {/* TABLE PANEL */}
      {openTable && tByName[openTable] && (
        <TablePanel data={data} color={color} t={tByName[openTable]} onClose={() => setOpenTable(null)} onGo={setOpenTable} />
      )}

      <p className="text-center text-xs text-slate-400">
        נבנה ע״י <span className="font-semibold text-[#d62027]">Sali Halif — Web Coding</span> · NEO Cockpit · CBC Israel · 2026
      </p>
    </div>
  );
}

/* ---------------- OVERVIEW (value stream) ---------------- */
function Overview({ data, color }: { data: Data; color: (m: string | null) => string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-800">זרימת הערך מקצה-לקצה</h2>
      <div className="flex flex-wrap items-stretch gap-2">
        {data.valueStream.map((s, i) => (
          <div key={i} className="flex items-stretch gap-2">
            <div
              className="flex w-36 flex-col justify-center rounded-xl border-2 bg-white p-3 text-center shadow-sm"
              style={{ borderColor: s.ext ? "#cbd5e1" : color(s.mod) }}
            >
              <div className="text-sm font-extrabold text-slate-900">{s.he}</div>
              <div className="text-xs font-bold" style={{ color: s.ext ? "#64748b" : color(s.mod) }}>
                {s.ext ? "חיצוני" : s.mod}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{s.doc}</div>
            </div>
            {i < data.valueStream.length - 1 && <ArrowLeft className="size-5 self-center text-[#2f5d8a]" />}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
        כל אירוע עסקי בזרימה (רכש, ייצור, מכירה) הופך בסופו לרישום פיננסי אחד ב-ACDOCA — מקור האמת.
      </div>
    </div>
  );
}

/* ---------------- PROCESS ---------------- */
function ProcessView({ data, color, onDoc }: { data: Data; color: (m: string | null) => string; onDoc: (t: string | null) => void }) {
  const docByName = Object.fromEntries(data.documents.map((d) => [d.id, d]));
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.processes.map((p) => (
        <div key={p.id} className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderTopColor: p.color, borderTopWidth: 4 }}>
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-extrabold text-slate-900">{p.name}</h3>
            <span className="text-sm font-bold" style={{ color: p.color }}>{p.he}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {p.docs.map((d, i) => (
              <span key={d} className="flex items-center gap-1.5">
                <button
                  onClick={() => onDoc((docByName[d]?.tables || [])[0] || null)}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  {docByName[d]?.he || d}
                </button>
                {i < p.docs.length - 1 && <ArrowLeft className="size-3.5 text-slate-400" />}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-500">מודולים: {p.mods.join(" · ")}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- MODULE blueprints ---------------- */
function ModuleView({ data, color, onOpen }: { data: Data; color: (m: string | null) => string; onOpen: (c: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.blueprints.map((bp) => {
        const mod = data.modules.find((m) => m.code === bp.code);
        return (
          <button
            key={bp.code}
            onClick={() => onOpen(bp.code)}
            className="group rounded-2xl border bg-white p-0 text-right shadow-sm transition hover:shadow-lg"
            style={{ borderTopColor: color(bp.code), borderTopWidth: 5 }}
          >
            <div className="px-5 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="rounded-lg px-2.5 py-1 text-lg font-extrabold text-white" style={{ background: color(bp.code) }}>{bp.code}</span>
                <span className="text-sm font-bold text-slate-700">{mod?.he}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{bp.purpose}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 px-5 pb-4">
              {bp.tables.slice(0, 5).map((t) => (
                <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-600">{t}</span>
              ))}
            </div>
            <div className="border-t px-5 py-2.5 text-xs font-semibold" style={{ color: color(bp.code) }}>
              מחובר ל: {bp.connects.join(" · ")} ← פרטים
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- TECHNICAL (zones) ---------------- */
function TechnicalView({ data, color, onTable }: { data: Data; color: (m: string | null) => string; onTable: (t: string) => void }) {
  return (
    <div className="space-y-4">
      {data.zones.map((z) => {
        const list = data.tables.filter((t) => t.zone === z.id).sort((a, b) => b.degree - a.degree);
        return (
          <div key={z.id} className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderRightColor: z.color, borderRightWidth: 5 }}>
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-base font-extrabold text-slate-900">{z.he}</h3>
              <span className="text-xs font-bold" style={{ color: z.color }}>{z.en} · {list.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {list.map((t) => (
                <button key={t.name} onClick={() => onTable(t.name)}
                  className="rounded-md border px-2 py-1 font-mono text-[11px] font-bold hover:bg-slate-50"
                  style={{ borderColor: color(t.mod), color: color(t.mod) }}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- TABLE search ---------------- */
function TableView({ data, color, onTable }: { data: Data; color: (m: string | null) => string; onTable: (t: string) => void }) {
  const [q, setQ] = useState("");
  const [mods, setMods] = useState<Set<string>>(new Set(data.modules.map((m) => m.code)));
  const filtered = data.tables
    .filter((t) => mods.has(t.mod))
    .filter((t) => !q || t.name.toUpperCase().includes(q.toUpperCase()) || (t.he || "").includes(q))
    .sort((a, b) => b.degree - a.degree);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Search className="size-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש טבלה…"
            className="w-48 bg-transparent text-sm outline-none" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.modules.map((m) => (
            <button key={m.code} onClick={() => { const s = new Set(mods); s.has(m.code) ? s.delete(m.code) : s.add(m.code); setMods(s); }}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold transition"
              style={{ borderColor: color(m.code), color: mods.has(m.code) ? "#fff" : color(m.code), background: mods.has(m.code) ? color(m.code) : "transparent" }}>
              {m.code}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <button key={t.name} onClick={() => onTable(t.name)}
            className="flex items-center justify-between rounded-xl border bg-white px-3 py-2.5 text-right shadow-sm hover:shadow-md"
            style={{ borderRightColor: color(t.mod), borderRightWidth: 4 }}>
            <span className="min-w-0">
              <span className="block font-mono text-sm font-bold text-slate-900">{t.name}</span>
              <span className="block truncate text-xs text-slate-500">{t.he || t.en}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] font-bold" style={{ color: color(t.mod) }}>{t.mod}</span>
          </button>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-sm text-slate-400">לא נמצאו טבלאות</p>}
    </div>
  );
}

/* ---------------- INTEGRATION ---------------- */
function IntegrationView({ data, color, onTable }: { data: Data; color: (m: string | null) => string; onTable: (t: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-800">ממשקים · IDOC / ALE / PI-PO ↔ Zetes / Daymax</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.integrationFlows.map((f) => (
            <div key={f.idoc} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-slate-900">{f.idoc}</span>
                <button onClick={() => onTable(f.table)} className="font-mono text-[11px] font-bold text-[#2f5d8a] hover:underline">{f.table}</button>
              </div>
              <p className="mt-1 text-sm text-slate-600">{f.he}</p>
              <p className="mt-2 text-xs font-semibold text-slate-400">{f.from} → {f.to}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-800">אינטראקציה בין מודולים</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.crossModule.map((cm, i) => (
            <div key={i} className="rounded-lg border bg-white px-3 py-2 text-sm shadow-sm">
              <span className="font-mono font-bold text-slate-800">{cm.from} → {cm.to}</span>
              <span className="mr-2 text-slate-500">{cm.he}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- DOWNLOAD ---------------- */
function DownloadView() {
  const items = [
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.pdf`, label: "פוסטר ארכיטקטורה PDF (A0)", sub: "להדפסה על קיר המשרד", Icon: FileText },
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.png`, label: "פוסטר PNG", sub: "תמונה ברזולוציה גבוהה", Icon: ImageIcon },
    { href: `${BASE}/SAP-Enterprise-Architecture-A0.svg`, label: "פוסטר SVG", sub: "וקטורי — הגדלה ללא איבוד איכות", Icon: Shapes },
    { href: `${BASE}/dataset.json`, label: "נתוני מקור JSON", sub: "מקור אמת יחיד", Icon: Database },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ href, label, sub, Icon }) => (
        <a key={href} href={href} download
          className="group flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:border-[#d62027] hover:shadow-md">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#d62027] group-hover:bg-[#d62027]/10">
            <Icon className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-slate-900">{label}</span>
            <span className="block text-xs text-slate-500">{sub}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/* ---------------- MODULE PANEL ---------------- */
function ModulePanel({ data, color, code, onClose, onTable }:
  { data: Data; color: (m: string | null) => string; code: string; onClose: () => void; onTable: (t: string) => void }) {
  const bp = data.blueprints.find((b) => b.code === code)!;
  const mod = data.modules.find((m) => m.code === code);
  const Section = ({ t, children }: { t: string; children: React.ReactNode }) => (
    <div className="border-t px-5 py-3"><h4 className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: color(code) }}>{t}</h4>{children}</div>
  );
  return (
    <Drawer onClose={onClose}>
      <div className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <span className="rounded-lg px-3 py-1.5 text-xl font-extrabold text-white" style={{ background: color(code) }}>{code}</span>
          <span className="text-lg font-bold text-slate-900">{mod?.he}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{bp.purpose}</p>
      </div>
      <Section t="אובייקטים עיקריים"><div className="flex flex-wrap gap-1.5">{bp.objects.map((o) => <Chip key={o}>{o}</Chip>)}</div></Section>
      <Section t="מסמכים"><div className="flex flex-wrap gap-1.5">{bp.docs.map((d) => <Chip key={d}>{d}</Chip>)}</div></Section>
      <Section t="טבלאות עיקריות"><div className="flex flex-wrap gap-1.5">{bp.tables.map((t) => (
        <button key={t} onClick={() => onTable(t)} className="rounded-md border px-2 py-1 font-mono text-xs font-bold hover:bg-slate-50" style={{ borderColor: color(code), color: color(code) }}>{t}</button>
      ))}</div></Section>
      <Section t="קלט"><ul className="list-inside list-disc text-sm text-slate-600">{bp.inputs.map((x) => <li key={x}>{x}</li>)}</ul></Section>
      <Section t="פלט"><ul className="list-inside list-disc text-sm text-slate-600">{bp.outputs.map((x) => <li key={x}>{x}</li>)}</ul></Section>
      <Section t="מודולים מחוברים"><div className="flex flex-wrap gap-1.5">{bp.connects.map((cc) => (
        <span key={cc} className="rounded-full px-2.5 py-1 font-mono text-xs font-bold text-white" style={{ background: color(cc) }}>{cc}</span>
      ))}</div></Section>
    </Drawer>
  );
}

/* ---------------- TABLE PANEL ---------------- */
function TablePanel({ data, color, t, onClose, onGo }:
  { data: Data; color: (m: string | null) => string; t: Tbl; onClose: () => void; onGo: (n: string) => void }) {
  const rels = t.rel || [];
  const parentT = rels.filter((r) => r.role === "child").map((r) => r.table);
  const childT = rels.filter((r) => r.role === "parent").map((r) => r.table);
  const relatedMods = Array.from(new Set([t.mod, ...rels.map((r) => (data.tables.find((x) => x.name === r.table)?.mod || ""))].filter(Boolean)));
  const Section = ({ tt, children }: { tt: string; children: React.ReactNode }) => (
    <div className="border-t px-5 py-3"><h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#caa23a]">{tt}</h4>{children}</div>
  );
  return (
    <Drawer onClose={onClose}>
      <div className="px-5 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-2xl font-extrabold text-slate-900">{t.name}</span>
          <span className="rounded-md px-2 py-0.5 text-xs font-bold text-white" style={{ background: color(t.mod) }}>{t.mod}</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{t.real ? "בחילוץ" : "מודל קנוני"}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.he || t.en}</p>
      </div>
      {t.fields?.length > 0 && (
        <Section tt="שדות מפתח">
          <table className="w-full text-right font-mono text-xs">
            <tbody>
              {t.fields.map((f) => (
                <tr key={f[0]} className="border-b last:border-0">
                  <td className={`py-1 font-bold ${f[3] === "PK" ? "text-[#d62027]" : "text-slate-700"}`}>{f[0]}</td>
                  <td className="py-1 text-slate-500">{f[2] || f[1]}</td>
                  <td className="py-1 text-left text-slate-400">{f[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}
      <Section tt="טבלאות אב"><Rels names={parentT} color={color} data={data} onGo={onGo} /></Section>
      <Section tt="טבלאות צאצא"><Rels names={childT} color={color} data={data} onGo={onGo} /></Section>
      <Section tt="מודולים קשורים"><div className="flex flex-wrap gap-1.5">{relatedMods.map((m) => (
        <span key={m} className="rounded-full px-2.5 py-1 font-mono text-xs font-bold text-white" style={{ background: color(m) }}>{m}</span>
      ))}</div></Section>
      <Section tt="טרנזקציות"><span className="text-sm text-slate-700">{t.tcodes || "—"}</span></Section>
      {t.fiori && <Section tt="אפליקציית Fiori"><span className="text-sm text-slate-700">{t.fiori}</span></Section>}
      {t.funcs?.length > 0 && <Section tt="BAPIs / FM"><div className="flex flex-wrap gap-1.5">{t.funcs.slice(0, 6).map((f) => <Chip key={f}>{f}</Chip>)}</div></Section>}
      <Section tt="ECC ↔ S/4HANA">
        <p className="text-sm leading-relaxed text-slate-600">{t.s4 || "אין שינוי מהותי ב-S/4HANA."}</p>
        {t.s4alt && <p className="mt-1 text-xs text-slate-500">חלופת S/4: <span className="font-mono font-bold text-slate-700">{t.s4alt}</span></p>}
      </Section>
    </Drawer>
  );
}

function Rels({ names, color, data, onGo }:
  { names: string[]; color: (m: string | null) => string; data: Data; onGo: (n: string) => void }) {
  const known = new Set(data.tables.map((t) => t.name));
  if (!names.length) return <span className="text-xs italic text-slate-400">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from(new Set(names)).map((n) => {
        const mod = data.tables.find((t) => t.name === n)?.mod || null;
        return known.has(n) ? (
          <button key={n} onClick={() => onGo(n)} className="rounded-md border px-2 py-1 font-mono text-xs font-bold hover:bg-slate-50" style={{ borderColor: color(mod), color: color(mod) }}>{n}</button>
        ) : (
          <span key={n} className="rounded-md border border-slate-200 px-2 py-1 font-mono text-xs font-bold text-slate-400">{n}</span>
        );
      })}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{children}</span>;
}

function Drawer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex" dir="rtl">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="h-full w-full max-w-md overflow-auto bg-white shadow-2xl">
        <button onClick={onClose} className="absolute top-3 left-3 z-10 rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
          <X className="size-4" />
        </button>
        <div className="pb-8">{children}</div>
      </div>
    </div>
  );
}
