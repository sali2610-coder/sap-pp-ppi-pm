import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { ALL_TABLES } from "@/lib/data";
import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { verifiedNames } from "@/data/verified-objects";
import { listTcodes, listFuncs } from "@/lib/object-intel";
import { registryCodes } from "@/lib/tx-registry";
import { listCdsViews } from "@/data/cds-map";
import { allLessonSlugs } from "@/data/academy/lessons";
import { INCIDENTS } from "@/data/troubleshooting";
import { FIORI_APPS } from "@/data/centers/fiori";
import { MFG_SCENARIOS } from "@/data/centers/manufacturing";
import { appCodes } from "@/lib/apps-intel";

export const dynamic = "force-static";

const SITE = "https://sapbysali.app";
const enc = (s: string) => encodeURIComponent(s);

// Static (non-dynamic) routes discovered by walking app/.
function staticRoutes(): string[] {
  const root = join(process.cwd(), "app");
  const out: string[] = [];
  const walk = (dir: string, base: string) => {
    let entries: import("fs").Dirent[] = [];
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(e.name))) out.push(base || "/");
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name.startsWith("[") || e.name.startsWith("(") || e.name.startsWith("_") || e.name.startsWith("@")) continue;
      walk(join(dir, e.name), `${base}/${e.name}`);
    }
  };
  walk(root, "");
  return [...new Set(out)];
}

// Dynamic (generated) content pages — every indexable object/transaction/etc.
function dynamicRoutes(): string[] {
  const out: string[] = [];
  const push = (prefix: string, ids: Iterable<string>) => { for (const id of ids) if (id) out.push(`/${prefix}/${enc(id)}/`); };
  push("object", new Set([...ALL_TABLES.map((t) => t.tableName), ...HR_BW_NAMES, ...verifiedNames()]));
  push("tcode", new Set([...registryCodes().map((c) => c.toUpperCase()), ...listTcodes().map((c) => c.toUpperCase())]));
  push("bapi", [...listFuncs("BAPI"), ...listFuncs("FM")]);
  push("idoc", listFuncs("IDoc"));
  push("cds", listCdsViews());
  push("troubleshooting", INCIDENTS.map((i) => i.slug));
  push("fiori", FIORI_APPS.map((i) => i.slug));
  push("manufacturing", MFG_SCENARIOS.map((i) => i.slug));
  push("apps", appCodes());
  // SAP Academy — lessons + learning paths (dynamic [slug] routes the static
  // walker can't see). Without these the whole Academy was invisible to crawlers.
  for (const slug of allLessonSlugs()) out.push(`/academy/lesson/${enc(slug)}/`);
  for (const m of ["pm", "pp-pi", "qm", "pm-user", "mm", "wm", "pp-ds", "sop"]) out.push(`/academy/path/${m}/`);
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = staticRoutes().map((r) => (r === "/" ? "/" : r + "/"));
  const all = [...new Set([...statics, ...dynamicRoutes()])].sort();
  return all.map((r) => {
    const depth = r.split("/").filter(Boolean).length;
    return {
      url: `${SITE}${r}`,
      changeFrequency: r === "/" ? "weekly" : depth <= 1 ? "monthly" : "yearly",
      priority: r === "/" ? 1 : depth <= 1 ? 0.8 : 0.6,
    };
  });
}
