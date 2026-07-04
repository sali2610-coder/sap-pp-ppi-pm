import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

const SITE = "https://sapbysali.app";

// Walk app/ for static (non-dynamic) page.tsx routes → clean sitemap of the
// navigable pages. Dynamic [slug] segments and route groups are skipped
// (thousands of generated object pages would bloat the sitemap; the crawler
// reaches them via internal links).
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
  return [...new Set(out)].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = staticRoutes();
  return routes.map((r) => ({
    url: `${SITE}${r === "/" ? "/" : r + "/"}`,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1 : r.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
