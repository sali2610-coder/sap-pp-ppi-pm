"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, FlaskConical, ArrowLeft } from "lucide-react";
import { PM_DATA, PPPI_DATA } from "@/lib/data";
import type { SAPModuleData } from "@/lib/types";
import { ProgressChart } from "@/components/progress-chart";

const HUBS: {
  href: string;
  data: SAPModuleData;
  icon: typeof Wrench;
  title: string;
  subtitle: string;
  desc: string;
  accent: string;
}[] = [
  {
    href: "/pm/",
    data: PM_DATA,
    icon: Wrench,
    title: "SAP PM Hub",
    subtitle: "אחזקת מפעל · Plant Maintenance",
    desc: "ציוד, מיקומים פונקציונליים, הודעות ופקודות עבודה, אחזקה מונעת.",
    accent: "from-rose-500/15 to-transparent",
  },
  {
    href: "/pp-pi/",
    data: PPPI_DATA,
    icon: FlaskConical,
    title: "SAP PP-PI Hub",
    subtitle: "תכנון ייצור תהליכי · Process Industries",
    desc: 'אב חומר, עצי מוצר, מתכוני ייצור, גרסאות ייצור, פק"ע וממשקי Zetes/Daymax.',
    accent: "from-blue-500/15 to-transparent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 26 } },
};

export function HubCards() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2"
    >
      {HUBS.map(({ href, data, icon: Icon, title, subtitle, desc, accent }) => {
        const tables = data.topics.flatMap((t) => t.tables);
        return (
          <motion.div key={href} variants={item}>
            <Link
              href={href}
              className="group relative block overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* accent aurora */}
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-bl ${accent} opacity-70`} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="size-7" />
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/40 text-muted-foreground backdrop-blur transition-all group-hover:bg-brand group-hover:text-brand-foreground">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-sm font-medium text-brand">{subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-6 rounded-xl border border-border/50 bg-white/30 p-4 backdrop-blur">
                  <ProgressChart tables={tables} />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
