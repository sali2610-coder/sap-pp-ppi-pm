"use client";

import { Layers, AppWindow, Plug, Code2, Boxes, AlertTriangle } from "lucide-react";
import { CourseCenter } from "@/components/learn/course-center";
import { COURSE, buildFioriCourseData } from "@/lib/fiori-course";

const ICON: Record<string, React.ReactNode> = {
  arch: <Layers className="size-5" />, apptypes: <AppWindow className="size-5" />, odata: <Plug className="size-5" />,
  ui5: <Code2 className="size-5" />, rap: <Boxes className="size-5" />, incidents: <AlertTriangle className="size-5" />,
};

export function FioriCenter() {
  const d = buildFioriCourseData();
  return <CourseCenter config={{
    courseKey: COURSE, ...d.meta,
    startCards: d.startMeta.map((s) => ({ id: s.id, he: s.he, sub: s.sub, color: s.color, icon: ICON[s.cat] || <Layers className="size-5" /> })),
    ladder: d.ladder, topics: d.topics, defaultTopic: d.defaultTopic, crossLinks: d.crossLinks,
  }} />;
}
