import Link from "next/link";
import { Wrench, FlaskConical, ArrowLeft } from "lucide-react";
import { PM_DATA, PPPI_DATA } from "@/lib/data";
import { ProgressChart } from "@/components/progress-chart";

const HUBS = [
  {
    href: "/pm/",
    data: PM_DATA,
    icon: Wrench,
    title: "SAP PM Hub",
    subtitle: "אחזקת מפעל · Plant Maintenance",
    desc: "ציוד, מיקומים פונקציונליים, הודעות ופקודות עבודה, אחזקה מונעת.",
  },
  {
    href: "/pp-pi/",
    data: PPPI_DATA,
    icon: FlaskConical,
    title: "SAP PP-PI Hub",
    subtitle: "תכנון ייצור תהליכי · Process Industries",
    desc: 'אב חומר, עצי מוצר, מתכוני ייצור, גרסאות ייצור, פק"ע וממשקי Zetes/Daymax.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* hero */}
      <section className="space-y-3 pt-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Project NEO Cockpit</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          מקור אמת יחיד למיגרציית <span className="font-semibold">SAP ECC ➔ S/4HANA</span> ב-CBC
          Israel — ניהול סטטוס מיגרציה ומילון נתונים טכני, במקום אחד, 100% Offline.
        </p>
      </section>

      {/* two router cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {HUBS.map(({ href, data, icon: Icon, title, subtitle, desc }) => {
          const tables = data.topics.flatMap((t) => t.tables);
          return (
            <Link
              key={href}
              href={href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                  <Icon className="size-6" />
                </div>
                <ArrowLeft className="size-5 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-brand" />
              </div>
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="text-sm font-medium text-brand">{subtitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-5 border-t border-border pt-4">
                <ProgressChart tables={tables} />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
